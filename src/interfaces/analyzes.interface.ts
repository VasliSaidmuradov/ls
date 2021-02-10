import { IDashBoard } from '@/interfaces/dashboard.interface';
import IRanges = IDashBoard.IRanges;

export namespace IAnalyzesStore {
  export interface IState {
    addedAnalyzes: IAnalyzes.IBiomarker[];
    addedAnalyzeItems: any[];
    compareMode: boolean;
    laboratoriesList: IAnalyzes.ILaboratories[];
    biomarkersList: IAnalyzes.IBiomarker[];
    commentAnalyzesId: null | string | number;
    comparingItems: number[];
    checkBoxValues: IAnalyzes.ICheckboxValue;
    checkedArr: number;
    analyzeBiomarkerList: IAnalyzesApi.IAnalyzeBiomarkerList | null;
    analyzeResultsList: IAnalyzes.IAnalyzeResult[];
    analyzeRubricsList: IAnalyzes.IAnalyzeRubric[];
    analyzeRubric: IAnalyzes.IAnalyzeRubric;
    selectedRubrics: IAnalyzes.IAnalyzeRubric[];
    selectedRubricIds: number[];
  }
}

export namespace IAnalyzes {
  export enum BusEvents {
    OPEN_ADD_ANALYZES_MODAL = 'addAnalyzesModal:open',
    OPEN_ADD_ANALYZES_COMMENT = 'addAnalyzesComment:open',
    EDIT_ANALYZES = 'analyzes:edit',
    SET_CATEGORY = 'category:set',
    SHOW_FILTER = 'filter:show',
  }

  export interface IAnalyzesForAddItem {
    name?: string;
    ranges?: IRanges;
    units?: string;
  }

  export interface IBiomarker {
    biomarker: string;
    name: string;
    available_units: string[];
    categories: [];
    id: number;
    ranges: IRanges;
    rubrics: number[];
    unit: string;
    unit_id: number;
    value?: string;
    laboratory?: string;
    date?: string | Date;
    isEdit?: boolean;
    comment?: null | string;
    biomarker_id: number;
  }

  export interface IAnalyzeResult {
    biomarker: string;
    biomarker_id: number;
    categories: number[];
    comment: string | null;
    date: Date | string;
    id: number;
    is_predicted: boolean;
    laboratory: string;
    laboratory_id: number | null;
    predicted_biomarker: string | null;
    prev_result: number;
    ranges: IRanges;
    rubrics: number[];
    status: number;
    unit: string | null;
    unit_id: number | null;
    value: number;
  }

  export interface IAnalyzeRubric {
    id: number;
    name: string;
    parent_rubric_name: string;
    subrubrics: IAnalyzeRubric[];
  }

  export interface IAddedAnalyzes extends IAnalyzesForAddItem {
    id?: string;
    date?: Date | string;
    result?: null | number;
    lab?: string;
    range?: string;
  }

  export interface ILaboratories {
    id: number;
    name: string;
  }

  export enum TabsName {
    ALL_ANALYZES = 'allAnalyzes',
    BY_CATEGORY = 'byCategory',
  }

  export interface ICheckboxValue {
    [key: string]: boolean;
  }
}

export namespace IAnalyzesApi {
  export interface IBiomarkerResponse {
    biomarkers: IAnalyzes.IBiomarker;
    count: number;
  }
  export interface IAnalyzeBiomarkerList {
    count: number;
    biomarkers: any[];
  }

  export interface IAnalyzesResultsList {
    results: any[];
  }

  export interface IAnalyzeRubrics {
    rubrics: any[];
  }

  export interface IAnalyzeCategories {
    categories: any[];
  }
}
