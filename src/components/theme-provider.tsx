import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "cyberpunk" | "retro" | "minimal"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({ children, defaultTheme = "minimal" }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme
    return savedTheme || defaultTheme
  })

  useEffect(() => {
    localStorage.setItem("theme", theme)
    const root = window.document.documentElement
    root.classList.remove("dark", "cyberpunk", "retro", "minimal")
    root.setAttribute('data-theme', theme)
    root.classList.add(theme)
  }, [theme])

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
