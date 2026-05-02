import { Theme, ThemeProvider } from '@/contexts/ThemeContext'
import '@/styles/global.css'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { DM_Sans } from 'next/font/google'
import { cookies } from 'next/headers'
import { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'

const font = DM_Sans({ subsets: ['latin'] })

export default async function RootLayout({ children }: PropsWithChildren) {
    let theme = (await cookies()).get('theme')?.value
    if (theme !== 'dark' && theme !== 'light') theme = 'light'

    const locale = await getLocale()

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages()

    return (
        <html lang={locale} className={theme === 'dark' ? 'dark' : ''}>
            <body
                className={twMerge(
                    font.className,
                    'transition-colors duration-200 ease-in-out',
                    'bg-white text-black',
                    'black dark:bg-purp-800 dark:text-white',
                )}
            >
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider initialTheme={theme as Theme}>{children}</ThemeProvider>
                    <Toaster />
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
