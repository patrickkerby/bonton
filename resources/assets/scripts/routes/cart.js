import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

dayjs.tz.setDefault('America/Edmonton');

export default {
  init() {
    // JavaScript to be fired on all pages
    $.noConflict();
  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
    const pickupRestrictionTarget = document.getElementById('pickup_restriction_data');
    const pickupRestriction = pickupRestrictionTarget.textContent;
    const pickupRestrictionFormatted = dayjs(pickupRestriction, 'DD/MM/YYYY');

    const pickupRestrictionEndTarget = document.getElementById('pickup_restriction_end_data');
    const pickupRestrictionEnd = pickupRestrictionEndTarget.textContent;

    const presetDateTarget = document.getElementById('session_pickup_date');
    var presetDate = presetDateTarget ? presetDateTarget.textContent : null;

    const longFermentationTarget = document.getElementById('long_fermentation_in_cart');
    const longFermentation = longFermentationTarget.textContent;

    const pickup_restriction_check = Boolean(pickupRestriction);

    jQuery(($) => {
      $('body').on('updated_cart_totals', () => {
        location.reload();
      });

      $(document).ready(() => {
        const time = longFermentation == 1 ? 57 : 33;

        const standardFormulaMinDate = dayjs().add(time, 'hour').format('DD/MM/YYYY H:mm:ss');
        const standardFormulaMinDateFormatted = dayjs(standardFormulaMinDate, 'DD/MM/YYYY');

        let minDate = pickupRestriction ? standardFormulaMinDate : pickupRestriction;
        let maxDate = '01/01/2030';

        if (pickup_restriction_check) {
          minDate = pickupRestrictionFormatted.isBefore(standardFormulaMinDateFormatted) ? standardFormulaMinDate : pickupRestriction;
          maxDate = pickupRestrictionEnd || maxDate;
        }

        const minDateFormatted = dayjs(minDate, 'DD/MM/YYYY');
        const maxDateFormatted = dayjs(maxDate, 'DD/MM/YYYY');

        const vacationDays = ['2024-03-29', '2024-04-02'];
        const enableDays = ['2022-03-14'];

        $('#datepicker').datepicker({
          onSelect: (dateText) => {
            $('#dateInput').val(dateText);
          },
          minDate,
          maxDate,
          dateFormat: 'dd/mm/yy',
          beforeShowDay: (date) => {
            const day = date.getDay();
            const string = jQuery.datepicker.formatDate('yy-mm-dd', date);

            if (enableDays.includes(string)) {
              return [true, ''];
            }

            if (day == 0 || day == 1 || vacationDays.includes(string)) {
              return [false];
            }

            return [true];
          },
        }).find('.ui-state-active').removeClass('ui-state-active');

        if (pickup_restriction_check && presetDate) {
          const presetDateFormatted = dayjs(presetDate, 'DD/MM/YYYY');

          if (presetDateFormatted.isBefore(minDateFormatted) || presetDateFormatted.isAfter(maxDateFormatted)) {
            presetDate = null;
          }
        }

        if (presetDate) {
          const presetDateFormatted = dayjs(presetDate, 'DD/MM/YYYY');

          $('#datepicker').datepicker('setDate', presetDateFormatted > standardFormulaMinDateFormatted ? presetDate : standardFormulaMinDate);
        }
      });
    });
  },
};