export namespace IStaticVariables {
  export interface IState {
    orderStatuses: IOrderStatuses;
    documentTypes: IDocumentTypes;
  }

  type Items = {
    value: number;
    description: string;
  };
  export interface IOrderStatuses {
    list: Items[];
  }
  export interface IDocumentTypes {
    list: Items[];
  }
}
