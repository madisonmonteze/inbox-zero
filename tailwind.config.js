module.exports = {
  purge: {
    content: [
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`
    ]
  },
  important: false,
  theme: {
    screens: {
      '400': '400px',
      '500': '500px',
      '600': '600px',
      '800': '800px',
      '900': '900px',
      '1000': '1000px',
      '1200': '1200px', 
      '1400': '1400px', 
      '1600': '1600px', 
    },
    colors: {
      white: '#fff',
      black: '#000',
      purple: '#6262FF',
      red: '#ff0000',
      yellow: '#E4FF00',
      blue: '#0000ff',
    },
    fontSize: {
      '10': '10px',
      '12': '12px',
      '14': '14px',
      '16': '16px',
      '20': '20px',
      '24': '24px',
      '32': '32px',
    },
    fontFamily: {
      'display': ['Compagnon'],
      'roman': ['Compagnon Roman'],
    },
    extend: {
      maxWidth: { 
        '500': '500px',
        '600': '600px',
        '620': '620px',
        '800': '800px',
        '900': '900px',
        '1000': '1000px',
        '1200': '1200px',
        '1400': '1400px',
        '1800': '1800px',
      },
      boxShadow: {
        'cta': '6px 6px 0 0 #E4FF00',
      },
      backgroundColor: {
        'hazy': 'hsla(0,0%,100%,.24)',
      },
    }
  },
  variants: {},
  plugins: [],
};
