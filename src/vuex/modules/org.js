import Vue from 'vue';
import * as types from '../mutations';

const initialState = {
  members: [],
  repos: [],
  valid: false,
};

const getters = {
  getOrgMembers: state => state.members,
  getOrgRepos: state => state.repos,
  isOrgValid: state => state.valid,
};

const actions = {
  loadOrgData({ commit }, { token, org }) {
    commit(types.SET_ORG_MEMBERS, []);
    commit(types.SET_ORG_REPOS, []);

    // EC - invalid token
    if (!org) {
      commit(types.SET_ORG_VALID, false);
      return;
    }

    // Attempt login with entered infos
    Vue.axios.get(`http://127.0.0.1:8081/api/org/${org}?token=${token}`)
    .then((orgData) => {
      commit(types.SET_ORG_MEMBERS, orgData.data.members || []);
      commit(types.SET_ORG_REPOS, orgData.data.repos || []);
      commit(types.SET_ORG_VALID, true);
    })
    .catch(() => {
      commit(types.SET_ORG_VALID, false);
    });
  },
};

const mutations = {
  [types.SET_ORG_MEMBERS](state, members) {
    state.members = members || false;
  },
  [types.SET_ORG_REPOS](state, repos) {
    state.repos = repos || false;
  },
  [types.SET_ORG_VALID](state, valid) {
    state.valid = valid || false;
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
