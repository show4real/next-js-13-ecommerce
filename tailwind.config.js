/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand primary (navy) — kept as the core brand color
        primary: {
          DEFAULT: "#0E1B4D",
          50: "#eef1f9",
          100: "#d4daee",
          200: "#a9b5dd",
          300: "#7e90cc",
          400: "#3f56a8",
          500: "#1c3079",
          600: "#0E1B4D",
          700: "#0b1640",
          800: "#081031",
          900: "#050a21",
        },
        // Warm accent for CTAs, deals & highlights (Amazon/Jumia vibe)
        accent: {
          DEFAULT: "#FF7A1A",
          50: "#fff4ea",
          100: "#ffe3c7",
          200: "#ffc78a",
          300: "#ffa94d",
          400: "#ff9224",
          500: "#FF7A1A",
          600: "#e85f00",
          700: "#bd4c00",
          800: "#923b00",
          900: "#6e2d00",
        },
      },
      maxHeight: {
        200: "200px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(14, 27, 77, 0.06), 0 1px 2px rgba(14, 27, 77, 0.04)",
        "card-hover": "0 12px 28px rgba(14, 27, 77, 0.14)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        "fade-up": "fade-up 0.5s ease-out both",
        shimmer: "shimmer 1.6s infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
