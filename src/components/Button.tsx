import { CircleNotch } from '@/assets/icons'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

const themes = {
    ghost: twMerge(
        'bg-transparent hover:bg-zinc-100/50 text-red-500 dark:hover:bg-white/5',
        'focus:ring-2 focus:ring-red-500/50'
    ),
    primary: twMerge(
        'bg-red-500 hover:bg-red-400 text-white',
        'focus:ring-2 focus:ring-red-300/50'
    ),
}
type Theme = keyof typeof themes

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    loading?: boolean
    className?: string
    theme?: Theme
    asLink?: boolean
    href?: string
    target?: string
}

export default function Button({
    children,
    className,
    loading = false,
    theme = 'primary',
    asLink = false,
    href,
    target = '_self',
    ...rest
}: ButtonProps) {
    const th = themes[theme]

    const buttonStyle = twMerge(
        'inline-flex gap-2 p-2 items-center justify-center',
        'outline-none selection-none',
        'text-center font-semibold leading-0',
        'rounded-xl transition-all',
        'enabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
        th,
        className
    )

    if (!asLink)
        return (
            <button {...rest} disabled={loading || rest.disabled} className={buttonStyle}>
                {loading ? (
                    <CircleNotch size={24} weight='bold' className='animate-spin' />
                ) : (
                    children
                )}
            </button>
        )

    return (
        <Link href={href || '#'} target={target} className={buttonStyle}>
            {loading ? <CircleNotch size={24} weight='bold' className='animate-spin' /> : children}
        </Link>
    )
}
