export namespace IMedicalCardStore {
  export interface IState {
    isPregnantNow: boolean;
    lastMenstruation: string;
    wasPregnant: IMedicalCard.WasPregnant;
    pregnantCount: number;
    childbirthIsSuccess: boolean;
    abortiont: boolean;
    miscarriages: boolean;
    nonDeveloping: boolean;
    firstMenstruation: IMedicalCard.FirstMenstruation;
    durationMenstruation: IMedicalCard.DurationMenstruation;
    cycleDuration: IMedicalCard.CycleDuration;
    hormonalDrugs: IMedicalCard.IReaction[];
    allergicReactions: IMedicalCard.IReaction[];
    biologicalSex: IMedicalCard.BiologicalSex;
    bloodType: IMedicalCard.BloodType;
    race: IMedicalCard.Race;
    nationality: string;
    regionOfResidence: IMedicalCard.RegionOfResidence;
    height: number;
    weight: number;
    birthday: string;
  }
}


export namespace IMedicalCard {

  export interface IReaction {
    name: string;
    id: string;
    reaction: IReactionItem[];
  }

  export interface IReactionItem {
    value: string;
  }

  export enum WasPregnant {
    NO = 0,
    YES = 1,
  }

  export enum BiologicalSex {
    MAN = 'man',
    WOMAN = 'woman',
  }

  export enum BloodType {
    FIRST_POSITIVE = 'I положительная',
    FIRST_NEGATIVE = 'I отрицательная',
  }

  export enum Race {
    NEGROID = 'Негроидная',
    CAUCASIAN = 'Европеоидная',
  }

  export enum RegionOfResidence {
    URBAN = 'urban',
    RURAL = 'rural',
  }

  export enum Nationality {
    BELARUS = 'Беларусь',
    UKRAINE = 'Украина'
  }

  export enum FirstMenstruation {
    TEN = '10 лет',
    ELEVEN = '11 лет'
  }

  export enum DurationMenstruation {
    TEN = '10',
    ELEVEN = '11'
  }

  export enum CycleDuration {
    TEN = '10',
    ELEVEN = '11'
  }

  export interface IBaseFormOptions<T> {
    label?: string;
    value: T;
    disabled?: boolean;
  }

  export interface IAddReactionsFiledData {
    title: string;
    inputPlaceholder: string;
    areaPlaceholder: string;
    property: string;
    addFilesBtnText: string;
    addReactionBtnText: string;
  }

  export interface IRulesValue {
    0: string;
    input?: string;
    groups?: string[];
  }
}
