import { useCallback } from 'react'
import { getRepository } from 'src/services/database'
import { LLM } from 'src/services/database/types'

export const useUpdateLLMOptions = () => {
  const changeLLMOptions = useCallback(async (llm: LLM, options: Record<string, unknown>) => {
    if (llm) {
      await getRepository('LLM').update(llm.id, { options })
    }
  }, [])

  return {
    changeLLMOptions,
  }
}
