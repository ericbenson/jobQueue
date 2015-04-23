module.exports = function(collection, id, callback){

	// Find() returns a "cursor" which can be converted to an array of
	// documents:
	collection.find({id: id}).toArray(function(err, results) {
	  // Results is an array of all the documents in the collection
    if(results.length === 0){
      callback({msg: true, text: 'Your request is still processing'}); 
    } else {
      if(!results[0].error){
        callback({msg: false, html: results[0].html});       
      } else {
        callback({msg: true, text: 'Invalid URL Input'});
      }
    }

	});
};