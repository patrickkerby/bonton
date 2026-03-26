# Cart 2.0 — Overview & QA Checklist

High-level summary of what shipped on the Cart 2.0 branch and a practical checklist for client UAT and peer QA. For implementation detail, see **[custom-features.md](custom-features.md)** (Cart 2.0 section) and **[bulk-discount.md](bulk-discount.md)**.

---

## Completed work

### Architecture & backend

- **`WoocommerceCart` controller** (`app/Controllers/WoocommerceCart.php`) — Cart business logic and view data (session dates, conflicts, per-item flags, bulk eligibility signals) centralized instead of scattered through templates and `filters.php`.
- **`BulkPricing` helper** (`app/Helpers/BulkPricing.php`) — Tiered volume discount for eligible categories, unit math from package size, singles batching rule, ACF global toggle/blackouts/per-product exclusions; wholesale excluded.
- **`PickupVacationDates` helper** (`app/Helpers/PickupVacationDates.php`) — Store closure dates from ACF options with a filter hook for extensions.
- **AJAX pickup date** — `save_pickup_date` updates WooCommerce session without a full cart form post (see `app/setup.php`, `app/filters.php`).
- **`filters.php`** — Reduced inline cart logic in favor of the controller and helpers.

### Cart frontend

- **Modular Blade templates** — `cart.blade.php` refactored; partials for item rows, date sidebar, JS data bridge, delivery and bag modals under `resources/views/woocommerce/cart/partials/`.
- **Rich cart rows** — Day-of-week availability, bulk-eligible labels, long fermentation / two-days notice, sold-out and override messaging, delivery exclusion, bulk strikethrough pricing where applicable.
- **`cart-totals` / `cart-shipping`** — Dynamic pickup vs delivery labels, bulk discount line, modals for bags and delivery; delivery rules updated (blackouts, Saturday-only messaging, wholesale and product rules per implementation).

### Site-wide utility banner

- Sticky **utility banner** (non-wholesale): global date control and bulk-discount progress UI, integrated across main layouts via `App` controller data and `common.js` (cart vs non-cart date behavior).

### Admin & assets

- ACF JSON updates for bulk discount, blackouts, exclusions, vacation dates, and related options.
- Styles: `_cart.scss`, `_utility-banner.scss`, quantity controls in `_forms.scss`; built assets updated as usual.

### Documentation

- **`custom-features.md`** — 2026 summary and detailed Cart 2.0 section.
- **`bulk-discount.md`** — Business rules and ACF controls.
- **`README.md`** — Index of `documentation/` files.

---

## Client & peer testing checklist

Use this for UAT; peers can add technical checks (nonces, session, HPOS, caching, console errors).

### Utility banner & date

1. **Non-cart pages** — Set or change pickup date from shop, product, and other pages; confirm label updates and that the date persists to cart and checkout.
2. **Cart page** — Banner control should **scroll to the cart calendar** (no duplicate datepicker).
3. **Wholesale users** — Banner hidden (or behavior matches spec) for wholesale accounts.

### Bulk discount

4. **Tiers** — Verify **10% at 5 units** and **20% at 10+ units** with mixed eligible products (bread / buns / bagels).
5. **Package sizes** — Singles vs half-dozen vs dozen: unit counting and line totals match expectations; **singles** discount only in full batches of six where applicable.
6. **Exclusions** — Global toggle off; **blackout date** matching session pickup date; **per-product exclusion** and documented hardcoded exclusions (e.g. pretzels) behave correctly.
7. **Wholesale** — No bulk discount for wholesale users.
8. **Progress UI** — Dot progress, “next tier” messaging, info popover; **mobile** layout and bottom-sheet style popover.

### Cart & checkout

9. **Row metadata** — Badges and notes (availability dots, bulk eligible, 2-day notice, long fermentation, not for delivery, sold-out / overrides) match real products.
10. **Conflicts** — Date / availability conflicts still block or warn appropriately with new styling.
11. **Totals** — Pickup vs delivery label; bulk discount line; bag and delivery modals open with correct copy.
12. **Sidebar** — Coupon, loyalty/points, calendar: no layout breaks on mobile or desktop.

### Shipping & delivery

13. **Saturday-only and blackouts** — Messaging and availability when delivery is capacity-limited or blacked out.
14. **Rules** — Ice cream in cart, delivery-excluded products, wholesale delivery visibility — per business rules.

### Store closures

15. **`pickup_vacation_dates` (ACF)** — Chosen dates disable or block pickup as designed in the UI.

### Regression & polish

16. **Quantity controls** — +/- and manual entry; mobile styling.
17. **Product options** — e.g. “sliced” and other options still display correct titles.
18. **3PM cutoff** — Still behaves as before where it applies.
19. **Analytics** — If GA4 custom events are in scope for this release, spot-check events in debug / GA4 (see `custom-features.md` GA4 section).

### Cross-device

20. **iOS Safari / Android Chrome** — Sticky banner, modals, datepicker, cart table scrolling and tap targets.

---

*Last updated: March 2026 (Cart 2.0 branch).*
