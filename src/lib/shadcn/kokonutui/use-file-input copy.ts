import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export interface UseFileInputOptions {
  accept?: string
  maxSize?: number
}

export function useFileInput({ accept, maxSize }: UseFileInputOptions) {
  const { t } = useTranslation('atoms')
  const [fileName, setFileName] = useState<string>('')
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileSize, setFileSize] = useState<number>(0)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    validateAndSetFile(file)
  }

  const validateAndSetFile = (file: File | undefined) => {
    setError('')

    if (file) {
      if (maxSize && file.size > maxSize * 1024 * 1024) {
        setError(
          t('file_upload_input.errors.max_size', {
            maxSize,
            fileSize: (file.size / 1024 / 1024).toFixed(2),
          }),
        )
        return
      }

      const acceptFiles = accept?.split(',').map((a) => a.replace('.', '').trim())
      if (
        accept &&
        !file.type.match(accept.replace('/*', '')) &&
        !acceptFiles?.some((item) => file.type.includes(item))
      ) {
        setError(t('file_upload_input.errors.accept', { accept }))
        return
      }

      setFileSize(file.size)
      setFileName(file.name)
      return file
    }
  }

  const clearFile = () => {
    setFileName('')
    setError('')
    setFileSize(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return {
    fileName,
    error,
    fileInputRef,
    handleFileSelect,
    validateAndSetFile,
    clearFile,
    fileSize,
  }
}
