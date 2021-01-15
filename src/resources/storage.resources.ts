import {AppConfig} from '@/app.config';
import Axios from 'axios';


class StorageResource {
  loadDocuments() {
    return (Axios.get(`${AppConfig.apiUrl}documents/`))
  }

  loadDocument(id: number) {
    return (Axios.get(`${AppConfig.apiUrl}documents/${id}`))
  }

  createDocument(data: any) {
    return (Axios.post(`${AppConfig.apiUrl}documents/`, data))
  }

  deleteDocument(id: string) {
    return (Axios.delete(`${AppConfig.apiUrl}documents/${id}`))
  }
}

export const storageResource = new StorageResource();
