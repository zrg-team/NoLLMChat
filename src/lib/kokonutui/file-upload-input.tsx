'use client'

import { useState } from 'react'
import { cn } from 'src/lib/utils'
import { Upload, X, FileText } from 'lucide-react'
import { useFileInput, UseFileInputOptions } from './use-file-input'
import { Button } from '../shadcn/ui/button'

export default function FileUploadInput({
  onFileSubmit,
  fileOptions,
}: {
  onFileSubmit: (file: File) => Promise<void>
  fileOptions?: UseFileInputOptions
}) {
  const [file, setFile] = useState<File>()
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { fileName, fileInputRef, clearFile, error, validateAndSetFile, fileSize } = useFileInput({
    accept: fileOptions?.accept || 'image/*',
    maxSize: fileOptions?.maxSize || 3,
  })

  function handleFile(file: File) {
    validateAndSetFile(file)

    if (!error) {
      setFile(file)
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
    setPreview(null)
    setUploadProgress(0)
  }

  function handleFileSubmit() {
    if (!file) return

    onFileSubmit(file)
  }

  return (
    <div className="tw-w-full tw-max-w-md tw-space-y-2 tw-mt-4">
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
              <Upload className="tw-w-8 tw-h-8 tw-text-zinc-400 dark:tw-text-zinc-500" />
              <p className="tw-text-sm tw-text-zinc-600 dark:tw-text-zinc-400">
                Drag and drop or click to upload
              </p>
            </div>
          ) : (
            <div className="tw-flex tw-items-center tw-gap-4">
              {preview ? (
                <div className="tw-relative tw-w-16 tw-h-16 tw-rounded-lg tw-overflow-hidden">
                  <img
                    src={preview}
                    alt="Preview"
                    className="tw-w-full tw-h-full tw-object-cover"
                  />
                </div>
              ) : (
                <div className="tw-w-16 tw-h-16 tw-rounded-lg tw-bg-zinc-100 dark:tw-bg-zinc-800 tw-flex tw-items-center tw-justify-center">
                  <FileText className="tw-w-8 tw-h-8 tw-text-zinc-400" />
                </div>
              )}
              <div className="tw-flex-1 tw-min-w-0">
                <p className="tw-text-sm tw-font-medium tw-truncate">
                  {fileName || 'No file selected'}
                </p>
                <p className="tw-text-xs tw-text-zinc-500">
                  {fileSize ? `${(fileSize / 1024 / 1024).toFixed(2)} MB` : '0 MB'}
                </p>
                {uploadProgress < 100 && (
                  <div className="tw-mt-2 tw-h-1 tw-w-full tw-bg-zinc-100 dark:tw-bg-zinc-800 tw-rounded-full tw-overflow-hidden">
                    <div
                      className="tw-h-full tw-bg-indigo-500 tw-transition-all tw-duration-200"
                      style={{
                        width: `${uploadProgress}%`,
                      }}
                    />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile()
                }}
                className="tw-p-1 hover:tw-bg-zinc-100 dark:hover:tw-bg-zinc-800 tw-rounded"
              >
                <X className="tw-w-5 tw-h-5 tw-text-zinc-400" />
              </button>
            </div>
          )}
        </div>
      </div>
      <Button disabled={!file} onClick={handleFileSubmit} className="tw-w-full tw-mt-4">
        Upload
      </Button>
    </div>
  )
}
