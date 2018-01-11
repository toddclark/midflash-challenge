<template>
  <v-app id="app" light>
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  created() {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (username && token) {
      this.$store.dispatch('signIn', { username, token });
    }
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  margin: 0px;
  padding: 0px;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
