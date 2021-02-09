import { IAppState } from '@/interfaces/app-state.interface';
import { ActionContext } from 'vuex';
import Vue from 'vue';
import { AxiosResponse } from 'axios';
import { IDashBoard, IDashBoardStore, IDashBoardApi } from '@/interfaces/dashboard.interface';
import { dashboardResources } from '@/resources/dashboard.resources';
import { Documents } from './../../interfaces/documents.interface';
import { IOrdersApi } from '@/interfaces/orders.interface';

type DashboardStore = ActionContext<IDashBoardStore.IState, IAppState>;

export default {
  namespaced: true,
  state: {
    documents: [],
    orderedServices: [],
    overview: {},
    results: [],
  },
  mutations: {
    setPropertyInStore(state: IDashBoardStore.IState, { name, value }: { name: string; value: any }) {
      Vue.set(state, name, value);
    },
  },
  actions: {
    async getDocuments({ commit, dispatch }: DashboardStore, count: number) {
      try {
        const { data }: AxiosResponse<IDashBoardApi.IDocuments> = await dashboardResources.getDocuments(count);
        console.log('get dash docs: ', data.documents);
        commit('setPropertyInStore', { name: 'documents', value: data.documents });
      } catch (error) {
        if (error?.errorData?.message) {
          dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
    async getOrderedServices({ commit, dispatch }: DashboardStore, count: number) {
      try {
        const { data }: AxiosResponse<IDashBoardApi.IOrderedServices> = await dashboardResources.getOrderedServices(
          count
        );
        console.log('get dash ordered services: ', data.orders);
        commit('setPropertyInStore', { name: 'orderedServices', value: data.orders });
      } catch (error) {
        if (error?.errorData?.message) {
          dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
    async getOverview({ commit, dispatch }: DashboardStore) {
      try {
        const { data }: AxiosResponse<IDashBoard.IOverview> = await dashboardResources.getOverview();
        console.log('get dash overview: ', data);
        commit('setPropertyInStore', { name: 'overview', value: data });
      } catch (error) {
        if (error?.errorData?.message) {
          dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
    async getResults({ commit, dispatch }: DashboardStore, count: number) {
      try {
        const { data }: AxiosResponse<IDashBoardApi.IResults> = await dashboardResources.getResults(count);
        console.log('get dash results: ', data.results);
        commit('setPropertyInStore', { name: 'results', value: data.results });
      } catch (error) {
        if (error?.errorData?.message) {
          dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },
  },
  getters: {},
};
