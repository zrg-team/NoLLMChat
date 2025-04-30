import { memo } from 'react'
import { useMainVSLiteAppContext } from '../contexts/main'

export const CustomPanel = memo(() => {
  const { renderCustomPanel, ...rest } = useMainVSLiteAppContext()

  return renderCustomPanel?.(rest)
})
