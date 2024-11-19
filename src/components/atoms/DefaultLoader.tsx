import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import LazyIcon from 'src/components/atoms/LazyIcon'
import Typing from 'src/lib/kokonutui/typing'

export const DefaultLoader = memo(() => {
  const { t } = useTranslation('common')
  return (
    <div className="tw-flex tw-items-center tw-justify-center tw-h-screen">
      <LazyIcon size={30} name="loader-circle" className="tw-animate-spin" />
      <div className="tw-ml-4 tw-text-lg tw-font-semibold tw-text-center">
        <Typing text={t('loading')} resetDelay={5000} />
      </div>
    </div>
  )
})
