import { IAppState } from '@/interfaces/app-state.interface';
import { ActionContext } from 'vuex';
import Vue from 'vue';
import { IOrdersStore, IOrdersApi } from '@/interfaces/orders.interface';
import { AxiosResponse } from 'axios';
import { ordersResources } from '@/resources/orders.resources';

type OrdersStore = ActionContext<IOrdersStore.IState, IAppState>;

export default {
  namespaced: true,
  state: {
    orderedServices: {},
    orderedService: {},
  },
  mutations: {
    setPropertyInStore(state: IOrdersStore.IState, { name, value }: { name: string; value: any }) {
      Vue.set(state, name, value);
    },
  },
  actions: {
    async getOrderedServices({ commit, dispatch }: OrdersStore) {
      try {
        const { data }: AxiosResponse<IOrdersApi.IOrderedServices> = await ordersResources.orderedServices();
        commit('setPropertyInStore', { name: 'orderedServices', value: data });
      } catch (error) {
        dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
      }
    },
    async getOrderedService({ commit, dispatch }: OrdersStore, id: number) {
      try {
        const { data }: AxiosResponse<IOrdersApi.IOrderedService> = await ordersResources.orderedService(id);
        commit('setPropertyInStore', { name: 'orderedService', value: data });
        dispatch('documents/getDocumentsList', data.document_ids, { root: true });
        dispatch('documents/getDocumentsList', '', { root: true });
      } catch (error) {
        dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
      }
    },
    async changeOrderedService({ commit, dispatch }: OrdersStore, requestBody: { id: number; documentIds: number[] }) {
      try {
        const { data }: AxiosResponse<IOrdersApi.IOrderedService> = await ordersResources.changeOrderedService(
          requestBody
        );
        commit('setPropertyInStore', { name: 'orderedService', value: data });
        dispatch('documents/getDocumentsList', data.document_ids, { root: true });
        dispatch('documents/getDocumentsList', '', { root: true });
      } catch (error) {
        dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
      }
    },
  },
  getters: {
    getOrderedServicesList: (state: IOrdersStore.IState) => state.orderedServices,
    getOrderedService: (state: IOrdersStore.IState) => state.orderedService,
  },
};
