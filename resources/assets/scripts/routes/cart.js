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

            // Disable all other Saturdays and Sundays           
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
          const selectedDateFormatted = dayjs(selectedDate, 'DD/MM/YYYY');
          if (selectedDateFormatted.isAfter(standardFormulaMinDateFormatted)) {
            $('#datepicker').datepicker('setDate', selectedDate);
          } else {
            $('#datepicker').datepicker('setDate', standardFormulaMinDateFormatted.format('DD/MM/YYYY'));
          }
        }
      });
    }

    // Get variables from cart PHP
    const pickupRestrictionTarget = document.getElementById('pickup_restriction_data');
    const pickupRestriction = pickupRestrictionTarget ? pickupRestrictionTarget.textContent : null;
    const pickupRestrictionFormatted = pickupRestriction ? dayjs(pickupRestriction, 'DD/MM/YYYY') : null;

    const pickupRestrictionEndTarget = document.getElementById('pickup_restriction_end_data');
    const pickupRestrictionEnd = pickupRestrictionEndTarget ? pickupRestrictionEndTarget.textContent : null;

    const selectedDateTarget = document.getElementById('session_pickup_date');
    const selectedDate = selectedDateTarget ? selectedDateTarget.textContent : null;

    const longFermentationTarget = document.getElementById('long_fermentation_in_cart');
    const longFermentation = longFermentationTarget ? longFermentationTarget.textContent : null;

    const twoDaysNoticeTarget = document.getElementById('two_days_notice_in_cart');
    const twoDaysNotice = twoDaysNoticeTarget ? twoDaysNoticeTarget.textContent : null;

    const AvailableDatesTarget = document.getElementById('available_dates_in_cart');
    const AvailableDates = AvailableDatesTarget ? AvailableDatesTarget.textContent : null;
    const availableDatesArray = AvailableDates ? JSON.parse(AvailableDates) : [];
    const availableDatesFormatted = availableDatesArray.map(date => dayjs(date, 'YY-MM-DD').format('YYYY-MM-DD'));

    jQuery(function ($) {
      $('body').on('updated_cart_totals', function () {
        location.reload(); // uncomment this line to refresh the page.
      });

      $(document).ready(function () {
        // Determine time based on long fermentation OR two days notice requirements
        const time = (longFermentation == 1 || twoDaysNotice == 1) ? 57 : 33;

        // the "standard formula" is the current date + 33 hours or 57 hours if long fermentation or two days notice. This prevents anyone from purchasing tomorrow (if it's past 3pm) and adds extra time if there's sourdough or two-day-notice items in the cart.
        const standardFormulaMinDate = dayjs().add(time, 'hour').format('DD/MM/YYYY H:mm:ss');
        const standardFormulaMinDateFormatted = dayjs(standardFormulaMinDate, 'DD/MM/YYYY');

        let minDate = standardFormulaMinDate;
        let maxDate = '01/01/2030';

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

        const minDateFormatted = dayjs(minDate, 'DD/MM/YYYY');
        const maxDateFormatted = dayjs(maxDate, 'DD/MM/YYYY');
        const startDate = minDateFormatted.format('YYYY-MM-DD');
        const endDate = maxDateFormatted.format('YYYY-MM-DD');
        const daterange = getDatesBetweenDates(startDate, endDate);

        const vacationDays = ['2025-12-19', '2025-12-20', '2025-12-23', '2025-12-24', '2025-12-25', '2025-12-26', '2025-12-27', '2025-12-28', '2025-12-29', '2025-12-30', '2025-12-31', '2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04', '2026-01-05' ];
        const enableDays = ['']; 

        const allowedDates = daterange.filter(date => !vacationDays.includes(date)).concat(enableDays, availableDatesFormatted);

        initializeDatePicker(allowedDates, selectedDate, standardFormulaMinDateFormatted);
      });
    });
  },
};