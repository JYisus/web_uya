var restify = require('restify');
var fs = require('fs'); 

const port = process.env.PORT || 3000;

var server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/productos/all',(req,res,next)=>{
	var datos = fs.readFileSync('datos.txt','utf-8');
	var parsed = JSON.parse(datos);
	res.json(parsed);
	next();
});

server.get('/productos/:id',(req,res,next)=>{
	var datos = fs.readFileSync('datos.txt','utf-8');
	var parsed = JSON.parse(datos);
	var elemento = {};
	var length = Object.keys(parsed).length; 
	for (var i = 0; i < length; i++) {
		if(parsed[i]["nid"] == parseInt(req.params.id))
		{
			elemento = parsed[i];
			break;
		}
	}
	res.json(elemento);
	next();
});


server.del('/productos/:id', (req,res,next)=>{
	var datos = fs.readFileSync('datos.txt','utf-8');
	var parsed = JSON.parse(datos);
	var length = Object.keys(parsed).length;
	for (var i = 0; i < length; i++) {
		if(parsed[i]["nid"] == parseInt(req.params.id))
		{
			parsed.splice(i,1);
			break;
		}
	}

	res.json(parsed);
	fs.writeFile('datos.txt', JSON.stringify(parsed), function (err) {
  		if (err) throw err;
  		console.log('Replaced!');
	});
	next();

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

server.post('/registro.html', (req,res,next)=>{
	var datos = fs.readFileSync('datos.txt','utf-8');
	var parsed = JSON.parse(datos);
	var nuevo = JSON.parse(req.body);
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
	res.json(parsed);
	fs.writeFile('datos.txt', JSON.stringify(parsed), function (err) {
  		if (err) throw err;
  		console.log('Replaced!');
	}); 
	next();
});

server.put('/productos/:id', (req,res,next)=>{
	var datos = fs.readFileSync('datos.txt','utf-8');
	var parsed = JSON.parse(datos);
	var nuevo = JSON.parse(req.body);

	var cadena = `{ "nid":${req.params.id}`;
	var keys = Object.keys(nuevo);
	var values = Object.values(nuevo);
	var length = Object.keys(nuevo).length;
	for(var i = 0; i<length; i++) {
		cadena+=`, "${keys[i].toString()}":"${values[i].toString()}"`;
	}
	cadena+=` }`;

	var length = Object.keys(parsed).length;
	for (var i = 0; i < length; i++) {
		if(parsed[i]["nid"] == parseInt(req.params.id))
		{
			parsed[i] = JSON.parse(cadena);
			break;
		}
	}

	res.json(parsed);
	fs.writeFile('datos.txt', JSON.stringify(parsed), function (err) {
  		if (err) throw err;
  		console.log('Replaced!');
	});
	next();

});

server.listen(port, function() {
	console.log('%s escuchando en %s', server.name, server.url);
});
