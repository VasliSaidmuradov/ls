import { IAuthStore } from '@/interfaces/auth.interface';
import { IPersonalAreaStore } from '@/interfaces/personal-area.interface';
import { IAnalyzesStore } from '@/interfaces/analyzes.interface';
import { IConfirmStoreState } from '@/interfaces/confirm.interface';
import { IStorageStore } from '@/interfaces/storage.interface';
import { IOrdersStore } from '@/interfaces/orders.interface';
import { IDocumentsStore } from '@/interfaces/documents.interface';
import { IStaticVariables } from '@/interfaces/static-variables.interface';

export interface IAppState {
  personalArea: IPersonalAreaStore.IState;
  auth: IAuthStore.IState;
  analyzes: IAnalyzesStore.IState;
  confirm: IConfirmStoreState;
  storage: IStorageStore.IState
  orders: IOrdersStore.IState;
  staticVariables: IStaticVariables.IState;
  documents: IDocumentsStore.IState;
}
