function _base64StringToArrayBuffer(b64str: string) {
  const byteStr = atob(b64str)
  const bytes = new Uint8Array(byteStr.length)
  for (let i = 0; i < byteStr.length; i++) {
    bytes[i] = byteStr.charCodeAt(i)
  }
  return bytes.buffer
}

function _arrayBufferToBase64(arrayBuffer: ArrayBuffer) {
  const byteArray = new Uint8Array(arrayBuffer)
  let byteString = ''
  for (let i = 0; i < byteArray.byteLength; i++) {
    byteString += String.fromCharCode(byteArray[i])
  }
  const b64 = window.btoa(byteString)

  return b64
}

function convertPemToBinary(pem: string) {
  const lines = pem.split('\n')
  let encoded = ''
  for (let i = 0; i < lines.length; i++) {
    if (
      lines[i].trim().length > 0 &&
      lines[i].indexOf('-----BEGIN RSA PRIVATE KEY-----') < 0 &&
      lines[i].indexOf('-----BEGIN PUBLIC KEY-----') < 0 &&
      lines[i].indexOf('-----END RSA PRIVATE KEY-----') < 0 &&
      lines[i].indexOf('-----END PUBLIC KEY-----') < 0
    ) {
      encoded += lines[i].trim()
    }
  }
  return _base64StringToArrayBuffer(encoded)
}

function addNewLines(str: string) {
  let finalString = ''
  while (str.length > 0) {
    finalString += str.substring(0, 64) + '\n'
    str = str.substring(64)
  }

  return finalString
}

function toPrivatePem(privateKey: ArrayBuffer) {
  const b64 = addNewLines(_arrayBufferToBase64(privateKey))
  const pem = '-----BEGIN RSA PRIVATE KEY-----\n' + b64 + '-----END RSA PRIVATE KEY-----'

  return pem
}

function toPublicPem(privateKey: ArrayBuffer) {
  const b64 = addNewLines(_arrayBufferToBase64(privateKey))
  const pem = '-----BEGIN PUBLIC KEY-----\n' + b64 + '-----END PUBLIC KEY-----'

  return pem
}

const encryptAlgorithm = {
  name: 'RSA-OAEP',
  modulusLength: 2048,
  publicExponent: new Uint8Array([1, 0, 1]),
  extractable: true,
  hash: {
    name: 'SHA-256',
  },
}

export const generateRSAKeyPair = async () => {
  const keyPair = await window.crypto.subtle.generateKey(encryptAlgorithm, true, [
    'encrypt',
    'decrypt',
  ])

  const keyPairPem = {
    publicKey: '',
    privateKey: '',
  }
  const exportedPrivateKey = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey)
  keyPairPem.privateKey = toPrivatePem(exportedPrivateKey)

  const exportedPublicKey = await window.crypto.subtle.exportKey('spki', keyPair.publicKey)
  keyPairPem.publicKey = toPublicPem(exportedPublicKey)

  return keyPairPem
}

export const encryptRsa = async (fileArrayBuffer: ArrayBuffer, pemString: string) => {
  const keyArrayBuffer = convertPemToBinary(pemString)
  // import public key
  const secretKey = await crypto.subtle.importKey('spki', keyArrayBuffer, encryptAlgorithm, true, [
    'encrypt',
  ])
  // encrypt the text with the secret key
  const ciphertextArrayBuffer = await crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    secretKey,
    fileArrayBuffer,
  )

  return ciphertextArrayBuffer
}

export const decryptRsa = async (fileArrayBuffer: ArrayBuffer, pemString: string) => {
  const keyArrayBuffer = convertPemToBinary(pemString)

  const secretKey = await crypto.subtle.importKey('pkcs8', keyArrayBuffer, encryptAlgorithm, true, [
    'decrypt',
  ])

  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP',
    },
    secretKey,
    fileArrayBuffer,
  )

  return decryptedBuffer
}

export const encryptStringRsa = async (str: string, pemString: string) => {
  const encodedPlaintext = new TextEncoder().encode(str).buffer
  const encrypted = await encryptRsa(encodedPlaintext, pemString)
  return _arrayBufferToBase64(encrypted)
}

export const decryptStringRsa = async (str: string, pemString: string) => {
  const encodedPlaintext = _base64StringToArrayBuffer(str)
  const decrypted = await decryptRsa(encodedPlaintext, pemString)
  const uint8Array = new Uint8Array(decrypted)
  const textDecoder = new TextDecoder()
  const decodedString = textDecoder.decode(uint8Array)
  return decodedString
}
