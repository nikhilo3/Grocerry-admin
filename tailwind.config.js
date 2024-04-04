/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        background: "#F9FAFB",
        accent: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
        },
        secondary: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          600: "#16A34A",
        },
        primary: {
          500: "#F97316",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
