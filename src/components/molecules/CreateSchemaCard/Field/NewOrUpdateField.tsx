import { memo, useCallback, useMemo, useState } from 'react'
import { Input } from 'src/lib/shadcn/ui/input'
import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/lib/shadcn/ui/select'
import { Label } from 'src/lib/shadcn/ui/label'
import { Checkbox } from 'src/lib/shadcn/ui/checkbox'
import { Button } from 'src/lib/shadcn/ui/button'
import FieldList from './FieldList'
import { SchemaItemType } from './type'
import { toast } from 'src/lib/hooks/use-toast'
import { generateUUID } from 'src/utils/uuid'

const NewOrUpdateField = memo(
  ({
    setData,
    data,
    id,
  }: {
    id?: string
    setData: (func: (data: SchemaItemType[]) => SchemaItemType[]) => void
    data: SchemaItemType[]
  }) => {
    const { t } = useTranslation('components')
    const [empty, setEmpty] = useState<SchemaItemType>({
      name: '',
      description: '',
      type: 'string',
      required: false,
      data: [],
    })

    const currentRow = useMemo(() => {
      return id ? data.find((item) => item.id === id) || empty : empty
    }, [data, empty, id])

    const handleChangeName = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value && !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(e.target.value)) {
          return
        }
        if (!id) {
          setEmpty((item) => ({ ...item, name: e.target.value || '' }))
        } else {
          setData((previous) => {
            return [
              ...previous.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      name: e.target.value || '',
                    }
                  : item,
              ),
            ]
          })
        }
      },
      [id, setData],
    )

    const handleChangeDescription = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!id) {
          setEmpty((item) => ({ ...item, description: e.target.value || '' }))
        } else {
          setData((previous) => {
            return [
              ...previous.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      description: e.target.value || '',
                    }
                  : item,
              ),
            ]
          })
        }
      },
      [id, setData],
    )

    const handleChangeType = useCallback(
      (e: string) => {
        if (!id) {
          setEmpty((item) => ({ ...item, type: (e || 'string') as SchemaItemType['type'] }))
        } else {
          setData((previous) => {
            return [
              ...previous.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      type: (e || '') as SchemaItemType['type'],
                    }
                  : item,
              ),
            ]
          })
        }
      },
      [id, setData],
    )

    const handleChangeRequired = useCallback(
      (e: string | boolean) => {
        if (!id) {
          setEmpty((item) => ({ ...item, required: !!e || false }))
        } else {
          setData((previous) => {
            return [
              ...previous.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      required: !!e || false,
                    }
                  : item,
              ),
            ]
          })
        }
      },
      [id, setData],
    )

    const handleChangeEnum = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!id) {
          setEmpty((item) => ({ ...item, enum: e.target.value || '' }))
        } else {
          setData((previous) => {
            return [
              ...previous.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      enum: e.target.value || '',
                    }
                  : item,
              ),
            ]
          })
        }
      },
      [id, setData],
    )

    const handleAddNew = useCallback(() => {
      if (data.find((item) => item.name === empty.name)) {
        return toast({
          variant: 'destructive',
          content: 'Name already exists',
        })
      }
      empty.id = generateUUID()
      setData((items) => {
        return [...items, { ...empty }]
      })
      setEmpty({
        name: '',
        description: '',
        type: 'string',
        required: false,
        id: generateUUID(),
        parent: id || undefined,
        data: [],
      })
    }, [data, empty, setData, id])

    const handleSetChildData = useCallback(
      (func: (previous: SchemaItemType[]) => SchemaItemType[]) => {
        setData((previousData) => {
          return [
            ...previousData.map((item) =>
              item.id === id
                ? {
                    ...item,
                    data: func(item.data || []),
                  }
                : item,
            ),
          ]
        })
      },
      [id, setData],
    )

    const shouldShowChildData = ['object', 'array'].includes(currentRow.type)

    return (
      <div className="w-full p-1">
        <div>
          <Label>{t('add_schema_card.field.name')}</Label>
          <Input
            id="name"
            onChange={handleChangeName}
            placeholder={t('add_schema_card.field.name_placeholder')}
            value={currentRow?.name || ''}
          />
        </div>
        <div>
          <Label>{t('add_schema_card.field.description')}</Label>
          <Input
            id="description"
            placeholder={t('add_schema_card.field.description_placeholder')}
            onChange={handleChangeDescription}
            value={currentRow?.description || ''}
          />
        </div>
        <div>
          <Label>{t('add_schema_card.field.type')}</Label>
          <Select onValueChange={handleChangeType} value={currentRow?.type || ''}>
            <SelectTrigger>
              <SelectValue placeholder={t('add_schema_card.field.type_placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="string">{t('add_schema_card.types.string')}</SelectItem>
              <SelectItem value="boolean">{t('add_schema_card.types.boolean')}</SelectItem>
              <SelectItem value="number">{t('add_schema_card.types.number')}</SelectItem>
              <SelectItem value="object">{t('add_schema_card.types.object')}</SelectItem>
              <SelectItem value="array">{t('add_schema_card.types.array')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center h-10">
          <Label>{t('add_schema_card.field.required')}</Label>
          <Checkbox
            className="ml-2"
            aria-label="Select row"
            onCheckedChange={handleChangeRequired}
            checked={currentRow?.required}
          />
        </div>
        {shouldShowChildData ? (
          <div className="mt-2 flex flex-col gap-2">
            <Label>{t('add_schema_card.children')}</Label>
            <FieldList data={currentRow?.data || []} setData={handleSetChildData} />
          </div>
        ) : null}
        {currentRow?.type === 'enum' ? (
          <div className="mt-2 flex flex-col gap-2">
            <Label>{t('add_schema_card.field.enum')}</Label>
            <Input id="enum" onChange={handleChangeEnum} placeholder="Enum" />
          </div>
        ) : null}
        {!id ? (
          <div className="w-full flex justify-end mt-2">
            <Button
              variant="secondary"
              disabled={!currentRow.name || !currentRow.description || !currentRow.type}
              onClick={handleAddNew}
              className="w-full"
            >
              {t('add_schema_card.field.add_field')}
            </Button>
          </div>
        ) : null}
      </div>
    )
  },
)

export default NewOrUpdateField
