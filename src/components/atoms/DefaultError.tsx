import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import LazyIcon from 'src/components/atoms/LazyIcon'

export const DefaultError = memo(({ error }: { error?: string }) => {
  const { t } = useTranslation('common')
  return (
    <div className="flex items-center justify-center h-screen">
      <LazyIcon size={30} name="shield-alert" />
      <div className="ml-4 text-lg font-semibold text-center">
        {error || t('something_went_wrong')}
      </div>
    </div>
  )
})
