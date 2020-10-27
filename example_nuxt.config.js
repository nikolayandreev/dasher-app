export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    htmlAttrs: {
      lang: 'bg',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'preconnect',
        href: process.env.API_URL,
        crossorigin: 'use-credentials',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/inject.js',
    '~/plugins/axios.js',
    '~/plugins/vuelidate.js',
    '~/plugins/v-lazy-image.js',
    { src: '~/plugins/perfect-scrollbar.js', mode: 'client' },
  ],
  router: {
    middleware: ['auth'],
  },
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/tailwindcss',
    [
      '@teamnovu/nuxt-breaky',
      {
        enabled: true,
        enableInProd: false,
        colorScheme: 'auto',
        position: 'bottomRight'
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/svg-sprite',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  tailwindcss: {
    exposeConfig: true
  },
  axios: {
    baseURL: process.env.API_URL,
    credentials: true,
  },
  auth: {
    strategies: {
      cookie: {
        cookie: {
          name: 'XSRF-TOKEN',
        },
      },
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.API_URL,
        endpoints: {
          login: { url: '/api/login' },
          logout: { url: '/api/logout', method: 'DELETE' },
          user: false,
        },
      },
      autoFetchUser: false,
      globalToken: false,
      tokenRequired: false,
      tokenType: false,
    },
    redirect: {
      login: '/signin',
      logout: '/',
      callback: '/signin',
      home: '/reservations',
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
}