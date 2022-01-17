export default {
  init() {
    // JavaScript to be fired on the lists page
  },
  finalize() {
    // JavaScript to be fired on the lists page, after the init JS
    $(document).ready(function() {
      $.noConflict();
      $('#lists-Tuesday').DataTable(
        {
          'paging': false,
          'info': false,
          'order': [[1, 'asc']],
          'dom': 'Bfrtip',
          'buttons': [
            'copy',
            'csv',
            'pdf',
            'print',
          ],
        }
      );
      $('#lists-Thursday').DataTable(
        {
          'paging': false,
          'info': false,
          'order': [[1, 'asc']],
          'dom': 'Bfrtip',
          'buttons': [
            'copy',
            'csv',
            'pdf',
            'print',
          ],
        }
      );
  });   
  },
};
