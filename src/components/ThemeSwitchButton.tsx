'use client'

import { useTheme } from '@/hooks/themeHook'
import { Moon, Sun } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'

export function ThemeSwitchButton() {
    const [mounted, setMounted] = useState(false)
    const { theme, toggleTheme } = useTheme()
    const t = useTranslations()

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <Button
            theme='ghost'
            onClick={() => toggleTheme()}
            className={twMerge(mounted ? 'opacity-100' : 'opacity-0')}
            aria-label={t('general.toggleThemeAria')}
        >
            {theme === 'dark' ? <Sun size={22} weight='bold' /> : <Moon size={22} weight='bold' />}
        </Button>
    )
}
