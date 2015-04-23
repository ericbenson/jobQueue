var express = require('express');

var app = express();

app.get('/', function(req, res){
	res.sendFile(__dirname +'/client/index.html');
});

app.use(express.static(__dirname +'/client'));

var port = 8000;

app.listen(port, function(){

	console.log('listening on port 8000');
});