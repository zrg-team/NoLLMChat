import { cn } from 'src/lib/utils'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('tw-animate-pulse tw-rounded-md tw-bg-muted', className)} {...props} />
}

export { Skeleton }
