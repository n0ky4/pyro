import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

interface MainContainerProps extends PropsWithChildren {
    className?: string
}

export default function MainContainer({ className, children }: MainContainerProps) {
    return (
        <main className={twMerge('w-full max-w-screen-xl mx-auto px-4 mb-32', className)}>
            {children}
        </main>
    )
}
