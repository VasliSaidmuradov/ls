import Vue from 'vue'

import '../styles/quasar.scss'
import 'quasar/dist/quasar.ie.polyfills'
import lang from 'quasar/lang/ru.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {Notify, Quasar, QTooltip} from 'quasar'

Vue.use(Quasar, {
  config: {
  },
  components: {
    QTooltip
  },
  plugins: {
    Notify
  },
  lang: lang
})
