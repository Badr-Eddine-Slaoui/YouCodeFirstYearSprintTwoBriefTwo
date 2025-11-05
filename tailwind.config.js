/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
    extend: {
      animation: {
        "switch-component": "switch-component 1.2s ease-in-out",
      },
      keyframes: {
        "switch-component": {
          "0%": { opacity: 0 },
          "10%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};

