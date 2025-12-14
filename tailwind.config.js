/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,njk,md,js}",
    "./_site/**/*.html"
  ],
  theme: {
    extend: {
      // MATERIX Design Tokens - Brand Colors
      colors: {
        // Primary Brand Colors
        'primary': {
          DEFAULT: '#1e40af',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        // Secondary Blue
        'secondary': {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb'
        },
        // Accent Green
        'accent': {
          DEFAULT: '#10b981',
          green: '#10b981',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b'
        },
        // Dark/Neutral
        'dark': {
          DEFAULT: '#0f172a',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },
        // Light Gray Background
        'light': {
          DEFAULT: '#f8fafc',
          gray: '#f8fafc'
        }
      },
      // Typography
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif']
      },
      // Font Sizes
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', fontWeight: '800' }],
        'hero-lg': ['4rem', { lineHeight: '1.1', fontWeight: '800' }],
        'section-title': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
        'card-title': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }]
      },
      // Spacing
      spacing: {
        'section': '5rem',
        'section-lg': '6rem',
        'nav-height': '5rem'
      },
      // Border Radius
      borderRadius: {
        'card': '1rem',
        'card-lg': '1.5rem',
        'button': '0.5rem'
      },
      // Box Shadow
      boxShadow: {
        'card': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.15)',
        'button': '0 10px 30px rgba(30, 64, 175, 0.4)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)'
      },
      // Background Images (Gradients)
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #10b981 100%)',
        'gradient-button': 'linear-gradient(135deg, #1e40af, #3b82f6)',
        'gradient-text': 'linear-gradient(135deg, #1e40af, #10b981)',
        'gradient-card': 'linear-gradient(135deg, rgba(30, 64, 175, 0.05), rgba(16, 185, 129, 0.05))',
        'gradient-hero-blue': 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        'gradient-hero-green': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-hero-purple': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
      },
      // Backdrop Blur
      backdropBlur: {
        'glass': '10px'
      },
      // Animation
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      // Transitions
      transitionDuration: {
        'default': '300ms'
      },
      // Z-Index
      zIndex: {
        'nav': '50',
        'modal': '100',
        'tooltip': '110'
      }
    }
  },
  plugins: [],
  // Safelist for dynamic classes
  safelist: [
    'bg-gradient-primary',
    'bg-gradient-button',
    'text-primary',
    'text-accent',
    'bg-primary',
    'bg-accent',
    'hover:bg-primary-700',
    'hover:bg-accent-600'
  ]
}
