import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Per HHARA Typography & Colour Brief v1.0
        cream: {
          DEFAULT: "#F7F3ED", // Warm Cream — primary bg
          2: "#F0EAE0", // Cream 2 — panel variation
          3: "#E8DFD2", // Cream 3 — image fallback
          off: "#FAF7F2", // off-white (logo on dark, hero text)
        },
        gold: {
          DEFAULT: "#B8892E", // single canonical gold
          pale: "#F2E6C8", // gift note / highlights
        },
        bark: "#3A2416", // primary CTA, footer, dark boxes
        ink: "#2A1F14", // headlines, body inputs
        warm: "#7A6555", // secondary text / captions
        zinfandel: "#6B2737", // CTA hover / accent moments
        ticker: "#1A1714", // marquee bg
      },
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["'Cormorant Garamond'", "Garamond", "Georgia", "serif"],
      },
      letterSpacing: {
        eyebrow: "0.45em",
        label: "0.42em",
        cta: "0.45em",
        nav: "0.32em",
        ticker: "0.38em",
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        "marquee-fast": "marquee 28s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
