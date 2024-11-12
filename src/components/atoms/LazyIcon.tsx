import { lazy, Suspense, memo, LazyExoticComponent } from 'react'
import type { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

const fallback = <div style={{ background: '#ddd', width: 24, height: 24 }} />

export type IconNames = keyof typeof dynamicIconImports
type IconCache = {
  [key in IconNames]?: LazyExoticComponent<React.ComponentType<LucideProps>>
}

const iconCache: IconCache = {}

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconNames
}

const LazyIcon = memo(({ name, ...props }: IconProps) => {
  const iconName = name

  if (!dynamicIconImports[iconName]) {
    throw new Error(`No icon found for ${iconName}`)
  }

  if (!iconCache[iconName]) {
    iconCache[iconName] = lazy(dynamicIconImports[iconName])
  }

  const LucideIcon = iconCache[iconName]

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  )
})

export default LazyIcon
