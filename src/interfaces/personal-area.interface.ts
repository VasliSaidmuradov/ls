export namespace IPersonalAreaStore {
  export interface IState {
    oms: string;
    dms: string;
    patient: IUserCard.IUser;
    medicalCard: IMedicalCard.IMedicalCard;
    selectOptions: IPersonalArea.ISelectOptions;
  }
}

export namespace IPersonalArea {
  export enum TabsName {
    USER_SETTINGS = 'user-settings',
    MEDICAL_CARD = 'medical-card',
  }

  export interface ISelectOptions {
    blood_groups: ISelectOptionsItem[];
    region_types: ISelectOptionsItem[];
    genders: ISelectOptionsItem[];
    countries: ISelectOptionsItem[];
    races: ISelectOptionsItem[];
    menstruation_starts: ISelectOptionsItem[];
    menstruation_durations: ISelectOptionsItem[];
    menstruation_cycles: ISelectOptionsItem[];
  }

  export interface ISelectOptionsItem {
    description: string;
    name: string;
    value: number;
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

export namespace IMedicalCard {
  export interface IMedicalCard {
    is_pregnant_now: boolean | null;
    last_menstruation_date: string | null;
    pregnancies_count: number;
    is_abortion: boolean;
    menstruation_start: IPersonalArea.ISelectOptionsItem;
    menstruation_duration: IPersonalArea.ISelectOptionsItem;
    menstruation_cycle: IPersonalArea.ISelectOptionsItem;
    hormonal_drugs: IReaction[];
    allergies: IReaction[];
    gender: number;
    blood_group: IPersonalArea.ISelectOptionsItem;
    race: string;
    country: string;
    region_type: string;
    height: number;
    weight: number;
    birth_date: string;
    created_at: string | null;
    deleted_at: string | null;
    updated_at: string | null;
    is_miscarriages: null | boolean;
    all_pregnancies_success: null | boolean;
    is_pregnancies: null | boolean;
    is_undeveloped_pregnancy: null | boolean;
  }

  export interface IReaction {
    title: string;
    id: string;
    reaction: string;
  }

  export interface IAddReactionsFiledData {
    title: string;
    inputPlaceholder: string;
    areaPlaceholder: string;
    property: string;
    addFilesBtnText: string;
    addReactionBtnText: string;
    endPoint: string;
  }
}

export namespace IPersonalAreaApi {

}
