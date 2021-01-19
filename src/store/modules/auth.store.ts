import { IAppState } from '@/interfaces/app-state.interface';
import {ActionContext, Store} from 'vuex';
import Vue from 'vue';
import {cookeTokenKey, IAuthApi, IAuthForOtherUser, IAuthStore} from '@/interfaces/auth.interface';
import {authResource} from '@/resources/auth.resources';
import Axios, {AxiosResponse} from 'axios';
import router from "@/router";
import {IRouter} from '@/interfaces/router.interface';
import ROUTE_NAME = IRouter.ROUTE_NAME;
import {IUserCard} from '@/interfaces/personal-area.interface';

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
    isRefreshing: false,
    refreshingCall: null,
  },

  mutations: {
    setPropertyInStore(state: IAuthStore.IState, { name, value }: { name: string; value: any}) {
      Vue.set(state, name, value);
    },

    setTokens(state: IAuthStore.IState, {access, refresh}: {access: string; refresh?: string}) {
      state.token = access;
      if (refresh) {
        Vue.$cookies.set(cookeTokenKey, refresh)
      }
    }
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
        const { data: confirmData  } = await authResource.confirmCode(data);

        if (confirmData.refresh) {
          commit('setTokens', {...confirmData})
        }

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

        commit('setTokens', {...data})

        if (data.patient) {
          commit('personalArea/setPropertyInStore', {name: 'patient', value: data.patient}, {root: true})
        }

        if (data?.cabinets) {
          commit('setPropertyInStore', {name: 'cabinets', value: data.cabinets});
          router.push({name: ROUTE_NAME.CHANGE_CABINETS});
        }

        return true;

      } catch(error) {
        if (error.errorData?.message) {
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
          commit('personalArea/setPatientProperty', {name: 'email', value: data.email}, {root: true})
        }

        if (data?.phone) {
          commit('personalArea/setPatientProperty', {name: 'phone', value: data.phone}, {root: true})
        }

        return true;
      } catch (error)  {
        if (error.errorData.message) {
          dispatch('error/showErrorNotice', {message: error.errorData.message}, {root: true})
        }
        return false;
      }
    },

    async updateAccessToken({commit}: AuthStore) {
      const refresh = Vue.$cookies.get(cookeTokenKey);
      const infinityResponse: Promise<AxiosResponse<any>> = new Promise(() => {});

      if (refresh) {
        const refreshingCall = authResource.updateToken(refresh)
          .then(({data}) => {
            commit('setTokens', {...data});
            return Promise.resolve();
          })
          .catch(() => {
            router.push({name: ROUTE_NAME.AUTH_PAGE});
            return infinityResponse;
          })

        return refreshingCall;
      } else {
        router.push({name: ROUTE_NAME.AUTH_PAGE});
        return infinityResponse;
      }
    },

    async changePatientsData({commit, dispatch}: AuthStore, {changedData}: {changedData: any}) {
      try {
        const {data}: AxiosResponse<IUserCard.IUser> = await authResource.changePatientsData({changedData});
        commit('personalArea/setPropertyInStore', {name: 'patient', value: data}, {root: true});

        return true;

      } catch (error) {
        if (error.errorData.message) {
          dispatch('error/showErrorNotice', {message: error.errorData.message}, {root: true})
        }
      }
    },

    async changeCabinet({commit}: AuthStore, cabinetId: string) {
      try {
        const {data}: AxiosResponse<IAuthApi.IAuthResponse> = await authResource.changeCabinet(cabinetId);
        commit('setTokens', {...data})

        if (data.patient) {
          commit('personalArea/setPropertyInStore', {name: 'patient', value: data.patient}, {root: true})
        }

        router.push({name: ROUTE_NAME.INDEX_PAGE})
      } catch (error) {
        console.error(error)
      }
    }
  }
};
