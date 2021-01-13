import { IStorageStore } from '@/interfaces/storage.interface';
import { ActionContext } from 'vuex';
import { IAppState } from '@/interfaces/app-state.interface';
import { storageResource } from '@/resources/storage.resources';

type AuthStore = ActionContext<IStorageStore.IState, IAppState>;

export default {
  namespaced: true,

  state: {
    documentList: [],
  },

  mutations: {
    changeDocumentList(state: IStorageStore.IState) {

    },
  },

  actions: {
    async loadDocuments({ commit, dispatch }: AuthStore) {
      try {
        const data = await storageResource.loadDocuments();
        console.log(data);

        return true;

      } catch (error) {
        if (error.errorData.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
  },
};
