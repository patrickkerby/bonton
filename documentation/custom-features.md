# BonTon Custom Features Documentation

This document tracks the custom functionalities and recent development work on the BonTon WordPress/WooCommerce site.

---

## 🎉 2024-2025 Year in Review

### Key Achievements

**🚀 Major Infrastructure Upgrades**
- **HPOS Migration**: Complete migration to High-Performance Order Storage for better scalability
- **PHP 8.0 Compatibility**: Updated entire codebase for modern PHP standards
- **Performance Optimization**: Implemented caching systems reducing database load significantly

**✨ New Customer-Facing Features**
- **Product Purchase Restrictions**: Flexible system for items requiring customer interaction
- **Two Days Notice Feature**: Product-level preparation time requirements
- **Enhanced Delivery Windows**: Improved scheduling and time slot management

**🛠 Operational Improvements**
- **Breadclub Query Optimization**: Dramatically improved page load times
- **Site-wide Notice System**: Easy dashboard widget for customer communications
- **Custom Cart Icon & Quantity Controls**: Removed plugin overhead, improved performance

**📊 Administrative Enhancements**
- **Delivery Export Script**: WP-CLI command for CSV reporting
- **Pickup Date Sorting**: Fixed and enhanced order management
- **Dashboard Widgets**: Streamlined admin workflows

**🔧 Code Quality & Maintenance**
- **160+ commits** in 2024-2025
- **Bug fixes**: Site-wide banner, quantity picker, date validation
- **Plugin updates**: Adapted to Custom Product Addons plugin changes
- **Email templates**: Full HPOS compatibility updates

### Statistics
- **Total Commits**: 160
- **Busiest Month**: August 2025 (30 commits) - HPOS migration
- **Major Features**: 12+
- **Bug Fixes**: 25+
- **Performance Optimizations**: 8

---

## 2026 Development Summary

### March 2026
- **Cart 2.0 — Major UI/UX Overhaul** - Complete refactor of cart page architecture, new utility banner, bulk pricing engine, and modular Blade template structure
- **Bulk Bread Discount System** - Tiered volume discount engine (10% at 5 units, 20% at 10 units) with ACF admin controls
- **Utility Banner** - Sticky site-wide bar with global date picker and visual bulk discount progress tracker
- **WoocommerceCart Controller** - New dedicated controller encapsulating all cart business logic
- **BulkPricing Helper** - Standalone helper class for discount calculations with blackout date support
- **AJAX Pickup Date Selector** - Save pickup date from any page without a full form submission
- **Cart Template Decomposition** - Split monolithic cart.blade.php into focused partials

### February 2026
- **GA4 Custom Event Tracking** - Full-funnel analytics tracking from homepage through purchase

### January 2026
- **Homepage Redesign** - New hero slider with CTA overlays, featured product categories with tabbed navigation, dynamic "Most Popular" and "Newest" product tabs, and reusable product grid partial
- **Helper Functions** - New `app/helpers.php` with product display category logic, popularity queries, and category tree utilities
- **Font Awesome Upgrade** - Migrated to Font Awesome 7 webfonts with explicit SCSS imports

---

## 2025 Development Summary

### November 2025
- **Product Purchase Restriction System** - Comprehensive restriction system for products requiring customer interaction
- **Saturday Delivery Logic Enhancement** - Improved delivery scheduling for Saturday pickups
- **ACF Options Refactor** - Moved ACF initialization to proper `acf/init` hook for better compatibility

### October 2025
- **Two Days Notice Feature** - Product-level toggle for items requiring 2+ days preparation time
- **Delivery Window Time Adjustment** - Updated Edmonton delivery window from 9am-1pm to 10am-2pm
- **Product Delivery Availability Switch** - Added ability to mark products as not available for delivery

### September 2025
- **PHP 8.0 Compatibility Update** - Updated composer dependencies and PHP version requirements
- **Breadclub Query Optimization** - Implemented caching system to reduce database load on breadclub pages
- **Real-time Cache Clearing** - Added automatic cache clearing for breadclub orders
- **Site-wide Banner Double-Click Fix** - Fixed AJAX dismiss issues and double-click problems
- **Custom Product Addons Refactor** - Updated assorted selections for new plugin version

### August 2025
- **HPOS Migration** - Complete migration to High-Performance Order Storage
- **Site-wide Notice Dashboard Widget** - Admin widget for managing customer-facing site notices
- **Delivery Export Script** - WP-CLI command for exporting delivery data to CSV
- **Pickup Date Column Sorting** - Fixed sorting functionality in order admin screens
- **Custom Cart Icon & Quantity Picker** - Replaced plugins with custom lightweight code
- **Email HPOS Updates** - Updated all email templates for HPOS compatibility
- **Order Dashboard Optimization** - Optimized queries and restricted script loading to relevant screens

---

## Recent Development Work

### Homepage Redesign (January 2026)

**Purpose**: Modernize the homepage with a structured hero section, categorized product browsing via tabs, and dynamic product discovery — replacing the previous static layout with a more engaging, conversion-oriented experience.

#### Hero Slider with CTA Overlays

**File**: `resources/views/home-page.blade.php`

