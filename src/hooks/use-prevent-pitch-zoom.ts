import { MutableRefObject, useEffect } from 'react'

export const usePreventPitchZoom = (
  elementRef: MutableRefObject<HTMLDivElement | null | undefined>,
  disable?: boolean,
) => {
  useEffect(() => {
    if (disable) {
      return
    }
    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        event.preventDefault()
      }
    }

    const editorElement = elementRef.current
    if (editorElement) {
      editorElement.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (editorElement) {
        editorElement.removeEventListener('wheel', handleWheel)
      }
    }
  }, [elementRef, disable])
}
