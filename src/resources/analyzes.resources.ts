import Axios, { AxiosResponse, Method } from 'axios';
import { AppConfig } from '@/app.config';
import { IAnalyzes, IAnalyzesApi } from '@/interfaces/analyzes.interface';

const url = AppConfig.apiUrl;

class AnalyzesResources {
  endPoint = 'analyzes';

  getBiomarkers(): Promise<AxiosResponse<IAnalyzesApi.IBiomarkerResponse>> {
    return Axios.get(`${AppConfig.apiUrl}${this.endPoint}/biomarkers`) as Promise<
      AxiosResponse<IAnalyzesApi.IBiomarkerResponse>
    >;
  }

  getLaboratories(): Promise<AxiosResponse<{ laboratories: IAnalyzes.ILaboratories[] }>> {
    return Axios.get(`${AppConfig.apiUrl}${this.endPoint}/laboratories`) as Promise<
      AxiosResponse<{ laboratories: IAnalyzes.ILaboratories[] }>
    >;
  }

  saveBiomarker(data: IAnalyzes.IBiomarker, id: string | number, method: Method) {
    return Axios(`${AppConfig.apiUrl}${this.endPoint}/results/${method === 'PATCH' ? `${id}/` : ''}`, {
      method: method,
      data: { ...data },
    });
  }

  deleteBiomarker(id: number) {
    return Axios.delete(`${AppConfig.apiUrl}${this.endPoint}/results/${id}/`);
  }

  getAnalyzeBiomarkers({
    count = 100,
    offset = 0,
  }: {
    count?: number;
    offset?: number;
  }): Promise<AxiosResponse<IAnalyzesApi.IAnalyzeBiomarkerList>> {
    return Axios.get(`${url}analyzes/biomarkers/?count=${count}&offset=${offset}`);
  }

  getAnalyzeBiomarker(biomarker_id: string) {
    return Axios.get(`${url}analyzes/biomarkers/${biomarker_id}`);
  }

  getAnalyzeResults(): Promise<AxiosResponse<IAnalyzesApi.IAnalyzesResultsList>> {
    return Axios.get(`${url}analyzes/results/`) as Promise<AxiosResponse<IAnalyzesApi.IAnalyzesResultsList>>;
  }

  createAnalyzeResult(data: any) {
    return Axios.post(`${url}analyzes/results/`, { ...data });
  }

  getAnalyzeResult(id: number) {
    return Axios.get(`${url}analyzes/results/${id}`);
  }

  changeAnalyzeResult(id: number, data: object) {
    return Axios.patch(`${url}analyzes/results/${id}`, data);
  }

  deleteAnalyzesResult(id: number) {
    return Axios.delete(`${url}analyzes/results/${id}`);
  }

  getAnalyzeRubrics(): Promise<AxiosResponse<IAnalyzesApi.IAnalyzeRubrics>> {
    return Axios.get(`${url}analyzes/rubrics/`) as Promise<AxiosResponse<IAnalyzesApi.IAnalyzeRubrics>>;
  }

  getAnalyzeRubric(id: number): Promise<AxiosResponse<IAnalyzesApi.IAnalyzeRubrics>> {
    return Axios.get(`${url}analyzes/rubrics/${id}`) as Promise<AxiosResponse<IAnalyzesApi.IAnalyzeRubrics>>;
  }

  getAnalyzeCategories(): Promise<AxiosResponse<IAnalyzesApi.IAnalyzeCategories>> {
    return Axios.get(`${url}analyzes/categories/`) as Promise<AxiosResponse<IAnalyzesApi.IAnalyzeCategories>>;
  }
}

export const analyzesResource = new AnalyzesResources();
