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
          'info': false,
          'order': [[ 1, 'desc' ], [ 0, 'asc' ]],
          'pageLength': 500,
        }
      );
    });
  },
};
