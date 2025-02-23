import { FC, PropsWithChildren } from 'react'
import { SessionLocalServiceProvider } from './SessionLocalServiceProvider'

export function withSessionLocalServiceProvider<P extends PropsWithChildren>(
  WrappedComponent: React.ComponentType<P>,
): FC<P> {
  return (props) => {
    return (
      <SessionLocalServiceProvider>
        <WrappedComponent {...props} />
      </SessionLocalServiceProvider>
    )
  }
}
