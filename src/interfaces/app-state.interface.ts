
import {IAuthStore} from '@/interfaces/auth.interface';
import {IPersonalAreaStore} from '@/interfaces/personal-area.interface';
import {IAnalyzesStore} from '@/interfaces/analyzes.interface';
import {IConfirmStoreState} from '@/interfaces/confirm.interface';


export interface IAppState {
  personalArea: IPersonalAreaStore.IState;
  auth: IAuthStore.IState;
  analyzes: IAnalyzesStore.IState;
  confirm: IConfirmStoreState;
}
