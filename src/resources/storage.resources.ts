import { AppConfig } from '@/app.config';
import Axios from 'axios';
import { IStorage } from '@/interfaces/storage.interface';
import IDocument = IStorage.IDocument;


class StorageResource {
  loadDocuments() {
    return (Axios.get(`${AppConfig.apiUrl}documents/`));
  }

  loadDocument(id: number) {
    return (Axios.get(`${AppConfig.apiUrl}documents/${id}`));
  }

  createDocument(data: { id: string; date: Date; type_doc: number }) {
    return (Axios.post(`${AppConfig.apiUrl}documents/`, data));
  }

  deleteDocument(id: string) {
    return (Axios.delete(`${AppConfig.apiUrl}documents/${id}`));
  }

  editDocument(data: IDocument) {
    return (Axios.patch(`${AppConfig.apiUrl}documents/${data.id}`, data));
  }
}

export const storageResource = new StorageResource();
