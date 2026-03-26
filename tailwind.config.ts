// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        surface: '#0a0a0a',
        panel: '#0f0f0f',
        line: '#1a1a1a',
        signal: '#FFB000',
        confirm: '#00FF88',
        alert: '#FF3333',
        intel: '#0088FF',
        'text-primary': '#f0f0f0',
        'text-secondary': '#888888',
        'text-muted': '#4a4a4a',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        condensed: ['var(--font-barlow)', 'sans-serif'],
        mono: ['var(--font-ibm)', 'monospace'],
        system: ['var(--font-share-tech)', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #111 1px, transparent 1px), linear-gradient(to bottom, #111 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
export default config