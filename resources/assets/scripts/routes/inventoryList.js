export default {
  init() {
    // JavaScript to be fired on the lists page
  },
  finalize() {
    // JavaScript to be fired on the lists page, after the init JS

    var dayjs = require('dayjs');
    var customParseFormat = require('dayjs/plugin/customParseFormat');
    dayjs.extend(customParseFormat);

    $(document).ready(function() {
      $.noConflict();
      $('#lists').DataTable(
        {
          'paging': false,
          'info': false,
          'order': [[ 1, 'desc' ], [ 0, 'asc' ]],
          'dom': 'Bfrtip',
          'buttons': [
            'copy',
            'csv',
            'pdf'],          
        }     
      ); 
      
      $( function() {
        var 
          from = $( '#from' )
            .datepicker({
              defaultDate: '+1w',
              changeMonth: true,
              numberOfMonths: 2,
              // dateFormat: 'dd/mm/yy',
            })
            .on( 'change', function() {
              to.datepicker( 'option', 'minDate', getDate( this ) );
            }),
          to = $( '#to' ).datepicker({
            defaultDate: '+1w',
            changeMonth: true,
            numberOfMonths: 2,
            // dateFormat: 'dd/mm/yy',
          })
          .on( 'change', function() {
            from.datepicker( 'option', 'maxDate', getDate( this ) );
          });
     
        function getDate( element ) {
          var date;
          try {
            date = $.datepicker.parseDate( element.value );
          } catch( error ) {
            date = null;
          }
     
          return date;
        }
      } );
    });

    
  },
};
