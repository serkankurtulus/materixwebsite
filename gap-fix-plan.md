# MATERIX Website Gap-Fix Plan

## Executive Summary
The implemented website significantly differs from the original design mockups. This document outlines all gaps and the plan to fix them.

---

## Implementation Log

### Phase 1: Fix Translations - COMPLETED ✅
**Date:** 2025-12-14
**Status:** COMPLETED

**Changes Made:**
- Added `eleventyComputed` global data in `eleventy.config.js` to properly resolve translations based on `lang` variable
- The computed data function now returns `data.tr` or `data.en` object based on the page's `lang` frontmatter

**Files Modified:**
- `eleventy.config.js` - Added computed translations resolver

**Results Verified:**
- Navigation menu: All labels now display correctly (Ürünlerimiz, Kurumsal, Projelerimiz, etc.)
- Product dropdown: Categories with descriptions showing
- Footer CTA: "Güneş Enerjinizden Maksimum Verimi Almaya Hazır mısınız?" displaying
- Footer sections: "Ürünler", product names, tagline all working
- Button texts: "İletişime Geç", "Ücretsiz Keşif İsteyin", "Teklif Al" all showing

**Issues:** None
**Parked Items:** None

---

### Phase 2: Create SSR Product Template - COMPLETED ✅
**Date:** 2025-12-14
**Status:** COMPLETED

**Changes Made:**
- Created new `product-ssr.njk` template matching original HTML mockup design
- Implemented all 8 sections from original design:
  1. Hero with light gradient, price card, ROI badge, feature checkmarks
  2. Key Benefits (3 colored gradient cards with blue/green/purple)
  3. Technical Specifications (2 styled cards with colored values + application grid)
  4. Application Process (4 numbered colored circles + CTA banner)
  5. Case Study (dark section with 4 glass stat cards)
  6. FAQ (collapsible accordions)
  7. Related Products (2 gradient product cards)
  8. Final CTA (full gradient with 2 buttons)

**Files Created:**
- `src/_includes/layouts/product-ssr.njk` - New rich product template

**Files Modified (Phase 3 integrated):**
- `src/content/tr/products/ssr-pro.md` - Rich structured frontmatter
- `src/content/tr/products/ssr-standard.md` - Rich structured frontmatter
- `src/content/tr/products/ssr-industrial.md` - Rich structured frontmatter
- `src/content/en/products/ssr-pro.md` - Rich structured frontmatter
- `src/content/en/products/ssr-standard.md` - Rich structured frontmatter
- `src/content/en/products/ssr-industrial.md` - Rich structured frontmatter

**Rich Data Structure Includes:**
- Product badge, price card with unit and note
- ROI with note, stats (installations, rating)
- Feature highlights with checkmarks
- Key benefits with icons and colors
- Performance and durability specs with colored values
- Application details grid with colored values
- Application steps with colored numbered circles
- Case study with stats, quote, and image
- FAQs array for accordion
- Related products with links and icons

**Results Verified:**
- Light gradient hero (`from-blue-50`) matching original
- Price card with ₺850 and "Hemen Sipariş Ver" button
- ROI badge showing "2.3 Yıl"
- 3 colored benefit cards with hover-lift effects
- Styled spec cards with alternating blue/green values
- Numbered application steps with colors
- Dark case study section (`bg-gray-900`) with glass stat cards
- Collapsible FAQ accordions
- Related products section with gradient headers
- Full gradient CTA section

**Issues:** None
**Parked Items:** None

---

### Phase 3: Update Product Data Structure - COMPLETED ✅
**Note:** Integrated into Phase 2 above. All 6 SSR product files updated with rich frontmatter.

---

## Priority 1: CRITICAL - Fix Translations (Affects Entire Site) - COMPLETED ✅

### Problem
All `{{ translations.xxx }}` variables output empty strings. This affects:
- Navigation menu labels
- Button texts ("Teklif Al", "İletişim", etc.)
- Footer section titles and links
- CTA section content

### Root Cause
The `translations` variable is set to the string `"tr"` instead of the actual translation object.

### Fix
1. Update frontmatter in all markdown files:
   ```yaml
   # Change from:
   translations: tr

   # Change to (remove translations, use lang):
   lang: tr
   ```

