export namespace IStorageStore {
  export interface IState {
    documentList: IStorage.IDocument[]
    document: IStorage.IDocument
  }
}

export namespace IStorage {
  export interface IDocument {
    name: string;
    type_doc: number;
    id: string;
    date: string
  }
}
