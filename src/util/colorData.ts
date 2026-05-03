import colorInfo from '@/core/colorInfo'
import { getFullLengthHex, isValidColor, removeHash } from '@/util/colorFormat'

export function resolveColorData(color: string) {
    if (!isValidColor(color)) return null
    if (removeHash(color).length === 3) {
        return colorInfo.getColorInfo(getFullLengthHex(color))
    }
    return colorInfo.getColorInfo(color)
}

export function getHourlyColorData() {
    return colorInfo.getHourlyColor()
}
