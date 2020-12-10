import {IDashBoard} from '@/interfaces/dashboard.interface';
import IRanges = IDashBoard.IRanges;

export namespace IAnalyzesStore {
  export interface IState {
    analyzesForAddList: IAnalyzes.IAnalyzesForAddItem[];
    addedAnalyzes: any[];
  }
}

export namespace IAnalyzes {


  export enum BusEvents {
    OPEN_ADD_ANALYZES_MODAL = 'addAnalyzesModal:open',
    OPEN_ADD_ANALYZES_COMMENT = 'addAnalyzesComment:open',
    EDIT_ANALYZES = 'analyzes:edit',
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

  export enum AnalyzesCardMode {
    EDIT = 'edit',
    DEFAULT = 'default',
  }
}



