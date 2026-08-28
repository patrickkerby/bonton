/**
 * Init MultiDatesPicker on variation sold-out / availability fields.
 * WooCommerce loads variation HTML via AJAX, so this re-runs after those events.
 */
(function ($) {
  function initDatepickers(context) {
    if (typeof $.fn.multiDatesPicker !== 'function') {
      return;
    }

    $(context)
      .find('.bonton-variation-datepicker')
      .each(function () {
        var $field = $(this);
        if ($field.hasClass('hasDatepicker')) {
          return;
        }

        $field.multiDatesPicker({
          minDate: 0,
          dateFormat: 'y-m-d',
          showButtonPanel: true,
          changeMonth: true,
          changeYear: true,
          onSelect: function (dateText, inst) {
            inst.settings.defaultDate = dateText;
          },
        });
      });
  }

  $(function () {
    initDatepickers(document);

    $('#woocommerce-product-data').on(
      'woocommerce_variations_loaded woocommerce_variations_added',
      function () {
        initDatepickers(this);
      }
    );
  });
})(jQuery);
