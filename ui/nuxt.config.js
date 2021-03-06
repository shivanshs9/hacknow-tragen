import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/web3.client', mode: 'client' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/firebase',
    '@nuxtjs/toast'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  firebase: {
    config: {
      // REQUIRED: Official config for firebase.initializeApp(config):
      apiKey: 'AIzaSyChOCMkIbsNf8Solp-h-kJsgYjgC7RLZ3E',
      authDomain: 'hacknow-tragen.firebaseapp.com',
      databaseURL: 'https://hacknow-tragen.firebaseio.com',
      projectId: 'hacknow-tragen',
      storageBucket: 'hacknow-tragen.appspot.com',
      messagingSenderId: '893961317217',
      appId: '1:893961317217:web:cc9712a1e9d63469753320'
      // measurementId: '<measurementId>',
      // OPTIONAL: Additional config for other services:
      // fcmPublicVapidKey: '<publicVapidKey>'/ // Sets vapid key for FCM after initialization
    },
    services: {
      realtimeDb: true,
      storage: true
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: [],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#009688',
          secondary: '#ff9800',
          accent: '#607d8b',
          error: '#f44336',
          warning: '#ff5722',
          info: '#2196f3',
          success: '#4caf50'
        }
      }
    }
  },
  toast: {
    position: 'bottom-center',
    register: [
      // Register custom toasts
      {
        name: 'my_error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
