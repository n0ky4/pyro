'use client'

import { ArrowsCounterClockwise, House } from '@phosphor-icons/react'
import Link from 'next/link'
import Button from './Button'
import Pyro from './Pyro'

interface PaletteNavBarProps {
    onRegenerate: () => void
}

export default function PaletteNavBar({ onRegenerate }: PaletteNavBarProps) {
    return (
        <nav className='w-screen absolute top-0 left-0 z-30 flex items-center justify-center px-4'>
            <div className='max-w-screen-lg w-full bg-white dark:bg-bgDark rounded-xl xl:mt-4 flex items-center justify-between xl:p-4 p-2'>
                <Pyro link />
                <div className='flex items-center justify-center gap-4'>
                    <Button onClick={onRegenerate}>
                        <ArrowsCounterClockwise size={22} weight='bold' />
                        <span className='xl:inline hidden'>regerar</span>
                    </Button>
                    <Link href='/'>
                        <Button theme='ghost'>
                            <House size={22} weight='bold' />
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
