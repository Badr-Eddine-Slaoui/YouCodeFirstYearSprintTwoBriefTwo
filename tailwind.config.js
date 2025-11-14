/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "switch-component": "switch-component 1.2s ease-in-out",
        "spin-slow": "spin 6s infinite ease-in-out",
        twerk: "twerk 1.5s ease-in-out",
      },
      keyframes: {
        "switch-component": {
          "0%": { opacity: 0 },
          "10%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        twerk: {
          "0%, 100%": { transform: "rotateZ(0deg)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "rotateZ(20deg)" },
          "20%, 40%, 60%, 80%": { transform: "rotateZ(-20deg)" },
        },
      },
      colors: {
        background: "#000000",
        card: "#242424",
        primary: "#E5E7EB",
        secondary: "#9CA3AF",
        light: {
          background: "#F9FAFB",
          card: "#FFFFFF",
          primary: "#111827",
          secondary: "#4B5563",
        },
      },
      screens: {
        "2xs": "400px",
        xs: "500px",
      },
    },
  },
  plugins: [],
};