The hero section uses a Bootstrap carousel with configurable slides managed through ACF:
- Full-bleed background images with white inset border
- Content overlay card (right-aligned on desktop, centered on mobile) with:
  - Heading, description text, and CTA button with configurable link
  - Previous/next navigation controls
- Auto-advances every 6 seconds with 10-second per-slide intervals
- Responsive: on mobile, the content card floats below the image with a drop shadow

**ACF Configuration**: Each slide is configured via the existing ACF `slide` repeater field with `title`, `content`, `link` (URL + title), and `image` fields.

#### Featured Categories with Tabbed Navigation

A new section below the hero displays products organized by category in a tabbed interface:

**Tabs** (dynamically rendered — only tabs with products appear):

| Tab | Source | Products |
|---|---|---|
| Bakery | ACF field `featured_categories.bakery_products` | Admin-curated product selection |
| Pâtisserie | ACF field `featured_categories.patisserie_products` | Admin-curated product selection |
| Grocery | ACF field `featured_categories.grocery_products` | Admin-curated product selection |
| Most Popular | `App\get_most_popular_products(6)` | Top 6 by `total_sales` meta |
| Newest | `App\get_newest_products(6)` | 6 most recently published |

Each tab links to the corresponding filtered shop page. Tabs use Bootstrap's tab component with pill-style buttons.

**ACF Configuration**: The `featured_categories` group (under the existing `featured_products` field group) has sub-fields for bakery, patisserie, and grocery product selections. The "Most Popular" and "Newest" tabs are dynamically queried.

#### Featured Product Grid Partial

**File**: `resources/views/partials/featured-product-grid.blade.php`

A reusable partial that displays products in a 2-column card grid:
- Product thumbnail (medium size, 160×120px, object-fit cover)
- Product name (serif font)
- Display category label (smart selection via `get_product_display_category()`)
- Clicking any card opens the Quick View popover
- Responsive: stacks to single column on mobile
- Card hover effect with elevated shadow

#### Helper Functions

**File**: `app/helpers.php` (new functions added)

Three new helper functions were added to support the homepage:

1. **`get_product_display_category($product_id)`** — Intelligent category label selection:
   - Priority 1: Yoast SEO primary category (if set, is a subcategory, and not in "collections" tree)
   - Priority 2: First subcategory not in the "collections" tree
   - Returns empty string for top-level-only or "collections" products (intentionally hidden)

2. **`get_most_popular_products($count)`** — Fetches top products ordered by `total_sales` meta value

3. **`get_newest_products($count)`** — Fetches most recently published products by date

4. **`is_in_collections($term, $collections_term_id)`** — Utility to walk the term parent chain and check if a category belongs to the "collections" tree (excluded from display labels)

#### Styling

**File**: `resources/assets/styles/layouts/_home.scss`

Major updates to the homepage layout:
- Hero slider: full-height with responsive breakpoints (730px desktop → 290px mobile)
- CTA content card: white background, right-aligned on desktop, centered with shadow on mobile
- Carousel nav controls using Font Awesome 7 chevron icons
- Story/process thumbnails section with cream background and hover effects

**File**: `resources/assets/styles/components/_featuredproducts.scss`

Expanded significantly with:
- Featured categories tab navigation: pill-style buttons with brand colors, horizontal scroll on mobile with fade-out gradient
- Product grid: 2-column CSS grid layout with responsive single-column fallback
- Product cards: horizontal card with thumbnail, title, category label, and chevron arrow
- Carousel indicators: vertical text list with decorative dot separators and arrow indicators
- Carousel items: 490px height with white inset border and brand-colored caption overlay

#### Font Awesome Upgrade

**File**: `resources/assets/styles/autoload/_fontawesome.scss`

Added explicit Font Awesome 7 webfont imports (Solid, Regular, Brands) with proper `font-display: block` for reliable icon rendering across the site.

#### ACF Field Changes

- `resources/acf-json/group_5eb733297d6bd.json` — Updated homepage field group with new `featured_categories` sub-group containing bakery, patisserie, and grocery product relationship fields
- `resources/acf-json/group_5ecebf98326d8.json` — Updated related field group configuration

#### Files Modified / Created

**New files**:
- `resources/views/partials/featured-product-grid.blade.php`
- `resources/assets/styles/autoload/_fontawesome.scss`

**Modified files**:
- `app/helpers.php` — Added `get_product_display_category()`, `get_most_popular_products()`, `get_newest_products()`, `is_in_collections()`
- `app/setup.php` — Font Awesome webfont registration
- `resources/views/home-page.blade.php` — Complete restructure with tabbed categories and hero CTA
- `resources/assets/styles/layouts/_home.scss` — Hero slider and homepage section styling
- `resources/assets/styles/components/_featuredproducts.scss` — Category tabs, product grid, and carousel styling
- `resources/acf-json/group_5eb733297d6bd.json` — Homepage ACF field updates
- `resources/acf-json/group_5ecebf98326d8.json` — Related ACF field updates
- `package.json` — Updated dependencies

### GA4 Custom Event Tracking (February 2026)

**Purpose**: Measure the impact of new homepage features (hero CTA, featured products by category, homepage add-to-cart) and track the full customer purchase funnel.

