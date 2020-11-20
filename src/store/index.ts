import Vue from 'vue'
import Vuex from 'vuex'
import medicalCard from './modules/medical-card.store';
import userCard from './modules/user-card.store';
import auth from './modules/auth.store';
import error from './modules/error.store';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    medicalCard,
    userCard,
    auth,
    error
  }
})
