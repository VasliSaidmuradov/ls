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
}