**Architecture**: Hybrid approach using two systems:
1. **GTM + gtm4wp plugin** — Handles all standard ecommerce events (`page_view`, `add_to_cart`, `begin_checkout`, `purchase`, `view_item`, etc.) automatically via the GTM container `GTM-WFXR55C` and the "Google Tag Manager for WordPress" plugin (gtm4wp v1.22+). A GA4 Configuration tag in GTM forwards these to property `G-HTCXG3J87J`.
2. **Direct gtag.js** — Handles custom events unique to Bon Ton that no plugin provides (`homepage_product_click`, `view_item`, `filter_category`, `cart_date_conflict`). Configured with `send_page_view: false` to avoid duplicating page views with GTM.

**Custom Events (via direct gtag.js in theme code)**:

| Event | Location | Fires When | Key Parameters |
|---|---|---|---|
| `homepage_product_click` | Homepage only | Product clicked in featured grid or carousels | `product_name`, `source_section`, `category_tab` or `carousel_id` |
| `view_item` | All pages with quick-view | Quick-view modal opened for any product | `items[].item_id`, `items[].item_name` |
| `filter_category` | Shop pages | Category filter selected in sidebar | `category_name` |
| `cart_date_conflict` | Cart page | Cart loads with availability/date conflict | `conflict_reasons`, `items_in_cart` |

**Standard Ecommerce Events (via GTM + gtm4wp plugin)**:

| Event | GTM Tag | GTM Trigger |
|---|---|---|
| `page_view` | GA4 - Bon Ton (Google Tag) | Initialization - All Pages |
| `add_to_cart` | GA4 - add_to_cart | CE - add_to_cart |
| `begin_checkout` | GA4 - begin_checkout | CE - begin_checkout |
| `purchase` | GA4 - purchase | CE - purchase |
| `add_shipping_info` | GA4 - add_shipping_info | CE - add_shipping_info (`gtm4wp.addShippingInfoEEC`) |
| `add_payment_info` | GA4 - add_payment_info | CE - add_payment_info (`gtm4wp.addPaymentInfoEEC`) |

All GA4 Event tags have "Send Ecommerce data" enabled with Data Layer as the source.

**Files Modified**:
- `resources/assets/scripts/routes/home.js` — Homepage product click tracking (featured grid + carousels)
- `resources/assets/scripts/routes/common.js` — `view_item` on quick-view modal open (site-wide) + shop page filter tracking (`filter_category`)
- `resources/assets/scripts/routes/cart.js` — Cart conflict detection on page load
- `resources/views/partials/head.blade.php` — Direct gtag.js init with `send_page_view: false` (custom events only)
- `app/filters.php` — Server-side `purchase` via Measurement Protocol (currently **disabled**, see below)

**Technical Details**:

- All custom JS events use `window.gtag` with a guard check, so they degrade silently if GA4 is ever removed
- The `view_item` event populates GA4's "Items viewed" column in Monetization > Ecommerce purchases, enabling a full viewed → added to cart → purchased funnel per product
- The `cart_date_conflict` event identifies specific conflict types: `product_not_available`, `sold_out`, `no_date_selected`
- The gtag.js config uses `send_page_view: false` because GTM's GA4 tag handles page views — without this flag, every page would be double-counted
- GTM's legacy Universal Analytics tags (from ~2019-2020) are defunct since UA was sunset in July 2023. They can be cleaned up but cause no harm.

**How to Use in GA4**:
1. **Reports > Engagement > Events** — See all custom events and their counts
2. **Reports > Monetization > Ecommerce purchases** — Per-product funnel: items viewed → added to cart → purchased
3. **Reports > Monetization > Purchase journey** — Full session funnel: session start → view product → add to cart → checkout → purchase
4. **Reports > Monetization > Checkout journey** — Checkout funnel: begin checkout → add shipping → add payment → purchase
5. **Explore > Free Form** — Build custom reports filtering by event parameters (e.g., `filter_category` by `category_name`)
6. **Date comparison** — Compare any date range before vs. after features launched to measure impact

**Server-side purchase tracking (currently disabled)**:

The GA4 Measurement Protocol server-side `purchase` event in `app/filters.php` is currently commented out. It caused duplicate revenue in GA4 because the Measurement Protocol uses a synthetic `client_id` that doesn't match the browser's, and GA4's `transaction_id` deduplication was unreliable across different client IDs. GTM + gtm4wp handles purchase tracking client-side. To re-enable in the future, implement passing the browser's real GA4 `client_id` (from the `_ga` cookie) to the server-side code, which would allow GA4 to deduplicate correctly. The API secret is configured via `BONTON_GA4_API_SECRET` in `.env`.

### Cart 2.0 — Major UI/UX Overhaul (March 2026)

**Purpose**: Complete refactor of the WooCommerce cart experience — separating business logic from templates, introducing a modular Blade partial structure, adding a bulk bread discount system with visual progress tracking, and providing a sticky utility banner for date selection and discount awareness across all pages.

#### Architecture Changes

**New `WoocommerceCart` Controller** (`app/Controllers/WoocommerceCart.php`)

