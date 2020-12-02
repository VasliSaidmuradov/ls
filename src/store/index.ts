import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth.store';
import error from './modules/error.store';
import personalArea from './modules/personalArea.store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    error,
    personalArea
  }
})
