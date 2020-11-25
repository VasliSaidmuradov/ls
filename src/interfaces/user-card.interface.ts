export namespace IUserCardStore {
  export interface IState {
    name: string;
    surname: string;
    patronym: string;
    mail: string;
    oms: string;
    dms: string;
    phone: string | number;
    password: string;
    avatar: null | string;
    id: string;
    patient: IUserCard.IUser;
  }
}


export namespace IUserCard {
  export enum PasswordStrength {
    RISKY = 'risky',
    QUESSABLE = 'guessable',
    WEEK = 'week',
    SAFE = 'safe',
    SECURE = 'secure'
  }

  export interface IUser {
    avatar: null | string;
    email: string;
    name: string;
    password: string;
    patronymic: string;
    phone: string;
    surname: string;
    created_at: string;
    deleted_at: null | string;
    id: string;
    is_deleted: boolean;
    updated_at: string;
    user_id: string;
  }
}
