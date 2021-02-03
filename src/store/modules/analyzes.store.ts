import { IAppState } from '@/interfaces/app-state.interface';
import { ActionContext } from 'vuex';
import { IAnalyzes, IAnalyzesApi, IAnalyzesStore } from '@/interfaces/analyzes.interface';
import { IAuthStore } from '@/interfaces/auth.interface';
// import { createObjectFormArrayWithGivenPropAndValue } from '@/plugins/helpers';
import Vue from 'vue';
import { analyzesResource } from '@/resources/analyzes.resources';
import { AxiosResponse, Method } from 'axios';

type AnalyzesStore = ActionContext<IAnalyzesStore.IState, IAppState>;

export default {
  namespaced: true,

  state: {
    analyzesForAddList: [
      {
        name: 'повторяет функционал приведённого.',
        ranges: {
          min: 30,
          max: null,
        },
        units: 'МЕ/л',
      },
      {
        name: 'крови концентрации 25ОН-витамина D в сыворотке крови',
        ranges: {
          min: 30,
          max: null,
        },
        units: 'МЕ/л',
      },
      {
        name: 'найти позицию начала вхождения',
        ranges: {
          min: 30,
          max: null,
        },
        units: 'МЕ/л',
      },
      {
        name: 'витамина концентрации 25ОН-витамина D в сыворотке крови',
        ranges: {
          min: 30,
          max: null,
        },
        units: 'МЕ/л',
      },
    ],
    addedAnalyzes: [],
    addedAnalyzeItems: [],

    checkBoxValues: {},
    // checkedArr: 0,

    compareMode: false,
    laboratoriesList: [],
    biomarkersList: [],

    commentAnalyzesId: null,
    comparingItems: [],
    analyzeBiomarkerList: null,
    analyzeResultsList: [],
    analyzeRubricsList: [],
    analyzeRubric: {},
    selectedRubrics: [],
    selectedRubricIds: [],
  },

  mutations: {
    setPropertyInStore(state: IAnalyzesStore.IState, { name, value }: { name: string; value: any }) {
      Vue.set(state, name, value);
    },
    addAnalyzes(state: IAnalyzesStore.IState, item: IAnalyzes.IBiomarker) {
      const items: IAnalyzes.IBiomarker[] = state.addedAnalyzes;
      items.push(item);
      state.addedAnalyzes = items;
    },

    updateBiomarkerAfterSave(
      state: IAnalyzesStore.IState,
      { id, biomarker }: { id: string | number; biomarker: IAnalyzes.IBiomarker }
    ) {
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
    },
    addAnalyze(state: IAnalyzesStore.IState, item: IAnalyzes.IAnalyzesForAddItem) {
      const items = state.addedAnalyzeItems;
      items.push(item);
      state.addedAnalyzeItems = items;
    },
    setSelectedRubricIds(state: IAnalyzesStore.IState, item: number) {
      state.selectedRubricIds.includes(item)
        ? (state.selectedRubricIds = state.selectedRubricIds.filter(el => el !== item))
        : (state.selectedRubricIds = [...state.selectedRubricIds, item]);
    },
    setComparingItems(state: IAnalyzesStore.IState, id: number) {
      const MAX_AVAILABLE_ITEMS = 4;
      if (state.comparingItems.includes(id)) {
        state.comparingItems = state.comparingItems.filter(el => el !== id);
      } else {
        if (state.comparingItems.length >= MAX_AVAILABLE_ITEMS) return;
        state.comparingItems = [...state.comparingItems, id];
      }
    },
  },

  actions: {
    async init({ dispatch }: AnalyzesStore) {
      await dispatch('getBiomarkers');
      await dispatch('getLaboratories');
      // await dispatch('getUnits');
    },

    async getBiomarkers({ dispatch, commit }: AnalyzesStore) {
      try {
        const { data }: AxiosResponse<IAnalyzesApi.IBiomarkerResponse> = await analyzesResource.getBiomarkers();
        commit('setPropertyInStore', { name: 'biomarkersList', value: data.biomarkers });
      } catch (error) {
        if (error.errorData.message) {
          dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },

    async getLaboratories({ dispatch, commit }: AnalyzesStore) {
      try {
        const {
          data,
        }: AxiosResponse<{ laboratories: IAnalyzes.ILaboratories[] }> = await analyzesResource.getLaboratories();
        commit('setPropertyInStore', { name: 'laboratoriesList', value: data.laboratories });
      } catch (error) {
        if (error.errorData.message) {
          dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },

    async saveBiomarkers(
      { dispatch, commit }: AnalyzesStore,
      { data, id, method }: { data: IAnalyzes.IBiomarker; id: string | number; method: Method }
    ) {
      try {
        const { data: biomarker }: AxiosResponse<IAnalyzes.IBiomarker> = await analyzesResource.saveBiomarker(
          data,
          id,
          method
        );
        commit('updateBiomarkerAfterSave', { id, biomarker });
        return { status: true, data: biomarker };
      } catch (error) {
        if (error?.errorData?.message) {
          dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },

    async deleteBiomarker({ dispatch, commit }: AnalyzesStore, id: number) {
      try {
        await analyzesResource.deleteBiomarker(id);
        commit('deleteBiomarker', id);
      } catch (error) {
        if (error?.errorData?.message) {
          dispatch('error/showErrorNotice', { message: error.errorData.message }, { root: true });
        }
      }
    },

    addComment({ commit, getters, state }: AnalyzesStore, { id, comment }: { id: string | number; comment: string }) {
      const items: IAnalyzes.IBiomarker[] = getters['getAddedAnalyzes'];

      const index = items.findIndex((item: IAnalyzes.IBiomarker) => item.id === id);

      if (index !== -1) {
        items[index].comment = comment;
      }

      commit('setPropertyInStore', { name: 'addedAnalyzes', value: items });
    },
    deleteAnalyzes({ state, commit }: AnalyzesStore, id: string) {
      const items = state.addedAnalyzes;
      commit('setPropertyInStore', { name: 'addedAnalyzes', value: items.filter(item => item.id !== id) });
    },

    async analyzeBiomarkers({ commit, dispatch }: AnalyzesStore, { count, offset }: { count: number; offset: number }) {
      try {
        const { data } = await analyzesResource.getAnalyzeBiomarkers({ count, offset });
        // console.log('analyzeBiomarkers actions: ', data);
        commit('setPropertyInStore', { name: 'analyzeBiomarkerList', value: data });
      } catch (error) {
        dispatch('error/showErrorNotice', { message: error.errorData?.phone[0] }, { root: true });
      }
    },
    setCheckBoxValues({ state, commit }: AnalyzesStore) {
      // const values = createObjectFormArrayWithGivenPropAndValue(
      //   [...state.analyzeRubricsList],
      //   {},
      //   { prop: 'subrubrics', value: false }
      // );
      commit('setPropertyInStore', { name: 'checkBoxValues', value: {} });
    },

    async analyzeResultsList({ commit, dispatch }: AnalyzesStore) {
      try {
        const { data } = await analyzesResource.getAnalyzeResults();
        for (const i of [0, 1, 2]) {
          const last = { ...data.results[0] };
          last.biomarker = `Концентрация в сыворотке TEST #${i}`;
          last.id = 9999999 + i;
          last.rubrics = [8015 + i, 9613 + i];
          last.value = '111' + i;
          last.biomarker_id = 9999900000 + i;
          data.results.push(last);
        }
        console.log('analyzes results LAST: ', data.results);
        commit('setPropertyInStore', { name: 'analyzeResultsList', value: data?.results });
      } catch (error) {
        console.log(error);
        dispatch('error/showErrorNotice', { message: error.errorData?.phone[0] }, { root: true });
      }
    },

    async createAnalyze({ dispatch }: AnalyzesStore) {
      const data = {
        date: '2021-01-25',
        value: 320,
        ranges: {
          min: 299,
          max: 356,
        },
        unit_id: 182612,
        laboratory_id: 0,
        comment: 'No comment1',
        biomarker_id: 19399,
      };
      try {
        const response = await analyzesResource.createAnalyzeResult(data);
        dispatch('analyzeResultsList');
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    async analyzeRubrics({ commit }: AnalyzesStore) {
      const { data } = await analyzesResource.getAnalyzeRubrics();
      console.log('analyze Rubrics: ', data);
      commit('setPropertyInStore', { name: 'analyzeRubricsList', value: data?.rubrics });
    },

    async analyzeRubric({ commit }: AnalyzesStore, id: number) {
      const { data } = await analyzesResource.getAnalyzeRubric(id);
      commit('setPropertyInStore', { name: '', value: data });
    },
  },

  getters: {
    getAddedAnalyzes(state: IAnalyzesStore.IState) {
      return state.addedAnalyzes;
    },
    getAnalyzeById(state: IAnalyzesStore.IState) {
      return (id: number) => state.addedAnalyzes.find(item => item.id === id);
    },
    checkedArr(state: IAnalyzesStore.IState): number {
      return Object.values(state.checkBoxValues).filter(el => el).length;
    },
    getSelectedRubrics(state: IAnalyzesStore.IState): any[] {
      const result = []!;
      const ids = [...state.selectedRubricIds];
      const rubrics = [...state.analyzeRubricsList];
      // const result: {} = createObjectFormArrayWithGivenPropAndValue(rubrics, {}, { prop: 'id', value: ids[0] });
      // console.log('result:', result);
      return result;
    },
    getSelectedRubricIds(state: IAnalyzesStore.IState): number[] {
      return state.selectedRubricIds;
    },
  },
};
