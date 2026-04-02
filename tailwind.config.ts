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
        background: "#F8F9FA",
        foreground: "#0F172A",
        brand: {
          blue: "#0A2540",      // Deep authoritative navy
          light: "#1C3D5A",     // Lighter navy for hover states
          accent: "#3B82F6",    // Vibrant blue for CTAs
          surface: "#F1F5F9",   // Very light grey/blue for section backgrounds
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display:["var(--font-syne)", "sans-serif"],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
      },
    },
  },
  plugins:[],
};
export default config;