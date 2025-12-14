# MATERIX Website Gap Analysis & Fix Plan v2

## Executive Summary

A comprehensive audit revealed multiple critical issues with the website's URL structure and navigation. The primary problem is that **all navigation links use Turkish URL patterns regardless of language**, causing all English navigation to be broken.

---

## Gap Analysis

### Issue 1: CRITICAL - Navigation Uses Hardcoded Turkish URLs

**Affected Files:**
- `src/_includes/components/header.njk`
- `src/_includes/components/footer.njk`

**Problem:**
Navigation links use Turkish URL paths for ALL languages:

| Navigation Link | Generated URL (EN) | Actual Page URL | Status |
|----------------|-------------------|-----------------|--------|
| Products | `/en/urunlerimiz/` | `/en/products/` | BROKEN |
| Corporate | `/en/kurumsal/` | `/en/corporate/` | BROKEN |
| Projects | `/en/projelerimiz/` | `/en/projects/` | BROKEN |
| Nanotechnology | `/en/nanoteknoloji/` | `/en/nanotechnology/` | BROKEN |
| Contact | `/en/iletisim/` | `/en/contact/` | BROKEN |
| Home Chemicals | `/en/ev-kimyasallari/` | `/en/home-chemicals/` | BROKEN |
| Vehicle Chemicals | `/en/arac-kimyasallari/` | `/en/vehicle-chemicals/` | BROKEN |
| Textile Chemicals | `/en/tekstil-kimyasallari/` | `/en/textile-chemicals/` | BROKEN |
| Marine Chemicals | `/en/tekne-kimyasallari/` | `/en/marine-chemicals/` | BROKEN |

**Impact:** Entire English site navigation is non-functional. Users clicking any nav link get 404 errors.

---

### Issue 2: HIGH - Missing Legal Pages

**Problem:**
Footer links to legal pages that don't exist:

| Page | TR URL | EN URL | Status |
|------|--------|--------|--------|
| Privacy Policy | `/tr/gizlilik-politikasi/` | `/en/privacy-policy/` | MISSING |
| Terms of Use | `/tr/kullanim-kosullari/` | `/en/terms-of-use/` | MISSING |

---

### Issue 3: MEDIUM - Inconsistent Product URL Structure

**Problem:**
SSR products are nested under `/products/` but chemical products are at root level:

**Current Structure (Inconsistent):**
```
/en/products/ssr-pro/          (nested)
/en/products/ssr-standard/     (nested)
/en/products/ssr-industrial/   (nested)
/en/home-chemicals/            (root level - inconsistent)
/en/vehicle-chemicals/         (root level - inconsistent)
/en/textile-chemicals/         (root level - inconsistent)
/en/marine-chemicals/          (root level - inconsistent)
```

**Expected Structure (Consistent):**
```
/en/products/ssr-pro/
/en/products/ssr-standard/
/en/products/ssr-industrial/
/en/products/home-chemicals/
/en/products/vehicle-chemicals/
/en/products/textile-chemicals/
/en/products/marine-chemicals/
```

---

### Issue 4: LOW - Footer Product Links All Point to Same URL

**Problem:**
In footer, all product links (SSR Pro, Standard, Industrial) point to `/{{ lang }}/urunlerimiz/` instead of individual product pages.

---

## Complete URL Mapping

### Required URL Structure by Language

#### Turkish (TR) Pages
| Page | URL |
|------|-----|
| Home | `/tr/` |
| Products | `/tr/urunlerimiz/` |
| SSR Pro | `/tr/urunlerimiz/ssr-pro/` |
| SSR Standard | `/tr/urunlerimiz/ssr-standard/` |
| SSR Industrial | `/tr/urunlerimiz/ssr-industrial/` |
| Home Chemicals | `/tr/urunlerimiz/ev-kimyasallari/` |
| Vehicle Chemicals | `/tr/urunlerimiz/arac-kimyasallari/` |
| Textile Chemicals | `/tr/urunlerimiz/tekstil-kimyasallari/` |
| Marine Chemicals | `/tr/urunlerimiz/tekne-kimyasallari/` |
| Corporate | `/tr/kurumsal/` |
| Projects | `/tr/projelerimiz/` |
| Nanotechnology | `/tr/nanoteknoloji/` |
| Contact | `/tr/iletisim/` |
| Blog | `/tr/blog/` |
| Privacy Policy | `/tr/gizlilik-politikasi/` |
| Terms of Use | `/tr/kullanim-kosullari/` |

