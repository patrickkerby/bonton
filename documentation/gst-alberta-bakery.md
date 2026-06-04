# GST on bakery orders (Alberta)

Bon Ton charges **federal GST at 5%** on taxable supplies. Alberta has no separate provincial sales tax on these goods. Rules come from the federal **Excise Tax Act** (Schedule VI) and CRA guidance—not a separate Alberta bakery tax law.

**Not tax advice.** Product-by-product treatment should be confirmed with your accountant. This document explains CRA concepts, what the **theme does automatically**, and what **shop managers must set** on each product in WooCommerce.

---

## References

| Document | URL |
|----------|-----|
| CRA Memorandum 4.3 — Basic Groceries | https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/4-3/basic-groceries.html |
| CRA P-251 — Eating Establishments (paragraph 1(q)) | https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/p-251/eating-establishments.html |

---

## Two product types (simplified)

### 1. Plain “bread products”

Bagels, plain croissants, rolls, etc. **without sweetened filling or coating**.

- Generally **zero-rated (0% GST)** in any quantity.
- The “six or more servings” rule below **does not** apply to these the same way as pastries.
- In WooCommerce: usually **Zero rate** on all package sizes.

### 2. Sweetened baked goods (CRA paragraph 1(m))

Cakes, muffins, cookies, pastries, doughnuts, **croissants with sweetened filling/coating**, and similar items.

- **Taxable (5% GST)** when sold as **fewer than six** single servings in a supply (with packaging rules).
- Often **zero-rated** when **six or more** single servings are sold together (see theme automation below).
- A **single serving** is generally under **230 g** per item (CRA 4.3).

**Packaging matters:** Items bagged or boxed in the bakery for retail count as “pre-packaged.” A SKU sold as “single” is usually taxable; a SKU sold as “half-dozen” or “dozen” may qualify for zero-rating when the order meets quantity rules.

**Paragraph 1(q):** If CRA treats the business as an “eating establishment” (high share of taxable prepared food), more items may need GST. Bon Ton’s accountant should confirm whether 1(q) applies.

---

## What the theme does automatically

### Six+ servings → zero-rate on bread/bun categories

**Code:** `bonton_apply_gst_cart_zero_rate()` in `app/helpers.php`, hooked from `app/filters.php`.

When the cart contains **six or more** “serving equivalents” of **taxable** items in:

- **Bread** (category ID **52**)
- **Buns & Bagels** (category ID **91**)

…the theme sets those cart lines to tax class **zero-rate** for that calculation.

Serving count matches package size:

| Package size | Count toward 6 |
|--------------|----------------|
| Single | 1 per quantity |
| Half-dozen / 6-pack | 6 per quantity |
| Dozen | 12 per quantity |
| No package attribute (e.g. loaves) | 1 per quantity |

**Important:** This only affects products in categories **52** and **91**. Pastries, desserts, and grocery items in other categories are **not** changed by this hook—they rely on per-product tax settings.

### Bulk bread discount vs GST

**Code:** `apply_bulk_discount_fee()` plus `bonton_zero_bulk_discount_fee_taxes()`.

- Bulk discount is a **negative cart fee** (promotional pricing only).
- It is **not taxable**.
- WooCommerce core normally spreads tax on negative fees across the whole cart; the theme **blocks that** for fees named “Bulk discount” so **GST on pastries and other taxable items stays correct**.

Bulk discount tiers (5+ / 10+ **units**) are separate from the GST **six-serving** rule—see [bulk-discount.md](bulk-discount.md).

---

## Admin: per-product tax settings

WooCommerce **variable products** inherit **Tax status** from the **parent** product only. Variations have their own **Tax class** (Standard vs Zero rate). If the parent is **None**, **no variation is taxed**, regardless of the variation’s tax class.

### Step 1 — Parent (variable) product

Edit the main product (not the variation).

| Field | Setting |
|-------|---------|
| **Tax status** | **Taxable** (required for anything that should ever charge GST) |
| **Tax class** | Usually **Standard** (variations will override where needed) |

Never leave the parent as **None** if any variation should collect GST.

