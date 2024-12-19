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
            <body className={twMerge(font.className, 'bg-white')}>
                {children}
                <Toaster />
            </body>
        </html>
    )
}
