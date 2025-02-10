import { IColorInfo } from '@/core/types'
import { useTranslations } from 'next-intl'
import ColorTheory from './ColorTheory'
import Palette from './Palette'

interface Item {
    id: string
    component: React.ReactNode
}

export function Items({ data }: { data: IColorInfo }) {
    const t = useTranslations('home.palettes')

    const items: Item[] = [
        {
            id: 'shades',
            component: <Palette colors={data.palettes.shades} label={t('shades')} linkColors />,
        },
        {
            id: 'tints',
            component: <Palette colors={data.palettes.tints} label={t('tints')} linkColors />,
        },
        {
            id: 'hues',
            component: <Palette colors={data.palettes.hues} label={t('hues')} linkColors />,
        },
        {
            id: 'theory',
            component: <ColorTheory colors={data.palettes.theory} />,
        },
        {
            id: 'related',
            component: (
                <Palette colors={data.related} label={t('related')} linkColors perRow={10} />
            ),
        },
    ]

    return (
        <>
            {items.map((x) => (
                <div className='flex flex-col gap-2' key={x.id}>
                    {x.component}
                </div>
            ))}
        </>
    )
}
