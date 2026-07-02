import { createContext, useContext, useEffect, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

/* Dark mode is DISABLED (client decision 2026-07-02): the site runs
   permanently in the light rosé look. The provider stays in place so
   every `isDark` consumer keeps working unchanged (always false) —
   and dark could be re-enabled here with a few lines if the client
   ever changes their mind. The .dark CSS block in index.css is kept
   for the same reason; it is simply never activated. */
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Clean up leftovers from when dark mode existed (visitors who
    // stored 'dark' earlier must not land on the dark version).
    document.documentElement.classList.remove('dark')
    try {
      localStorage.removeItem('theme')
    } catch {
      // localStorage not available
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
