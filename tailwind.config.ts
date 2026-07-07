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
        // Sampled directly from the official Emunahh Global logo mark.
        "brand-navy": "#12197A",
        "brand-green": "#1C8A3E",
      },
      fontFamily: {
        display: ["var(--font-instrument-serif)", "serif"],
        body: ["var(--font-general-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
        script: ["var(--font-playfair)", "serif"],
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
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "plane-fly": {
          "0%": { transform: "translateX(-10%)", opacity: "0" },
          "8%": { opacity: "1" },
          "92%": { opacity: "1" },
          "100%": { transform: "translateX(110%)", opacity: "0" },
        },
      },
      animation: {
        "stamp-press": "stamp-press 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "fade-up": "fade-up 700ms cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 34s linear infinite",
        float: "float 6s ease-in-out infinite",
        "plane-fly": "plane-fly 9s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
