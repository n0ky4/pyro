import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface FooterLinkProps {
    href: string
    legacy?: boolean
    target?: string
    children: React.ReactNode
    underline?: boolean
}

export default function FooterLink({
    children,
    href,
    target,
    underline = false,
    legacy = false,
}: FooterLinkProps) {
    const commonProps = {
        href: href,
        target: target || '_blank',
        className: twMerge(
            'text-black dark:text-zinc-200 hover:text-red-600 dark:hover:text-red-400 transition-colors w-fit',
            underline ? 'hover:underline' : ''
        ),
    }

    if (legacy) {
        return <a {...commonProps}>{children}</a>
    }

    return <Link {...commonProps}>{children}</Link>
}
