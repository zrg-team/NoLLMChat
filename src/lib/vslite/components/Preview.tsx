import type { IDockviewPanelProps } from 'dockview'
import { useMainVSLiteAppContext } from '../contexts/main'

export function Preview(props: IDockviewPanelProps<{ url: string }>) {
  const { previewElementRef } = useMainVSLiteAppContext()
  return (
    <iframe
      ref={previewElementRef}
      className="w-full h-full"
      src={props.params.url}
      allow="cross-origin-isolated"
      // @ts-expect-error no sure why this is not working
      credentialless
    />
  )
}
