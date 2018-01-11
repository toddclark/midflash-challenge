<template>
  <div class="home">
    <Header></Header>
    <v-container grid-list-md text-xs-center fluid>
      <h3 v-if="!loggedIn">
        Hello! Please sign in using your GitHub username and access token.
      </h3>

      <v-flex md10 offset-md1 xs12>
        <org-data v-if="loggedIn"></org-data>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import Header from '@/components/Header';
import OrgData from '@/components/OrgData';

import { mapGetters } from 'vuex';

export default {
  components: {
    Header,
    OrgData,
  },
  name: 'Home',
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      loggedIn: 'isUserLoggedIn',
    }),
  },
};
</script>

<style scoped lang="scss">
  .home {
    margin: 0;
    padding: 0;
    width: 100%;
  }
</style>
