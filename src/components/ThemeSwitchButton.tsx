'use client'

import { useIsMounted } from '@/hooks/isMounted'
import { useTheme } from '@/hooks/themeHook'
import { Moon, Sun } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'
import Button from './Button'

export function ThemeSwitchButton() {
    const mounted = useIsMounted()
    const { theme, toggleTheme } = useTheme()
    const t = useTranslations()

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
