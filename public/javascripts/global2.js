// Global array
var BigList = [];

// DOM Ready =============================================================
jQuery(function($) {
    alert('hi');
    // Populate the user table on initial page load
    populateTable();
    
    // When the user clicks a link
    $('#dataList table tbody').on('click', 'td a.showuser', theMetadata);
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
    $('#vals').text(vals)    
};
