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
          'dom': 'Bfrtip',
          'bFilter': false,
        }
      );
      $('#lists-Thursday').DataTable(
        {
          'paging': false,
          'info': false,
          'dom': 'Bfrtip',
          'bFilter': false,
        }
      );
  });   
  },
};