#### English (EN) Pages
| Page | URL |
|------|-----|
| Home | `/en/` |
| Products | `/en/products/` |
| SSR Pro | `/en/products/ssr-pro/` |
| SSR Standard | `/en/products/ssr-standard/` |
| SSR Industrial | `/en/products/ssr-industrial/` |
| Home Chemicals | `/en/products/home-chemicals/` |
| Vehicle Chemicals | `/en/products/vehicle-chemicals/` |
| Textile Chemicals | `/en/products/textile-chemicals/` |
| Marine Chemicals | `/en/products/marine-chemicals/` |
| Corporate | `/en/corporate/` |
| Projects | `/en/projects/` |
| Nanotechnology | `/en/nanotechnology/` |
| Contact | `/en/contact/` |
| Blog | `/en/blog/` |
| Privacy Policy | `/en/privacy-policy/` |
| Terms of Use | `/en/terms-of-use/` |

---

## Fix Plan

### Phase 1: Add URL Data to Translation Files
**Priority:** CRITICAL
**Effort:** Low

Add URL mappings to `tr.json` and `en.json` so navigation can use language-specific URLs.

**Changes to `src/_data/tr.json`:**
```json
"urls": {
  "home": "/tr/",
  "products": "/tr/urunlerimiz/",
  "ssrPro": "/tr/urunlerimiz/ssr-pro/",
  "ssrStandard": "/tr/urunlerimiz/ssr-standard/",
  "ssrIndustrial": "/tr/urunlerimiz/ssr-industrial/",
  "homeChemicals": "/tr/urunlerimiz/ev-kimyasallari/",
  "vehicleChemicals": "/tr/urunlerimiz/arac-kimyasallari/",
  "textileChemicals": "/tr/urunlerimiz/tekstil-kimyasallari/",
  "marineChemicals": "/tr/urunlerimiz/tekne-kimyasallari/",
  "corporate": "/tr/kurumsal/",
  "projects": "/tr/projelerimiz/",
  "nanotechnology": "/tr/nanoteknoloji/",
  "contact": "/tr/iletisim/",
  "blog": "/tr/blog/",
  "privacy": "/tr/gizlilik-politikasi/",
  "terms": "/tr/kullanim-kosullari/"
}
```

**Changes to `src/_data/en.json`:**
```json
"urls": {
  "home": "/en/",
  "products": "/en/products/",
  "ssrPro": "/en/products/ssr-pro/",
  "ssrStandard": "/en/products/ssr-standard/",
  "ssrIndustrial": "/en/products/ssr-industrial/",
  "homeChemicals": "/en/products/home-chemicals/",
  "vehicleChemicals": "/en/products/vehicle-chemicals/",
  "textileChemicals": "/en/products/textile-chemicals/",
  "marineChemicals": "/en/products/marine-chemicals/",
  "corporate": "/en/corporate/",
  "projects": "/en/projects/",
  "nanotechnology": "/en/nanotechnology/",
  "contact": "/en/contact/",
  "blog": "/en/blog/",
  "privacy": "/en/privacy-policy/",
  "terms": "/en/terms-of-use/"
}
```

---

### Phase 2: Update Navigation Components
**Priority:** CRITICAL
**Effort:** Medium

Update header.njk and footer.njk to use `{{ translations.urls.xxx }}` instead of hardcoded paths.

**Files to Update:**
- `src/_includes/components/header.njk`
- `src/_includes/components/footer.njk`

**Example Change:**
```njk
{# Before #}
<a href="/{{ lang }}/urunlerimiz/">{{ translations.nav.products }}</a>

{# After #}
<a href="{{ translations.urls.products }}">{{ translations.nav.products }}</a>
```

---

