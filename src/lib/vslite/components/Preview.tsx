import type { IDockviewPanelProps } from 'dockview'
import { usePreview } from 'src/hooks/use-preview'
import { Input } from 'src/lib/shadcn/ui/input'

import { useMainVSLiteAppContext } from '../contexts/main'
import { memo, useEffect, useRef, useState } from 'react'

export const Preview = memo(
  (props: IDockviewPanelProps<{ url: string }>) => {
    const { params } = props
    const { previewElementRef, containerPreviewInfo } = useMainVSLiteAppContext()
    const urlInputRef = useRef<HTMLInputElement>(null)
    const [url, setUrl] = useState(params.url)
    const { iframeId } = usePreview()

    useEffect(() => {
      const newURL = containerPreviewInfo?.url || params.url
      setUrl(newURL)
      if (urlInputRef.current) {
        urlInputRef.current.value = newURL
      }
    }, [params.url, containerPreviewInfo?.url, urlInputRef.current])

    return (
      <div className="w-full h-full flex flex-col">
        <div className="p-2 w-full">
          <Input
            type="url"
            ref={urlInputRef}
            className="px-2 py-1 h-8 text-sm text-black rounded-full"
            defaultValue={url}
            onBlur={(e) => {
              setUrl(e.target.value)
            }}
          />
        </div>
        <iframe
          ref={previewElementRef}
          id={iframeId}
          className="w-full flex-1"
          src={url}
          allow="cross-origin-isolated; fullscreen" // Add other permissions as needed
          sandbox="allow-same-origin allow-scripts" // Use the sandbox attribute to further fine-tune permissions, if applicable
          // @ts-expect-error no sure why this is not working
          credentialless
        />
      </div>
    )
  },
  () => true,
)