### Step 2 — Each variation (by package size)

Open **Variations** and set **Tax class** for each row:

| Product type | Single | Half-dozen / 6-pack | Dozen |
|--------------|--------|---------------------|-------|
| Plain bread product (bagel, plain croissant, roll) | **Zero rate** | **Zero rate** | **Zero rate** |
| Sweetened pastry / cookie / dessert (1(m) item) | **Standard** | **Zero rate** | **Zero rate** |
| Item that is always taxable (e.g. some cakes, non-exempt goods) | **Standard** | **Standard** | **Standard** |

Use **Standard** for 5% GST. Use **Zero rate** for 0% GST.

**Rule of thumb:** If a customer buying **only one** of that SKU should pay GST, use **Standard** on that variation. If only **multi-packs of six+** should be zero-rated under your CRA classification, singles = **Standard**, packs = **Zero rate**.

### Step 3 — Simple products (no variations)

On the **General** tab:

| Field | Setting |
|-------|---------|
| **Tax status** | **Taxable** or **None** (use **Taxable** if GST applies) |
| **Tax class** | **Standard** or **Zero rate** as appropriate |

### Step 4 — Category

Ensure the product is in the correct category:

- Bread/bun **six+ automation** only runs for categories **52** (Bread) and **91** (Buns & Bagels).
- Pastries and desserts should live in their proper categories so the theme does not treat them as bread for quantity zero-rating.

### Quick checklist before saving

- [ ] Parent variable product: **Tax status = Taxable**
- [ ] Single servings that should charge GST: **Tax class = Standard**
- [ ] Half-dozen/dozen that should be zero-rated: **Tax class = Zero rate**
- [ ] Plain bread: all variations **Zero rate**
- [ ] Product is in the correct **category**
- [ ] No conflicting pair: **Tax status None** on parent with **Standard** on child (child will still not tax)

### After Warp / catalog cleanup

Fix the parent **Tax status** first, then set each variation’s **Tax class**. Re-test checkout with:

1. Only taxable singles (e.g. one magnum + one croissant) → GST on those lines only.
2. Six+ bread/bun servings → bread/bun lines zero-rated; pastries still taxed if set to Standard.
3. Cart with bulk discount + taxable pastry → GST on pastry **unchanged** by discount percentage.

---

## Related implementation files

| File | Role |
|------|------|
| `app/helpers.php` | `bonton_gst_*` serving count, cart zero-rate, bulk fee tax filter |
| `app/filters.php` | WooCommerce hooks |
| `app/Helpers/BulkPricing.php` | Category IDs 52, 91 (shared with bulk discount) |
| [bulk-discount.md](bulk-discount.md) | Promotional 10%/20% discount (not GST law) |

---

## Assumptions and limitations (read before changing products)

The theme does **not** know CRA product types (bread vs pastry vs prepared meal). It only applies **category IDs**, **package-size attribute**, and **WooCommerce tax fields** you set in admin. The client’s tax knowledge is still required for mixed categories.

### Category-based automation (narrow scope)

| Assumption | Reality check |
|------------|----------------|
| Only **Bread (52)** and **Buns & Bagels (91)** get the cart **six+ → zero-rate** hook | **Savoury Treats**, **Individual Pastries**, **Cookies**, **Pâtisserie**, **Grocery**, etc. are **outside** this hook entirely |
| Category IDs **52** and **91** are correct on production | IDs can differ between environments; confirm in **Products → Categories** |
| `has_term()` matches products **assigned** to those categories | Products only in a **child** category, or only tagged `bulk-discount`, may **not** match unless also assigned to 52 or 91 |
| A product in **one** qualifying category is enough | Products in **multiple** categories (e.g. also in Savoury Treats) still get the hook if they are in 52 or 91 |

### Savoury Treats and other “mixed” shop categories

**Yes — your intuition is right.** The **Savoury Treats** nav group (pretzels, croissants, pot pies, sausage rolls, olive flutes, etc.) is a **merchandising** category, not a single GST rule.

