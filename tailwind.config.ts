import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
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
        },
    },
    plugins: [],
}
export default config
