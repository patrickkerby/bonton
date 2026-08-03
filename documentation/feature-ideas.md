# Feature Ideas

Backlog of future features to tackle later. Add new ideas here with enough context to pick them up cold.

---

## 1. Auto-expire limited-availability products

**Idea:** Products with limited availability (dates set via ACF fields) should automatically be removed from the shop once they're no longer available, instead of lingering until someone remembers to hide them.

**Proposed approach (discussed Aug 2026):**

- Nightly **Action Scheduler** job (already active via WooCommerce + `action-scheduler-optimization.php` mu-plugin) rather than raw WP-Cron — has admin UI (Tools → Scheduled Actions), retries, and logging.
- ACF date pickers store postmeta as `Ymd`, so the query is a clean string comparison: published products where `pickup_restriction_end < today`.
- A product counts as expired only when the restriction end date **and** its latest special-availability override date are both in the past.

**Open decision — draft vs. hide:**

| Option | Pros | Cons |
|--------|------|------|
| Set status to Draft | Also declutters admin product list | URL 404s (SEO/newsletter links die); must manually re-publish next season even after updating dates |
| Catalog visibility "hidden" (or `pre_get_posts` exclusion) | URL stays alive with existing "only available from X to Y" notice; auto-reappears when next season's dates are entered | Product still in admin list |

Lean: catalog visibility for seasonal items (paska, hot cross buns, Christmas products return annually).

**Guardrails to include:**

- Dry-run WP-CLI command (`wp bonton expire-products --dry-run`), same pattern as `backfill_pickup_date_sort`
- Daily admin email digest when products are actually hidden
- WP Rocket purge after changes
- Per-product "never auto-expire" ACF opt-out flag

**Estimate:** ~half day including CLI command and testing.