| Item type (examples from that aisle) | Typical CRA treatment (confirm with accountant) | Theme automation |
|--------------------------------------|---------------------------------------------------|------------------|
| Plain pretzel / cheese pretzel / Bavarian pretzel | Often bread-like or 1(m) depending on recipe & packaging | **Per variation tax class** only (unless also in 52/91) |
| Ham & smoked cheddar croissant, pretzel croissant, savoury Danish | Often 1(m) or prepared food; singles often **taxable** | Per variation; **not** in six+ bread/bun hook unless miscategorized into 52/91 |
| Chicken pot pie, sausage roll | Often **taxable** prepared food; not “six buns = zero-rate” bread logic | Per variation only |
| Olive flutes | Listed in bulk **exclusion** list (product ID 1087) | No bulk discount; GST from product tax settings |

The theme **cannot** split tax inside one WooCommerce category. Staff must set **each product/variation** correctly.

### Tags vs discounts vs GST (easy to confuse)

| Shop signal | What we **assume** it means | What code actually does |
|-------------|----------------------------|-------------------------|
| **`bulk-discount` tag** (filter “Bulk Discount (50)”) | Marketing: “may participate in bread bulk pricing” | Discount math uses categories **52 & 91** + exclusions — **not the tag** |
| **`6th-item-free` tag** | Promotional copy for bun deals | Separate promo logic; **not** the same as GST six-serving zero-rating |
| **Bulk discount 5+ units** | 10%/20% off eligible **bread/bun** lines | **5 units** threshold — different from GST **6 servings** |
| **GST six+ servings** | 0% on eligible **taxable** lines in 52/91 | **6 serving** threshold; counts **mixed** singles toward six (unlike bulk singles grouping) |

A Savoury Treats product can show **Bulk discount eligible** on the product page (tag) but receive **neither** bulk discount nor GST auto zero-rate if it is not in categories 52/91.

### Product / variation assumptions

| Assumption | Risk |
|------------|------|
| All variable bakery SKUs use **`pa_package-size`** (single, half-dozen, dozen) | Loaves or fixed-price simple products without the attribute count as **1 serving per qty** only when in 52/91 |
| Parent **Tax status = Taxable** | Parent **None** → **no GST on any variation**, regardless of variation tax class (common Edgar/Warp issue) |
| Variation **tax class** reflects CRA (Standard vs Zero rate) | **taxable + zero-rate class** or **none + standard class** pairs in Warp audit are still wrong in WooCommerce |
| **Olive flutes, pretzels, Amandine croissant**, etc. | Hardcoded **bulk discount exclusions** — still need correct **GST** fields per product |

### CRA / business assumptions (not implemented in code)

| Assumption | In code? |
|------------|----------|
| Bon Ton is **not** fully caught by paragraph **1(q)** (eating establishment) | **Not modeled** — if 1(q) applies, more items should be taxable regardless of category |
| “Bread product” vs “sweetened 1(m) item” follows product **name/aisle** | **No** — only WooCommerce tax class/status |
| Pre-packaged **single** SKU = taxable, **half-dozen** SKU = zero-rated for 1(m) items | **Only if** you configure variations that way |
| Six **different** pastry singles in one order = zero-rated under 1(m) | CRA allows **mixed** six+ in some cases; theme **only** auto-applies six+ for **52/91** lines, not all pastries |

### Legacy / ops lists (unchanged by GST work)

Operational lists use category slug lists including **`savoury-treats`** and old numeric IDs (**83, 84**, etc.) for shelf sorting — that is **not** the same list as GST automation (**52, 91**). Do not assume shelf list membership implies GST behavior.

### When to escalate (not a theme fix)

- Entire category should follow one GST rule but products disagree → **per-product admin** or split categories
- CRA position on **1(q)** or a specific SKU (e.g. family-size pot pie) → **accountant**
- Warp audit contradictions → **fix parent tax status + variation class**, not more PHP

---

## Legacy orders

Older orders may have incorrect tax from misconfigured products or from the previous bulk-fee tax interaction. New carts after product fixes and theme updates should calculate GST as described above.
