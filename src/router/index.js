import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/Home';
import LoginPage from '@/components/LoginPage';
import Repo from '@/components/Repo';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/repo/:id',
      name: 'repo',
      component: Repo,
      props: true,
    },
  ],
});
