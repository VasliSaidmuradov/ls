export namespace IDashBoard {
  export enum TabsName {
    BENCHMARKS = 'benchmarks',
    LATEST_RESULTS = 'latest-results',
  }

  export interface ILatestResult {
    id: number;
    name: string;
    rubric_id: number;
    rubric_name: string;
    date: Date | string;
    price: number;
    status: string;
    document: number;
    results: [];
    is_new?: boolean;
    document_ids: number[];
    // category: string;
    // biomarkers: IBioMarkers[];
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
