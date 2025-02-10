'use client'

import { IColorInfo } from '@/core/types'
import { Checkbox, Field, Label, Transition } from '@headlessui/react'
import { Check } from '@phosphor-icons/react'
import axios from 'axios'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import ColorCard from './ColorCard'
import ColorDetails from './ColorDetails'
import { Items } from './Items'
import ResetTimer from './ResetTimer'

interface MainColorComponentProps {
    initialData: IColorInfo
    nextUnix: number
    initialBrainstormColors: IColorInfo[]
}

const BRAINSTORM_INTERVAL = 5000
const REROLL = 5

export function MainColorComponent({
    initialData,
    nextUnix,
    initialBrainstormColors,
}: MainColorComponentProps) {
    const [mounted, setMounted] = useState(false)

    const [data, setData] = useState<IColorInfo>(initialData)
    const [brainstorm, setBrainstorm] = useState(false)

    const fetching = useRef(false)
    const nextColors = useRef<IColorInfo[]>(initialBrainstormColors)

    const [progress, setProgress] = useState(0)

    const t = useTranslations()

    useEffect(() => {
        setMounted(true)

        const handleKeyDown = (e: KeyboardEvent) => {
            // when press b and not focused on any input
            if (e.key === 'b' && document.activeElement === document.body) {
                setBrainstorm((prev) => !prev)
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    const nextColor = () => {
        const prev = nextColors.current

        const next = prev.slice(1)

        if (next.length === REROLL && !fetching.current) {
            fetching.current = true
            axios
                .get('/api/brainstorm')
                .then((res) => {
                    const { colors } = res.data
                    nextColors.current = [...prev, ...colors]
                })
                .catch((err) => {
                    console.error('Error fetching brainstorm colors:', err)
                })
                .finally(() => {
                    fetching.current = false
                })
        }

        if (next.length === 0) {
            const resetColors = initialBrainstormColors
            setData(resetColors[0])
            nextColors.current = resetColors
            return
        }

        setData(next[0])
        nextColors.current = next

        startProgress()
    }

    const startProgress = () => {
        let startTime: number | null = null
        const duration = BRAINSTORM_INTERVAL

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progressValue = Math.min(((timestamp - startTime) / duration) * 100, 100)
            setProgress(progressValue)

            if (progressValue < 100) {
                requestAnimationFrame(step)
            }
        }

        requestAnimationFrame(step)
    }

    useEffect(() => {
        if (!brainstorm) {
            setProgress(0)
            return
        }

        startProgress()
        const interval = setInterval(nextColor, BRAINSTORM_INTERVAL)

        return () => clearInterval(interval)
    }, [brainstorm])

    return (
        <>
            <Transition
                as='div'
                show={brainstorm}
                enter='transition-opacity'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                className='fixed top-0 left-0 h-1 rounded-r-full z-50'
                style={{
                    background: data.hex,
                    width: `${progress}%`,
                }}
            />
            <div
                className={twMerge(
                    'flex flex-col gap-8 transition-all duration-500 ease-in-out',
                    mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                )}
            >
                <div className='flex items-center justify-between'>
                    <div
                        className={twMerge(
                            'flex gap-0 flex-col',
                            'md:flex-row md:items-center md:gap-4'
                        )}
                    >
                        <h1 className='text-2xl md:text-4xl lg:text-6xl font-bold'>
                            {brainstorm ? t('home.brainstorm') : t('home.featuredColor.title')}
                        </h1>
                        {!brainstorm && <ResetTimer updateAt={nextUnix} />}
                    </div>
                    <Field className='flex items-center gap-2'>
                        <Label className='text-slate-400 dark:text-zinc-400' htmlFor='brainstorm'>
                            {t('home.brainstorm')}
                        </Label>
                        <Checkbox
                            id='brainstorm'
                            onChange={setBrainstorm}
                            checked={brainstorm}
                            aria-label={t('home.brainstormAria')}
                            className={twMerge(
                                'group flex items-center justify-center size-6 rounded-lg border cursor-pointer transition-all ease-out',
                                'dark:bg-purp-700/50 dark:border-purp-600/50 bg-white border-gray-300',
                                'data-[checked]:bg-red-500 data-[checked]:border-red-400',
                                'dark:data-[checked]:bg-red-500 dark:data-[checked]:border-red-400'
                            )}
                        >
                            <Check
                                className='w-4 h-4 group-data-[checked]:block hidden text-white'
                                weight='bold'
                            />
                        </Checkbox>
                    </Field>
                </div>
                <ColorCard data={data} />
                <ColorDetails data={data} />
                <Items data={data} />
            </div>
        </>
    )
}
