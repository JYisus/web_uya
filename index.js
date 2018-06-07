var express=require('express');
var app=express();
var fs = require('fs');
var bodyParser = require('body-parser');
var promise = require('bluebird');
var options = { promiseLib:promise };
var pgp = require('pg-promise')(options);

var connectionString = process.env.DATABASE_URL || 'postgres://tlpnsonspbxpwp:2fa19f6c093e7ae269dde9370e094234da07a79ceee0f2409109e9527d048c66@ec2-54-228-181-43.eu-west-1.compute.amazonaws.com:5432/d236h6ich8audp';
var db = pgp(connectionString);
app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados

const port = process.env.PORT || 3000

/*const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://tlpnsonspbxpwp:2fa19f6c093e7ae269dde9370e094234da07a79ceee0f2409109e9527d048c66@ec2-54-228-181-43.eu-west-1.compute.amazonaws.com:5432/d236h6ich8audp',
  ssl: true,
});
client.connect();
client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
*/

var logged = 0;

app.get('/',function(req,res){
	res.sendFile(__dirname + '/public/index.html');
});

function maximo() {
	db.any('select id from usuario')
	.then(function(data){
		console.log(data);
		return parseInt(data[data.length-1])+1;
	})
	.catch(function(err){
		return next(err);
	})
}
app.post('/login',function(req,res){
	var datos = fs.readFileSync('datos.txt','utf-8');
	var parsed = JSON.parse(datos);
	console.log(req.body);
	var length = Object.keys(parsed).length;
	for (var i = 0; i < length; i++) {
		if(parsed[i]["usuario"] == req.params.username)
		{
			if(parsed[i]["password"] == req.params.password)
			{
				res.sendfile(__dirname + '/public/index_logged.html');
				return ;
			}
			else {
				res.sendfile(__dirname + '/public/login.html');
				return ;
			}
			break;
		}
	}
	res.sendfile(__dirname + '/public/login.html');

});

app.get('/all', (req,res,next)=>{
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
});

app.get('/usuario/:id',(req,res,next)=>{
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
});

app.post('/usuario',(req,res,next)=>{
	nuevoUsuario = req.body;
	nuevoUsuario.id = maximo();
	console.log(nuevoUsuario.id);
	db.none('insert into usuario(nombre,apellido,username,password,email,id)' + 'values(${name},${surname},${username},${password},${email},${id})',nuevoUsuario)
	.then(function(){
		res.status(200)
		.json({
			status: 'success',
			message: 'Usuario creado'
		});
	});
});


/*
app.post('/registrarse',function(req,res){

	console.log(req.body);
	var nuevo = req.body;
	var nuevo_nid = 1;
	var keys = Object.keys(nuevo);
	var values = Object.values(nuevo);
	var length = Object.keys(nuevo).length;
	for(var i = 0; i<length; i++) {
		values.push(values[i].toString());
	}

	query = {
		text: 'INSERT INTO usuario VALUES ($1,$2,$3,$4,$5,$6)',
		values: [values[0].toString(),values[1].toString(),values[3].toString(),values[4].toString(),values[2].toString(),nuevo_nid]
	}

	client.query(query, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
  }
})
	logged = 1;
	res.sendFile(__dirname + '/public/index_logged.html');
});*/
/*
app.post('/registrarse',function(req,res){
	var datos = fs.readFileSync('datos.txt','utf-8');
	var parsed = JSON.parse(datos);
	console.log(req.body);
	var nuevo = req.body;
	var nuevo_nid = maximo(parsed) + 1;
	var cadena = `{ "nid":${nuevo_nid.toString()}`;
	var keys = Object.keys(nuevo);
	var values = Object.values(nuevo);
	var length = Object.keys(nuevo).length;
	for(var i = 0; i<length; i++) {
		cadena+=`, "${keys[i].toString()}":"${values[i].toString()}"`;
	}
	cadena+=` }`;

	parsed.push(JSON.parse(cadena));
	fs.writeFile('datos.txt', JSON.stringify(parsed), function (err) {
  		if (err) throw err;
  		console.log('Replaced!');
	});
	logged = 1;
	res.sendfile(__dirname + '/public/index_logged.html');
});*/
//funcion para css,js,imagenes...
app.use(express.static("public"));

app.listen(port);

console.log("Servidor Express escuchando en modo %s",app.settings.env);
console.log(port);
