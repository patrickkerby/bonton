# Bulk Bread Discount System

## Overview

Automatic tiered volume discount for bread, buns, and bagels. Customers see their progress toward discounts via a visual tracker in the utility banner and per-item indicators in the cart.

## Discount Tiers

| Units in Cart | Discount |
|---|---|
| 0–4 | No discount |
| 5–9 | 10% off eligible items |
| 10+ | 20% off eligible items |

> **Note**: The original spec included seasonal pricing tiers (15%/25%), but the current implementation uses the standard 10%/20% tiers. Seasonal pricing can be added to `BulkPricing.php` if needed in the future.

## Eligible Products

**Categories** (by WooCommerce term ID):
- 52 — Bread
- 91 — Buns & Bagels

**Excluded Products** (hardcoded in `BulkPricing.php`):
- 899 (Pretzels)
- 963 (Egg Bread)
- 1087 (Olive Flutes)
- 1119 (Amandine Croissant)
- 1164 (Rugelach)
- 1988 (Fig & Pistachio Rugelach)
- 1158 (Cranberry, Almond, Marmalade Rugelach)
- 1168 (Kouign-Amann)
- 1177 (Canelé de Bordeaux)
- 2098, 8703, 8516, 10167, 10144, 10036, 10028, 11723 (additional exclusions)

**Per-product exclusion**: Any product with the `bulk_discount_exclusion` ACF field set to `true` is also excluded.

**Wholesale users**: Excluded from bulk pricing entirely.

## Unit Counting

Each cart item's quantity is converted to "units" based on its `pa_package-size` attribute (1 unit = one half-dozen):

| Package Size | Units toward tier |
|---|---|
| Half-Dozen / 6-pack | 1 per qty |
| Dozen | 2 per qty |
| Single | See singles rule below |
| (no package attribute) | 1 per qty (e.g. loaves) |

**Singles rule (buns/bagels only):** Singles count toward the tier **only when there are 6 or more of the same item** (same variation, or same product if not variable). Quantities are grouped per item before counting — mixed singles do not add up.

| Example cart | Units toward tier |
|---|---|
| 4 loaves + 6 sesame singles + 6 cheddar singles | 4 + 1 + 1 = **5** → 10% tier |
| 4 loaves + 3 sesame + 3 plain + 3 poppy + 3 everything singles | **4** (loaves only) |
| 12 sesame singles (one line) | 2 units |

Half-dozen and dozen always count per the table above; no grouping required.

## Singles discount application

When a tier is active, discount on a **single** line item applies only to full batches of 6 on **that line** (same as before). Remainders on that line are full price.

**Example**: 32 single sesame buns at $1.50 with 10% active → 30 discounted, 2 full price.

**Note:** Tier progress uses grouped singles (6+ per identical item). If the same variation appeared on two cart lines, WooCommerce normally merges them into one line.

## ACF Admin Controls

### Global Toggle
- **Field**: `bulk_discount` on the ACF Options page
- **Type**: True/False
- **Effect**: Enables or disables the entire bulk discount system

### Blackout Dates
- **Field**: `bulk_discount_blackout_dates` on the ACF Options page
- **Type**: Repeater with `date` sub-field
- **Effect**: If the customer's selected pickup date matches a blackout date, bulk pricing is disabled for that order

### Per-Product Exclusion
- **Field**: `bulk_discount_exclusion` on individual products
- **Type**: True/False
- **Effect**: Excludes that specific product from bulk pricing eligibility

## Implementation Files

| File | Role |
|---|---|
| `app/Helpers/BulkPricing.php` | Core calculation engine — eligibility, unit counting, discount math, progress tracking |
| `app/Controllers/WoocommerceCart.php` | Integrates bulk pricing into cart item data (per-item eligibility + discount amounts) |
| `app/Controllers/App.php` | Exposes `bulkDiscountProgress()` for the utility banner on all pages |
| `resources/views/partials/utility-banner.blade.php` | Visual progress dots and tier labels |
| `resources/views/woocommerce/cart/partials/cart-item-row.blade.php` | Per-item "Bulk discount eligible" badge and strikethrough pricing |
| `resources/views/woocommerce/cart/cart-totals.blade.php` | Bulk discount fee row in cart totals |
| `resources/assets/styles/layouts/_utility-banner.scss` | Progress tracker styling |
| `resources/assets/styles/layouts/_cart.scss` | Cart-specific bulk discount styling |
| `app/filters.php` | WooCommerce fee hook that applies the actual cart discount |

## How It Works (Flow)

1. `BulkPricing::get_progress()` scans the cart, counts eligible units, determines the tier
2. The `WoocommerceCart` controller calls `get_progress()` and attaches per-item eligibility/discount data
3. The utility banner displays the dot progress and tier messaging
4. Cart item rows show "Bulk discount eligible" labels and strikethrough pricing
5. A WooCommerce fee hook in `filters.php` applies the negative fee (discount) to the cart total
6. Cart totals display the discount as a line item

**GST:** Bulk discount is a price promotion only—it must not change GST on taxable non-bread items. See [gst-alberta-bakery.md](gst-alberta-bakery.md).

## Customer Experience

- **Before adding bread**: Utility banner shows empty dots with "Add bread for bulk savings"
- **1–4 units**: Dots fill up, label shows "X more for 10% off bread"
- **5–9 units**: First 5 dots filled + "10%" milestone highlighted, label shows "X more for 20%"
- **10+ units**: All dots filled + "20%" milestone highlighted, label shows "20% off bread!"
- **In cart**: Eligible items show a green "Bulk discount eligible" tag, and when a tier is active, subtotals show strikethrough original price with discounted price
- **Info popover**: Clicking the bulk section opens a popover explaining the tier structure
