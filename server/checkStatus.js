module.exports = function(collection, id, callback){

	// Find() returns a "cursor" which can be converted to an array of
	// documents:
	collection.find({id: id}).toArray(function(err, results) {
	  // Results is an array of all the documents in the collection
    if(results.length === 0){
      callback(false); 
    } else {
      callback(results[0].html);
    }

	});
};