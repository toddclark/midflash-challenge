<template>
  <div class="login-page">
    <Header :showControls="false"></Header>
    <v-container fluid>
      <v-layout row fill-height align-center>
        <v-flex xs12 md4 offset-md4>
          <v-card v-show="!loggedIn">
            <v-toolbar color="indigo" dark>
              <v-toolbar-title>Sign In to GitHub</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                label="Username"
                class="mt-5"
                v-model="name"
                :rules="[() => name.trim().length > 0 || name.trim().length > 39 || 'This field is required']"
                @keyup.enter="signIn"
                required
              ></v-text-field>
              <v-text-field
                label="Access Token"
                class="mt-5"
                v-model="token"
                :rules="[() => token.trim().length > 0 || 'This field is required']"
                required
                @keyup.enter="signIn"
              ></v-text-field>
            </v-card-text>
            <v-alert class="login-error" color="error" :value="loginError" transition="slide-y-transition">
              {{loginError}}
            </v-alert>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="signIn">Submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Header from '@/components/Header';

import { mapGetters } from 'vuex';

export default {
  components: {
    Header,
  },
  name: 'LoginPage',
  data() {
    return {
      name: '',
      token: '',
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: 'isUserLoggedIn',
      loginError: 'getLoginError',
      userName: 'getUserName',
      userToken: 'getUserToken',
    }),
  },
  watch: {
    loggedIn(val) {
      if (val) this.$router.push({ name: 'home' });
    },
  },
  created() {
    this.name = this.userName;
    this.token = this.userToken;
  },
  methods: {
    signIn() {
      this.$store.dispatch('signIn', { username: this.name, token: this.token });
    },
  },
};
</script>

<style scoped lang="scss">
  .login-page {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .login-error {
    font-weight: bold;
  }
</style>
