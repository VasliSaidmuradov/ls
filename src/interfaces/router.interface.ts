import {Dictionary, Route, VueRouter} from 'vue-router/types/router';

export namespace IRouter {
  export enum ROUTE_NAME {
    PAGE_PERSONAL_AREA = 'personalArea',
    INDEX_PAGE = 'indexPage',
    ANALYZES_PAGE = 'analyzesPage',
    STORAGE_PAGE = 'storagePage',
    STORAGE_SINGLE_DOCUMENT_PAGE = 'singleDocumentPage',
    APPOINTMENT_PAGE = 'appointmentPage',
    NOT_FOUND_PAGE = 'notFoundPage',
    PROFILE_PAGE = 'profilePage',
    MEDICAL_CARD_PAGE = 'medicalCart',
    PASSWORD_CHANGE_PAGE = 'passwordChangePage',
    AUTH_PAGE = 'authPage',
  }

  export const ROUTE_PATH = {
    [ROUTE_NAME.INDEX_PAGE]: '/',
    [ROUTE_NAME.PAGE_PERSONAL_AREA]: '/personal-area',
    [ROUTE_NAME.ANALYZES_PAGE]: '/analyzes',
    [ROUTE_NAME.STORAGE_PAGE]: '/storage',
    [ROUTE_NAME.STORAGE_SINGLE_DOCUMENT_PAGE]: '/storage/:id',
    [ROUTE_NAME.APPOINTMENT_PAGE]: '/appointment',
    [ROUTE_NAME.NOT_FOUND_PAGE]: '*',
    [ROUTE_NAME.PROFILE_PAGE]: '/profile',
    [ROUTE_NAME.MEDICAL_CARD_PAGE]: '/medical-card',
    [ROUTE_NAME.PASSWORD_CHANGE_PAGE]: '/password-change',
    [ROUTE_NAME.AUTH_PAGE]: '/auth'
  }

  export interface IAppRoute<T> extends Omit<Route, 'query'> {
    query: T;
  }
}
