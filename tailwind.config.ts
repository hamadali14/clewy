import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#071017",
        panel: "rgba(255,255,255,0.08)",
        line: "rgba(255,255,255,0.14)"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(30, 120, 255, 0.22)",
        glass: "0 20px 60px rgba(0,0,0,0.24)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "ui-sans-serif", "system-ui"]
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem"
      }
    }
  },
  plugins: []
};

export default config;
