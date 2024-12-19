'use client'

import Copyable from '@/components/Copyable'
import { IColorInfo } from '@/core/types'
import { formatCMYK, formatHSL, formatHSV } from '@/util/colorFormat'

interface ColorDetailsProps {
    data: IColorInfo
}

interface InfoItem {
    label: string
    value: string
}

export default function ColorDetails({ data }: ColorDetailsProps) {
    const info: InfoItem[] = [
        {
            label: 'nome',
            value: data.name,
        },
        {
            label: 'hex',
            value: data.hex,
        },
        {
            label: 'rgb',
            value: Object.values(data.rgb).join(', '),
        },
        {
            label: 'hsl',
            value: Object.values(formatHSL(data.hsl, true, false)).join(', '),
        },
        {
            label: 'hsv',
            value: Object.values(formatHSV(data.hsv, true, false)).join(', '),
        },
        {
            label: 'cmyk',
            value: Object.values(formatCMYK(data.cmyk)).join(', '),
        },
    ]

    return (
        <table className='w-full'>
            <tbody>
                {info.map((item, index) => (
                    <tr key={index}>
                        <td className='w-fit pr-10'>
                            <h2 className='text-xl md:text-2xl font-bold'>{item.label}</h2>
                        </td>
                        <td className='w-full text-md md:text-lg'>
                            <Copyable value={item.value} side='right' />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
