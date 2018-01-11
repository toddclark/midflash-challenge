import Vue from 'vue';
import * as types from '../mutations';

const initialState = {
  loggedIn: false,
  loginData: {},
  loginError: '',
  username: '',
  token: '',
};

const getters = {
  isUserLoggedIn: state => state.loggedIn,
  getLoginError: state => state.loginError,
  getUserName: state => state.username,
  getUserToken: state => state.token,
};

const actions = {
  setUserLoggedIn({ commit }, isLoggedIn) {
    commit(types.SET_USER_LOGGED_IN, isLoggedIn);
  },
  signIn({ commit }, { username, token }) {
    /*
    EC - invalid username
    - Github username may only contain alphanumeric characters or hyphens.
    - Github username cannot have multiple consecutive hyphens.
    - Github username cannot begin or end with a hyphen.
    - Maximum is 39 characters
    */
    if (!username || /([^\w-])|(^-)|(-$)|(--+)/.test(username) || username.length > 39) {
      commit(types.SET_LOGIN_ERROR, 'Invalid credentials.');
      return;
    }

    // EC - invalid token
    if (!token) {
      commit(types.SET_LOGIN_ERROR, 'Invalid credentials.');
      return;
    }

    // clear user error message
    commit(types.SET_LOGIN_ERROR, null);

    // Attempt login with entered infos
    Vue.axios.post('http://127.0.0.1:8081/api/login', {
      token,
      username,
    })
    .then(() => {
      commit(types.SET_SIGNED_IN, { username, token });
      commit(types.SET_USER_LOGGED_IN, true);
    })
    .catch((response) => {
      commit(types.SET_LOGIN_ERROR, response.error || 'Invalid credentials');
    });
  },
  signOut({ commit }) {
    commit(types.SET_SIGNED_OUT);
    commit(types.SET_USER_LOGGED_IN, false);
  },
};

const mutations = {
  [types.SET_LOGIN_ERROR](state, error) {
    state.loginError = error || '';
  },
  [types.SET_USER_LOGGED_IN](state, isLoggedIn) {
    state.loggedIn = isLoggedIn || false;
  },
  [types.SET_SIGNED_IN](state, { username, token }) {
    state.username = username || '';
    state.token = token || '';

    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
  },
  [types.SET_SIGNED_OUT](state) {
    state.username = '';
    state.token = '';

    localStorage.removeItem('username');
    localStorage.removeItem('token');
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
