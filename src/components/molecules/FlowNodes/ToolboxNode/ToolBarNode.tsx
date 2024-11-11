import { NodeProps } from '@xyflow/react'
import { memo, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menubar, MenubarMenu, MenubarTrigger } from 'src/lib/shadcn/ui/menubar'
import { SUPPORTED_MODES, SupportedAddNodeEnum } from './types'
import AddLLMCard from 'src/components/molecules/AddLLMCard'
import AddPromptCard from 'src/components/molecules/AddPromptCard'
import AddSchemaCard from '../../AddSchemaCard'

export const ToolbarNode = memo((props: NodeProps) => {
  const { t } = useTranslation('flows')
  const [mode, setMode] = useState(`${SupportedAddNodeEnum.ADD_LLM}`)

  const menu = useMemo(() => {
    return (
      <Menubar>
        {SUPPORTED_MODES.map((mode) => {
          return (
            <MenubarMenu key={mode}>
              <MenubarTrigger value={mode} onClick={() => setMode(mode)}>
                {t(`supported_nodes.${mode.toLowerCase()}`)}
              </MenubarTrigger>
            </MenubarMenu>
          )
        })}
      </Menubar>
    )
  }, [t])

  const modeToComponent = useMemo(() => {
    switch (mode) {
      case SupportedAddNodeEnum.ADD_LLM:
        return <AddLLMCard {...props} />
      case SupportedAddNodeEnum.ADD_PROMPT:
        return <AddPromptCard {...props} />
      case SupportedAddNodeEnum.ADD_SCHEMA:
        return <AddSchemaCard {...props} />
    }
  }, [props, mode])
  return (
    <>
      {menu}
      <div className="tw-mt-4">{modeToComponent}</div>
    </>
  )
})
