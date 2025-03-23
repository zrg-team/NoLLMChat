import { ROUTE_MODE } from 'src/constants/route'

export const APP_ROUTES = {
  application: '/application/:applicationId?',
  whiteboard: '/whiteboard/:sessionId?',
  document: '/document/:documentId?',
  sessions: '/sessions',
} as const
export const getRouteURL = (route: keyof typeof APP_ROUTES, params?: Record<string, string>) => {
  let url = APP_ROUTES[route] as string
  if (!params) {
    // Replace all params with empty string
    url = url.replace(/\/:[^/]+/g, '')
  } else {
    url = Object.keys(params || {}).reduce(
      (acc, key) => acc.replace(`:${key}`, params?.[key] || ''),
      url,
    )
  }
  return url?.endsWith('?') ? url.slice(0, -1) : url
}

export const getSearchParams = () => {
  if (ROUTE_MODE === 'hash') {
    const [, search] = window.location.hash.split('?')
    return new URLSearchParams(`?${search}`)
  }

  return new URLSearchParams(window.location.search)
}
