import {IRouter} from '@/interfaces/router.interface';
import ROUTE_PATH = IRouter.ROUTE_PATH;
import ROUTE_NAME = IRouter.ROUTE_NAME;

export namespace ILayout {
  export enum LayoutPattern  {
    DESKTOP = 'LHH LPr LFF',
    MOBILE = 'HHH lPR FFF',
  }

  export enum Breakpoint {
    MOBILE = 767,
    MOBILE_SMALL = 575
  }

  export enum LayoutType {
    AUTH = 'authLayout',
    DEFAULT = 'defaultLayout',
  }
}


export namespace IMenu {
  export const MAIN_MENU: IMainMenuItem[] = [
    {
      name: ROUTE_NAME.INDEX_PAGE,
      link: ROUTE_PATH[ROUTE_NAME.INDEX_PAGE],
      icon: 'home-icon',
      text: 'Главная',
      exact: true
    }, {
      name: ROUTE_NAME.ANALYZES_PAGE,
      link: ROUTE_PATH[ROUTE_NAME.ANALYZES_PAGE],
      icon: 'analyzes-icon',
      text: 'Анализы',
      exact: false
    }, {
      name: ROUTE_NAME.APPOINTMENT_PAGE,
      link: ROUTE_PATH[ROUTE_NAME.APPOINTMENT_PAGE],
      icon: 'manual-icon',
      text: 'Приемы',
      exact: false
    }, {
      name: ROUTE_NAME.STORAGE_PAGE,
      link: ROUTE_PATH[ROUTE_NAME.STORAGE_PAGE],
      icon: 'storage-icon',
      text: 'Хранилище',
      exact: false
    }, {
      name: ROUTE_NAME.PAGE_PERSONAL_AREA,
      link: ROUTE_PATH[ROUTE_NAME.PAGE_PERSONAL_AREA],
      icon: 'profile-icon',
      text: 'Профиль',
      exact: false
    }
  ];

  export const PERSONAL_AREA_MENU: IMainMenuItem[] = [
    {
      name: ROUTE_NAME.PROFILE_PAGE,
      icon: 'profile-icon',
      text: 'Данные профиля',
      link: ROUTE_PATH[ROUTE_NAME.PROFILE_PAGE],
      exact: false
    }, {
      name: ROUTE_NAME.MEDICAL_CARD_PAGE,
      icon: 'paper-icon',
      text: 'Медицинская карта',
      link: ROUTE_PATH[ROUTE_NAME.MEDICAL_CARD_PAGE],
      exact: false
    }, {
      name: ROUTE_NAME.PASSWORD_CHANGE_PAGE,
      icon: 'key-icon',
      text: 'Сменить пароль',
      link: ROUTE_PATH[ROUTE_NAME.PASSWORD_CHANGE_PAGE],
      exact: false
    }
  ]

  export interface IMainMenuItem {
    icon: string;
    text: string;
    link: string;
    name: string;
    exact: boolean;
  }
}
