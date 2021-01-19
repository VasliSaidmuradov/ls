import axios, {AxiosResponse} from 'axios';
import auth from '../store/modules/auth.store'
import {IError} from '@/interfaces/error.interface';
import ErrorCodes = IError.ErrorCodes;
import store from '../store/index'

export class AppError extends Error {
  errorData: any;
  repeatDispatch: boolean;

  constructor(m: string, errorData: any) {
    super(m);
    Object.setPrototypeOf(this, AppError.prototype);
    this.errorData = errorData;
  }
}

axios.interceptors.request.use(function (config) {
  const token = store.state.auth.token ? store.state.auth.token : store.state.auth.patientToken;
  config.headers.Authorization = 'Bearer ' + token;

  return config;
});

axios.interceptors.response.use( (response: AxiosResponse) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;

  const appError = new AppError(error.response.data.detail, error.response.data);
  if ((appError.errorData.error_code === ErrorCodes.TOKEN_NOT_VALID || appError.errorData.error_code === ErrorCodes.AUTHENTICATION_FAILED) && !originalRequest._retry) {

    originalRequest._retry = true;

    await store.dispatch('auth/updateAccessToken')
    error.config.headers['Authorization'] = 'Bearer ' + auth.state.token;
    try {
      const response = await axios.request(error.config);
      return response;

    } catch (error) {
      return Promise.reject(appError);
    }
  }

  return Promise.reject(appError)
});
