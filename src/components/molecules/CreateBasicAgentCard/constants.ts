import { MessageRoleEnum, PromptTypeEnum } from 'src/services/database/types'

export const PROMPT_TYPES = {
  [PromptTypeEnum.Chat]: {
    label: 'add_prompt_card.prompt_types.chat',
    value: PromptTypeEnum.Chat,
  },
  [PromptTypeEnum.FewShotExample]: {
    label: 'add_prompt_card.prompt_types.few_shot_example',
    value: PromptTypeEnum.FewShotExample,
  },
}
export const PROMPT_ROLES = {
  [MessageRoleEnum.System]: {
    label: 'add_prompt_card.prompt_roles.system',
    value: MessageRoleEnum.System,
  },
  [MessageRoleEnum.Human]: {
    label: 'add_prompt_card.prompt_roles.human',
    value: MessageRoleEnum.Human,
  },
  [MessageRoleEnum.AI]: { label: 'add_prompt_card.prompt_roles.ai', value: MessageRoleEnum.AI },
}
