export default {
  init() {
    // JavaScript to be fired on all pages
    $.noConflict();

  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
    $( '.pack' ).click(function() {
      $( this ).toggleClass( 'packed' );
    });

    // The following is to control the background overflow on body while a product modal is opened.
    // The close button that comes with the modal package is fucked, so we hide it via CSS, and make our own
    
    // add class to body when modal is triggered
    $(document).ready(function() {
      $(document).on('click', '.inside-thumb', function() {
        $('body').addClass('modal-open');
      });
      // remove class from body when close button is clicked  
      $(document).on('click', '.close-product', function(e) {
        if (!$(e.target).is('.modal-open'))
          $('.modal-open').removeClass('modal-open');
      });
      // remove class from body when you click on the overlay
      $(document).on('click', '.pp_overlay', function(e) {
        if (!$(e.target).is('.modal-open'))
          $('.modal-open').removeClass('modal-open');
      });   
      // close the modal when you click on our new button  
      $('.close-product').on('click',function() { $.prettyPhoto.close(); });

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