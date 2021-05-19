export default {
  init() {
    $.noConflict();

    $('.hamburger').click(function() {
      $(this).toggleClass('is-active');
      $('.navbar-collapse').toggleClass('is-active');
      $('body').toggleClass('is-active');
    });
    $('.menu-item').click(function(){
      $('body').removeClass('is-active');
      $('.navbar-collapse').removeClass('is-active');
      $('.hamburger').removeClass('is-active');
    });

  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
    $( '.pack' ).click(function() {
      $( this ).toggleClass( 'packed' );
    });

    //Initialise popovers
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })

    //fake the radio buttons for product filter
    $( '.wpf_submenu label' ).click(function() {
      $('.checked').removeClass('checked')
      $( this ).addClass( 'checked' );
      $('.wpf_submenu input').prop('checked',false);
      //.checkboxradio('refresh')  add this to end of line 26. maybe.

    });

    // The following is to control the background overflow on body while a product modal is opened.
    // The close button that comes with the modal package is fucked, so we hide it via CSS, and make our own
    
    // add class to body when modal is triggered
    $(document).ready(function() {
      $(document).on('click', '.inside-thumb', function() {
        $('body').addClass('quickview-open');
      });
      // remove class from body when close button is clicked  
      $(document).on('click', '.close-product', function(e) {
        if (!$(e.target).is('.quickview'))
          $('.quickview-open').removeClass('quickview-open');
      });
      // remove class from body when you click on the overlay
      $(document).on('click', '.pp_overlay', function(e) {
        if (!$(e.target).is('.quickview-open'))
          $('.quickview-open').removeClass('quickview-open');
      });
      // remove class from body when you hit escape
      $(document).bind('keyup', function(e){ 
        if(e.which == 27){
          if (!$(e.target).is('.quickview-open'))
          $('.quickview-open').removeClass('quickview-open');
         }
      });
      // close the modal when you click on our new button  
      $('.close-product').on('click',function() { $.prettyPhoto.close(); });

      $('.modal').each(function () {
        const modalId = `#${$(this).attr('id')}`;
        if (window.location.href.indexOf(modalId) !== -1) {
            $(modalId).modal('show');
        }
      });

      // $('input[type=checkbox]').change(function(){
      //   if(('input[type=checkbox]').prop('checked')) {
      //       $('div.assorted-selection_parent').addClass('show');
      //   } else {
      //       $('div.assorted-selection_parent').removeClass('show');
      //   }
      // });

      // remove class from body when close button is clicked  
      $(document).on('click', '.close-product', function(e) {
        if (!$(e.target).is('.quickview'))
          $('.quickview-open').removeClass('quickview-open');
      });

      // Enable slick lightbox on appropriate images
      $('main').slickLightbox({
        itemSelector: '.slick',
      });

    // ASSORTED ITEMS SELECTION BEHAVIOUR FOR MOBILE
      //mobile trigger for assorted options on items like Danish
      $(document).on('click', '.assorted-section_parent label', function() {
        $('.assorted-section_parent').addClass('show-assorted');
      });

      // remove class from body when close button is clicked  
      $(document).on('click', '.assorted-selection-clear', function() {
          $('.assorted-section_parent').removeClass('show-assorted');
      });

       //Add a fake submit button on the Assorted Items Selection textarea in order to dismiss it.
       $(document).on('click', '.wcpa_has_options', function() {
        if ($('.assorted-selection-clear').length < 1) {
          $( '.assorted-section' ).after( '<span class="assorted-selection-clear">Done!</span>' );
        }
      });

    });
  },
};