import { Copy } from '@/assets/icons'
import { useTranslations } from 'next-intl'
import { toast } from 'react-hot-toast'

type CopyableProps = {
    value: string
    label?: string
    side?: 'left' | 'right'
    successMessage?: string
    errorMessage?: string
}

const icon = <Copy size={18} weight='fill' />

export default function Copyable({ value, label = value, side = 'left' }: CopyableProps) {
    const t = useTranslations('general.copy')

    const copy = () => {
        navigator.clipboard
            .writeText(value)
            .then(() => {
                toast.success(t('success'))
            })
            .catch((err) => {
                console.log(err)
                toast.error(t('error'))
            })
    }

    return (
        <button
            className='inline-flex items-center gap-2 hover:opacity-75 transition-opacity'
            onClick={() => copy()}
            title={t('title')}
        >
            {side === 'left' && icon}
            {label}
            {side === 'right' && icon}
        </button>
    )
}
