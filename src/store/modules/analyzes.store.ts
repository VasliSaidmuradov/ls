import { IAppState } from '@/interfaces/app-state.interface';
import {ActionContext} from 'vuex';
import { IAnalyzes, IAnalyzesApi, IAnalyzesStore } from '@/interfaces/analyzes.interface';
import {IAuthStore} from '@/interfaces/auth.interface';
import Vue from 'vue';
import { analyzesResources } from '@/resources/analyzes.resources';
import { AxiosResponse, Method } from 'axios';

type AnalyzesStore = ActionContext<IAnalyzesStore.IState, IAppState>;

export default {
  namespaced: true,

  state: {
    addedAnalyzes: [],

    checkBoxValues: {
      check1: false,
      check2: false,
      check3: false,
      check4: false,
      check5: false,
      check6: false,
      check7: false,
      check8: false,
    },

    compareMode: false,

    laboratoriesList: [],
    biomarkersList: [],

    commentAnalyzesId: null,
  },

  getters: {
    getAddedAnalyzes (state: IAnalyzesStore.IState) {
      return state.addedAnalyzes;
    },

    getAnalyzeById(state: IAnalyzesStore.IState) {
      return (id: number) => state.addedAnalyzes.find(item => item.id === id)
    }
  },

  mutations: {
    setPropertyInStore(state: IAuthStore.IState, { name, value }: { name: string; value: any}) {
      Vue.set(state, name, value);
    },

    addAnalyzes(state: IAnalyzesStore.IState, item: IAnalyzes.IBiomarker) {
      const items: IAnalyzes.IBiomarker[] = state.addedAnalyzes;
      items.push(item);
      state.addedAnalyzes = items;
    },

    updateBiomarkerAfterSave(state: IAnalyzesStore.IState ,{id, biomarker}: {id: string | number; biomarker: IAnalyzes.IBiomarker}) {
      const items: IAnalyzes.IBiomarker[] = state.addedAnalyzes;
      const index: number = items.findIndex((item: IAnalyzes.IBiomarker) => item.id === id);

      if (index !== -1) {
        items[index] = biomarker;
      }

      state.addedAnalyzes = items;
    },

    deleteBiomarker(state: IAnalyzesStore.IState, id: number | string) {
      const items = state.addedAnalyzes;
      state.addedAnalyzes = items.filter(item => item.id !== id);
    }
  },

  actions: {

    async init({dispatch}: AnalyzesStore) {
      await dispatch('getBiomarkers');
      await dispatch('getLaboratories');
      // await dispatch('getUnits');
    },

    async getBiomarkers({dispatch, commit}: AnalyzesStore) {
      try {
        const { data }: AxiosResponse<IAnalyzesApi.IBiomarkerResponse> = await analyzesResources.getBiomarkers();
        commit('setPropertyInStore', {name: 'biomarkersList', value: data.biomarkers})
      } catch (error) {
        if (error.errorData.message) {
          dispatch('error/showErrorNotice', {message: error.errorData.message}, {root: true})
        }
      }
    },

    async getLaboratories({dispatch, commit}: AnalyzesStore) {
      try {
        const {data}: AxiosResponse<{laboratories: IAnalyzes.ILaboratories[]}> = await analyzesResources.getLaboratories();
        commit('setPropertyInStore', {name: 'laboratoriesList', value: data.laboratories})
      } catch (error) {
        if (error.errorData.message) {
          dispatch('error/showErrorNotice', {message: error.errorData.message}, {root: true})
        }
      }
    },

    async saveBiomarkers({dispatch, commit}: AnalyzesStore, {data, id, method}: {data: IAnalyzes.IBiomarker; id: string | number; method: Method}) {
      try {
        const {data: biomarker}: AxiosResponse<IAnalyzes.IBiomarker> = await analyzesResources.saveBiomarker(data, id, method);
        commit('updateBiomarkerAfterSave', {id, biomarker});
        return {status: true, data: biomarker};
      } catch (error) {
        if (error?.errorData?.message) {
          dispatch('error/showErrorNotice', {message: error.errorData.message}, {root: true})
        }
      }
    },

    async deleteBiomarker({dispatch, commit}: AnalyzesStore, id: number) {
      try {
        await analyzesResources.deleteBiomarker(id);
        commit('deleteBiomarker', id)
      } catch (error) {
        if (error?.errorData?.message) {
          dispatch('error/showErrorNotice', {message: error.errorData.message}, {root: true})
        }
      }
    },

    addComment({commit, getters, state}: AnalyzesStore, {id, comment}: {id: string | number; comment: string}) {
      const items: IAnalyzes.IBiomarker[] = getters['getAddedAnalyzes'];

      const index = items.findIndex((item: IAnalyzes.IBiomarker) => item.id === id);

      if (index !== -1) {
        items[index].comment = comment;
      }

      commit('setPropertyInStore', {name: 'addedAnalyzes', value: items});
    }

    // async getUnits({dispatch}: AnalyzesStore) {
    //   try {
    //     const { data } = await analyzesResources.getUnits();
    //     console.log(data);
    //   } catch (error) {
    //     if (error.errorData.message) {
    //       dispatch('error/showErrorNotice', {message: error.errorData.message}, {root: true})
    //     }
    //   }
    // }
  },
};
