import Vue from 'vue';
import Vuex from 'vuex';

import org from './modules/org';
import repo from './modules/repo';
import user from './modules/user';

Vue.use(Vuex);

/* eslint-disable no-new, new-cap */
export default new Vuex.Store({
  modules: {
    org,
    repo,
    user,
  },
  strict: true,
});
