import { IAppState } from '@/interfaces/app-state.interface';
import { ActionContext } from 'vuex';
import Vue from 'vue';
import { AxiosResponse } from 'axios';
import { Documents, IDocumentsStore } from '@/interfaces/documents.interface';
import { documentsResources } from '@/resources/documents.resources';

type DocumentsStore = ActionContext<IDocumentsStore.IState, IAppState>;

export default {
  namespaced: true,
  state: {
    documentsList: [],
    allDocumentsList: [],
    document: {},
    addDocumentToOrder: false,
  },
  mutations: {
    setPropertyInStore(state: IDocumentsStore.IState, { name, value }: { name: string; value: any }) {
      Vue.set(state, name, value);
    },
  },
  actions: {
    async getDocumentsList({ commit, dispatch }: DocumentsStore, ids: number[] | '' = '') {
      try {
        const { data }: AxiosResponse<Documents.IDocuments> = await documentsResources.documentsList(ids);
        if (ids.length) commit('setPropertyInStore', { name: 'documentsList', value: data });
        else if (ids === '') commit('setPropertyInStore', { name: 'allDocumentsList', value: data });
        else commit('setPropertyInStore', { name: 'documentsList', value: [] });
      } catch (error) {
        dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
      }
    },
    // async createDocument({ commit, dispatch, rootState }: DocumentsStore, responseData: {}) {
    //   try {
    //     const orderedService = rootState.orders.orderedService;
    //     const { document_ids } = orderedService;

    //     const { data }: AxiosResponse<Documents.IDocument> = await documentsResources.createDocument(responseData);

    //     commit('setPropertyInStore', { name: 'document', value: data });
    //     dispatch('getDocumentsList', [...document_ids, data.id]);
    //     dispatch('getDocumentsList', '');
    //   } catch (error) {
    //     dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
    //   }
    // },
  },
  getters: {},
};
