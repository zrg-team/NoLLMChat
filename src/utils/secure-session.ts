class SecureSessionMemory {
  private sessionKeyProcess: Promise<CryptoKey> | undefined
  private sessionKey: CryptoKey
  private loadded = false
  private sessionMemory = new Map<string, ArrayBuffer>()

  constructor() {
    this.init()
  }

  private async init() {
    if (this.loadded) {
      return
    }

    this.sessionMemory = new Map<string, ArrayBuffer>()
    const algorithm = { name: 'AES-GCM', length: 256 }
    const keyUsages = ['encrypt' as const, 'decrypt' as const]
    this.sessionKeyProcess = window.crypto.subtle
      .generateKey(algorithm, true, keyUsages)
      .then((key) => key)
    this.sessionKey = await this.sessionKeyProcess
    this.loadded = true
    this.sessionKeyProcess = undefined
  }

  async reload() {
    this.loadded = false
    this.init()
  }

  async set(key: string, value: string) {
    if (this.sessionKeyProcess) {
      await this.sessionKeyProcess
    }
    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: new Uint8Array(12),
      },
      this.sessionKey,
      new TextEncoder().encode(value),
    )
    this.sessionMemory.set(key, encrypted)
  }

  async get(key: string) {
    const encryptData = this.sessionMemory.get(key)
    if (!encryptData) {
      return null
    }
    if (this.sessionKeyProcess) {
      await this.sessionKeyProcess
    }
    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: new Uint8Array(12),
      },
      this.sessionKey,
      encryptData,
    )

    return new TextDecoder().decode(decrypted)
  }

  async exists(key: string) {
    return this.sessionMemory.has(key)
  }
}

const secureSession = new SecureSessionMemory()

export default secureSession
