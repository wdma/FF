//Retrieve
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Fay"

var query = {"species.species_name":"Homo sapiens", "topics.topic":"Audiograms"};


//Connect to the db
MongoClient.connect("mongodb://localhost:27017/Fay", function(err,db) 
{
  if(err)throw err;
  db.collection('records').find(query).toArray(function(err,result){
    if (err) throw err;
    console.log(result);
    db.close();
  });
})
