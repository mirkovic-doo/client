/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-black': 'var(--color-light-black)',
        'light-gray': 'var(--color-light-gray)',
        'dark-gray': 'var(--color-dark-gray)',

        'bluish-gray-900': 'var(--color-bluish-gray-900)',
        'bluish-gray-600': 'var(--color-bluish-gray-600)',
        'bluish-gray-500': 'var(--color-bluish-gray-500)',
        'bluish-gray-200': 'var(--color-bluish-gray-200)',
        'bluish-gray-100': 'var(--color-bluish-gray-100)',
        'bluish-gray-80': 'var(--color-bluish-gray-80)',
        'bluish-gray-50': 'var(--color-bluish-gray-50)',

        'grayscale-800': 'var(--color-grayscale-800)',
        'grayscale-500': 'var(--color-grayscale-500)',
        'grayscale-300': 'var(--color-grayscale-300)',
        'grayscale-100': 'var(--color-grayscale-100)',
        'grayscale-50': 'var(--color-grayscale-50)',

        'purple-500': 'var(--color-purple-500)',
        'purple-400': 'var(--color-purple-400)',
        'purple-300': 'var(--color-purple-300)',
        'purple-200': 'var(--color-purple-200)',
        'purple-50': 'var(--color-purple-50)',

        'blue-900': 'var(--color-blue-900)',
        'blue-500': 'var(--color-blue-500)',
        'blue-200': 'var(--color-blue-200)',
        'blue-100': 'var(--color-blue-100)',
        'blue-50': 'var(--color-blue-50)',

        'green-700': 'var(--color-green-700)',
        'green-500': 'var(--color-green-500)',
        'green-200': 'var(--color-green-200)',
        'green-100': 'var(--color-green-100)',
        'green-50': 'var(--color-green-50)',

        'yellow-600': 'var(--color-yellow-600)',
        'yellow-500': 'var(--color-yellow-500)',
        'yellow-300': 'var(--color-yellow-300)',
        'yellow-100': 'var(--color-yellow-100)',
        'yellow-50': 'var(--color-yellow-50)',

        'orange-600': 'var(--color-orange-600)',
        'orange-500': 'var(--color-orange-500)',
        'orange-300': 'var(--color-orange-300)',
        'orange-100': 'var(--color-orange-100)',
        'orange-50': 'var(--color-orange-50)',

        'red-700': 'var(--color-red-700)',
        'red-500': 'var(--color-red-500)',
        'red-300': 'var(--color-red-300)',
        'red-100': 'var(--color-red-100)',
        'red-50': 'var(--color-red-50)',

        'pink-800': 'var(--color-pink-800)',
        'pink-700': 'var(--color-pink-700)',
        'pink-500': 'var(--color-pink-500)',
        'pink-300': 'var(--color-pink-300)',
        'pink-100': 'var(--color-pink-100)',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
