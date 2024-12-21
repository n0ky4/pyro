import Link from 'next/link'

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

export default function Pyro({ link }: { link: boolean }) {
    const comp = (
        <div className='flex items-center gap-2'>
            <PyroIcon />
            <h1 className='text-4xl font-bold select-none'>pyro</h1>
        </div>
    )

    if (!link) return comp

    return <Link href='/'>{comp}</Link>
}
