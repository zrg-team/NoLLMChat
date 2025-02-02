import { lazy, memo, PropsWithChildren, Suspense, useMemo } from 'react'
import type { MarkdownPreviewProps } from '@uiw/react-markdown-preview'
import { useAppState } from 'src/states/app'
import { cn } from 'src/lib/utils'

const MarkdownPreview = lazy(() => import('@uiw/react-markdown-preview'))

export const MarkdownViewer: React.FC<MarkdownPreviewProps> = memo(
  ({ source, className, ...rest }) => {
    const theme = useAppState((state) => state.theme)

    const components = useMemo(
      () => ({
        pre: ({ children, className, ...rest }: PropsWithChildren & { className?: string }) => (
          <pre {...rest} className={cn(className, 'nowheel')}>
            {children}
          </pre>
        ),
        think: ({ children }: PropsWithChildren) => (
          <blockquote className="think">{children}</blockquote>
        ),
      }),
      [],
    )

    return (
      <Suspense>
        <MarkdownPreview
          className={cn(
            '!text-sm [&_p]:leading-relaxed !max-w-full !bg-transparent !font-sans',
            className,
          )}
          source={source}
          wrapperElement={{
            'data-color-mode': theme === 'dark' ? 'dark' : 'light',
          }}
          components={components}
          {...rest}
        />
      </Suspense>
    )
  },
  (prevProps, nextProps) => prevProps.source === nextProps.source,
)
