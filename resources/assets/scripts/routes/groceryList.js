export default {
  init() {
    // JavaScript to be fired on the lists page
  },
  finalize() {
    // JavaScript to be fired on the lists page, after the init JS
    $(document).ready(function() {
      $.noConflict();
       

    
      
      var groupColumn = 0;
      var table = $('#lists').DataTable({
          'columnDefs': [
              { 'visible': false, 'targets': groupColumn },
          ],
          'order': [[ groupColumn, 'asc' ]],
          'rowGroup': [
            {'dataSrc': 'product'},
          ],
          'paging': false,
      } );
  
      // Order by the grouping
      $('#lists tbody').on( 'click', 'tr.group', function () {
          var currentOrder = table.order()[0];
          if ( currentOrder[0] === groupColumn && currentOrder[1] === 'asc' ) {
              table.order( [ groupColumn, 'desc' ] ).draw();
          }
          else {
              table.order( [ groupColumn, 'asc' ] ).draw();
          }
      } );
    });
  },
};
