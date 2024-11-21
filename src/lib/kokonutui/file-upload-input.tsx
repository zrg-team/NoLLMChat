'use client'

import { useState, Dispatch, SetStateAction, useMemo } from 'react'
import { cn } from 'src/lib/utils'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation('atoms')
  const [isDragging, setIsDragging] = useState(false)
  const { fileName, fileInputRef, clearFile, error, validateAndSetFile, fileSize } = useFileInput({
    accept: fileOptions?.accept || 'image/*',
    maxSize: fileOptions?.maxSize || 3,
  })

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
        <div className="tw-w-16 tw-h-16 tw-rounded-lg tw-bg-zinc-100 dark:tw-bg-zinc-800 tw-flex tw-items-center tw-justify-center">
          <LazyIcon name="file-text" className="tw-w-8 tw-h-8 tw-text-zinc-400" />
        </div>
      )
    }

    const isImage = file.type.startsWith('image/')
    return (
      <div className="tw-relative tw-w-16 tw-h-16 tw-rounded-lg tw-overflow-hidden">
        {isImage ? (
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="tw-w-full tw-h-full tw-object-cover"
          />
        ) : (
          <LazyIcon className="tw-w-14 tw-h-14" name="file-text" />
        )}
      </div>
    )
  }, [file])

  return (
    <>
      <div
        className={cn(
          'tw-relative tw-group tw-cursor-pointer',
          'tw-rounded-lg tw-border-2 tw-border-dashed',
          'tw-transition-colors tw-duration-200',
          isDragging
            ? 'tw-border-indigo-500 tw-bg-indigo-50/50 dark:tw-bg-indigo-500/10'
            : 'tw-border-zinc-200 dark:tw-border-zinc-800',
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
          accept={fileOptions?.accept || 'image/*'}
          onChange={handleChange}
          className="tw-hidden"
        />

        <div className="tw-p-8 tw-space-y-4">
          {!fileName ? (
            <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
              <LazyIcon
                name="upload"
                className="tw-w-8 tw-h-8 tw-text-zinc-400 dark:tw-text-zinc-500"
              />
              <p className="tw-text-sm tw-text-zinc-600 dark:tw-text-zinc-400">
                {t('file_upload_input.drop_file')}
              </p>
            </div>
          ) : (
            <div className="tw-flex tw-items-center tw-gap-4">
              {preview}
              <div className="tw-flex-1 tw-min-w-0">
                <p className="tw-text-sm tw-font-medium tw-truncate">
                  {fileName || 'No file selected'}
                </p>
                <p className="tw-text-xs tw-text-zinc-500">
                  {fileSize ? `${(fileSize / 1024 / 1024).toFixed(2)} MB` : '0 MB'}
                </p>
                {progress && progress < 1 ? (
                  <div className="tw-mt-2 tw-h-1 tw-w-full tw-bg-zinc-100 dark:tw-bg-zinc-800 tw-rounded-full tw-overflow-hidden">
                    <div
                      className="tw-h-full tw-bg-indigo-500 tw-transition-all tw-duration-200"
                      style={{
                        width: `${progress * 100}%`,
                      }}
                    />
                  </div>
                ) : undefined}
              </div>
              <button
                type="button"
                disabled={loading}
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile()
                }}
                className="tw-p-1 hover:tw-bg-zinc-100 dark:hover:tw-bg-zinc-800 tw-rounded"
              >
                <LazyIcon name="x" className="tw-w-5 tw-h-5 tw-text-zinc-400" />
              </button>
            </div>
          )}
        </div>
      </div>
      {error ? <p className="tw-text-red-500">{error}</p> : undefined}
    </>
  )
}
