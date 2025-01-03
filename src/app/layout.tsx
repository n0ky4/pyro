import '@/styles/global.css'
import { DM_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'

const font = DM_Sans({ subsets: ['latin'] })

export const metadata = {
    title: 'pyro',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='pt-BR'>
            <head>
                <script
                    defer
                    data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
                    src={`${process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL}/js/script.outbound-links.local.js`}
                ></script>
                <script>
                    {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
                </script>
            </head>
            <body
                className={twMerge(
                    font.className,
                    'transition-colors duration-200 ease-in-out',
                    'bg-white text-black',
                    'black dark:bg-purp-800 dark:text-white'
                )}
            >
                {children}
                <Toaster />
            </body>
        </html>
    )
}
