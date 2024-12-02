import { memo } from 'react'
import { Button, ButtonProps } from 'src/lib/shadcn/ui/button'
import LazyIcon from 'src/components/atoms/LazyIcon'

const LoadingButton = memo((props: ButtonProps & { loading?: boolean }) => {
  const { loading, ...rest } = props
  return (
    <Button {...rest} disabled={props.disabled || loading}>
      {loading ? <LazyIcon name="loader-circle" className="animate-spin" /> : props.children}
    </Button>
  )
})

export default LoadingButton
