/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      background: "#F9FAFB",
      white: "#FFFFFF",
      neutral: {
        30: "#E5E7EB",
        40: "#D1D5DB",
        45: "#9CA3AF",
        50: "#F0F2FF",
        55: "#6B7280",
        60: "#374151",
        65: "#F3F4F6",
      },
      primary: {
        50: '#FFF7ED',
        55: '#F97316'
      },
      secondary: {
        50: '#DCFCE7',
        55: '#16A34A',
        60: '#22C55E'
      },
      error: {
        50: '#EF4444'
      },
      warning: {
        50: '#EAB308'
      },
    },

    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      
    },
  },
  plugins: [require("daisyui")],
};
