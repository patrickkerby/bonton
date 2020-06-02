export default {
  init() {
    // JavaScript to be fired on the lists page
  },
  finalize() {
    // JavaScript to be fired on the lists page, after the init JS
    $(document).ready(function() {

      //Restrict pickup date picker to allow next day and future only
      let $datepicker = $( '#acf-field_5eb050868b169 + .hasDatepicker' );        
      $datepicker.datepicker( 'option', {
        'minDate': new Date(((new Date).getTime() + 33 * 60 * 60 * 1000) ),
        beforeShowDay: function(date) {
          var day = date.getDay();
          return [(day != 0 && day != 1), ''];
        },
      });
    });
  },
};
