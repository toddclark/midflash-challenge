'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const requestIp = require('request-ip');
const routes = require('./server/routes');

const port = process.env.PORT || 8081;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(requestIp.mw());

app.use('/api', routes);

const server = app.listen(port, function(){
  console.log('Express listening on port ' + port);
});