import { AppConfig } from '@/app.config';
import Axios, { AxiosResponse } from 'axios';
import { IOrdersApi } from '@/interfaces/orders.interface';

const URL = AppConfig.apiUrl;
class OrdersResource {
  orderedServices(): Promise<AxiosResponse<IOrdersApi.IOrderedServices>> {
    return Axios.get(`${URL}ordered-services/`) as Promise<AxiosResponse<IOrdersApi.IOrderedServices>>;
  }
  orderedService(id: number): Promise<AxiosResponse<IOrdersApi.IOrderedService>> {
    return Axios.get(`${URL}ordered-services/${id}`) as Promise<AxiosResponse<IOrdersApi.IOrderedService>>;
  }
  changeOrderedService({
    id,
    documentIds,
  }: {
    id: number;
    documentIds: number[];
  }): Promise<AxiosResponse<IOrdersApi.IChangeOrderedServise>> {
    return Axios.patch(`${URL}ordered-services/${id}/`, { document_ids: documentIds }) as Promise<
      AxiosResponse<IOrdersApi.IChangeOrderedServise>
    >;
  }
}

export const ordersResources = new OrdersResource();
