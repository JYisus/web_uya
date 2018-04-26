var express=require('express');

var app=express();

const port = process.env.PORT || 3000

app.get('/',function(req,res){
	res.sendfile(__dirname + '/public/index.html');
});

app.get('/about',function(req,res){
	res.sendfile(__dirname+'/public/about.html');
});
//funcion para css,js,imagenes...
app.use(express.static("public"));

app.listen(port);

console.log("Servidor Express escuchando en modo %s",app.settings.env);