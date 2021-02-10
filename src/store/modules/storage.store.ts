import { IStorage, IStorageStore } from '@/interfaces/storage.interface';
import { ActionContext } from 'vuex';
import { IAppState } from '@/interfaces/app-state.interface';
import { storageResource } from '@/resources/storage.resources';
import IDocument = IStorage.IDocument;
import keyofIStorageType = IStorage.keyofIStorageType;

type StorageStore = ActionContext<IStorageStore.IState, IAppState>;

export default {
  namespaced: true,

  state: {
    documentList: [],
    document: {},
    documentTypes: [],
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
    changeDocumentDocumentList(state: IStorageStore.IState, { data, index }: { data: IDocument; index: number }) {
      (Object.keys(data) as Array<keyofIStorageType>).forEach(key => {
        state.documentList[index][key] = data[key] as never;
      });
    },
    changeDocument(state: IStorageStore.IState, data: IStorage.IDocument) {
      state.document = data;
    },
    changeDocumentTypes(state: IStorageStore.IState, data: IStorage.IDocumentType[]) {
      state.documentTypes = data;
    },
    deleteFileDocumentList(state: IStorageStore.IState, data: { documentIndex: number; fileIndex: number }) {
      const { documentIndex, fileIndex } = data;
      state.documentList[documentIndex].files.splice(fileIndex, 1);
    },
  },

  actions: {
    async loadDocuments({ commit, dispatch }: StorageStore) {
      try {
        const response = await storageResource.loadDocuments();
        const data = response.data;

        commit('changeDocumentList', data);

        return true;
      } catch (error) {
        if (error.errorData?.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
    async loadDocument({ commit, dispatch }: StorageStore, id: number) {
      try {
        const response = await storageResource.loadDocument(id);
        const data = response.data;

        commit('changeDocument', data);

        return true;
      } catch (error) {
        if (error.errorData?.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
    async createDocument(
      { commit, dispatch, rootState }: StorageStore,
      payload: { name: string; date: Date; type_doc: number; allow_processing: boolean; fileList?: File[] }
    ) {
      try {
        const fileList = payload.fileList;
        delete payload.fileList;

        const response = await storageResource.createDocument(payload);
        const data = response.data;
        await dispatch('createFiles', { id: data.id, fileList });
        const documentResponse = await storageResource.loadDocument(data.id);
        const documentData = documentResponse.data;

        commit('addItemDocumentList', documentData);

        const addToOrder = rootState.documents.addDocumentToOrder;

        if (addToOrder) {
          const { id, document_ids } = rootState.orders.orderedService;
          const docIds = [...new Set([...document_ids, data.id])];
          dispatch('orders/changeOrderedService', { id, documentIds: docIds }, { root: true });
        }

        return true;

      } catch (error) {
        if (error.errorData?.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
    async deleteDocument({ commit, dispatch, state }: StorageStore, id: number) {
      try {
        await storageResource.deleteDocument(id);

        const deletedDocumentIndex = state.documentList.findIndex(document => document.id === id);

        commit('deleteItemDocumentList', deletedDocumentIndex);

        return true;
      } catch (error) {
        if (error.errorData?.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
    async editDocument({ commit, dispatch, state }: StorageStore, payload: IDocument) {
      try {
        const response = await storageResource.editDocument(payload);
        const data = response.data;

        const index = state.documentList.findIndex(document => document.id === payload.id);

        commit('changeDocumentDocumentList', { data, index });

        payload.type_doc === 1 && commit('changeDocument', data);

        return true;
      } catch (error) {
        if (error.errorData?.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
    async createFiles({ commit, dispatch, state }: StorageStore, payload: { id: number; fileList: File[] }) {
      try {
        await storageResource.createFiles(payload);

        return true;
      } catch (error) {
        if (error.errorData?.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
    async deleteFile({ commit, dispatch, state }: StorageStore, payload: { documentId: number; fileId: number }) {
      try {
        await storageResource.deleteFile(payload);

        const documentIndex = state.documentList.findIndex(document => document.id === payload.documentId);
        const fileIndex = state.documentList[documentIndex].files.findIndex(file => file.id === payload.fileId);

        commit('deleteFileDocumentList', { documentIndex, fileIndex });

        return true;
      } catch (error) {
        if (error.errorData?.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
    async getDocumentTypes({ commit, dispatch, state }: StorageStore) {
      try {
        const response = await storageResource.getDocumentTypes();
        const data = response.data.list;

        commit('changeDocumentTypes', data);

        return true;
      } catch (error) {
        if (error.errorData?.message) {
          await dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
  },
};