### Phase 3: Update Product Permalinks for Consistency
**Priority:** MEDIUM
**Effort:** Low

Update chemical product permalinks to be nested under products:

**Files to Update:**
- `src/content/en/products/home-chemicals.md` → `/en/products/home-chemicals/`
- `src/content/en/products/vehicle-chemicals.md` → `/en/products/vehicle-chemicals/`
- `src/content/en/products/textile-chemicals.md` → `/en/products/textile-chemicals/`
- `src/content/en/products/marine-chemicals.md` → `/en/products/marine-chemicals/`
- `src/content/tr/products/ev-kimyasallari.md` → `/tr/urunlerimiz/ev-kimyasallari/`
- `src/content/tr/products/arac-kimyasallari.md` → `/tr/urunlerimiz/arac-kimyasallari/`
- `src/content/tr/products/tekstil-kimyasallari.md` → `/tr/urunlerimiz/tekstil-kimyasallari/`
- `src/content/tr/products/tekne-kimyasallari.md` → `/tr/urunlerimiz/tekne-kimyasallari/`

---

### Phase 4: Create Missing Legal Pages
**Priority:** HIGH
**Effort:** Low

Create the following pages:
- `src/content/tr/pages/gizlilik-politikasi.md`
- `src/content/tr/pages/kullanim-kosullari.md`
- `src/content/en/pages/privacy-policy.md`
- `src/content/en/pages/terms-of-use.md`

---

### Phase 5: Update Footer Product Links
**Priority:** LOW
**Effort:** Low

Update footer to link to individual product pages instead of main products page.

---

### Phase 6: Testing & Deployment
**Priority:** CRITICAL
**Effort:** Low

1. Build and test all navigation links
2. Verify all pages load correctly
3. Commit and push to GitHub
4. Verify on Netlify

---

## Implementation Order

| Phase | Description | Priority | Status |
|-------|-------------|----------|--------|
| 1 | Add URL data to translation files | CRITICAL | COMPLETED |
| 2 | Update navigation components | CRITICAL | COMPLETED |
| 3 | Update product permalinks | MEDIUM | COMPLETED |
| 4 | Create missing legal pages | HIGH | COMPLETED |
| 5 | Update footer product links | LOW | COMPLETED (in Phase 2) |
| 6 | Testing & deployment | CRITICAL | Pending |

---

## Implementation Log

### Phase 1: Add URL Data to Translation Files - COMPLETED
**Date:** 2025-12-14
**Status:** COMPLETED

**Changes Made:**
- Added `urls` section to `src/_data/tr.json` with all Turkish URL mappings
- Added `urls` section to `src/_data/en.json` with all English URL mappings

**Files Modified:**
- `src/_data/tr.json`
- `src/_data/en.json`

**URL Mappings Added:**
- home, products, ssrPro, ssrStandard, ssrIndustrial
- homeChemicals, vehicleChemicals, textileChemicals, marineChemicals
- corporate, projects, nanotechnology, contact, blog
- privacy, terms

**Issues:** None
**Parked Items:** None

---

### Phase 2: Update Navigation Components - COMPLETED
**Date:** 2025-12-14
**Status:** COMPLETED

**Changes Made:**
- Updated `header.njk` desktop navigation links to use `{{ translations.urls.xxx }}`
- Updated `header.njk` mobile menu links to use `{{ translations.urls.xxx }}`
- Updated `header.njk` CTA buttons to use `{{ translations.urls.contact }}`
- Updated `footer.njk` CTA button to use `{{ translations.urls.contact }}`
- Updated `footer.njk` product links to use individual product URLs (Phase 5 integrated)
- Updated `footer.njk` company links to use translation URLs
- Updated `footer.njk` privacy/terms links to use translation URLs

**Files Modified:**
- `src/_includes/components/header.njk`
- `src/_includes/components/footer.njk`

**Links Updated:**
- Desktop nav: products dropdown (5 links), corporate, projects, nanotechnology, blog, contact
- Mobile nav: products accordion (5 links), corporate, projects, nanotechnology, blog, contact
- CTA buttons: desktop header, mobile header, footer
- Footer: 4 product links, 4 company links, 2 legal links

