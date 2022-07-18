module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Permanent: ["Permanent Marker"],    
      },
      width: {
        100: '28rem',
        110: '35rem',
        120: '45rem',
      },
      colors: {
        blue: {
          450: '#3481F0',
          900: '#171717',
          850: '#1F1F1F',
        },
        gray: {
          110: '#F6F6F6',
        },
        red: {
          75: '#FC0023',
        }
      },
      screens: {
        'laptop': '920px',
      },
      boxShadow: {
        '5xl': '5px 10px 20px blue inset, -5px -10px 20px blue inset',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
