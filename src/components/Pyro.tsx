import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export function PyroIcon({ size = 36, as = 'div' }: { size?: number; as?: 'img' | 'div' }) {
    const aspect = 36 / 27

    if (as === 'div')
        return (
            <div
                style={{
                    background: 'url(/pyro-icon.svg)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    width: size,
                    height: size * aspect,
                }}
            />
        )

    return (
        <img
            src='/pyro-icon.svg'
            alt='pyro'
            width={size}
            height={size * aspect}
            draggable={false}
            className='select-none'
        />
    )
}

interface PyroProps {
    link?: boolean | 'legacy'
    size?: 'md' | 'sm'
}

export default function Pyro({ link = false, size = 'md' }: PyroProps) {
    const t = useTranslations()

    const comp = (
        <div
            className={twMerge(
                'flex items-center',
                size === 'md' && 'gap-2',
                size === 'sm' && 'gap-1.5'
            )}
        >
            <PyroIcon size={size === 'md' ? 36 : 24} />
            <h1
                className={twMerge(
                    'font-bold select-none',
                    size === 'md' && 'text-4xl',
                    size === 'sm' && 'text-2xl'
                )}
            >
                {t('general.pyro')}
            </h1>
        </div>
    )

    if (!link) return comp
    if (link === 'legacy') return <a href='/'>{comp}</a>

    return <Link href='/'>{comp}</Link>
}
