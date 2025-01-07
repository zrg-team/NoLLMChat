import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Message } from 'ai/react'
import AIInput from 'src/lib/kokonutui/ai-input'
import { logDebug } from 'src/utils/logger'

import { ShellInstance } from '../hooks/useShell'
import { useMainVSLiteAppContext } from '../contexts/main'

interface CopilotProps {
  messages?: Message[]
  shell: ShellInstance
}

export default function Copilot({ messages = [] }: CopilotProps) {
  const { t } = useTranslation('applications')
  const { llm } = useMainVSLiteAppContext()

  const handleSubmit = useCallback(async (input: string) => {
    logDebug('[VSLite][Copilot][HandleSubmit]', input)
    return true
  }, [])

  if (!llm) {
    return undefined
  }

  return (
    <div className="group relative w-full max-w-md mx-auto h-full flex">
      <div
        className="rounded-lg border relative overflow-hidden border-zinc-200/80 dark:border-zinc-800/80 
              bg-gradient-to-br from-white/80 to-white/50 dark:from-zinc-900/80 dark:to-zinc-900/50 backdrop-blur-md
              h-full flex flex-col w-full"
      >
        <div className="border-b border-zinc-200 dark:border-zinc-800 p-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                  {t('vslite.copilot')}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start gap-3 group/message">
              <div className="flex-1 space-y-1">
                {message.role !== 'user' ? (
                  <div className="flex items-baseline gap-2">
                    <span>🤖</span>
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">AI</span>
                  </div>
                ) : undefined}
                <p className="text-sm text-zinc-600 dark:text-zinc-300">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-2 pb-0 border-t border-zinc-200/10 dark:border-zinc-800/50">
          <AIInput
            className="!max-w-full"
            onSubmit={handleSubmit}
            placeholder={t('chat.input_message_placeholder')}
            maxHeight={32}
            minHeight={32}
            height={32}
          />
        </div>
      </div>
    </div>
  )
}
