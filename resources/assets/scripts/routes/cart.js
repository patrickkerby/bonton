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

    const AvailableDatesTarget = document.getElementById('available_dates_in_cart');
    const AvailableDates = AvailableDatesTarget ? AvailableDatesTarget.textContent : null;
    const availableDatesArray = AvailableDates ? JSON.parse(AvailableDates) : [];
    const availableDatesFormatted = availableDatesArray.map(date => dayjs(date, 'YY-MM-DD').format('YYYY-MM-DD'));

    jQuery(function ($) {
      $('body').on('updated_cart_totals', function () {
        location.reload(); // uncomment this line to refresh the page.
      });

      $(document).ready(function () {
        const time = longFermentation == 1 ? 57 : 33;

        // the "standard formula" is the current date + 33 hours or 57 hours if long fermentation. This prevents anyone from purchasing tomorrow (if it's past 3pm) and adds extra time if there's sourdough in the car.
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

        const vacationDays = ['2025-07-902', '2025-07-01'];
        const enableDays = ['']; 

        const allowedDates = daterange.filter(date => !vacationDays.includes(date)).concat(enableDays, availableDatesFormatted);

        initializeDatePicker(allowedDates, selectedDate, standardFormulaMinDateFormatted);
      });
    });
  },
};