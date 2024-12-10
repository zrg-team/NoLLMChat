import { memo, useCallback, useState } from 'react'
import { NodeProps, useInternalNode } from '@xyflow/react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'src/lib/shadcn/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/lib/shadcn/ui/select'
import { useToast } from 'src/lib/hooks/use-toast'
import { VectorDatabaseProviderEnum, VectorDatabaseStorageEnum } from 'src/services/database/types'
import { useTranslation } from 'react-i18next'
import { Label } from 'src/lib/shadcn/ui/label'
import { Input } from 'src/lib/shadcn/ui/input'
import { useCreateVectorDatabase } from 'src/hooks/flows/mutations/use-create-vector-database'
import LoadingButton from 'src/components/atoms/LoadingButton'

import {
  SUPPORTED_TEXT_SPLITTERS,
  SUPPORTED_VECTOR_DATABASE_PROVIDERS,
  SUPPORTED_VECTOR_DATABASE_SOURCE_TYPE,
} from './constants'

const CreateVectorDatabaseCard = memo((props: NodeProps) => {
  const { t } = useTranslation('components')
  const { id } = props
  const node = useInternalNode(id)
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [provider, setProvider] = useState<`${VectorDatabaseProviderEnum}`>(
    SUPPORTED_VECTOR_DATABASE_PROVIDERS[0],
  )
  const [storageType, setStorageType] = useState<`${VectorDatabaseStorageEnum}`>(
    SUPPORTED_VECTOR_DATABASE_SOURCE_TYPE[0],
  )
  const [textSplitter, setTextSplitter] = useState<{
    type?: string
    chunkSize?: number
    chunkOverlap?: number
  }>({})
  const { loading, createVectorDatabase } = useCreateVectorDatabase()

  const handleOnSelectProvider = useCallback((value: `${VectorDatabaseProviderEnum}`) => {
    setProvider(value)
  }, [])

  const handleOnSelectStorageType = useCallback((value: `${VectorDatabaseStorageEnum}`) => {
    setStorageType(value)
  }, [])

  const handleOnSelectTextSplitter = useCallback((value: string) => {
    setTextSplitter((prev) => ({ ...prev, type: value, chunkSize: 500, chunkOverlap: 40 }))
  }, [])

  const handleOnChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value || '')
  }, [])

  const handleOnChangeChunkSize = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSplitter((prev) => ({ ...prev, chunkSize: Number(e.target.value) }))
  }, [])

  const handleOnChangeChunkOverlap = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSplitter((prev) => ({ ...prev, chunkOverlap: Number(e.target.value) }))
  }, [])

  const handleSubmit = async () => {
    try {
      if (!node) {
        return
      }
      await createVectorDatabase(
        node,
        {
          name,
          provider,
          storage: storageType,
        },
        textSplitter?.type
          ? {
              type: textSplitter.type,
              chunkSize: textSplitter.chunkSize || 500,
              chunkOverlap: textSplitter.chunkOverlap || 0,
            }
          : undefined,
      )
      setName('')
      setTextSplitter({})
    } catch {
      toast({
        variant: 'destructive',
        description: t('create_vector_database_card.errors.create_failed'),
      })
    }
  }

  return (
    <Card className="mw-full">
      <CardHeader>
        <CardTitle>{t('create_vector_database_card.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-1.5">
          <Label>{t('create_vector_database_card.name')}</Label>
          <Input className="mb-4" value={name} onChange={handleOnChangeName} />
          {SUPPORTED_VECTOR_DATABASE_SOURCE_TYPE?.length > 1 ? (
            <>
              <Label>{t('create_vector_database_card.storage_type')}</Label>
              <Select value={storageType} onValueChange={handleOnSelectStorageType}>
                <SelectTrigger className="w-full mb-4">
                  <SelectValue
                    placeholder={t('create_vector_database_card.provider_select_placeholder')}
                  />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(SUPPORTED_VECTOR_DATABASE_SOURCE_TYPE).map((item) => {
                    return (
                      <SelectItem key={item} value={item}>
                        {t(`create_vector_database_card.storage_types.${item.toLowerCase()}`)}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </>
          ) : undefined}
          {SUPPORTED_VECTOR_DATABASE_PROVIDERS?.length > 1 ? (
            <>
              <Label>{t('create_vector_database_card.provider')}</Label>
              <Select value={provider} onValueChange={handleOnSelectProvider}>
                <SelectTrigger className="w-full mb-4">
                  <SelectValue
                    placeholder={t('create_vector_database_card.provider_select_placeholder')}
                  />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(SUPPORTED_VECTOR_DATABASE_PROVIDERS).map((item) => {
                    return (
                      <SelectItem key={item} value={item}>
                        {t(`create_vector_database_card.providers.${item.toLowerCase()}`)}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </>
          ) : undefined}
          <Label>{t('create_vector_database_card.text_splitter')}</Label>
          <Select value={textSplitter.type} onValueChange={handleOnSelectTextSplitter}>
            <SelectTrigger className="w-full mb-4">
              <SelectValue
                placeholder={t('create_vector_database_card.text_splitter_select_placeholder')}
              />
            </SelectTrigger>
            <SelectContent>
              {Object.values(SUPPORTED_TEXT_SPLITTERS).map((item) => {
                return (
                  <SelectItem key={item} value={item}>
                    {t(`create_vector_database_card.text_splitters.${item.toLowerCase()}`)}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          {textSplitter.type ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {t('create_vector_database_card.text_splitter_configuration')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Label>{t('create_vector_database_card.text_splitter_chunksize')}</Label>
                <Input
                  value={textSplitter.chunkSize}
                  onChange={handleOnChangeChunkSize}
                  placeholder={t('create_vector_database_card.text_splitter_chunksize_placeholder')}
                />
                <Label>{t('create_vector_database_card.text_splitter_chunkoverlap')}</Label>
                <Input
                  value={textSplitter.chunkOverlap}
                  onChange={handleOnChangeChunkOverlap}
                  placeholder={t(
                    'create_vector_database_card.text_splitter_chunkoverlap_placeholder',
                  )}
                />
              </CardContent>
            </Card>
          ) : undefined}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <LoadingButton
          disabled={!textSplitter.type || !name}
          loading={loading}
          onClick={handleSubmit}
          className="w-full"
        >
          {t('create_vector_database_card.create')}
        </LoadingButton>
      </CardFooter>
    </Card>
  )
})

export default CreateVectorDatabaseCard
