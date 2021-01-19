import {IDashBoard} from '@/interfaces/dashboard.interface';
import IRanges = IDashBoard.IRanges;

export namespace IAnalyzesStore {
  export interface IState {
    addedAnalyzes: IAnalyzes.IBiomarker[];
    compareMode: boolean;
    checkBoxValues: IAnalyzes.ICheckArr;
    laboratoriesList: IAnalyzes.ILaboratories[];
    biomarkersList: IAnalyzes.IBiomarker[];
    commentAnalyzesId: null | string | number;
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
    name: string;
    available_units: string[];
    categories: [];
    id: number;
    ranges: IRanges;
    rubrics: number[];
    unit: string;
    value?: string;
    laboratory?: string;
    date?: string | Date;
    isEdit?: boolean;
    comment?: null | string;
    biomarker_id: number;
  }

  export interface IAddedAnalyzes extends IAnalyzesForAddItem {
    id?: string;
    date?: Date | string;
    result?: null | number;
    lab?: string;
    range?: string;
  }

  export interface ICheckArr {
    check1: boolean;
    check2: boolean;
    check3: boolean;
    check4: boolean;
    check5: boolean;
    check6: boolean;
    check7: boolean;
    check8: boolean;
  }

  export interface ILaboratories {
    id: number;
    name: string;
  }

  export enum TabsName {
    ALL_ANALYZES = 'allAnalyzes',
    BY_CATEGORY = 'byCategory',
  }
}

export namespace IAnalyzesApi {
  export interface IBiomarkerResponse {
    biomarkers: IAnalyzes.IBiomarker;
    count: number;
  }
}



