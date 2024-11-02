import { useCallback } from "react"
import { getRepository } from "src/modules/database"
import { LLM } from "src/modules/database/entities"

export const useCreateDatabaseLLM = () => {
  const createDatabaseLLM = useCallback(async (model: string) => {
    const LLMRepository = getRepository<LLM>('LLM')
    return LLMRepository.save({
      name: model,
      status: 'started',
    })
  }, [])

  return {
    createDatabaseLLM
  }
}
