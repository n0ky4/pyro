'use client'

import { Moon, Sun } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'

export function ThemeSwitchButton() {
    const [theme, setTheme] = useState('light')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark')
        setTheme(isDark ? 'dark' : 'light')
        if (!mounted) setMounted(true)
    }, [])

    const toggle = () => {
        document.documentElement.classList.toggle('dark')
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <Button
            theme='ghost'
            onClick={() => toggle()}
            className={twMerge(mounted ? 'opacity-100' : 'opacity-0')}
            aria-label='Trocar tema'
        >
            {theme === 'dark' ? <Sun size={22} weight='bold' /> : <Moon size={22} weight='bold' />}
        </Button>
    )
}
