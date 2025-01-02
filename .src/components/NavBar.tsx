'use client'

import { List, Palette, Shuffle, X } from '@/assets/icons'
import { Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import { MobileNavLink } from './MobileNavLink'
import Pyro from './Pyro'
import SearchInput from './Search/SearchInput'
import { ThemeSwitchButton } from './ThemeSwitchButton'

export default function NavBar() {
    // mobile navbar
    const [open, setOpen] = useState(false)
    const buttonRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        if (open) {
            // workaround bcuz focus is stupid
            setTimeout(() => buttonRef.current?.focus(), 1)
        }
    }, [open])

    return (
        <>
            <Transition
                show={open}
                enter='transition-opacity duration-150'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity duration-150'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                as={Fragment}
                unmount={false}
            >
                <div className='fixed md:hidden top-0 left-0 w-screen h-screen z-40'>
                    <div className='w-full h-full max-w-screen-lg mx-auto px-4 py-6 absolute top-0 left-0 z-50'>
                        <div className='w-full'>
                            <div className='ml-auto w-fit'>
                                <Button onClick={() => setOpen(false)} ref={buttonRef}>
                                    <X size={26} weight='bold' />
                                </Button>
                            </div>
                        </div>
                        <div className='flex flex-col gap-8 mt-8'>
                            <SearchInput className='w-full' size='xl' />
                            <MobileNavLink href='/'>início</MobileNavLink>
                            <MobileNavLink href='/palette'>paletas</MobileNavLink>
                            <MobileNavLink href='/random' legacy>
                                cor aleatória
                            </MobileNavLink>
                        </div>
                    </div>
                    <div className='bg-black/90 w-screen h-screen absolute top-0 left-0 z-40' />
                </div>
            </Transition>
            <div
                className={twMerge(
                    'w-full py-6 flex items-center justify-between border-b-2 mb-8',
                    'border-slate-100 dark:border-white/5',
                    'transition-colors duration-200 ease-in-out'
                )}
            >
                <Pyro link />
                <div className='hidden md:flex items-center gap-4'>
                    <Button theme='ghost' asLink='legacy' href='/palette'>
                        <Palette size={22} weight='bold' />
                        paletas
                    </Button>
                    <Button asLink='legacy' href='/random'>
                        <Shuffle size={22} weight='bold' />
                        cor aleatória
                    </Button>
                    <SearchInput className='w-60' />
                    <ThemeSwitchButton />
                </div>
                <div className='flex md:hidden items-center gap-4'>
                    <ThemeSwitchButton />
                    <Button onClick={() => setOpen(!open)}>
                        <List size={26} weight='bold' />
                    </Button>
                </div>
            </div>
        </>
    )
}
