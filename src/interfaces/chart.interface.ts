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

  export interface ILangConfig {
    decimal: string;
    thousands: string;
    grouping: [number];
    currency: [string, string];
    dateTime: string;
    date: string;
    time: string;
    periods: [string, string];
    days: [string, string, string, string, string, string, string];
    shortDays: [string, string, string, string, string, string, string];
    months: [string, string, string, string, string, string, string, string, string, string, string, string];
    shortMonths: [string, string, string, string, string, string, string, string, string, string, string, string];
  }
}
