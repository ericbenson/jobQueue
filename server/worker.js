var request = require('request'); 

module.exports = function(collection, queue){

  var url = queue.dequeue();

  request(url.url, function(error, response, body){
    if(error){
      console.err(error); 
    } else {
      // Here's the document we want to insert:
      var document = {id  : url.id,
                      url : url.url,
                      html: body};

      // Insert it to the collection:
      collection.insert(document, function(err, docs) {
        console.log("Inserted a document.");

      });

    }
  });

};

