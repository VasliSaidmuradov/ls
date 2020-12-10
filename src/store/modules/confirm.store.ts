import { IAppState } from '@/interfaces/app-state.interface';
import {ActionContext} from 'vuex';
import {ActionDataOpen, IConfirmStoreState} from '@/interfaces/confirm.interface';


type ConfirmStore = ActionContext<IConfirmStoreState, IAppState>;

export default {
  namespaced: true,

  state: {
    title: '',
    text: '',
    class: '',
    cancel: {
      text: '',
      rootAction: null,
      payload: null,
      type: null,
      icon: null,
      borderColor: null,
      bgColor: null,
    },
    confirm: {
      text: '',
      rootAction: null,
      payload: null,
      action: null,
      type: null,
      icon: null,
      borderColor: null,
      bgColor: null,
    },
    isVisible: false
  },

  mutations: {
    open (state: any, data: ActionDataOpen) {
      data = Object.assign( {
        title: 'Подтверждение',
        class: 'default',
        cancel: {
          text: 'Отменить',
          rootAction: null,
          payload: null
        },
        confirm: {
          text: 'Подтвердить',
          rootAction: null,
          payload: null,
          action: null,
        }
      }, data);

      state.title = data.title;
      state.text = data.text;
      state.cancel = data.cancel;
      state.confirm = data.confirm;
      state.isVisible = true;
      state.class = data.class;
    },

    close (state: any) {
      state.title = '';
      state.text = '';
      state.cancelText = '';
      state.confirmText = '';
      state.isVisible = false;
    }
  },

  actions: {
    open ({ commit }: ConfirmStore, data: ActionDataOpen) {
      commit('open', data);
    },

    confirm ({ state, commit, dispatch }: ConfirmStore) {
      if (state.confirm.action) {
        state.confirm.action();
      }
      else {
        if (state.confirm.rootAction) {
          dispatch(state.confirm.rootAction, state.confirm.payload, {root: true});
        }
      }
      commit('close');
    },

    cancel ({ state, commit, dispatch }: ConfirmStore) {
      if (state.cancel.rootAction) {
        dispatch(state.cancel.rootAction, state.cancel.payload, { root: true });
      }

      commit('close');
    }
  }
};
