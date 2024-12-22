import { CircleNotch } from '@/assets/icons'
import { twMerge } from 'tailwind-merge'

const themes = {
    ghost: twMerge(
        'enabled:bg-transparent enabled:hover:bg-slate-100/50 disabled:bg-transparent',
        'enabled:text-red-500 disabled:text-gray-500'
    ),
    primary: twMerge(
        'enabled:bg-red-500 enabled:hover:bg-red-400 disabled:bg-gray-300',
        'enabled:text-white disabled:text-gray-500'
    ),
}
type Theme = keyof typeof themes

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    loading?: boolean
    className?: string
    theme?: Theme
}

export default function Button({
    children,
    className,
    loading = false,
    theme = 'primary',
    ...rest
}: ButtonProps) {
    const th = themes[theme]

    return (
        <button
            {...rest}
            disabled={loading || rest.disabled}
            className={twMerge(
                'inline-flex gap-2 p-2 items-center justify-center text-center leading-0 rounded-xl font-semibold selection-none transition-colors',
                'enabled:cursor-pointer disabled:cursor-not-allowed',
                th,
                className
            )}
        >
            {loading ? <CircleNotch size={24} weight='bold' className='animate-spin' /> : children}
        </button>
    )
}
