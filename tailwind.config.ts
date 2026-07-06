import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "ink-navy": "#10203A",
        "boarding-paper": "#F1F2ED",
        "stamp-gold": "#C89B3C",
        "visa-red": "#A9342A",
        "approved-green": "#1F6F54",
        slate: "#47505E",
      },
      fontFamily: {
        display: ["var(--font-instrument-serif)", "serif"],
        body: ["var(--font-general-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "perforated-x":
          "repeating-linear-gradient(90deg, transparent, transparent 6px, #47505E33 6px, #47505E33 10px)",
      },
      keyframes: {
        "stamp-press": {
          "0%": { transform: "scale(1.6) rotate(-8deg)", opacity: "0" },
          "60%": { transform: "scale(0.94) rotate(-8deg)", opacity: "1" },
          "80%": { transform: "scale(1.04) rotate(-8deg)" },
          "100%": { transform: "scale(1) rotate(-8deg)", opacity: "1" },
        },
      },
      animation: {
        "stamp-press": "stamp-press 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
