export default {
  init() {
    // JavaScript to be fired on the lists page
  },
  finalize() {
    // JavaScript to be fired on the lists page, after the init JS
    $(document).ready(function() {
      $.noConflict();
      $('#lists').DataTable(
        {
          'paging': false,
          'info': false,
          'columnDefs': [ {
            'targets': [0,1,2], /* column index */
            'orderable': false, /* true or false */
         }],
        }     
      );      
    });
  },
};
