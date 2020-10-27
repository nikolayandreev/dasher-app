/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      container: (theme) => ({
        center: true,
        padding: {
          default: theme("spacing.4"),
          sm: theme("spacing.5"),
          lg: theme("spacing.6"),
          xl: theme("spacing.8"),
        },
      }),
      fontFamily: {
        'display': ['Fira Sans', 'sans-serif'],
        'body': ['Ubuntu', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#FEF2F9',
          100: '#FDE6F4',
          200: '#FBC0E3',
          300: '#F99AD3',
          400: '#F44FB1',
          500: '#EF0390',
          600: '#D70382',
          700: '#8F0256',
          800: '#6C0141',
          900: '#48012B',
        },
      }
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'active', 'group-focus', 'group-hover'],
    shadowOutline: ['focus', 'active']
  },
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('tailwindcss-shadow-outline-colors')(),
  ],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
