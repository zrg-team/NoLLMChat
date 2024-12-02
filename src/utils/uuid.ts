import { customAlphabet } from 'nanoid'

// Define the alphabet and length for each segment of the UUID
const alphabet = '0123456789abcdef'
const segmentLengths = [8, 4, 4, 4, 12]

// Function to generate a UUID with the specified format
export function generateUUID() {
  const uuid = segmentLengths.map((length) => customAlphabet(alphabet, length)()).join('-')
  return uuid
}
