import { AppConfig } from '@/app.config';
import Axios, { AxiosResponse } from 'axios';
import { IStaticVariables } from '@/interfaces/static-variables.interface';

const URL = AppConfig.apiUrl;

class StaticVariables {
  orderStatuses(): Promise<AxiosResponse<IStaticVariables.IOrderStatuses>> {
    return Axios.get(`${URL}static-variables/order-statuses/`) as Promise<
      AxiosResponse<IStaticVariables.IOrderStatuses>
    >;
  }
  documentTypes(): Promise<AxiosResponse<IStaticVariables.IDocumentTypes>> {
    return Axios.get(`${URL}static-variables/document-types/`) as Promise<
      AxiosResponse<IStaticVariables.IDocumentTypes>
    >;
  }
}

export const staticVariables = new StaticVariables();
