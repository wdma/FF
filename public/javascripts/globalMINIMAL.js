// Global array
var BigList = [];

// DOM Ready =============================================================
jQuery(function($) {
    alert("stage 1");
    // Populate the user table on initial page load
    populateTable();
    
    // When the user clicks a link
//    $('#dataList table tbody').on('click', 'td a.showuser', theMetadata);
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

