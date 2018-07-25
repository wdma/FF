// Global array
var BigList = [];

// DOM Ready =============================================================
jQuery(function($) {

    // Populate the user table on initial page load
    populateTable();
    
    // When the user clicks a link
    $('#dataList table tbody').on('click', 'td a.showuser', theMetadata);
    $('#dataList table tbody').on('click', 'td a.showuser', thePlot);
})(jQuery);
// Functions =============================================================

// Fill table with data
function populateTable() {
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/data/records', function( data ) {
        BigList = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#metadata" class="showuser" rel=' +  this._id + '>' + JSON.stringify(this.data_title) + " from " + JSON.stringify(this.reference[0].original_reference) + '</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#dataList table tbody').html(tableContent);
    });
};

// Show the metadata associated with the selected dataset
function theMetadata(event) {
    window.location.replace('#metadata');   
 
    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve reference name from link rel attribute
    var thisRef = $(this).attr('rel');
    
    // Get Index of object based on id value
    var arrayPosition = BigList.map(function(arrayItem) { return arrayItem._id; }).indexOf(thisRef);
    
    // Get our Reference Object and assign it to metadata and data
    // metadata will be used to fill the metadata window
    var metadata = BigList[arrayPosition];

    // data will be used to extract the data in case of download
    var data = metadata;

    // data from the above will be extracted to these arrays 
    var axis_labels = data.abcissa_label + ", " + data.ordinate_label + "\r\n"; 
    var units = data.abcissa_unit + ", " + data.ordinate_unit + "\r\n";
    var vals = [];
    var xvals = data.abcissa_value;
    var yvals = data.ordinate_value;
    
    // alert(JSON.stringify(data.reference[0].original_reference))
    // Put the data into an array for download
    data.data.forEach(function(obj) {
        vals += obj.abcissa_value + ", " + obj.ordinate_value + "; \r\n";
    });
    vals = vals.slice(0,vals.length-2);

    var ds = [axis_labels + units + vals];
 
    var topics = [];
    data.topics.forEach(function(obj) {
        topics += obj.topics + ", ";
    });
    topics = topics.slice(0,topics.length-2);

    var authors = [];
    data.authors.forEach(function(obj) {
        authors += obj.author_name + ", ";
    });
    authors = authors.slice(0,authors.length-2);

    var species = [];
    var common = [];
    data.species.forEach(function(obj) {
        species += obj.species_name + ", ";
        common += obj.common_name + ", ";
    });
    species = species.slice(0,species.length-2);
    common = common.slice(0,common.length-2);
    
    //Populate Info Box
    $('#record_number').text(metadata.record_number);
    $('#record_title').text(metadata.record_title);
    $('#data_title').text(metadata.data_title);
    $('#notes').text(metadata.original_notes);
    $('#topic').text(topics);
    $('#species').text(species);
    $('#common_name').text(common);
    $('#author').text(authors);
    $('#reference').text(metadata.reference[0].original_reference);
    $('#axis_labels').text(axis_labels);
    $('#units').text(units);
    $('#vals').text(vals);    
}

function thePlot(event) {
    window.location.replace('#metadata');

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve reference name from link rel attribute
    var thisRef = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = BigList.map(function(arrayItem) { return arrayItem._id; }).indexOf(thisRef);

    // Get our Reference Object and assign it to metadata and data
    // metadata will be used to fill the metadata window
    var data = BigList[arrayPosition];

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x = d3.scale.linear()
    .range([0, width]);

    var y = d3.scale.linear()
    .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

    var lineFunction = d3.svg.line()
    .x(function(d) { return d.abcissa_value; })
    .y(function(d) { return d.odinate_value; })
    .interpolate("linear");

    var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //The line SVG Path we draw
    var lineGraph = svgContainer.append("path")
    .attr("d", lineFunction(lineData))
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("fill", "none");

    x.domain(d3.extent(data, function(d) { return d.xvals; })).nice();
    y.domain(d3.extent(data, function(d) { return d.yvals; })).nice();

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text(data.abcissa_label);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(data.ordinate_label);

    svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return x(d.xvals); })
      .attr("cy", function(d) { return y(d.yvals); })
      // .style("fill", function(d) { return color(d.species); });

    var legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

};
