'use strict'
var express=require('express');
var app=express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados
app.use(express.static("public"));

const api = require('./routes');
app.use('/',api);
app.get('/login',(req,res,next)=>{
	res.sendFile(__dirname +'/public/login.html');
})
app.get('/registro',(req,res,next)=>{
	res.sendFile(__dirname +'/public/registro.html');
})

module.exports = app;
