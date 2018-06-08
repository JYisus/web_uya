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

function getUser(req,res,next) {
  var nombreUsuario = req.params.id;
	db.any('select * from usuario where username=$1',nombreUsuario)
    .then(function(data){
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Obtenidos los datos del usuario'
      });
    })
    .catch(function(err){
      return next(err);
    });
}

function createUser(req,res,next) {
  db.oneOrNone('select max(id) from usuario')
  .then(function(data){
    if(data!=null){
      console.log(data.max);
      var nuevo_id = parseInt(data.max);
    }
    else
      var nuevo_id = 0;

      console.log(nuevo_id);
      var nuevoUsuario = req.body;
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

module.exports = {
  getUsers,
  getUser,
  createUser
}
