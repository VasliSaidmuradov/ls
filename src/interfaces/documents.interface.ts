export namespace IDocumentsStore {
  export interface IState {
    documentsList: Documents.IDocuments;
    allDocumentsList: Documents.IDocuments;
    document: Documents.IDocument;
    addDocumentToOrder: boolean;
  }
}
export namespace Documents {
  export type IDocuments = IDocument[];

  export interface IDocument {
    id: number;
    created_at: string | Date;
    name: string;
    date: string | Date;
    type_doc: number;
    allow_processing: boolean;
    files: IFile[];
    results: IResult[];
  }

  export interface IFile {
    id: number;
    file_link: string;
    status: number;
    created_at: string | Date;
  }

  export interface IResult {
    id: number;
    is_predicted: boolean;
    date: string | Date;
    value: number;
    ranges: IRanges[];
    unit_id: number | null;
    unit: string | null;
    laboratory_id: number | null;
    laboratory: string;
    comment: string | null;
    status: number;
    prev_result: number;
    biomarker: string;
    biomarker_id: number;
    predicted_biomarker: string | null;
    rubrics: number[];
    categories: number[];
  }

  export interface IRanges {
    is_predicted: boolean;
    min: number | null;
    max: number | null;
  }
}
