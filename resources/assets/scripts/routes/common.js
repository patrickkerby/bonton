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

  //   $('.inside-thumb').click(function(){
  //     //Add class to body
  //     $('body').toggleClass('modal-open');
  //  });

    $('.inside-thumb').click(function(){
      //Add class to body
      $('body').addClass('modal-open');
   });

     $('.pp_overlay').click(function(){
      //Add class to body
      $('body').toggleClass('modal-open');
   });

  },
};