import { IAppState } from '@/interfaces/app-state.interface';
import {ActionContext} from 'vuex';
import Vue from 'vue';
import {cookeTokenKey, IAuthApi, IAuthForOtherUser, IAuthStore} from '@/interfaces/auth.interface';
import {authResource} from '@/resources/auth.resources';
import {AxiosResponse} from 'axios';
import router from "@/router";
import {IRouter} from '@/interfaces/router.interface';
import ROUTE_NAME = IRouter.ROUTE_NAME;
import {IUserCard} from '@/interfaces/user-card.interface';

type AuthStore = ActionContext<IAuthStore.IState, IAppState>;

export default {
  namespaced: true,

  state: {
    isLabstoryPatient: false,
    userAccountInfo: {},
    currentAuthStep: IAuthForOtherUser.RegistrationSteps.CHECK_USER,
    token: null,
    patientToken: '',
    cabinets: [],
  },

  mutations: {
    setPropertyInStore(state: IAuthStore.IState, { name, value }: { name: string; value: any}) {
      Vue.set(state, name, value);
    },
  },

  actions: {
    async checkUser({commit, dispatch}: AuthStore, {value, type}: {value: string; type: IAuthApi.CheckUserParamsType}) {
      try {
        const {data}: AxiosResponse<IAuthApi.ICheckUserResponse> = await authResource.checkUser(value, type);
        commit('setPropertyInStore', {name: 'userAccountInfo', value: data})
        return true;
      } catch (error) {
        if (error.errorData.phone) {
          dispatch('error/showErrorNotice', {message: error.errorData.phone[0]},{root: true})
        }
        return false;
      }
    },

    async sendCheckCode({dispatch}: AuthStore, {value, type}: {value: string; type: IAuthApi.CheckUserParamsType}) {
      try {
        const {data}: AxiosResponse<IAuthApi.ISendCodeResponse> = await authResource.sendCheckCode(value, type);
        return data;
      } catch (error) {
        if (error.errorData.phone) {
          dispatch('error/showErrorNotice', {message: error.errorData.phone[0]},{root: true})
        }
        return false;
      }
    },

    async confirmCode({commit, dispatch}: AuthStore, data: IAuthApi.ILoginUserInputData) {
      try {
        const response = await authResource.confirmCode(data);
        return true;
      } catch (error) {
        if (error.errorData.message) {
          dispatch('error/showErrorNotice', {message: error.errorData.message}, {root: true})
        }
        return false;
      }
    },

    async authUser({commit, dispatch}: AuthStore, {authData, authType}: {authData: IAuthApi.IRegisterUserInputData | IAuthApi.ILoginUserInputData; authType: IAuthApi.AuthType}) {
      try {
        const {data}: AxiosResponse<IAuthApi.IAuthResponse> = await authResource.authUser({authData, authType});

        commit('setPropertyInStore', {name: 'token', value: data.access});
        commit('userCard/setPropertyInStore', {name: 'patient', value: data.patient}, {root: true})

        if (data?.cabinets) {
          commit('setPropertyInStore', {name: 'cabinets', value: data.cabinets});
          router.push({name: ROUTE_NAME.CHANGE_CABINETS});
        } else {
          return true;
        }
      } catch(error) {
        if (error.errorData.message) {
          dispatch('error/showErrorNotice', {message: error.errorData.message}, {root: true})
        }
        return false;
      }
    },

    async loginById({commit, dispatch}: AuthStore, loginData: IAuthApi.ILoginByIdInputData) {
      try {
        const {data}: AxiosResponse<IAuthApi.ILoginByIdResponse> = await authResource.loginById(loginData);
        commit('setPropertyInStore', {name: 'patientToken', value: data.patient_token});

        if (data?.email) {
          commit('userCard/setPatientProperty', {property: 'email', value: data.email}, {root: true})
        }

        if (data?.phone) {
          commit('userCard/setPatientProperty', {property: 'phone', value: data.phone}, {root: true})
        }

        return true;
      } catch (error)  {
        if (error.errorData.message) {
          dispatch('error/showErrorNotice', {message: error.errorData.message}, {root: true})
        }
        return false;
      }
    },

    async updateAccessToken() {
      try {

      } catch (error) {
        console.error(error)
      }
    },

    async changePatientsData({commit, dispatch}: AuthStore, {changedData, id}: {changedData: any; id: string}) {
      try {
        const {data}: AxiosResponse<IUserCard.IUser> = await authResource.changePatientsData({changedData, id});
        commit('userCard/setPropertyInStore', {name: 'patient', value: data}, {root: true})

      } catch (error) {
        if (error.errorData.message) {
          dispatch('error/showErrorNotice', {message: error.errorData.message}, {root: true})
        }
      }
    },

    async changeCabinet({commit}: AuthStore, cabinetId: string) {
      try {
        const {data}: AxiosResponse<IAuthApi.IAuthResponse> = await authResource.changeCabinet(cabinetId);
        commit('userCard/setPropertyInStore', {name: 'patient', value: data.patient}, {root: true})
      } catch (error) {
        console.error(error)
      }
    }
  }
};
