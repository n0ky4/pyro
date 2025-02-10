'use client'

import { ISuggestion } from '@/core/types'
import { isValidColor, removeHash } from '@/util/colorFormat'
import { formatQuery } from '@/util/format'
import { Transition } from '@headlessui/react'
import { EyedropperSample } from '@phosphor-icons/react'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { twMerge } from 'tailwind-merge'
import Button from '../Button'
import { Suggestion } from './Suggestion'

const transitionProps = {
    enter: 'transition ease-out duration-200',
    enterFrom: 'opacity-0 translate-y-0.5',
    enterTo: 'opacity-100 translate-y-0',
    leave: 'transition ease-in duration-100',
    leaveFrom: 'opacity-100 translate-y-0',
    leaveTo: 'opacity-0 translate-y-0.5',
}

interface SearchInputProps {
    className?: string
    size?: 'md' | 'xl'
}

export default function SearchInput({ className, size = 'md' }: SearchInputProps) {
    const router = useRouter()

    const t = useTranslations()

    const [suggestions, setSuggestions] = useState<ISuggestion[]>([])
    const [query, setQuery] = useState<string>('')

    const [uiState, setUiState] = useState({
        focused: false, // focused is when the input is focused
        showSuggestions: false,
        showColorPicker: false,
    })

    // the suggestions only can be truly shown when the input is focused
    const shouldShowSuggestions = uiState.focused && uiState.showSuggestions

    // function to open the color page
    const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault()
        if (!query) return
        if (query.startsWith('#') && isValidColor(query))
            router.push(`/${removeHash(query.toLowerCase())}`)
    }

    useEffect(() => {
        // close the color picker and suggestions when the user press the escape key
        const escListener = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setUiState((prev) => ({
                    ...prev,
                    showColorPicker: false,
                    showSuggestions: false,
                }))
            }
        }

        // close the color picker when the user clicks outside of it
        const clickOutsideColorPickerListener = (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && !e.target.closest('#color-picker')) {
                setUiState((prev) => ({
                    ...prev,
                    showColorPicker: false,
                }))
            }
        }

        document.addEventListener('keydown', escListener)
        document.addEventListener('click', clickOutsideColorPickerListener)

        return () => {
            document.removeEventListener('keydown', escListener)
            document.removeEventListener('click', clickOutsideColorPickerListener)
        }
    }, [])

    useEffect(() => {
        // close the color picker when the input is focused
        // so the user can see the suggestions
        if (uiState.focused) {
            setUiState((prev) => ({
                ...prev,
                showColorPicker: false,
            }))
        }

        // don't fetch suggestions if the color picker is open
        if (uiState.showColorPicker) return

        // format query & check if it's valid
        const formattedQuery = formatQuery(query)
        if (!formattedQuery) {
            setUiState((prev) => ({
                ...prev,
                showSuggestions: false,
            }))
            return
        }

        // fetch suggestions and update the state
        const encoded = encodeURIComponent(formattedQuery)
        axios
            .get(`/api/suggestions/${encoded}`)
            .then((res) => {
                const { data } = res
                if (!data.suggestions) return
                setSuggestions(data.suggestions)
            })
            .catch((err) => {
                console.error('Error fetching suggestions:', err)
            })
            .finally(() => {
                setUiState((prev) => ({
                    ...prev,
                    showSuggestions: true,
                }))
            })
    }, [query, uiState.focused, uiState.showColorPicker])

    // function to toggle the color picker
    const handleShowColorPicker = () => {
        setUiState((prev) => {
            return {
                ...prev,
                showColorPicker: !prev.showColorPicker,
                showSuggestions: false,
            }
        })
    }

    return (
        <div className={twMerge('relative', className)}>
            <form
                className={twMerge(
                    'w-full inline-flex items-center justify-between p-2 rounded-xl selection-none transition-all',
                    'border border-zinc-200 bg-white text-black',
                    'dark:bg-purp-700/50 dark:border-purp-600/50 dark:text-white',
                    uiState.focused ? 'ring-2 ring-red-300/50' : 'ring-0'
                )}
                onSubmit={handleSubmit}
            >
                <input
                    type='text'
                    placeholder={t('nav.searchPlaceholder')}
                    className={twMerge(
                        'flex w-full outline-none',
                        'bg-transparent text-black dark:text-white',
                        size === 'xl' && 'text-3xl'
                    )}
                    onFocus={() => setUiState((prev) => ({ ...prev, focused: true }))}
                    onBlur={() => setUiState((prev) => ({ ...prev, focused: false }))}
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
                <button
                    type='button'
                    className={twMerge(
                        'hover:opacity-50 transition-all outline-none',
                        'ring-0 focus:ring-2 focus:ring-red-300/50'
                    )}
                    aria-label='Abrir seletor de cor'
                    onClick={() => handleShowColorPicker()}
                    onKeyUp={(e) => {
                        // i don't know why the native keyboard event isn't working so i'm using this
                        e.preventDefault()
                        const keys = ['Enter', 'Space']
                        if (keys.includes(e.code)) handleShowColorPicker()
                    }}
                >
                    <EyedropperSample size={size === 'md' ? 26 : 36} />
                </button>
            </form>
            <Transition
                show={shouldShowSuggestions}
                as='div'
                className={twMerge(
                    'absolute z-30 left-0 mt-2 w-full flex flex-col gap-2 border rounded-lg overflow-hidden',
                    'bg-white border-zinc-300 dark:bg-purp-800 dark:border-zinc-700'
                )}
                {...transitionProps}
            >
                {suggestions.length ? (
                    suggestions.map((suggestion) => (
                        <Suggestion data={suggestion} size={size} key={suggestion.name} />
                    ))
                ) : (
                    <div
                        className={twMerge(
                            'p-2 text-center text-gray-400 dark:text-gray-500',
                            size === 'md' ? 'text-md' : 'text-xl'
                        )}
                    >
                        {t('nav.noResultsFound')}
                    </div>
                )}
            </Transition>
            <Transition
                show={uiState.showColorPicker}
                className={twMerge(
                    'absolute z-30 right-0 mt-2 w-full flex flex-col gap-2 items-center justify-center border rounded-xl p-4',
                    'bg-white border-zinc-300',
                    'dark:bg-purp-800 dark:border-zinc-700'
                )}
                {...transitionProps}
                as='div'
                id='color-picker'
            >
                <HexColorPicker
                    color={query.startsWith('#') ? query : '#fff'}
                    onChange={setQuery}
                />
                <Button className='w-[200px]' onClick={() => handleSubmit()}>
                    {t('nav.search')}
                </Button>
            </Transition>
        </div>
    )
}
