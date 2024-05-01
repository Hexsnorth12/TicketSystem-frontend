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
        'gray-5': '#888',
      },
    },
  },
  plugins: [],
}
export default config
