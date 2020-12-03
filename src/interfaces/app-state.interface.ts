
import {IAuthStore} from '@/interfaces/auth.interface';
import {IPersonalAreaStore} from '@/interfaces/personal-area.interface';


export interface IAppState {
  personalArea: IPersonalAreaStore.IState;
  auth: IAuthStore.IState;
}
