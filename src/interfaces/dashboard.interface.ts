export namespace IDashBoard {
  export enum TabsName {
    BENCHMARKS = 'benchmarks',
    LATEST_RESULTS = 'latest-results',
  }

  export interface ILatestResult {
    id: number;
    category: string;
    name: string;
    date: Date | string;
    is_new?: boolean;
    biomarkers: IBioMarkers[];
  }

  export interface IOrdersByDate {
    date: string;
    orders: ILatestResult[];
  }


  export interface IBioMarkers {
    name: string;
    status: string;
  }

  export enum BioMarkersStatus {
    PROCESS = 'Исследуется',
    DONE = 'Готово',
  }

  export interface IBenchmarks {
    id: number;
    name: string; // Название параметра
    value: number | string; // Результат анализа
    unit: string; // Ед. изм.
    ranges: IRanges; // Референсные зоны
    date: Date | string;
  }

  export interface IRanges {
    min: null | number;
    max: null | number;
  }
}
