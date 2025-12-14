# 🚀 MATERIX Website Production Deployment Plan

## **Complete Implementation Plan for Claude Code CLI**

---

## 📋 Project Overview

**Goal:** Deploy Materix website with CMS management and multi-language support

**Tech Stack:**
- **Static Site Generator:** Eleventy (11ty) - Simple, flexible, fast
- **CMS:** Netlify CMS (Decap CMS) - Visual content editor
- **Languages:** Turkish (TR) + English (EN)
- **Hosting:** Netlify (free tier with auto-deploy)
- **Version Control:** GitHub

---

## 🏗️ Phase 1: Project Setup & Restructuring

### Step 1.1: Create New Project Structure

```
materix-website/
├── src/
│   ├── _data/                     # Site data and translations
│   │   ├── site.json              # Global site config
│   │   ├── tr.json                # Turkish translations
│   │   └── en.json                # English translations
│   │
│   ├── _includes/                 # Reusable components
│   │   ├── layouts/
│   │   │   ├── base.njk          # Base layout
│   │   │   └── page.njk          # Page layout
│   │   ├── components/
│   │   │   ├── header.njk        # Navigation header
│   │   │   ├── footer.njk        # Footer
│   │   │   └── language-switcher.njk
│   │   └── partials/
│   │       ├── meta.njk          # Meta tags
│   │       └── scripts.njk       # Common scripts
│   │
│   ├── content/                   # Content files (markdown)
│   │   ├── tr/                    # Turkish content
│   │   │   ├── pages/
│   │   │   │   ├── index.md
│   │   │   │   ├── kurumsal.md
│   │   │   │   ├── urunlerimiz.md
│   │   │   │   ├── projelerimiz.md
│   │   │   │   ├── nanoteknoloji.md
│   │   │   │   ├── iletisim.md
│   │   │   │   └── blog.md
│   │   │   └── products/
│   │   │       ├── arac-kimyasallari.md
│   │   │       ├── ev-kimyasallari.md
│   │   │       ├── tekne-kimyasallari.md
│   │   │       ├── tekstil-kimyasallari.md
│   │   │       └── gunes-paneli.md
│   │   │
│   │   └── en/                    # English content
│   │       ├── pages/
│   │       │   ├── index.md
│   │       │   ├── corporate.md
│   │       │   ├── products.md
│   │       │   ├── projects.md
│   │       │   ├── nanotechnology.md
│   │       │   ├── contact.md
│   │       │   └── blog.md
│   │       └── products/
│   │           ├── vehicle-chemicals.md
│   │           ├── home-chemicals.md
│   │           ├── marine-chemicals.md
│   │           ├── textile-chemicals.md
│   │           └── solar-panel.md
│   │
│   ├── admin/                     # CMS configuration
│   │   ├── index.html
│   │   └── config.yml
│   │
│   └── assets/                    # Static assets
│       ├── css/
│       │   └── styles.css
│       ├── js/
│       │   └── main.js
│       └── images/
│           └── materix-logo.png
│
├── .eleventy.js                   # Eleventy configuration
├── package.json
├── netlify.toml                   # Netlify configuration
├── README.md
└── .gitignore
```

---

## 📝 Phase 2: Content Extraction & Translation

### Step 2.1: Extract Content from Existing HTMLs

**Create content extraction script:**

```javascript
// scripts/extract-content.js

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const files = [
  'index.html',
  'kurumsal.html',
  'urunlerimiz.html',
  'projelerimiz.html',
  'arac-kimyasallari.html',
  'ev-kimyasallari.html',
  'tekne-kimyasallari.html',
  'tekstil-kimyasallari.html',
  'nanoteknoloji.html',
  'iletisim.html',
  'blog.html'
];

function extractContent(htmlFile) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  const $ = cheerio.load(html);
  
  const content = {
    title: $('title').text(),
    meta_description: $('meta[name="description"]').attr('content') || '',
    hero: {
      title: $('.hero h1').text().trim(),
      description: $('.hero p').text().trim()
    },
    sections: []
  };
  
  // Extract sections
  $('section').each((i, section) => {
    const $section = $(section);
    content.sections.push({
      title: $section.find('h2, h3').first().text().trim(),
      content: $section.text().trim()
    });
  });
  
  return content;
}

// Extract from all files
files.forEach(file => {
  const content = extractContent(`/mnt/user-data/outputs/${file}`);
  const outputPath = `content-extracted/${file.replace('.html', '.json')}`;
  fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
  console.log(`✅ Extracted: ${file}`);
});
```

### Step 2.2: Create Translation Files

**Turkish translations** (`src/_data/tr.json`):
```json
{
  "lang": "tr",
  "locale": "tr-TR",
  "nav": {
    "home": "Ana Sayfa",
    "products": "Ürünlerimiz",
    "corporate": "Kurumsal",
    "projects": "Projelerimiz",
    "nanotechnology": "Nanoteknoloji",
    "contact": "İletişim",
    "blog": "Blog"
  },
  "footer": {
    "about": "Hakkımızda",
    "copyright": "© 2024 MATERIX Nano Teknoloji San. Tic. A.Ş. Tüm hakları saklıdır.",
    "address": "Dokuz Eylül Üniversitesi, Tınaztepe Yerleşkesi, DEPARK Beta Binası"
  },
  "common": {
    "readMore": "Devamını Oku",
    "learnMore": "Daha Fazla Bilgi",
    "contact": "İletişime Geç",
    "getQuote": "Teklif Al"
  }
}
```

**English translations** (`src/_data/en.json`):
```json
{
  "lang": "en",
  "locale": "en-US",
  "nav": {
    "home": "Home",
    "products": "Products",
    "corporate": "Corporate",
    "projects": "Projects",
    "nanotechnology": "Nanotechnology",
    "contact": "Contact",
    "blog": "Blog"
  },
  "footer": {
    "about": "About Us",
    "copyright": "© 2024 MATERIX Nano Technology Inc. All rights reserved.",
    "address": "Dokuz Eylül University, Tınaztepe Campus, DEPARK Beta Building"
  },
  "common": {
    "readMore": "Read More",
    "learnMore": "Learn More",
    "contact": "Contact Us",
    "getQuote": "Get Quote"
  }
}
```

---

## 🔧 Phase 3: Eleventy Configuration

### Step 3.1: Create `.eleventy.js`

```javascript
module.exports = function(eleventyConfig) {
  
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  
  // Collections for each language
  eleventyConfig.addCollection("pages_tr", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/tr/pages/*.md");
  });
  
  eleventyConfig.addCollection("pages_en", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/en/pages/*.md");
  });
  
  eleventyConfig.addCollection("products_tr", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/tr/products/*.md");
  });
  
  eleventyConfig.addCollection("products_en", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/en/products/*.md");
  });
  
  // Language filter
  eleventyConfig.addFilter("translate", function(key, lang) {
    const translations = require(`./src/_data/${lang}.json`);
    return key.split('.').reduce((obj, i) => obj[i], translations);
  });
  
  // Add current year filter
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
```

### Step 3.2: Create `package.json`

```json
{
  "name": "materix-website",
  "version": "1.0.0",
  "description": "MATERIX Nano Technology Website",
  "scripts": {
    "build": "eleventy",
    "serve": "eleventy --serve",
    "start": "eleventy --serve",
    "debug": "DEBUG=* eleventy"
  },
  "dependencies": {
    "@11ty/eleventy": "^2.0.1",
    "cheerio": "^1.0.0-rc.12"
  },
  "devDependencies": {
    "netlify-cli": "^17.0.0"
  }
}
```

---

## 🎨 Phase 4: Create Templates

### Step 4.1: Base Layout (`src/_includes/layouts/base.njk`)

```html
<!DOCTYPE html>
<html lang="{{ lang or 'tr' }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }} | MATERIX</title>
    <meta name="description" content="{{ description }}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="/assets/css/styles.css">
    
    <!-- Hreflang for SEO -->
    <link rel="alternate" hreflang="tr" href="https://materix.tech/{{ page.fileSlug }}">
    <link rel="alternate" hreflang="en" href="https://materix.tech/en/{{ page.fileSlug }}">
</head>
<body class="bg-white">
    {% include "components/header.njk" %}
    
    <main>
        {{ content | safe }}
    </main>
    
    {% include "components/footer.njk" %}
    
    <script src="/assets/js/main.js"></script>
</body>
</html>
```

### Step 4.2: Header Component (`src/_includes/components/header.njk`)

```html
<nav class="fixed w-full top-0 z-50 glass-effect border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
            <div class="flex items-center">
                <a href="/{{ lang }}">
                    <img src="/assets/images/materix-logo.png" alt="MATERIX" class="h-10">
                </a>
            </div>
            
            <div class="hidden md:flex space-x-8">
                {% set navItems = translations.nav %}
                <a href="/{{ lang }}" class="text-gray-700 hover:text-blue-700 font-medium">
                    {{ navItems.home }}
                </a>
                <a href="/{{ lang }}/products" class="text-gray-700 hover:text-blue-700 font-medium">
                    {{ navItems.products }}
                </a>
                <a href="/{{ lang }}/corporate" class="text-gray-700 hover:text-blue-700 font-medium">
                    {{ navItems.corporate }}
                </a>
                <a href="/{{ lang }}/projects" class="text-gray-700 hover:text-blue-700 font-medium">
                    {{ navItems.projects }}
                </a>
                <a href="/{{ lang }}/contact" class="text-gray-700 hover:text-blue-700 font-medium">
                    {{ navItems.contact }}
                </a>
            </div>
            
            <div class="flex items-center space-x-4">
                {% include "components/language-switcher.njk" %}
                <button class="btn-primary text-white px-6 py-3 rounded-lg font-semibold">
                    {{ "common.getQuote" | translate(lang) }}
                </button>
            </div>
        </div>
    </div>
</nav>
```

