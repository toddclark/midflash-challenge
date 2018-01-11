'use strict';

var request = require('request');

module.exports = {
  getOrgMembers(token, org) {
    return new Promise((resolve, reject) => {
      request({
        url: `https://api.github.com/orgs/${org}/members?access_token=${token}&type=public`,
        headers: {
          'User-Agent': 'request'
        },
        json: true
      }, (err, res, body) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        resolve(body);
      });
    });
  },

  getOrgRepos(token, org) {
    return new Promise((resolve, reject) => {
      request({
        url: `https://api.github.com/orgs/${org}/repos?access_token=${token}&type=public`,
        headers: {
          'User-Agent': 'request'
        },
        json: true
      }, (err, res, body) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        resolve(body);
      });
    });
  },

  getRepoIssues(token, owner, repo) {
    return new Promise((resolve, reject) => {
      console.log(`https://api.github.com/repos/${owner}/${repo}/issues?access_token=${token}`);
      request({
        url: `https://api.github.com/repos/${owner}/${repo}/issues?access_token=${token}`,
        headers: {
          'User-Agent': 'request'
        },
        json: true
      }, (err, res, body) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        resolve(body);
      });
    });
  },

  getRepoStargazers(token, owner, repo) {
    return new Promise((resolve, reject) => {
      request({
        url: `https://api.github.com/repos/${owner}/${repo}/stargazers?access_token=${token}`,
        headers: {
          'User-Agent': 'request'
        },
        json: true
      }, (err, res, body) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        resolve(body);
      });
    });
  },

  login(token) {
    return new Promise((resolve, reject) => {
      request({
        url: `https://api.github.com/user?access_token=${token}`,
        headers: {
          'User-Agent': 'request'
        },
        json: true
      }, (err, res, body) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        resolve(body);
      });
    });
  },
};