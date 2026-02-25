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
      $('[data-toggle="tooltip"]').tooltip();
    })

    //fake the radio buttons for product filter
    $( '.wpf_submenu label' ).click(function() {
      $('.checked').removeClass('checked');
      $( this ).addClass( 'checked' );
      $('.wpf_submenu input').prop('checked',false);

      // GA4: Track which product category filters are used
      if (window.gtag) {
        window.gtag('event', 'filter_category', {
          category_name: $(this).text().trim(),
        });
      }
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

      // remove class from body when close button is clicked  
      $(document).on('click', '.close-product', function(e) {
        if (!$(e.target).is('.quickview')) {
          $('.quickview-open').removeClass('quickview-open'); }
      });

      // Enable slick lightbox on appropriate images
      $('main').slickLightbox({
        itemSelector: '.slick',
      });

      // ASSORTED ITEMS SELECTION BEHAVIOUR FOR MOBILE
      // Updated for Custom Product Addons Pro plugin (new structure)
      
      // Mobile trigger for assorted options - supports both old and new plugin structure
      $(document).on('click', '.assorted-section_parent label, .wcpa_field_wrap.assorted-section .wcpa_field_label', function() {
        // Support old structure
        $('.assorted-section_parent').addClass('show-assorted');
        // Support new structure
        $('.wcpa_field_wrap.assorted-section').addClass('show-assorted');
      });

      // Remove class when close button is clicked  
      $(document).on('click', '.assorted-selection-clear', function() {
        // Support old structure
        $('.assorted-section_parent').removeClass('show-assorted');
        // Support new structure
        $('.wcpa_field_wrap.assorted-section').removeClass('show-assorted');
      });

      // Add a fake submit button on the Assorted Items Selection textarea
      $(document).on('click', '.wcpa_has_options, .wcpa_wrap', function() {
        if ($('.assorted-selection-clear').length < 1) {
          // Try new structure first
          if ($('.wcpa_field_wrap.assorted-section').length > 0) {
            $('.wcpa_field_wrap.assorted-section textarea').after('<span class="assorted-selection-clear">Done!</span>');
          }
          // Fallback to old structure
          else if ($('.assorted-section').length > 0) {
            $('.assorted-section').after('<span class="assorted-selection-clear">Done!</span>');
          }
        }
      });

      $(document).on('click', '.woocommerce-variation-description p', function() {
        $('.woocommerce-variation-description').addClass('hide');
      });

      $('.input-group.date').datepicker({
        multidate: true,
        multidateSeparator:',',
      });

      // Custom controls for Quantity buttons
      function initQuantityButtons() {
        // Only add buttons to quantity inputs that don't already have them
        $('.quantity input').each(function() {
          const $input = $(this);
          const $quantityContainer = $input.closest('.quantity');
          
          console.log('Found quantity input:', $input.length, 'Existing buttons:', $quantityContainer.find('.quantity-button').length);
          
          // Check if buttons already exist
          if ($quantityContainer.find('.quantity-button').length === 0) {
            // Add the quantity buttons directly after the input
            $('<div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div>').insertAfter($input);
            console.log('Added quantity buttons to input');
          }
        });
      }

      // Set up auto-update cart functionality - MOVED INSIDE document.ready
      if ($('body').hasClass('woocommerce-cart')) {
        $(document).off('change.autoUpdate', 'input.qty').on('change.autoUpdate', 'input.qty', function() {
          $('[name="update_cart"]').trigger('click');
        });
      }

      // Bind quantity button events
      $(document).off('click.quantityButtons').on('click.quantityButtons', '.quantity-up', function() {
        var $spinner = $(this).closest('.quantity');
        var $input = $spinner.find('input[type="number"]');
        var oldValue = parseFloat($input.val()) || 0;
        var max = parseFloat($input.attr('max')) || Infinity;
        var newVal = oldValue >= max ? oldValue : oldValue + 1;
        
        $input.val(newVal);
        
        // Only trigger change event on cart page for auto-update
        if ($('body').hasClass('woocommerce-cart')) {
          $input.trigger('change');
        }
      });

      $(document).off('click.quantityButtonsDown').on('click.quantityButtonsDown', '.quantity-down', function() {
        var $spinner = $(this).closest('.quantity');
        var $input = $spinner.find('input[type="number"]');
        var oldValue = parseFloat($input.val()) || 0;
        var min = parseFloat($input.attr('min')) || 0;
        var newVal = oldValue <= min ? oldValue : oldValue - 1;
        
        $input.val(newVal);
        
        // Only trigger change event on cart page for auto-update
        if ($('body').hasClass('woocommerce-cart')) {
          $input.trigger('change');
        }
      });

      // Initialize on page load
      initQuantityButtons();

      // Re-initialize after AJAX updates
      $(document.body).on('updated_cart_totals updated_checkout updated_wc_div', function() {
        initQuantityButtons();
      });

      // Initialize after quickview modal opens
      $(document).on('click', '.inside-thumb', function() {
        $('body').addClass('quickview-open');
        // Add multiple checks to ensure the modal content is loaded
        setTimeout(function() {
          initQuantityButtons();
        }, 200);
        
        // Also try after a longer delay in case content takes time to load
        setTimeout(function() {
          initQuantityButtons();
        }, 500);
      });

      // Listen for prettyPhoto events if available
      if (typeof $.prettyPhoto !== 'undefined') {
        $.prettyPhoto.open = (function(original) {
          return function() {
            var result = original.apply(this, arguments);
            // Multiple timeouts to catch different loading scenarios
            setTimeout(function() {
              initQuantityButtons();
            }, 100);
            setTimeout(function() {
              initQuantityButtons();
            }, 300);
            setTimeout(function() {
              initQuantityButtons();
            }, 600);
            return result;
          };
        })($.prettyPhoto.open);
      }

      // Also listen for any AJAX complete events that might indicate modal content loaded
      $(document).ajaxComplete(function() {
        if ($('body').hasClass('quickview-open')) {
          setTimeout(function() {
            initQuantityButtons();
          }, 50);
        }
      });

      // GA4: Track add-to-cart events with source page context
      (function() {
        if (!window.gtag) return;

        let lastTrackedAt = 0;
        function trackAddToCart(productName) {
          const now = Date.now();
          if (now - lastTrackedAt < 2000) return;
          lastTrackedAt = now;
          window.gtag('event', 'add_to_cart', {
            product_name: productName || 'Unknown',
            source_page: $('body').hasClass('home') ? 'homepage' : window.location.pathname,
            via_quick_view: $('body').hasClass('quickview-open'),
          });
        }

        // WooCommerce fires this for AJAX add-to-cart (loop products)
        $(document.body).on('added_to_cart', function(e, fragments, cart_hash, $button) {
          let name = '';
          if ($('body').hasClass('quickview-open')) {
            name = $('.product_title').first().text().trim();
          } else if ($button) {
            name = $button.closest('.product').find('.woocommerce-loop-product__title').text().trim();
          }
          trackAddToCart(name);
        });

        // Fallback: catch single product form add-to-cart (e.g. quick view modal)
        $(document).ajaxComplete(function(event, xhr, settings) {
          if (xhr.status !== 200) return;
          const data = settings.data;
          const url = settings.url || '';
          const isAddToCart = (typeof data === 'string' && data.indexOf('add-to-cart') !== -1) ||
                              url.indexOf('wc-ajax=add_to_cart') !== -1;
          if (!isAddToCart) return;
          trackAddToCart($('.product_title').first().text().trim());
        });
      })();
    });
  },
};