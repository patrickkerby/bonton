# Two Days Notice Feature Documentation

## Overview
This feature allows products to require a minimum of two days notice for pickup, similar to the long fermentation feature but with more generic messaging and controlled via a product-level switch.

## Implementation Details

### 1. ACF Field
**Location:** `resources/acf-json/group_5e9748437ba61.json`
**Field Name:** `requires_two_days_notice`
**Field Type:** True/False toggle
**Field Key:** `field_67210abc12345`

**How to Use:**
1. Edit any product in WordPress admin
2. Look for the "Product Availability & Restrictions" section in the sidebar
3. Toggle "Requires Two Days Notice?" to Yes
4. Save the product

### 2. Cart Template Logic
**Location:** `resources/views/woocommerce/cart/cart.blade.php`

**Changes Made:**
- Added `$two_days_notice` and `$two_days_notice_in_cart` variables
- Checks each product in cart for the `requires_two_days_notice` field
- Displays notification on product line: "*Note: This product requires two days notice"
- Shows informational notice below date picker: "One or more products in your cart require at least two days notice for preparation"
- Passes the `two_days_notice_in_cart` variable to JavaScript

### 3. JavaScript Date Picker Logic
**Location:** `resources/assets/scripts/routes/cart.js`

**Changes Made:**
- Reads the `two_days_notice_in_cart` value from the hidden div
- Applies 57-hour minimum (same as long fermentation) if either:
  - Long fermentation products are in cart, OR
  - Two days notice products are in cart
- Updated comment to reflect both features

### 4. How It Works

**Time Calculation:**
- Normal products: 33 hours minimum (prevents next-day pickup after 3pm)
- Long fermentation OR two days notice: 57 hours minimum (approximately 2.5 days)

**User Experience:**
1. Customer adds a product with "Requires Two Days Notice" enabled to cart
2. Cart page shows "*Note: This product requires two days notice" under the product
3. Date picker prevents selection of dates within 57 hours of current time
4. Informational notice explains why tomorrow isn't available

### 5. Difference from Long Fermentation Feature

| Aspect | Long Fermentation | Two Days Notice |
|--------|------------------|-----------------|
| Trigger | Product tag: 'long-fermentation' | ACF field: 'requires_two_days_notice' |
| Control Level | Tag-based (can apply to multiple products) | Individual product toggle |
| Messaging | "Not available for next-day pickup" | "This product requires two days notice" |
| Notice Text | "Sourdough breads (They need 40 hours of fermentation)" | "One or more products...require at least two days notice for preparation" |
| Lead Time | 57 hours | 57 hours |

### 6. Both Features Can Coexist
- The long fermentation feature remains intact and functional
- Both features use the same 57-hour logic
- If either feature is triggered, the cart enforces the 57-hour minimum
- Products can have both features enabled (though redundant)

## Testing Checklist
- [ ] Enable "Requires Two Days Notice" on a test product
- [ ] Add product to cart
- [ ] Verify the "*Note: This product requires two days notice" appears under product
- [ ] Verify date picker prevents dates within 57 hours
- [ ] Verify informational notice shows below date picker
- [ ] Clear OpCache (if using): `rm -rf /web/app/uploads/cache/*.php` or visit clear-opcache.php
- [ ] Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on PC)

## Maintenance Notes
- ACF field syncs automatically via JSON files in `resources/acf-json/`
- After updating ACF JSON files, visit WP Admin > Custom Fields to sync changes
- JavaScript changes require running `npm run build` in development

## Files Modified
1. `resources/acf-json/group_5e9748437ba61.json` - Added ACF field
2. `resources/views/woocommerce/cart/cart.blade.php` - Added PHP logic and messaging
3. `resources/assets/scripts/routes/cart.js` - Added JavaScript date picker logic

