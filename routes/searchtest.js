//Retrieve
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Fay"

// //////////////////////////////////////////////////////////
<!DOCTYPE html>
<html>
<head>
<script>
function getOption() {
    var field = document.getElementById("fname");
    var value = document.getElementById("val").value;
    var alias = {
      'Author': 'authors.author_name',
      'Species': 'species.species_name',
      'Topic': 'topics.topic'
    }    
    var temp = field.options[field.selectedIndex].text
    
    document.getElementById("output").innerHTML = 
    "{" + alias[temp] + ":" + value + "}";
}
</script>
</head>
<body>

<form>
Field  :
<select id="fname">
  <option>Author</option>
  <option>Species</option>
  <option>Topic</option>
</select>
<br>
Value: <input type="text" id="val" value="<text>"><br>
<br><br>
<input type="button" onclick="getOption()" value="Submit">
</form>

<p id="output"></p>

</body>
</html>
// ///////////////////////////////////////////////////////

var query = "{" + alias[temp] + ":" + value + "}";


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
