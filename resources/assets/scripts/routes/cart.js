export default {
  init() {
    // JavaScript to be fired on the cart page
    $.noConflict();

  },
  finalize() {
    // JavaScript to be fired on the cart page, after the init JS

    var dayjs = require('dayjs');
    var customParseFormat = require('dayjs/plugin/customParseFormat');
    dayjs.extend(customParseFormat);

    //get variables from cart PHP
    var pickup_restriction_check_target = document.getElementById('pickup_restriction_check');
    var pickup_restriction_check = pickup_restriction_check_target.textContent;
  
    var pickupRestrictionTarget = document.getElementById('pickup_restriction_data');
    var pickupRestriction = pickupRestrictionTarget.textContent;
    var pickupRestrictionFormatted = dayjs(pickupRestriction, 'DD/MM/YYYY');

    var pickupRestrictionEndTarget = document.getElementById('pickup_restriction_end_data');
    var pickupRestrictionEnd = pickupRestrictionEndTarget.textContent;
  
    var presetDateTarget = document.getElementById('session_pickup_date');
  
    if(presetDateTarget) {
      var presetDate = presetDateTarget.textContent;
      var presetDateFormatted = dayjs(presetDate);

      console.log(presetDateFormatted);
    }

    var longFermentationTarget = document.getElementById('long_fermentation_in_cart');
    var longFermentation = longFermentationTarget.textContent;
    
    jQuery(function($) {

      $('body').on('updated_cart_totals',function() {
        location.reload(); // uncomment this line to refresh the page.
      });	
      
      $(document).ready(function() {

        //get variable from php. Do we need extra lead time due to long fermentation products in the cart?
  
          if(longFermentation === true){
            var time = 57;
          }
          else {
            time = 33;
          }        
        
        // Products with restricted availability dates. If product with resctrictions exists, use their min and max dates. 
        // If the minDate for the restricted product is set for a day earlier than our caluclated current day + lead time, then ignore the restricted minDate, and use our standard formula
        // convert date format for comparison's sake
        var standardFormulaMinDate = new Date(((new Date).getTime() + time * 60 * 60 * 1000) );
        var standardFormulaMinDateFormatted = dayjs(standardFormulaMinDate);

        if(pickupRestriction == null || pickupRestriction == ''){
          var minDate = standardFormulaMinDate;
        } 

        console.log('standardFormulaMinDateFormatted: ' + standardFormulaMinDateFormatted);
        console.log('pickuprestrictionformatted: ' + pickupRestrictionFormatted);

        if(pickup_restriction_check == true) {
          if(pickupRestrictionFormatted.isBefore(standardFormulaMinDateFormatted)) {				
            minDate = standardFormulaMinDate;
            console.log('current PRODUCT');

          } 
          else if(pickupRestrictionFormatted.isAfter(standardFormulaMinDateFormatted)) {
            minDate = pickupRestriction;
            console.log('FUTURE PRODUCT');
          }
          else {
            minDate = pickupRestriction;
            console.log('Regular PRODUCT');

          }

          if(pickupRestrictionEnd == null){
            var maxDate = '01/01/2030';
          } else {
            maxDate = pickupRestrictionEnd;
          }
        }

        const minDateFormatted = dayjs(minDate, 'DD/MM/YYYY');
        const maxDateFormatted = dayjs(maxDate, 'DD/MM/YYYY');

        console.log(pickupRestriction);

        // The next line is for an array of dates that shouldn't be available. Use this for holidays, etc.
        // var array = ["2020-06-30","2020-07-01"];

        $( function() {
          
          $('#datepicker').datepicker({
            onSelect: function(dateText) { 
                var dateAsString = dateText; //the first parameter of this function
                var dateAsObject = $(this).datepicker( 'getDate' ); //the getDate method																				
                $('#dateInput').val(dateAsString);
                console.log(dateAsObject);
            },
  
            minDate: minDate,
            maxDate: maxDate,
            dateFormat: 'dd/mm/yy',
  
            beforeShowDay: function(date) {
              var day = date.getDay();
              // var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
              return [(day != 0 && day != 1), ''];
              // The following line should be enabled to make use of array on line 414
              // return [(day != 0 && day != 1 && array.indexOf(string) == -1), ''];
            },		
          }).find('.ui-state-active').removeClass('ui-state-active');
          
          // the following two lines are legacy. not sure that they'll be needed again.
          // $( "#datepicker" ).datepicker( "option", "dateFormat", "dd/mm/yy" );
          // $( "#datepicker" ).datepicker( "option", "showButtonPanel", false );
          
          if(pickup_restriction_check == true && presetDate != null) {
            const presetDateFormatted = dayjs(presetDate, 'DD/MM/YYYY');

            if(presetDateFormatted.isBefore(minDateFormatted) || presetDateFormatted.isAfter(maxDateFormatted)) {
              presetDate = null;
            }
            else {
              //
            }
          }
        
          if(presetDate != null && presetDate != '' ){
            $('#datepicker').datepicker('setDate', presetDate);
          }		

        });
      });
    });
  },
};