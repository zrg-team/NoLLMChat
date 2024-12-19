import { cn } from '@udecode/cn'
import { type VariantProps, cva } from 'class-variance-authority'
import type { LucideProps } from 'lucide-react'
import LazyIcon from 'src/components/atoms/LazyIcon'

const spinnerVariants = cva('animate-spin text-muted-foreground', {
  defaultVariants: {
    size: 'default',
  },
  variants: {
    size: {
      default: 'size-4',
      icon: 'size-10',
      lg: 'size-6',
      sm: 'size-2',
    },
  },
})

export const Spinner = ({
  className,
  size,
  ...props
}: Partial<LucideProps & VariantProps<typeof spinnerVariants>>) => (
  <LazyIcon className={cn(spinnerVariants({ size }), className)} {...props} name={'loader'} />
)
