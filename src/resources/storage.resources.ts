import { AppConfig } from '@/app.config';
import Axios, { AxiosResponse } from 'axios';
import { IStorage } from '@/interfaces/storage.interface';
import IDocument = IStorage.IDocument;


class StorageResource {
  loadDocuments(): Promise<AxiosResponse<IDocument[]>> {
    return (Axios.get(`${AppConfig.apiUrl}documents/`));
  }

  loadDocument(id: number): Promise<AxiosResponse<IDocument>> {
    return (Axios.get(`${AppConfig.apiUrl}documents/${id}`));
  }

  createDocument(data: { name: string; date: Date; type_doc: number; allow_processing: boolean }): Promise<AxiosResponse<IDocument>> {
    return (Axios.post(`${AppConfig.apiUrl}documents/`, data));
  }

  deleteDocument(id: string) {
    return (Axios.delete(`${AppConfig.apiUrl}documents/${id}`));
  }

  editDocument(data: IDocument): Promise<AxiosResponse<IDocument>> {
    return (Axios.patch(`${AppConfig.apiUrl}documents/${data.id}`, data));
  }

  createFiles(data: { id: number; fileList: string | Blob }) {
    const formData = new FormData()
    // data.fileList.forEach((file, index) => {
    //   formData.append(`file${index}`, file)
    // })
    formData.append('file', data.fileList)

    return (Axios.post(`${AppConfig.apiUrl}documents/${data.id}/files/`, formData));
  }
}

export const storageResource = new StorageResource();
