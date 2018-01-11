import Vue from 'vue';
import * as types from '../mutations';

const initialState = {
  issues: [],
  stargazers: [],
};

const getters = {
  getRepoIssues: state => state.issues,
  getRepoStargazers: state => state.stargazers,
};

const actions = {
  loadRepoData({ commit }, { token, owner, name }) {
    commit(types.SET_REPO_ISSUES, []);
    commit(types.SET_REPO_STARGAZERS, []);

    // Attempt login with entered infos
    Vue.axios.get(`http://127.0.0.1:8081/api/repo_extras/${owner}/${name}?token=${token}`)
    .then((repoData) => {
      console.log(repoData);
      commit(types.SET_REPO_ISSUES, repoData.issues || []);
      commit(types.SET_REPO_STARGAZERS, repoData.stargazers || []);
    });
  },
};

const mutations = {
  [types.SET_REPO_ISSUES](state, issues) {
    state.issues = issues;
  },
  [types.SET_REPO_STARGAZERS](state, stargazers) {
    state.stargazers = stargazers;
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
