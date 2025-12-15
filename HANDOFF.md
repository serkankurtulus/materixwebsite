# MATERIX Website - Handoff Document
**Date:** December 15, 2024
**Last Updated By:** Claude Opus 4.5
**Repository:** github.com/serkankurtulus/materixwebsite
**Live Site:** https://strong-daifuku-b4a8ca.netlify.app/

---

## 1. PROJECT OVERVIEW

MATERIX is a Turkish nanotechnology company specializing in nano coatings for solar panels and other surfaces. This is a bilingual (Turkish/English) marketing website built with Eleventy (11ty) static site generator.

### Business Context
- **Company:** MATERIX Nano Teknoloji
- **Main Product:** SSR (Solar Self-cleaning Reflex) nano coating for solar panels
- **Value Proposition:** Up to 8% efficiency increase for solar panels, self-cleaning properties
- **Target Markets:** Solar power plants, residential solar installations, automotive, marine, textile

---

## 2. TECHNOLOGY STACK

| Component | Technology | Version |
|-----------|------------|---------|
| Static Site Generator | Eleventy (11ty) | 3.1.2 |
| Templating | Nunjucks (.njk) | - |
| CSS Framework | Tailwind CSS (CDN) | Latest |
| Custom CSS | Handwritten styles.css | - |
| CMS | Decap CMS (formerly Netlify CMS) | - |
| Hosting | Netlify | - |
| Repository | GitHub | - |
| Node.js | Required | 18+ |

### Important: CSS Architecture
The site uses a **hybrid CSS approach**:
1. **Tailwind CDN** - Loaded via `<script src="https://cdn.tailwindcss.com">` with inline config
2. **Custom styles.css** - Handwritten CSS at `src/assets/css/styles.css`

**Critical Note:** Tailwind CDN includes "preflight" reset that strips default browser styling. Custom styles may need `!important` to override.

---

## 3. DIRECTORY STRUCTURE

```
materixwebsite/
├── src/
│   ├── _data/                    # Global data files
│   │   ├── tr.json               # Turkish translations & URLs
│   │   ├── en.json               # English translations & URLs
│   │   └── site.json             # Site-wide configuration
│   │
│   ├── _includes/
│   │   ├── layouts/              # Page layouts
│   │   │   ├── base.njk          # Base HTML template
│   │   │   ├── page.njk          # Generic page layout
│   │   │   ├── blog.njk          # Blog listing layout
│   │   │   ├── blog-post.njk     # Individual blog post layout
│   │   │   ├── product.njk       # SSR product pages (solar)
│   │   │   └── product-chemical.njk  # Chemical product pages
│   │   │
│   │   └── components/           # Reusable components
│   │       ├── header.njk        # Navigation header
│   │       ├── footer.njk        # Site footer
│   │       ├── language-switcher.njk
│   │       ├── hero.njk          # Homepage hero section
│   │       ├── calculator.njk    # ROI savings calculator
│   │       └── ... (other components)
│   │
│   ├── content/
│   │   ├── tr/                   # Turkish content
│   │   │   ├── pages/            # Static pages (index, contact, etc.)
│   │   │   ├── products/         # Product pages
│   │   │   └── blog/             # Blog posts
│   │   │
│   │   └── en/                   # English content (mirrors TR structure)
│   │       ├── pages/
│   │       ├── products/
│   │       └── blog/
│   │
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css        # Custom CSS (NOT Tailwind compiled)
│   │   ├── js/
│   │   │   └── main.js           # Client-side JavaScript
│   │   └── images/               # Static images
│   │
│   └── admin/
│       ├── index.html            # Decap CMS entry point
│       └── config.yml            # CMS configuration
│
├── _site/                        # Generated output (git-ignored)
├── eleventy.config.js            # Eleventy configuration
├── package.json
├── netlify.toml                  # Netlify deployment config
├── implementationplan.md         # Detailed implementation documentation
└── HANDOFF.md                    # This file
```

---

## 4. KEY FILES REFERENCE

### Translation Files
- **`src/_data/tr.json`** - Turkish: all UI strings, URLs, product info
- **`src/_data/en.json`** - English: all UI strings, URLs, product info

URL structure is defined here. Example:
```json
{
  "urls": {
    "home": "/tr/",
    "solarProducts": "/tr/urunlerimiz/ssr-pro/",
    "homeChemicals": "/tr/urunlerimiz/ev-kimyasallari/",
    ...
  }
}
```

### Navigation
- **`src/_includes/components/header.njk`** - Main navigation
  - Desktop nav with dropdown for Products
  - Mobile nav with accordion
  - Uses `translations.urls.*` for links
  - Uses `translations.nav.*` for labels

### Layouts
- **`base.njk`** - HTML skeleton, loads CSS/JS, includes header/footer
- **`product.njk`** - For SSR solar products (Pro, Standard, Industrial)
- **`product-chemical.njk`** - For chemical products (home, vehicle, textile, marine)

