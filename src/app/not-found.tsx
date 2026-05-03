import Button from '@/components/Button'
import ColorLink from '@/components/ColorLink'
import Metadata from '@/components/Metadata'
import NavBar from '@/components/NavBar'
import color from '@/core/colorGenerator'
import { removeHash } from '@/util/colorFormat'
import Link from 'next/link'

export default function Page404() {
    const rndColor = color.getRandomDarkColor()

    const metadata = {
        title: 'pyro - página não encontrada',
        favicon: `/favicon?hex=${removeHash(rndColor.hex)}`,
        themeColor: rndColor.hex,
    }

    return (
        <>
            <Metadata data={metadata} />
            <main className='mb-48'>
                <div className='w-full max-w-(--breakpoint-lg) mx-auto px-4'>
                    <NavBar />
                    <div className='w-full max-w-(--breakpoint-sm) mx-auto flex flex-col gap-8'>
                        <div className='flex flex-col gap-10'>
                            <h1 className='text-8xl font-bold'>Ops...</h1>
                            <div className='flex flex-col gap-4 text-slate-800 text-lg text-justify'>
                                <p>
                                    Você encontrou uma cor tão única que está além do espectro
                                    visível de cores! Infelizmente nossos olhos ainda não conseguem
                                    enxergá-la 😓
                                </p>
                                <p>
                                    Que tal explorar outras cores? Essa aqui, por exemplo, se chama{' '}
                                    <ColorLink info={rndColor} /> e é bem bonita!
                                </p>
                            </div>
                            <div className='w-full flex items-center justify-center'>
                                <Link href='/'>
                                    <Button>Voltar para a página inicial</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
