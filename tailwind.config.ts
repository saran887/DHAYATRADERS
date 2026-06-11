import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-deep': '#0D2136',
        'navy':      '#1B3A5C',
        'steel':     '#2E6B9E',
        'teal':      '#4AABB8',
        'silver':    '#E8EDF2',
      },
    },
  },
  plugins: [],
} satisfies Config;
