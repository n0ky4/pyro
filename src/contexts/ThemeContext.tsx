'use client'
import Cookies from 'js-cookie'
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
        Cookies.set('theme', toSet, { expires: 365 })
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
