import EasySpeech from 'easy-speech'
import { logWarn } from './logger'

export class TextToSpeech {
  private static instance: TextToSpeech
  private static promise?: Promise<boolean>

  private constructor() {}

  static getInstance() {
    if (!TextToSpeech.instance) {
      TextToSpeech.instance = new TextToSpeech()
    }
    return TextToSpeech.instance
  }

  static async init() {
    try {
      TextToSpeech.promise = EasySpeech.init({ maxTimeout: 5000, interval: 100 })
      await TextToSpeech.promise
    } catch (error) {
      logWarn('Error during speech synthesis initialization', error)
    } finally {
      TextToSpeech.promise = undefined
    }
  }

  async speak(text: string) {
    try {
      if (TextToSpeech.promise) {
        await TextToSpeech.promise
      }
      const status = EasySpeech.status()
      if (!('initialized' in status) || !status.initialized) {
        throw new Error('EasySpeech is not ready')
      }

      return EasySpeech.speak({
        text,
        pitch: 1,
        rate: 1,
        volume: 1,
        voice: EasySpeech.voices()[0], // Use the first available voice
      }).catch((error) => {
        logWarn('Error during speech synthesis:', error)
      })
    } catch (error) {
      logWarn('Error during speech synthesis:', error)
    }
  }

  async stop() {
    try {
      return EasySpeech?.cancel()
    } catch (error) {
      logWarn('Error during speech synthesis:', error)
    }
  }
}

export default TextToSpeech.getInstance()
