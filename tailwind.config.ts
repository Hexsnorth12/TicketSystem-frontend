import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            screens: {
                xl: '1296px',
            },
            padding: '0.75rem',
        },
        letterSpacing: {
            tighter: '-0.05em',
            tight: '-0.025em',
            normal: '0em',
            wide: '1px',
            wider: '2px',
            widest: '0.1em',
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                primary: '#0FF',
                secondary: '#00A9B4',
                'gray-1': '#151515',
                'gray-2': '#1E1E1E',
                'gray-3': '#333',
                'gray-4': '#4E4E4E',
                'gray-5': '#888888',
                'gray-6': '#00646A',
            },

            fontSize: {
                header1: '64px',
                header2: '48px',
                header3: '32px',
                header4: '28px',
                header5: '20px',
                btn1: '18px',
                btn2: '16px',
                body: '18px',
                small1: '16px',
                small2: '14px',
                number1: '72px',
                number2: '54px',
                number3: '40px',
                number4: '20px',
                number5: '16px',
            },
            fontWeight: {
                bold: '700',
                medium: '500',
                regular: '400',
            },
            lineHeight: {
                '150': '1.5',
                '120': '1.2',
            },
            borderRadius: {
                primary: '20px',
                secondary: '40px',
            },
        },
    },
    plugins: [
        plugin(function ({ addUtilities, theme, matchUtilities }) {
            addUtilities({
                '.scrollbar': {
                    'scrollbar-width': 'auto',
                    'scrollbar-color': 'white',
                    '&::-webkit-scrollbar': {
                        width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#333',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'white',
                        borderRadius: '4px',
                    },
                },
                '.scrollbar-hidden': {
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
                '.scrollbar-block': {
                    '-ms-overflow-style': 'visible',
                    'scrollbar-width': 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'block',
                    },
                },
            })

            matchUtilities(
                {
                    'scrollbar-mr': (value) => ({
                        '&::-webkit-scrollbar': {
                            marginRight: value,
                        },
                    }),
                },
                { values: theme('spacing') },
            )
        }),
    ],
}
export default config
