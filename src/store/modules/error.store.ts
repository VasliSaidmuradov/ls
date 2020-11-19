import { IAppState } from '@/interfaces/app-state.interface';
import {ActionContext} from 'vuex';
import {IError, IErrorStore} from '@/interfaces/error.interface';
import {Notify} from 'quasar';


type ErrorStore = ActionContext<IErrorStore.IState, IAppState>;

export default {
  namespaced: true,

  state: {
    isVisible: true,
    payload: null,
  },

  mutations: {
    closeErrorModal() {
      return true;
      // @todo modal logic
    },

    openErrorModal() {
      return true;
      // @todo modal logic
    }
  },

  actions: {
    closeErrorModal({commit}: ErrorStore) {
      commit('close');
    },

    openErrorModal({commit}: ErrorStore) {
      commit('close');
    },

    showErrorNotice({}: ErrorStore, {message, closeBtn, onDismiss}: IError.IErrorNoticeInputParams) {
      Notify.create({
        message: message,
        type: 'negative',
        closeBtn,
        onDismiss,
      });
    }
  }
};
