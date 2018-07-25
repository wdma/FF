/**
  *  App Class
  *
  * @author Diana Ma
  * 
  */

var app = {
  
  Posts: function () {
    /**
      * This method contains the list of functions that need to be loaded 
      * when the "Posts" object is instantiated
      *
      */
     this.init = function () {
       this.get_all_items_pagination();
     }
    /**
      * Load front-end items pagniation();
      */
      this.get_all_items_pagination = function () {
        _this = this;
        /* Check if our hidden form input is not empty, meaning it is not the first time viewing this page. */
        if ($('form.post-list input').val()){
          /* Submit hidden form input value to load previous page number */
          data = JSON.parse($('form.post-list input').val());
          _this.ajax_get_all_items_pagination(data.page, data.name, data.sort);
        } else {
            /* Load the first page */
            _this.ajax_get_all_items_pagination(1, $('post_name').val(), $('.post_sort').val());
        }
        /* Search */
        $('body').on('click', '.post_search_submit', function () {
          _this.ajax_get_all_items_pagination(1, $('.post_name').val(), $('.post_sort').val());
        });
        /* Search when Enter Key is triggered */
        $(".post_search_text").keyup(function (e) {
          if (e.keycode == 13) {
            _this.ajax_get_all_items_pagination(1, $('.post_name').val(), $('.post_sort').val());
          }
        });
      }
      
      /**
        * AJAX front-end items pagination.
        *
        */
        this.ajax_get_all_items_pagination = function(page, order_by_name, order_by_sort){
 
        if($(".pagination-container").length > 0 && $('.products_view_all').length > 0){
          $(".pagination-container").html('<img src="images/loading.gif" class="ml-tb" />');

          var post_data = {
            page: page,
            search: $('.post_search_text').val(),
            name: order_by_name,
            sort: order_by_sort,
            max: $('.post_max').val(),
          };

          $('form.post-list input').val(JSON.stringify(post_data));

          var data = {
            action: 'get-all-products',
            data: JSON.parse($('form.post-list input').val())
          };
          
          $.ajax({
            url: 'products/view-front',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
              if($(".pagination-container").html(response.content)){
                $('pagination-nav').html(response.navigation);
                $('.table-post-list th').each(function() {
                  /* Append the button indicator */
                  $(this).find('span.glyphicon').remove();
                  if ($(this).hasClass('active')){
                    if(JSON.parse($('form.post-list input').val()).th_sort == 'DESC'){
                      $(this).append(' <span class="glyphon glyphon-chevron-down pull-right"></span>');
                    } else {
                      $(this).append(' <span class="glyphon glyphon-chevron-up pull-right"</span>');
                    }
                  }
                });
              }
            }
          });
        }        
      }
  }
}
/**
  * When the document has been loaded...
  */
jQuery(document).ready(function () {
  posts = new app.Posts(); /* Instantiate the Posts Class */
  posts.init(); /* Load Posts class methods */
});

