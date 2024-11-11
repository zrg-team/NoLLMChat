import { memo, useCallback, useMemo, useState } from 'react'
import { NodeProps } from '@xyflow/react'
import { useTranslation } from 'react-i18next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/lib/shadcn/ui/tabs'
import AddLLMCard from 'src/components/molecules/AddLLMCard'
import AddPromptCard from 'src/components/molecules/AddPromptCard'
import { SUPPORTED_MODES, SupportedAddNodeEnum } from './types'

export const ToolboxNode = memo((props: NodeProps) => {
  const { t } = useTranslation('flows')
  const [mode, setMode] = useState(`${SupportedAddNodeEnum.ADD_LLM}`)
  const tabTrigger = useMemo(() => {
    return (
      <TabsList className="tw-grid tw-grid-cols-3">
        {SUPPORTED_MODES.map((mode) => {
          return (
            <TabsTrigger key={mode} value={mode}>
              {t(`supported_nodes.${mode.toLowerCase()}`)}
            </TabsTrigger>
          )
        })}
      </TabsList>
    )
  }, [t])

  const modeToComponent = useCallback(
    (mode: `${SupportedAddNodeEnum}`) => {
      switch (mode) {
        case SupportedAddNodeEnum.ADD_LLM:
          return <AddLLMCard {...props} />
        case SupportedAddNodeEnum.ADD_PROMPT:
          return <AddPromptCard {...props} />
        case SupportedAddNodeEnum.ADD_TOOL_DEFINITION:
          return <AddPromptCard {...props} />
      }
    },
    [props],
  )
  const tabContent = useMemo(() => {
    return SUPPORTED_MODES.map((mode) => {
      return (
        <TabsContent key={mode} value={mode}>
          {modeToComponent(mode)}
        </TabsContent>
      )
    })
  }, [modeToComponent])
  return (
    <>
      <Tabs value={mode} onValueChange={setMode}>
        {tabTrigger}
        {tabContent}
      </Tabs>
    </>
  )
})
