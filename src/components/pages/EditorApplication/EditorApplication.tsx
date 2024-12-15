'use client'

import { memo, lazy, Suspense, useCallback } from 'react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import LLMIcon from 'src/components/atoms/LLMIcon'
import { cn } from 'src/lib/utils'
import { LLMStatusEnum } from 'src/services/database/types'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from 'src/lib/shadcn/ui/tooltip'

import { useCreateMessage } from './hooks/use-create-message'
import { useUpdateEditorContent } from './hooks/use-update-editor-content'

const PlateAppEditor = lazy(() => import('src/components/organisms/editor/PlateEditor'))

const EditorApplication = memo(() => {
  const { updateEditorContent } = useUpdateEditorContent()
  const { mainLLMInfo, createMessage } = useCreateMessage()

  const handleChangeContent = useCallback(
    (value: unknown[]) => {
      updateEditorContent(value)
    },
    [updateEditorContent],
  )

  return (
    <div className="h-full w-full relative" data-registry="plate">
      <TooltipProvider>
        <Tooltip>
          <div
            className={cn(
              'flex absolute !z-[51] right-1 top-0 max-w-28 h-9 items-center justify-center flex-row',
            )}
          >
            {mainLLMInfo?.status === LLMStatusEnum.Loaded && mainLLMInfo?.llm?.name ? (
              <LLMIcon name={mainLLMInfo?.llm?.name} className="w-5 h-5 mr-1" />
            ) : undefined}
            <TooltipTrigger className="overflow-hidden !text-ellipsis w-full max-w-full max-h-full whitespace-nowrap text-sm">
              {mainLLMInfo?.progress ? (
                mainLLMInfo?.progress
              ) : mainLLMInfo?.status === LLMStatusEnum.Loaded ? (
                mainLLMInfo?.llm?.name
              ) : (
                <LazyIcon size={16} name="loader-circle" className="animate-spin ml-2" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{mainLLMInfo?.progress || mainLLMInfo?.llm?.name || ''}</p>
            </TooltipContent>
          </div>
        </Tooltip>
      </TooltipProvider>
      <Suspense
        fallback={
          <div className="h-full w-ful !rounded-none flex justify-center items-center">
            <LazyIcon name="loader-circle" className="animate-spin" />
          </div>
        }
      >
        <PlateAppEditor
          onValueChange={handleChangeContent}
          copilotStream={createMessage}
          key={mainLLMInfo?.llm?.name || 'default'}
          hideDragIcon
          enableHistoryControl
        />
      </Suspense>
    </div>
  )
})

export default EditorApplication
