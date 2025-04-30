import { nanoid } from 'nanoid'
import { useCallback, useRef } from 'react'

const INJECTED_SCRIPT = `
alert('start');
function handleMessage(event) {
  // Ensure the message is from a trusted source
  // if (event.origin !== "http://example.com") return;

  const action = event.data.action;
  let response = {};

  switch (action) {
    case 'GET_CURRENT_HTML':
      response = { html: document.documentElement.outerHTML };
      break;
    case 'GET_ELEMENT_HTML':
      const element = document.querySelector(event.data.selector);
      response = { html: element ? element.outerHTML : null };
      break;
    case 'CLICK_ELEMENT':
      const elementToClick = document.querySelector(event.data.selector);
      if (elementToClick) {
        elementToClick.click();
        response = { status: 'CLICKED' };
      } else {
        response = { status: 'ELEMENT_NOT_FOUND' };
      }
      break;
    default:
      response = { status: 'UNKNOWN_ACTION' };
  }

  // Send response back to the parent
  event.source.postMessage({ ...response, id: event.data.id }, event.origin);
}

// Add event listener for messages
window.addEventListener('message', handleMessage, false);
alert('end');
`

const IFRAME_ID = 'VSCODE_PREVIEW_IFRAME'
export const usePreview = () => {
  const processRef = useRef<Record<string, Promise<unknown>>>({})

  const sendMessageIframe = useCallback((action: string, selector?: string) => {
    const iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement
    const id = nanoid()
    iframe?.contentWindow?.postMessage(
      {
        type: 'preview-message',
        action,
        selector,
        id,
      },
      '*',
    )
    processRef.current[id] = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        delete processRef.current[id]
        reject('TIMEOUT')
      }, 5000)
      const listener = (event: MessageEvent) => {
        if (event.data.id !== id) return

        resolve(event.data)
        clearTimeout(timeout)
        window.removeEventListener('message', listener)
        delete processRef.current[id]
      }
      window.addEventListener('message', listener, false)
    })
    return processRef.current[id]
  }, [])

  return {
    sendMessageIframe,
    iframeId: IFRAME_ID,
    injectedScript: INJECTED_SCRIPT,
  }
}