Extracts all cart business logic from Blade templates into a dedicated Sage controller, providing clean data to views via auto-wired public methods.

Key methods and their responsibilities:
- `post3pm()` — Whether the current time is past the 3PM cutoff (Edmonton timezone)
- `sessionPickupDate()` — Human-readable pickup date string from WC session
- `sessionDateObject()` — The DateTime object for the selected pickup date
- `sessionFormatted()` — ISO Y-m-d date string, with legacy `d/m/Y` format migration
- `pickupDayOfWeek()` — Day-of-week name for the pickup date (e.g., "Saturday")
- `cartItemsData()` — Core method that computes per-item availability, sold-out conflicts, restrictions, long fermentation, two-days-notice, and bulk pricing eligibility. Returns an array of item data for the view to loop over. Sets internal flags used by other accessor methods.
- `conflict()` — Whether there is a date/availability conflict preventing checkout
- `giftcertificateOnlyItemInCart()` — Whether the cart only contains gift certificates
- `longFermentationInCart()` / `twoDaysNoticeInCart()` / `restrictedInCart()` — Cart-level flags
- `datetimeButtonCopy()` — Dynamic button label ("Update" vs "Select date to continue")
- `allAvailableDates()` — Accumulated override dates across all items (Y-m-d strings)
- `restrictedStartDateJs()` / `restrictedEndDateJs()` / `sessionPickupDateJs()` — Date strings formatted for JavaScript consumption

**New `BulkPricing` Helper** (`app/Helpers/BulkPricing.php`)

Standalone static helper class for the bulk bread discount system.

Constants:
- `TIER_1_THRESHOLD = 5` (units for 10% off)
- `TIER_2_THRESHOLD = 10` (units for 20% off)
- `TIER_1_DISCOUNT = 0.10`, `TIER_2_DISCOUNT = 0.20`

Key methods:
- `is_enabled()` — Checks ACF toggle and blackout dates (compares against session pickup date)
- `is_product_eligible($product_id)` — Checks category (Bread 52, Buns & Bagels 91), hardcoded exclusion list, and per-product ACF exclusion field
- `quantity_to_units($cart_item)` — Converts quantities to "units" based on package size (single = 1/6, half-dozen = 1, dozen = 2)
- `get_item_discount($cart_item, $discount_rate)` — Calculates per-item savings; singles are discounted only in full batches of 6
- `get_progress()` — Read-only calculation returning current tier, units, savings, next-tier target, and eligible product IDs. Used by both the cart totals and the utility banner.

**Unit Counting Logic**:

| Package Size | Units per Quantity |
|---|---|
| Single | 1/6 |
| Half-Dozen / 6-pack | 1 |
| Dozen | 2 |

**ACF Admin Controls**:
- `bulk_discount` (Options page) — Global enable/disable toggle
- `bulk_discount_blackout_dates` (Options page) — Repeater of dates to disable bulk pricing
- `bulk_discount_exclusion` (Per-product) — Exclude individual products

#### Utility Banner

**Files**: `resources/views/partials/utility-banner.blade.php`, `resources/assets/styles/layouts/_utility-banner.scss`

A sticky banner at the top of every page (except for wholesale users) with two interactive sections:

1. **Global Date Picker** — Button displaying the selected pickup date (or "Select pickup date"). On non-cart pages, opens a Bootstrap datepicker dropdown for AJAX date selection. On the cart page, scrolls to the existing calendar with a highlight animation to avoid duplicate datepicker conflicts.

2. **Bulk Discount Progress Tracker** — Visual dot-based progress indicator (10 dots, split into two tiers of 5). Shows:
   - Current tier reached (10% or 20%)
   - How many more units needed for the next tier
   - An info popover explaining the discount tiers
   - Responsive design: labels hidden on mobile, popover slides up from bottom

**AJAX Endpoint** (`app/filters.php`):
- Action: `save_pickup_date` (both `wp_ajax_` and `wp_ajax_nopriv_`)
- Accepts `date` in `d/m/Y` format, stores in WC session
- Returns `date_display` (short format like "Mar 15") for live label update
- Security: nonce verification via `bontonData.nonce`

**JavaScript** (`resources/assets/scripts/routes/common.js`):
- Date picker initialization and dropdown toggle
- Cart page: button scrolls to existing calendar instead of opening dropdown
- Non-cart pages: Bootstrap datepicker with AJAX save on date change
- Bulk info popover toggle with outside-click dismissal

#### Cart Template Decomposition

The monolithic `cart.blade.php` (previously 600+ lines) was refactored into focused partials:

| File | Purpose |
|---|---|
| `cart.blade.php` | Main layout: items table, cart collaterals, conflict alerts |
| `partials/cart-item-row.blade.php` | Single cart item row: name, availability badges, day-of-week dots, quantity, subtotal with bulk discount strikethrough |
| `partials/date-picker-sidebar.blade.php` | Right sidebar: loyalty points modal, coupon input, jQuery UI datepicker calendar, fermentation/notice/restriction warnings, delivery info links |
| `partials/js-pickup-data.blade.php` | Hidden div passing PHP variables to cart.js (restriction dates, session date, flags) |
| `partials/modal-delivery.blade.php` | Bootstrap modal with delivery details (Deeleeo, Saturday 10am-2pm window) |
| `partials/modal-bags.blade.php` | Bootstrap modal explaining Edmonton single-use bag bylaw options |

