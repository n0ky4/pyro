'use client'

import { ISuggestion } from '@/core/types'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface SuggestionProps {
    data: ISuggestion
    size: 'md' | 'xl'
}

export function Suggestion({ data, size }: SuggestionProps) {
    return (
        <Link
            className={twMerge(
                'p-2 flex items-center transition-colors hover:bg-zinc-100 dark:hover:bg-purp-700',
                size === 'md' ? 'gap-2' : 'gap-4'
            )}
            href={data.href}
        >
            <div
                className='w-8 h-8 rounded-xl'
                style={{
                    backgroundColor: data.hex,
                }}
            />
            <div>
                <span
                    className={twMerge('block font-bold', size === 'md' ? 'text-sm' : 'text-2xl')}
                >
                    {data.hex}
                </span>
                <span
                    className={twMerge(
                        'block text-gray-500',
                        size === 'md' ? 'text-xs' : 'text-md'
                    )}
                >
                    {data.name}
                </span>
            </div>
        </Link>
    )
}
