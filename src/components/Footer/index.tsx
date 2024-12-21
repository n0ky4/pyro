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
        <footer className='border-t-2 border-slate-200 py-12 md:py-16'>
            <div className='w-full max-w-screen-xl mx-auto px-4 text-slate-500 flex flex-col gap-12'>
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
                    <span className='block'>
                        dados de cores fornecidos por{' '}
                        <FooterLink href={process.env.COLORNAMES_REPO} underline>
                            color-names
                        </FooterLink>{' '}
                    </span>
                </div>
            </div>
        </footer>
    )
}
