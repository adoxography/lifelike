/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        'highlight': 'inset 1px 1px #fff1',
        'highlight-strong': 'inset 1px 1px #fff3',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
