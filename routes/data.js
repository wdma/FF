var express = require('express');
var app = express();
var router = express.Router();
var rootdir = (__dirname + '/../');
const pug = require('pug');
      

/* GET data page. */
router.get('/records', (req,res) => {
    var db = req.db;
    var collection = db.get('records');
    
    /*var field = document.getElementById("fname");
    console.log(field)
    var value = document.getElementById("val").value;
    var alias = {
      'Author': 'authors.author_name',
      'Species': 'species.species_name',
      'Topic': 'topics.topic'
      }    
    console.log("3")
    var temp = field.options[field.selectedIndex].text

//    document.getElementById("output").innerHTML = 
//    "{" + alias[temp] + ":" + value + "}";
    console.log("4")
    req = "{" + alias[temp] + ":" + value + "}";
    console.log("5")
    console.log(req)
   */ 
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/* GET data page. */
router.get('/data', (req,res) => {
    var db = req.db;
    var collection = db.get('records');
    collection.find({"authors.author_id" : 695},{},function(e,docs){
        res.json(docs);
    });
});

module.exports = router;

