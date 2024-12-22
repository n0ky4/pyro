import ColorCard from '@/components/ColorCard'
import ColorDetails from '@/components/ColorDetails'
import Footer from '@/components/Footer'
import { Items } from '@/components/Items'
import MainContainer from '@/components/MainContainer'
import NavBar from '@/components/NavBar'
import ResetTimer from '@/components/ResetTimer'
import colorInfo from '@/core/colorInfo'
import dayjs from '@/util/date'
import { getMetadata, getViewport } from '@/util/meta'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export interface Item {
    id?: string
    component: React.ReactNode
}

let data = colorInfo.getHourlyColor()

export const generateMetadata = () => getMetadata(data?.hex)
export const generateViewport = () => getViewport(data?.hex)

export default async function Home() {
    data = colorInfo.getHourlyColor()

    const nextHour = dayjs().add(1, 'hour').startOf('hour')
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
