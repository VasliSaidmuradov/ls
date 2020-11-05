import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/quasar'
import './plugins/vue-awesome'
import './plugins/vueDonutChart'
import './plugins/moment'
import './styles/main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
