import Vue from 'vue'
import Vuex from 'vuex'
import medicalCard from './modules/medical-card.store';
import userCard from './modules/user-card.store';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    medicalCard,
    userCard,
  }
})
