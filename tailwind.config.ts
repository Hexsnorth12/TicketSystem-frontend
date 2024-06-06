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
                loader: '#00A9B4',
                'gray-1': '#151515',
                'gray-2': '#1E1E1E',
                'gray-3': '#333',
                'gray-4': '#4E4E4E',
                'gray-5': '#888888',
                'gray-6': '#00646A',
            },

            fontSize: {
                header1: [
                    '64px',
                    {
                        lineHeight: '1.2',
                        letterSpacing: '4px',
                        fontWeight: '700',
                    },
                ],
                header2: [
                    '48px',
                    {
                        lineHeight: '1.2',
                        letterSpacing: '4px',
                        fontWeight: '700',
                    },
                ],
                header3: [
                    '32px',
                    {
                        lineHeight: '1.2',
                        letterSpacing: '3px',
                        fontWeight: '500',
                    },
                ],
                header4: [
                    '28px',
                    {
                        lineHeight: '1.2',
                        letterSpacing: '2px',
                        fontWeight: '700',
                    },
                ],
                header5: [
                    '20px',
                    {
                        lineHeight: '1.2',
                        letterSpacing: '2px',
                        fontWeight: '500',
                    },
                ],
                btn1: [
                    '18px',
                    {
                        lineHeight: '1.5',
                        letterSpacing: '2px',
                        fontWeight: '500',
                    },
                ],
                btn2: [
                    '16px',
                    {
                        lineHeight: '1.5',
                        letterSpacing: '2px',
                        fontWeight: '500',
                    },
                ],
                body: [
                    '18px',
                    {
                        lineHeight: '1.5',
                        letterSpacing: '2px',
                        fontWeight: '400',
                    },
                ],
                small1: [
                    '16px',
                    {
                        lineHeight: '1.5',
                        letterSpacing: '1px',
                        fontWeight: '400',
                    },
                ],
                small2: [
                    '14px',
                    {
                        lineHeight: '1.5',
                        letterSpacing: '1px',
                        fontWeight: '400',
                    },
                ],
                number1: [
                    '72px',
                    {
                        lineHeight: '1.2',
                        letterSpacing: '0px',
                        fontWeight: '700',
                    },
                ],
                number2: [
                    '54px',
                    {
                        lineHeight: '1.2',
                        letterSpacing: '0px',
                        fontWeight: '700',
                    },
                ],
                number3: [
                    '40px',
                    {
                        lineHeight: '1.2',
                        letterSpacing: '0px',
                        fontWeight: '700',
                    },
                ],
                number4: [
                    '20px',
                    {
                        lineHeight: '1.2',
                        letterSpacing: '0px',
                        fontWeight: '700',
                    },
                ],
                number5: [
                    '16px',
                    {
                        lineHeight: '1.2',
                        letterSpacing: '0px',
                        fontWeight: '700',
                    },
                ],
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
            keyframes: {
                load: {
                    '0%': { left: '0', height: '30px', width: '15px' },
                    '50%': { height: '8px', width: '40px' },
                    '100%': { left: '235px', height: '30px', width: '15px' },
                },
            },
            animation: {
                load: 'load .7s infinite alternate ease-in-out',
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
