import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a070c",
        plum: "#2a1224",
        navy: "#10182a",
        ember: "#e8b86d",
        rose: "#d48aa8",
        mist: "#c9c0b6",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(232, 184, 109, 0.18)",
        glass: "0 8px 32px rgba(0,0,0,0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
