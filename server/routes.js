'use strict';

const chalk = require('chalk');
const express = require('express');
const _get = require('lodash.get');
const githubAPI = require('./github_api');
const moment = require('moment');

const routes = express.Router();

////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE
////////////////////////////////////////////////////////////////////////////////

routes.use((req, res, next) => {
  process.stdout.write(chalk.gray(`[${moment().format('YYYYMMDD_HH:mm')}] ${req.clientIp} @ ${req.originalUrl} -- `));
  res.on('finish', () => process.stdout.write('\n'));
  next();
});

////////////////////////////////////////////////////////////////////////////////
// ROUTES
////////////////////////////////////////////////////////////////////////////////

/*
  /login
*/
routes.route('/login').post(function (req, res) {
  const token = _get(req, 'body.token', null);
  const username = _get(req, 'body.username', null);

  // EC - invalid token 
  if (typeof token !== 'string' || !token) {
    res.status(500).json({'error':'Invalid token'});
    return;
  }

  // EC - invalid username
  if (typeof username !== 'string' || !username) {
    res.status(500).json({'error':'Invalid username'});
    return;
  }

  githubAPI.login(token)
  .catch((err) => {
    console.log(chalk.red('failed login -', err));
    res.status(401).json({'error': err});
  })
  .then((responseData) => {
    let userLogin = _get(responseData, 'login');
    if (userLogin === username) {
      console.log(chalk.green('successfully logged in'));
      res.status(200).json({'success': true});
      return;
    }

    let message = _get(responseData, 'message');
    console.log(chalk.red('failed login -', message || 'Invalid credentials'));
    res.status(500).json({'error': message || 'Invalid credentials'});
  });
});

routes.route('/org/:org').get(function (req, res) {
  const token = _get(req, 'query.token', null);

  // EC - invalid token 
  if (typeof token !== 'string' || !token) {
    res.status(401).json({'error':'Invalid token'});
    return;
  }

  const org = _get(req, 'params.org', null);

  // EC - invalid org 
  if (typeof org !== 'string' || !org) {
    res.status(500).json({'error':'Invalid organization name'});
    return;
  }

  Promise.all([
    githubAPI.getOrgMembers(token, org),
    githubAPI.getOrgRepos(token, org)
  ])
  .catch((err) => {
    console.log(chalk.red('failed to retrieve org data -', err));
    res.status(500).json({'error': err});
  })
  .then((results) => {
    // EC - invalid results
    if (!Array.isArray(results) || results.length < 2) {
      res.status(500).json({'error': 'Invalid github api response'});
      return;
    }

    let members = Array.isArray(results[0]) 
      ? results[0].map(member => {
          return {
            login: member.login, 
            avatarUrl: member.avatar_url
          };
        })
      : [];

    let repos = Array.isArray(results[1]) 
      ? results[1].sort((a, b) => {
        return a.name.localeCompare(b.name);
      })
      : [];

    res.status(200).json({ members, repos });
  });
});

routes.route('/repository/:repo').get(function (req, res) {
  const token = _get(req, 'query.token', null);

  // EC - invalid token 
  if (typeof token !== 'string' || !token) {
    res.status(500).json({'error':'Invalid token'});
    return;
  }

});

routes.route('/ping').get(function (req, res) {
  console.log(chalk.cyan('pinged!'));
  res.status(200).json({'message':`Hello ${req.clientIp}`});
});

routes.use((req, res, next) => {
  process.stdout.write('\n');
  next();
});

module.exports = routes;