import { IAppState } from '@/interfaces/app-state.interface';
import {ActionContext} from 'vuex';
import {IAnalyzes, IAnalyzesStore} from '@/interfaces/analyzes.interface';
import {IAuthStore} from '@/interfaces/auth.interface';
import Vue from 'vue';

type AnalyzesStore = ActionContext<IAnalyzesStore.IState, IAppState>;

export default {
  namespaced: true,

  state: {
    analyzesForAddList: [
      {
        name: "повторяет функционал приведённого.",
        ranges: {
          min: 30,
          max: null
        },
        units: 'МЕ/л'
      }, {
        name: "крови концентрации 25ОН-витамина D в сыворотке крови",
        ranges: {
          min: 30,
          max: null
        },
        units: 'МЕ/л'
      }, {
        name: "найти позицию начала вхождения",
        ranges: {
          min: 30,
          max: null
        },
        units: 'МЕ/л'
      }, {
        name: "витамина концентрации 25ОН-витамина D в сыворотке крови",
        ranges: {
          min: 30,
          max: null
        },
        units: 'МЕ/л'
      },
    ],
    addedAnalyzes: [
      {
        name: "витамина концентрации 25ОН-витамина D в сыворотке крови",
        ranges: {
          min: 30,
          max: null
        },
        units: 'МЕ/л',
        id: 'da',
        result: 52,
        lab: 'Лабстори',
        date: new Date(),
      },
    ],
  },

  mutations: {
    setPropertyInStore(state: IAuthStore.IState, { name, value }: { name: string; value: any}) {
      Vue.set(state, name, value);
    },

    addAnalyzes(state: IAnalyzesStore.IState, item: IAnalyzes.IAnalyzesForAddItem) {
      const items = state.addedAnalyzes;
      items.push(item);
      state.addedAnalyzes = items;
    }
  },

  actions: {
    deleteAnalyzes({state, commit}: AnalyzesStore, id: string) {
      const items = state.addedAnalyzes;
      commit('setPropertyInStore', {name: 'addedAnalyzes', value: items.filter(item => item.id !== id)});
    }
  }
};
