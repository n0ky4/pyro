import { IColorTheory } from '@/core/types'
import { useTranslations } from 'next-intl'
import Palette from './Palette'

interface ColorTheoryProps {
    colors: IColorTheory
}

export default function ColorTheory({ colors }: ColorTheoryProps) {
    const t = useTranslations('home.palettes')

    function getLabel(label: string) {
        return t(label)
    }

    return (
        <div className='grid gap-8 grid-cols-1 md:grid-cols-2'>
            {Object.entries(colors).map((x) => (
                <div className='flex flex-col gap-2' key={x[0]}>
                    <Palette colors={x[1]} linkColors label={getLabel(x[0])} />
                </div>
            ))}
        </div>
    )
}
