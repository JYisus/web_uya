var express=require('express');
var app=express();
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados

const port = process.env.PORT || 3000

app.get('/',function(req,res){
	res.sendfile(__dirname + '/public/index.html');
});

function maximo(parsed) {
	var length = Object.keys(parsed).length;
	var maximo = 0;
	for (var i = 0; i < length; i++) {
		if(parsed[i]["nid"] > maximo)
		{
			maximo = parsed[i]["nid"];
		}
	}
	return maximo;
}

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
	res.sendfile(__dirname + '/public/index.html');
});
//funcion para css,js,imagenes...
app.use(express.static("public"));

app.listen(port);

console.log("Servidor Express escuchando en modo %s",app.settings.env);
