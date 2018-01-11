<template>
  <v-container class="org-data" grid-list-md fluid>
    <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-text>
              <v-layout align-center justify-center>
                <v-text-field
                  label="Organization"
                  v-model="org"
                  :rules="[() => org.trim().length > 0 || 'This field is required']"
                  required
                  @keyup.enter="loadOrgData"
                ></v-text-field>
                <v-btn color="primary" @click="loadOrgData">View Data</v-btn>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs12 md4 v-show="valid">
          <v-card>
            <v-card-title><h3>Members</h3></v-card-title>
            <v-list>
              <v-list-tile avatar v-for="member in members" :key="member.login">
                <v-list-tile-avatar>
                  <img v-bind:src="member.avatarUrl"/>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-text="member.login"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile v-if="!members.length">
                <v-list-tile-content>
                  <v-list-tile-title>No Public Members</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>

        <v-flex xs12 md8 v-show="valid">
          <v-card>
            <v-card-title><h3>Repositories</h3></v-card-title>
            <v-list>
              <v-list-tile avatar v-for="repo in repos" :key="repo.id">
                <v-list-tile-content>
                  <v-list-tile-title>
                    <router-link :to="'repo/' + repo.id">{{repo.name}}</router-link>
                  </v-list-tile-title>
                </v-list-tile-content>
                {{repo.stargazers_count}}
                <v-list-tile-avatar class="stargazers-column">
                  <v-icon color="yellow">stars</v-icon>
                </v-list-tile-avatar>
              </v-list-tile>

              <v-list-tile v-if="!repos.length">
                <v-list-tile-content>
                  <v-list-tile-title>No Public Repositories</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'OrgData',
  data() {
    return {
      org: '',
    };
  },
  computed: {
    ...mapGetters({
      members: 'getOrgMembers',
      repos: 'getOrgRepos',
      valid: 'isOrgValid',
      userToken: 'getUserToken',
    }),
  },
  watch: {
    loggedIn(val) {
      if (val) this.$router.push({ name: 'home' });
    },
  },
  methods: {
    loadOrgData() {
      this.$store.dispatch('loadOrgData', { token: this.userToken, org: this.org });
    },
  },
};
</script>

<style scoped lang="scss">
  .count {
    color: gray;
  }
</style>
