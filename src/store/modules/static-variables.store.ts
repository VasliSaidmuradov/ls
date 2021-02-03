import { IAppState } from '@/interfaces/app-state.interface';
import { ActionContext } from 'vuex';
import Vue from 'vue';
import { AxiosResponse } from 'axios';
import { IStaticVariables } from '@/interfaces/static-variables.interface';
import { staticVariables } from '@/resources/static-variables.resources';

type Store = ActionContext<IStaticVariables.IState, IAppState>;

export default {
  namespaced: true,
  state: {
    orderStatuses: [],
    documentTypes: [],
  },
  mutations: {
    setPropertyInStore(state: IStaticVariables.IState, { name, value }: { name: string; value: any }) {
      Vue.set(state, name, value);
    },
  },
  actions: {
    async getOrderStatuses({ commit, dispatch }: Store) {
      try {
        const { data }: AxiosResponse<IStaticVariables.IOrderStatuses> = await staticVariables.orderStatuses();
        commit('setPropertyInStore', { name: 'orderStatuses', value: data?.list });
      } catch (error) {
        dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
      }
    },
    async getDocumentTypes({ commit, dispatch }: Store) {
      try {
        const { data }: AxiosResponse<IStaticVariables.IOrderStatuses> = await staticVariables.documentTypes();
        commit('setPropertyInStore', { name: 'documentTypes', value: data?.list });
      } catch (error) {
        dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
      }
    },
  },
  getters: {},
};
