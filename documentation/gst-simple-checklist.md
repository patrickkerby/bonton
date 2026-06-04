# GST — simple checklist (Bon Ton)

One-page summary. Details: [gst-alberta-bakery.md](gst-alberta-bakery.md).

---

## What the theme does automatically

- **Categories Bread (52) and Buns & Bagels (91) only:** when the cart reaches **6+ servings** of **taxable** items in those categories, the theme sets those cart lines to **Zero rate (0% GST)** for checkout.
- **Same two categories:** **bulk bread discount** (10% at 5+ units, 20% at 10+ units) as a cart fee. GST on other items is **not** reduced by that discount.
- **Checkout / delivery address:** defaults to **Canada / Alberta** when empty.

## Exclusions (no bulk discount; GST still from product settings)

- **Wholesale** customers — no bulk discount.
- **Hardcoded product IDs** in `BulkPricing.php` (pretzels, olive flutes, selected croissants/rugelach, etc.).
- **ACF “bulk discount exclusion”** on a product.
- **Bulk discount blackout dates** (options page).
- **Everything outside categories 52 & 91** — no six+ GST hook, no bulk discount math (only per-product tax).

## What admin must do (every product)

1. **Variable products (almost all bakery):** parent **Tax status = Taxable** (never **None**).
2. **Each variation:** **Tax class = Standard** (5% GST) **or Zero rate** (0% GST) — see rules below.
3. **Simple products:** **Tax status** and **Tax class** set the same way (no parent/variation split).
4. **Correct category** — only 52/91 trigger theme automation; other aisles (Savoury Treats, Pâtisserie, Grocery, etc.) are **manual only**.

## How to set variations (manual)

| Product type (client / CRA) | Single | Half-dozen / 6-pack | Dozen |
|----------------------------|--------|---------------------|-------|
| Plain bread, plain bagel, plain roll | Zero rate | Zero rate | Zero rate |
| Sweet bun / pastry-style in 52 or 91 | **Standard** | Zero rate | Zero rate |
| **All other categories** (Savoury Treats, Individual Pastries, Cakes, Cookies, Grocery, …) | Per item — usually **Standard** on singles; multi-packs per accountant | | |

**Tags** (`bulk-discount`, `6th-item-free`) are for display/promos only — they do **not** set GST.

## After Warp cleanup

1. Fix **parent Tax status** first.  
2. Then fix **each variation Tax class**.  
3. Test: taxable singles only → GST on those; 6+ bagels/bread in 52/91 → those lines 0%; bulk discount + pastry → pastry GST unchanged.

## Can we automate more?

| Idea | Safe? |
|------|-------|
| Admin warning if variable parent is **Tax status None** | Yes — recommended |
| Auto tax class from **package size only** in 52/91 | **No** — plain bread singles must stay Zero rate; same categories mix rules |
| ACF field per product: “GST profile” (bread all zero / pastry single taxable / manual) | Yes — if client wants less error-prone admin |
| Report: `bulk-discount` tag but product not in 52/91 | Yes — cleanup only |
| Auto tax from **shop category** (e.g. Savoury Treats) | **No** — categories are mixed |

**Bottom line:** Only **52 + 91 + six servings + bulk units** are safe to automate today. Everything else stays **per-product** until products are classified in data (ACF or split categories).
