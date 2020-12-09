import { IDashBoard } from '@/interfaces/dashboard.interface';

export namespace IChart {

  export interface IChart {
    name: string
    results: IChartItem[]
  }

  export interface IChartItem {
    date: string
    value: number
    analyzer: IAnalyzer
    laboratory: ILaboratory
    visible?: boolean
  }

  export interface IAnalyzer {
    name: string
    ranges: IDashBoard.IRanges
  }

  export interface ILaboratory {
    name: string
    units: string
  }

  export interface IDatePeriod {
    from: string;
    to: string;
  }
}