2. Update `eleventy.config.js` to properly merge translation data:
   ```javascript
   eleventyConfig.addGlobalData("eleventyComputed", {
     translations: (data) => {
       const lang = data.lang || 'tr';
       return data[lang] || data.tr;
     }
   });
   ```

3. Or update templates to use `tr.xxx` or `en.xxx` directly based on `lang` variable.

### Files to Update
- `src/_data/tr.json` - Verify structure
- `src/_data/en.json` - Verify structure
- `eleventy.config.js` - Add computed data
- All `.md` files - Update frontmatter if needed

---

## Priority 2: HIGH - Create SSR Product Template

### Problem
Current `product.njk` is a generic template that doesn't match the rich SSR Pro design.

### Fix
Create a new dedicated template: `src/_includes/layouts/product-ssr.njk`

### Sections to Implement

#### 2.1 Hero Section
**Original Features:**
- Light gradient background: `bg-gradient-to-b from-blue-50 to-white`
- "En Popüler Seçim" green badge with checkmark icon
- Large title + subtitle
- Feature checkmarks row: "%6-8 Verim Artışı", "5 Yıl Garanti", "Profesyonel Uygulama"
- White price card with: Price (₺850/m²), min area note, 2 CTA buttons
- Stats row: "2.5K+ Kurulum", "4.9/5 Müşteri Puanı"
- Product image with floating ROI card ("Ortalama ROI: 2.3 Yıl")

**Implementation:**
```html
<section class="pt-32 pb-16 bg-gradient-to-b from-blue-50 to-white">
  <!-- Badge -->
  <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
    <svg>...</svg>
    En Popüler Seçim
  </div>

  <!-- Title -->
  <h1 class="text-5xl md:text-6xl font-bold">{{ product.name }}</h1>

  <!-- Feature checkmarks -->
  <div class="flex flex-wrap gap-4 mb-8">
    {% for highlight in product.highlights %}
    <div class="flex items-center gap-2">
      <svg class="w-5 h-5 text-green-500">...</svg>
      <span class="font-semibold">{{ highlight }}</span>
    </div>
    {% endfor %}
  </div>

  <!-- Price card -->
  <div class="bg-white rounded-2xl p-6 shadow-lg mb-8">
    <div class="text-4xl font-bold text-blue-700">{{ product.price }}</div>
    <div class="flex gap-3">
      <button class="btn-primary">Hemen Sipariş Ver</button>
      <button class="btn-secondary">Teklif Al</button>
    </div>
  </div>

  <!-- Image with ROI card -->
  <div class="relative">
    <img src="{{ product.image }}" class="rounded-2xl shadow-2xl">
    <div class="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl p-6">
      <div class="text-sm font-semibold text-blue-700">Ortalama ROI</div>
      <div class="text-3xl font-bold">{{ product.roi }}</div>
    </div>
  </div>
</section>
```

#### 2.2 Key Benefits Section ("Neden MATERIX SSR Pro?")
**Original Features:**
- 3 gradient cards with colored backgrounds (blue/green/purple)
- Each has: colored icon box, title, description
- Hover-lift animation

**Implementation:**
```html
<section class="py-16 bg-white">
  <h2>Neden {{ product.name }}?</h2>
  <div class="grid md:grid-cols-3 gap-8">
    {% for benefit in product.keyBenefits %}
    <div class="bg-gradient-to-br from-{{ benefit.color }}-50 to-white rounded-2xl p-8 hover-lift">
      <div class="w-14 h-14 bg-{{ benefit.color }}-100 rounded-xl flex items-center justify-center mb-4">
        {{ benefit.icon | safe }}
      </div>
      <h3>{{ benefit.title }}</h3>
      <p>{{ benefit.description }}</p>
    </div>
    {% endfor %}
  </div>
</section>
```

#### 2.3 Technical Specifications
**Original Features:**
- Two side-by-side white cards with shadows
- Styled rows with colored values (blue/green alternating)
- Bottom: Application details grid with large colored numbers

