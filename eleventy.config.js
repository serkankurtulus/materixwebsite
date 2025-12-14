module.exports = function(eleventyConfig) {

  // Add computed data for translations
  // This makes 'translations' available as the actual translation object based on 'lang'
  eleventyConfig.addGlobalData("eleventyComputed", {
    translations: (data) => {
      const lang = data.lang || 'tr';
      // Return the translation data based on language
      if (lang === 'en') {
        return data.en;
      }
      return data.tr;
    }
  });

  // Copy static assets to output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({ "src/assets/images": "images" });

  // Watch for changes in assets
  eleventyConfig.addWatchTarget("src/assets/");

  // Collections for Turkish pages
  eleventyConfig.addCollection("pages_tr", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/tr/pages/*.md").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });

  // Collections for English pages
  eleventyConfig.addCollection("pages_en", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/en/pages/*.md").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });

  // Collections for Turkish products
  eleventyConfig.addCollection("products_tr", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/tr/products/*.md");
  });

  // Collections for English products
  eleventyConfig.addCollection("products_en", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/en/products/*.md");
  });

  // Collections for Turkish blog posts
  eleventyConfig.addCollection("blog_tr", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/tr/blog/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Collections for English blog posts
  eleventyConfig.addCollection("blog_en", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/en/blog/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Filter to get translations
  eleventyConfig.addFilter("translate", function(key, translations) {
    if (!translations || !key) return key;
    const keys = key.split('.');
    let result = translations;
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key;
      }
    }
    return result;
  });

  // Filter for localized date
  eleventyConfig.addFilter("localizedDate", function(date, lang) {
    const locale = lang === 'tr' ? 'tr-TR' : 'en-US';
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Filter to get alternate language URL
  eleventyConfig.addFilter("alternateUrl", function(url, currentLang) {
    if (!url) return '/';
    if (currentLang === 'tr') {
      // Turkish to English
      return '/en' + url;
    } else {
      // English to Turkish - remove /en prefix
      return url.replace(/^\/en/, '') || '/';
    }
  });

  // Shortcode for current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Shortcode for SVG icons
  eleventyConfig.addShortcode("icon", function(name) {
    const icons = {
      check: '<svg class="w-6 h-6 text-accent-green" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>',
      arrow: '<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>',
      menu: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>',
      close: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>'
    };
    return icons[name] || '';
  });

  // Add markdown library configuration
  eleventyConfig.setLibrary("md", require("markdown-it")({
    html: true,
    breaks: true,
    linkify: true
  }));

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
