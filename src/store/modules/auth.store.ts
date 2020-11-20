import { IAppState } from '@/interfaces/app-state.interface';
import {ActionContext} from 'vuex';
import Vue from 'vue';
import {cookeTokenKey, IAuthApi, IAuthForOtherUser, IAuthStore} from '@/interfaces/auth.interface';
import {authResource} from '@/resources/auth.resources';
import {AxiosResponse} from 'axios';

type AuthStore = ActionContext<IAuthStore.IState, IAppState>;

export default {
  namespaced: true,

  state: {
    isLabstoryPatient: false,
    userAccountInfo: {},
    currentAuthStep: IAuthForOtherUser.RegistrationSteps.CHECK_USER,
    token: null,
    patientToken: '',
  },

  mutations: {
    setPropertyInStore(state: IAuthStore.IState, { name, value }: { name: string; value: any}) {
      Vue.set(state, name, value);
    },
  },

  actions: {
    async checkUser({commit, dispatch}: AuthStore, {value, type}: {value: string; type: IAuthApi.CheckUserParamsType}) {
      try {
        const response: AxiosResponse<IAuthApi.ICheckUserResponse> = await authResource.checkUser(value, type);
        commit('setPropertyInStore', {name: 'userAccountInfo', value: response.data})
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
        const response: AxiosResponse<IAuthApi.ISendCodeResponse> = await authResource.sendCheckCode(value, type);
        return response.data;
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

    async authUser({commit, dispatch}: AuthStore, {data, authType}: {data: IAuthApi.IRegisterUserInputData | IAuthApi.ILoginUserInputData; authType: IAuthApi.AuthType}) {
      try {
        const response: AxiosResponse<IAuthApi.IAuthResponse> = await authResource.authUser({data, authType});
        commit('setPropertyInStore', {name: 'token', value: response.data.access});
        dispatch('userCard/setUser', {data: response.data.patient}, {root: true})
        return true;
      } catch(error) {
        if (error.errorData.message) {
          dispatch('error/showErrorNotice', {message: error.errorData.message}, {root: true})
        }
        return false;
      }
    },

    async loginById({commit, dispatch}: AuthStore, data: IAuthApi.ILoginByIdInputData) {
      try {
        const response = await authResource.loginById(data);
        commit('setPropertyInStore', {name: 'patientToken', value: response.data.patient_token});
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
    }
  }
};
