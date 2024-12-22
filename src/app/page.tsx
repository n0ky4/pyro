import ColorCard from '@/components/ColorCard'
import ColorDetails from '@/components/ColorDetails'
import Footer from '@/components/Footer'
import { Items } from '@/components/Items'
import MainContainer from '@/components/MainContainer'
import NavBar from '@/components/NavBar'
import ResetTimer from '@/components/ResetTimer'
import colorInfo from '@/core/colorInfo'
// import { removeHash } from '@/util/colorFormat'
import dayjs from '@/util/date'
// import { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export interface Item {
    id?: string
    component: React.ReactNode
}

// export async function generateMetadata(): Promise<Metadata> {
//     if (!data) return {}

//     const icon = {
//         url: `/favicon?hex=${removeHash(data.hex)}`,
//         type: 'image/svg+xml',
//     }

//     return {
//         title: `pyro - ${data.hex}`,
//         icons: {
//             icon,
//             shortcut: icon,
//         },
//     }
// }

// export const viewport = () => {
//     if (!data)
//         return {
//             themeColor: 'black',
//         }

//     return {
//         themeColor: data.hex,
//     }
// }

export default async function Home() {
    const data = colorInfo.getHourlyColor()

    const nextHour = dayjs().add(1, 'hour').startOf('hour')
    const fromNow = nextHour.fromNow(true)
    const nextUnix = nextHour.unix()

    return (
        <>
            <MainContainer>
                <NavBar />
                <div className='flex flex-col gap-8'>
                    <div className='flex items-center gap-4 justify-between md:justify-normal'>
                        <h1 className='text-2xl sm:text-4xl md:text-6xl font-bold'>cor destaque</h1>
                        <ResetTimer updateAt={nextUnix} />
                    </div>
                    <ColorCard data={data} />
                    <ColorDetails data={data} />
                    <Items data={data} />
                </div>
            </MainContainer>
            <Footer />
        </>
    )
}
