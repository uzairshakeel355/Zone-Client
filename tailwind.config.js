/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  corePlugins: {
    preflight: false, // don't let Tailwind's reset fight Angular Material's base styles
  },
  theme: { extend: {} },
  plugins: [],
}