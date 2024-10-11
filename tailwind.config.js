/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      '2xl': { min: '1200px' },
      '4xl': { max: '1600px' },
      '3xl': { max: '1439px' },
      xl: { max: '1199px' },
      lg: { max: '991px' },
      md: { max: '767px' },
      lsm: { max: '640px' },
      sm: { max: '575px' },
      dateRange: { max: '550px' },
      xsm: { max: '374px' },
    },
  },
  plugins: [],
};
