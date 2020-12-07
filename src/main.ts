import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import DefaultLayout from './layouts/DefaultLayout.vue';
import AuthLayout from './layouts/AuthLayout.vue';
import './plugins/quasar';
import './plugins/vue-awesome';
import './plugins/vueDonutChart';
import './plugins/date-fns';
import './plugins/axios';
import './plugins/bus';
import './plugins/vue.cookes';
import './styles/main.scss';

Vue.component('defaultLayout', DefaultLayout);
Vue.component('authLayout', AuthLayout);
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
