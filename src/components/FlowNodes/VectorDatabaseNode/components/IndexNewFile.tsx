'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LazyIcon from 'src/components/atoms/LazyIcon'
import FileUploadInput from 'src/lib/kokonutui/file-upload-input'
import { UseFileInputOptions } from 'src/lib/kokonutui/use-file-input'
import { Button } from 'src/lib/shadcn/ui/button'

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

  function handleFileSubmit() {
    if (!file) return

    onFileSubmit(file)
  }

  return (
    <div className="tw-w-full tw-max-w-md tw-space-y-2 tw-mt-4">
      <div className="tw-mb-6">
        <FileUploadInput
          progress={progress}
          loading={loading}
          fileOptions={fileOptions}
          setFile={setFile}
          file={file}
        />
      </div>
      <Button disabled={!file || loading} onClick={handleFileSubmit} className="tw-w-full tw-mt-4">
        {loading ? (
          <LazyIcon name="loader-circle" className="tw-animate-spin" />
        ) : (
          t('vector_database_node.add_file.upload')
        )}
      </Button>
    </div>
  )
}
