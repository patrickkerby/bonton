export default {
  init() {
    // Featured product grid (category tabs section) — quick view clicks
    $(document).on('click', '.featured-product-grid .quick-view-button', function() {
      if (!window.gtag) return;
      window.gtag('event', 'product_quick_view', {
        product_name: $(this).find('h3').text().trim(),
        source_section: 'featured_categories',
        category_tab: $('#featuredCategoryTabs .nav-link.active').text().trim(),
      });
    });

    // Featured product carousels — "Order now!" quick view clicks
    $(document).on('click', '#featuredProducts1 .quick-view-button, #featuredProducts2 .quick-view-button', function() {
      if (!window.gtag) return;
      window.gtag('event', 'product_quick_view', {
        product_name: $(this).closest('.carousel-caption').find('h4').text().trim(),
        source_section: 'featured_carousel',
        carousel_id: $(this).closest('.carousel').attr('id'),
      });
    });
  },
  finalize() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  },
};
