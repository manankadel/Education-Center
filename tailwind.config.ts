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
        background: "#F8FAFC",
        foreground: "#0F172A",
        brand: {
          navy: "#0A192F",       // Deep Oxford Blue
          gold: "#D4AF37",       // Heritage Gold
          light: "#112240",      // Lighter Navy for cards
          slate: "#8892B0",      // Premium grey for text
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display:["var(--font-syne)", "sans-serif"],
      },
    },
  },
  plugins:[],
};
export default config;