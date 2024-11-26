import { lazy, Suspense, memo, LazyExoticComponent } from 'react'
import type { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

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
    <Suspense fallback={<div className={props.className} />}>
      <LucideIcon {...props} />
    </Suspense>
  )
})

export default LazyIcon