**Implementation:**
```html
<section class="py-16 bg-gray-50">
  <div class="grid md:grid-cols-2 gap-8">
    <!-- Performance Card -->
    <div class="bg-white rounded-2xl p-8 shadow-lg">
      <h3>Performans Özellikleri</h3>
      {% for spec in product.performanceSpecs %}
      <div class="flex justify-between items-center pb-4 border-b border-gray-100">
        <span class="text-gray-700">{{ spec.label }}</span>
        <span class="text-{{ spec.color }}-600 font-bold">{{ spec.value }}</span>
      </div>
      {% endfor %}
    </div>

    <!-- Durability Card -->
    <div class="bg-white rounded-2xl p-8 shadow-lg">
      <h3>Dayanıklılık</h3>
      {% for spec in product.durabilitySpecs %}
      <!-- Same structure -->
      {% endfor %}
    </div>
  </div>

  <!-- Application Details Grid -->
  <div class="mt-8 bg-white rounded-2xl p-8 shadow-lg">
    <div class="grid md:grid-cols-4 gap-6">
      {% for detail in product.applicationDetails %}
      <div class="text-center">
        <div class="text-3xl font-bold text-{{ detail.color }}-600">{{ detail.value }}</div>
        <div class="text-sm text-gray-600">{{ detail.label }}</div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>
```

#### 2.4 Application Process
**Original Features:**
- 4 numbered circles with different colors
- Each step: number circle, title, description
- Bottom CTA banner: "Profesyonel Uygulama Dahil"

**Implementation:**
```html
<section class="py-16 bg-white">
  <h2>Uygulama Süreci</h2>
  <div class="grid md:grid-cols-4 gap-6">
    {% for step in product.applicationSteps %}
    <div class="text-center">
      <div class="w-20 h-20 bg-{{ step.color }}-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="text-3xl font-bold text-{{ step.color }}-700">{{ loop.index }}</span>
      </div>
      <h3>{{ step.title }}</h3>
      <p>{{ step.description }}</p>
    </div>
    {% endfor %}
  </div>

  <!-- CTA Banner -->
  <div class="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
    <h3>Profesyonel Uygulama Dahil</h3>
    <p>Tüm siparişler sertifikalı ekibimiz tarafından yapılır.</p>
    <button class="btn-primary">Ücretsiz Keşif Randevusu Al</button>
  </div>
</section>
```

#### 2.5 Case Study Section
**Original Features:**
- Dark background `bg-gray-900`
- 2-column layout
- 4 glass stat cards with colored values
- Blockquote with green border
- Image on right

**Implementation:**
```html
<section class="py-16 bg-gray-900 text-white">
  <div class="grid md:grid-cols-2 gap-12 items-center">
    <div>
      <div class="text-green-400 font-semibold">BAŞARI HİKAYESİ</div>
      <h2>{{ product.caseStudy.title }}</h2>
      <p>{{ product.caseStudy.description }}</p>

      <div class="grid grid-cols-2 gap-6">
        {% for stat in product.caseStudy.stats %}
        <div class="bg-white/10 backdrop-blur rounded-xl p-6">
          <div class="text-4xl font-bold text-{{ stat.color }}-400">{{ stat.value }}</div>
          <div class="text-gray-300">{{ stat.label }}</div>
        </div>
        {% endfor %}
      </div>

      <blockquote class="border-l-4 border-green-400 pl-6 italic">
        "{{ product.caseStudy.quote }}"
      </blockquote>
      <div>— {{ product.caseStudy.author }}</div>
    </div>

    <div>
      <img src="{{ product.caseStudy.image }}" class="rounded-2xl shadow-2xl">
    </div>
  </div>
</section>
```

#### 2.6 FAQ Section
**Original Features:**
- Collapsible `<details>` elements
- Gray background cards with hover effect

**Implementation:**
```html
<section class="py-16 bg-white">
  <h2>Sıkça Sorulan Sorular</h2>
  <div class="space-y-4">
    {% for faq in product.faqs %}
    <details class="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
      <summary class="font-bold text-gray-900 cursor-pointer">
        {{ faq.question }}
      </summary>
      <p class="mt-4 text-gray-700">{{ faq.answer }}</p>
    </details>
    {% endfor %}
  </div>
</section>
```

