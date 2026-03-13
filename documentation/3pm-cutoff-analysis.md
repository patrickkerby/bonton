# 3PM Cutoff Logic - Vulnerability Analysis

## 🚨 **Problem Statement**
After 2 years of working correctly, the 3PM cutoff rule (preventing next-day orders after 3PM) has failed 3 times in the last week. This document analyzes the code to identify vulnerabilities.

---

## 📍 **Where the 3PM Logic Exists**

### **1. Client-Side JavaScript** (`resources/assets/scripts/routes/cart.js`)
**Lines 96-100:**
```javascript
const time = longFermentation == 1 ? 57 : 33;

// the "standard formula" is the current date + 33 hours or 57 hours if long fermentation
const standardFormulaMinDate = dayjs().add(time, 'hour').format('DD/MM/YYYY H:mm:ss');
const standardFormulaMinDateFormatted = dayjs(standardFormulaMinDate, 'DD/MM/YYYY');
```

**Timezone:** `dayjs.tz.setDefault('America/Edmonton')` (Line 19)

### **2. Cart Page PHP** (`resources/views/woocommerce/cart/cart.blade.php`)
**Lines 34-49:**
```php
date_default_timezone_set('MST');
$currenthour = date('H');
$cutoffhour = '15:00';
$cutoff = date('H', strtotime($cutoffhour));	
$tomorrow = new DateTime('tomorrow');
$today = new DateTime('today');

if ($currenthour > $cutoff) {
    $post3pm = true;
}
elseif ($currenthour < $cutoff) {
    $post3pm = false;
}
```

### **3. Checkout Validation PHP** (`app/filters.php`)
**Lines 704-748:**
```php
date_default_timezone_set('MST');
$today = date('Ymd');
$currenthour = date('H');
$cutoffhour = '15:00';
$cutoff = date('H', strtotime($cutoffhour));
$tomorrow = date("Ymd", strtotime('tomorrow'));
$pickup_date = WC()->session->get('pickup_date');
$pickup_date_formatted = date("Ymd", strtotime($pickup_date));

// ... validation logic
if ($post3pm == true && $pickup_date_formatted <= $tomorrow || $pickup_date_formatted == $today) {
    wc_add_notice( __( "Your pickup date is not valid...", 'woocommerce' ), 'error' );
}
```

### **4. Checkout Display** (`resources/views/woocommerce/checkout/form-checkout.blade.php`)
**Lines 23-148:**
```php
date_default_timezone_set('MST');
$today = date('Ymd');
$currenthour = date('H');
$cutoffhour = '15:00';
$cutoff = date('H', strtotime($cutoffhour));
$tomorrow = date("Ymd", strtotime('tomorrow'));
```

---

## 🐛 **CRITICAL VULNERABILITIES IDENTIFIED**

### **VULNERABILITY #1: Timezone Inconsistency** ⚠️ **HIGH SEVERITY**
**Location:** JavaScript vs PHP  
**Issue:** 
- **JavaScript uses:** `America/Edmonton` timezone
- **PHP uses:** `MST` (Mountain Standard Time)

**Problem:**
- **Edmonton is in Alberta, Canada** which observes **Mountain Time (MT)** with **Daylight Saving Time (DST)**
  - **MST = UTC-7** (Winter - Mountain Standard Time)
  - **MDT = UTC-6** (Summer - Mountain Daylight Time)
- PHP's `MST` timezone **DOES NOT observe DST** - it's always UTC-7
- JavaScript's `America/Edmonton` **DOES observe DST** - switches between UTC-7 and UTC-6

**Result:**
During daylight saving time (March-November), JavaScript and PHP are **1 HOUR OFF FROM EACH OTHER**.

**Example Scenario:**
```
Real Edmonton time: 3:30 PM MDT (UTC-6)
JavaScript dayjs:   3:30 PM ✓ (correct - uses America/Edmonton)
PHP date():         2:30 PM ✗ (wrong - uses MST which is UTC-7)
```

When it's actually 3:30 PM in Edmonton:
- JavaScript correctly blocks next-day orders
- PHP thinks it's only 2:30 PM and **ALLOWS** next-day orders

---

### **VULNERABILITY #2: Unreachable Validation Code** ⚠️ **CRITICAL**
**Location:** `app/filters.php` lines 737-754  
**Issue:** Code returns BEFORE the 3PM validation runs

