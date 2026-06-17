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

    // Stack cart/checkout bottom notices (loyalty points, errors, etc.) instead of overlapping.
    function stackBottomNotices() {
      var $body = $('body');

      if (!$body.hasClass('woocommerce-cart') && !$body.hasClass('woocommerce-checkout')) {
        return;
      }

      var $notices = $body.find('.woocommerce-error, .woocommerce-info, .woocommerce-message');
      var $cartAlert = $body.find('.woocommerce-cart .alert:visible');
      var $items = $notices.add($cartAlert);

      if (!$items.length) {
        $body.css('padding-bottom', '');
        return;
      }

      var bottom = 0;

      $($items.get().reverse()).each(function() {
        var $el = $(this);

        $el.css({
          position: 'fixed',
          bottom: bottom + 'px',
          left: 0,
          width: '100%',
          margin: 0,
          zIndex: 1000000,
        });
        bottom += this.offsetHeight;
      });

      $body.css('padding-bottom', bottom + 'px');
    }

    stackBottomNotices();
    $(window).on('resize', stackBottomNotices);
    $(document.body).on('updated_checkout updated_cart_totals updated_wc_div', function() {
      window.requestAnimationFrame(stackBottomNotices);
    });

    // Checkout: keep processing feedback in view when placing an order.
    $(document.body).on('checkout_place_order', function() {
      var $target = $('#place_order').length ? $('#place_order') : $('#order_review');
      if (!$target.length) {
        return;
      }
      var top = Math.max(0, $target.offset().top - (window.innerHeight * 0.4));
      $('html, body').animate({ scrollTop: top }, 250);
    });

    if ($('body').hasClass('woocommerce-order-received')) {
      var $order = $('.woocommerce-order').first();
      if ($order.length) {
        window.setTimeout(function() {
          $('html, body').animate({
            scrollTop: Math.max(0, $order.offset().top - 20),
          }, 300);
        }, 150);
      }
    }

    // --- Utility Banner: Global Date Picker ---
    // Uses bootstrap-datepicker (see main.js). On cart/checkout, WooCommerce loads
    // jQuery UI datepicker later and replaces `jQuery.fn.datepicker`, so we always
    // call the saved bootstrap plugin for #global-datepicker.
    (function() {
      var $btn = $('#global-date-picker-btn');
      var $dropdown = $('#global-date-dropdown');
      var $picker = $('#global-datepicker');
      var $banner = $('.utility-banner');
      var mobileMax = 767;

      if (!$btn.length) return;

      function isMobileUtilityViewport() {
        return window.innerWidth <= mobileMax;
      }

      function utilityBannerDatepicker() {
        var p = window.bontonBootstrapDatepickerPlugin;
        if (p && p.DPGlobal) {
          return p;
        }
        return $.fn.datepicker;
      }

      var dayjs = require('dayjs');
      var leadHours = (window.bontonData && window.bontonData.needsExtraLeadTime == 1) ? 57 : 33;
      var startDate = dayjs().add(leadHours, 'hour').toDate();
      var isCartPage = $('body').hasClass('woocommerce-cart');
      var savePickupDateInFlight = false;
      var ignorePickerChange = true;
      var calendarStateStale = false;
      var refreshInFlight = null;
      var suppressOutsideCloseUntil = 0;

      function formatPickupLabelFromDate(d) {
        var w = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return w[d.getDay()] + ', ' + m[d.getMonth()] + ' ' + d.getDate();
      }

      function setUtilityBannerDateSaving(on) {
        var $overlay = $('#utility-banner-date-saving');
        if ($overlay.length) {
          $overlay.toggleClass('is-visible', on);
          $overlay.attr('aria-hidden', on ? 'false' : 'true');
        }
        $dropdown.toggleClass('is-saving', on);
        $btn.attr('aria-busy', on ? 'true' : 'false');
      }

      var deliveryToastTimer = null;

      function showUtilityDeliveryToast(message) {
        if (!message) {
          return;
        }

        var $host = $('.utility-banner__date');
        if (!$host.length) {
          return;
        }

        var $toast = $('#utility-banner-delivery-toast');
        if (!$toast.length) {
          $toast = $('<div id="utility-banner-delivery-toast" class="utility-banner__date-toast" role="status" aria-live="polite"></div>');
          $host.append($toast);
        }

        $toast.text(message).addClass('is-visible');

        if (deliveryToastTimer) {
          window.clearTimeout(deliveryToastTimer);
        }

        deliveryToastTimer = window.setTimeout(function () {
          $toast.removeClass('is-visible');
        }, 6000);
      }

      function saveDateAndUpdate(dateText, pickedDate) {
        if (savePickupDateInFlight) {
          return;
        }
        savePickupDateInFlight = true;
        var $label = $btn.find('.utility-banner__date-label');
        var prevLabel = $label.text();
        var optimistic = formatPickupLabelFromDate(pickedDate);
        $label.text(optimistic);
        setUtilityBannerDateSaving(true);

        $.ajax({
          url: window.bontonData.ajaxUrl,
          type: 'POST',
          cache: false,
          data: {
            action: 'save_pickup_date',
            nonce: window.bontonData.nonce,
            date: dateText,
          },
          dataType: 'json',
          timeout: 30000,
        })
          .done(function (response) {
            if (!response || !response.success) {
              savePickupDateInFlight = false;
              setUtilityBannerDateSaving(false);
              $label.text(prevLabel);
              return;
            }
            if (response.data && response.data.date_display) {
              $label.text(response.data.date_display);
            }
            if (!isCartPage && response.data && response.data.delivery_toast) {
              showUtilityDeliveryToast(response.data.delivery_toast);
            }
            if (isCartPage) {
              // Keep sidebar hidden field in sync so a stray form POST cannot restore an old date.
              var $dateInput = $('#dateInput');
              if ($dateInput.length) {
                $dateInput.val(dateText);
              }
              // replace() avoids re-POSTing the cart calendar form (reload() replays the last POST).
              window.location.replace(window.location.pathname + window.location.search);
              return;
            }
            setUtilityBannerDateSaving(false);
            savePickupDateInFlight = false;
            $dropdown.fadeOut(150);
          })
          .fail(function () {
            savePickupDateInFlight = false;
            setUtilityBannerDateSaving(false);
            $label.text(prevLabel);
          });
      }

      function parseVacationYmdToDates(ymdList) {
        return (ymdList || []).map(function (ymd) {
          var parts = String(ymd).split('-');
          if (parts.length !== 3) return null;
          var y = parseInt(parts[0], 10);
          var m = parseInt(parts[1], 10) - 1;
          var d = parseInt(parts[2], 10);
          if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
          return new Date(y, m, d);
        }).filter(Boolean);
      }

      function destroyUtilityPicker() {
        if (!$picker.length) {
          return;
        }
        var dp = utilityBannerDatepicker();
        if ($picker.data('datepicker')) {
          dp.call($picker, 'destroy');
        }
        $picker.off('changeDate');
      }

      function initBootstrap() {
        if (!$picker.length) {
          return;
        }

        destroyUtilityPicker();

        var selectedDate = $picker.data('selected-date');
        var vacationRaw = document.getElementById('pickup_vacation_dates_global');
        var vacationYmd = [];
        if (vacationRaw && vacationRaw.textContent.trim()) {
          try {
            vacationYmd = JSON.parse(vacationRaw.textContent.trim());
            if (!Array.isArray(vacationYmd)) vacationYmd = [];
          } catch (err) {
            vacationYmd = [];
          }
        }
        var datesDisabled = parseVacationYmdToDates(vacationYmd);

        var dp = utilityBannerDatepicker();
        dp.call($picker, {
          format: 'dd/mm/yyyy',
          startDate: startDate,
          daysOfWeekDisabled: [0, 1],
          datesDisabled: datesDisabled,
          todayHighlight: true,
          maxViewMode: 0,
        });

        ignorePickerChange = true;
        $picker.on('changeDate', function (e) {
          if (ignorePickerChange) {
            return;
          }
          var d = e.date;
          var dd = ('0' + d.getDate()).slice(-2);
          var mm = ('0' + (d.getMonth() + 1)).slice(-2);
          var yyyy = d.getFullYear();
          saveDateAndUpdate(dd + '/' + mm + '/' + yyyy, d);
        });

        if (selectedDate) {
          var parts = selectedDate.split('/');
          if (parts.length === 3) {
            var d0 = new Date(parts[2], parts[1] - 1, parts[0]);
            dp.call($picker, 'setDate', d0);
          }
        }

        setTimeout(function () {
          ignorePickerChange = false;
        }, 100);
      }

      function applyUtilityBannerFromState(data) {
        if (!data) {
          return;
        }

        leadHours = parseInt(data.lead_time_hours, 10) || 33;
        if (window.bontonData) {
          window.bontonData.needsExtraLeadTime = leadHours >= 57 ? 1 : 0;
        }
        startDate = dayjs().add(leadHours, 'hour').toDate();

        if (data.session_pickup_date) {
          var ymd = String(data.session_pickup_date).split('-');
          if (ymd.length === 3) {
            $picker.data('selected-date', ymd[2] + '/' + ymd[1] + '/' + ymd[0]);
          }
        }

        initBootstrap();
      }

      function fetchPickupCalendarState() {
        if (!window.bontonData) {
          return $.Deferred().reject().promise();
        }

        return $.ajax({
          type: 'POST',
          url: window.bontonData.ajaxUrl,
          data: {
            action: 'bonton_cart_pickup_calendar_state',
            nonce: window.bontonData.nonce,
          },
          dataType: 'json',
        });
      }

      function refreshPickupCalendarState() {
        if (refreshInFlight) {
          return refreshInFlight;
        }

        refreshInFlight = fetchPickupCalendarState()
          .done(function (response) {
            if (!response || !response.success || !response.data) {
              return;
            }
            applyUtilityBannerFromState(response.data);
            calendarStateStale = false;
            $(document.body).trigger('bonton_pickup_calendar_state_updated', [response.data]);
          })
          .always(function () {
            refreshInFlight = null;
          });

        return refreshInFlight;
      }

      function measureDateDropdownWidth() {
        if ($dropdown.is(':visible')) {
          return $dropdown.outerWidth() || 0;
        }

        $dropdown.css({ display: 'block', visibility: 'hidden' });
        var width = $dropdown.outerWidth() || 0;
        $dropdown.css({ display: 'none', visibility: '' });

        return width;
      }

      function positionDateDropdown() {
        if (isMobileUtilityViewport() || !$banner.length) {
          $dropdown.css({ left: '', right: '', top: '', bottom: '', transform: '' });
          return;
        }

        var dropdownWidth = measureDateDropdownWidth() || 320;
        var bannerEl = $banner[0];
        var btnEl = $btn[0];
        var bannerRect = bannerEl.getBoundingClientRect();
        var btnRect = btnEl.getBoundingClientRect();
        var left = btnRect.left - bannerRect.left + (btnRect.width / 2) - (dropdownWidth / 2);
        var maxLeft = Math.max(0, bannerRect.width - dropdownWidth);

        left = Math.max(0, Math.min(left, maxLeft));

        $dropdown.css({
          left: left + 'px',
          right: 'auto',
          top: (btnRect.bottom - bannerRect.top + 8) + 'px',
          bottom: 'auto',
          transform: 'none',
        });
      }

      function openUtilityDateDropdown() {
        if ($dropdown.is(':visible')) {
          $dropdown.fadeOut(150);
        } else {
          positionDateDropdown();
          $dropdown.fadeIn(150, positionDateDropdown);
        }
        $('#bulk-info-popover').fadeOut(150);
      }

      function openUtilityDateDropdownWhenReady() {
        if (calendarStateStale || refreshInFlight) {
          $.when(refreshInFlight || refreshPickupCalendarState()).always(openUtilityDateDropdown);
          return;
        }

        if (!$picker.data('datepicker')) {
          initBootstrap();
        }
        openUtilityDateDropdown();
      }

      $(document.body).on(
        'updated_wc_div removed_from_cart wc_cart_emptied added_to_cart',
        function () {
          calendarStateStale = true;
          refreshPickupCalendarState();
        }
      );

      function bindUtilityDateOutsideClose() {
        $(document).on('mousedown touchstart', function(e) {
          if (Date.now() < suppressOutsideCloseUntil) {
            return;
          }

          if (
            !$dropdown.is(':visible') ||
            $dropdown.is(e.target) ||
            $dropdown.has(e.target).length > 0 ||
            $btn.is(e.target) ||
            $btn.has(e.target).length > 0
          ) {
            return;
          }

          $dropdown.fadeOut(150);
        });
      }

      if (isCartPage) {
        // Desktop cart: scroll to the main cart calendar when it exists. Mobile and
        // empty-cart AJAX fallbacks use the same global dropdown as other pages.
        $btn.on('click', function(e) {
          e.stopPropagation();
          suppressOutsideCloseUntil = Date.now() + 400;
          var $calendar = $('#datepicker');
          if ($calendar.length && !isMobileUtilityViewport()) {
            $('html, body').animate({ scrollTop: $calendar.offset().top - 80 }, 300);
            $calendar.closest('.calendar-container').css('outline', '2px solid #6fcf97');
            setTimeout(function() {
              $calendar.closest('.calendar-container').css('outline', '');
            }, 1500);
          } else {
            openUtilityDateDropdownWhenReady();
          }
        });

        bindUtilityDateOutsideClose();
      } else {
        initBootstrap();

        $btn.on('click', function(e) {
          e.stopPropagation();
          suppressOutsideCloseUntil = Date.now() + 400;
          openUtilityDateDropdownWhenReady();
        });

        bindUtilityDateOutsideClose();
      }

      $(window).on('resize', positionDateDropdown);
    })();

    // --- Utility Banner: Bulk Discount Popover ---
    (function() {
      var $btn = $('#bulk-info-btn');
      var $popover = $('#bulk-info-popover');
      var $banner = $('.utility-banner');
      var mobileMax = 767;

      if (!$btn.length) return;

      function isDesktopViewport() {
        return window.innerWidth > mobileMax;
      }

      function measurePopoverWidth() {
        if ($popover.is(':visible')) {
          return $popover.outerWidth() || 0;
        }

        $popover.css({ display: 'block', visibility: 'hidden' });
        var width = $popover.outerWidth() || 0;
        $popover.css({ display: 'none', visibility: '' });

        return width;
      }

      function positionBulkPopover() {
        if (!isDesktopViewport() || !$banner.length) {
          $popover.css({ left: '', right: '', top: '', bottom: '' });
          return;
        }

        var popoverWidth = measurePopoverWidth() || 288;
        var bannerEl = $banner[0];
        var btnEl = $btn[0];
        var bannerRect = bannerEl.getBoundingClientRect();
        var btnRect = btnEl.getBoundingClientRect();
        var left = btnRect.left - bannerRect.left + (btnRect.width / 2) - (popoverWidth / 2);
        var maxLeft = Math.max(0, bannerRect.width - popoverWidth);

        left = Math.max(0, Math.min(left, maxLeft));

        $popover.css({
          left: left + 'px',
          right: 'auto',
          top: '',
          bottom: '',
        });
      }

      $btn.on('click', function(e) {
        e.stopPropagation();
        if ($popover.is(':visible')) {
          $popover.fadeOut(150);
        } else {
          positionBulkPopover();
          $popover.fadeIn(150, positionBulkPopover);
        }
        $('#global-date-dropdown').fadeOut(150);
      });

      $(window).on('resize', positionBulkPopover);

      $(document).on('mousedown touchstart', function(e) {
        if (!$popover.is(e.target) && $popover.has(e.target).length === 0 && !$btn.is(e.target) && $btn.has(e.target).length === 0) {
          $popover.fadeOut(150);
        }
      });
    })();

    // --- Utility account dropdown (banner + mobile bar) ---
    (function () {
      var $accounts = $('.utility-account');
      if (!$accounts.length) {
        return;
      }

      function closeAllAccountPanels() {
        $accounts.each(function () {
          var $wrap = $(this);
          $wrap.find('.utility-account__trigger').attr('aria-expanded', 'false');
          $wrap.find('.utility-account__panel')
            .attr('aria-hidden', 'true')
            .prop('hidden', true);
        });
        $('body').removeClass('utility-account-open');
      }

      function openAccountPanel($wrap) {
        var $btn = $wrap.find('.utility-account__trigger');
        var $panel = $wrap.find('.utility-account__panel');
        $panel.prop('hidden', false);
        window.requestAnimationFrame(function () {
          $btn.attr('aria-expanded', 'true');
          $panel.attr('aria-hidden', 'false');
          $('body').addClass('utility-account-open');
        });
      }

      $accounts.each(function () {
        var $wrap = $(this);
        var $btn = $wrap.find('.utility-account__trigger');

        $btn.on('click', function (e) {
          e.stopPropagation();
          var isOpen = $btn.attr('aria-expanded') === 'true';
          closeAllAccountPanels();
          if (!isOpen) {
            openAccountPanel($wrap);
            $('#global-date-dropdown').fadeOut(150);
            $('#bulk-info-popover').fadeOut(150);
          }
        });
      });

      $(document).on('mousedown touchstart', function (e) {
        if (!$(e.target).closest('.utility-account').length) {
          closeAllAccountPanels();
        }
      });
    })();

    // --- Mobile: scroll-linked beige banner reveal (white util bar stays stuck) ---
    (function () {
      var $utility = $('#site-header-utility');
      var $banner = $('.utility-banner');
      if (!$utility.length || !$banner.length) {
        return;
      }

      var mobileMax = 767;
      var hideAmount = 0;
      var collapseAmount = 0;
      var bannerHeight = 0;
      var lastScrollY = window.pageYOffset || 0;
      var scrollTicking = false;
      var scrollEndTimer = null;
      var SCROLL_END_MS = 200;
      var ignoreScrollUntil = 0;

      function isMobileViewport() {
        return window.innerWidth <= mobileMax;
      }

      function resetBannerScrollState() {
        hideAmount = 0;
        collapseAmount = 0;
        $utility.css({
          '--header-shift': '0px',
          '--banner-collapse': '0px',
        });
        lastScrollY = window.pageYOffset || 0;
      }

      function measureFullBannerHeight() {
        var previousCollapse = collapseAmount;
        $utility.css('--banner-collapse', '0px');
        bannerHeight = $banner.outerHeight() || 0;
        $utility.css('--banner-collapse', previousCollapse + 'px');
      }

      function applyVisualShift() {
        if (!isMobileViewport()) {
          resetBannerScrollState();
          return;
        }

        var shift = Math.max(0, Math.min(bannerHeight, hideAmount));
        $utility.css('--header-shift', shift + 'px');
      }

      function settleBannerLayout() {
        clearTimeout(scrollEndTimer);

        if (!isMobileViewport()) {
          resetBannerScrollState();
          return;
        }

        var targetCollapse = Math.max(0, Math.min(bannerHeight, hideAmount));
        var layoutDelta = targetCollapse - collapseAmount;

        $utility.css('--header-shift', '0px');

        if (layoutDelta === 0) {
          lastScrollY = window.pageYOffset || 0;
          return;
        }

        $utility.css('--banner-collapse', targetCollapse + 'px');
        collapseAmount = targetCollapse;
        hideAmount = targetCollapse;

        // Collapsing shrinks the document — compensate once after scroll stops.
        // Expanding must not scrollTo: iOS treats it as downward scroll and re-hides the banner.
        if (layoutDelta > 0) {
          var scrollY = window.pageYOffset || 0;
          var targetScrollY = scrollY - layoutDelta;
          lastScrollY = targetScrollY;
          ignoreScrollUntil = Date.now() + 200;
          window.scrollTo(0, targetScrollY);
        } else {
          lastScrollY = window.pageYOffset || 0;
        }
      }

      function scheduleBannerLayoutSettlement() {
        clearTimeout(scrollEndTimer);
        scrollEndTimer = window.setTimeout(settleBannerLayout, SCROLL_END_MS);
      }

      function syncBannerOnScroll() {
        if (!isMobileViewport()) {
          resetBannerScrollState();
          scrollTicking = false;
          return;
        }

        if (Date.now() < ignoreScrollUntil) {
          lastScrollY = window.pageYOffset || 0;
          scrollTicking = false;
          return;
        }

        var scrollY = window.pageYOffset || 0;
        var delta = scrollY - lastScrollY;

        if (scrollY <= 0) {
          hideAmount = 0;
        } else if (delta > 0) {
          hideAmount = Math.min(bannerHeight, hideAmount + delta);
        } else if (delta < 0) {
          hideAmount = Math.max(0, hideAmount + delta);
        }

        lastScrollY = scrollY;

        if (delta < 0 || scrollY <= 0) {
          // Reveal: keep layout in sync while scrolling up so the banner stays visible after touch ends.
          clearTimeout(scrollEndTimer);
          settleBannerLayout();
        } else if (delta > 0) {
          // Hide: transform-only while scrolling down; settle after momentum stops.
          applyVisualShift();
          scheduleBannerLayoutSettlement();
        }

        scrollTicking = false;
      }

      measureFullBannerHeight();
      resetBannerScrollState();

      if (typeof ResizeObserver !== 'undefined') {
        var resizeObserver = new ResizeObserver(function () {
          var previousHeight = bannerHeight;
          measureFullBannerHeight();
          if (bannerHeight !== previousHeight) {
            hideAmount = Math.min(hideAmount, bannerHeight);
            collapseAmount = Math.min(collapseAmount, bannerHeight);
            applyVisualShift();
            settleBannerLayout();
          }
        });
        resizeObserver.observe($banner[0]);
      }

      $(window).on('scroll', function () {
        if (!scrollTicking) {
          window.requestAnimationFrame(syncBannerOnScroll);
          scrollTicking = true;
        }
      });

      if ('onscrollend' in window) {
        window.addEventListener('scrollend', settleBannerLayout, { passive: true });
      }

      $(window).on('resize', function () {
        measureFullBannerHeight();
        hideAmount = Math.min(hideAmount, bannerHeight);
        collapseAmount = Math.min(collapseAmount, bannerHeight);
        if (!isMobileViewport()) {
          resetBannerScrollState();
        } else {
          applyVisualShift();
          settleBannerLayout();
        }
      });
    })();

    // --- Mobile util bar: inline search field (override FiboSearch mobile layout) ---
    (function () {
      function initMobileUtilBarSearch() {
        var $wrap = $('.mobile-util-bar__search--field .dgwt-wcas-search-wrapp');
        if (!$wrap.length) {
          return;
        }

        $wrap.find(
          '.dgwt-wcas-search-icon, .js-dgwt-wcas-search-icon-handler, ' +
          '.dgwt-wcas-enable-mobile-form, .js-dgwt-wcas-enable-mobile-form, ' +
          '.dgwt-wcas-ico-magnifier-handler, .js-dgwt-wcas-ico-magnifier-handler'
        ).hide();

        var $form = $wrap.find('.dgwt-wcas-search-form');
        if ($form.length) {
          $form.css({
            display: 'flex',
            visibility: 'visible',
            opacity: 1,
            position: 'relative',
            left: 'auto',
            top: 'auto',
            minWidth: 0,
            width: '100%',
            maxWidth: '100%',
          }).show();
        }

        var $input = $wrap.find('.dgwt-wcas-search-input');
        if ($input.length) {
          $input.attr('placeholder', 'Search Products');
        }
      }

      initMobileUtilBarSearch();
      window.setTimeout(initMobileUtilBarSearch, 250);
      window.setTimeout(initMobileUtilBarSearch, 800);
    })();

    // Classic cart "remove line" uses GET + update_wc_div (not mini-cart remove_from_cart).
    // WooCommerce triggers fragment refresh on updated_wc_div, but the header count can
    // stay stale for the last item (race / timing). wc_cart_emptied only fires when the
    // cart becomes empty — force sync after the session has settled.
    // The utility banner bulk progress is Blade-rendered; reset it when the cart empties via AJAX.
    (function () {
      function resetUtilityBannerBulkProgress() {
        var $banner = $('.utility-banner');
        if (!$banner.length) {
          return;
        }
        $banner.attr('data-total-units', '0');
        $banner.find('.utility-banner__dot').removeClass('filled tier-reached');
        $banner.find('.utility-banner__milestone').removeClass('reached');
        $banner.find('.utility-banner__bulk-label').text('Add bread for bulk savings');
      }

      $(document.body).on('wc_cart_emptied', function () {
        $('.cart-icon__count').text('0');
        resetUtilityBannerBulkProgress();
        if (typeof wc_cart_fragments_params === 'undefined') {
          return;
        }
        setTimeout(function () {
          $(document.body).trigger('wc_fragment_refresh');
        }, 150);
      });
    })();

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

      // GA4: fire view_item when quick-view modal opens
      $(document).on('click', '.quick-view-button', function() {
        if (!window.gtag) return;
        var productId = $(this).data('product_id');
        var productName = $(this).attr('title') ||
                          $(this).find('h3').text().trim() ||
                          $(this).closest('.carousel-caption').find('h4').text().trim() ||
                          '';
        window.gtag('event', 'view_item', {
          items: [{
            item_id: String(productId),
            item_name: productName,
          }],
        });
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

    });
  },
};