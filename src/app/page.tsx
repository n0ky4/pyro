import Footer from '@/components/Footer'
import { MainColorComponent } from '@/components/MainColorComponent'
import MainContainer from '@/components/MainContainer'
import NavBar from '@/components/NavBar'
import color from '@/core/colorGenerator'
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

export async function generateMetadata() {
    return getMetadata({
        hex: data?.hex,
    })
}
export async function generateViewport() {
    return getViewport(data?.hex)
}

export default async function Home() {
    data = colorInfo.getHourlyColor()

    const nextHour = dayjs().add(1, 'hour').startOf('hour')
    const nextUnix = nextHour.unix()

    const colors = color.getBrainstormColors()

    return (
        <>
            <MainContainer>
                <NavBar />
                <MainColorComponent
                    initialData={data}
                    nextUnix={nextUnix}
                    initialBrainstormColors={colors}
                />
            </MainContainer>
            <Footer />
        </>
    )
}
