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
          800: "#1F2937",
        },
        secondary: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          500: "#22C55E",
          600: "#16A34A",
        },
        primary: {
          100: "#FFEDD5",
          200: "#FED7AA",
          500: "#F97316",
          200: "#FED7AA",
          100: "#FFEDD5",
        },

        error: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          300: "#EF4444",
        },

        warning: {
          500: "#EAB308",
        },
      },
    },
  },
  daisyui: {
    darkTheme: "light",
  },
  plugins: [require("daisyui")],
};