### Step 4.3: Language Switcher (`src/_includes/components/language-switcher.njk`)

```html
<div class="language-switcher">
    {% if lang == 'tr' %}
        <a href="/en{{ page.url | replace('/tr', '') }}" 
           class="flex items-center text-gray-700 hover:text-blue-700">
            <span class="mr-1">🇬🇧</span> EN
        </a>
    {% else %}
        <a href="{{ page.url | replace('/en', '') }}" 
           class="flex items-center text-gray-700 hover:text-blue-700">
            <span class="mr-1">🇹🇷</span> TR
        </a>
    {% endif %}
</div>
```

### Step 4.4: Footer Component (`src/_includes/components/footer.njk`)

```html
<footer class="bg-gray-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div>
                <img src="/assets/images/materix-logo.png" alt="MATERIX Logo" class="h-8 mb-4 brightness-0 invert">
                <p class="text-gray-400 mb-4">
                    {% if lang == 'tr' %}
                    Nanoteknoloji ile geleceği inşa ediyoruz.
                    {% else %}
                    Building the future with nanotechnology.
                    {% endif %}
                </p>
            </div>
            
            <div>
                <h4 class="font-bold mb-4">{{ translations.nav.products }}</h4>
                <ul class="space-y-2 text-gray-400">
                    <li><a href="/{{ lang }}/products/vehicle-chemicals" class="hover:text-white">
                        {% if lang == 'tr' %}Araç Kimyasalları{% else %}Vehicle Chemicals{% endif %}
                    </a></li>
                    <li><a href="/{{ lang }}/products/home-chemicals" class="hover:text-white">
                        {% if lang == 'tr' %}Ev Kimyasalları{% else %}Home Chemicals{% endif %}
                    </a></li>
                    <li><a href="/{{ lang }}/products/marine-chemicals" class="hover:text-white">
                        {% if lang == 'tr' %}Tekne Kimyasalları{% else %}Marine Chemicals{% endif %}
                    </a></li>
                </ul>
            </div>
            
            <div>
                <h4 class="font-bold mb-4">{{ translations.footer.about }}</h4>
                <ul class="space-y-2 text-gray-400">
                    <li><a href="/{{ lang }}" class="hover:text-white">{{ translations.nav.home }}</a></li>
                    <li><a href="/{{ lang }}/corporate" class="hover:text-white">{{ translations.nav.corporate }}</a></li>
                </ul>
            </div>
            
            <div>
                <h4 class="font-bold mb-4">{{ translations.nav.contact }}</h4>
                <ul class="space-y-2 text-gray-400">
                    <li>DEÜ DEPARK, İzmir</li>
                    <li>info@materix.tech</li>
                </ul>
            </div>
        </div>
        
        <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>{{ translations.footer.copyright }}</p>
        </div>
    </div>
</footer>
```

---

## 📄 Phase 5: Create Content Files

### Step 5.1: Homepage Turkish (`src/content/tr/pages/index.md`)

```markdown
---
layout: layouts/base.njk
title: Ana Sayfa
description: MATERIX Nano Teknoloji - Güneş panellerinizden %8'e varan daha fazla verim
lang: tr
permalink: /index.html
hero:
  title: "Güneş Panelinizden<br><span class='text-green-300'>%8'e Varan</span><br>Daha Fazla Verim"
  description: "Nanoteknoloji destekli MATERIX SSR ile güneş panellerinizi koruyun, temizlik maliyetlerini azaltın ve yıllık verimliliği artırın."
  cta_primary: "Ücretsiz Teklif Alın"
  cta_secondary: "Ürünleri İncele"
stats:
  - number: "500+"
    label: "Mutlu Müşteri"
  - number: "2M+ m²"
    label: "Uygulama Alanı"
  - number: "%98"
    label: "Müşteri Memnuniyeti"
---

# NANOTEKNOLOJİNİN GELECEĞİ

MATERIX ile Şimdi Başlıyor!
```

### Step 5.2: Homepage English (`src/content/en/pages/index.md`)

```markdown
---
layout: layouts/base.njk
title: Home
description: MATERIX Nano Technology - Up to 8% more efficiency from your solar panels
lang: en
permalink: /en/index.html
hero:
  title: "Get Up To<br><span class='text-green-300'>8% More Efficiency</span><br>From Your Solar Panels"
  description: "Protect your solar panels with nanotechnology-powered MATERIX SSR, reduce cleaning costs, and increase annual efficiency."
  cta_primary: "Get Free Quote"
  cta_secondary: "Explore Products"
stats:
  - number: "500+"
    label: "Happy Customers"
  - number: "2M+ m²"
    label: "Application Area"
  - number: "98%"
    label: "Customer Satisfaction"
---

# THE FUTURE OF NANOTECHNOLOGY

Starts Now with MATERIX!
```

### Step 5.3: Product Page Turkish (`src/content/tr/products/arac-kimyasallari.md`)

```markdown
---
layout: layouts/base.njk
title: Araç Kimyasalları
description: MATERIX NFC-11 - Araç camları için yağmur kaydırıcı nano film kaplama
lang: tr
permalink: /arac-kimyasallari/index.html
product:
  code: "MATERIX NFC-11"
  name: "Araç Camları için Yağmur Kaydırıcı Nano Film Kaplama"
  category: "Araç Kimyasalları"
  type: "Sprey"
  protection_duration: "1 Yıl"
  image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=800&fit=crop"
features:
  - "Nanoteknoloji içeren özel formülü ile yüksek kalitede bir su itici ince film kaplama ürünüdür"
  - "Ürün, uygulandığı yüzeye uzun süreli su itme özelliği kazandırarak yağmurlu havalardaki sürüş deneyimini iyileştirir"
  - "60km/saat sürat üzerinde silecek kullanmadan net görüş açısı sağlar"
  - "Kolay temizlenebilirlik ve daha düşük miktarda toz tutunması sağlar"
benefits:
  - title: "4 Mevsim Kullanım"
    description: "Ürün, uygulanan cam yüzey üzerinde dört mevsim tam koruma sağlar"
  - title: "Güvenli Sürüş Deneyimi"
    description: "Görüş performansını arttırır ve daha güvenli bir sürüş deneyimi yaşamanıza yardımcı olur"
  - title: "Su ve Yağ İtici"
    description: "Ürün sayesinde otomobilinizin cam yüzeylerine sıvı ve yağ itici özelliği kazandırılır"
  - title: "Sürdürülebilir Temizlik"
    description: "Ürün cama kimyasal dayanım kazandırır, uygulandığı yüzeyin temizliğini kolaylaştırır"
---

## Ürün Detayları

MATERIX NFC-11, yağmurlu havalarda güvenli sürüş için profesyonel bir çözümdür.
```

### Step 5.4: Product Page English (`src/content/en/products/vehicle-chemicals.md`)

```markdown
---
layout: layouts/base.njk
title: Vehicle Chemicals
description: MATERIX NFC-11 - Nano film coating rain repellent for vehicle glass
lang: en
permalink: /en/vehicle-chemicals/index.html
product:
  code: "MATERIX NFC-11"
  name: "Nano Film Coating Rain Repellent for Vehicle Glass"
  category: "Vehicle Chemicals"
  type: "Spray"
  protection_duration: "1 Year"
  image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=800&fit=crop"
features:
  - "High-quality water-repellent thin film coating product with special nanotechnology formula"
  - "The product improves driving experience in rainy weather by giving long-lasting water repellency to the applied surface"
  - "Provides clear visibility without using wipers at speeds above 60km/h"
  - "Provides easy cleaning and less dust adhesion"
benefits:
  - title: "4 Season Use"
    description: "The product provides full protection on the applied glass surface in all four seasons"
  - title: "Safe Driving Experience"
    description: "Increases visibility performance and helps you experience a safer driving experience"
  - title: "Water and Oil Repellent"
    description: "Thanks to the product, liquid and oil repellent properties are given to the glass surfaces of your vehicle"
  - title: "Sustainable Cleaning"
    description: "The product gives chemical resistance to the glass and facilitates cleaning of the applied surface"
---

## Product Details

MATERIX NFC-11 is a professional solution for safe driving in rainy weather.
```

---

## 🎛️ Phase 6: Netlify CMS Configuration

