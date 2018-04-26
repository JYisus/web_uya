var express=require('express');

var app=express();

app.get('/',function(req,res){
	res.sendfile(__dirname + '/public/index.html');
});

app.get('/about',function(req,res){
	res.sendfile(__dirname+'/public/about.html');
});
//funcion para css,js,imagenes...
app.use(express.static("public"));

app.listen(3000);

console.log("Servidor Express escuchando en modo %s",app.settings.env);