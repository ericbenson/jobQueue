var express = require('express');
var bodyParser = require('body-parser');

var client = require('./server/mongo.js');
var queue = require('./server/queue.js')();
var checkStatus = require('./server/checkStatus.js');
var worker = require('./server/worker.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Open the client's connection to the server:
client.open(function(err, p_client) {
  console.log("Connected to MongoDB!");

  // Create a collection, if it doesn't exist already:
  client.createCollection("websites", function(err, collection) {
    console.log("Created collection");

		app.post('/enterURL', function(req, res){
			console.log(req.body);
			id = queue.enqueue(req.body);
			res.sendStatus(id);
		});

		app.post('/checkID', function(req, res){
      console.log(req.body.id);
      checkStatus(collection, Number(req.body.id), function(status){
        console.log(status);
        if(status){
          res.send(status);
        } else {
          console.log('testing');
    			res.sendStatus(200);
        }       
      });
		});



		app.use(express.static(__dirname +'/client'));

		var port = 8000;

		app.listen(port, function(){

			console.log('listening on port 8000');
        setInterval(function(){
          for(var i=0; i<queue.size(); i++){
            console.log('working');
            worker(collection, queue);
          }
        },5000);

		});


  });
});





