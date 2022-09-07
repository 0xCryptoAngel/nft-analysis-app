module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Permanent: ["Permanent Marker"],    
      },
      spacing: {
        '0.8': '0.3rem',
        '9.5': '2.3rem',
      },
      width: {
        76: '19rem',
        100: '28rem',
        110: '35rem',
        120: '45rem',
        '3/7': '48%',

      },
      colors: {
        blue: {
          450: '#3481F0',
          460: '#37AEC4',
          810: '#1C1C3380',
          820: '#353554',
          830: '#14142B',
          840: '#05050F',
          860: '#131329',
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
      },
      variants: {
        backgroundColor: ['responsive', 'even'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
