// Global array
var BigList = [];

// DOM Ready =============================================================
jQuery(function($) {

    // Populate the user table on initial page load
    populateTable();
    
    // When the user clicks a link
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

    var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function(d) {
      d.xvals = +d.abcissa_value;
      d.yvals = +d.ordinate_value;
    });

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
   
    alert("hi"); 
    $('#thePlot').svg;
    $('#theLegend').legend;
};
