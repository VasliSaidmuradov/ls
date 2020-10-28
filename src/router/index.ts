import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import PersonalArea from '@/views/PersonalArea.vue';

Vue.use(Router)

export enum ROUTE_NAME {
  PAGE_PERSONAL_AREA = 'personal-area'
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: ROUTE_NAME.PAGE_PERSONAL_AREA,
      component: PersonalArea,
    }
  ]
});
