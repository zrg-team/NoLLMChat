export const APP_ROUTES = {
  application: '/application/:applicationId?',
  whiteboard: '/whiteboard/:sessionId?',
} as const
export const getRouteURL = (route: keyof typeof APP_ROUTES, params?: Record<string, string>) => {
  const url = APP_ROUTES[route]
  if (!params) {
    // Replace all params with empty string
    return url.replace(/\/:[^/]+/g, '')
  }
  return Object.keys(params || {}).reduce(
    (acc, key) => acc.replace(`:${key}`, params?.[key] || ''),
    url,
  )
}