#### 2.7 Related Products Section (NEW)
**Original Features:**
- 2 product cards with gradient headers
- Price and "Detayları Gör →" links
- Hover-lift effect

**Implementation:**
```html
<section class="py-16 bg-gray-50">
  <h2>Diğer Ürünlerimiz</h2>
  <div class="grid md:grid-cols-2 gap-8">
    {% for related in product.relatedProducts %}
    <a href="{{ related.url }}" class="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift">
      <div class="h-48 bg-gradient-to-br from-{{ related.color }}-500 to-{{ related.color }}-700 flex items-center justify-center">
        <div class="text-white text-6xl">{{ related.icon }}</div>
      </div>
      <div class="p-8">
        <h3>{{ related.name }}</h3>
        <p>{{ related.description }}</p>
        <div class="flex justify-between items-center">
          <div class="text-2xl font-bold text-blue-700">{{ related.price }}</div>
          <span class="text-blue-700 font-semibold">Detayları Gör →</span>
        </div>
      </div>
    </a>
    {% endfor %}
  </div>
</section>
```

#### 2.8 Final CTA Section
**Original Features:**
- Full gradient background (`gradient-bg`)
- Two buttons

**Implementation:**
```html
<section class="py-16 gradient-bg">
  <div class="text-center text-white">
    <h2>{{ product.name }} ile Verimliliği Artırın</h2>
    <p>Profesyonel uygulama ve 5 yıl garanti...</p>
    <div class="flex flex-wrap justify-center gap-4">
      <button class="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold">
        Hemen Sipariş Ver
      </button>
      <button class="border-2 border-white text-white px-8 py-4 rounded-lg font-bold">
        Ücretsiz Teklif Al
      </button>
    </div>
  </div>
</section>
```

---

## Priority 3: HIGH - Update Product Data Structure

### Current Structure (ssr-pro.md)
```yaml
product:
  name: "MATERIX SSR Pro"
  code: "SSR-PRO"
  category: "Güneş Paneli Kaplamaları"
  # ... basic fields
features:
  - "Feature 1"
  - "Feature 2"
benefits:
  - title: "Benefit"
    description: "..."
```

### Required Structure
```yaml
product:
  name: "MATERIX SSR Pro"
  code: "SSR-PRO"
  badge: "En Popüler Seçim"
  price: "₺ 850"
  priceUnit: "/ m²"
  priceNote: "* Minimum 50 m² uygulama için geçerlidir"
  roi: "2.3 Yıl"
  roiNote: "10 yıl kullanım süresi"
  stats:
    installations: "2.5K+"
    rating: "4.9/5"

  highlights:
    - "%6-8 Verim Artışı"
    - "5 Yıl Garanti"
    - "Profesyonel Uygulama"

  keyBenefits:
    - title: "Maksimum Verim"
      description: "%6-8 verim artışı..."
      color: "blue"
      icon: "<svg>...</svg>"
    - title: "Uzun Ömürlü Koruma"
      description: "5 yıl garanti..."
      color: "green"
      icon: "<svg>...</svg>"
    - title: "Maliyet Tasarrufu"
      description: "Temizlik maliyetlerinde..."
      color: "purple"
      icon: "<svg>...</svg>"

  performanceSpecs:
    - label: "Verim Artışı"
      value: "%6-8"
      color: "blue"
    - label: "Kir İtme Özelliği"
      value: "%99.5"
      color: "green"
    # ... etc

  durabilitySpecs:
    - label: "Garanti Süresi"
      value: "5 Yıl"
      color: "blue"
    # ... etc

  applicationDetails:
    - value: "50 m²"
      label: "Minimum Alan"
      color: "blue"
    - value: "24-48h"
      label: "Kuruma Süresi"
      color: "green"
    - value: "0.8-1.2 L"
      label: "Tüketim / 100m²"
      color: "purple"
    - value: "1 Gün"
      label: "Uygulama / 1000m²"
      color: "orange"

  applicationSteps:
    - title: "Yüzey Temizliği"
      description: "Panel yüzeyleri özel temizlik solüsyonları ile..."
      color: "blue"
    - title: "Yüzey Hazırlığı"
      description: "Primer uygulaması ile..."
      color: "green"
    - title: "Nano Kaplama"
      description: "MATERIX SSR Pro profesyonel ekipmanla..."
      color: "purple"
    - title: "Kontrol & Test"
      description: "Uygulama kalitesi test edilir..."
      color: "orange"

  caseStudy:
    title: "İzmir GES: 500 kWp Santral"
    description: "2022 yılında devreye alınan..."
    image: "https://images.unsplash.com/..."
    stats:
      - value: "+6.8%"
        label: "Ortalama Verim Artışı"
        color: "green"
      - value: "₺185K"
        label: "Yıllık Ek Gelir"
        color: "blue"
      - value: "%72"
        label: "Temizlik Maliyet Azalması"
        color: "purple"
      - value: "2.1 yıl"
        label: "Geri Ödeme Süresi"
        color: "orange"
    quote: "MATERIX SSR Pro uygulaması sonrası..."
    author: "Mehmet Kaya, Tesis Müdürü"

  faqs:
    - question: "MATERIX SSR Pro'yu kendim uygulayabilir miyim?"
      answer: "Hayır, MATERIX SSR Pro profesyonel uygulama..."
    # ... etc

  relatedProducts:
    - name: "MATERIX SSR Standard"
      url: "/tr/urunlerimiz/ssr-standard/"
      description: "Konut ve küçük işletmeler için ekonomik çözüm"
      price: "₺ 550 / m²"
      color: "green"
      icon: "⚡"
    - name: "MATERIX SSR Industrial"
      url: "/tr/urunlerimiz/ssr-industrial/"
      description: "Büyük ölçekli GES projeleri için özel formülasyon"
      price: "Özel Teklif"
      color: "purple"
      icon: "🏭"
```

