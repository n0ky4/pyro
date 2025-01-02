import ColorCard from '@/components/ColorCard'
import ColorDetails from '@/components/ColorDetails'
import Footer from '@/components/Footer'
import { Items } from '@/components/Items'
import MainContainer from '@/components/MainContainer'
import Metadata from '@/components/Metadata'
import NavBar from '@/components/NavBar'
import RegenerateColorMobileButton from '@/components/RegenerateColorMobileButton'
import colorInfo from '@/core/colorInfo'
import { IColorInfo } from '@/core/types'
import { getFullLengthHex, isValidColor, removeHash } from '@/util/colorFormat'
import { getMetadata, getViewport } from '@/util/meta'
import { notFound, redirect } from 'next/navigation'

interface ColorPageProps {
    params: Promise<{
        color: string
    }>
    searchParams?: Promise<{
        r?: string
    }>
}

let data: IColorInfo | null = null

export async function generateMetadata() {
    return getMetadata(data?.hex)
}
export async function generateViewport() {
    return getViewport(data?.hex)
}

export default async function ColorPage({ params, searchParams }: ColorPageProps) {
    const { color } = await params
    const search = await searchParams
    const fromRandom = search?.r === '' || search?.r !== undefined || false

    if (!isValidColor(color)) return notFound()
    if (removeHash(color).length === 3) return redirect(`/${getFullLengthHex(color)}`)

    data = colorInfo.getColorInfo(color, 'color page')

    return (
        <>
            <RegenerateColorMobileButton fromRandom={fromRandom} />
            <MainContainer>
                <NavBar />
                <div className='flex flex-col gap-8'>
                    <ColorCard data={data} />
                    <ColorDetails data={data} />
                    <Items data={data} />
                </div>
                <Metadata
                    data={{
                        favicon: `/favicon?hex=${color}`,
                        title: `pyro - #${color}`,
                        themeColor: `#${color}`,
                    }}
                />
            </MainContainer>
            <Footer />
        </>
    )
}
