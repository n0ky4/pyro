/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                purp: {
                    50: '#EFECF3',
                    100: '#E1DCEA',
                    200: '#C1B6D3',
                    300: '#A393BD',
                    400: '#826DA6',
                    500: '#675388',
                    600: '#4C3E66',
                    700: '#30273F',
                    800: '#15111C',
                    900: '#0A080D',
                    950: '#050406',
                },
                red: {
                    50: '#fff0f3',
                    100: '#ffdde4',
                    200: '#ffc0cd',
                    300: '#ff94ab',
                    400: '#ff577b',
                    500: '#ff2352',
                    600: '#ff0036',
                    700: '#d7002e',
                    800: '#b10328',
                    900: '#920a27',
                    950: '#500011',
                },
            },
        },
    },
    plugins: [],
}