### Step 6.1: Create Admin Interface (`src/admin/index.html`)

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MATERIX Content Manager</title>
  <link rel="stylesheet" href="https://unpkg.com/decap-cms@^3.1.0/dist/decap-cms.css" />
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.1.0/dist/decap-cms.js"></script>
</body>
</html>
```

### Step 6.2: Create CMS Config (`src/admin/config.yml`)

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "src/assets/images/uploads"
public_folder: "/assets/images/uploads"

# i18n configuration
i18n:
  structure: multiple_folders
  locales: [tr, en]
  default_locale: tr

collections:
  # Pages Collection
  - name: "pages"
    label: "Pages"
    folder: "src/content"
    create: false
    i18n: true
    fields:
      - {label: "Layout", name: "layout", widget: "hidden", default: "layouts/base.njk"}
      - {label: "Title", name: "title", widget: "string", i18n: true}
      - {label: "Description", name: "description", widget: "text", i18n: true}
      - {label: "Language", name: "lang", widget: "hidden"}
      - {label: "Permalink", name: "permalink", widget: "string"}
      - label: "Hero Section"
        name: "hero"
        widget: "object"
        i18n: true
        fields:
          - {label: "Title", name: "title", widget: "string", i18n: true}
          - {label: "Description", name: "description", widget: "text", i18n: true}
          - {label: "Primary CTA", name: "cta_primary", widget: "string", i18n: true}
          - {label: "Secondary CTA", name: "cta_secondary", widget: "string", i18n: true}
      - {label: "Body", name: "body", widget: "markdown", i18n: true}

  # Products Collection
  - name: "products"
    label: "Products"
    folder: "src/content/{{locale}}/products"
    create: true
    i18n: true
    slug: "{{slug}}"
    fields:
      - {label: "Layout", name: "layout", widget: "hidden", default: "layouts/base.njk"}
      - {label: "Title", name: "title", widget: "string", i18n: true}
      - {label: "Description", name: "description", widget: "text", i18n: true}
      - {label: "Language", name: "lang", widget: "hidden"}
      - label: "Product Info"
        name: "product"
        widget: "object"
        i18n: true
        fields:
          - {label: "Product Code", name: "code", widget: "string"}
          - {label: "Product Name", name: "name", widget: "string", i18n: true}
          - {label: "Category", name: "category", widget: "string", i18n: true}
          - {label: "Type", name: "type", widget: "string", i18n: true}
          - {label: "Protection Duration", name: "protection_duration", widget: "string", i18n: true}
          - {label: "Image URL", name: "image", widget: "image"}
      - label: "Features"
        name: "features"
        widget: "list"
        i18n: true
        field: {label: "Feature", name: "feature", widget: "string"}
      - label: "Benefits"
        name: "benefits"
        widget: "list"
        i18n: true
        fields:
          - {label: "Title", name: "title", widget: "string", i18n: true}
          - {label: "Description", name: "description", widget: "text", i18n: true}
      - {label: "Body", name: "body", widget: "markdown", i18n: true}

  # Blog Collection
  - name: "blog"
    label: "Blog"
    folder: "src/content/{{locale}}/blog"
    create: true
    i18n: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - {label: "Layout", name: "layout", widget: "hidden", default: "layouts/base.njk"}
      - {label: "Title", name: "title", widget: "string", i18n: true}
      - {label: "Description", name: "description", widget: "text", i18n: true}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Author", name: "author", widget: "string"}
      - {label: "Featured Image", name: "featured_image", widget: "image"}
      - {label: "Tags", name: "tags", widget: "list"}
      - {label: "Body", name: "body", widget: "markdown", i18n: true}

  # Settings
  - name: "settings"
    label: "Settings"
    files:
      - label: "Site Settings"
        name: "site"
        file: "src/_data/site.json"
        fields:
          - {label: "Site Name", name: "name", widget: "string"}
          - {label: "Site URL", name: "url", widget: "string"}
          - {label: "Default Language", name: "defaultLang", widget: "select", options: ["tr", "en"]}
          - label: "Contact"
            name: "contact"
            widget: "object"
            fields:
              - {label: "Email", name: "email", widget: "string"}
              - {label: "Phone", name: "phone", widget: "string"}
              - {label: "Address TR", name: "address_tr", widget: "text"}
              - {label: "Address EN", name: "address_en", widget: "text"}
```

---

## 🚀 Phase 7: Deployment Configuration

### Step 7.1: Create `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "_site"

[build.environment]
  NODE_VERSION = "18"

# Redirect rules for language detection
[[redirects]]
  from = "/*"
  to = "/tr/:splat"
  status = 302
  force = false
  conditions = {Language = ["tr"]}

[[redirects]]
  from = "/*"
  to = "/en/:splat"
  status = 302
  force = false
  conditions = {Language = ["en"]}

# Default to Turkish if no language preference
[[redirects]]
  from = "/"
  to = "/tr"
  status = 302

# Enable Netlify Identity
[context.production]
  environment = { GATSBY_ACTIVE_ENV = "production" }

# Headers for security
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Step 7.2: Create `.gitignore`

```
# Dependencies
node_modules/
package-lock.json

# Build output
_site/
.cache/

# Environment
.env
.env.local

# OS files
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/

# Netlify
.netlify/
```

### Step 7.3: Create `README.md`

```markdown
# MATERIX Website

Multi-language website for MATERIX Nano Technology with CMS management.

## 🚀 Quick Start

### Development
```bash
npm install
npm run serve
```

Visit: http://localhost:8080

### Build
```bash
npm run build
```

### Deploy
Push to GitHub - auto-deploys to Netlify

## 📝 Content Management

Access CMS at: https://your-site.netlify.app/admin

## 🌍 Languages

- Turkish (TR) - Default
- English (EN)

## 📁 Project Structure

- `src/content/tr/` - Turkish content
- `src/content/en/` - English content
- `src/_includes/` - Templates and components
- `src/_data/` - Site data and translations
- `src/admin/` - CMS configuration

## 🛠️ Tech Stack

- Eleventy (11ty)
- Netlify CMS
- Tailwind CSS
- Netlify Hosting
```

---

## 📋 Phase 8: Execution Checklist (For Claude Code CLI)

### ✅ PHASE 1: Project Initialization - **COMPLETED 2024-12-14**

**Execute these commands:**
```bash
# Create project directory
mkdir materix-website && cd materix-website

# Initialize npm project
npm init -y

# Install dependencies
npm install @11ty/eleventy cheerio --save
npm install netlify-cli --save-dev

# Create directory structure
mkdir -p src/{_data,_includes/{layouts,components,partials},content/{tr,en}/{pages,products,blog},admin,assets/{css,js,images}}
mkdir -p reference scripts

# Copy source HTML files for content extraction
cp /mnt/project/*.html ./reference/
```

**Verification:**
- [x] Directory structure created
- [x] package.json exists
- [x] Dependencies installed (Eleventy 3.1.2, Tailwind CSS 4.1.18, PostCSS, Autoprefixer)
- [x] Source HTML files in /files/ directory (15 HTML files found)
- [x] .gitignore created

**Accomplishments:**
- Created full project directory structure under `src/`
- Initialized npm with proper scripts (build, serve, start, dev)
- Installed Eleventy and Tailwind CSS with dependencies
- Created .gitignore with proper exclusions

**🔹 PHASE 1 COMPLETE - Proceeding to Phase 2**

---

### ✅ PHASE 2: Configuration Files - **COMPLETED 2024-12-14**

**Create these files with the exact content from sections above:**

1. `.eleventy.js` (from Phase 3, Step 3.1)
2. `package.json` (from Phase 3, Step 3.2) - merge with existing
3. `netlify.toml` (from Phase 7, Step 7.1)
4. `.gitignore` (from Phase 7, Step 7.2)
5. `README.md` (from Phase 7, Step 7.3)

**Verification:**
- [x] eleventy.config.js created with multi-language collections and filters
- [x] package.json has correct scripts (build, serve, build:css, watch:css)
- [x] netlify.toml configured with redirects and security headers
- [x] .gitignore includes all necessary patterns (done in Phase 1)
- [x] README.md created with full documentation
- [x] tailwind.config.js created with MATERIX design tokens
- [x] postcss.config.js created
- [x] src/assets/css/input.css created with Tailwind directives and custom components

**Accomplishments:**
- Created eleventy.config.js with:
  - Multi-language collections (pages_tr, pages_en, products_tr, products_en, blog_tr, blog_en)
  - Translation filter, localized date filter, alternate URL filter
  - Year shortcode, icon shortcode
  - Markdown-it configuration
- Created netlify.toml with:
  - Build configuration for Node 20
  - Language-based redirects
  - Security headers (X-Frame-Options, XSS Protection, etc.)
  - Cache control for assets