#### Cart Item Row Features

Each cart item row now displays:
- **Day-of-week availability badges** — Visual S/M/T/W/T/F/S dot indicators showing which days the product is available
- **Bulk discount eligible label** — "Bulk discount eligible" tag with dollar icon
- **Long fermentation / Two days notice** — Clock icon with "2 days notice req." label
- **Sold out dates** — Per-item sold-out date display with conflict detection
- **Special availability overrides** — Dates when an item is available outside its normal schedule
- **Delivery exclusion** — "Not available for delivery" indicator
- **Bulk discount pricing** — Strikethrough original price with discounted price when bulk tier is active

#### Cart Totals Enhancements

**File**: `resources/views/woocommerce/cart/cart-totals.blade.php`

- **Dynamic date label** — Shows "Delivery date:" or "Pickup date:" based on chosen shipping method
- **Shipping info modals** — Info icon links to delivery details modal
- **Bulk discount line** — Displayed as a fee row with special `.bulk-discount` class styling
- **Bag fee info** — Info icon links to bag bylaw modal

#### Cart Shipping Logic

**File**: `resources/views/woocommerce/cart/cart-shipping.blade.php`

Refactored delivery availability logic:
- **Delivery blackout dates array** — Configurable array for dates at delivery capacity (replaces hardcoded date checks)
- **Saturday-only delivery** — Delivery available on Saturdays unless blackout, ice cream in cart, or delivery-excluded product
- **Wholesale user override** — Wholesale users always see delivery option
- **Dynamic messaging** — Capacity messages for blackout dates, general "Saturdays only" message otherwise

#### Styling

**File**: `resources/assets/styles/layouts/_cart.scss` (expanded significantly)

Major styling additions for the new cart layout:
- Day-of-week availability badges (`.day-badges`, `.day-badge`)
- Bulk discount indicators and strikethrough pricing
- Special notes container for per-item metadata
- Points/coupon slide-in panels
- Calendar container and date picker sidebar
- Conflict and not-available state styling
- Loyalty modal styling
- Responsive breakpoints for mobile cart experience

**File**: `resources/assets/styles/layouts/_utility-banner.scss` (new)

Complete utility banner styling including:
- Sticky positioning with cream background
- Date picker dropdown with jQuery UI datepicker overrides
- Dot-based progress visualization with tier milestones
- Info popover with responsive bottom-sheet on mobile
- All responsive breakpoints

**File**: `resources/assets/styles/components/_forms.scss`

Added quantity input styling for the custom +/- quantity controls in the cart.

#### Layout Integration

The utility banner and bulk discount data were integrated into all site layouts:

- `resources/views/layouts/app.blade.php` — Added `@include('partials.utility-banner')`
- `resources/views/layouts/contained.blade.php` — Added utility banner include
- `resources/views/layouts/products.blade.php` — Added utility banner include
- `resources/views/layouts/shop.blade.php` — Added utility banner include
- `resources/views/partials/page-header.blade.php` — Passes `$bulk_discount_progress` data
- `app/Controllers/App.php` — Added `globalPickupDateShort()` and `bulkDiscountProgress()` methods for site-wide data
- `app/setup.php` — Registered AJAX handlers for `save_pickup_date`

#### Files Modified / Created

**New files**:
- `app/Controllers/WoocommerceCart.php`
- `app/Helpers/BulkPricing.php`
- `resources/views/partials/utility-banner.blade.php`
- `resources/views/woocommerce/cart/partials/cart-item-row.blade.php`
- `resources/views/woocommerce/cart/partials/date-picker-sidebar.blade.php`
- `resources/views/woocommerce/cart/partials/js-pickup-data.blade.php`
- `resources/views/woocommerce/cart/partials/modal-delivery.blade.php`
- `resources/views/woocommerce/cart/partials/modal-bags.blade.php`
- `resources/assets/styles/layouts/_utility-banner.scss`

**Modified files**:
- `app/Controllers/App.php` — Global pickup date and bulk progress methods
- `app/filters.php` — AJAX handler, reduced inline cart logic (moved to controller)
- `app/setup.php` — AJAX action registration
- `resources/assets/scripts/routes/common.js` — Utility banner JS (date picker, bulk popover)
- `resources/assets/scripts/routes/cart.js` — Simplified date picker init and GA4 tracking
- `resources/assets/styles/layouts/_cart.scss` — Major expansion for new cart UI
- `resources/assets/styles/components/_forms.scss` — Quantity input styling
- `resources/assets/styles/main.scss` — Imported utility-banner stylesheet
- `resources/views/woocommerce/cart/cart.blade.php` — Restructured to use partials and controller data
- `resources/views/woocommerce/cart/cart-totals.blade.php` — Dynamic labels, bulk discount display
- `resources/views/woocommerce/cart/cart-shipping.blade.php` — Blackout dates array, cleaner logic
- `resources/views/layouts/app.blade.php` — Utility banner include
- `resources/views/layouts/contained.blade.php` — Utility banner include
- `resources/views/layouts/products.blade.php` — Utility banner include
- `resources/views/layouts/shop.blade.php` — Utility banner include
- `resources/views/partials/page-header.blade.php` — Bulk discount data pass-through

