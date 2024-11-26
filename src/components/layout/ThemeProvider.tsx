import { useEffect, useLayoutEffect } from 'react'
import { useAppState } from 'src/states/app'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'nollm-chat-ui-theme',
}: ThemeProviderProps) {
  const theme = useAppState((state) => state.theme)
  const setTheme = useAppState((state) => state.setTheme)

  useLayoutEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null

    if (storedTheme) {
      setTheme(storedTheme)
      return
    }

    setTheme(defaultTheme)
  }, [defaultTheme, setTheme, storageKey])

  useEffect(() => {
    const inputTheme = theme || 'light'
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (inputTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(inputTheme)
  }, [theme])

  return children
}
