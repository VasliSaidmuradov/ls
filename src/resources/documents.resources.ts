import { AppConfig } from '@/app.config';
import Axios, { AxiosResponse } from 'axios';
import { Documents } from '@/interfaces/documents.interface';

const URL = AppConfig.apiUrl;

class DocumentsResource {
  documentsList(ids: number[] | ''): Promise<AxiosResponse<Documents.IDocuments>> {
    const IDs = ids.length ? [...ids] : '';
    const query = IDs ? `?ids=${IDs}` : '';
    return Axios.get(`${URL}documents/${query}`) as Promise<AxiosResponse<Documents.IDocuments>>;
  }
  createDocument(responseData: {}): Promise<AxiosResponse<Documents.IDocument>> {
    return Axios.post(`${URL}documents/`, responseData) as Promise<AxiosResponse<Documents.IDocument>>;
  }
}

export const documentsResources = new DocumentsResource();
