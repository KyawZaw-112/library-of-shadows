import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        paper: "#ffffff",
        plum: "#111111",
        navy: "#0f0f0f",
        ember: "#ffffff",
        rose: "#ffffff",
        mist: "#f2f2f2",
        line: "rgba(255,255,255,0.12)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.45)",
      },
      animation: {
        spotlight: "spotlight 2s ease 0.75s 1 forwards",
        scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "border-spin": "border-spin 4s linear infinite",
        cartpop: "cartpop 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%, -40%) scale(1)" },
        },
        scroll: {
          to: { transform: "translate(calc(-50% - 0.5rem))" },
        },
        "border-spin": {
          "100%": { transform: "rotate(360deg)" },
        },
        cartpop: {
          "0%": { transform: "scale(1)" },
          "35%": { transform: "scale(1.45) translateY(-3px)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
