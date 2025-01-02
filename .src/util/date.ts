import d from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'

const dayjs = setupDayJs()

function setupDayJs() {
    d.locale('pt-br')
    d.extend(relativeTime)
    return d
}

export function today() {
    return dayjs().startOf('day')
}

export default dayjs
