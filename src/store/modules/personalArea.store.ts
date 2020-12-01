import { IAppState } from '@/interfaces/app-state.interface';
import {ActionContext} from 'vuex';
import Vue from 'vue';

import {
  IMedicalCard,
  IPersonalArea,
  IPersonalAreaStore,
  IUserCard,
} from '@/interfaces/personal-area.interface';
import {personalAreaResources} from '@/resources/personalArea.resources';
import {AxiosResponse} from 'axios';
import {authResource} from '@/resources/auth.resources';
type PersonalAreaStore = ActionContext<IPersonalAreaStore.IState, IAppState>;

export default {
  namespaced: true,

  state: {
    oms: '',
    dms: '',
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
    },
    medicalCard: {
      is_pregnant_now: false,
      last_menstruation_date: new Date(),
      pregnancies_count: null,
      is_abortion: false,
      is_miscarriages: null,
      menstruation_start: [],
      menstruation_duration: [],
      menstruation_cycle: [],
      hormonal_drugs: [],
      allergies: [],
      gender: null,
      blood_group: [],
      country: null,
      region_type: null,
      birth_date: null,
      created_at: null,
      deleted_at: null,
      updated_at: null,
      race: [],
      weight: null,
      height: null,
      all_pregnancies_success: null,
      is_pregnancies: false,
      is_undeveloped_pregnancy: null,
    },

    selectOptions: {},
  },

  mutations: {
    setPropertyInStore(state: IPersonalAreaStore.IState, { name, value }: { name: any; value: any}) {
      Vue.set(state, name, value);
    },

    setPatientProperty(state: IPersonalAreaStore.IState, {name, value}: {name: keyof IUserCard.IUser; value: any}) {
      Vue.set(state.patient, name, value);
    },

    setMedicalCardProperty(state: IPersonalAreaStore.IState, {name, value}: {name: keyof IMedicalCard.IMedicalCard; value: any}) {
      Vue.set(state.medicalCard, name, value);
    },

    addReactionItem(state: IPersonalAreaStore.IState, {item, endpoint}: {item: any; endpoint: keyof {hormonal_drugs: string; allergies: string}}) {
      const items = [...state.medicalCard[endpoint]];
      items.push(item);
      state.medicalCard[endpoint] = items;
    },

    deleteReactionItem(state: IPersonalAreaStore.IState, {id, endpoint}: {id: string; endpoint: keyof {hormonal_drugs: string; allergies: string}}) {
      const items = [...state.medicalCard[endpoint]];
      state.medicalCard[endpoint] = items.filter(item => item.id !== id);
    }
  },

  actions: {
    setUser({commit}: PersonalAreaStore, {data}: {data: IUserCard.IUser}) {
      commit('setPropertyInStore', {name: 'id', value: data.id});
    },

    async init({dispatch}: PersonalAreaStore) {
      await dispatch('getSelectOptions');
      await dispatch('getMedicalCardData');
    },

    async getSelectOptions({commit, dispatch}: PersonalAreaStore) {
      try {
        const {data}: AxiosResponse<IPersonalArea.ISelectOptions> = await personalAreaResources.getSelectOptions();
        commit('setPropertyInStore', {name: 'selectOptions', value: data})
      } catch (error) {
        dispatch('error/defaultErrorHandler', {error}, {root: true})
      }
    },

    async getMedicalCardData({commit, dispatch}: PersonalAreaStore) {
      try {
        const {data}: AxiosResponse<IMedicalCard.IMedicalCard> = await personalAreaResources.getMedicalCardData();
        commit('setPropertyInStore', {name: 'medicalCard', value: data});
      } catch (error) {
        dispatch('error/defaultErrorHandler', {error}, {root: true})
      }
    },

    async updateMedicalCardData({dispatch, commit}: PersonalAreaStore, updateData: any) {
      try {
        const {data}: AxiosResponse<IMedicalCard.IMedicalCard> = await personalAreaResources.updateMedicalCardData(updateData);
        commit('setPropertyInStore', {name: 'medicalCard', value: data});
      } catch (error) {
        dispatch('error/defaultErrorHandler', {error}, {root: true})
      }
    },

   async addReactionItem({dispatch, commit}: PersonalAreaStore, {endpoint, reactionData}: {endpoint: string; reactionData: IMedicalCard.IReaction}) {
      try {
        const {data}: AxiosResponse<IMedicalCard.IReaction[]> = await personalAreaResources.addReactionItem({endpoint, reactionData});
        commit('addReactionItem', {item: data, endpoint});
      } catch (error) {
        dispatch('error/defaultErrorHandler', {error}, {root: true})
      }
    },

    async deleteReactionItem({commit, dispatch}: PersonalAreaStore, {id, endpoint}: {id: string; endpoint: string}) {
      try {
        await personalAreaResources.deleteReactionItem({id, endpoint});
        commit('deleteReactionItem', {id, endpoint})
      } catch (error) {
        dispatch('error/defaultErrorHandler', {error}, {root: true})
      }
    },

    async updateReactionsItem({commit, dispatch}: PersonalAreaStore ,{id, endpoint, item}: {id: string; endpoint: string; item: IMedicalCard.IReaction}) {
      try {
        await personalAreaResources.updateReactionsItem({id, endpoint, item});
      } catch (error) {
        dispatch('error/defaultErrorHandler', {error}, {root: true})
      }
    }
  }
};
