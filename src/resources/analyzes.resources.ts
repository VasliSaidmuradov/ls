import Axios, { AxiosResponse, Method } from 'axios';
import { AppConfig } from '@/app.config';
import { IAnalyzes, IAnalyzesApi } from '@/interfaces/analyzes.interface';


class AnalyzesResources {
  endPoint = 'analyzes'

  getBiomarkers(): Promise<AxiosResponse<IAnalyzesApi.IBiomarkerResponse>> {
    return (Axios.get(`${AppConfig.apiUrl}${this.endPoint}/biomarkers`) as Promise<AxiosResponse<IAnalyzesApi.IBiomarkerResponse>>)
  }

  getLaboratories(): Promise<AxiosResponse<{laboratories: IAnalyzes.ILaboratories[]}>> {
    return (Axios.get(`${AppConfig.apiUrl}${this.endPoint}/laboratories`) as Promise<AxiosResponse<{laboratories: IAnalyzes.ILaboratories[]}>>)
  }

  saveBiomarker(data: IAnalyzes.IBiomarker, id: string | number, method: Method) {
    return Axios(`${AppConfig.apiUrl}${this.endPoint}/results/${method === 'PATCH' ? `${id}/` : ''}`, {method: method, data: {...data}})
  }

  deleteBiomarker(id: number) {
    return (Axios.delete(`${AppConfig.apiUrl}${this.endPoint}/results/${id}/`))
  }

  // @todo after backend be ready
  // getUnits(): any {
  //   return (Axios.get(`${AppConfig.apiUrl}${this.endPoint}/units`) as any)
  // }
}


export const analyzesResources = new AnalyzesResources();