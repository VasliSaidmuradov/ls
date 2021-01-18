import Vue from 'vue'
import { IStorage, IStorageStore } from '@/interfaces/storage.interface';
import { ActionContext } from 'vuex';
import { IAppState } from '@/interfaces/app-state.interface';
import { storageResource } from '@/resources/storage.resources';
import IDocument = IStorage.IDocument;

type StorageStore = ActionContext<IStorageStore.IState, IAppState>;

export default {
  namespaced: true,

  state: {
    documentList: [],
    document: {},
  },

  mutations: {
    changeDocumentList(state: IStorageStore.IState, data: IStorage.IDocument[]) {
      state.documentList = data;
    },
    addItemDocumentList(state: IStorageStore.IState, data: IStorage.IDocument) {
      state.documentList.push(data);
    },
    deleteItemDocumentList(state: IStorageStore.IState, index: number) {
      state.documentList.splice(index, 1);
    },
    changeDocumentDocumentList(state: IStorageStore.IState, data: IDocument) {
      Vue.set(state, "documentList", data)
    },
    changeDocument(state: IStorageStore.IState, data: IStorage.IDocument) {
      state.document = data;
    },
  },

  actions: {
    async loadDocuments({ commit, dispatch }: StorageStore) {
      try {
        const data = await storageResource.loadDocuments();

        commit('changeDocumentList', data.data);

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

        commit('changeDocument', data.data);

        return true;

      } catch (error) {
        if (error.errorData.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
    async createDocument({ commit, dispatch }: StorageStore, payload: { id: string; date: Date; type_doc: number }) {
      try {
        const data = await storageResource.createDocument(payload);

        commit('addItemDocumentList', data.data);

        return true;

      } catch (error) {
        if (error.errorData.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
    async deleteDocument({ commit, dispatch, state }: StorageStore, id: string) {
      try {
        await storageResource.deleteDocument(id);

        const deletedDocumentIndex = state.documentList.findIndex(document => document.id === id);

        commit('deleteItemDocumentList', deletedDocumentIndex);

        return true;

      } catch (error) {
        if (error.errorData.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
    async editDocument({ commit, dispatch, state }: StorageStore, payload: IDocument) {
      try {
        await storageResource.editDocument(payload);

        const items = state.documentList
        const editDocumentIndex = state.documentList.findIndex(document => document.id === payload.id);
        items[editDocumentIndex] = payload

        commit('changeDocumentDocumentList', items);

        return true;

      } catch (error) {
        if (error.errorData.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
  },
};
