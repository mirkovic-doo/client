/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'client-light-black': 'var(--color-light-black)',
        'client-light-gray': 'var(--color-light-gray)',
        'client-dark-gray': 'var(--color-dark-gray)',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
