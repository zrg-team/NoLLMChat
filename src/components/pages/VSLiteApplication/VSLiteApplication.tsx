'use client'

import { memo, lazy, Suspense } from 'react'
import LazyIcon from 'src/components/atoms/LazyIcon'
import LLMIcon from 'src/components/atoms/LLMIcon'
import { cn } from 'src/lib/utils'
import { LLMStatusEnum } from 'src/services/database/types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'src/lib/shadcn/ui/tooltip'

import { useCreateMessage } from './hooks/use-create-message'
import { useFileSystemTree } from './hooks/use-file-system-tree'

const VSLiteApp = lazy(() => import('src/lib/vslite/index'))

const VSLiteApplication = memo(() => {
  const { loading, mainLLMInfo, loadCurrentModel } = useCreateMessage()
  const { fileSystemTree, updateCodeContainerFile } = useFileSystemTree()

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
                mainLLMInfo.progress
              ) : mainLLMInfo?.status === LLMStatusEnum.Loaded ? (
                mainLLMInfo?.llm?.name || ''
              ) : loading ? (
                <LazyIcon size={16} name="loader-circle" className="animate-spin ml-2" />
              ) : undefined}
              {mainLLMInfo?.llm && mainLLMInfo?.status !== LLMStatusEnum.Loaded ? (
                <LazyIcon
                  size={16}
                  name="loader-circle"
                  onClick={loadCurrentModel}
                  className="animate-spin ml-2"
                />
              ) : undefined}
            </TooltipTrigger>
            <TooltipContent>
              <p>{mainLLMInfo?.progress || mainLLMInfo?.llm?.name || ''}</p>
            </TooltipContent>
          </div>
        </Tooltip>
      </TooltipProvider>
      <Suspense
        fallback={
          <div className="h-full w-full flex justify-center items-center">
            <LazyIcon name="loader-circle" className="animate-spin" />
          </div>
        }
      >
        {fileSystemTree !== undefined ? (
          <VSLiteApp
            autoLoad
            hideAppName
            llm={mainLLMInfo?.llm}
            fileSystemTree={fileSystemTree}
            onUpdateFileContent={updateCodeContainerFile}
          />
        ) : undefined}
      </Suspense>
    </div>
  )
})

export default VSLiteApplication