**Reference**: See `documentation/bulk-discount.md` for original bulk discount business rules.

### Product Purchase Restriction System (November 2025)

**Purpose**: Enable administrators to restrict certain products from online purchase, requiring customers to call or visit in person for items that need more interaction (e.g., full-sized custom cakes).

**Features**:
- Checkbox-based restriction system for both simple and variable products
- Simple products: Checkbox in Product Data → General tab
- Variable products: Checkbox at individual variation level
- Dynamic customer notice with store phone number
- Automatic Add to Cart button disabling for restricted items
- Full compatibility with quick view modal and single product pages
- JavaScript-powered dynamic behavior for variation selection

**Implementation Details**:
- Backend: `woocommerce_is_purchasable` filter prevents purchase at server level
- Frontend: Dynamic notice appears/disappears based on product/variation selection
- Simple products: Notice always visible, button always disabled
- Variable products: Notice shows/hides based on selected variation
- Phone number pulled from ACF Options → Contact Details → Phone field (fallback: (780) 489-7717)

**Files Modified**:
- `app/filters.php` - Added admin fields, purchase prevention logic, notice display, and JavaScript

**Usage**:
```
For Simple Products:
1. Edit product in WooCommerce
2. Go to Product Data → General tab
3. Check "Restrict Online Purchase" checkbox
4. Save product

For Variable Products:
1. Edit product in WooCommerce
2. Go to Product Data → Variations tab
3. Expand specific variation (e.g., "Full Size")
4. Check "Restrict Online Purchase" checkbox
5. Save product
```

**Customer Experience**:
When a restricted product/variation is selected, customers see:
- Yellow notice box: "This item requires special ordering. Please call us at [phone] or visit our store to place this order."
- Disabled Add to Cart button
- Notice dynamically appears/disappears as different variations are selected

### Two Days Notice Feature (October 2025)

**Purpose**: Allow products to require minimum 2 days notice for pickup, giving more flexibility than the tag-based long fermentation feature.

**Features**:
- Product-level ACF toggle: "Requires Two Days Notice?"
- Generic messaging suitable for any product type
- 57-hour minimum lead time (same as long fermentation)
- Works alongside existing long fermentation feature
- Individual product control vs category/tag based

**Implementation Details**:
- ACF field: `requires_two_days_notice` (True/False toggle)
- Cart template checks each product and displays per-item notice
- JavaScript date picker enforces 57-hour minimum
- User-friendly messaging: "This product requires two days notice"

**Files Modified**:
- `resources/acf-json/group_5e9748437ba61.json` - Added ACF field
- `resources/views/woocommerce/cart/cart.blade.php` - Added PHP logic and messaging
- `resources/assets/scripts/routes/cart.js` - Added JavaScript date picker logic

**Usage**:
```
1. Edit product in WooCommerce admin
2. Find "Product Availability & Restrictions" section
3. Toggle "Requires Two Days Notice?" to Yes
4. Save product
```

**Customer Experience**:
- Per-product notice: "*Note: This product requires two days notice"
- Date picker prevents selection within 57 hours
- Info banner: "One or more products in your cart require at least two days notice for preparation"

**Reference**: See `documentation/two-days-notice-feature.md` for complete technical documentation.

### HPOS Migration (August 2025)

**Purpose**: Migrate to WordPress/WooCommerce's new High-Performance Order Storage system for better scalability and performance.

**Major Changes**:
- Converted all custom order meta handling to HPOS-compatible methods
- Updated order queries to use `wc_get_orders()` instead of `WP_Query`
- Modified all operational list templates (baking, packing, pickup) for HPOS
- Updated email templates to use HPOS order objects
- Ensured backward compatibility with legacy post-based storage

**Files Modified**:
- `app/admin.php` - Order meta handling, admin columns, sortable columns
- `app/filters.php` - Order queries, meta data storage/retrieval
- All operational list templates - Order fetching and processing
- Email customizations - Order data access patterns

**Impact**: 
- Improved performance on high-order-volume days
- Future-proof compatibility with WooCommerce updates
- Maintains backward compatibility for existing orders

### Breadclub Query Optimization (September 2025)

**Purpose**: Reduce database load and page load times for breadclub-related pages through intelligent caching.

**Implementation**:
- Implemented caching for breadclub order queries
- Added real-time cache clearing when breadclub orders are modified
- Optimized queries to use HPOS-compatible methods
- Reduced repeated database calls across multiple views

**Files Modified**:
- Breadclub list templates - Added query caching
- Order update hooks - Automatic cache invalidation

**Performance Impact**:
- Significant reduction in page load times
- Lower database server load during peak usage
- Improved user experience for admin staff

### Site-wide Notice Dashboard Widget (August 2025)

**Purpose**: Provide easy-to-use interface for managing customer-facing site notices without navigating through settings.

