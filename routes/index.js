var express = require('express');
var router = express.Router();
var rootdir = (__dirname + '/../');
const pug = require('pug');
      

/* GET data page. */
/*router.get('/records', (req,res) => {
    var db = req.db;
    var collection = db.get('records');
    console.log("hi")
    
    var field = document.getElementById("fname");
    console.log("hi")
    console.log(field)
    var value = document.getElementById("val").value;
    var alias = {
      'Author': 'authors.author_name',
      'Species': 'species.species_name',
      'Topic': 'topics.topic'
      }    
    var temp = field.options[field.selectedIndex].text

    req = "{" + alias[temp] + ":" + value + "}";

    // collection.find({"authors.author_id" : 695},{},function(e,docs){
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});
*/
/* GET Home page. */
router.get('/', (req,res) => {
    res.render(rootdir + 'views/index',{name: 'Home'})
});

module.exports = router;

