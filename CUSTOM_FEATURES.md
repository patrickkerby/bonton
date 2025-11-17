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

**Reference**: See `TWO_DAYS_NOTICE_FEATURE.md` for complete technical documentation.

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

**Reference**: See `3PM_CUTOFF_ANALYSIS.md` for complete vulnerability analysis and recommended fixes.

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
- `BakingList.php` - Manages baking production data
- `PackingList.php` - Handles order packing logic
- `PickupList.php` - Customer pickup management
- `FrontPage.php` - Homepage customizations
- `Stories.php` - Custom content type handling

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

- **TWO_DAYS_NOTICE_FEATURE.md** - Detailed documentation for two days notice feature
- **3PM_CUTOFF_ANALYSIS.md** - Security analysis and fixes for order cutoff system
- **CUSTOM_FUNCTIONALITY_DOCUMENTATION.md** - Comprehensive technical documentation of all custom features
- **documentation/bulk-discount.md** - Bulk discount system documentation

---

*Last Updated: November 17, 2025*  
*Document tracks development work from January 2024 to present*  
*For technical questions, refer to the individual files or contact the development team.*
