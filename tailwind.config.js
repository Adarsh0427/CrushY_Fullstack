import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

module.exports = {
  mode: "jit",
  content: ["./node_modules/tw-elements/js/**/*.js","./client/views/**/*.ejs","./client/views/admin/**/*.ejs","./client/views/faculty/**/*.ejs","./client/views/faculty/**/**/*.ejs"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: {
          900: "#202225",
          800: "#2f3136",
          700: "#36393f",
          600: "#4f545c",
          400: "#d4d7dc",
          300: "#e3e5e8",
          200: "#ebedef",
          100: "#f2f3f5",
        },
        logo_1: "#30B3AB",
        logo_2: "#F9A682",
        logo_3: "#BAE3E2",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("daisyui"),
    require("tw-elements/plugin.cjs"),
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};
