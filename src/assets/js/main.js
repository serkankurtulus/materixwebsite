/**
 * MATERIX Website - Main JavaScript
 * ================================
 * Handles interactive functionality including:
 * - Mobile menu toggle
 * - ROI Calculator
 * - Smooth scrolling
 * - Language detection
 */

(function() {
  'use strict';

  // ============================================
  // DOM Ready
  // ============================================
  document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initCalculator();
    initSmoothScroll();
    initDropdownMenus();
    initScrollAnimations();
  });

  // ============================================
  // Mobile Menu
  // ============================================
  function initMobileMenu() {
    const menuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!menuButton || !mobileMenu) return;

    menuButton.addEventListener('click', function() {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';

      menuButton.setAttribute('aria-expanded', !isExpanded);
      menuButton.classList.toggle('active');
      mobileMenu.classList.toggle('active');

      // Prevent body scroll when menu is open
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!menuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================
  // Dropdown Menus
  // ============================================
  function initDropdownMenus() {
    const dropdownTriggers = document.querySelectorAll('[data-dropdown-trigger]');

    dropdownTriggers.forEach(function(trigger) {
      const dropdown = trigger.nextElementSibling;
      if (!dropdown) return;

      trigger.addEventListener('mouseenter', function() {
        dropdown.classList.add('active');
      });

      trigger.parentElement.addEventListener('mouseleave', function() {
        dropdown.classList.remove('active');
      });
    });
  }

  // ============================================
  // ROI Calculator
  // ============================================
  function initCalculator() {
    const powerSlider = document.getElementById('powerSlider');
    const productionSlider = document.getElementById('productionSlider');
    const priceSlider = document.getElementById('priceSlider');

    if (!powerSlider || !productionSlider || !priceSlider) return;

    const powerValue = document.getElementById('powerValue');
    const productionValue = document.getElementById('productionValue');
    const priceValue = document.getElementById('priceValue');

    const efficiencyGain = document.getElementById('efficiencyGain');
    const annualSavings = document.getElementById('annualSavings');
    const tenYearSavings = document.getElementById('tenYearSavings');
    const co2Reduction = document.getElementById('co2Reduction');

    function formatNumber(num, locale) {
      locale = locale || 'tr-TR';
      return num.toLocaleString(locale);
    }

    function updateCalculator() {
      const power = parseInt(powerSlider.value, 10);
      const production = parseInt(productionSlider.value, 10);
      const price = parseFloat(priceSlider.value);

      // Update display values
      if (powerValue) powerValue.textContent = power + ' kWp';
      if (productionValue) productionValue.textContent = formatNumber(production) + ' kWh';
      if (priceValue) priceValue.textContent = price.toFixed(1) + ' ₺';

      // Calculate results
      // Average efficiency gain: 4-8% (using 4% as conservative estimate)
      const efficiencyPercent = 0.04;
      const efficiencyIncrease = production * efficiencyPercent;
      const annualIncome = efficiencyIncrease * price;
      const tenYearIncome = annualIncome * 10;
      // CO2 reduction: ~0.5 kg per kWh
      const co2Saved = (efficiencyIncrease * 0.5) / 1000;

      // Update result displays
      if (efficiencyGain) {
        efficiencyGain.textContent = formatNumber(Math.round(efficiencyIncrease)) + ' kWh';
      }
      if (annualSavings) {
        annualSavings.textContent = '₺ ' + formatNumber(Math.round(annualIncome));
      }
      if (tenYearSavings) {
        tenYearSavings.textContent = '₺ ' + formatNumber(Math.round(tenYearIncome));
      }
      if (co2Reduction) {
        co2Reduction.textContent = co2Saved.toFixed(1) + ' ton';
      }
    }

    // Add event listeners
    powerSlider.addEventListener('input', updateCalculator);
    productionSlider.addEventListener('input', updateCalculator);
    priceSlider.addEventListener('input', updateCalculator);

    // Sync power and production sliders (rough estimate)
    powerSlider.addEventListener('input', function() {
      const power = parseInt(powerSlider.value, 10);
      // Approximate annual production: power * 1400 kWh/kWp for Turkey
      const estimatedProduction = power * 1400;
      productionSlider.value = Math.min(estimatedProduction, parseInt(productionSlider.max, 10));
      updateCalculator();
    });

    // Initial calculation
    updateCalculator();
  }

  // ============================================
  // Smooth Scroll
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const target = document.querySelector(targetId);

        if (target) {
          e.preventDefault();

          const headerOffset = 80; // Account for fixed header
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Update URL without jumping
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  // ============================================
  // Scroll Animations
  // ============================================
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function(el) {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  // ============================================
  // Utility Functions
  // ============================================

  // Get current language from URL
  window.getCurrentLanguage = function() {
    const path = window.location.pathname;
    if (path.startsWith('/en/') || path === '/en') {
      return 'en';
    }
    return 'tr';
  };

  // Toggle function for accordion elements
  window.toggleAccordion = function(element) {
    const content = element.nextElementSibling;
    const isOpen = content.style.maxHeight;

    // Close all other accordions
    document.querySelectorAll('.accordion-content').forEach(function(item) {
      item.style.maxHeight = null;
      item.previousElementSibling.classList.remove('active');
    });

    // Toggle current
    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + 'px';
      element.classList.add('active');
    }
  };

  // Debounce function for performance
  window.debounce = function(func, wait) {
    var timeout;
    return function executedFunction() {
      var context = this;
      var args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Cookie consent (placeholder)
  window.acceptCookies = function() {
    localStorage.setItem('cookiesAccepted', 'true');
    var banner = document.getElementById('cookieBanner');
    if (banner) {
      banner.style.display = 'none';
    }
  };

  // Check cookie consent on load
  if (!localStorage.getItem('cookiesAccepted')) {
    var cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner) {
      cookieBanner.style.display = 'block';
    }
  }

})();
