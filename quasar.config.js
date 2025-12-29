import { configure } from 'quasar/wrappers'

export default configure(() => ({
  supportTS: true,

  boot: [],

  css: ['app.scss'],

  extras: ['fontawesome-v6'],

  build: {
    vueRouterMode: 'history',
    // For `Shepherd-ITSec.github.io` (and custom domain) this is correct.
    publicPath: '/'
  },

  devServer: {
    open: false
  },

  framework: {
    config: {
      dark: true
    },
    plugins: []
  },

  animations: []
}))


