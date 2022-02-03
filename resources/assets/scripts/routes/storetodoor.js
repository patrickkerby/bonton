export default {
  init() {
    // JavaScript to be fired on the lists page
  },
  finalize() {
    // JavaScript to be fired on the lists page, after the init JS
    $(document).ready(function() {
      $.noConflict();
      $('#lists1').DataTable(
        {
          'paging': false,
          'info': false,
          'order': [[1, 'asc']],
          'columnDefs': [ {
            'targets': [0,2,3,4], /* column index */
            'orderable': true, /* true or false */
          }],
          'dom': 'Bfrtip',
          'buttons': [
            {
                'extend': 'copyHtml5',
                'exportOptions': {
                    columns: [ 0, ':visible' ],
                },
            },
            {
                'extend': 'csv',
                'exportOptions': {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                },
            },
          ],
        }
      );
      $('#lists2').DataTable(
        {
          'paging': false,
          'info': false,
          'order': [[1, 'asc']],
          'columnDefs': [ {
            'targets': [0,2,3,4], /* column index */
            'orderable': true, /* true or false */
          }],
          'dom': 'Bfrtip',
          'buttons': [
            {
                'extend': 'copyHtml5',
                'exportOptions': {
                    columns: [ 0, ':visible' ],
                },
            },
            {
                'extend': 'csv',
                'exportOptions': {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                },
            },
          ],
        }
      );
  });   
  },
};
