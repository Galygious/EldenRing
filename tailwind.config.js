/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'elden-gold': '#C4A456',
        'elden-dark': '#1A1A1A',
        'elden-darker': '#121212',
        'elden-light': '#E2D6A9',
        'elden-red': '#8F0707',
      },
      fontFamily: {
        serif: ['Garamond', 'Georgia', 'serif'],
        display: ['Cinzel', 'serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'main-bg': "url('/images/background.jpg')",
      },
    },
  },
  plugins: [],
}; 