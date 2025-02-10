'use client'

import { Heart } from '@/assets/icons'
import { languages } from '@/i18n/settings'
import Cookies from 'js-cookie'
import { useLocale, useTranslations } from 'next-intl'
import { twMerge } from 'tailwind-merge'
import FooterItem, { FooterItemType } from './FooterItem'
import FooterLink from './FooterLink'

export default function Footer() {
    const t = useTranslations()
    const loc = useLocale()

    const footerItems: FooterItemType[] = [
        {
            title: t('footer.tools'),
            items: [
                {
                    label: t('general.palettes'),
                    type: 'link',
                    href: '/palette',
                },
                {
                    label: t('general.randomColor'),
                    type: 'link',
                    href: '/random',
                    legacy: true,
                },
            ],
        },
        {
            title: t('general.about'),
            items: [
                {
                    label: t('footer.aboutProject'),
                    type: 'link',
                    href: '/about',
                },
                {
                    label: t('general.sourceCode'),
                    type: 'link',
                    href: '/about#source-code',
                },
                {
                    label: t('general.attributions'),
                    type: 'link',
                    href: '/about#attributions',
                },
            ],
        },
    ]

    const onLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLoc = e.target.value
        Cookies.set('locale', newLoc, { expires: 365 })
        window.location.reload()
    }

    return (
        <footer className='border-t-2 pt-12 pb-24 md:pt-16 md:pb-32 border-slate-200 dark:border-white/5'>
            <div className='w-full max-w-screen-xl mx-auto px-4 text-slate-500 dark:text-zinc-400 flex flex-col gap-12'>
                <div className='grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {footerItems.map((x) => (
                        <FooterItem item={x} key={x.title} />
                    ))}
                </div>
                <div className='flex items-center justify-between gap-4 flex-wrap'>
                    <div className='text-sm'>
                        <p>
                            {t.rich('footer.credits', {
                                heart: () => (
                                    <Heart
                                        weight='fill'
                                        className='inline text-red-500 text-xl heart-pulse'
                                    />
                                ),
                                author: () => (
                                    <FooterLink href={process.env.AUTHOR_URL} underline>
                                        {process.env.AUTHOR_NAME}
                                    </FooterLink>
                                ),
                                github: () => (
                                    <FooterLink href={process.env.GITHUB_REPO} underline>
                                        GitHub
                                    </FooterLink>
                                ),
                            })}
                        </p>
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
                    <div>
                        <select
                            className={twMerge(
                                'rounded-xl p-2',
                                'border border-slate-300 dark:border-white/5',
                                'text-slate-500 dark:text-zinc-400 bg-transparent'
                            )}
                            defaultValue={loc}
                            onChange={onLocaleChange}
                        >
                            {Object.entries(languages).map(([key, value]) => (
                                <option
                                    key={key}
                                    className='text-slate-500 dark:text-zinc-800'
                                    value={key}
                                >
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </footer>
    )
}
