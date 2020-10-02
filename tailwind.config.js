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
      }
    },
  },
  variants: {},
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
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
