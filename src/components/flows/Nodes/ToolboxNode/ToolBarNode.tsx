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
import CreateLLMCard from 'src/components/molecules/CreateLLMCard'
import CreatePromptCard from 'src/components/molecules/CreatePromptCard'
import CreateSchemaCard from 'src/components/molecules/CreateSchemaCard'
import CreateFewShotExampleCard from 'src/components/molecules/CreateFewShotExampleCard'
import LazyIcon from 'src/components/atoms/LazyIcon'
import CreateToolCard from 'src/components/molecules/CreateToolCard'
import CreateVectorDatabaseCard from 'src/components/molecules/CreateVectorDatabaseCard'
import Logo from 'src/assets/svgs/logo.svg?react'
import CreateTextDataCard from 'src/components/molecules/CreateTextDataCard'
import { useAppState } from 'src/states/app'
import { cn } from 'src/lib/utils'

import { SUPPORTED_MODES, SupportedAddNodeEnum } from './constants'
import { CoolMode } from 'src/lib/shadcn/ui/cool-mode'
import { Button } from 'src/lib/shadcn/ui/button'

export const ToolbarNode = memo((props: NodeProps) => {
  const { t } = useTranslation('flows')
  const theme = useAppState((state) => state.theme)
  const [mode, setMode] = useState(`${SupportedAddNodeEnum.ADD_LLM}`)

  const menu = useMemo(() => {
    return (
      <Menubar>
        <MenubarMenu>
          <CoolMode>
            <Button variant="link" className="!p-0 !pl-3">
              <Logo
                width={32}
                height={32}
                className={cn(theme === 'dark' ? 'fill-white' : 'fill-black')}
              />
            </Button>
          </CoolMode>
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
  }, [t, theme])

  const modeToComponent = useMemo(() => {
    switch (mode) {
      case SupportedAddNodeEnum.ADD_LLM:
        return <CreateLLMCard {...props} />
      case SupportedAddNodeEnum.ADD_PROMPT:
        return <CreatePromptCard {...props} />
      case SupportedAddNodeEnum.ADD_SCHEMA:
        return <CreateSchemaCard {...props} />
      case SupportedAddNodeEnum.ADD_FEW_SHOT_EXAMPLE:
        return <CreateFewShotExampleCard {...props} />
      case SupportedAddNodeEnum.ADD_TOOL_DEFINITION:
        return <CreateToolCard {...props} />
      case SupportedAddNodeEnum.ADD_VECTOR_DATABASE:
        return <CreateVectorDatabaseCard {...props} />
      case SupportedAddNodeEnum.ADD_TEXT_DATA:
        return <CreateTextDataCard {...props} />
    }
  }, [props, mode])
  return (
    <>
      {menu}
      <div className="mt-4">{modeToComponent}</div>
    </>
  )
})
