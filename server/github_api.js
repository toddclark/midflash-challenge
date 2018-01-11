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

  getRepoDetails(token, org) {
    return new Promise((resolve, reject) => {
      request({
        url: `https://api.github.com/?access_token=${token}`,
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