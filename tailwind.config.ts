import type { Config } from "tailwindcss";

// Design tokens "Plume" (§10)
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#2B57FF",
        blueDk: "#1B3CD6",
        deep: "#0C1640",
        deep2: "#13205C",
        orange: "#FF6A2C",
        orangeDk: "#F2530F",
        orSoft: "#FFEDE2",
        ink: "#0E1426",
        muted: "#6A7287",
        faint: "#9AA1B2",
        line: "#E7EAF3",
        field: "#F2F5FB",
        blueSoft: "#EEF2FF",
        green: "#1F9D57",
        greenSoft: "#E6F6EC",
        amber: "#E0A100",
        band: "#EFF2F9",
      },
      borderRadius: {
        button: "16px",
        field: "14px",
        cardSm: "16px",
        goal: "18px",
        card: "24px",
        pill: "999px",
      },
      fontSize: {
        h1: ["32px", { fontWeight: "700" }],
        title: ["28px", { fontWeight: "700" }],
        balance: ["38px", { fontWeight: "700" }],
        body: ["16px", {}],
        sub: ["15.5px", {}],
        button: ["17px", { fontWeight: "600" }],
        label: ["13px", { fontWeight: "600" }],
        input: ["17px", {}],
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
