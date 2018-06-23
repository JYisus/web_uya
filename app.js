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
app.get('/anunciarMusico',(req,res,next)=>{
	res.sendFile(__dirname +'/public/crear_anuncio_musicos.html');
})
app.get('/anunciarGrupo',(req,res,next)=>{
	res.sendFile(__dirname +'/public/crear_anuncio_grupo.html');
})
app.get('/registro',(req,res,next)=>{
	res.sendFile(__dirname +'/public/registro.html');
})
app.get('/musicos',(req,res,next)=>{
	res.sendFile(__dirname +'/public/musicos.html');
})
app.get('/grupos',(req,res,next)=>{
	res.sendFile(__dirname +'/public/grupos.html');
})

module.exports = app;
