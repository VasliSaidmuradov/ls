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
    id: '',
    patient: {
      avatar: null,
      created_at: '',
      deleted_at: null,
      email: '',
      id: '',
      is_deleted: false,
      name: '',
      password: null,
      patronymic: '',
      phone: '',
      surname: '',
      updated_at: '',
      user_id: ''
    }
  },

  mutations: {
    setPropertyInStore(state: IUserCardStore.IState, { name, value }: { name: any; value: any}) {
      Vue.set(state, name, value);
    },

    setPatientProperty(state: IUserCardStore.IState, {property, value}: {property: keyof IUserCard.IUser; value: any}) {
      Vue.set(state.patient, property, value);
    }
  },

  actions: {
    setUser({commit}: UserCardStore, {data}: {data: IUserCard.IUser}) {
      commit('setPropertyInStore', {name: 'id', value: data.id});
    }
  }
};
