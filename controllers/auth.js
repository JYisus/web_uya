'use strict'
var promise = require('bluebird');
var options = { promiseLib:promise };
var pgp = require('pg-promise')(options);
var bcrypt = require('bcrypt-nodejs');
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'yisus',
    user: 'yisus',
    password: 'merioentucara'
};
var connectionString = process.env.DATABASE_URL || cn;
var db = pgp(connectionString);

const service = require('../services/token.js');

function singIn(req,res,next) {
  let usuario = req.body
  db.oneOrNone('select * from usuario where username=${username}',usuario)
  .then((data)=>{
    if((data!=null)&& bcrypt.compareSync(usuario.password,data.password)){
      req.user = data.password;
      res.status(200).send({
        message: 'Te has logueado correctamente',
        token: service.createToken(data)
      })
    }
    else{
      res.send({
        message: 'Nombre o contraseña no válido',
        codigo: 1
      })
    }
  })

}

function singUp(req,res,next) {
  db.oneOrNone('select max(id) from usuario')
  .then(function(data){
    if(data.max!=null){
      var nuevo_id = parseInt(data.max);
    }
    else
      var nuevo_id = 0;

      var nuevoUsuario = req.body;
      var hashPassword = bcrypt.hashSync(nuevoUsuario.password);
      nuevoUsuario.password = hashPassword
      nuevoUsuario.id = nuevo_id+1
    	db.none('insert into usuario(nombre,apellido,username,password,email,id)' + 'values(${name},${surname},${username},${password},${email},${id})',nuevoUsuario)
    	.then(function(){
    		res.status(200)
    		.json({
    			status: 'success',
    			message: 'Usuario creado'
    		});
    	});
    })
    .catch(function(err){
      return next(err);
    });
}

function crearMusico(req,res,next) {
  db.oneOrNone('select max(id) from musicos')
    .then(function(data){
      if(data.max!=null){
        var nuevo_id = parseInt(data.max);
      }
      else{
        var nuevo_id = 0;
      }
      var nuevoAnuncio = req.body;
      nuevoAnuncio.id = nuevo_id+1
      db.none('insert into musicos(username,anuncio,lugar,instrumento,id)' + 'values(${username},${anuncio},${lugar},${instrumento},${id})',nuevoAnuncio)
      .then(function(){
        res.status(200)
        .json({
          status: 'success',
          message: 'Usuario creado'
        });
      });
    })
    .catch(function(err){
      return next(err);
    });
}

function crearGrupo(req,res,next) {
  db.oneOrNone('select max(id) from grupos')
    .then(function(data){
      if(data.max!=null){
        var nuevo_id = parseInt(data.max);
      }
      else{
        var nuevo_id = 0;
      }
      var nuevoAnuncio = req.body;
      nuevoAnuncio.id = nuevo_id+1
      db.none('insert into grupos(grupo,anuncio,genero,lugar,id)' + 'values(${grupo},${anuncio},${genero},${lugar},${id})',nuevoAnuncio)
      .then(function(){
        res.status(200)
        .json({
          status: 'success',
          message: 'Grupo creado'
        });
      });
    })
    .catch(function(err){
      return next(err);
    });
}

function crearOpinion(req,res,next) {
  db.oneOrNone('select max(id) from opiniones')
    .then(function(data){
      if(data.max!=null){
        var nuevo_id = parseInt(data.max);
      }
      else{
        var nuevo_id = 0;
      }
      var nuevaOpinion = req.body;
      nuevaOpinion.id = nuevo_id+1
      db.none('insert into opiniones(username,opinion,id)' + 'values(${username},${opinion},${id})',nuevaOpinion)
      .then(function(){
        res.status(200)
        .json({
          status: 'success',
          message: 'Opinión creado'
        });
      });
    })
    .catch(function(err){
      return next(err);
    });
}

module.exports = {
  singIn,
  singUp,
  crearMusico,
  crearGrupo,
  crearOpinion
}
