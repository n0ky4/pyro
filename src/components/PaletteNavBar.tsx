'use client'

import { ArrowsCounterClockwise, House } from '@phosphor-icons/react'
import Button from './Button'
import Pyro from './Pyro'

interface PaletteNavBarProps {
    onRegenerate: () => void
}

export default function PaletteNavBar({ onRegenerate }: PaletteNavBarProps) {
    return (
        <nav className='w-screen absolute top-0 left-0 z-30 flex items-center justify-center px-4'>
            <div className='max-w-screen-lg w-full bg-white dark:bg-purp-800 rounded-xl mt-4 flex items-center justify-between p-3'>
                <Pyro link size='sm' />
                <div className='flex items-center justify-center gap-4'>
                    <Button onClick={onRegenerate}>
                        <ArrowsCounterClockwise size={22} weight='bold' />
                        <span className='xl:inline hidden'>regerar</span>
                    </Button>
                    <Button asLink='legacy' href='/' theme='ghost'>
                        <House size={22} weight='bold' />
                    </Button>
                </div>
            </div>
        </nav>
    )
}
