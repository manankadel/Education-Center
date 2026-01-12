import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // INVERTED: White background, Black text
        'background': '#ffffff', 
        'foreground': '#000000',
      },
       fontFamily: {
        // Retain original Swambasic fonts
        sans: ['var(--font-poppins)', 'sans-serif'],
        display: ['var(--font-unbounded)', 'sans-serif'], 
        heading: ['var(--font-genoa)', 'sans-serif'],
      },
      textShadow: {
        // Dark glow instead of white glow
        'glow': '0 0 8px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}
export default config