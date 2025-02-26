// import type { Config } from 'tailwindcss'

// const config: Config = {
//   content: [
//     './src/*.{js,ts,jsx,tsx,mdx}',
//     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/app/**/*.{js,ts,jsx,tsx,mdx}'
//   ],
//   theme: {
//     extend: {
// backgroundImage: {
//   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//   'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
// },
// colors: {
//   primary: '#5475D1',
//   'primary-light': '#C4147A',
//   'primary-edit': '#4B49AC',
//   'primary-yellow': '#f78a1c',
//   'primary-green': '#55b756',
//   'primary-gray': '#637381',
//   'primary-black': '#212b36',
//   'primary-white': '#fff',
//   'primary-border': '#919eab33',
//   success: '#06d6a0',
//   'success-opcity': '#cdf7ec',
//   delete: '#ef476f',
//   'delete-opcity': '#fcdae2',
//   edit: '#1ea6d3',
//   'edit-opcity': '#d2edf6',
//   warning: '#f1be46',
//   'warning-opcity': '#fcf2da'
// }
//}
//   },
//   plugins: []
// }
// export default config

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/renderer/src/**/*.{js,ts,jsx,tsx}',
    './src/renderer/src/*.{js,ts,jsx,tsx}',
    './src/renderer/src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5475D1',
        'primary-light': '#C4147A',
        'primary-edit': '#4B49AC',
        'primary-yellow': '#f78a1c',
        'primary-green': '#55b756',
        'primary-gray': '#637381',
        'primary-black': '#212b36',
        'primary-white': '#fff',
        'primary-border': '#919eab33',
        success: '#06d6a0',
        'success-opcity': '#cdf7ec',
        delete: '#ef476f',
        'delete-opcity': '#fcdae2',
        edit: '#1ea6d3',
        'edit-opcity': '#d2edf6',
        warning: '#f1be46',
        'warning-opcity': '#fcf2da'
      }
    }
  },
  plugins: []
}
