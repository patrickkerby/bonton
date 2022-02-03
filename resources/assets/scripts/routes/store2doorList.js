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
            'copy',
            'csv',
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
            'copy',
            'csv',
          ],
        }
      );
  });   
  },
};
