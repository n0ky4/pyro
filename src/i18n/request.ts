import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'

const FALLBACK_LOCALE = 'en'

const languagesFallback = {
    en: ['en-us', 'en-gb'],
    'pt-BR': ['pt-br', 'pt-pt', 'pt'],
}
const keys = Object.keys(languagesFallback)
const entries = Object.entries(languagesFallback)

const getLanguageWithFallback = (locale: string): string | null => {
    if (keys.includes(locale)) return locale
    for (const [key, value] of entries) {
        if (value.includes(locale)) return key
    }
    return null
}

export default getRequestConfig(async () => {
    let locale = FALLBACK_LOCALE

    const acceptLanguage = (await headers()).get('accept-language')
    const cookie = (await cookies()).get('locale')?.value

    if (cookie) {
        locale = cookie
    } else if (acceptLanguage) {
        const langs = acceptLanguage.split(',').map((lang) => lang.split(';')[0])
        let found = null
        for (const lang of langs) {
            found = getLanguageWithFallback(lang.toLowerCase())
            if (found) {
                locale = found
                break
            }
        }
        if (!found) locale = FALLBACK_LOCALE
    }

    console.log('[I18N] Accept-Language:', acceptLanguage)
    console.log('[I18N] Cookie:', cookie)
    console.log('[I18N] Raw Locale:', locale)

    locale = getLanguageWithFallback(locale.toLowerCase()) || FALLBACK_LOCALE
    // locale = FALLBACK_LOCALE

    try {
        return {
            locale,
            messages: (await import(`./../assets/messages/${locale}.json`)).default,
        }
    } catch (err) {
        console.error(`[i18n] missing translation file for locale: ${locale}`, err)
        return {
            locale: FALLBACK_LOCALE,
            messages: (await import(`./../assets/messages/${FALLBACK_LOCALE}.json`)).default,
        }
    }
})
