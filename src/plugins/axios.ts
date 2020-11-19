import axios, {AxiosResponse} from 'axios';
import auth from '../store/modules/auth.store'
export class AppError extends Error {
  errorData: any;

  constructor(m: string, errorData: any) {
    super(m);
    Object.setPrototypeOf(this, AppError.prototype);
    this.errorData = errorData;
  }
}

axios.interceptors.request.use(function (config) {
  const token = auth.state.patientToken ? auth.state.patientToken : auth.state.token;
  config.headers.Authorization = 'Bearer ' + token;

  return config;
});

axios.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, (error) => {
  const appError = new AppError(error.response.data.detail, error.response.data);
  return Promise.reject(appError)
});
