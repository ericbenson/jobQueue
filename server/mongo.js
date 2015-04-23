var mongodb = require("mongodb");

var server = new mongodb.Server("127.0.0.1", 27017, {});
// 27017 is the default port for connecting to MongoDB
var client = new mongodb.Db('jobQueue', server);


module.exports = client;