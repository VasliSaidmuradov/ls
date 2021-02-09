import { IAnalyzes } from '@/interfaces/analyzes.interface';
import { AppConfig } from '@/app.config';
import Axios, { AxiosResponse } from 'axios';
import { Documents } from '@/interfaces/documents.interface';
import { IOrdersApi } from '@/interfaces/orders.interface';
import { IDashBoard, IDashBoardApi } from '@/interfaces/dashboard.interface';
import { count } from 'd3';

const URL = AppConfig.apiUrl;

class DashboardResources {
  getDocuments(count: number = 4): Promise<AxiosResponse<IDashBoardApi.IDocuments>> {
    return Axios.get(`${URL}dashboard/documents/?count=${count}`) as Promise<AxiosResponse<IDashBoardApi.IDocuments>>;
  }

  getOrderedServices(count: number = 6): Promise<AxiosResponse<IDashBoardApi.IOrderedServices>> {
    return Axios.get(`${URL}dashboard/ordered-services/?count=${count}`) as Promise<
      AxiosResponse<IDashBoardApi.IOrderedServices>
    >;
  }

  getOverview(): Promise<AxiosResponse<IDashBoard.IOverview>> {
    return Axios.get(`${URL}dashboard/overview/`) as Promise<AxiosResponse<IDashBoard.IOverview>>;
  }

  getResults(count: number = 8): Promise<AxiosResponse<IDashBoardApi.IResults>> {
    return Axios.get(`${URL}dashboard/results/?count=${count}`) as Promise<AxiosResponse<IDashBoardApi.IResults>>;
  }
}

export const dashboardResources = new DashboardResources();
