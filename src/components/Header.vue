<template>
  <v-toolbar dark color="primary">
    <v-toolbar-title class="white--text" @click="home">Mindflash Coding Challenge</v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="sign-in" v-show="showControls && !loggedIn">
      <router-link to="login"><v-btn flat>Sign In</v-btn></router-link>
    </div>
    <div class="user-info" v-show="loggedIn">
      <v-menu bottom left>
        <v-btn slot="activator">
          <v-icon class="pr-3">child_care</v-icon>
          <div>{{username}}</div>
        </v-btn>
        <v-list>
          <v-list-tile @click="signOut">Sign Out</v-list-tile>
        </v-list>
      </v-menu>
    </div>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {};
  },
  props: {
    showControls: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters({
      loggedIn: 'isUserLoggedIn',
      username: 'getUserName',
    }),
  },
  methods: {
    home() {
      this.$router.push({ name: 'home' });
    },
    signOut() {
      this.$store.dispatch('signOut');
      this.home();
    },
  },
};
</script>

<style scoped lang="scss">
  .toolbar__title {
    cursor: pointer;
  }
</style>
