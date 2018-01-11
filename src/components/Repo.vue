<template>
  <div class="login-page">
    <Header :showControls="false"></Header>
    
    <v-container grid-list-md text-xs-left>
      <v-layout row wrap>
        <v-flex xs12>
          <v-btn icon light  @click="goHome" class="mb-4 ml-0">
            <v-icon color="grey darken-2">arrow_back</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-card class="pa-4">
            <v-layout row wrap>
              <v-flex tag="h1" class="headline" align-center>
                {{repoData.full_name}}
                <a class="link" :href="repoData.clone_url | removeAPIFromURL" target="_blank">
                  <v-icon color="grey darken-2">launch</v-icon>
                </a>
              </v-flex>
              <v-flex xs12 class="mb-4">{{repoData.description}}</v-flex>
              <v-flex xs6>
                Open Issues: {{repoData.open_issues_count}}
              </v-flex>
            </v-layout>
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
  components: { Header },
  name: 'Repo',
  data() {
    return {};
  },
  props: ['id'],
  computed: {
    ...mapGetters({
      issues: 'getRepoIssues',
      repos: 'getOrgRepos',
      stargazers: 'getRepoStargazers',
      userToken: 'getUserToken',
    }),
    repoData() {
      return this.repos.find(repo => repo.id == this.id);
    },
  },
  filters: {
    removeAPIFromURL(val) {
      return val.replace(/\.git$/i, '');
    },
  },
  created() {
    this.$store.dispatch('loadRepoData', { token: this.userToken, owner: this.repoData.owner.login, name: this.repoData.name });
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'home' });
    },
  },
};
</script>

<style scoped lang="scss">
  .link {
    text-decoration: none;
  }
</style>