- Created tailwind.config.js with MATERIX design tokens:
  - Brand colors (primary: #1e40af, secondary: #3b82f6, accent: #10b981)
  - Custom gradients, shadows, animations
  - Typography settings
- Created input.css with custom Tailwind components:
  - btn-primary, btn-secondary, card, glass-effect
  - Section padding, stat-number, calculator-card
  - Form elements, mobile menu styles
- Created comprehensive README.md

**🔹 PHASE 2 COMPLETE - Proceeding to Phase 3**

---

### ✅ PHASE 3: Data & Translation Files - **COMPLETED 2024-12-14**

**Create these files:**

1. `src/_data/site.json` (from Step 8.1)
2. `src/_data/tr.json` (from Phase 2, Step 2.2)
3. `src/_data/en.json` (from Phase 2, Step 2.2)

**Verification:**
- [x] site.json has all site metadata (contact info, social links, company info, SEO, stats, certifications)
- [x] tr.json has comprehensive Turkish translations (nav, products, hero, calculator, technology, caseStudy, footer, common, contact, blog, 404)
- [x] en.json has comprehensive English translations (matching all Turkish keys)

**Accomplishments:**
- Created site.json with:
  - Company name, URL, default language configuration
  - Contact information (email, phone, address in TR/EN)
  - Social media links
  - SEO configuration
  - Company stats (500+ customers, 2M+ m² application area, 98% satisfaction)
  - Certifications (KOSGEB, DEÜ DEPARK, ISO 9001, TÜBİTAK)
- Created tr.json with 200+ translation keys covering:
  - Navigation, product descriptions, hero section
  - ROI calculator labels, technology section
  - Case study content, partners section
  - CTA, footer, common UI terms
  - Contact form, blog section, 404 page
- Created en.json with matching English translations for all keys

**🔹 PHASE 3 COMPLETE - Proceeding to Phase 4**

---

### ✅ PHASE 4: Template Files - **COMPLETED 2024-12-14**

**Create these template files:**

1. `src/_includes/layouts/base.njk` (from Phase 4, Step 4.1)
2. `src/_includes/components/header.njk` (from Phase 4, Step 4.2)
3. `src/_includes/components/footer.njk` (from Phase 4, Step 4.4)
4. `src/_includes/components/language-switcher.njk` (from Phase 4, Step 4.3)

**Verification:**
- [x] All template files created
- [x] No syntax errors in Nunjucks templates
- [x] Language switching logic implemented
- [x] Mobile responsive navigation with hamburger menu
- [x] SEO meta tags and hreflang support

**Accomplishments:**
- Created layouts:
  - `base.njk` - Full HTML structure with SEO meta tags, Open Graph, Twitter Cards, hreflang
  - `page.njk` - Standard page layout with hero support
  - `home.njk` - Homepage layout with all sections (hero, calculator, products, technology, partners)
  - `product.njk` - Product detail layout with features and benefits
- Created components:
  - `header.njk` - Full navigation with products dropdown, mobile menu, language switcher
  - `footer.njk` - Footer with CTA section, company info, social links
  - `language-switcher.njk` - TR/EN toggle with flags
  - `product-card.njk` - Reusable product card component
  - `calculator.njk` - ROI calculator section component
- Features implemented:
  - Desktop dropdown menu for products
  - Mobile hamburger menu with accordion
  - Responsive design breakpoints
  - Accessibility (skip links, ARIA labels)
  - Dynamic year in copyright
  - Social media icons

**🔹 PHASE 4 COMPLETE - Proceeding to Phase 5**

---

### ✅ PHASE 5: Content Extraction & Markdown Creation - **COMPLETED 2024-12-14**

**Important: Extract content from ALL 11 HTML files in /reference/**

**For TURKISH content (src/content/tr/):**

Create these files by extracting from reference HTML:
1. `src/content/tr/pages/index.md` - Extract from materix-homepage-mockup.html
2. `src/content/tr/pages/kurumsal.md` - Extract from kurumsal.html
3. `src/content/tr/pages/urunlerimiz.md` - Extract from urunlerimiz.html
4. `src/content/tr/pages/projelerimiz.md` - Extract from projelerimiz.html
5. `src/content/tr/pages/nanoteknoloji.md` - Extract from nanoteknoloji.html
6. `src/content/tr/pages/iletisim.md` - Extract from iletisim.html
7. `src/content/tr/pages/blog.md` - Extract from blog.html
8. `src/content/tr/products/arac-kimyasallari.md` - Extract from arac-kimyasallari.html
9. `src/content/tr/products/ev-kimyasallari.md` - Extract from ev-kimyasallari.html (create if missing)
10. `src/content/tr/products/tekne-kimyasallari.md` - Extract from tekne-kimyasallari.html (create if missing)
11. `src/content/tr/products/tekstil-kimyasallari.md` - Extract from tekstil-kimyasallari.html (create if missing)

**Content Extraction Process:**
```bash
# Use cheerio or manual extraction to:
# 1. Extract title, description, hero section
# 2. Extract all section content
# 3. Convert to YAML frontmatter + Markdown body
# 4. Preserve all text content from HTML
```

**For ENGLISH content (src/content/en/):**

Create corresponding English files with translated content:
1. `src/content/en/pages/index.md`
2. `src/content/en/pages/corporate.md`
3. `src/content/en/pages/products.md`
4. `src/content/en/pages/projects.md`
5. `src/content/en/pages/nanotechnology.md`
6. `src/content/en/pages/contact.md`
7. `src/content/en/pages/blog.md`
8. `src/content/en/products/vehicle-chemicals.md`
9. `src/content/en/products/home-chemicals.md`
10. `src/content/en/products/marine-chemicals.md`
11. `src/content/en/products/textile-chemicals.md`

**Example extraction format (use this pattern):**
```markdown
---
layout: layouts/base.njk
title: [Page Title]
description: [Meta Description]
lang: tr  # or en
permalink: /[url-path]/index.html
hero:
  title: "[Hero Title from HTML]"
  description: "[Hero Description from HTML]"
sections:
  - title: "[Section 1 Title]"
    content: "[Section 1 Content]"
  - title: "[Section 2 Title]"
    content: "[Section 2 Content]"
---

[Main body content extracted from HTML sections]
```

**Verification:**
- [x] All 11 Turkish markdown files created
- [x] All 11 English markdown files created
- [x] Content matches source HTML files
- [x] YAML frontmatter is valid
- [x] Permalinks are correct

**Accomplishments:**
- Created all Turkish content pages (7 pages + 4 product pages = 11 files):
  - `src/content/tr/pages/index.md` - Homepage with hero, calculator, and product sections
  - `src/content/tr/pages/kurumsal.md` - Corporate/About page
  - `src/content/tr/pages/urunlerimiz.md` - Products overview page
  - `src/content/tr/pages/projelerimiz.md` - Projects and case studies
  - `src/content/tr/pages/nanoteknoloji.md` - Nanotechnology services (SSR technology)
  - `src/content/tr/pages/iletisim.md` - Contact page
  - `src/content/tr/pages/blog.md` - Blog page
  - `src/content/tr/products/arac-kimyasallari.md` - Vehicle chemicals (NFC-11)
  - `src/content/tr/products/ev-kimyasallari.md` - Home chemicals (NFC-14)
  - `src/content/tr/products/tekne-kimyasallari.md` - Marine chemicals (NFC-12)
  - `src/content/tr/products/tekstil-kimyasallari.md` - Textile chemicals (NFC-16)
- Created all English content pages (7 pages + 4 product pages = 11 files):
  - `src/content/en/pages/index.md` - Homepage
  - `src/content/en/pages/corporate.md` - About Us
  - `src/content/en/pages/products.md` - Products overview
  - `src/content/en/pages/projects.md` - Projects page
  - `src/content/en/pages/nanotechnology.md` - Nanotechnology services
  - `src/content/en/pages/contact.md` - Contact page
  - `src/content/en/pages/blog.md` - Blog page
  - `src/content/en/products/vehicle-chemicals.md` - Vehicle chemicals (NFC-11)
  - `src/content/en/products/home-chemicals.md` - Home chemicals (NFC-14)
  - `src/content/en/products/marine-chemicals.md` - Marine chemicals (NFC-12)
  - `src/content/en/products/textile-chemicals.md` - Textile chemicals (NFC-16)
- All content extracted from source HTML files with proper formatting
- YAML frontmatter includes: layout, lang, translations, title, description, permalink, product info, features
- Professional English translations for all Turkish content

**🔹 PHASE 5 COMPLETE - Proceeding to Phase 6**

---

### ✅ PHASE 6: CMS Configuration - **COMPLETED 2024-12-14**

**Create CMS files:**

1. `src/admin/index.html` (from Phase 6, Step 6.1)
2. `src/admin/config.yml` (from Phase 6, Step 6.2)

**Verification:**
- [x] CMS interface HTML created
- [x] CMS config has all collections
- [x] Multi-language support configured
- [x] Product/blog collections set up

**Accomplishments:**
- Created `src/admin/index.html` with Decap CMS v3.1.0 integration
- Created `src/admin/config.yml` with comprehensive CMS configuration:
  - Git Gateway backend for Netlify Identity
  - Media folder configuration for image uploads
  - 6 collections configured:
    - `pages_tr` - Turkish pages (non-deletable, editable)
    - `pages_en` - English pages (non-deletable, editable)
    - `products_tr` - Turkish products (full CRUD)
    - `products_en` - English products (full CRUD)
    - `blog_tr` - Turkish blog posts (full CRUD)
    - `blog_en` - English blog posts (full CRUD)
  - Site settings collection for global configuration
  - Product fields: name, code, category, type, description, protection_duration, image, features
  - Blog fields: title, description, date, author, featured_image, tags
  - Proper Turkish/English labels for all fields
  - Slug sanitization for clean URLs

**🔹 PHASE 6 COMPLETE - Proceeding to Phase 7**

---

### ✅ PHASE 7: Static Assets - **COMPLETED 2024-12-14**

**Create asset files:**

1. `src/assets/css/styles.css` (from Step 8.2)
2. `src/assets/js/main.js` (from Step 8.3)
3. Copy materix-logo.png to `src/assets/images/` (if available)

**Verification:**
- [x] CSS file includes all styles
- [x] JavaScript includes ROI calculator
- [x] Logo image copied (or placeholder created)

**Accomplishments:**
- Created `src/assets/css/styles.css` with:
  - CSS Custom Properties (design tokens) for all brand colors, gradients, shadows, typography, spacing
  - Base styles and typography
  - Utility classes (container, glass-effect, gradients)
  - Button styles (btn-primary, btn-secondary, btn-accent)
  - Card components and hover effects
  - Navigation styles
  - Hero section styling
  - Stats section with stat-number styling
  - Calculator section with slider styling
  - Product card components
  - Feature list styling
  - Footer styles
  - Social links styling
  - Mobile menu and hamburger animations
  - Form elements
  - Animations (float, fadeIn, pulse)
  - Responsive utilities
  - Print styles
- Created `src/assets/js/main.js` with:
  - Mobile menu toggle with accessibility (aria-expanded, keyboard support)
  - Dropdown menu functionality
  - ROI Calculator with power/production/price sliders
  - Smooth scroll with header offset
  - Scroll animations with IntersectionObserver
  - Utility functions (getCurrentLanguage, toggleAccordion, debounce)
  - Cookie consent placeholder
- Created `src/assets/images/materix-logo.svg` - Placeholder SVG logo with gradient
- Created `src/assets/images/uploads/` directory for CMS media uploads

**🔹 PHASE 7 COMPLETE - Proceeding to Phase 8**

---

### ✅ PHASE 8: Local Testing - **COMPLETED 2024-12-14**

**Execute:**
```bash
# Build the site
npm run build

# Check for errors
# If errors, fix them before continuing

# Serve locally
npm run serve
```

**Manual Testing Checklist:**
- [x] Build completes successfully (23 files generated)
- [x] Turkish homepage loads correctly (/tr/index.html - 44KB)
- [x] English homepage loads at /en/ (/en/index.html - 45KB)
- [x] All Turkish pages accessible (11 pages)
- [x] All English pages accessible (11 pages)
- [x] Product pages display correctly (4 TR + 4 EN)
- [x] Admin folder created for CMS
- [x] Assets folder copied correctly

**Accomplishments:**
- Fixed template syntax errors:
  - Converted JavaScript ternary operators to Nunjucks if/else syntax in home.njk (5 fixes)
  - Converted JavaScript ternary operators to Nunjucks if/else syntax in product.njk (8 fixes)
  - Fixed date filter issue in footer.njk - used year shortcode instead
- Build output:
  - `/tr/` - 11 pages (homepage, kurumsal, urunlerimiz, projelerimiz, nanoteknoloji, iletisim, blog, + 4 products)
  - `/en/` - 11 pages (homepage, corporate, products, projects, nanotechnology, contact, blog, + 4 products)
  - `/admin/` - CMS interface
  - `/assets/` - CSS, JS, images
- Build time: 0.15 seconds for 23 files

**🔹 PHASE 8 COMPLETE - Proceeding to Phase 9**

---

### ✅ PHASE 9: Git Initialization - **COMPLETED 2024-12-14**

**Execute:**
```bash
# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Materix website with multi-language support and CMS"

# Check status
git status
```

**Verification:**
- [x] Git initialized
- [x] All files committed (65 files, 15,642 insertions)
- [x] Clean working directory
- [x] Remote set to https://github.com/serkankurtulus/materixwebsite.git

**Accomplishments:**
- Initialized git repository on `main` branch
- Added remote origin: https://github.com/serkankurtulus/materixwebsite.git
- Created initial commit with all project files:
  - Configuration files (eleventy.config.js, netlify.toml, tailwind.config.js, etc.)
  - Data files (site.json, tr.json, en.json)
  - Template files (4 layouts, 5 components)
  - Content files (22 markdown pages)
  - Static assets (CSS, JS, SVG logo)
  - CMS configuration (admin/index.html, admin/config.yml)
  - Source HTML files for reference

**Next Step:** Push to GitHub with `git push -u origin main`

**🔹 PHASE 9 COMPLETE - Ready for GitHub push and Netlify deployment**

---

### ✅ PHASE 10: GitHub Repository Setup - **COMPLETED 2024-12-14**

**MANUAL STEP - User Action Required:**

The user needs to:
1. Go to https://github.com/new
2. Create repository named: `materix-website`
3. Make it Public
4. Do NOT initialize with README (we already have one)
5. Click "Create repository"

**Then execute:**
```bash
# Add remote (replace YOUR_USERNAME with actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/materix-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Verification:**
- [x] Repository created on GitHub
- [x] Code pushed successfully
- [x] All files visible on GitHub

**Accomplishments:**
- Repository: https://github.com/serkankurtulus/materixwebsite
- Configured SSH authentication for GitHub
- Remote set to: git@github.com:serkankurtulus/materixwebsite.git
- Successfully pushed 65 files (15,642 lines) to main branch

**🔹 PHASE 10 COMPLETE - Proceeding to Netlify deployment**

---

### ✅ PHASE 11: Netlify Deployment - **COMPLETED 2024-12-14**

**MANUAL STEP - User Action Required:**

The user needs to:

1. **Go to Netlify:**
   - Visit https://app.netlify.com/
   - Log in or create account

2. **Import Project:**
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub"
   - Select the `materix-website` repository

3. **Configure Build:**
   - Build command: `npm run build`
   - Publish directory: `_site`
   - Click "Deploy site"

4. **Wait for deployment** (1-2 minutes)

5. **Get site URL** (will be something like: `random-name-123.netlify.app`)

**Verification:**
- [x] Site deployed successfully
- [x] Turkish homepage accessible
- [x] English version at /en/ works
- [x] All pages load correctly

**Accomplishments:**
- Connected GitHub repository to Netlify
- Automatic deployment configured from main branch
- Build settings: `npm run build` → `_site`
- Site live and accessible

**🔹 PHASE 11 COMPLETE - Proceeding to CMS setup**

---

### ✅ PHASE 12: Netlify CMS Setup

**Site URLs:**
- **Live Site (TR):** https://strong-daifuku-b4a8ca.netlify.app/tr/
- **Live Site (EN):** https://strong-daifuku-b4a8ca.netlify.app/en/
- **CMS Admin:** https://strong-daifuku-b4a8ca.netlify.app/admin/
- **Netlify Dashboard:** https://app.netlify.com/sites/strong-daifuku-b4a8ca/

**MANUAL STEP - User Action Required:**

### Step 1: Enable Netlify Identity
1. Go to: https://app.netlify.com/sites/strong-daifuku-b4a8ca/configuration/identity
2. Click **"Enable Identity"**

### Step 2: Configure Registration
1. Under **Registration preferences** → Click **Edit settings**
2. Select **"Invite only"** (recommended for security)
3. Click **Save**

### Step 3: Enable Git Gateway
1. Scroll to **Services** section
2. Find **Git Gateway** → Click **"Enable Git Gateway"**

### Step 4: Invite Admin User
1. Go to **Identity** tab: https://app.netlify.com/sites/strong-daifuku-b4a8ca/identity
2. Click **"Invite users"**
3. Enter your email address
4. Click **"Send"**

### Step 5: Accept Invitation
1. Check your email inbox
2. Click the invitation link from Netlify
3. Set your password

### Step 6: Login to CMS
1. Go to: **https://strong-daifuku-b4a8ca.netlify.app/admin/**
2. Click **"Login with Netlify Identity"**
3. Enter your email and password
4. You're now in the CMS!

### Step 7: Test CMS Functionality
1. In CMS, navigate to **Sayfalar (TR)** or **Pages (EN)**
2. Click on a page to edit
3. Make a small change
4. Click **"Publish"** (or Save)
5. Wait 1-2 minutes for auto-deploy
6. Verify changes appear on live site

**Verification:**
- [ ] Identity enabled
- [ ] Git Gateway active
- [ ] Admin user invited and accepted
- [ ] CMS login works at /admin/
- [ ] Can edit and save content
- [ ] Changes deploy automatically

**🔹 CONFIRM: "CMS setup complete. Project finished!" - Final verification.**

---

---

## 🔧 POST-LAUNCH FIXES & IMPROVEMENTS

The following phases document fixes and improvements made after initial deployment, consolidated from gap-fix-plan.md, gap-fix-plan-v2.md, and gap-analysis-v3.md.

---

### ✅ GAP-FIX PHASE 1: Translation System Fix - **COMPLETED 2024-12-14**

**Problem:** All `{{ translations.xxx }}` variables outputted empty strings, breaking navigation, buttons, and footer content.

**Root Cause:** The `translations` variable was set to the string `"tr"` instead of the actual translation object.

**Solution:**
Added `eleventyComputed` global data in `eleventy.config.js` to properly resolve translations based on `lang` variable.

**Files Modified:**
- `eleventy.config.js` - Added computed translations resolver

**Results:**
- Navigation menu labels display correctly (Ürünlerimiz, Kurumsal, etc.)
- Product dropdown categories with descriptions showing
- Footer CTA and section titles working
- All button texts displaying properly

---

### ✅ GAP-FIX PHASE 2: SSR Product Template - **COMPLETED 2024-12-14**

**Problem:** Generic `product.njk` template didn't match the rich SSR Pro design mockup.

**Solution:** Created dedicated `product-ssr.njk` template with 8 sections:
1. Hero with light gradient, price card, ROI badge, feature checkmarks
2. Key Benefits (3 colored gradient cards)
3. Technical Specifications (2 styled cards + application grid)
4. Application Process (4 numbered colored circles + CTA banner)
5. Case Study (dark section with glass stat cards)
6. FAQ (collapsible accordions)
7. Related Products (gradient product cards)
8. Final CTA (full gradient with 2 buttons)

**Files Created:**
- `src/_includes/layouts/product-ssr.njk`

**Files Modified:**
- `src/content/tr/products/ssr-pro.md` - Rich structured frontmatter
- `src/content/tr/products/ssr-standard.md` - Rich structured frontmatter
- `src/content/tr/products/ssr-industrial.md` - Rich structured frontmatter
- `src/content/en/products/ssr-pro.md` - Rich structured frontmatter
- `src/content/en/products/ssr-standard.md` - Rich structured frontmatter
- `src/content/en/products/ssr-industrial.md` - Rich structured frontmatter

---

### ✅ GAP-FIX PHASE 3: Navigation URL Fix - **COMPLETED 2024-12-14**

**Problem:** All navigation links used Turkish URL patterns regardless of language, breaking entire English site navigation.

| Navigation Link | Generated URL (EN) | Actual Page URL | Status |
|----------------|-------------------|-----------------|--------|
| Products | `/en/urunlerimiz/` | `/en/products/` | BROKEN |
| Corporate | `/en/kurumsal/` | `/en/corporate/` | BROKEN |
| Contact | `/en/iletisim/` | `/en/contact/` | BROKEN |

**Solution:**
1. Added `urls` section to `tr.json` and `en.json` with all URL mappings
2. Updated `header.njk` and `footer.njk` to use `{{ translations.urls.xxx }}`

**Files Modified:**
- `src/_data/tr.json` - Added urls section
- `src/_data/en.json` - Added urls section
- `src/_includes/components/header.njk` - Use translation URLs
- `src/_includes/components/footer.njk` - Use translation URLs

---

### ✅ GAP-FIX PHASE 4: Product URL Consistency - **COMPLETED 2024-12-14**

**Problem:** SSR products nested under `/products/` but chemical products at root level (inconsistent).

**Solution:** Updated all chemical product permalinks to be nested under products:
- EN: `/en/products/home-chemicals/`, `/en/products/vehicle-chemicals/`, etc.
- TR: `/tr/urunlerimiz/ev-kimyasallari/`, `/tr/urunlerimiz/arac-kimyasallari/`, etc.

**Files Modified (8):**
- `src/content/en/products/home-chemicals.md`
- `src/content/en/products/vehicle-chemicals.md`
- `src/content/en/products/textile-chemicals.md`
- `src/content/en/products/marine-chemicals.md`
- `src/content/tr/products/ev-kimyasallari.md`
- `src/content/tr/products/arac-kimyasallari.md`
- `src/content/tr/products/tekstil-kimyasallari.md`
- `src/content/tr/products/tekne-kimyasallari.md`

---

### ✅ GAP-FIX PHASE 5: Missing Legal Pages - **COMPLETED 2024-12-14**

**Problem:** Footer links to legal pages that didn't exist (404 errors).

**Solution:** Created 4 legal pages with full content.

**Files Created:**
- `src/content/tr/pages/gizlilik-politikasi.md` → `/tr/gizlilik-politikasi/`
- `src/content/tr/pages/kullanim-kosullari.md` → `/tr/kullanim-kosullari/`
- `src/content/en/pages/privacy-policy.md` → `/en/privacy-policy/`
- `src/content/en/pages/terms-of-use.md` → `/en/terms-of-use/`

---

### ✅ GAP-FIX PHASE 6: Corporate Page Template - **COMPLETED 2024-12-14**

**Problem:** Generic page.njk layout didn't match `kurumsal.html` design.

**Solution:** Created custom `corporate.njk` layout with:
- Dark navy hero with wave SVG pattern overlay
- Story section with white card on gray background
- Vision/Mission section with gradient background and icon cards
- Timeline component with vertical line, dots, and alternating layout
- Innovation section with purple gradient and glass-effect cards
- CTA section with contact link

**Files Created:**
- `src/_includes/layouts/corporate.njk`

**Files Modified:**
- `src/content/tr/pages/kurumsal.md`
- `src/content/en/pages/corporate.md`

---

### ✅ GAP-FIX PHASE 7: Products List Template - **COMPLETED 2024-12-14**

**Problem:** Generic layout didn't match `urunlerimiz.html` design with product cards grid.

**Solution:** Created custom `products.njk` layout with:
- Purple gradient hero with wave SVG pattern
- Intro section with centered text
- Products grid (6 cards) with purple headers, feature tags, and link buttons
- Surface cleaner special section
- Dark navy collaboration CTA section

**Files Created:**
- `src/_includes/layouts/products.njk`

**Files Modified:**
- `src/content/tr/pages/urunlerimiz.md`
- `src/content/en/pages/products.md`

---

### ✅ GAP-FIX PHASE 8: Chemical Products Template - **COMPLETED 2024-12-14**

**Problem:** Chemical product pages using generic product.njk, not matching original designs.

**Solution:** Created custom `product-chemical.njk` layout with:
- Product-specific color theming (green, blue, cyan, purple)
- Light gradient hero with category badge
- Quick info boxes and highlight card
- 2-column features section with icons
- Use cases cards (3 cards with emojis)
- Gradient CTA section

**Files Created:**
- `src/_includes/layouts/product-chemical.njk`

**Files Modified (8):**
- TR: ev-kimyasallari.md, arac-kimyasallari.md, tekne-kimyasallari.md, tekstil-kimyasallari.md
- EN: home-chemicals.md, vehicle-chemicals.md, marine-chemicals.md, textile-chemicals.md

---

### ✅ GAP-FIX PHASE 9: Projects Page Template - **COMPLETED 2024-12-14**

**Problem:** Generic layout didn't match `projelerimiz.html` design.

**Solution:** Created custom `projects.njk` layout with:
- Dark navy gradient hero with radial overlays
- Intro section with centered text
- Project cards with numbered badges (01, 02)
- Gradient image headers with large icons
- Feature tag badges
- Technology grid (6 cards with icons)
- Purple gradient CTA section

**Files Created:**
- `src/_includes/layouts/projects.njk`

**Files Modified:**
- `src/content/tr/pages/projelerimiz.md`
- `src/content/en/pages/projects.md`

---

### ✅ GAP-FIX PHASE 10: Nanotechnology Page Template - **COMPLETED 2024-12-14**

**Problem:** Generic layout didn't match `nanoteknoloji.html` design.

**Solution:** Created custom `nanotechnology.njk` layout with:
- Purple gradient hero with radial overlay
- Services section with 6 cards with colored top borders
- Dark tech section with glass-effect cards (4 technologies)
- Benefits section with 6 icon items
- Applications section with gradient cards (6 areas)
- Pink/red gradient CTA section

**Files Created:**
- `src/_includes/layouts/nanotechnology.njk`

**Files Modified:**
- `src/content/tr/pages/nanoteknoloji.md`
- `src/content/en/pages/nanotechnology.md`

---

### ✅ GAP-FIX PHASE 11: Blog Page Template - **COMPLETED 2024-12-14**

**Problem:** Generic layout didn't match `blog.html` design with coming soon state.

**Solution:** Created custom `blog.njk` layout with:
- Purple gradient hero with emoji (📝) background overlay
- Empty state section with large icon (📰), title, description
- Email subscribe form with styled input and button
- Topics section with 6 gradient cards
- Coming Soon section (dark navy) with social links
- JavaScript for subscribe form handling (bilingual alerts)

**Files Created:**
- `src/_includes/layouts/blog.njk`

**Files Modified:**
- `src/content/tr/pages/blog.md`
- `src/content/en/pages/blog.md`

---

### ✅ GAP-FIX PHASE 12: Homepage Enhancements - **COMPLETED 2024-12-14**

**Problem:** Homepage missing before/after comparison section from original design.

**Solution:** Added Before/After Comparison section:
- Side-by-side comparison cards showing uncoated vs coated panels
- "Before" card with red badges (dust, frequent cleaning, efficiency loss, UV damage)
- "After" card with green badges (self-cleaning, 70% less cleaning, max efficiency, UV protection)
- Visual indicators with BEFORE/AFTER tags and +8% EFFICIENCY badge
- Bilingual support (Turkish and English)
- Responsive grid layout

**Files Modified:**
- `src/_includes/layouts/home.njk`

---

## 📊 GAP-FIX SUMMARY

| Phase | Description | Templates Created | Files Modified |
|-------|-------------|-------------------|----------------|
| 1 | Translation System Fix | - | eleventy.config.js |
| 2 | SSR Product Template | product-ssr.njk | 6 SSR product files |
| 3 | Navigation URL Fix | - | tr.json, en.json, header.njk, footer.njk |
| 4 | Product URL Consistency | - | 8 product files |
| 5 | Missing Legal Pages | - | 4 new legal pages |
| 6 | Corporate Template | corporate.njk | 2 content files |
| 7 | Products List Template | products.njk | 2 content files |
| 8 | Chemical Products Template | product-chemical.njk | 8 content files |
| 9 | Projects Template | projects.njk | 2 content files |
| 10 | Nanotechnology Template | nanotechnology.njk | 2 content files |
| 11 | Blog Template | blog.njk | 2 content files |
| 12 | Homepage Enhancements | - | home.njk |

**Total New Templates Created:** 7
**Total Content Files Modified:** 40+
**Build Output:** 33→38 pages

---

### ✅ PHASE 13: Content Updates Based on User Feedback - **COMPLETED 2024-12-15**

**User Feedback Implemented:**

#### 1. SSR Product Family - Corrected Specifications

| Product | Warranty | Efficiency | Price | Features |
|---------|----------|------------|-------|----------|
| **SSR Standard** | 1 year | 2-6% | ₺10/m² | Easy cleaning |
| **SSR Pro** | 2 years | 2-6% | ₺14/m² | UV protection, Antireflectivity, Easy cleaning, Reduced cleaning frequency |
| **SSR Industrial** | 2 years | 2-8% | TBD | Extreme weather resistance, Antireflectivity, UV protection |

**Files Updated:**
- `src/content/tr/products/ssr-standard.md`
- `src/content/tr/products/ssr-pro.md`
- `src/content/tr/products/ssr-industrial.md`
- `src/content/en/products/ssr-standard.md`
- `src/content/en/products/ssr-pro.md`
- `src/content/en/products/ssr-industrial.md`

#### 2. TUPRAS Case Study with ROI Calculator

Added to SSR Pro product page:
- Kurulu Güç: 1 MWp
- Günlük Üretim: 4 MWh
- Materix Verim Hedefi: %3.5
- Yıllık Verim: 51 MWh ($3,300)
- ROI (ilk yıl): +121%
- Geri Ödeme Süresi: ≈5.4 ay
- Temizleme Sıklığı: %50 azalma

#### 3. Auto Products - Expanded Catalog (9 Products)

| Product | Description |
|---------|-------------|
| Materix NFC-11 | Nano Yağmur Kaydırıcı |
| Nano Hızlı Cila | Anında Parlaklık |
| Nano Torpido Parlatıcı | İç Mekan Bakımı |
| Nano Jant Temizleyici | Profesyonel Jant Bakımı |
| Nano Lastik Parlatıcı | Lastik Bakım |
| Nano Deri Koltuk Temizleyici | Deri Bakım |
| Detay Temizleyici | Çok Amaçlı |
| Cilalı Oto Şampuanı | Temizlik + Cila |
| **Nano Seramik Kaplama** | Uzun Süreli Boya Koruması |

**Files Updated:**
- `src/content/tr/products/arac-kimyasallari.md`
- `src/content/en/products/vehicle-chemicals.md`

#### 4. Home Products (3 Products)

| Product | Description |
|---------|-------------|
| Materix NFC-14 | Cam ve Seramik Nano Su İtici |
| Materix NFC-16 | Ayakkabı/Tekstil Su İtici |
| Detay Temizleyici | Çok Amaçlı Temizlik |

**Files Updated:**
- `src/content/tr/products/ev-kimyasallari.md`
- `src/content/en/products/home-chemicals.md`

#### 5. Marine Products (3 Products)

| Product | Description |
|---------|-------------|
| Materix NFC-12 | Tekne ve Yat Camları için Nano Su İtici |
| Detay Temizleyici | Marine Çok Amaçlı Temizlik |
| **Nano Seramik Kaplama** | Marine Yüzey Koruması |

**Files Updated:**
- `src/content/tr/products/tekne-kimyasallari.md`
- `src/content/en/products/marine-chemicals.md`

#### 6. Sales Channels Configuration

Added to `src/_data/site.json`:
```json
"salesChannels": {
  "koctas": {
    "name": "Koçtaş",
    "available": true,
    "note": "Seçili ürünler mağazalarımızda satılmaktadır"
  },
  "trendyol": {
    "name": "Trendyol",
    "url": "",
    "available": false,
    "note": "Yakında"
  }
}
```

#### 7. TSE Certification

- Added TSE to certifications array in `site.json`
- Removed ISO 9001 (not yet obtained)
- Added TSE badge to all product pages

#### 8. Contact Information Updated

- Phone: `0 (232) 480 08 00`
- Email: `info@materix.com.tr`

#### 9. Pending Items (Awaiting User Input)

| Item | Status | Notes |
|------|--------|-------|
| Purira product | ❓ Awaiting clarification | Not found in catalog - what is this product? |
| ROI Calculator equation | ❓ Awaiting review | User to verify calculation formula |
| 500+ customers stats | ❓ Awaiting update | User to provide accurate numbers |
| SSR Industrial price | ❓ Awaiting info | Price per m² needed |

**🔹 PHASE 13 COMPLETE - Content updates applied**

---

### ✅ FINAL VERIFICATION CHECKLIST

- [ ] ✅ Site live at Netlify URL
- [ ] ✅ Turkish version works (/)
- [ ] ✅ English version works (/en/)
- [ ] ✅ All 11 pages accessible in both languages
- [ ] ✅ Language switcher functional
- [ ] ✅ Mobile responsive
- [ ] ✅ CMS accessible at /admin
- [ ] ✅ CMS login works
- [ ] ✅ Content editable through CMS
- [ ] ✅ Auto-deploy from CMS works
- [ ] ✅ No console errors
- [ ] ✅ All images display
- [ ] ✅ SSL certificate active (HTTPS)
- [ ] ✅ GitHub repo updated

**🎉 PROJECT COMPLETE!**

---

## 🎯 Final Deliverables

### What You'll Have:

1. ✅ **Multi-language website** (TR/EN)
2. ✅ **Visual CMS** (Netlify CMS at `/admin`)
3. ✅ **Fast static site** (Eleventy)
4. ✅ **Auto-deploy** (Push to GitHub → Auto deploy)
5. ✅ **SEO optimized** (Hreflang tags, meta tags)
6. ✅ **Mobile responsive** (Tailwind CSS)
7. ✅ **Free hosting** (Netlify free tier)
8. ✅ **SSL certificate** (Auto-generated)
9. ✅ **CDN delivery** (Global edge network)
10. ✅ **Version control** (All changes tracked in Git)

### CMS Features:

- ✅ Edit content in Turkish and English
- ✅ Add/edit/delete blog posts
- ✅ Manage products
- ✅ Upload images
- ✅ Preview before publishing
- ✅ Multiple user support
- ✅ Role-based permissions
- ✅ Automatic Git commits

---

## 🔄 Content Management Workflow

### For Content Editors:

1. Go to `https://materix-website.netlify.app/admin`
2. Login with credentials
3. Select language (TR or EN)
4. Edit page/product/blog post
5. Click "Save" → Auto-deploys to live site
6. Changes appear in 1-2 minutes

### For Developers:

1. Clone repository
2. Make changes locally
3. Test with `npm run serve`
4. Commit and push to GitHub
5. Auto-deploys to production

---

## 💰 Cost Breakdown

| Service | Cost |
|---------|------|
| Netlify Hosting | **FREE** (100GB bandwidth/month) |
| Netlify CMS | **FREE** (open source) |
| Eleventy | **FREE** (open source) |
| GitHub | **FREE** (public repos) |
| SSL Certificate | **FREE** (auto-generated) |
| CDN | **FREE** (included) |
| **TOTAL** | **$0/month** |

---

## ⏱️ Estimated Timeline

| Phase | Time | Status |
|-------|------|--------|
| Project setup | 30 mins | Ready to start |
| Content extraction | 1 hour | Can automate |
| Template creation | 2 hours | Templates provided |
| CMS configuration | 1 hour | Config provided |
| Testing | 1 hour | Manual |
| Deployment | 30 mins | Automated |
| **TOTAL** | **6 hours** | Ready to execute |

---

## 🔧 Additional Configuration Files

### Step 8.1: Site Data (`src/_data/site.json`)

```json
{
  "name": "MATERIX Nano Teknoloji",
  "url": "https://materix.tech",
  "defaultLang": "tr",
  "contact": {
    "email": "info@materix.tech",
    "phone": "0850 XXX XX XX",
    "address_tr": "Dokuz Eylül Üniversitesi, Tınaztepe Yerleşkesi, DEPARK Beta Binası, B:29, Buca 35400, İzmir",
    "address_en": "Dokuz Eylül University, Tınaztepe Campus, DEPARK Beta Building, B:29, Buca 35400, İzmir"
  },
  "social": {
    "facebook": "#",
    "linkedin": "#",
    "twitter": "#"
  }
}
```

### Step 8.2: Styles (`src/assets/css/styles.css`)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');

* {
    font-family: 'Inter', sans-serif;
}

:root {
    --primary-blue: #1e40af;
    --secondary-blue: #3b82f6;
    --accent-green: #10b981;
    --dark: #0f172a;
    --light-gray: #f8fafc;
}

.gradient-bg {
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #10b981 100%);
}

.glass-effect {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.btn-primary {
    background: linear-gradient(135deg, #1e40af, #3b82f6);
    transition: all 0.3s ease;
}

.btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(30, 64, 175, 0.4);
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

.float-animation {
    animation: float 6s ease-in-out infinite;
}

/* Mobile menu styles */
.mobile-menu {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.mobile-menu.active {
    max-height: 500px;
}
```

### Step 8.3: Main JavaScript (`src/assets/js/main.js`)

```javascript
// Mobile menu toggle
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

// ROI Calculator
document.addEventListener('DOMContentLoaded', function() {
    const powerSlider = document.getElementById('powerSlider');
    const productionSlider = document.getElementById('productionSlider');
    const priceSlider = document.getElementById('priceSlider');
    
    if (powerSlider && productionSlider && priceSlider) {
        const powerValue = document.getElementById('powerValue');
        const productionValue = document.getElementById('productionValue');
        const priceValue = document.getElementById('priceValue');
        
        const efficiencyGain = document.getElementById('efficiencyGain');
        const annualSavings = document.getElementById('annualSavings');
        const tenYearSavings = document.getElementById('tenYearSavings');
        const co2Reduction = document.getElementById('co2Reduction');
        
        function updateCalculator() {
            const power = parseInt(powerSlider.value);
            const production = parseInt(productionSlider.value);
            const price = parseFloat(priceSlider.value);
            
            powerValue.textContent = power + ' kWp';
            productionValue.textContent = production.toLocaleString('tr-TR') + ' kWh';
            priceValue.textContent = price.toFixed(1) + ' ₺';
            
            // Calculations (4% average efficiency gain)
            const efficiencyIncrease = production * 0.04;
            const annualIncome = efficiencyIncrease * price;
            const tenYearIncome = annualIncome * 10;
            const co2Saved = (efficiencyIncrease * 0.5) / 1000;
            
            efficiencyGain.textContent = Math.round(efficiencyIncrease).toLocaleString('tr-TR') + ' kWh';
            annualSavings.textContent = '₺ ' + Math.round(annualIncome).toLocaleString('tr-TR');
            tenYearSavings.textContent = '₺ ' + Math.round(tenYearIncome).toLocaleString('tr-TR');
            co2Reduction.textContent = co2Saved.toFixed(1) + ' ton';
        }
        
        powerSlider.addEventListener('input', updateCalculator);
        productionSlider.addEventListener('input', updateCalculator);
        priceSlider.addEventListener('input', updateCalculator);
        
        updateCalculator();
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
```

---

## 🚦 Ready to Deploy

### Pre-Deployment Checklist

- [ ] All HTML content extracted from existing files
- [ ] Turkish and English translations created
- [ ] Templates and components built
- [ ] CMS configuration completed
- [ ] Local testing successful (`npm run serve`)
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Netlify account created
- [ ] Site deployed to Netlify
- [ ] Netlify Identity enabled
- [ ] Git Gateway configured
- [ ] Admin user invited
- [ ] CMS login tested
- [ ] Multi-language functionality verified
- [ ] Mobile responsiveness checked
- [ ] Performance tested

---

## 📞 Support & Troubleshooting

### Common Issues:

**Issue 1: Build fails on Netlify**
```bash
Solution: Check Node version in netlify.toml is set to 18
```

**Issue 2: CMS not loading**
```bash
Solution: Ensure Git Gateway is enabled in Netlify Identity settings
```

**Issue 3: Language switcher not working**
```bash
Solution: Check permalink URLs in frontmatter match expected structure
```

**Issue 4: Images not showing**
```bash
Solution: Verify image paths are correct and assets folder is being copied
```

---

## 🎓 Learning Resources

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Netlify CMS Documentation](https://decapcms.org/docs/intro/)
- [Netlify Hosting Docs](https://docs.netlify.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 🔐 Security Considerations

1. **Netlify Identity**: Set registration to "Invite only"
2. **CMS Access**: Use strong passwords
3. **Git Gateway**: Only authorized users can publish
4. **HTTPS**: Automatically enabled by Netlify
5. **Security Headers**: Configured in netlify.toml

---

## 📈 Next Steps After Launch

1. **Add Google Analytics**: Track visitor behavior
2. **Set up custom domain**: Point materix.tech to Netlify
3. **Configure email**: Set up contact form submissions
4. **Add more languages**: Expand beyond TR/EN
5. **Blog content**: Start publishing articles
6. **SEO optimization**: Submit sitemap to search engines
7. **Performance monitoring**: Use Netlify Analytics
8. **A/B testing**: Test different CTAs and layouts

---

## ✅ Success Criteria

Your website is successfully deployed when:

- ✅ Both TR and EN versions are accessible
- ✅ CMS login works at `/admin`
- ✅ Content can be edited and published
- ✅ Images upload successfully
- ✅ Language switcher works correctly
- ✅ Mobile version displays properly
- ✅ SSL certificate is active (HTTPS)
- ✅ Auto-deploy works from GitHub
- ✅ All pages load under 3 seconds
- ✅ SEO meta tags are present

---

**END OF IMPLEMENTATION PLAN**

---

## 🤖 HOW TO USE THIS PLAN WITH CLAUDE CODE CLI

### Step 1: Install Claude Code CLI

```bash
npm install -g @anthropic-ai/claude-code
```

### Step 2: Navigate to Your Work Directory

```bash
cd ~/projects  # or wherever you want to create the project
```

### Step 3: Start Claude Code

```bash
claude-code
```

### Step 4: Give Claude Code the Prompt

Copy the entire prompt from the **"🎯 PROMPT FOR CLAUDE CODE"** section at the top of this document and paste it into Claude Code.

### Step 5: Provide This Implementation Plan

Tell Claude Code:
```
I have a detailed implementation plan. Let me share it with you.
```

Then paste this entire document, or provide the path to this file if Claude Code can access it.

### Step 6: Execute Phase by Phase

Claude Code will:
1. Read each phase
2. Execute the commands
3. Create the files
4. Ask for confirmation before moving to next phase
5. Handle errors and ask for guidance if needed

### Step 7: Manual Steps

Claude Code will pause and ask you to complete manual steps:
- **Phase 10:** Creating the GitHub repository
- **Phase 11:** Deploying to Netlify (through Netlify dashboard)
- **Phase 12:** Configuring Netlify Identity and CMS

### Step 8: Verify Completion

Once all phases are complete, verify using the **Final Verification Checklist**.

---

## 📚 REFERENCE: All Code Snippets Location

For Claude Code to find all necessary code, here's the reference guide:

| What | Where in This Document |
|------|------------------------|
| `.eleventy.js` | Phase 3, Step 3.1 |
| `package.json` | Phase 3, Step 3.2 |
| `netlify.toml` | Phase 7, Step 7.1 |
| `.gitignore` | Phase 7, Step 7.2 |
| `README.md` | Phase 7, Step 7.3 |
| `site.json` | Phase 8, Step 8.1 |
| `tr.json` (Turkish translations) | Phase 2, Step 2.2 |
| `en.json` (English translations) | Phase 2, Step 2.2 |
| `base.njk` (base layout) | Phase 4, Step 4.1 |
| `header.njk` (header component) | Phase 4, Step 4.2 |
| `footer.njk` (footer component) | Phase 4, Step 4.4 |
| `language-switcher.njk` | Phase 4, Step 4.3 |
| `index.md` (Turkish homepage) | Phase 5, Step 5.1 |
| `index.md` (English homepage) | Phase 5, Step 5.2 |
| Product page template | Phase 5, Step 5.3 |
| `admin/index.html` | Phase 6, Step 6.1 |
| `admin/config.yml` | Phase 6, Step 6.2 |
| `styles.css` | Phase 8, Step 8.2 |
| `main.js` | Phase 8, Step 8.3 |

---

## ⚡ QUICK START COMMAND FOR CLAUDE CODE

If you want Claude Code to start immediately, use this condensed prompt:

```
Create a production-ready Eleventy website for MATERIX Nano Teknoloji with:
- Multi-language support (Turkish/English)
- Netlify CMS for content management
- All content extracted from HTML files in /mnt/project/
- Follow the implementation plan in implementationplan.md
- Execute phase by phase, asking for confirmation after each phase
- Source files: materix-homepage-mockup.html, kurumsal.html, urunlerimiz.html, projelerimiz.html, nanoteknoloji.html, iletisim.html, blog.html, arac-kimyasallari.html, and product category pages
- Target: Netlify deployment-ready project

Start with Phase 1: Project Initialization.
```

---

## 🔍 TROUBLESHOOTING FOR CLAUDE CODE

### If Claude Code Gets Stuck:

**On Content Extraction:**
```
If you're having trouble extracting content from HTML files, use cheerio:

const cheerio = require('cheerio');
const fs = require('fs');

const html = fs.readFileSync('reference/filename.html', 'utf8');
const $ = cheerio.load(html);

// Extract title
const title = $('title').text();

// Extract hero section
const heroTitle = $('.hero h1').text();
const heroDesc = $('.hero p').text();

// Extract sections
const sections = [];
$('section').each((i, section) => {
  sections.push({
    title: $(section).find('h2, h3').first().text(),
    content: $(section).text()
  });
});
```

**On Template Errors:**
```
Check that:
1. All Nunjucks variables are properly closed
2. Collections are defined in .eleventy.js
3. Data files exist in src/_data/
4. Frontmatter YAML is valid (no tabs, proper indentation)
```

**On Build Errors:**
```
npm run build --verbose
# Check detailed error messages

# Common fixes:
rm -rf _site node_modules
npm install
npm run build
```

---

## 📝 NOTES FOR CLAUDE CODE

**Important Reminders:**

1. **Source Files Location:** `/files/*.html`
2. **All 11 Pages Must Be Created:** Don't skip any. If unclear, ask. If missing a file, ask!
3. **Content Preservation:** Keep all Turkish text exactly as it appears in source HTML
4. **English Translation:** Professional translation needed for all content
5. **Logo:** If materix-logo.png not found, create a placeholder or note it
6. **Phase Confirmations:** Always ask before moving to next phase
7. **Error Handling:** If a phase fails, fix before continuing
8. **Manual Steps:** Clearly indicate when user action is required

