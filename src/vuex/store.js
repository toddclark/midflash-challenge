import Vue from 'vue';
import Vuex from 'vuex';

import org from './modules/org';
import user from './modules/user';

Vue.use(Vuex);

/* eslint-disable no-new, new-cap */
export default new Vuex.Store({
  modules: {
    org,
    user,
  },
  strict: true,
});
