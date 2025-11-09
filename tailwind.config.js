/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
    extend: {
      animation: {
        "switch-component": "switch-component 1.2s ease-in-out",
        'spin-slow': 'spin 6s infinite ease-in-out',
      },
      keyframes: {
        "switch-component": {
          "0%": { opacity: 0 },
          "10%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      colors: {
        background: "#000000",
        card: "#242424",
        primary: "#E5E7EB",
        secondary: "#9CA3AF",
      },
    },
  },
  plugins: [],
};

