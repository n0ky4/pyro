'use client'

import { Heart } from '@/assets/icons'
import FooterItem, { FooterItemType } from './FooterItem'
import FooterLink from './FooterLink'

const footerItems: FooterItemType[] = [
    {
        title: 'ferramentas',
        items: [
            {
                label: 'paletas',
                type: 'link',
                href: '/palette',
            },
            {
                label: 'cor aleatória',
                type: 'link',
                href: '/random',
                legacy: true,
            },
        ],
    },
    {
        title: 'sobre',
        items: [
            {
                label: 'sobre o projeto',
                type: 'link',
                href: '/about',
            },
            {
                label: 'código-fonte',
                type: 'link',
                href: '/about#source-code',
            },
            {
                label: 'atribuições',
                type: 'link',
                href: '/about#attributions',
            },
        ],
    },
    // {
    //     title: 'API',
    //     items: [
    //         {
    //             label: 'Documentação',
    //             type: 'link',
    //             href: '/docs',
    //         },
    //     ],
    // },
]

export default function Footer() {
    return (
        <footer className='border-t-2 pt-12 pb-24 md:pt-16 md:pb-32 border-slate-200 dark:border-white/5'>
            <div className='w-full max-w-screen-xl mx-auto px-4 text-slate-500 dark:text-zinc-400 flex flex-col gap-12'>
                <div className='grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {footerItems.map((x) => (
                        <FooterItem item={x} key={x.title} />
                    ))}
                </div>
                <div className='block text-sm'>
                    <span className='block'>
                        criado com{' '}
                        <Heart weight='fill' className='inline text-red-500 text-xl heart-pulse' />{' '}
                        por{' '}
                        <FooterLink href={process.env.AUTHOR_URL} underline>
                            {process.env.AUTHOR_NAME}
                        </FooterLink>
                        , distribuído livremente no{' '}
                        <FooterLink href={process.env.GITHUB_REPO} underline>
                            GitHub
                        </FooterLink>{' '}
                    </span>
                    <span className='text-xs'>
                        commit:{' '}
                        <a
                            href={`${process.env.GITHUB_REPO}/commit/${process.env.COMMIT_HASH}`}
                            rel='noopener noreferrer'
                            target='_blank'
                            className='border-b-2 border-dotted border-zinc-300 dark:border-zinc-600'
                        >
                            {process.env.COMMIT_HASH.slice(0, 7)}
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    )
}
