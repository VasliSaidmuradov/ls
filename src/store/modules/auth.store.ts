import { IAppState } from '@/interfaces/app-state.interface';
import {ActionContext} from 'vuex';
import Vue from 'vue';
import {IUserCardStore} from '@/interfaces/user-card.interface';
import {IAuthStore} from '@/interfaces/auth.interface';
type AuthStore = ActionContext<IAuthStore.IState, IAppState>;

export default {
  namespaced: true,

  state: {
    isLabstoryPatient: true,
  },

  mutations: {
    setPropertyInStore(state: IUserCardStore.IState, { name, value }: { name: string; value: any}) {
      Vue.set(state, name, value);
    },
  },

  actions: {

  }
};
