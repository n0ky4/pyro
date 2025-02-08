import { Theme, ThemeProvider } from '@/contexts/ThemeContext'
import '@/styles/global.css'
import { DM_Sans } from 'next/font/google'
import { cookies } from 'next/headers'
import { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'

const font = DM_Sans({ subsets: ['latin'] })
const PLAUSIBLE_ENABLED = process.env.DISABLE_PLAUSIBLE !== 'true'

export default async function RootLayout({ children }: PropsWithChildren) {
    let theme = (await cookies()).get('theme')?.value
    if (theme !== 'dark' && theme !== 'light') theme = 'light'

    return (
        <html lang='pt-BR' className={theme === 'dark' ? 'dark' : ''}>
            <head>
                {PLAUSIBLE_ENABLED && (
                    <>
                        <script
                            defer
                            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
                            src={`${process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL}/js/script.outbound-links.local.js`}
                        ></script>
                        <script>
                            {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
                        </script>
                    </>
                )}
            </head>
            <body
                className={twMerge(
                    font.className,
                    'transition-colors duration-200 ease-in-out',
                    'bg-white text-black',
                    'black dark:bg-purp-800 dark:text-white'
                )}
            >
                <ThemeProvider initialTheme={theme as Theme}>{children}</ThemeProvider>
                <Toaster />
            </body>
        </html>
    )
}
