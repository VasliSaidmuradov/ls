import {AppConfig} from '@/app.config';
import Axios, {AxiosResponse} from 'axios';
import {IAuthApi} from '@/interfaces/auth.interface';


class StorageResource {
  loadDocuments() {
    return (Axios.get(`${AppConfig.apiUrl}documents/`))
  }
}

export const storageResource = new StorageResource();
