import Footer from '@/components/Footer'
import { MainColorComponent } from '@/components/MainColorComponent'
import MainContainer from '@/components/MainContainer'
import NavBar from '@/components/NavBar'
import color from '@/core/colorGenerator'
import { getHourlyColorData } from '@/util/colorData'
import dayjs from '@/util/date'
import { getMetadata, getViewport } from '@/util/meta'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export interface Item {
    id?: string
    component: React.ReactNode
}

export async function generateMetadata() {
    const data = getHourlyColorData()

    return getMetadata({
        hex: data?.hex,
    })
}
export async function generateViewport() {
    const data = getHourlyColorData()

    return getViewport(data?.hex)
}

export default async function Home() {
    const data = getHourlyColorData()

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
