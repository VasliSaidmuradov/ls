import {AppConfig} from '@/app.config';
import Axios, {AxiosResponse} from 'axios';
import {IAuthApi, IAuthForOtherUser} from '@/interfaces/auth.interface';
import {IUserCard} from '@/interfaces/user-card.interface';


class AuthResource {

  checkUser(value: string, type: IAuthApi.CheckUserParamsType): Promise<AxiosResponse<IAuthApi.ICheckUserResponse>> {
    return (Axios.get(`${AppConfig.apiUrl}auth/check/?${type}=${value}`) as Promise<AxiosResponse<IAuthApi.ICheckUserResponse>>)
  }

  sendCheckCode(value: string, type: IAuthApi.CheckUserParamsType): Promise<AxiosResponse<IAuthApi.ISendCodeResponse>> {
    return (Axios.post(`${AppConfig.apiUrl}auth/send-code/`, {
      [type]: value,
    }) as Promise<AxiosResponse<IAuthApi.ISendCodeResponse>>)
  }

  confirmCode(data: IAuthApi.ILoginUserInputData): Promise<AxiosResponse<IAuthApi.IAuthResponse>> {
    return (Axios.post(`${AppConfig.apiUrl}auth/confirm/`, {
      ...data
    }) as Promise<AxiosResponse<IAuthApi.IAuthResponse>>)
  }

  authUser({data, authType}: {data: IAuthApi.IRegisterUserInputData | IAuthApi.ILoginUserInputData; authType: IAuthApi.AuthType}): Promise<AxiosResponse<IAuthApi.IAuthResponse>> {
    return (Axios.post(`${AppConfig.apiUrl}auth/${authType}/`, {
      ...data
    }) as Promise<AxiosResponse<IAuthApi.IAuthResponse>>)
  }

  loginById(data: IAuthApi.ILoginByIdInputData): Promise<AxiosResponse<IAuthApi.ILoginByIdResponse>> {
    return (Axios.post(`${AppConfig.apiUrl}auth/login-with-id/`, {
      ...data
    }) as Promise<AxiosResponse<IAuthApi.ILoginByIdResponse>>)
  }

  changePatientsData({changedData, id}: {changedData: any; id: string}): Promise<AxiosResponse<IUserCard.IUser>> {
    return (Axios.patch(`${AppConfig.apiUrl}patients/${id}/`, {
      ...changedData
    }) as Promise<AxiosResponse<IUserCard.IUser>>)
  }

  changeCabinet(id: string): Promise<AxiosResponse<IAuthApi.IAuthResponse>> {
    return (Axios.post(`${AppConfig.apiUrl}auth/change-cabinet/`, {
      patient_id: id,
    }) as Promise<AxiosResponse<IAuthApi.IAuthResponse>>)
  }
}

export const authResource = new AuthResource();
