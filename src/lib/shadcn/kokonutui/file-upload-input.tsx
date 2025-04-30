'use client'

import { useState, Dispatch, SetStateAction, useMemo, useEffect } from 'react'
import { cn } from 'src/lib/utils'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { useTranslation } from 'react-i18next'
import { BorderBeam } from 'src/lib/shadcn/ui/border-beam'
import { useToast } from 'src/lib/hooks/use-toast'

import { useFileInput, UseFileInputOptions } from './use-file-input'

export default function FileUploadInput({
  file,
  setFile,
  loading,
  progress,
  fileOptions,
}: {
  file?: File
  progress?: number
  loading?: boolean
  setFile: Dispatch<SetStateAction<File | undefined>>
  fileOptions?: UseFileInputOptions
}) {
  const { toast } = useToast()
  const { t } = useTranslation('atoms')
  const [isDragging, setIsDragging] = useState(false)
  const { fileName, fileInputRef, clearFile, error, validateAndSetFile, fileSize } = useFileInput({
    accept: fileOptions?.accept || 'image/*',
    maxSize: fileOptions?.maxSize || 3,
  })

  useEffect(() => {
    if (!file) {
      clearFile()
    }
  }, [clearFile, file])

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        variant: 'destructive',
      })
    }
  }, [error, toast])

  function handleFile(file: File) {
    const result = validateAndSetFile(file)

    if (result) {
      setFile(result)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (!droppedFile) return

    handleFile(droppedFile)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    handleFile(selectedFile)
  }

  function removeFile() {
    clearFile()
    setFile(undefined)
  }

  const preview = useMemo(() => {
    if (!file) {
      return (
        <div className="w-16 h-16 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <LazyIcon name="file-text" className="w-8 h-8 text-zinc-400" />
        </div>
      )
    }

    const isImage = file.type.startsWith('image/')
    return (
      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
        {isImage ? (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <LazyIcon className="w-14 h-14" name="file-text" />
        )}
      </div>
    )
  }, [file])

  return (
    <>
      <div
        className={cn(
          'relative group cursor-pointer',
          'rounded-lg border-2 border-dashed',
          'transition-colors duration-200',
          isDragging
            ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-500/10'
            : 'border-zinc-200 dark:border-zinc-800',
        )}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            fileInputRef.current?.click()
          }
        }}
        aria-label="Upload file"
      >
        <input
          ref={fileInputRef}
          type="file"
          disabled={loading || !!(progress && progress < 1)}
          accept={fileOptions?.accept || 'image/*'}
          onChange={handleChange}
          className="hidden"
        />

        <div className="p-8 space-y-4">
          {!fileName ? (
            <div className="flex flex-col items-center gap-2">
              <LazyIcon name="upload" className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t('file_upload_input.drop_file')}
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {preview}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {fileName || 'No file selected'}{' '}
                  <span className="text-xs text-zinc-500 leading-5">
                    {fileSize ? `(${(fileSize / 1024 / 1024).toFixed(2)} MB)` : ''}
                  </span>
                </p>
                {progress && progress < 1 ? (
                  <div className="flex items-center gap-2 text-xs">
                    <p>{(progress * 100).toFixed(2)} %</p>
                    <div className="h-1 flex-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden items-center flex">
                      <div
                        className="h-full bg-indigo-500 transition-all duration-200"
                        style={{
                          width: `${progress * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ) : undefined}
              </div>
              <button
                type="button"
                disabled={loading || !!(progress && progress < 1)}
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile()
                }}
                className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded"
              >
                <LazyIcon name="x" className="w-5 h-5 text-zinc-400" />
              </button>
              {progress && progress < 1 ? <BorderBeam className="rounded-lg" /> : undefined}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
