import { memo, RefObject, useEffect, useRef, useState } from 'react'
import { usePreventPitchZoom } from 'src/hooks/use-prevent-pitch-zoom'
import { useWebContainerState } from 'src/services/web-container/state'

const ContainerBrowser = memo(({ iframeRef }: { iframeRef?: RefObject<HTMLIFrameElement> }) => {
  const [url, setURL] = useState('')
  const webcontainerInstance = useWebContainerState((state) => state.webcontainerInstance)
  const editorRef = useRef<HTMLDivElement | null>(null)

  usePreventPitchZoom(editorRef)

  useEffect(() => {
    if (!webcontainerInstance) {
      return
    }
    const remove = webcontainerInstance.on('server-ready', (_, url) => {
      setURL(url)
    })
    return () => {
      remove()
    }
  }, [webcontainerInstance])

  return (
    <div ref={editorRef} className="flex-1 w-full flex relative max-w-full flex-col">
      <div className="relative flex items-center w-full py-3 px-24 bg-neutral-300">
        <div className="flex justify-center items-center size-full rounded-lg text-[.25rem] sm:text-[.5rem] bg-neutral-200 text-neutral-400 overflow-hidden">
          {url?.length > 42 ? `${url.substring(0, 42)}...` : 'No URL'}
        </div>
      </div>
      <div className="bg-background w-full flex-1 nowheel nodrag overflow-auto">
        <iframe
          src={url}
          ref={iframeRef}
          className="min-h-full w-full"
          allow="cross-origin-isolated"
          // @ts-expect-error no sure why this is not working
          credentialless
        />
      </div>
    </div>
  )
})

export default ContainerBrowser