**Features**:
- Dashboard widget with toggle to enable/disable notices
- WYSIWYG text editor for notice content (HTML supported)
- Preview functionality before publishing
- Automatic WP Rocket cache clearing when updated
- Server-side dismissal tracking with cookies
- No need to access WooCommerce settings

**Location**: `app/admin.php` (lines 256-394)

**Usage**:
```
1. Go to WordPress Dashboard
2. Find "Site-wide Notice" widget
3. Toggle notice on/off
4. Enter/edit notice text
5. Save - changes take effect immediately
```

**Technical Details**:
- AJAX-based save functionality
- Integrated cache clearing for instant updates
- Cookie-based user dismissal tracking
- Hooks into WooCommerce notice system

### Custom Cart Icon & Quantity Picker (August 2025)

**Purpose**: Replace heavy third-party plugins with custom lightweight code for better performance.

**Changes**:
- Removed AJAX cart plugins
- Implemented custom cart count updates using WooCommerce fragments
- Created custom quantity input controls with +/- buttons
- Added JavaScript for real-time cart updates

**Benefits**:
- Reduced plugin overhead
- Faster page load times
- Better control over styling and functionality
- Eliminated plugin compatibility issues

**Files Modified**:
- `resources/assets/scripts/routes/common.js` - Quantity picker logic
- `app/filters.php` - Cart fragments for AJAX updates

### Delivery Window Time Adjustment (October 2025)

**Purpose**: Update delivery time windows to better match operational capacity and customer expectations.

**Change**: Edmonton delivery window adjusted from 9am-1pm to 10am-2pm

**Files Modified**:
- `resources/views/woocommerce/cart/cart.blade.php` - Updated delivery time display

### 3PM Cutoff Logic Analysis & Hardening (Ongoing)

**Purpose**: Comprehensive security audit and fix for 3PM next-day order cutoff system after intermittent failures.

**Issues Identified**:
1. **Timezone DST Bug**: PHP using `MST` (no DST) vs JavaScript using `America/Edmonton` (with DST) caused 1-hour offset during daylight saving
2. **Unreachable Validation Code**: Early returns in checkout validation prevented server-side enforcement
3. **Hour-Only Comparison**: System allowed orders during 3:00-3:59 PM hour
4. **Client-Side Only Enforcement**: Primary validation relied on JavaScript (bypassable)
5. **Session Persistence**: Dates selected before 3PM remained valid after 3PM

**Recommended Fixes**:
- Change all PHP timezone from `MST` to `America/Edmonton` for DST compatibility
- Remove early return statements blocking validation
- Change hour comparison from `>` to `>=` to include 3:00 PM hour
- Add time-based session validation
- Strengthen server-side validation

**Impact**: Critical business logic affecting order fulfillment and customer expectations

**Reference**: See `documentation/3pm-cutoff-analysis.md` for complete vulnerability analysis and recommended fixes.

### Pickup Date Column Sorting (December 2024)

**Issue**: The pickup date column in WooCommerce admin orders screen was not sortable.

**Solution**: Fixed multiple issues with the sortable column implementation:

1. **Added `pickup_date_sort` meta field generation** - When saving pickup dates, automatically creates a sortable date format (`Y-m-d`)
2. **Fixed HPOS sorting logic** - Corrected the `orderby` parameter and syntax for High-Performance Order Storage compatibility
3. **Fixed legacy sorting logic** - Updated for backward compatibility with non-HPOS sites
4. **Improved backfill script** - Enhanced the existing WP-CLI script for populating missing sort fields

**Files Modified**:
- `app/admin.php` - Added pickup_date_sort generation and fixed sorting logic
- `app/wp-cli-backfill.php` - Enhanced backfill script with dry-run, error handling, and HPOS compatibility

**Usage**:
```bash
# Test what would be updated
wp bonton backfill_pickup_date_sort --dry-run

# Run backfill (skips existing values)
wp bonton backfill_pickup_date_sort

# Force update all values
wp bonton backfill_pickup_date_sort --force
```

### Delivery Orders Export Script (December 2024)

**Purpose**: Export delivery order data to CSV format for spreadsheet analysis.

**Features**:
- Exports delivery orders (identified by `flat_rate` or `free_shipping` shipping methods)
- Includes delivery date, customer name, and order value excluding GST
- Date range filtering (defaults to January 1, 2025 to present)
- CSV format compatible with Excel/Google Sheets

**Files**:
- `app/wp-cli-delivery-export.php` - Main export script

**Usage**:
```bash
# Basic export (Jan 1, 2025 to now) - saves to uploads directory
wp bonton delivery_export

# Custom date range
wp bonton delivery_export --start-date=2025-01-01 --end-date=2025-12-31

# Custom output filename (saves to uploads directory)
wp bonton delivery_export --output=my-delivery-report.csv

# Save to specific path (must be writable)
wp bonton delivery_export --output=/tmp/delivery-report.csv

# Preview first 10 delivery orders
wp bonton delivery_export_preview --limit=10

# Preview with custom date range
wp bonton delivery_export_preview --start-date=2025-01-01 --end-date=2025-03-31
```

**Note**: Files are automatically saved to the WordPress uploads directory unless you specify a full path. The uploads directory is typically `/path/to/wordpress/wp-content/uploads/`.

