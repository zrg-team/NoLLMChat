import { useEffect } from 'react'
import { useAppState } from 'src/states/app'

type ThemeProviderProps = {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useAppState((state) => state.theme)

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
