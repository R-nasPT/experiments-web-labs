import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "spider-man": ["spider", "sans-serif"],
        "Montserrat-Alternates": ["montserrat", "sans-serif"],
        "amazing-spider": ["amazspi", "serif"],
      },
      keyframes: {
        pulse2: {
          "0%": {
            boxShadow: "none",
          },
          "100%": {
            boxShadow: "0px 0px 0px 6px rgba(205,241,205)",
          },
        },
      },
      animation: {
        "pulse-expand": "pulse2 ease 750ms infinite",
      },
    },
  },
  plugins: [],
};
export default config;