**CSV Output Columns**:
- Order ID
- Delivery Date (pickup_date meta)
- Customer Name
- Order Value (ex GST)
- GST Amount
- Order Total (inc GST)
- Shipping Method
- Order Status
- Order Date

## Custom WooCommerce Features

### Admin Order Enhancements

#### Pickup Date Management
- **Location**: `app/admin.php` (lines 43-81)
- **Functionality**: 
  - Adds pickup date field to order edit screen
  - Automatically generates sortable date format for admin column sorting
  - HPOS (High-Performance Order Storage) compatible

#### Custom Address Fields
- **Location**: `app/admin.php` (lines 84-146)
- **Functionality**:
  - Adds unit/apartment number fields to both billing and shipping addresses
  - Editable from order admin screen
  - HPOS compatible

#### Custom Admin Columns
- **Location**: `app/admin.php` (lines 157-197)
- **Functionality**:
  - Adds "Pickup Date" column to orders list
  - Shows both formatted date and sortable date for debugging
  - Compatible with both HPOS and legacy order storage

#### Sortable Columns
- **Location**: `app/admin.php` (lines 205-251)
- **Functionality**:
  - Makes pickup date column sortable by date
  - Handles both HPOS and legacy WordPress order tables
  - Uses `pickup_date_sort` meta field for consistent chronological sorting

## Site Structure & Custom Templates

### Custom Page Templates
Based on the views directory structure, the site includes:

#### Administrative Lists
- `baking-list.blade.php` - Baking production list
- `breadclub-list.blade.php` - Bread club member list  
- `breadclub-list-addons.blade.php` - Bread club add-ons
- `breadclub-schedule.blade.php` - Bread club delivery schedule
- `grocery-list.blade.php` - Grocery inventory list
- `inventory-list.blade.php` - General inventory management
- `oos-list.blade.php` - Out of stock items list
- `packing-list.blade.php` - Order packing list
- `pickup-list.blade.php` - Customer pickup list
- `shipping-list.blade.php` - Shipping orders list
- `delivery-export.blade.php` - Delivery data export

#### Wholesale Features
- `wholesale.blade.php` - Wholesale portal
- `wholesale-shop.blade.php` - Wholesale product catalog
- `wholesale-packing-list.blade.php` - Wholesale packing lists
- `wholesale-pickup-list.blade.php` - Wholesale pickup management

#### Print Templates
Located in `views/print/` and `views/partials/print-*`:
- Individual and batch receipt printing
- Shipping labels
- Product cards for shelf/cooler organization
- Wholesale-specific print formats

### Custom Controllers
Located in `app/Controllers/`:
- `App.php` - Base controller: site name, container logic, wholesale detection, global pickup date, bulk discount progress
- `WoocommerceCart.php` - Cart page controller: pickup date processing, cart item data computation, conflict detection, bulk pricing integration
- `BakingList.php` - Manages baking production data
- `PackingList.php` - Handles order packing logic
- `PickupList.php` - Customer pickup management
- `FrontPage.php` - Homepage customizations
- `Stories.php` - Custom content type handling

### Custom Helpers
Located in `app/Helpers/`:
- `BulkPricing.php` - Bulk bread discount calculations, tier logic, and eligibility checks

## WooCommerce Extensions Integration

The site integrates with several WooCommerce extensions:
- **Product Add-ons** - Custom product options
- **Smart Coupons** - Advanced coupon functionality with custom designs
- **Quick View** - Product quick view functionality
- **Catalog Visibility Options** - Product visibility controls

## Asset Management

### Custom Fonts
- **Greycliff CF** font family with multiple weights and styles
- Located in `resources/assets/fonts/greycliff/`

### Custom Scripts
Route-based JavaScript organization:
- `routes/bakingList.js` - Baking list functionality
- `routes/breadClubList.js` - Bread club management
- `routes/cart.js` - Shopping cart enhancements
- `routes/deliveryExport.js` - Data export functionality
- `routes/packingList.js` - Packing list interactions
- `routes/pickupList.js` - Pickup management
- And more specialized route handlers

## Development Notes

### HPOS Compatibility
All custom order-related functionality has been updated for WordPress/WooCommerce HPOS (High-Performance Order Storage) compatibility while maintaining backward compatibility with legacy post-based order storage.

### Code Organization
- Custom functionality is properly namespaced under `App\`
- Follows WordPress coding standards
- Uses modern PHP practices with proper error handling

### Database Considerations
- Custom meta fields use consistent naming conventions
- Sortable fields are generated automatically to maintain data integrity
- Backfill scripts are available for migrating existing data

---

## Additional Resources

- **documentation/two-days-notice-feature.md** - Detailed documentation for two days notice feature
- **documentation/3pm-cutoff-analysis.md** - Security analysis and fixes for order cutoff system
- **documentation/custom-functionality.md** - Comprehensive technical documentation of all custom features
- **documentation/bulk-discount.md** - Bulk discount business rules and unit counting logic

---

*Last Updated: March 13, 2026*  
*Document tracks development work from January 2024 to present*  
*For technical questions, refer to the individual files or contact the development team.*
