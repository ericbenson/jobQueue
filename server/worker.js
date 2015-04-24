var request = require('request'); 

module.exports = function(collection, queue){

  var url = queue.dequeue();

  if(url.url.slice(0,7)!=='http://'){
    url.url = 'http://'+url.url;
  }

  request(url.url, function(error, response, body){
    if(error){
      console.log(error);

    }
    // Here's the document we want to insert:
    var document = {id  : url.id,
                    url : url.url,
                    html: body, 
                    error: !!error};

    // Insert it to the collection:
    collection.insert(document, function(err, docs) {
      console.log("Inserted a document.");

    });
  });

};

