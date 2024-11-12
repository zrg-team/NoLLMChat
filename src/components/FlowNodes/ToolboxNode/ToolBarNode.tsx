import { NodeProps } from '@xyflow/react'
import { memo, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from 'src/lib/shadcn/ui/menubar'
import AddLLMCard from 'src/components/molecules/AddLLMCard'
import AddPromptCard from 'src/components/molecules/AddPromptCard'
import AddSchemaCard from 'src/components/molecules/AddSchemaCard'
import AddFewShotExampleCard from 'src/components/molecules/AddFewShotExampleCard'
import LazyIcon from 'src/components/atoms/LazyIcon'
import AddToolCard from 'src/components/molecules/AddToolCard'
import Logo from 'src/assets/svgs/logo.svg?react'

import { SUPPORTED_MODES, SupportedAddNodeEnum } from './types'

export const ToolbarNode = memo((props: NodeProps) => {
  const { t } = useTranslation('flows')
  const [mode, setMode] = useState(`${SupportedAddNodeEnum.ADD_LLM}`)

  const menu = useMemo(() => {
    return (
      <Menubar>
        <MenubarMenu>
          <Logo width={32} height={32} className="tw-pl-2" />
        </MenubarMenu>
        {SUPPORTED_MODES.map((mode) => {
          if (typeof mode === 'object') {
            return (
              <MenubarMenu key={mode.key}>
                <MenubarTrigger>
                  {mode.icon ? <LazyIcon name={mode.icon} /> : t(`supported_nodes.${mode.label}`)}
                </MenubarTrigger>
                <MenubarContent>
                  {mode.children.map((child) => {
                    return (
                      <MenubarItem key={child} onClick={() => setMode(child)}>
                        {t(`supported_nodes.${child.toLowerCase()}`)}
                      </MenubarItem>
                    )
                  })}
                </MenubarContent>
              </MenubarMenu>
            )
          }
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
      case SupportedAddNodeEnum.ADD_FEW_SHOT_EXAMPLE:
        return <AddFewShotExampleCard {...props} />
      case SupportedAddNodeEnum.ADD_TOOL_DEFINITION:
        return <AddToolCard {...props} />
    }
  }, [props, mode])
  return (
    <>
      {menu}
      <div className="tw-mt-4">{modeToComponent}</div>
    </>
  )
})
