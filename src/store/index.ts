import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth.store';
import error from './modules/error.store';
import personalArea from './modules/personalArea.store';
import analyzes from './modules/analyzes.store';
import confirm from './modules/confirm.store';
import storage from './modules/storage.store'
import orders from './modules/orders.store';
import staticVariables from './modules/static-variables.store';
import documents from './modules/documents.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    error,
    personalArea,
    analyzes,
    confirm,
    storage,
    orders,
    staticVariables,
    documents,
  }
})
