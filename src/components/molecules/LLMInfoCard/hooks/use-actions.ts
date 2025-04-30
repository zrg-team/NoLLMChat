import { useCallback } from 'react'
import { getRepository } from 'src/services/database'
import { LLM } from 'src/services/database/types'

export const useActions = (data: { llm?: LLM }) => {
  const changeLLMOptions = useCallback(
    async (options: Record<string, unknown>) => {
      if (data.llm) {
        await getRepository('LLM').update(data.llm.id, { options })
        return getRepository('LLM').findOne({
          where: { id: data.llm.id },
        })
      }
    },
    [data.llm],
  )

  return {
    changeLLMOptions,
  }
}
