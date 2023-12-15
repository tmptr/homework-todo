import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/zh-CN'

import './style.css'
import "virtual:uno.css";
// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
  lang: quasarLang,
})

app.mount('#app')
