export namespace IAuthStore {
  export interface IState {
    isLabstoryPatient: string;
  }
}

export namespace IAuthForOtherUser {
  export enum TabsName {
    REGISTRATION = 'registration',
    AUTHORIZATION = 'authorization',
  }
}