```php
// Lines 737-738 - EARLY RETURNS
return $giftcertificate_in_cart;
return $giftcertificate_only_item_in_cart;

// Lines 740-757 - NEVER EXECUTED
if ($currenthour > $cutoff) {
    $post3pm = true;
}
// ... validation code below this NEVER RUNS
if ($post3pm == true && $pickup_date_formatted <= $tomorrow) {
    wc_add_notice( __( "Your pickup date is not valid..." ), 'error' );
}
```

**Result:** The server-side validation during checkout **NEVER EXECUTES**. The 3PM check relies ONLY on:
1. JavaScript date picker disabling (can be bypassed)
2. Cart page display logic (doesn't prevent submission)

---

### **VULNERABILITY #3: Weak Operator Precedence** ⚠️ **MEDIUM SEVERITY**
**Location:** `app/filters.php` line 754  
**Issue:** Ambiguous condition without proper parentheses

```php
if ($post3pm == true && $pickup_date_formatted <= $tomorrow || $pickup_date_formatted == $today)
```

**Evaluates as:**
```php
if (($post3pm == true && $pickup_date_formatted <= $tomorrow) || ($pickup_date_formatted == $today))
```

**Problem:** If `$pickup_date_formatted == $today`, the order is blocked **even before 3PM**.

**Should be:**
```php
if ($post3pm == true && ($pickup_date_formatted <= $tomorrow || $pickup_date_formatted == $today))
```

---

### **VULNERABILITY #4: Session Persistence Across Time Boundary** ⚠️ **MEDIUM SEVERITY**
**Location:** Cart session storage  
**Issue:** Date selected before 3PM stays in session after 3PM

**Scenario:**
1. User selects tomorrow's date at 2:45 PM ✓ (allowed)
2. User continues shopping, gets distracted
3. Clock passes 3:00 PM
4. User proceeds to checkout at 3:15 PM
5. Session still contains tomorrow's date from 2:45 PM
6. JavaScript validation runs with **new** time (correctly blocks)
7. But if user had the checkout page open, the date in session is still valid

**Result:** Stale session data bypasses time-based validation.

---

### **VULNERABILITY #5: Client-Side Only Enforcement** ⚠️ **HIGH SEVERITY**
**Location:** Date picker in `cart.js`  
**Issue:** Primary enforcement is JavaScript-based

**How it can be bypassed:**
1. **Browser DevTools:** User can modify disabled dates
2. **Cached page:** User loads cart page before 3PM, submits after 3PM
3. **JavaScript disabled:** Date picker won't initialize properly
4. **Session manipulation:** Direct POST to cart with date value
5. **Browser back button:** Go back to cached form with old date

**Current Defense:** The `after_checkout_validation` function SHOULD catch this, but it's **broken** (Vulnerability #2).

---

### **VULNERABILITY #6: Hour Comparison Only** ⚠️ **LOW SEVERITY**
**Location:** All PHP locations  
**Issue:** Compares only hours, not minutes

```php
$currenthour = date('H');  // Returns "15" at 3:00 PM and 3:59 PM
$cutoff = date('H', strtotime($cutoffhour));  // Returns "15"

if ($currenthour > $cutoff) {  // Only true at 4:00 PM+
```

**Problem:** 
- At 3:00 PM: `$currenthour = 15`, `$cutoff = 15` → Comparison is `15 > 15` = **false**
- At 3:59 PM: `$currenthour = 15`, `$cutoff = 15` → Comparison is `15 > 15` = **false**
- At 4:00 PM: `$currenthour = 16`, `$cutoff = 15` → Comparison is `16 > 15` = **true**

**Result:** Between 3:00-3:59 PM, the system thinks it's **BEFORE** the cutoff.

---

### **VULNERABILITY #7: Date Format Inconsistencies** ⚠️ **MEDIUM SEVERITY**
**Location:** Multiple files  
**Issue:** Different date formats used in different validations

**Formats used:**
- `'Ymd'` format (20251015) in `after_checkout_validation`
- `DateTime` objects in `cart.blade.php`
- `'DD/MM/YYYY'` format in JavaScript
- `'l, F j, Y'` format for session storage

**Problem:** String comparisons like `$pickup_date_formatted <= $tomorrow` where formats are `'l, F j, Y'` vs `'Ymd'` will fail or behave unexpectedly.

---

## 🎯 **ROOT CAUSE OF RECENT FAILURES**

Based on the vulnerabilities identified, the most likely causes:

### **Primary Culprit: Daylight Saving Time Issue (#1)**
**Timing:** Recent failures align with **DST transition or current DST period**

- **If failures happened during DST (March-November):**
  - PHP thinks it's 1 hour earlier than it actually is
  - At real 3:30 PM, PHP sees 2:30 PM and allows next-day orders
  - JavaScript correctly blocks, but users can bypass

### **Secondary Culprit: Broken Server Validation (#2)**
**Impact:** No server-side safety net

- Even if JavaScript blocks dates, there's ZERO server-side enforcement
- Any bypass of JavaScript (DevTools, caching, etc.) succeeds
- The `return` statements before validation mean checkout NEVER validates

### **Contributing Factor: Hour-Only Comparison (#6)**
**Window of vulnerability:** 3:00-3:59 PM every day

- System allows next-day orders for the entire hour of 3:00 PM
- Should be blocking at 3:00:00 PM, but blocks at 4:00:00 PM

---

## 🔍 **How Orders Got Through**

**Most Likely Scenario:**
```
1. Order placed at 3:XX PM (between 3:00-3:59)
2. PHP hour comparison: 15 > 15 = false (thinks it's before cutoff)
3. JavaScript: DOES block, but user had cached page OR used DevTools
4. Server validation: NEVER RUNS (early return in code)
5. Order proceeds with next-day pickup ❌
```

**During DST (additional hour of vulnerability):**
```
1. Real time: 3:30 PM MDT
2. PHP MST time: 2:30 PM (1 hour behind)
3. PHP thinks it's before cutoff
4. Order proceeds even though it's past 3PM ❌
```

---

## ✅ **RECOMMENDED FIXES**

### **FIX #1: Correct Timezone to America/Edmonton**
```php
// Replace everywhere:
date_default_timezone_set('MST');

// With:
date_default_timezone_set('America/Edmonton');
```

### **FIX #2: Remove Early Returns in Validation**
```php
// app/filters.php line 737-738 - DELETE THESE LINES
return $giftcertificate_in_cart;  // ❌ DELETE
return $giftcertificate_only_item_in_cart;  // ❌ DELETE
```

### **FIX #3: Fix Hour Comparison to Include 3:00 PM Hour**
```php
// Change from:
if ($currenthour > $cutoff) {

// To:
if ($currenthour >= $cutoff) {
```

### **FIX #4: Add Proper Parentheses to Validation**
```php
// Change from:
if ($post3pm == true && $pickup_date_formatted <= $tomorrow || $pickup_date_formatted == $today)

// To:
if ($post3pm == true && ($pickup_date_formatted <= $tomorrow || $pickup_date_formatted == $today))
```

### **FIX #5: Add Time-Based Session Validation**
```php
// Store the timestamp when date was selected
WC()->session->set('pickup_date_selected_at', time());

// During checkout, validate the selection is still valid for current time
$selected_at = WC()->session->get('pickup_date_selected_at');
if ($selected_at && (time() - $selected_at) > 600) { // 10 minutes
    // Re-validate the date with current time
}
```

---

## 📊 **SEVERITY SUMMARY**

| Vulnerability | Severity | Exploitable | Currently Causing Failures |
|--------------|----------|-------------|----------------------------|
| #1 Timezone DST | **HIGH** | Yes | **YES** - Primary cause |
| #2 Unreachable Code | **CRITICAL** | Yes | **YES** - No server validation |
| #3 Operator Precedence | **MEDIUM** | Unlikely | No |
| #4 Session Persistence | **MEDIUM** | Yes | Possibly |
| #5 Client-Side Only | **HIGH** | Yes | **YES** - Easy bypass |
| #6 Hour Comparison | **LOW** | Yes | **YES** - 1-hour window daily |
| #7 Date Format Mix | **MEDIUM** | Unlikely | Possibly |

---

## 🎯 **IMMEDIATE ACTION REQUIRED**

1. **Fix timezone** - Change `MST` to `America/Edmonton` everywhere
2. **Remove early returns** - Delete lines 737-738 in `app/filters.php`
3. **Fix hour comparison** - Change `>` to `>=` for cutoff check
4. **Test thoroughly** - Especially during 3:00-3:59 PM window

These three fixes will close the primary holes allowing orders through.

