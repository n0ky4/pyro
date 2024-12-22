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
        <html lang='pt-BR' className='dark'>
            <body
                className={twMerge(
                    font.className,
                    'transition-colors duration-200 ease-in-out',
                    'bg-white text-black',
                    'black dark:bg-bgDark dark:text-white'
                )}
            >
                {children}
                <Toaster />
            </body>
        </html>
    )
}
