export interface IConfirmStoreState {
  title: string;
  text: string;
  class: string;
  cancel: IBtnData,
  confirm: IBtnData;
  isVisible: false
}

export interface IBtnData {
  text: string,
  rootAction: string,
  payload: any,
  type: string;
  icon?: string | null;
  action: Function;
  borderColor?: string | null,
  bgColor?: string | null,
}

export interface ActionDataOpen {
  title?: string;
  text: string;
  cancel?: IBtnData;
  confirm?: IBtnData;
  class?: string;
}
