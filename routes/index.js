'use strict'

const express = require('express');
const userCtrl = require('../controllers/users')
const authCtrl = require('../controllers/auth')
const api = express.Router();
const auth = require('../middlewares/auth');
api.get('/',function(req,res,next){
	res.sendFile(__dirname + '/public/index.html');
});
api.get('/all',auth,userCtrl.getUsers);
api.get('/usuario/:id', userCtrl.getUser);
api.post('/singin', authCtrl.singIn);
api.post('/singup', authCtrl.singUp);

module.exports = api;
