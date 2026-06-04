export default {
  init() {
    // JavaScript to be fired on the cart page
    $.noConflict();
  },
  finalize() {
    // JavaScript to be fired on the cart page, after the init JS

    const dayjs = require('dayjs');
    const customParseFormat = require('dayjs/plugin/customParseFormat');
    const utc = require('dayjs/plugin/utc');
    const timezone = require('dayjs/plugin/timezone');
    const advancedFormat = require('dayjs/plugin/advancedFormat');
    dayjs.extend(customParseFormat);
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(advancedFormat);

    dayjs.tz.setDefault('America/Edmonton');

    function setCartModalBackdrop(on) {
      if (typeof window.matchMedia === 'function' && !window.matchMedia('(min-width: 768px)').matches) {
        return;
      }
      $('body').toggleClass('cart-modal-open', on);
    }

    // Coupon slidein
    $(document).on('click', '.js-show-coupon-btn', function() {
      $('#loyalty-points-slidein').stop(true, true).fadeOut(200);
      $('#coupon-slidein').addClass('show-coupon');
      setCartModalBackdrop(true);
    });

    $(document).on('mousedown touchstart', function(event) {
      var $slidein = $('#coupon-slidein');
      if (
        $slidein.hasClass('show-coupon') &&
        !$slidein.is(event.target) &&
        $slidein.has(event.target).length === 0 &&
        !$(event.target).closest('.js-show-coupon-btn').length
      ) {
        $slidein.removeClass('show-coupon');
        setCartModalBackdrop(false);
      }
    });

    // Loyalty points login slidein
    $(document).on('click', '.js-show-loyalty-points-btn', function() {
      $('#coupon-slidein').removeClass('show-coupon');
      setCartModalBackdrop(true);
      $('#loyalty-points-slidein').fadeIn(200);
    });

    $(document).on('click', '.close-loyalty-modal', function() {
      $('#loyalty-points-slidein').fadeOut(200, function() {
        setCartModalBackdrop(false);
      });
    });

    $(document).on('mousedown touchstart', function(event) {
      var $modal = $('#loyalty-points-slidein');
      if (
        $modal.is(':visible') &&
        !$modal.is(event.target) &&
        $modal.has(event.target).length === 0 &&
        !$(event.target).closest('.js-show-loyalty-points-btn').length
      ) {
        $modal.fadeOut(200, function() {
          setCartModalBackdrop(false);
        });
      }
    });

    function getDatesBetweenDates(rangeStartDate, rangeEndDate) {
      const dates = [];
      let start = dayjs(rangeStartDate);
      const end = dayjs(rangeEndDate);

      while (start.isSame(end) || start.isBefore(end)) {
        dates.push(start.clone().format('YYYY-MM-DD'));
        start = start.add(1, 'day');
      }

      return dates;
    }

    function sessionDateIsSelectable(selectedDate, allowedDates, minDateFormatted) {
      if (!selectedDate) {
        return false;
      }
      const parsed = dayjs(selectedDate, 'YYYY-MM-DD');
      if (!parsed.isValid()) {
        return false;
      }
      if (parsed.isBefore(minDateFormatted, 'day')) {
        return false;
      }
      return allowedDates.includes(selectedDate);
    }

    function firstSelectableDate(allowedDates, minDateFormatted) {
      const candidates = allowedDates
        .filter((date) => date && dayjs(date, 'YYYY-MM-DD').isValid())
        .filter((date) => !dayjs(date, 'YYYY-MM-DD').isBefore(minDateFormatted, 'day'))
        .sort();

      return candidates.length ? candidates[0] : null;
    }

    function setPickupDetailText(id, value) {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = value == null ? '' : String(value);
      }
    }

    function setPickupDetailJson(id, value) {
      const el = document.getElementById(id);
      if (!el) {
        return;
      }
      el.textContent = JSON.stringify(Array.isArray(value) ? value : []);
    }

    function applyPickupCalendarState(data) {
      if (!data) {
        return;
      }

      setPickupDetailText('cart_lead_time_hours', data.lead_time_hours);
      setPickupDetailText('earliest_pickup_date', data.earliest_pickup_date);
      setPickupDetailText('session_pickup_date', data.session_pickup_date);
      setPickupDetailText('pickup_restriction_data', data.pickup_restriction);
      setPickupDetailText('pickup_restriction_end_data', data.pickup_restriction_end);
      setPickupDetailText(
        'long_fermentation_in_cart',
        data.long_fermentation_in_cart ? '1' : ''
      );
      setPickupDetailText(
        'two_days_notice_in_cart',
        data.two_days_notice_in_cart ? '1' : ''
      );
      setPickupDetailJson('pickup_vacation_dates_in_cart', data.vacation_dates);

      const availableEl = document.getElementById('available_dates_in_cart');
      if (availableEl) {
        setPickupDetailJson('available_dates_in_cart', data.available_dates);
      }

      const $leadNotice = $('.calendar-container .lf_notice--lead-time');
      if ($leadNotice.length) {
        $leadNotice.toggle(
          Boolean(data.long_fermentation_in_cart || data.two_days_notice_in_cart)
        );
      }
    }

    function readPickupDataFromDom() {
      const text = (id) => {
        const el = document.getElementById(id);
        return el ? el.textContent.trim() : '';
      };

      const leadHoursRaw = text('cart_lead_time_hours');
      const leadHours = leadHoursRaw ? parseInt(leadHoursRaw, 10) : 33;

      let vacationDays = [];
      const rawVacation = text('pickup_vacation_dates_in_cart');
      if (rawVacation) {
        try {
          vacationDays = JSON.parse(rawVacation);
          if (!Array.isArray(vacationDays)) {
            vacationDays = [];
          }
        } catch (e) {
          vacationDays = [];
        }
      }

      const availableRaw = text('available_dates_in_cart');
      let availableDatesFormatted = [];
      if (availableRaw) {
        try {
          availableDatesFormatted = JSON.parse(availableRaw);
        } catch (e) {
          availableDatesFormatted = [];
        }
      }

      return {
        pickupRestriction: text('pickup_restriction_data') || null,
        pickupRestrictionEnd: text('pickup_restriction_end_data') || null,
        selectedDate: text('session_pickup_date') || null,
        earliestPickupFromPhp: text('earliest_pickup_date') || null,
        leadHours: Number.isFinite(leadHours) ? leadHours : 33,
        vacationDays,
        availableDatesFormatted,
      };
    }

    function formatPickerDateForInput(date) {
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const yyyy = date.getFullYear();

      return `${dd}/${mm}/${yyyy}`;
    }

    function syncDateInputFromPicker($picker, $input) {
      if (!$picker.length || !$input.length || !$picker.hasClass('hasDatepicker')) {
        return;
      }

      const picked = $picker.datepicker('getDate');
      if (picked) {
        $input.val(formatPickerDateForInput(picked));
      }
    }

    function bindCartPickupDateFormSync($picker, $input) {
      const $form = $picker.closest('form');

      if (!$form.length || $form.data('bontonDateSyncBound')) {
        return;
      }

      $form.data('bontonDateSyncBound', true);

      $form.on('submit', function () {
        syncDateInputFromPicker($picker, $input);
      });
    }

    function initializeDatePicker(allowedDates, selectedDate, earliestPickupFormatted) {
      const $picker = $('#datepicker');
      const $input = $('#dateInput');

      if (!$picker.length) {
        return;
      }

      if ($picker.hasClass('hasDatepicker')) {
        $picker.off('click.bontonPickupDate');
        $picker.datepicker('destroy');
      }

      const selectable = sessionDateIsSelectable(
        selectedDate,
        allowedDates,
        earliestPickupFormatted
      );
      const firstDate = firstSelectableDate(allowedDates, earliestPickupFormatted);

      $picker.datepicker({
        onSelect: function () {
          syncDateInputFromPicker($picker, $input);
        },
        dateFormat: 'dd/mm/yy',
        beforeShowDay: function (date) {
          const string = jQuery.datepicker.formatDate('yy-mm-dd', date);
          const day = date.getDay();

          if (day === 0 || day === 1) {
            return [false];
          }

          if (dayjs(string, 'YYYY-MM-DD').isBefore(earliestPickupFormatted, 'day')) {
            return [false];
          }

          return [allowedDates.includes(string)];
        },
      });

      // jQuery UI often skips onSelect when changing from one highlighted day to another;
      // sync after the widget updates its internal selection.
      $picker.on('click.bontonPickupDate', '.ui-datepicker-calendar td a', function () {
        window.setTimeout(function () {
          syncDateInputFromPicker($picker, $input);
        }, 0);
      });

      bindCartPickupDateFormSync($picker, $input);

      $picker.find('.ui-state-active').removeClass('ui-state-active');

      if (selectable) {
        const selectedDateFormatted = dayjs(selectedDate, 'YYYY-MM-DD');
        $picker.datepicker(
          'setDate',
          selectedDateFormatted.format('DD/MM/YYYY')
        );
        syncDateInputFromPicker($picker, $input);
      } else {
        $input.val('');
        if (firstDate) {
          $picker.datepicker(
            'option',
            'defaultDate',
            dayjs(firstDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
          );
        }
      }
    }

    function markCartPickupCalendarReady() {
      $('#cart-pickup-calendar').addClass('cart-pickup-calendar--ready');
    }

    function cartDatepickerPluginReady() {
      return (
        typeof jQuery !== 'undefined' &&
        jQuery.fn &&
        typeof jQuery.fn.datepicker === 'function' &&
        !jQuery.fn.datepicker.DPGlobal
      );
    }

    function initCartPickupCalendar() {
      if (!document.getElementById('datepicker')) {
        return;
      }

      const data = readPickupDataFromDom();
      const pickupRestrictionFormatted = data.pickupRestriction
        ? dayjs(data.pickupRestriction, 'YYYY-MM-DD')
        : null;

      const earliestPickup =
        data.earliestPickupFromPhp ||
        dayjs()
          .tz('America/Edmonton')
          .add(data.leadHours, 'hour')
          .format('YYYY-MM-DD');
      const earliestPickupFormatted = dayjs(earliestPickup, 'YYYY-MM-DD');

      let minDate = earliestPickup;
      let maxDate = '2030-01-01';

      if (data.pickupRestriction) {
        if (
          pickupRestrictionFormatted &&
          pickupRestrictionFormatted.isBefore(earliestPickupFormatted, 'day')
        ) {
          minDate = earliestPickup;
        } else {
          minDate = data.pickupRestriction;
        }

        if (data.pickupRestrictionEnd) {
          maxDate = data.pickupRestrictionEnd;
        }
      }

      const startDate = dayjs(minDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
      const endDate = dayjs(maxDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
      const daterange = getDatesBetweenDates(startDate, endDate);

      const allowedDates = daterange
        .filter((date) => !data.vacationDays.includes(date))
        .filter((date) => !dayjs(date, 'YYYY-MM-DD').isBefore(earliestPickupFormatted, 'day'))
        .concat(
          data.availableDatesFormatted.filter(
            (date) => !dayjs(date, 'YYYY-MM-DD').isBefore(earliestPickupFormatted, 'day')
          )
        );

      initializeDatePicker(allowedDates, data.selectedDate, earliestPickupFormatted);
      markCartPickupCalendarReady();

      if (window.gtag && $('.cart-collaterals').hasClass('conflict')) {
        const reasons = [];
        if ($('.not-available-message').length) reasons.push('product_not_available');
        if ($('.sold_out_conflict').length) reasons.push('sold_out');
        if (!data.selectedDate) reasons.push('no_date_selected');
        window.gtag('event', 'cart_date_conflict', {
          conflict_reasons: reasons.join(', ') || 'unknown',
          items_in_cart: $('.woocommerce-cart-form__cart-item.title').length,
        });
      }
    }

    function initCartPickupCalendarWhenReady(attempt, force) {
      const tries = attempt || 0;

      if (!document.getElementById('datepicker')) {
        return;
      }

      if ($('#datepicker').hasClass('hasDatepicker') && !force) {
        markCartPickupCalendarReady();
        return;
      }

      if (!cartDatepickerPluginReady()) {
        if (tries < 60) {
          window.setTimeout(function () {
            initCartPickupCalendarWhenReady(tries + 1, force);
          }, 50);
        }
        return;
      }

      initCartPickupCalendar();
    }

    jQuery(function ($) {
      $('body').on('updated_cart_totals', function () {
        window.location.replace(window.location.pathname + window.location.search);
      });

      $(document.body).on('bonton_pickup_calendar_state_updated', function (e, data) {
        if (!document.getElementById('datepicker')) {
          return;
        }
        applyPickupCalendarState(data);
        initCartPickupCalendarWhenReady(0, true);
      });

      initCartPickupCalendarWhenReady(0, false);
    });
  },
};
