# MATERIX Nano Teknoloji Website

Multi-language website for MATERIX Nano Technology with CMS management.

## Tech Stack

- **Static Site Generator:** [Eleventy (11ty)](https://www.11ty.dev/) v3.x
- **CMS:** [Decap CMS](https://decapcms.org/) (formerly Netlify CMS)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4.x with design tokens
- **Languages:** Turkish (TR) - default, English (EN)
- **Hosting:** [Netlify](https://www.netlify.com/)

## Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn

### Development

```bash
# Install dependencies
npm install

# Build Tailwind CSS (run once or in separate terminal)
npm run build:css

# Start development server
npm run serve
```

Visit: http://localhost:8080

### Build for Production

```bash
npm run build
```

Output will be in `_site/` directory.

## Project Structure

```
materix-website/
├── src/
│   ├── _data/              # Site data and translations
│   │   ├── site.json       # Global site configuration
│   │   ├── tr.json         # Turkish translations
│   │   └── en.json         # English translations
│   │
│   ├── _includes/          # Reusable components
│   │   ├── layouts/        # Page layouts
│   │   │   ├── base.njk    # Base HTML layout
│   │   │   └── page.njk    # Standard page layout
│   │   ├── components/     # UI components
│   │   │   ├── header.njk
│   │   │   ├── footer.njk
│   │   │   └── language-switcher.njk
│   │   └── partials/       # Smaller reusable parts
│   │
│   ├── content/            # Markdown content files
│   │   ├── tr/             # Turkish content
│   │   │   ├── pages/      # Main pages
│   │   │   ├── products/   # Product pages
│   │   │   └── blog/       # Blog posts
│   │   └── en/             # English content
│   │       ├── pages/
│   │       ├── products/
│   │       └── blog/
│   │
│   ├── admin/              # Decap CMS configuration
│   │   ├── index.html
│   │   └── config.yml
│   │
│   └── assets/             # Static assets
│       ├── css/
│       ├── js/
│       └── images/
│
├── eleventy.config.js      # Eleventy configuration
├── tailwind.config.js      # Tailwind CSS with design tokens
├── netlify.toml            # Netlify deployment config
└── package.json
```

## Languages

- **Turkish (TR):** Default language, accessible at `/tr/`
- **English (EN):** Accessible at `/en/`

Language switcher is available in the header for easy navigation.

## Content Management

### Accessing the CMS

1. Deploy to Netlify
2. Enable Netlify Identity in Site Settings
3. Enable Git Gateway in Identity > Services
4. Invite users via Identity > Users
5. Access CMS at: `https://your-site.netlify.app/admin`

### Content Structure

- **Pages:** Main website pages (home, about, products, etc.)
- **Products:** Product detail pages
- **Blog:** Blog posts with dates and authors

## Design Tokens

The site uses Tailwind CSS with custom design tokens defined in `tailwind.config.js`:

### Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#1e40af` | Primary brand blue |
| `secondary` | `#3b82f6` | Secondary blue |
| `accent` | `#10b981` | Accent green |
| `dark` | `#0f172a` | Dark backgrounds |
| `light` | `#f8fafc` | Light backgrounds |

### Usage in Templates

```html
<!-- Background -->
<div class="bg-primary">...</div>
<div class="bg-accent">...</div>

<!-- Text -->
<span class="text-primary">...</span>

<!-- Buttons -->
<button class="btn-primary">Primary Button</button>
<button class="btn-secondary">Secondary Button</button>

<!-- Cards -->
<div class="card">Card with hover effect</div>

<!-- Gradients -->
<section class="gradient-bg">Hero section</section>
```

## Deployment

### Automatic (Recommended)

1. Push code to GitHub
2. Connect repository to Netlify
3. Netlify auto-deploys on every push

### Manual

```bash
# Build the site
npm run build

# Deploy using Netlify CLI
npx netlify deploy --prod
```

## SEO Features

- Proper `<title>` and meta description tags
- `hreflang` tags for multi-language SEO
- Open Graph meta tags
- Semantic HTML structure
- Sitemap generation

## Performance

- Static site generation for fast loading
- Image optimization
- CSS minification via Tailwind
- Proper caching headers via Netlify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run serve`
5. Submit a pull request

## License

MIT License - MATERIX Nano Teknoloji

## Support

For questions or issues, contact: info@materix.tech