---

## Priority 4: MEDIUM - Fix Navigation and Footer

### Navigation Issues
- Product dropdown items empty
- Nav link texts empty
- Mobile menu items empty

### Footer Issues
- Section titles empty
- Link texts empty
- CTA section texts empty

### Fix
These will be automatically fixed once translations are working (Priority 1).

---

## Implementation Order

### Phase 1: Fix Translations (Day 1)
1. Debug why translations not loading
2. Fix `eleventy.config.js` or data files
3. Verify all text appears on site

### Phase 2: Create SSR Template (Day 2-3)
1. Create `product-ssr.njk` template
2. Implement all sections as specified above
3. Add CSS classes for hover-lift, gradient-bg, glass effects

### Phase 3: Update Product Data (Day 3)
1. Restructure `ssr-pro.md` frontmatter with rich data
2. Update `ssr-standard.md` with same structure
3. Update `ssr-industrial.md` with same structure
4. Create English versions

### Phase 4: Testing & Refinement (Day 4)
1. Test all pages on local
2. Fix any styling issues
3. Responsive testing
4. Commit and push to Netlify

---

## Files to Create/Modify

### New Files
- `src/_includes/layouts/product-ssr.njk` - New rich template

### Modified Files
- `eleventy.config.js` - Fix translations
- `src/content/tr/products/ssr-pro.md` - Rich frontmatter
- `src/content/tr/products/ssr-standard.md` - Rich frontmatter
- `src/content/tr/products/ssr-industrial.md` - Rich frontmatter
- `src/content/en/products/ssr-pro.md` - Rich frontmatter (English)
- `src/content/en/products/ssr-standard.md` - Rich frontmatter (English)
- `src/content/en/products/ssr-industrial.md` - Rich frontmatter (English)
- `src/assets/css/styles.css` - Ensure all utility classes present

---

## Success Criteria

- [ ] All navigation items show text
- [ ] All footer items show text
- [ ] Hero section matches mockup (light gradient, price card, ROI badge)
- [ ] Benefits section has 3 colored gradient cards
- [ ] Tech specs show in styled cards with colored values
- [ ] Application process shows numbered colored circles
- [ ] Case study has dark background with glass stat cards
- [ ] FAQ is collapsible accordion
- [ ] Related products section present
- [ ] Final CTA has full gradient and 2 buttons
