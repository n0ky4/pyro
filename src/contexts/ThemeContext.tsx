'use client'
import { createContext, PropsWithChildren, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'
interface ThemeContextProps {
    theme: Theme
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    toggleTheme: () => {},
})

interface ThemeProviderProps extends PropsWithChildren {
    initialTheme: Theme
}

export function ThemeProvider({ children, initialTheme }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(initialTheme)

    function toggleTheme() {
        const toSet = theme === 'light' ? 'dark' : 'light'
        setTheme(toSet)
        document.cookie = `theme=${toSet}; path=/; max-age=31536000`
    }

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
