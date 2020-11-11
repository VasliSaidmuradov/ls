import Vue from 'vue'
import Router, {Route} from 'vue-router'
import {IRouter} from '@/interfaces/router.interface';
import ROUTE_NAME = IRouter.ROUTE_NAME;
import ROUTE_PATH = IRouter.ROUTE_PATH;
import {ILayout} from '@/interfaces/layout.interface';
import Breakpoint = ILayout.Breakpoint;

Vue.use(Router)

export const MobileRouteRedirect = (to: Route, from: Route, next: Function) => {
  if (window.screen.width >= Breakpoint.MOBILE) {
    next({name: ROUTE_NAME.PAGE_PERSONAL_AREA})
  } else {
    next();
  }
}

export default new Router({
  mode: 'history',
  routes: [{
    path: ROUTE_PATH[ROUTE_NAME.PAGE_PERSONAL_AREA],
    name: ROUTE_NAME.PAGE_PERSONAL_AREA,
    component: () => import('@/views/PersonalArea.vue'),
    props: (route: Route) => ({ query: route.query.activeTab })
    }, {
      path: ROUTE_PATH[ROUTE_NAME.MEDICAL_CARD_PAGE],
      name: ROUTE_NAME.MEDICAL_CARD_PAGE,
      component: () => import('@/components/MedicalCard.vue'),
      beforeEnter: MobileRouteRedirect,
  }, {
      path: ROUTE_PATH[ROUTE_NAME.PROFILE_PAGE],
      name: ROUTE_NAME.PROFILE_PAGE,
      component: () => import('@/components/UserSettings.vue'),
      beforeEnter: MobileRouteRedirect,
    }, {
      path: ROUTE_PATH[ROUTE_NAME.PASSWORD_CHANGE_PAGE],
      name: ROUTE_NAME.PASSWORD_CHANGE_PAGE,
      component: () => import('@/views/PasswordChangePage.vue'),
      beforeEnter: MobileRouteRedirect,
    }, {
      path: ROUTE_PATH[ROUTE_NAME.INDEX_PAGE],
      name: ROUTE_NAME.INDEX_PAGE,
      component: () => import('@/views/IndexPage.vue'),
    }, {
      path: ROUTE_PATH[ROUTE_NAME.ANALYZES_PAGE],
      name: ROUTE_NAME.ANALYZES_PAGE,
      component: () => import('@/views/AnalyzesPage.vue'),
    }, {
      path: ROUTE_PATH[ROUTE_NAME.ANALYZES_PAGE],
      name: ROUTE_NAME.ANALYZES_PAGE,
      component: () => import('@/views/AnalyzesPage.vue'),
    }, {
      path: ROUTE_PATH[ROUTE_NAME.STORAGE_PAGE],
      name: ROUTE_NAME.STORAGE_PAGE,
      component: () => import('@/views/StoragePage.vue'),
    }, {
      path: ROUTE_PATH[ROUTE_NAME.APPOINTMENT_PAGE],
      name: ROUTE_NAME.APPOINTMENT_PAGE,
      component: () => import('@/views/AppointmentPage.vue'),
    }, {
      path: ROUTE_PATH[ROUTE_NAME.NOT_FOUND_PAGE],
      name: ROUTE_NAME.NOT_FOUND_PAGE,
      component: () => import('@/views/NotFound.vue'),
    }]
});
