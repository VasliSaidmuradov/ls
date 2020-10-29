import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import PersonalArea from '@/views/PersonalArea.vue';
import {IRouter} from '@/interfaces/router.interface';
import ROUTE_NAME = IRouter.ROUTE_NAME;

Vue.use(Router)

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
