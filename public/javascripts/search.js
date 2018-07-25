var express = require('express');
var app = express();


var app = {
  
  Get: function () {
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

  
/**
  * When the document has been loaded...
  */
jQuery(document).ready(function () {
  query = new app.Get[query](); /* Instantiate the Posts Class */
  query.init(); /* Load Posts class methods */
});

