import { IAppState } from '@/interfaces/app-state.interface';
import {ActionContext} from 'vuex';
import Vue from 'vue';
import {IUserCard, IUserCardStore} from '@/interfaces/user-card.interface';
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
    phone: '89529273591',
    password: '',
    avatar: null,
  },

  mutations: {
    setPropertyInStore(state: IUserCardStore.IState, { name, value }: { name: any; value: any}) {
      Vue.set(state, name, value);
    },
  },

  actions: {
    setUser({commit}: UserCardStore, {data}: {data: IUserCard.IUser}) {
      Object.keys(data).forEach((key: string) => {
        console.log(data, key, data[(key as keyof IUserCard.IUser)])
        commit('setPropertyInStore', {name: key, value: data[(key as keyof IUserCard.IUser)]})
      })
    }
  }
};
