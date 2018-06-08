'use strict'
var promise = require('bluebird');
var options = { promiseLib:promise };
var pgp = require('pg-promise')(options);
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

function getUsers(req,res,next) {
  db.any('select username from usuario')
    .then(function(data){
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Obtenidos todos los datos'
      });
  })
  .catch(function(err){
    return next(err);
  });
}

function singUp(req,res,next) {
  var nuevoUsuario = req.body;
	db.none('insert into usuario(nombre,apellido,username,password,email)' + 'values(${name},${surname},${username},${password},${email})',nuevoUsuario)
	.then(function(){
		res.status(200)
		.json({
			status: 'success',
			message: 'Usuario creado'
		});
	});
}

function singUp(req,res,next) {
  db.oneOrNone('select max(id) from usuario')
  .then(function(data){
    var nuevo_id = data.id;
    });
  });
  console.log(nuevo_id);
  var nuevoUsuario = req.body;

	db.none('insert into usuario(nombre,apellido,username,password,email)' + 'values(${name},${surname},${username},${password},${email})',nuevoUsuario)
	.then(function(){
		res.status(200).send({tol})
		.json({
			status: 'success',
			message: 'Usuario creado'
		});
	});
}

module.exports = {
  getUsers,
  getUser,
  createUser
}
