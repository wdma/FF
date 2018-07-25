// Global array
var BigList = [];
var pg = 0;
var last = 0;

// DOM Ready =============================================================
jQuery(function($) {
    // Populate the user table on initial page load
    initialize();
    
    // When the user clicks a link
    $('#pagination').on('click', 'a.lt', firstPage);
    $('#pagination').on('click', 'a.pp', previousPage);
    $('#pagination').on('click', 'a.np', nextPage);
    $('#pagination').on('click', 'a.gt', lastPage);

    $('#dataList table tbody').on('click', 'td a.showuser', theMetadata);
    $('#dataList table tbody').on('click', 'td a.showuser', thePlot);
})(jQuery);
// Functions =============================================================
// Get the data and initial population of page
function initialize() {
    // jQuery AJAX call for JSON
    $.getJSON( '/data/records', function( data ) {
        BigList = data;
        last = Math.ceil(data.length/10);
    });
};

function fillTable(ranges) {
    alert(ranges);
    var pageData = [];
    var min = parseInt(ranges[0]);
    var max = parseInt(ranges[9])+1;
    for (var i=min; i < max; i++) {
        if (BigList[i] !== NaN) {
            pageData.push(
                id: i;
                ref: BigList[i],
            });    
        };
    };
    alert(pageData[1]);
    // Empty content string
    var tableContent = '';
    // For each item in our JSON, add a table row and cells to the content string
    $.each(pageData, function(){
        tableContent += '<tr>';
        tableContent += '<td><a href="#metadata" class="showuser" rel=' +  this._id + '>' + JSON.stringify(this.data_title) + " from " + JSON.stringify(this.reference[0].original_reference) + '</a></td>';
        tableContent += '</tr>';
    });
    alert('hi');
    // Inject the whole content string into our existing HTML table
    // $('#dataList table tbody').html(tableContent);
    $("#dataList table tbody").html(tableContent);
};


function firstPage(event) {
    window.location.replace('#dataList');
    event.preventDefault();
    pg=0;
    const stval = x => (10*pg)+x;
    let ranges = Array.from(Array(10), (_,x)=> stval(x));
    alert(ranges);
    fillTable(ranges);
    // $('#datalist table tbody').html(fillTable(ranges, tableContent));
};

function previousPage(event) {
    window.location.replace('#dataList');
    event.preventDefault();
    pg--;
    if (pg < 0) {
      pg=0;
    }
    const stval = x => (10*pg)+x;
    let ranges = Array.from(Array(10), (_,x)=> stval(x));
    alert(ranges);
    fillTable(ranges);    
    // $('#datalist table tbody').html(fillTable(ranges, tableContent));
};
 
function nextPage(event) {
    window.location.replace('#metadata');
    event.preventDefault();
    pg++;
    if (pg > last) {
      pg=last;
    }
    const stval = x => (10*pg)+x;
    let ranges = Array.from(Array(10), (_,x)=> stval(x));
    alert(ranges);
    fillTable(ranges);
    // $('#datalist table tbody').html(fillTable(ranges, tableContent));
};

function lastPage(event) {
    window.location.replace('#dataList');
    event.preventDefault();
    pg=last;
    const stval = x => (10*pg)+x;
    let ranges = Array.from(Array(10), (_,x)=> stval(x));
    alert(ranges);
    fillTable(ranges);
    // $('#datalist table tbody').html(fillTable(ranges, tableContent));
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
    var data = BigList[arrayPosition];

    // /////////////////////////////////////////////////////////
    // Extrct the data into "Vals"
    var Vals = [];
    for (var i=0; i < data.data.length; i++) {
        Vals.push({
          x: data.data[i].abcissa_value,
          y: data.data[i].ordinate_value,
        });
    };

    // ///////////////////////////////////////////////////////////////////
    // Scale the data into "scaledVals" and define the axes
    var min_x = 0;
    var max_x = 100;
    var min_y = 0;
    var max_y = 100;
    for (var i = 0; i < Vals.length; i++) {
      var temp_x, temp_y;
      var temp_x = Vals[i].x;
      var temp_y = Vals[i].y;
      if ( temp_x <= min_x ) { min_x = temp_x; }
      if ( temp_y <= min_y ) { min_y = temp_y; }
      if ( temp_x >= max_x ) { max_x = temp_x; }
      if ( temp_y >= max_y ) { max_y = temp_y; }
    };
    var xDomain = [min_x, max_x];
    var yDomain = [min_y, max_y];

    //  Will need to add a function to figure out a "good" range for x and y

    var xScale = d3.scaleLog()
                    .domain(xDomain)
                    .range([0.1, 100])

    var yScale = d3.scaleLinear()
                    .domain(yDomain)
                    .range([yDomain, 0])

    var xAxis = d3.axisBottom(xScale)
      .tickFormat(function(d) { return d.x;});
    
    var yAxis = d3.axisLeft(yScale)
      .tickFormat(function(d) {return d.y});
    
    var scaledVals = [];
    for (var j=0; j < Vals.length; j++) {
        scaledVals.push({
          x: xScale(Vals[j].x),
          y: yScale(Vals[j].y),
          radius: 2,
          color: "black",
        });
    };

    // ///////////////////////////////////////////////////////////////
    //  Make the plot
  //  var svgContainer = d3.selectAll('#svgContainer');

    var viewer = d3.select("#svg").append('g')
 //     .attr('id', 'viewerSVG')
 //   var svg = viewer.append("svg").attr('id', 'viewerPins')
      .attr("width", [xScale(0), xScale(100)])
      .attr("height", [yScale(0), yScale(100)])
      .style('border', '1px solid black')
      .attr("transform", "translate(" + '40' + "," + '20' + ")");

    // alert(yScale.range);

    // Place the markers
    var circles = viewer.selectAll("circle")
      .data(scaledVals)
      .enter()
      .append("circle");

    // Apply plotting directives
    var circleAttributes = circles
      .attr("cx", function (d) { return d.x; })
      .attr("cy", function (d) { return d.y; })
      .attr("r", function (d) { return d.radius; })
      .style("fill", function(d) { return d.color; });

    // //////////////////////////////////////////////////
    
};
