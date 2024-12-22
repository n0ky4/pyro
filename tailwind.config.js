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
                bgDark: '#15111c',
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
