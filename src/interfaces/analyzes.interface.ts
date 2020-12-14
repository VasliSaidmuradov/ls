import {IDashBoard} from '@/interfaces/dashboard.interface';
import IRanges = IDashBoard.IRanges;

export namespace IAnalyzesStore {
  export interface IState {
    analyzesForAddList: IAnalyzes.IAnalyzesForAddItem[];
    addedAnalyzes: any[];
    compareMode: boolean;
    checkBoxValues: IAnalyzes.ICheckArr;
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


  export enum TabsName {
    ALL_ANALYZES = 'allAnalyzes',
    BY_CATEGORY = 'byCategory',
  }
}



