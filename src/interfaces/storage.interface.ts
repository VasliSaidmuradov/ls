export namespace IStorageStore {
  export interface IState {
    documentList: IStorage.IDocument[]
  }
}

export namespace IStorage {
  export interface IDocument {
    name: string;
    type: number;
    id: string;
  }
}
