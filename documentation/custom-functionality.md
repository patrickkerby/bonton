# Bon Ton Bakery WordPress Theme - Custom Functionality Documentation

## Table of Contents
1. [Overview](#overview)
2. [Admin Dashboard Customizations](#admin-dashboard-customizations)
3. [WooCommerce Customizations](#woocommerce-customizations)
4. [Order Management System](#order-management-system)
5. [Pricing & Tax Logic](#pricing--tax-logic)
6. [Custom Fields & Variations](#custom-fields--variations)
7. [WP-CLI Commands](#wp-cli-commands)
8. [Controllers](#controllers)
9. [Helper Functions](#helper-functions)
10. [Custom Features Summary](#custom-features-summary)

---

## Overview

This WordPress theme is built on the Sage framework and contains extensive custom functionality for managing a bakery's online ordering system. The site handles complex business logic including pickup scheduling, bulk pricing, tax calculations, wholesale accounts, and operational management tools.

**Key Technologies:**
- Sage WordPress theme framework
- WooCommerce for e-commerce
- Advanced Custom Fields (ACF) for custom data
- Custom WP-CLI commands for data management
- Blade templating engine

---

## Admin Dashboard Customizations

### 1. Site-Wide Notice Management
**Location:** `app/admin.php` (lines 256-394)

**Purpose:** Provides an easy-to-use dashboard widget for managing site-wide notices without navigating through WooCommerce settings.

**Features:**
- Dashboard widget with checkbox to enable/disable notices
- Text area for notice content (HTML allowed)
- Preview functionality
- Automatic cache clearing when notices are updated
- Server-side dismissal tracking with cookies

**Usage:** 
- Go to WordPress Dashboard
- Find "Site-wide Notice" widget
- Toggle on/off and enter notice text
- Changes take effect immediately (cache is auto-cleared)

### 2. Order Management Enhancements

#### Pickup Date Integration
**Location:** `app/admin.php` (lines 43-92)

**Purpose:** Adds pickup date fields to order edit screens and makes them sortable in order lists.

**Features:**
- Custom "Pickup Date" field in order details
- Sortable "Pickup Date" column in order lists
- HPOS (High-Performance Order Storage) compatible
- Automatic date formatting for sorting

#### Custom Address Fields
**Location:** `app/admin.php` (lines 95-157)

**Purpose:** Adds unit/apartment number fields to billing and shipping addresses.

**Features:**
- Unit/apartment fields in order edit screens
- Proper display in formatted addresses
- HPOS compatible meta data handling

#### Missing Pickup Dates Dashboard Widget
**Location:** `app/filters.php` (lines 991-1055)

**Purpose:** Shows orders that are missing pickup dates for quick identification and follow-up.

**Features:**
- Lists orders with missing pickup dates
- Shows customer name, order number, and phone
- Only displays orders in "processing" status
- Optimized database queries

---

## WooCommerce Customizations

### 1. Product Display & Navigation

#### Quick View Integration
**Location:** `app/filters.php` (lines 127-180)

**Purpose:** Replaces default WooCommerce product links with custom quick-view functionality.

**Features:**
- Removes default product linking
- Adds "Learn more" quick-view buttons
- Custom product modal with enhanced gallery
- Removes unnecessary product meta (SKU, categories) from modals

#### Product Thumbnails & Gallery
**Location:** `app/filters.php` (lines 167-172)

**Purpose:** Enhances product image galleries with better navigation.

**Features:**
- Direction navigation arrows
- Control navigation bullets
- Optimized for modal display

### 2. Pricing & Display Logic

#### Variable Product Pricing
**Location:** `app/filters.php` (lines 147-200)

**Purpose:** Customizes how variable product prices are displayed to customers.

**Features:**
- "From: $X" format for variable products
- Shows sale prices with strikethrough regular prices
- Handles min/max price ranges intelligently

#### Cart Integration
**Location:** `app/filters.php` (lines 233-237)

**Purpose:** Updates cart count in header without page refresh.

**Features:**
- AJAX cart count updates
- Custom cart fragments for real-time updates

### 3. Checkout Customizations

#### Address Field Modifications
**Location:** `app/filters.php` (lines 779-867)

**Purpose:** Customizes address fields for better Canadian address format.

**Features:**
- Separates house number and street name
- Adds unit/apartment fields
- Custom field labels and placeholders
- Proper address formatting in emails and displays

#### Pickup Date Integration
**Location:** `app/filters.php` (lines 346-366, 701-757)

**Purpose:** Handles pickup date selection and validation during checkout.

**Features:**
- Saves pickup dates from session to order
- Multiple date formats (display, formatted, sortable)
- Validates pickup dates against business rules
- Prevents ordering too close to pickup time (3 PM cutoff)

---

## Order Management System

### 1. Pickup Date Management

**Core Functionality:** Orders require pickup dates, which are validated and stored in multiple formats for different uses.

**Validation Rules:**
- Orders placed after 3 PM cannot be picked up the next day
- Pickup dates are required for all orders (except gift certificates)
- Dates are stored in multiple formats for sorting and display

### 2. Order Status Workflow

**Custom Statuses:**
- `ws-processing`: Wholesale orders in processing
- `ws-completed`: Wholesale orders completed

**Status Logic:**
- Cash on Delivery (COD) orders automatically set to wholesale processing
- Different workflows for retail vs wholesale customers

### 3. Email Customizations
**Location:** `app/filters.php` (lines 375-394)

**Purpose:** Adds pickup date information to order confirmation emails.

**Features:**
- Displays pickup date prominently in emails
- Separate formatting for HTML and plain text emails
- Emphasizes importance with "Important: Pickup Details" heading

---

## Pricing & Tax Logic

### 1. Bulk Pricing System
**Location:** `app/filters.php` (lines 414-673)

**Purpose:** Implements complex bulk discount system for bakery items.

**Business Rules:**
- Applies to Bread (category 52) and Buns & Bagels (category 91)
- 10% discount for 5-9.99 "units"
- 20% discount for 10+ "units"
- Unit calculation: Single = 1/6, Half-dozen = 1, Dozen = 2

**Features:**
- Blackout dates (no discounts on certain days)
- Product exclusions list
- Special handling for single items (only multiples of 6 get discount)
- Seasonal pricing overrides
- Wholesale user exclusions
- Real-time savings display on cart page

### 2. Tax Logic for Bulk Items
**Location:** `app/filters.php` (lines 286-341)

**Purpose:** Implements tax-free bulk purchases for qualifying items.

**Business Rules:**
- Items in categories 83, 84 become tax-free when cart has 6+ qualifying items
- Quantity calculation includes package sizes (half-dozen = 6, dozen = 12)
- Only applies to taxable products

### 3. Delivery Fees
**Location:** `app/filters.php` (lines 905-943)

**Purpose:** Manages delivery-related fees and discounts.

**Features:**
- $0.50 delivery bag fee for all deliveries
- Custom delivery discounts for wholesale users
- Fee calculation based on shipping method selection

---

## Custom Fields & Variations

### 1. Product Variation Fields
**Location:** `app/filters.php` (lines 1068-1137)

**Purpose:** Adds custom availability management to product variations.

**Features:**
- "Sold Out / Unavailable Dates" field with multi-date picker
- "Availability Override" field for special availability
- JavaScript-powered date selection interface
- Proper saving and retrieval of variation meta data

### 2. Cooler & Shelf Categorization
**Location:** `app/filters.php` (lines 255-273)

**Purpose:** Enables custom product queries based on storage requirements.

**Features:**
- Custom meta fields for "cooler" and "shelf" products
- WooCommerce product query integration
- Used for operational lists and inventory management

---

## WP-CLI Commands

### 1. Delivery Export Command
**Location:** `app/wp-cli-delivery-export.php`

**Purpose:** Exports delivery orders to CSV for external processing.

**Command:** `wp bonton delivery_export`

**Features:**
- Date range filtering (--start-date, --end-date)
- Batch processing for large datasets
- Multiple output directory options
- Comprehensive order data export (customer, totals, dates, shipping)
- Built-in permission checking and error handling

**Options:**
- `--output`: Specify output file path
- `--start-date`: Start date (default: 2025-01-01)
- `--end-date`: End date (default: today)
- `--batch`: Batch size (default: 100)

**Helper Commands:**
- `wp bonton delivery_export_preview`: Preview orders without exporting
- `wp bonton delivery_export_check`: Check writable directories

### 2. Pickup Date Backfill Command
**Location:** `app/wp-cli-backfill.php`

**Purpose:** Backfills sortable pickup dates for existing orders.

**Command:** `wp bonton backfill_pickup_date_sort`

**Features:**
- Processes all order statuses
- Converts human-readable dates to sortable Y-m-d format
- HPOS compatible
- Dry-run capability
- Batch processing with progress reporting

**Options:**
- `--batch`: Orders per batch (default: 100)
- `--dry-run`: Preview changes without applying
- `--force`: Overwrite existing sort dates

---

## Controllers

### 1. App Controller
**Location:** `app/Controllers/App.php`

**Purpose:** Main application controller providing global functionality.

**Methods:**
- `siteName()`: Returns site name
- `title()`: Dynamic page title generation
- `container()`: CSS container class logic
- `is_wholesale_user()`: Wholesale user detection
- `acfsage()`: ACF integration setup

### 2. Specialized Controllers
**Location:** `app/Controllers/[BakingList|PackingList|PickupList|Stories|Single].php`

**Purpose:** Page-specific controllers for operational and content pages.

**Common Features:**
- ACF integration enabled
- Minimal specialized logic (most inherit from base Controller)
- Used for operational list pages and content management

---

## Helper Functions

### 1. Sage Framework Helpers
**Location:** `app/helpers.php`

**Purpose:** Core theme functionality and template management.

**Key Functions:**
- `sage()`: Container access
- `config()`: Configuration management
- `template()`: Blade template rendering
- `asset_path()`: Asset URL generation
- `filter_templates()`: Template hierarchy management

### 2. Custom Query Functions
**Location:** `app/filters.php`

**Key Functions:**
- `get_my_terms()`: Returns tax-exempt category IDs
- `get_my_bulk_terms()`: Returns bulk discount category IDs
- `handle_custom_query_var()`: Custom order query handling
- `write_my_log()`: Debug logging function

---

## Custom Features Summary

### 🎯 **Business Logic Features**
1. **Pickup Date Management** - Complete system for scheduling and validating pickup dates
2. **Bulk Pricing** - Complex discount system with quantity calculations and exclusions
3. **Tax Management** - Automatic tax exemptions for bulk purchases
4. **Wholesale Integration** - Separate pricing, workflows, and features for wholesale customers

### 🛠 **Operational Features**
1. **Order Management** - Enhanced admin interfaces with custom fields and sorting
2. **Inventory Lists** - Specialized pages for baking, packing, and pickup operations
3. **Export Tools** - WP-CLI commands for data export and management
4. **Dashboard Widgets** - Quick access to critical information and settings

### 🛒 **Customer Experience Features**
1. **Quick View** - Product modals without page navigation
2. **Smart Pricing** - Dynamic pricing display with bulk discounts
3. **Address Handling** - Canadian-optimized address fields
4. **Site Notices** - Easy-to-manage announcements system

### 🔧 **Technical Features**
1. **HPOS Compatibility** - Future-proof order storage compatibility
2. **Cache Management** - Automatic cache clearing for immediate updates
3. **Error Handling** - Comprehensive validation and error reporting
4. **Performance** - Optimized queries and batch processing

---

## File Structure Overview

```
app/
├── admin.php              # Dashboard widgets, order management, site notices
├── filters.php            # WooCommerce customizations, pricing logic, checkout
├── helpers.php            # Core Sage framework helper functions
├── setup.php              # Theme setup, assets, cache management
├── wp-cli-delivery-export.php  # CSV export commands
├── wp-cli-backfill.php    # Data migration commands
└── Controllers/
    ├── App.php            # Main application controller
    ├── BakingList.php     # Baking operations page
    ├── PackingList.php    # Packing operations page
    ├── PickupList.php     # Pickup operations page
    ├── Stories.php        # Stories/blog page
    └── Single.php         # Single post/product page
```

---

## View Templates & Frontend Functionality

The theme includes extensive custom Blade templates that handle complex operational workflows and customer-facing features.

### 1. Operational List Templates

#### Baking List (`baking-list.blade.php`)
**Purpose:** Generates production lists for bakers showing what items to prepare for each day.

**Key Features:**
- Date-based order filtering with ACF date selector
- Complex quantity calculations handling different package sizes (dozen=12, half-dozen=6, etc.)
- Category exclusion system via ACF fields (`baking_list_exclusion`)
- Refund handling - adjusts quantities for refunded items
- Product variation handling (size, variety, topping combinations)
- Bundle product filtering (hides parent items, shows components)
- Intelligent product name formatting with attributes

**Business Logic:**
- Converts package sizes to actual item counts for baking
- Excludes categories marked as "baking exclusions"
- Combines duplicate products and sums quantities
- Handles complex product variations and attributes

#### Packing List (`packing-list.blade.php`)
**Purpose:** Creates packing lists organized by storage location (cooler vs shelf) for order fulfillment.

**Key Features:**
- **Storage Location Logic**: Automatically categorizes products as Cooler or Shelf items
- **Product Override System**: Individual products can override category-based storage location
- **Timeslot Organization**: Orders sorted by pickup/delivery timeslots
- **Print Integration**: Built-in printing functions for receipts and cards
- **Delivery vs Pickup**: Distinguishes between pickup and delivery orders
- **Order Numbering**: Sequential numbering system (pickup starts at 100, delivery at 500)

**Storage Categories:**
- **Cooler Items**: Cakes, pies, dips, individual pastries, gluten-free items
- **Shelf Items**: Bread, buns, cookies, granola, preserves, etc.
- **Override System**: Products can be manually assigned via meta fields

#### Pickup List (`pickup-list.blade.php`)
**Purpose:** Comprehensive customer pickup management with bread club integration.

**Key Features:**
- **Bread Club Integration**: Complex system for managing subscription pickups
- **Date Range Processing**: Handles bread club program schedules and pickup days
- **Customer Identification**: Distinguishes between regular customers and bread club members
- **Location Indicators**: Visual system showing storage location (S=Shelf, C=Cooler, B=Bread Club)
- **Order Numbering**: Separate numbering for regular orders vs bread club
- **Print Functionality**: Individual receipt printing for each order

**Bread Club Logic:**
- Checks if selected date is a valid bread club pickup day
- Matches customer pickup day preferences with actual pickup days
- Combines bread club orders with regular orders
- Handles customers who are both bread club members AND have regular orders

#### Inventory List (`inventory-list.blade.php`)
**Purpose:** Date range inventory analysis showing product demand across multiple days.

**Key Features:**
- **Date Range Selection**: Analyzes orders across custom date ranges
- **Cross-Day Analysis**: Shows product quantities needed per day in table format
- **Total Calculations**: Provides totals across all days in range
- **Refund Integration**: Accounts for refunded items in calculations
- **Bundle Handling**: Properly processes bundled products

### 2. Specialized Lists

#### Grocery List (`grocery-list.blade.php`)
**Purpose:** Displays all grocery category products with stock status for inventory management.

**Key Features:**
- Category-based product filtering (Grocery category #94)
- Product variation display
- Stock status monitoring
- Category filtering (excludes promotional categories)

#### Wholesale Lists
**Templates:** `wholesale-packing-list.blade.php`, `wholesale-pickup-list.blade.php`

**Purpose:** Separate operational lists specifically for wholesale customers.

**Key Features:**
- User role filtering (only wholesale customers)
- Separate order numbering system
- Specialized printing templates
- Different workflow from retail customers

### 3. WooCommerce Template Overrides

#### Enhanced Cart (`woocommerce/cart/cart.blade.php`)
**Purpose:** Heavily customized cart with pickup date selection and business logic.

**Key Features:**
- **Pickup Date Selection**: Complex date picker with business rules
- **Time-based Restrictions**: 3 PM cutoff for next-day pickup
- **Product Conflict Detection**: Identifies conflicting products (e.g., long fermentation items)
- **Gift Certificate Handling**: Special logic for gift certificate-only orders
- **Cooler Item Detection**: Identifies products requiring refrigeration
- **Bulk Discount Display**: Shows savings from bulk pricing
- **Seasonal Restrictions**: Handles blackout dates and seasonal availability

**Business Rules Implemented:**
- Orders after 3 PM cannot be picked up next day
- Long fermentation products have extended lead times
- Gift certificates don't require pickup dates
- Cooler items may have delivery restrictions

#### Print Templates
**Location:** `partials/print-*.blade.php` and `print/` directory

**Purpose:** Comprehensive printing system for operational workflows.

**Templates Include:**
- Individual order cards and receipts
- Batch printing for all orders
- Wholesale-specific print formats
- Shipping labels and delivery contents
- Bread club specific formats

### 4. Layout Templates

#### Lists Layout (`layouts/lists.blade.php`)
**Purpose:** Specialized layout for operational list pages with enhanced functionality.

**Key Features:**
- DataTables integration for sorting/filtering
- Print-optimized styling
- Date selection interfaces
- List-specific navigation

#### Shop Layout (`layouts/shop.blade.php`)
**Purpose:** E-commerce specific layout with cart integration and product displays.

### 5. Content Management Templates

#### Flexible Content System
**Templates:** `partials/flexible-content.blade.php`, `flexible-photo.blade.php`

**Purpose:** ACF-powered content management system for dynamic page building.

**Key Features:**
- Modular content blocks
- Photo gallery integration
- Responsive image handling
- Content type flexibility

---

## Maintenance Notes

### Regular Tasks
1. **Monitor bulk pricing exclusions** - Update excluded product IDs as needed
2. **Review pickup date validation** - Adjust cutoff times seasonally
3. **Update export commands** - Modify date ranges and fields as business needs change
4. **Cache management** - Ensure WP Rocket integration continues working

### Seasonal Considerations
1. **Bulk pricing blackout dates** - Update ACF fields for holiday periods
2. **Seasonal pricing overrides** - Enable/disable special pricing periods
3. **Product availability** - Use variation fields for seasonal items

### Troubleshooting
1. **Pickup date issues** - Check timezone settings and validation logic
2. **Pricing problems** - Review category IDs and exclusion lists
3. **Export failures** - Verify file permissions and directory access
4. **Cache issues** - Clear WP Rocket cache manually if auto-clear fails

---

## Recommended Improvements & Technical Debt

Based on analysis of the codebase, here are recommended improvements organized by priority and impact:

### 🔥 **High Priority - Critical Improvements**

#### 1. **Replace Hard-coded Category IDs with Dynamic System**
**Files:** `packing-list.blade.php`, `pickup-list.blade.php`, `filters.php`
**Issue:** Storage location logic uses hard-coded category IDs that break when categories change.
```php
// Current problematic code:
$cooler_list = array('22', '53', '51','107','103');
$shelf_list = array('91, 83, 52, 104, 13, 105, 135, 94, 102, 106, 54, 10, 67, 285, 289, 662');
```
**Solution:** Create ACF fields on product categories for "Storage Type" (Cooler/Shelf/Freezer).
**Impact:** Prevents system breakage when categories are modified.
**Effort:** Medium (2-3 hours)

#### 2. **Consolidate Duplicate Storage Logic**
**Files:** Multiple operational list templates
**Issue:** Storage categorization logic is duplicated across multiple templates.
**Solution:** Create a centralized helper function in `helpers.php`:
```php
function get_product_storage_location($product_id) {
    // Centralized storage location logic
}
```
**Impact:** Easier maintenance, consistent behavior across all lists.
**Effort:** Medium (3-4 hours)

#### 3. **Move Hardcoded Product IDs to ACF Options**
**Files:** `filters.php`, `breadclub-list.blade.php`
**Issue:** Product IDs are hardcoded throughout the system.
```php
// Current problematic code:
$excluded_products = array(899, 963, 1087, 1119, 1164, 1988...);
$breadclub_id = 18200;
```
**Solution:** Create ACF options pages for:
- Bulk discount excluded products
- Bread club product ID
- Gift certificate product IDs
**Impact:** System becomes maintainable without code changes.
**Effort:** Low (1-2 hours)

### ⚡ **Medium Priority - Performance & Maintainability**

#### 4. **Optimize Database Queries in List Templates**
**Files:** All operational list templates
**Issue:** Multiple inefficient queries and loops.
**Solution:** 
- Implement query caching for repeated calls
- Use `WC_Order_Query` consistently instead of mixed approaches
- Combine related queries where possible
**Impact:** Faster page loads, reduced server load.
**Effort:** High (6-8 hours)

#### 5. **Create Configuration Management System**
**Files:** `filters.php`, multiple templates
**Issue:** Business rules scattered throughout code.
**Solution:** Create centralized configuration system:
```php
// In new config/business-rules.php
return [
    'cutoff_time' => '15:00',
    'bulk_discount' => [
        'small_threshold' => 5,
        'large_threshold' => 10,
        'small_discount' => 0.9,
        'large_discount' => 0.8
    ],
    'order_numbering' => [
        'pickup_start' => 100,
        'delivery_start' => 500,
        'breadclub_start' => 900
    ]
];
```
**Impact:** Easier to modify business rules, better organization.
**Effort:** Medium (4-5 hours)

#### 6. **Implement Error Handling & Logging**
**Files:** All templates and functions
**Issue:** Limited error handling and debugging capabilities.
**Solution:**
- Add try-catch blocks around critical operations
- Implement comprehensive logging system
- Add validation for required data
**Impact:** Easier debugging, better user experience.
**Effort:** Medium (3-4 hours)

### 🛠 **Low Priority - Code Quality & Future-Proofing**

#### 7. **Refactor Complex Template Logic**
**Files:** `packing-list.blade.php`, `pickup-list.blade.php`
**Issue:** Templates contain too much business logic (400+ lines of PHP).
**Solution:** Move complex logic to dedicated classes:
```php
class PackingListProcessor {
    public function processOrders($date, $listType) { /* ... */ }
    public function categorizeProducts($orders) { /* ... */ }
}
```
**Impact:** Better separation of concerns, easier testing.
**Effort:** High (8-10 hours)

#### 8. **Create Automated Testing Suite**
**Files:** New test files
**Issue:** No automated testing for critical business logic.
**Solution:** Implement PHPUnit tests for:
- Bulk pricing calculations
- Tax logic
- Order processing functions
**Impact:** Prevents regressions, easier refactoring.
**Effort:** High (10-12 hours)

#### 9. **Implement Data Validation Layer**
**Files:** All form processing and data handling
**Issue:** Inconsistent data validation across the system.
**Solution:** Create validation classes and apply consistently.
**Impact:** Better data integrity, fewer errors.
**Effort:** Medium (4-6 hours)

#### 10. **Add API Endpoints for Mobile/External Integration**
**Files:** New API controller files
**Issue:** All functionality tied to web interface.
**Solution:** Create REST API endpoints for key operations.
**Impact:** Enables mobile apps, third-party integrations.
**Effort:** High (12-15 hours)

### 📋 **Documentation & Training Improvements**

#### 11. **Create Admin User Guide**
**Issue:** Complex operational workflows need documentation for staff training.
**Solution:** Create step-by-step guides for:
- Daily operational workflows
- Managing bulk pricing and exclusions
- Handling special orders and exceptions
**Effort:** Medium (4-6 hours)

#### 12. **Add Inline Code Documentation**
**Issue:** Complex business logic lacks adequate commenting.
**Solution:** Add comprehensive PHPDoc comments to all functions.
**Effort:** Low (2-3 hours)

### 🔧 **Technical Infrastructure**

#### 13. **Implement Caching Strategy**
**Issue:** Repeated expensive calculations on every page load.
**Solution:**
- Cache product categorizations
- Cache bulk discount calculations
- Implement Redis or object caching
**Impact:** Significant performance improvement.
**Effort:** Medium (5-6 hours)

#### 14. **Add Development Environment Setup**
**Issue:** No standardized development setup.
**Solution:** Create Docker/Vagrant setup with sample data.
**Impact:** Easier onboarding for new developers.
**Effort:** Medium (4-5 hours)

### 📊 **Monitoring & Analytics**

#### 15. **Add Operational Metrics**
**Issue:** No visibility into system performance and usage.
**Solution:** Add tracking for:
- Order processing times
- List generation performance
- Error rates and types
**Impact:** Better understanding of system health.
**Effort:** Low (2-3 hours)

---

## Implementation Priority Matrix

| Priority | Improvement | Effort | Impact | Timeline |
|----------|-------------|---------|---------|----------|
| 🔥 Critical | Hard-coded Category IDs | Medium | High | Week 1 |
| 🔥 Critical | Consolidate Storage Logic | Medium | High | Week 1 |
| 🔥 Critical | Move Product IDs to ACF | Low | High | Week 1 |
| ⚡ Medium | Database Query Optimization | High | Medium | Week 2-3 |
| ⚡ Medium | Configuration Management | Medium | Medium | Week 2 |
| ⚡ Medium | Error Handling & Logging | Medium | Medium | Week 3 |
| 🛠 Future | Template Logic Refactoring | High | Low | Month 2 |
| 🛠 Future | Automated Testing | High | Low | Month 3 |

---

*Last Updated: December 2024*
*Theme Version: Based on Sage framework*
*WooCommerce Compatibility: Latest versions with HPOS support*
