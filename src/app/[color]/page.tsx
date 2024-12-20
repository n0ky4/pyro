import ColorCard from '@/components/ColorCard'
import ColorDetails from '@/components/ColorDetails'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import RegenerateColorMobileButton from '@/components/RegenerateColorMobileButton'
import { IColorInfo } from '@/core/types'
import { getFullLengthHex, isValidColor, removeHash } from '@/util/colorFormat'
// import { Metadata } from 'next'
import { Items } from '@/components/Items'
import MainContainer from '@/components/MainContainer'
import colorInfo from '@/core/colorInfo'
import { notFound, redirect } from 'next/navigation'

interface ColorPageProps {
    params: {
        color: string
    }
    searchParams?: {
        r?: string
    }
}

let data: IColorInfo | null = null

// export async function generateMetadata(): Promise<Metadata> {
//     if (!data) return {}

//     const icon = {
//         url: `/favicon?hex=${removeHash(data.hex)}`,
//         type: 'image/svg+xml',
//     }

//     return {
//         title: `pyro - ${data.hex}`,
//         // themeColor: data.hex,
//         icons: {
//             icon,
//             shortcut: icon,
//         },
//     }
// }

export default async function ColorPage({ params, searchParams }: ColorPageProps) {
    const { color } = await params
    const rParam = (await searchParams)?.r
    const fromRandom = rParam === '' || !rParam

    if (!isValidColor(color)) return notFound()
    if (removeHash(color).length === 3) return redirect(`/${getFullLengthHex(color)}`)

    data = colorInfo.getColorInfo(color)

    return (
        <>
            <MainContainer>
                <RegenerateColorMobileButton fromRandom={fromRandom} />
                <NavBar />
                <div className='flex flex-col gap-8'>
                    <ColorCard data={data} />
                    <ColorDetails data={data} />
                    <Items data={data} />
                </div>
            </MainContainer>
            <Footer />
        </>
    )
}
