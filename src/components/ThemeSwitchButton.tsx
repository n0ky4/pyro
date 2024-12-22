'use client'

import { Moon, Sun } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import Button from './Button'

export function ThemeSwitchButton() {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark')
        setTheme(isDark ? 'dark' : 'light')
    }, [])

    const toggle = () => {
        document.documentElement.classList.toggle('dark')
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <Button theme='ghost' onClick={() => toggle()}>
            {theme === 'dark' ? <Sun size={22} weight='bold' /> : <Moon size={22} weight='bold' />}
        </Button>
    )
}
