/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    boxShadow: {
      x: "0px 0px 10px 2px rgba(0, 0, 0, 0.3)",
    },
    colors: {
      main: "#c2a74e",
      main_dark: "#3d3d3f",
      dark: "#2e3845",
      color1: "#ff656d",
      color2: "#fbaa72",
      textColor: "#838184",
    },
  },
};
export const plugins = [];
