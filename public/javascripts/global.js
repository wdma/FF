// Global array
var BigList = [];
var pg = 0;
var last = 0;

// DOM Ready =============================================================
jQuery(function($) {
    // Populate the background data
    initialize();
})(jQuery);

// populate the background data
function initialize() { 
    // jQuery AJAX call for JSON
    $.getJSON( '/data/records', function( data ) {
        BigList = data;
        last = Math.ceil(data.length/10);
    });
       
    $('a.buttonBar').on('click',function () {
      var navBar = 
        '<div class="buttonBar">' +
        '<button href="#dataList" class="fp"> &laquo; </button>' +
        '<button href="#dataList" class="pp"> previous page </button>' +
        '<button href="#dataList" class="np"> next page </button>' +
        '<button href="#dataList" class="lp"> &raquo; </button>' +
        '</div>'; 
    // Inject the whole content string into the button bar
    $(this).html(navBar);
   
    // Clicking a link in the page navigation bar
    $('button.fp').on('click', firstPage);
    $('button.pp').on('click', previousPage);
    $('button.np').on('click', nextPage);
    $('button.lp').on('click', lastPage);
    });
}

// clicking on this button will pull up the first page of resources
function firstPage(event) {
    event.preventDefault();
    pg=0;
    const stval = x => (10*pg)+x;
    let ranges = Array.from(Array(10), (_,x)=> stval(x));
    fillTable(ranges);
}

function previousPage(event) {
    event.preventDefault();
    pg--;
    if (pg < 0) {
      pg=0;
    };
    const stval = x => (10*pg)+x;
    let ranges = Array.from(Array(10), (_,x)=> stval(x));
    fillTable(ranges);    
}

function nextPage(event) {
    event.preventDefault();
    pg++;
    if (pg > last) {
      pg=last;
    };
    const stval = x => (10*pg)+x;
    let ranges = Array.from(Array(10), (_,x)=> stval(x));
    fillTable(ranges);
}

function lastPage(event) {
    event.preventDefault();
    pg=last;
    const stval = x => (10*pg)+x;
    let ranges = Array.from(Array(10), (_,x)=> stval(x));
    fillTable(ranges);
}


// Get a portion of the data to populate the web page
function fillTable(ranges) {
    window.location.replace('#dataList');
    var min = parseInt(ranges[0]);
    var max = parseInt(ranges[9])+1;
    var pageData = [];
    for (var i = min; i < max; i++) {
        if (BigList[i] !== NaN) {
            pageData.push({
                ref: BigList[i],
            });
        };
    };
    // Empty content string
    var tableContent = '';
    // For each item in our JSON, add a table row and cells to the content string
    $.each(pageData, function(){
        tableContent += '<br/><br/><a href="#metadata" class="showuser1" rel=' +  this.ref._id + '>' + JSON.stringify(this.ref.data_title) + '</a><br/><a href="#metadata" class="showuser2" rel=' +  this.ref._id + '>' + JSON.stringify(this.ref.reference[0].original_reference) + '</a>';     
    });
    // Inject the whole content string
    $('#dataList').html(tableContent);
    
    // Clicking a reference
    $('#dataList').on('click', 'a.showuser1', theMetadata);
//    $('#dataList table tbody').on('click', 'td a.showuser', thePlot);
}

// Show the metadata associated with the selected dataset
function theMetadata(event) {
    event.preventDefault();
    window.location.replace('#metadata');   

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
    
    $('#record_number').text('Figure: ' + metadata.record_number);
    $('#record_title').text('Title: ' + metadata.record_title);
    $('#data_title').text('Dataset: ' + metadata.data_title);
    $('#notes').text('Notes: ' + metadata.original_notes);
    $('#topic').text('Topic(s): ' + topics);
    $('#species').text('Species: ' + species);
    $('#common_name').text('A.K.A.: ' + common);
    $('#author').text('Author(s): ' + authors);
    $('#reference').text('Reference: ' + metadata.reference[0].original_reference);
    $('#axis_labels').text('Axis Labels: ' + axis_labels);
    $('#units').text('Units: ' + units);
    $('#vals').text('Data: ' + vals);    
}



