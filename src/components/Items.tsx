import { IColorInfo } from '@/core/types'
import ColorTheory from './ColorTheory'
import Palette from './Palette'

interface Item {
    id: string
    component: React.ReactNode
}

export function Items({ data }: { data: IColorInfo }) {
    const items: Item[] = [
        {
            id: 'shades',
            component: <Palette colors={data.palettes.shades} label='Tons escuros' linkColors />,
        },
        {
            id: 'tints',
            component: <Palette colors={data.palettes.tints} label='Tons claros' linkColors />,
        },
        {
            id: 'hues',
            component: <Palette colors={data.palettes.hues} label='Hue' linkColors />,
        },
        {
            id: 'theory',
            component: <ColorTheory colors={data.palettes.theory} />,
        },
        {
            id: 'related',
            component: (
                <Palette colors={data.related} label='Cores relacionadas' linkColors perRow={10} />
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
