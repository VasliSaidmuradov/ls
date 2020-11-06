import { IAppState } from '@/interfaces/app-state.interface';
import {ActionContext} from 'vuex';
import Vue from 'vue';
import {IUserCardStore} from '@/interfaces/user-card.interface';
type UserCardStore = ActionContext<IUserCardStore.IState, IAppState>;

export default {
  namespaced: true,

  state: {
    name: '123',
    surname: '',
    patronym: '',
    mail: '',
    oms: '',
    dms: '',
    phone: '',
    password: '',
  },

  mutations: {
    setPropertyInStore(state: IUserCardStore.IState, { name, value }: { name: string; value: any}) {
      Vue.set(state, name, value);
    },
  },

  actions: {}
};
