import type { Config } from "tailwindcss";

const config: Config = {
  content:[
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030712", // Deep slate/black
        foreground: "#f8fafc",
        accent: "#0066FF", // Premium Electric Blue
        "accent-dark": "#0047b3",
        muted: "#94a3b8",
        glass: "rgba(255, 255, 255, 0.03)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      }
    },
  },
  plugins:[],
};
export default config;