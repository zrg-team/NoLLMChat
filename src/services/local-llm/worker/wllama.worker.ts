import { Wllama } from '@wllama/wllama'
import { sendToMainThread } from 'src/utils/worker-base'
import { AIMessage } from '@langchain/core/messages'
import { parseBridgeJSONToLLMInput } from '../utils/wllama-serialize'
import { MessagePayload } from './type'

let wllama: Wllama | undefined
const CONFIG_PATHS = {
  'single-thread/wllama.wasm': './esm/single-thread/wllama.wasm',
  'multi-thread/wllama.wasm': './esm/multi-thread/wllama.wasm',
}
let modelInstance:
  | {
      model: string
    }
  | undefined

export async function handleWllama(data: MessagePayload) {
  if (!wllama && data.type !== 'load') {
    throw new Error('LLM_NOT_LOADED_YET')
  }

  switch (data.type) {
    case 'load': {
      wllama = new Wllama(CONFIG_PATHS)
      const progressCallback = ({
        loaded,
        total,
      }: {
        /**
         * Number of bytes loaded (sum of all shards)
         */
        loaded: number
        /**
         * Total number of bytes (sum of all shards)
         */
        total: number
      }) => {
        // Calculate the progress as a percentage
        const progressPercentage = Math.round((loaded / total) * 100)
        // Log the progress in a user-friendly format
        const message = `Downloading... ${progressPercentage}%`
        sendToMainThread(data.messageId, 'inprogress', {
          progress: progressPercentage,
          timeElapsed: 0,
          text: message,
        })
      }

      const { model } = data.payload[0]
      const [username, repo, ...rest] = model.split('/')

      const result = await wllama.loadModelFromHF(`${username}/${repo}`, rest.join('/'), {
        progressCallback,
      })
      modelInstance = {
        model: model,
      }
      return result
    }
    case 'get-current-model-info': {
      return {
        model: modelInstance?.model,
      }
    }
    case 'invoke': {
      const [input, option] = data.payload
      const messages = parseBridgeJSONToLLMInput(input)
      const outputText = await wllama?.createChatCompletion(messages, {
        nPredict: option?.configurable?.nPredict ? +option?.configurable?.nPredict : undefined,
        sampling: {
          temp: option?.configurable?.temperature ? +option?.configurable?.temperature : undefined,
          top_k: option?.configurable?.topK ? +option?.configurable?.topK : undefined,
          top_p: option?.configurable?.topP ? +option?.configurable?.topP : undefined,
        },
      })
      return new AIMessage(outputText || '')
    }
    case 'stream': {
      let content = ''
      const [input, option] = data.payload
      const messages = parseBridgeJSONToLLMInput(input)
      await wllama?.createChatCompletion(messages, {
        nPredict: option?.configurable?.nPredict ? +option?.configurable?.nPredict : undefined,
        sampling: {
          temp: option?.configurable?.temperature ? +option?.configurable?.temperature : undefined,
          top_k: option?.configurable?.topK ? +option?.configurable?.topK : undefined,
          top_p: option?.configurable?.topP ? +option?.configurable?.topP : undefined,
        },
        onNewToken: (_token, _piece, currentText) => {
          content = currentText
          sendToMainThread(data.messageId, 'inprogress', currentText.replace(content, ''))
        },
      })

      return new AIMessage(content || '')
    }
    case 'tools-calling-stream': {
      // Lanchain not yet supported tool call for WebLLM
      throw new Error('NOT_SUPPORTED')
    }
    case 'structured-stream': {
      throw new Error('NOT_SUPPORTED')
    }
    default:
      throw new Error('Invalid operation')
  }
}
