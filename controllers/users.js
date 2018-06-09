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

var Usuario = function(nombre,apellido,username,email) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.username = username;
    this.email = email;
  }


var DecoratedUsuario = function(user, role) {
   this.user = user;
   this.role = role;
}

var Iterator = function(items) {
  this.index = 0;
  this.items = items;
}

Iterator.prototype = {
    first: function() {
      this.reset();
      return this.next();
    },
    next: fucntion(){
      return this.items[this.index++];
    },
    hasNext: function() {
      this.index = 0;
    },
    reset: function() {
      this.index = 0;
    },
    each: function(callback) {
      for (var item = this.first(); this.hasNext(); item = this.next()){
          callback(item);
      }
    }
}

function run(items) {
    var iter = new Iterator(items);
    for (var item = iter.first(); iter.hasNext(); item = iter.next()) {
        log.add(item);
    }

    log.show();
}

var Singleton = (function () {
    var instance;

    function createInstance() {
        var object = new Usuario();
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

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
