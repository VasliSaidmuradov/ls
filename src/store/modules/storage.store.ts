import { IStorage, IStorageStore } from '@/interfaces/storage.interface';
import { ActionContext } from 'vuex';
import { IAppState } from '@/interfaces/app-state.interface';
import { storageResource } from '@/resources/storage.resources';

type StorageStore = ActionContext<IStorageStore.IState, IAppState>;

export default {
  namespaced: true,

  state: {
    documentList: [],
    document: {}
  },

  mutations: {
    changeDocumentList(state: IStorageStore.IState, data: IStorage.IDocument[]) {
      state.documentList = data
    },
    addItemDocumentList(state: IStorageStore.IState, data: IStorage.IDocument) {
      state.documentList.push(data)
    },
    deleteItemDocumentList(state: IStorageStore.IState, index: number) {
      state.documentList.splice(index, 1)
    },
    changeDocument(state: IStorageStore.IState, data: IStorage.IDocument) {
      state.document = data
    },
  },

  actions: {
    async loadDocuments({ commit, dispatch }: StorageStore) {
      try {
        const data = await storageResource.loadDocuments();
        console.log(data);
        commit('changeDocumentList', data.data)

        return true;

      } catch (error) {
        if (error.errorData.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
    async loadDocument({ commit, dispatch }: StorageStore, id: number) {
      try {
        const data = await storageResource.loadDocument(id);
        console.log(data);
        commit('changeDocument', data.data)

        return true;

      } catch (error) {
        if (error.errorData.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
    async createDocument({ commit, dispatch }: StorageStore, payload: any) {
      try {
        const data = await storageResource.createDocument(payload);
        console.log(data);

        commit('addItemDocumentList', data.data)

        return true;

      } catch (error) {
        if (error.errorData.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
    async deleteDocument({ commit, dispatch, state }: StorageStore, id: string) {
      try {
        const data = await storageResource.deleteDocument(id);
        console.log(data);

        const deletedDocumentIndex = state.documentList.findIndex(document => document.id === id)
        commit('deleteItemDocumentList', deletedDocumentIndex)

        return true;

      } catch (error) {
        if (error.errorData.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
  },
};
