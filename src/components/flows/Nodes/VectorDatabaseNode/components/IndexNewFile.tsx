'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LoadingButton from 'src/components/atoms/LoadingButton'
import FileUploadInput from 'src/lib/kokonutui/file-upload-input'
import { UseFileInputOptions } from 'src/lib/kokonutui/use-file-input'

export default function IndexNewFile({
  onFileSubmit,
  fileOptions,
  progress,
  loading,
}: {
  loading?: boolean
  progress?: number
  onFileSubmit: (file: File) => Promise<void>
  fileOptions?: UseFileInputOptions
}) {
  const { t } = useTranslation('flows')
  const [file, setFile] = useState<File>()

  const handleFileSubmit = async () => {
    if (!file) return

    await onFileSubmit(file)
    setFile(undefined)
  }

  return (
    <div className="w-full max-w-md space-y-2 mt-4">
      <div className="mb-6">
        <FileUploadInput
          progress={progress}
          loading={loading}
          fileOptions={fileOptions}
          setFile={setFile}
          file={file}
        />
      </div>
      <LoadingButton
        loading={loading}
        disabled={!file}
        onClick={handleFileSubmit}
        className="w-full mt-4"
      >
        {t('vector_database_node.add_file.index')}
      </LoadingButton>
    </div>
  )
}
