import {IMedicalCardStore} from '@/interfaces/medical-card.interface';
import {IUserCardStore} from '@/interfaces/user-card.interface';
import {IAuthStore} from '@/interfaces/auth.interface';


export interface IAppState {
  medicalCard: IMedicalCardStore.IState;
  userCard: IUserCardStore.IState;
  auth: IAuthStore.IState;
}
