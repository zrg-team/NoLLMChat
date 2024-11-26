export enum SupportedAddNodeEnum {
  ADD_LLM = 'ADD_LLM',
  ADD_PROMPT = 'ADD_PROMPT',
  ADD_TOOL_DEFINITION = 'ADD_TOOL_DEFINITION',
  ADD_SCHEMA = 'ADD_SCHEMA',
  ADD_FEW_SHOT_EXAMPLE = 'ADD_FEW_SHOT_EXAMPLE',
  ADD_VECTOR_DATABASE = 'ADD_VECTOR_DATABASE',
  ADD_TEXT_DATA = 'ADD_TEXT_DATA',
}
export const SUPPORTED_MODES = [
  SupportedAddNodeEnum.ADD_LLM,
  SupportedAddNodeEnum.ADD_PROMPT,
  SupportedAddNodeEnum.ADD_SCHEMA,
  SupportedAddNodeEnum.ADD_VECTOR_DATABASE,
  {
    key: 'more',
    label: 'more',
    icon: 'ellipsis' as const,
    children: [SupportedAddNodeEnum.ADD_TOOL_DEFINITION, SupportedAddNodeEnum.ADD_FEW_SHOT_EXAMPLE],
  },
]
