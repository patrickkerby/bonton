# BonTon Custom Features Documentation

This document tracks the custom functionalities and recent development work on the BonTon WordPress/WooCommerce site.

## Recent Development Work

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

*Last Updated: December 2024*
*For technical questions, refer to the individual files or contact the development team.*
