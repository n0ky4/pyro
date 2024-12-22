import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { PyroIcon } from '@/components/Pyro'
import { Metadata } from 'next'
import MainContainer from '../../components/MainContainer'
import AboutField from './components/AboutField'
import AboutLink from './components/AboutLink'

const pyro = (
    <span className='inline-flex items-center gap-1 leading-none translate-y-[5px]'>
        <PyroIcon size={16} as='img' />
        <span className='text-black dark:text-white font-bold'>pyro</span>
    </span>
)

export const metadata: Metadata = {
    title: 'pyro - sobre',
    icons: {
        shortcut: '/favicon',
        icon: '/favicon',
    },
}

export default function About() {
    return (
        <>
            <MainContainer>
                <NavBar />
                <div className='flex flex-col gap-12 max-w-screen-sm w-full mx-auto py-8'>
                    <AboutField title='Sobre' id='about'>
                        <p>
                            O {pyro} é um site de indexação de cores e geração de paletas, útil para
                            designers, desenvolvedores e entusiastas de cores em geral.
                        </p>
                        <p>
                            Na página principal, uma cor aleatória é gerada a cada 1 hora. Você
                            também pode ativar o modo <i>Brainstorming</i>, que irá gerar uma cor
                            aleatória a cada 5 segundos.
                        </p>
                        <p>
                            Tanto na página principal quanto na página dedicada a uma cor
                            específica, são exibidas informações úteis sobre a cor apresentada,
                            incluindo o nome, o código hexadecimal, o código RGB, além de paletas
                            baseadas na teoria das cores e outros dados relevantes.
                        </p>
                    </AboutField>
                    <AboutField title='Código-fonte' id='source-code'>
                        <p>
                            Este projeto é distribuído livremente sob a licença <b>AGPL-3.0</b>.
                            Você pode conferir o código-fonte{' '}
                            <AboutLink href={process.env.GITHUB_REPO}>
                                neste repositório do GitHub
                            </AboutLink>
                            .
                        </p>
                    </AboutField>
                    <AboutField title='Atribuições' id='attributions'>
                        <div>
                            <p>
                                Nomes de cores:{' '}
                                <AboutLink href={process.env.COLORNAMES_REPO}>
                                    color-names
                                </AboutLink>
                            </p>
                            <p>
                                Ícone do {pyro}:{' '}
                                <AboutLink href={process.env.FLUORITE_URL}>
                                    {process.env.FLUORITE_NAME}
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
