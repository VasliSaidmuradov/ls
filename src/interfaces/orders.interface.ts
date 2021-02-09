import { IDashBoard } from '@/interfaces/dashboard.interface';

export namespace IOrdersStore {
  export interface IState {
    orderedServices: IOrdersApi.IOrderedServices[];
    orderedService: IOrdersApi.IOrderedService;
  }
}

export namespace IOrdersApi {
  export interface IOrderedServices {
    date: string;
    orders: IDashBoard.ILatestResult;
  }
  export interface IOrderedService extends IDashBoard.ILatestResult {}
  export interface IChangeOrderedServise extends IDashBoard.ILatestResult {}
}
