import {AppConfig} from '@/app.config';
import Axios, {AxiosResponse} from 'axios';
import {IMedicalCard, IPersonalArea, IUserCard} from '@/interfaces/personal-area.interface';

class PersonalAreaResources {
  getSelectOptions(): Promise<AxiosResponse<IPersonalArea.ISelectOptions>> {
    return (Axios.get(`${AppConfig.apiUrl}static-variables/`) as Promise<AxiosResponse<IPersonalArea.ISelectOptions>>)
  }

  getMedicalCardData(): Promise<AxiosResponse<IMedicalCard.IMedicalCard>> {
    return (Axios.get(`${AppConfig.apiUrl}medcard/`) as Promise<AxiosResponse<IMedicalCard.IMedicalCard>>)
  }

  updateMedicalCardData(data: any): Promise<AxiosResponse<IMedicalCard.IMedicalCard>> {
    return (Axios.patch(`${AppConfig.apiUrl}medcard/`, data) as Promise<AxiosResponse<IMedicalCard.IMedicalCard>>);
  }

  addReactionItem({endpoint, reactionData}: {endpoint: string; reactionData: IMedicalCard.IReaction}): Promise<AxiosResponse<IMedicalCard.IReaction[]>> {
    return (Axios.post(`${AppConfig.apiUrl}medcard/${endpoint}/`, reactionData) as Promise<AxiosResponse<IMedicalCard.IReaction[]>>);
  }

  deleteReactionItem({endpoint, id}: {endpoint: string; id: string}) {
    return (Axios.delete(`${AppConfig.apiUrl}medcard/${endpoint}/${id}`));
  }

  updateReactionsItem({endpoint, id, item}: {endpoint: string; id: string; item: IMedicalCard.IReaction}): Promise<AxiosResponse<IMedicalCard.IReaction>> {
    return (Axios.patch(`${AppConfig.apiUrl}medcard/${endpoint}/${id}/`, item) as Promise<AxiosResponse<IMedicalCard.IReaction>>);
  }

  changeAvatar(formData: FormData): Promise<AxiosResponse<IUserCard.IUser>> {
    return (Axios.patch(`${AppConfig.apiUrl}patients/`, formData) as Promise<AxiosResponse<IUserCard.IUser>>)
  }
}

export const personalAreaResources = new PersonalAreaResources();
