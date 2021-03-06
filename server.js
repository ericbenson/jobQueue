var express = require('express');
var bodyParser = require('body-parser');

var client = require('./server/mongo.js');
var queue = require('./server/queue.js');
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
    collection.count(function(err, count) {
      queue = queue(count);

      app.post('/enterURL', function(req, res){
        id = queue.enqueue(req.body.url);
        res.send(''+id);
      });

      app.post('/checkID', function(req, res){
        checkStatus(collection, Number(req.body.id), queue, function(status){
          res.send(status);     
        });
      });
		});

		app.use(express.static(__dirname +'/client'));

		var port = 8000;

		app.listen(port, function(){

			console.log('listening on port 8000');
        
        //run worker every 5 seconds to clear the queue
        setInterval(function(){
          for(var i=0; i<queue.size(); i++){
            worker(collection, queue);
          }
        },5000);

		});


  });
});





