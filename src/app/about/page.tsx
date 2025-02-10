import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { PyroIcon } from '@/components/Pyro'
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import MainContainer from '../../components/MainContainer'
import AboutField from './_components/AboutField'
import AboutLink from './_components/AboutLink'

export const metadata: Metadata = {
    title: 'pyro - sobre',
    icons: {
        shortcut: '/favicon',
        icon: '/favicon',
    },
}

export default function About() {
    const t = useTranslations()

    const pyro = (
        <span className='inline-flex items-center gap-1 leading-none translate-y-[5px]'>
            <PyroIcon size={16} as='img' />
            <span className='text-black dark:text-white font-bold'>{t('general.pyro')}</span>
        </span>
    )

    const aboutText1 = t.rich('about.text1', {
        pyro: () => <>{pyro}</>,
    })
    const aboutText2 = t.rich('about.text2', {
        i: (chunks) => <i>{chunks}</i>,
    })
    const aboutText3 = t('about.text3')

    return (
        <>
            <MainContainer>
                <NavBar />
                <div className='flex flex-col gap-12 max-w-screen-sm w-full mx-auto py-8'>
                    <AboutField title={t('general.about')} id='about'>
                        <p>{aboutText1}</p>
                        <p>{aboutText2}</p>
                        <p>{aboutText3}</p>
                    </AboutField>
                    <AboutField title={t('general.sourceCode')} id='source-code'>
                        <p>
                            {t.rich('about.sourceCodeText', {
                                license: () => <b>AGPL-3.0</b>,
                                repo: (chunks) => (
                                    <AboutLink href={process.env.GITHUB_REPO}>{chunks}</AboutLink>
                                ),
                            })}
                        </p>
                    </AboutField>
                    <AboutField title={t('general.attributions')} id='attributions'>
                        <div>
                            <p>
                                {t.rich('about.attributions.icon', {
                                    pyro: () => <>{pyro}</>,
                                })}
                                :{' '}
                                <AboutLink href='https://twitter.com/fluoritemonkey'>
                                    fluorita
                                </AboutLink>
                            </p>
                            <p>
                                {t('about.attributions.colorNames')}:{' '}
                                <AboutLink href='https://github.com/meodai/color-names'>
                                    color-names
                                </AboutLink>
                            </p>
                            <p>
                                {t('about.attributions.analytics')}:{' '}
                                <AboutLink href='https://plausible.io/'>
                                    Plausible Analytics
                                </AboutLink>
                            </p>
                        </div>
                    </AboutField>
                </div>
            </MainContainer>
            <Footer />
        </>
    )
}
