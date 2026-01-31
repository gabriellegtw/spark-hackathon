
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      colors: {
        teal: {
          light: '#A3D9D3',
          DEFAULT: '#5EAAA8',
          medium: '#5EAAA8',
          dark: '#3D8B8B',
        },
        cream: {
          base: '#FFF8F0',
          card: '#F5EBE0',
          border: '#EDE4D9',
        },
        coral: {
          DEFAULT: '#E07A5F', // Warm emergency
          light: '#F2CCB7',
        },
        sage: {
          DEFAULT: '#81B29A', // Success
          medium: '#81B29A',
          light: '#D8E5DE',
        },
        warmGray: {
          body: '#5D5D5D',
          heading: '#3D3D3D',
          light: '#8D8D8D',
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        'warm': '0 10px 25px -5px rgba(94, 170, 168, 0.15), 0 8px 10px -6px rgba(94, 170, 168, 0.1)',
        'warm-hover': '0 20px 25px -5px rgba(94, 170, 168, 0.2), 0 10px 10px -5px rgba(94, 170, 168, 0.1)',
      }
    },
  },
  plugins: [],
}
