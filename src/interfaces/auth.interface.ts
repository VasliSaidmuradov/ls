import {IUserCard} from '@/interfaces/user-card.interface';

export namespace IAuthStore {

  export interface IState {
    isLabstoryPatient: string;
    userAccountInfo: IAuthApi.ICheckUserResponse | null;
    token: string | null;
    currentAuthStep: IAuthForOtherUser.RegistrationSteps;
  }
}

export namespace IAuthForOtherUser {

  export enum RegistrationSteps {
    CHECK_USER = 'checkUser',
    CHECK_PHONE = 'checkPhone',
    SET_PASSWORD = 'setPassword',
    LOGIN_BY_ID = 'loginById',
    HAS_DUPLICATE = 'hasDuplicate',
  }
}

export namespace IAuth {
  export enum AuthMode {
    REGISTRATION = 'register',
    LOGIN = 'login',
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
  }

  export interface ILoginByIdInputData {
    patient_id: string | number;
    fio: string;
    research_date: string;
  }

  export interface ILoginByIdResponse {
    patient_token: string;
  }
}


export const cookeTokenKey = 'refreshToken'
