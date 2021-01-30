export namespace IStorageStore {

  export interface IState {
    documentList: IStorage.IDocument[];
    document: IStorage.IDocument;
    documentTypes: IStorage.IDocumentType[];
  }
}

export namespace IStorage {
  export interface IDocument {
    name: string;
    type_doc: number;
    id: number;
    date: string;
    files: IFile[];
    created_at: Date;
  }

  export interface IDocumentType {
    value: number;
    description: string;
  }

  export interface IFile {
    id: number;
    file_link: string;
    status: number;
    created_at: Date;
  }

  export type keyofIStorageType = keyof IDocument
}
