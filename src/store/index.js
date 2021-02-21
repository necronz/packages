import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

import table from './modules/table';
import modal from './modules/modal';

export default new Vuex.Store({
  modules: {
    table,
    modal,
  }
});