### Products Structure
Each product is a Markdown file with YAML frontmatter:
```yaml
---
layout: layouts/product-chemical.njk
lang: tr
title: "Page Title"
permalink: /tr/urunlerimiz/ev-kimyasallari/
product:
  name: "Product Name"
  subtitle: "Subtitle"
  ...
productList:
  - name: "Sub-product 1"
    features: [...]
  - name: "Sub-product 2"
    ...
---
```

---

## 5. URL MAPPING

### Turkish URLs
| Page | URL |
|------|-----|
| Home | `/tr/` |
| Products (general) | `/tr/urunlerimiz/` |
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

### English URLs
| Page | URL |
|------|-----|
| Home | `/en/` |
| Products | `/en/products/` |
| SSR Pro | `/en/products/ssr-pro/` |
| Contact | `/en/contact/` |
| ... | (follows similar pattern) |

---

## 6. PENDING TASKS

### High Priority
1. **Fix Blog Styling** - Blog content not rendering with proper typography despite CSS fixes
   - Currently removed from navigation
   - Issue: Tailwind CDN preflight reset overriding styles
   - Attempted fix with `!important` didn't work on live site
   - May need different approach (disable preflight or use Tailwind prose plugin)

2. **Review ROI Calculator Equation** - Verify the savings calculation formula is accurate

3. **Update Customer Stats** - "500+ customers" needs verification/update

4. **Add SSR Industrial Price** - Currently shows "Özel Teklif" (Custom Quote)

### Medium Priority
- Add more blog posts
- Implement contact form backend
- Add Google Analytics
- Set up custom domain (materix.tech)

---

## 7. KNOWN ISSUES & SOLUTIONS

### Issue 1: Blog Content Not Styling
**Status:** UNRESOLVED - Blog removed from menu temporarily

**Root Cause:** Tailwind CDN includes preflight reset that removes default styling from h1-h4, p, ul, ol, blockquote, etc.

**Attempted Fixes:**
1. Created `.blog-content` CSS class in styles.css
2. Added `!important` to all properties
3. Neither worked on production

**Possible Solutions to Try:**
- Disable Tailwind preflight via CDN config
- Use `@tailwindcss/typography` plugin with prose class
- Move blog-content styles to `<style>` tag in template
- Use inline styles

**Relevant Files:**
- `src/assets/css/styles.css` (lines 731-888)
- `src/_includes/layouts/blog-post.njk`
- `src/content/tr/blog/gunes-panellerinde-nano-kaplama.md`

### Issue 2: Navigation Dropdown (FIXED)
Solar products dropdown was pointing to `/tr/urunlerimiz/` instead of SSR Pro page.
**Fixed in commit:** 5ca22e7

---

## 8. BUILD & DEPLOYMENT

### Local Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:8080)
npm run build        # Build to _site/
```

### Deployment
- Auto-deploys on push to `main` branch via Netlify
- Build command: `npm run build`
- Publish directory: `_site`

### Environment
- Node.js 18+ required
- Set in `netlify.toml`

---

## 9. RECENT COMMITS

```
74b3b46 Remove blog from navigation menu temporarily
d45d15f docs: Add Issue 5 and Issue 6 to implementation plan
e57b0e9 Fix: Add !important to blog-content styles
5ca22e7 Fix: Solar products navigation link
640065a Update implementation plan with Phase 14
2f4a031 Add blog styling, Purira product, product spec updates
```

---

## 10. CMS ACCESS

- **URL:** https://strong-daifuku-b4a8ca.netlify.app/admin/
- **Auth:** Netlify Identity (invite-only)
- **Config:** `src/admin/config.yml`

---

## 11. CONTACTS & RESOURCES

- **Implementation Plan:** `/implementationplan.md` - Comprehensive project documentation
- **Color Palette:** `/color-palette.md` - Brand colors with visual previews
- **Gap Analysis:** `/gap-analysis-v3.md` - Feature gap analysis

---

## 12. QUICK START FOR NEXT SESSION

1. **Clone/pull latest:**
   ```bash
   git pull origin main
   npm install
   ```

2. **Run locally:**
   ```bash
   npm run dev
   ```

3. **Priority task:** Fix blog styling issue (see Section 7)

4. **Key files to review:**
   - `src/_data/tr.json` - Turkish translations
   - `src/_includes/components/header.njk` - Navigation
   - `src/assets/css/styles.css` - Custom CSS

---

## 13. NOTES FOR AI AGENT

- **DO NOT** commit without user approval
- Site uses **Tailwind CDN** (not compiled), which causes CSS specificity issues
- All translations are in JSON files, not hardcoded
- Product pages use frontmatter YAML for all content
- The `implementationplan.md` file has extensive documentation
- Check `git status` before making changes
- User prefers Turkish language for UI/content discussions

---

*Document generated by Claude Opus 4.5 for session handoff*
