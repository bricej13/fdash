module.exports = {
  /*
  ** Headers of the page
  */
  router: {
    linkExactActiveClass: 'active',
    base: '/'
  },
  head: {
    title: 'Family Dashboard',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Dashboard for the most important things.'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: "/css/weather-icons.min.css"},
    ]
  },
  meta: {
    mobileAppIOS: true,
    name: 'F-Dash',
    author: 'Brice Johnson'
  },
  manifest: {
    name: 'Family Dashboard',
    short_name: 'F-Dash',
    lang: 'en',
    display: 'standalone',
    start_url: '/'
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  plugins: [
    {src: '~/plugins/charts', ssr: false},
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-buefy'
  ],
  axios: {},
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
