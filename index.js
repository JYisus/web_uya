'use strict'
var promise = require('bluebird');
var options = { promiseLib:promise };
const bcrypt = require('bcrypt-nodejs');
const app = require('./app');
const userCtrl = require('./controllers/users');
const port = process.env.PORT || 3000;
const auth = require('./middlewares/auth.js');

app.listen(port);

console.log("Servidor Express escuchando en modo %s",app.settings.env);
console.log(port);
