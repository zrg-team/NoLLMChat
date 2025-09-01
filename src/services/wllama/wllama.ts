import { Wllama } from '@wllama/wllama'
import { AIMessage } from '@langchain/core/messages'
import type { InitProgressReport } from '@mlc-ai/web-llm/lib/types'
import type { ChatWebLLM } from '@langchain/community/chat_models/webllm'
import wllamaSingle from '@wllama/wllama/src/single-thread/wllama.wasm?url'
import wllamaMulti from '@wllama/wllama/src/multi-thread/wllama.wasm?url'
import { logDebug, logError, logInfo, logWarn } from 'src/utils/logger'

import { parseBridgeJSONToLLMInput } from './wllama-serialize'
import type { LLMProviderEnum } from 'src/services/database/types'

export const WLLAMA_CONFIG_PATHS = {
  'single-thread/wllama.wasm': wllamaSingle,
  'multi-thread/wllama.wasm': wllamaMulti,
}

const DEFAULT_INFERENCE_PARAMS = {
  nThreads: -1, // auto
  nContext: 4096,
  nPredict: 4096,
  nBatch: 128,
  temperature: 0.2,
}

export const DEFAULT_CHAT_TEMPLATE =
  "{% for message in messages %}{{'<|im_start|>' + message['role'] + '\n' + message['content'] + '<|im_end|>' + '\n'}}{% endfor %}{% if add_generation_prompt %}{{ '<|im_start|>assistant\n' }}{% endif %}"

let wllama: Wllama | undefined

export const loadModelFromHF = async (
  model: string,
  options: {
    callback?: (initProgress: InitProgressReport) => void
    provider: `${LLMProviderEnum}`
  },
) => {
  wllama = new Wllama(WLLAMA_CONFIG_PATHS, {
    logger: {
      debug: (...args) => logDebug(...args),
      log: (...args) => logInfo(...args),
      warn: (...args) => logWarn(...args),
      error: (...args) => logError(...args),
    },
  })
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
    options.callback?.({
      text: message,
      progress: progressPercentage,
      timeElapsed: 0,
    })
  }

  const [username, repo, ...rest] = model.split('/')

  await wllama.loadModelFromHF(`${username}/${repo}`, rest.join('/'), {
    progressCallback,
  })

  options.callback?.({
    text: 'Model loaded!',
    progress: 100,
    timeElapsed: 0,
  })

  return
}

export async function invoke(...args: Parameters<ChatWebLLM['invoke']>) {
  const [input, option] = args
  const messages = parseBridgeJSONToLLMInput(input)
  const outputText = await wllama?.createChatCompletion(messages, {
    nPredict: option?.configurable?.nPredict
      ? +option?.configurable?.nPredict
      : DEFAULT_INFERENCE_PARAMS.nPredict,
    sampling: {
      temp: option?.configurable?.temperature
        ? +option?.configurable?.temperature
        : DEFAULT_INFERENCE_PARAMS.temperature,
      top_k: option?.configurable?.topK ? +option?.configurable?.topK : undefined,
      top_p: option?.configurable?.topP ? +option?.configurable?.topP : undefined,
    },
  })
  return new AIMessage(outputText || '')
}

export async function unload() {
  await wllama?.exit()
  wllama = undefined
}

export async function stream(
  input: Parameters<ChatWebLLM['stream']>[0],
  option: Parameters<ChatWebLLM['stream']>[1] & {
    onNewToken?: (token: number, piece: Uint8Array, currentText: string) => void
  },
) {
  let lastContent = ''
  const messages = parseBridgeJSONToLLMInput(input)
  const result = await wllama?.createChatCompletion(messages, {
    nPredict: option?.configurable?.nPredict ? +option?.configurable?.nPredict : undefined,
    sampling: {
      temp: option?.configurable?.temperature ? +option?.configurable?.temperature : undefined,
      top_k: option?.configurable?.topK ? +option?.configurable?.topK : undefined,
      top_p: option?.configurable?.topP ? +option?.configurable?.topP : undefined,
    },
    onNewToken: (_token, _piece, currentText) => {
      const newToken = currentText.slice(lastContent.length)
      option.onNewToken?.(_token, _piece, newToken)
      lastContent = currentText
    },
  })

  return new AIMessage(result || '')
}
