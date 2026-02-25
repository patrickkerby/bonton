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


    // Mobile trigger for assorted options - supports both old and new plugin structure
    $(document).on('click', '#show-coupon-btn', function() {
      $('#coupon-slidein').addClass('show-coupon');
    });

    // Remove class when close button is clicked  
    $(document).on('click', '#close-coupon-slidein', function() {      
      $('#coupon-slidein').removeClass('show-coupon');
    });

    // Functions
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

    function initializeDatePicker(allowedDates, selectedDate, standardFormulaMinDateFormatted) {
      jQuery(function ($) {
        $('#datepicker').datepicker({
          onSelect: function (dateText) {
            $('#dateInput').val(dateText);
          },
          dateFormat: 'dd/mm/yy',
          beforeShowDay: function (date) {
            const string = jQuery.datepicker.formatDate('yy-mm-dd', date);
            var day = date.getDay();

            // Disable Sundays and Mondays
            if (day == 0 || day == 1){
              return [false];
            }

            // Disable all dates before the standard formula min date
            if (date < standardFormulaMinDateFormatted){
              return [false];
            }

            return [allowedDates.includes(string)];
          },
        }).find('.ui-state-active').removeClass('ui-state-active');

        if (selectedDate) {
          // Parse ISO date from PHP and set on datepicker
          const selectedDateFormatted = dayjs(selectedDate, 'YYYY-MM-DD');
          if (selectedDateFormatted.isAfter(standardFormulaMinDateFormatted)) {
            // Convert to datepicker's display format (dd/mm/yy) for setDate
            $('#datepicker').datepicker('setDate', selectedDateFormatted.format('DD/MM/YYYY'));
          } else {
            $('#datepicker').datepicker('setDate', standardFormulaMinDateFormatted.format('DD/MM/YYYY'));
          }
        }
      });
    }

    // Get variables from cart PHP (all dates now in YYYY-MM-DD format)
    const pickupRestrictionTarget = document.getElementById('pickup_restriction_data');
    const pickupRestriction = pickupRestrictionTarget ? pickupRestrictionTarget.textContent.trim() : null;
    const pickupRestrictionFormatted = pickupRestriction ? dayjs(pickupRestriction, 'YYYY-MM-DD') : null;

    const pickupRestrictionEndTarget = document.getElementById('pickup_restriction_end_data');
    const pickupRestrictionEnd = pickupRestrictionEndTarget ? pickupRestrictionEndTarget.textContent.trim() : null;

    const selectedDateTarget = document.getElementById('session_pickup_date');
    const selectedDate = selectedDateTarget ? selectedDateTarget.textContent.trim() : null;

    const longFermentationTarget = document.getElementById('long_fermentation_in_cart');
    const longFermentation = longFermentationTarget ? longFermentationTarget.textContent.trim() : null;

    const twoDaysNoticeTarget = document.getElementById('two_days_notice_in_cart');
    const twoDaysNotice = twoDaysNoticeTarget ? twoDaysNoticeTarget.textContent.trim() : null;

    const AvailableDatesTarget = document.getElementById('available_dates_in_cart');
    const AvailableDates = AvailableDatesTarget ? AvailableDatesTarget.textContent.trim() : null;
    const availableDatesArray = AvailableDates ? JSON.parse(AvailableDates) : [];
    // All dates are now in YYYY-MM-DD format from PHP, no conversion needed
    const availableDatesFormatted = availableDatesArray;

    jQuery(function ($) {
      $('body').on('updated_cart_totals', function () {
        location.reload();
      });

      $(document).ready(function () {
        // Determine time based on long fermentation OR two days notice requirements
        const time = (longFermentation == 1 || twoDaysNotice == 1) ? 57 : 33;

        // the "standard formula" is the current date + 33 hours or 57 hours if long fermentation
        // or two days notice. This prevents anyone from purchasing tomorrow (if it's past 3pm) and
        // adds extra time if there's sourdough or two-day-notice items in the cart.
        const standardFormulaMinDate = dayjs().add(time, 'hour').format('YYYY-MM-DD');
        const standardFormulaMinDateFormatted = dayjs(standardFormulaMinDate, 'YYYY-MM-DD');

        let minDate = standardFormulaMinDate;
        let maxDate = '2030-01-01';

        if (pickupRestriction) {
          if (pickupRestrictionFormatted.isBefore(standardFormulaMinDateFormatted)) {
            minDate = standardFormulaMinDate;
          } else {
            minDate = pickupRestriction;
          }

          if (pickupRestrictionEnd) {
            maxDate = pickupRestrictionEnd;
          }
        }

        const minDateFormatted = dayjs(minDate, 'YYYY-MM-DD');
        const maxDateFormatted = dayjs(maxDate, 'YYYY-MM-DD');
        const startDate = minDateFormatted.format('YYYY-MM-DD');
        const endDate = maxDateFormatted.format('YYYY-MM-DD');
        const daterange = getDatesBetweenDates(startDate, endDate);

        // Vacation/closure blackout dates — add future dates here as needed (format: YYYY-MM-DD)
        // TODO: Move to ACF date picker for easier management
        const vacationDays = [];
        const enableDays = [''];

        const allowedDates = daterange.filter(date => !vacationDays.includes(date)).concat(enableDays, availableDatesFormatted);

        initializeDatePicker(allowedDates, selectedDate, standardFormulaMinDateFormatted);
      });
    });
  },
};
