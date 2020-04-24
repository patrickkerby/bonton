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
  },
};