import { Message } from 'ai/react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Button } from 'src/lib/shadcn/ui/button'

import { ShellInstance } from '../hooks/useShell'
import { useMainVSLiteAppContext } from '../contexts/main'

interface CopilotProps {
  messages?: Message[]
  shell: ShellInstance
}

export default function Copilot({
  messages = [
    {
      id: '1',
      content: "Hey team! I've just pushed the latest design changes 🎨",
      role: 'user',
    },
    {
      id: '2',
      content: 'Looking great! The new color scheme is perfect',
      role: 'assistant',
    },
  ],
}: CopilotProps) {
  const { llm } = useMainVSLiteAppContext()
  if (!llm) {
    return undefined
  }

  return (
    <div className="group relative w-full max-w-md mx-auto h-full flex">
      <div
        className="rounded-lg border relative overflow-hidden border-zinc-200/80 dark:border-zinc-800/80 
              bg-gradient-to-br from-white/80 to-white/50 dark:from-zinc-900/80 dark:to-zinc-900/50 backdrop-blur-md
              h-full flex flex-col"
      >
        <div className="border-b border-zinc-200 dark:border-zinc-800 p-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">Copilot</h3>
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

        <div className="p-4 border-t border-zinc-200/10 dark:border-zinc-800/50">
          <div className="relative flex w-full items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Write a message..."
                className="w-full px-4 py-2 rounded-lg
                                  bg-zinc-50 dark:bg-zinc-800/50 
                                  border border-zinc-200 dark:border-zinc-700/50
                                  focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600
                                  placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
              />
            </div>
            <Button
              type="button"
              className=" 
                                  bg-zinc-800 hover:bg-zinc-700 
                                  dark:bg-zinc-700 dark:hover:bg-zinc-600 
                                  text-zinc-100 dark:text-zinc-200 
                                  transition-colors shadow-sm rounded-xl"
            >
              <LazyIcon name="send" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
