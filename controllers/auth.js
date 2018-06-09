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

function singIn(req,res,next) {
  db.oneOrNone('select * from usuario where username=${username} and password=${password}',req.body)
  .then((data)=>{
    if(data!=null){
      req.user = data;
      res.status(200).send({
        message: 'Te has logueado correctamente',
        token: service.createToken(data)
      })
    }
  })

}

function singUp(req,res,next) {
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
  singIn,
  singUp
}
