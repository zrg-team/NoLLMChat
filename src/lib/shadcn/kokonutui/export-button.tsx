'use client'

import { useState, useEffect } from 'react'
import { Button } from 'src/lib/shadcn/ui/button'
import { cn } from 'src/lib/utils'
import LazyIcon from 'src/components/atoms/LazyIcon'

interface ExportButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onProcess?: () => Promise<boolean>
  processDuration?: number
}

export default function ExportButton({
  className,
  onProcess = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return Math.random() > 0.5
  },
  processDuration = 2000,
  ...props
}: ExportButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
  const [isScaling, setIsScaling] = useState(false)
  const [, setProgress] = useState(0)

  useEffect(() => {
    if (isProcessing) {
      const startTime = Date.now()
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime
        const newProgress = (elapsed / processDuration) * 100

        if (newProgress >= 100) {
          clearInterval(interval)
          setProgress(100)
        } else {
          setProgress(newProgress)
        }
      }, 10)

      return () => clearInterval(interval)
    }
  }, [isProcessing, processDuration])

  async function handleClick() {
    if (isProcessing) return

    setIsProcessing(true)
    setIsSuccess(null)
    setProgress(0)

    await new Promise((resolve) => setTimeout(resolve, processDuration))
    const success = onProcess ? await onProcess() : true

    setIsSuccess(success)
    setIsProcessing(false)
    setIsScaling(true)

    setTimeout(() => {
      setIsSuccess(null)
      setProgress(0)
      setIsScaling(false)
    }, 2000)
  }

  return (
    <Button
      className={cn(
        'relative group',
        'transition-all duration-300',
        isProcessing && 'cursor-wait',
        className,
      )}
      variant="ghost"
      onClick={handleClick}
      disabled={isProcessing}
      {...props}
    >
      <div
        className={cn(
          'w-full flex items-center justify-center gap-2',
          isScaling && 'animate-[scale_300ms_ease-in-out]',
        )}
      >
        {isSuccess === null ? (
          <>
            <LazyIcon
              name="forward"
              className={cn(
                'w-4 h-4 transition-transform duration-200',
                'group-hover:scale-110',
                isProcessing && 'animate-bounce',
              )}
            />
          </>
        ) : isSuccess ? (
          <>
            <LazyIcon name="check" className="w-4 h-4 text-green-500" />
          </>
        ) : (
          <>
            <LazyIcon name="x" className="w-4 h-4 text-red-500" />
          </>
        )}
      </div>
    </Button>
  )
}