**Issues:** None
**Parked Items:** None

---

### Phase 3: Update Product Permalinks - COMPLETED
**Date:** 2025-12-14
**Status:** COMPLETED

**Changes Made:**
- Updated English chemical product permalinks to be nested under `/en/products/`
- Updated Turkish chemical product permalinks to be nested under `/tr/urunlerimiz/`

**Files Modified:**
- `src/content/en/products/home-chemicals.md` → `/en/products/home-chemicals/`
- `src/content/en/products/vehicle-chemicals.md` → `/en/products/vehicle-chemicals/`
- `src/content/en/products/textile-chemicals.md` → `/en/products/textile-chemicals/`
- `src/content/en/products/marine-chemicals.md` → `/en/products/marine-chemicals/`
- `src/content/tr/products/ev-kimyasallari.md` → `/tr/urunlerimiz/ev-kimyasallari/`
- `src/content/tr/products/arac-kimyasallari.md` → `/tr/urunlerimiz/arac-kimyasallari/`
- `src/content/tr/products/tekstil-kimyasallari.md` → `/tr/urunlerimiz/tekstil-kimyasallari/`
- `src/content/tr/products/tekne-kimyasallari.md` → `/tr/urunlerimiz/tekne-kimyasallari/`

**Result:** All products now consistently nested under `/products/` (EN) or `/urunlerimiz/` (TR)

**Issues:** None
**Parked Items:** None

---

### Phase 4: Create Missing Legal Pages - COMPLETED
**Date:** 2025-12-14
**Status:** COMPLETED

**Changes Made:**
- Created Turkish Privacy Policy page
- Created Turkish Terms of Use page
- Created English Privacy Policy page
- Created English Terms of Use page

**Files Created:**
- `src/content/tr/pages/gizlilik-politikasi.md` → `/tr/gizlilik-politikasi/`
- `src/content/tr/pages/kullanim-kosullari.md` → `/tr/kullanim-kosullari/`
- `src/content/en/pages/privacy-policy.md` → `/en/privacy-policy/`
- `src/content/en/pages/terms-of-use.md` → `/en/terms-of-use/`

**Content Includes:**
- Data collection practices
- Usage of information
- Information sharing policies
- Cookie policy
- Data security measures
- User rights
- Contact information
- Intellectual property rights
- Usage rules
- Disclaimer

**Issues:** None
**Parked Items:** None

---

### Phase 5: Update Footer Product Links - COMPLETED (integrated into Phase 2)
**Note:** Footer product links updated to point to individual product pages in Phase 2.

---

## Success Criteria

- [ ] All English navigation links work correctly
- [ ] All Turkish navigation links work correctly
- [ ] Privacy Policy pages exist and are accessible
- [ ] Terms of Use pages exist and are accessible
- [ ] All product pages are nested under /products/ (EN) or /urunlerimiz/ (TR)
- [ ] Footer product links go to individual product pages
- [ ] No 404 errors on any internal links

---

## Files to Create/Modify

### New Files (4)
- `src/content/tr/pages/gizlilik-politikasi.md`
- `src/content/tr/pages/kullanim-kosullari.md`
- `src/content/en/pages/privacy-policy.md`
- `src/content/en/pages/terms-of-use.md`

### Modified Files (14)
- `src/_data/tr.json` - Add urls section
- `src/_data/en.json` - Add urls section
- `src/_includes/components/header.njk` - Use translation URLs
- `src/_includes/components/footer.njk` - Use translation URLs
- `src/content/en/products/home-chemicals.md` - Update permalink
- `src/content/en/products/vehicle-chemicals.md` - Update permalink
- `src/content/en/products/textile-chemicals.md` - Update permalink
- `src/content/en/products/marine-chemicals.md` - Update permalink
- `src/content/tr/products/ev-kimyasallari.md` - Update permalink
- `src/content/tr/products/arac-kimyasallari.md` - Update permalink
- `src/content/tr/products/tekstil-kimyasallari.md` - Update permalink
- `src/content/tr/products/tekne-kimyasallari.md` - Update permalink
