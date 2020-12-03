import {IUserCard} from '@/interfaces/personal-area.interface';

export namespace IAuthStore {

  export interface IState {
    isLabstoryPatient: string;
    userAccountInfo: IAuthApi.ICheckUserResponse | null;
    token: string | null;
    currentAuthStep: IAuthForOtherUser.RegistrationSteps;
    cabinets: IAuth.IUserCabinet[];
    isRefreshing: boolean;
    refreshingCall: null | Function;
    patientToken: string;
  }
}

export namespace IAuthForOtherUser {

  export enum RegistrationSteps {
    CHECK_USER = 'checkUser',
    CHECK_PHONE = 'checkPhone',
    SET_PASSWORD = 'setPassword',
    LOGIN_BY_ID = 'loginById',
    HAS_LOGIN = 'hasLogin',
  }
}

export namespace IAuth {
  export enum AuthMode {
    REGISTRATION = 'register',
    LOGIN = 'login',
  }

  export interface IUserCabinet {
    birth_date: string;
    fio: string;
    patient_id: string;
    role: string;
    user_id?: string;
  }
}


export namespace IAuthApi {
  export enum CheckUserParamsType {
    EMAIL = 'email',
    PHONE = 'phone',
    ID = 'patient_id',
  }

  export interface ICheckUserResponse {
    has_duplicates: boolean;
    has_password: boolean;
    user_exist: boolean;
    has_login: boolean;
    only_patient_id: boolean;
  }

  export interface ISendCodeResponse {
    is_sent: boolean;
    ttl: number;
  }

  export interface IRegisterUserInputData {
    name: string;
    surname: string;
    phone: string;
    code: string;
  }

  export interface ILoginUserInputData {
    phone?: string;
    email?: string;
    password?: string;
    code?: string;
  }

  export interface ITokens {
    access: string;
    refresh: string;
  }

  export enum AuthType {
    LOGIN = 'login',
    REGISTER = 'register',
  }

  export interface IAuthResponse {
    patient: IUserCard.IUser;
    access: string;
    refresh: string;
    cabinets?: IAuth.IUserCabinet[];
    role: string;
  }

  export interface ILoginByIdInputData {
    patient_id: string | number;
    fio: string;
    research_date: string;
  }

  export interface ILoginByIdResponse {
    patient_token: string;
    email?: string;
    phone?: string;
  }

  export interface ILoginInputData {
    phone?: string;
    email?: string;
    code?: string;
    password?: string;
  }
}


export const cookeTokenKey = 'refreshToken';
