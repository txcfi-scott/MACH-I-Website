# MACH I Website — Complete Design Specification

## Overview

A static HTML/CSS/JS prototype for the Medical Aerospace Cardiology & Human Performance Institute (MACH I). Four HTML pages with shared CSS and JS. No frameworks, no build tools — opens directly in a browser.

**Deliverables:**
- `index.html` — Home page
- `about.html` — About / Team page
- `services.html` — Services & Pricing page
- `contact.html` — Contact page
- `css/styles.css` — Single shared stylesheet
- `js/main.js` — Single shared script file

---

## 1. Color Palette

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Navy | `#0A1628` | Primary text, header background, footer background |
| Deep Blue | `#1B3A5C` | Secondary backgrounds, card headers, hover states |
| Steel Blue | `#2E6B9E` | Links, accents, active navigation |
| Sky Blue | `#4A9FD9` | Buttons, highlights, interactive elements |

### Accent Colors
| Name | Hex | Usage |
|------|-----|-------|
| Gold | `#C8A951` | Premium accents, star ratings, featured badges |
| Warm Gold | `#D4B96A` | Hover state for gold elements |

### Neutral Colors
| Name | Hex | Usage |
|------|-----|-------|
| White | `#FFFFFF` | Page background, card backgrounds, button text |
| Off-White | `#F5F7FA` | Alternate section backgrounds (zebra striping) |
| Light Gray | `#E8ECF1` | Borders, dividers, input borders |
| Medium Gray | `#6B7B8D` | Secondary text, captions, placeholder text |
| Dark Gray | `#3A4553` | Body text |

### Semantic Colors
| Name | Hex | Usage |
|------|-----|-------|
| Success | `#2D8F5E` | Form success messages, available badges |
| Error | `#C43B3B` | Form validation errors |

### CSS Custom Properties (defined on `:root`)
```css
:root {
  --color-navy: #0A1628;
  --color-deep-blue: #1B3A5C;
  --color-steel-blue: #2E6B9E;
  --color-sky-blue: #4A9FD9;
  --color-gold: #C8A951;
  --color-gold-hover: #D4B96A;
  --color-white: #FFFFFF;
  --color-off-white: #F5F7FA;
  --color-light-gray: #E8ECF1;
  --color-medium-gray: #6B7B8D;
  --color-dark-gray: #3A4553;
  --color-success: #2D8F5E;
  --color-error: #C43B3B;
}
```

---

## 2. Typography

### Font Stack (Google Fonts)
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
```

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Headings (h1, h2) | Playfair Display | 600, 700 | Hero headlines, section titles |
| Subheadings (h3-h6) | Inter | 600, 700 | Card titles, subsection heads |
| Body | Inter | 400, 500 | All body text, navigation, buttons |

### Type Scale
```css
:root {
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  --text-xs: 0.75rem;    /* 12px — fine print */
  --text-sm: 0.875rem;   /* 14px — captions, small labels */
  --text-base: 1rem;     /* 16px — body text */
  --text-lg: 1.125rem;   /* 18px — lead paragraphs */
  --text-xl: 1.25rem;    /* 20px — card titles */
  --text-2xl: 1.5rem;    /* 24px — h3 */
  --text-3xl: 1.875rem;  /* 30px — h2 */
  --text-4xl: 2.25rem;   /* 36px — h1 on mobile */
  --text-5xl: 3rem;      /* 48px — hero headline desktop */
  --text-6xl: 3.75rem;   /* 60px — hero headline large screens */

  --leading-tight: 1.2;
  --leading-normal: 1.6;
  --leading-relaxed: 1.8;
}
```

### Base Typography Rules
- `body`: `font-family: var(--font-body); font-size: var(--text-base); line-height: var(--leading-normal); color: var(--color-dark-gray);`
- `h1, h2`: `font-family: var(--font-heading); line-height: var(--leading-tight);`
- `h3, h4, h5, h6`: `font-family: var(--font-body); font-weight: 600; line-height: var(--leading-tight);`
- All headings: `color: var(--color-navy);`
- Links: `color: var(--color-steel-blue); text-decoration: none;` Hover: `color: var(--color-sky-blue); text-decoration: underline;`

---

## 3. Spacing & Layout

### Spacing Scale
```css
:root {
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */

  --container-max: 1200px;
  --container-padding: var(--space-6);

  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
  --border-radius-xl: 16px;

  --shadow-sm: 0 1px 3px rgba(10, 22, 40, 0.08);
  --shadow-md: 0 4px 12px rgba(10, 22, 40, 0.12);
  --shadow-lg: 0 8px 30px rgba(10, 22, 40, 0.16);
  --shadow-xl: 0 12px 40px rgba(10, 22, 40, 0.20);
}
```

### Container
```css
.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}
```

### Section Spacing
- Each `<section>` gets `padding: var(--space-20) 0;` (80px top/bottom)
- On mobile (< 768px): `padding: var(--space-12) 0;` (48px)
- Alternate sections use `background: var(--color-off-white);`

---

## 4. Responsive Breakpoints

```css
/* Mobile-first approach — base styles are mobile */
/* Tablet */
@media (min-width: 768px) { ... }
/* Desktop */
@media (min-width: 1024px) { ... }
/* Large desktop */
@media (min-width: 1280px) { ... }
```

---

## 5. Global Components

### 5A. Header / Navigation

**Structure:**
```html
<header class="site-header">
  <div class="container header-inner">
    <a href="index.html" class="logo">
      <span class="logo-mark">MACH I</span>
      <span class="logo-tagline">Medical Aerospace Cardiology<br>& Human Performance Institute</span>
    </a>
    <nav class="main-nav" id="mainNav">
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <a href="contact.html#book" class="btn btn-primary nav-cta">Book Consultation</a>
    </nav>
    <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle navigation">
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>
  </div>
</header>
```

**Styling:**
- **Desktop:** Background `var(--color-navy)`. Height: 80px. Position: `sticky; top: 0; z-index: 1000;`. When scrolled past 50px, add class `header-scrolled` which adds `box-shadow: var(--shadow-md);`
- **Logo mark:** `font-family: var(--font-heading); font-weight: 700; font-size: var(--text-2xl); color: var(--color-white); letter-spacing: 0.05em;`
- **Logo tagline:** `font-size: var(--text-xs); color: var(--color-medium-gray); display: block; line-height: 1.3; white-space: nowrap;`
- **Nav links:** `font-size: var(--text-sm); font-weight: 500; color: var(--color-white); text-transform: uppercase; letter-spacing: 0.08em;` Gap between items: `var(--space-8)`.
- **Active link:** Add `border-bottom: 2px solid var(--color-gold); padding-bottom: 2px;` — set active link based on current page using a class `active` on the `<a>`.
- **Nav CTA button:** See button spec below. Uses `btn-primary` at small size.
- **Mobile (< 1024px):** Hide nav links and CTA. Show hamburger button. When toggled, nav slides in from right as a full-height overlay panel: `position: fixed; top: 0; right: 0; width: 280px; height: 100vh; background: var(--color-navy); padding: var(--space-16) var(--space-8); flex-direction: column; gap: var(--space-6); transform: translateX(100%); transition: transform 0.3s ease;` When open: `transform: translateX(0);` Links become stacked, full-width, `font-size: var(--text-lg);`.
- **Hamburger icon:** Three lines, each `width: 24px; height: 2px; background: var(--color-white); transition: 0.3s;`. When open, top/bottom lines rotate to form an X, middle line fades out.

### 5B. Buttons

**Primary Button (`.btn-primary`):**
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  background: var(--color-sky-blue);
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
}
.btn-primary:hover {
  background: var(--color-steel-blue);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
```

**Secondary Button (`.btn-secondary`):**
- Same base as primary but: `background: transparent; color: var(--color-sky-blue); border: 2px solid var(--color-sky-blue);`
- Hover: `background: var(--color-sky-blue); color: var(--color-white);`

**Large Button (`.btn-lg`):**
- `padding: var(--space-4) var(--space-8); font-size: var(--text-base);`

**Gold Button (`.btn-gold`):**
- `background: var(--color-gold); color: var(--color-navy);`
- Hover: `background: var(--color-gold-hover);`

### 5C. Section Title Component

Used at the top of every content section:

```html
<div class="section-header">
  <span class="section-label">Our Services</span>
  <h2 class="section-title">Specialized Aviation & Aerospace Medicine</h2>
  <p class="section-subtitle">Comprehensive care designed for the unique needs of pilots, astronauts, and aviation professionals.</p>
</div>
```

- `.section-header`: `text-align: center; max-width: 700px; margin: 0 auto var(--space-12);`
- `.section-label`: `font-size: var(--text-sm); font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-gold); display: block; margin-bottom: var(--space-3);`
- `.section-title`: `font-size: var(--text-3xl); margin-bottom: var(--space-4);` (desktop: `var(--text-4xl)`)
- `.section-subtitle`: `font-size: var(--text-lg); color: var(--color-medium-gray); line-height: var(--leading-relaxed);`

### 5D. Cards

**Service Card (`.service-card`):**
```html
<div class="service-card">
  <div class="service-card-icon">
    <!-- Inline SVG icon or emoji placeholder -->
  </div>
  <h3 class="service-card-title">FAA AME Exam</h3>
  <p class="service-card-desc">Description text here...</p>
  <div class="service-card-price">$300</div>
  <a href="contact.html#book" class="btn btn-secondary btn-sm">Learn More</a>
</div>
```
- `background: var(--color-white); border-radius: var(--border-radius-lg); padding: var(--space-8); box-shadow: var(--shadow-sm); border: 1px solid var(--color-light-gray); transition: transform 0.2s, box-shadow 0.2s;`
- Hover: `transform: translateY(-4px); box-shadow: var(--shadow-lg);`
- `.service-card-icon`: `width: 56px; height: 56px; background: var(--color-off-white); border-radius: var(--border-radius-md); display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-4); font-size: 28px;`
- `.service-card-price`: `font-size: var(--text-2xl); font-weight: 700; color: var(--color-navy); margin: var(--space-4) 0;`

**Team Card (`.team-card`):**
```html
<div class="team-card">
  <div class="team-card-photo">
    <div class="photo-placeholder" style="background: var(--color-deep-blue);">
      <span>ED</span>
    </div>
  </div>
  <div class="team-card-info">
    <h3>Dr. Eddie Davenport, M.D.</h3>
    <p class="team-card-role">Founder & Medical Director — Cardiologist</p>
    <p class="team-card-bio">Bio text...</p>
    <ul class="team-card-credentials">
      <li>Board-Certified Cardiologist</li>
      <li>USAF Colonel (Ret.)</li>
    </ul>
  </div>
</div>
```
- `.team-card`: `background: var(--color-white); border-radius: var(--border-radius-lg); overflow: hidden; box-shadow: var(--shadow-md);`
- `.team-card-photo`: `width: 100%; aspect-ratio: 1; overflow: hidden;` On desktop side-by-side layout: `width: 280px; min-width: 280px;`
- `.photo-placeholder`: `width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: var(--text-4xl); color: var(--color-white); font-family: var(--font-heading); font-weight: 700;`
- `.team-card-role`: `font-size: var(--text-sm); color: var(--color-steel-blue); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em;`
- `.team-card-credentials li`: `font-size: var(--text-sm); color: var(--color-medium-gray); padding: var(--space-1) 0; padding-left: var(--space-5);` with a small gold checkmark or bullet before each item.
- Desktop layout: `.team-card { display: flex; flex-direction: row; }` — photo on left, info on right.
- Mobile: stacked (photo on top, info below).

### 5E. Footer

```html
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="footer-logo">MACH I</span>
        <p class="footer-tagline">Medical Aerospace Cardiology & Human Performance Institute</p>
        <p class="footer-address">7061 Corporate Way, Suite 109<br>Dayton, OH 45459</p>
      </div>
      <div class="footer-nav">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-services">
        <h4>Services</h4>
        <ul>
          <li><a href="services.html#aviation">Aviation Medicine</a></li>
          <li><a href="services.html#cardiology">Cardiology</a></li>
          <li><a href="services.html#pulmonary">Pulmonary</a></li>
          <li><a href="services.html#performance">Human Performance</a></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h4>Contact</h4>
        <p><a href="tel:9376686974">(937) 668-6974</a></p>
        <p><a href="mailto:medicalaerospacecardiology@gmail.com">medicalaerospacecardiology@gmail.com</a></p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 MACH I. All rights reserved.</p>
    </div>
  </div>
</footer>
```

- `background: var(--color-navy); color: var(--color-white); padding: var(--space-16) 0 var(--space-8);`
- `.footer-grid`: `display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: var(--space-8);` On tablet: 2x2. On mobile: single column.
- `.footer-logo`: Same styling as header logo mark.
- `h4` in footer: `font-size: var(--text-sm); text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-gold); margin-bottom: var(--space-4);`
- Footer links: `color: rgba(255,255,255,0.7); font-size: var(--text-sm);` Hover: `color: var(--color-white);`
- `.footer-bottom`: `border-top: 1px solid rgba(255,255,255,0.1); margin-top: var(--space-10); padding-top: var(--space-6); text-align: center; font-size: var(--text-sm); color: var(--color-medium-gray);`

---

## 6. Page Specifications

---

### 6A. HOME PAGE (`index.html`)

#### Hero Section

```html
<section class="hero">
  <div class="hero-overlay"></div>
  <div class="container hero-content">
    <span class="hero-label">Aviation & Aerospace Medicine</span>
    <h1 class="hero-title">Where Military Precision<br>Meets Clinical Excellence</h1>
    <p class="hero-subtitle">Board-certified cardiology, pulmonology, and FAA medical exams — led by physicians who are also pilots and military veterans.</p>
    <div class="hero-actions">
      <a href="contact.html#book" class="btn btn-primary btn-lg">Book a Free Consultation</a>
      <a href="services.html" class="btn btn-secondary btn-lg" style="border-color: white; color: white;">View Services</a>
    </div>
  </div>
</section>
```

- **Background:** CSS gradient simulating a sky/aviation feel: `background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-deep-blue) 50%, #1a4a7a 100%);`
- **Height:** `min-height: 85vh; display: flex; align-items: center;`
- **Overlay pattern:** A subtle geometric/grid pattern using CSS — either a repeating SVG pattern or use `background-image` with a low-opacity grid overlay. Keep it subtle (opacity 0.03-0.05). This can also be done with a pseudo-element.
- `.hero-label`: Same style as `.section-label` (gold, uppercase, small)
- `.hero-title`: `font-family: var(--font-heading); font-size: var(--text-5xl); color: var(--color-white); margin-bottom: var(--space-6); max-width: 800px;` Mobile: `var(--text-4xl)`.
- `.hero-subtitle`: `font-size: var(--text-lg); color: rgba(255,255,255,0.8); max-width: 600px; margin-bottom: var(--space-8); line-height: var(--leading-relaxed);`
- `.hero-actions`: `display: flex; gap: var(--space-4); flex-wrap: wrap;`

#### Trust Bar Section

Immediately below hero. A horizontal strip of trust signals.

```html
<section class="trust-bar">
  <div class="container">
    <div class="trust-items">
      <div class="trust-item">
        <span class="trust-number">30+</span>
        <span class="trust-label">Years Experience</span>
      </div>
      <div class="trust-item">
        <span class="trust-number">100+</span>
        <span class="trust-label">Publications</span>
      </div>
      <div class="trust-item">
        <span class="trust-number">FAA</span>
        <span class="trust-label">Specialty Consultant</span>
      </div>
      <div class="trust-item">
        <span class="trust-number">USAF</span>
        <span class="trust-label">Military Veterans</span>
      </div>
    </div>
  </div>
</section>
```

- `background: var(--color-white); border-bottom: 1px solid var(--color-light-gray); padding: var(--space-8) 0;`
- `.trust-items`: `display: flex; justify-content: center; gap: var(--space-12); flex-wrap: wrap;`
- `.trust-number`: `font-family: var(--font-heading); font-size: var(--text-3xl); font-weight: 700; color: var(--color-navy); display: block;`
- `.trust-label`: `font-size: var(--text-sm); color: var(--color-medium-gray); text-transform: uppercase; letter-spacing: 0.06em;`
- `.trust-item`: `text-align: center; min-width: 150px;`

#### Featured Services Section

Background: `var(--color-off-white)`.

```html
<section class="featured-services" style="background: var(--color-off-white);">
  <div class="container">
    <div class="section-header">
      <span class="section-label">What We Offer</span>
      <h2 class="section-title">Specialized Medical Services</h2>
      <p class="section-subtitle">From FAA medical exams to advanced cardiovascular care, we serve pilots and aviation professionals with unmatched expertise.</p>
    </div>
    <div class="services-grid">
      <!-- 4 service cards -->
    </div>
    <div class="section-cta">
      <a href="services.html" class="btn btn-primary btn-lg">View All Services & Pricing</a>
    </div>
  </div>
</section>
```

- `.services-grid`: `display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6);` Tablet: 2 columns. Mobile: 1 column.
- `.section-cta`: `text-align: center; margin-top: var(--space-10);`
- Show 4 featured services:
  1. **FAA AME Exam** — Icon: airplane. "Complete FAA medical examination for all pilot certificate classes, including special issuance cases. Conducted by physicians who are also licensed pilots."
  2. **Cardiology Consultation** — Icon: heart. "Advanced cardiovascular diagnostics including echocardiography, stress testing, and cardiac imaging — tailored to aviation medical standards."
  3. **Pulmonology Consultation** — Icon: lungs/wind. "Comprehensive pulmonary function testing, cardiopulmonary exercise testing, and respiratory management for aviators."
  4. **Executive Health Exam** — Icon: shield/checkmark. "Thorough preventive health screening including ECG, echocardiogram, coronary calcium score, and comprehensive labs."

#### Why MACH I Section

Background: `var(--color-white)`.

```html
<section class="why-machi">
  <div class="container">
    <div class="why-grid">
      <div class="why-content">
        <span class="section-label">Why Choose MACH I</span>
        <h2 class="section-title" style="text-align:left;">Your Career Depends on Your Medical</h2>
        <p>For pilots and aviation professionals, your medical certificate is your career. You need physicians who understand both clinical medicine and the FAA regulatory environment — not just doctors, but aviators themselves.</p>
        <p>At MACH I, our team combines board-certified medical expertise with firsthand aviation experience. We don't just treat conditions — we help you navigate the FAA medical certification process and get back in the cockpit.</p>
        <ul class="why-list">
          <li>Physicians who are licensed pilots and military flight surgeons</li>
          <li>FAA Cardiovascular and Pulmonary Specialty Consultants</li>
          <li>Expert guidance on special issuance medical certificates</li>
          <li>Same-day advanced diagnostics on-site</li>
          <li>Free initial consultation — no obligation</li>
        </ul>
        <a href="about.html" class="btn btn-primary btn-lg">Meet Our Team</a>
      </div>
      <div class="why-visual">
        <div class="credential-cards">
          <div class="credential-card">
            <div class="credential-icon"><!-- stethoscope --></div>
            <h4>Board Certified</h4>
            <p>Cardiology, Pulmonology, Internal Medicine, Aerospace Medicine</p>
          </div>
          <div class="credential-card">
            <div class="credential-icon"><!-- wings --></div>
            <h4>Licensed Pilots</h4>
            <p>Our physicians hold pilot certificates and understand aviation firsthand</p>
          </div>
          <div class="credential-card">
            <div class="credential-icon"><!-- military star --></div>
            <h4>Military Service</h4>
            <p>USAF veterans with decades of aerospace medicine experience</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- `.why-grid`: `display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-12); align-items: center;` Mobile: single column.
- `.why-content p`: `margin-bottom: var(--space-4); font-size: var(--text-lg); color: var(--color-dark-gray);`
- `.why-list`: `list-style: none; padding: 0; margin: var(--space-6) 0;`
- `.why-list li`: `padding: var(--space-3) 0 var(--space-3) var(--space-8); position: relative; font-size: var(--text-base);` Before pseudo-element: a gold checkmark or gold bullet `content: "\2713"; color: var(--color-gold); position: absolute; left: 0; font-weight: 700;`
- `.credential-card`: `background: var(--color-off-white); border-radius: var(--border-radius-md); padding: var(--space-6); margin-bottom: var(--space-4); border-left: 4px solid var(--color-gold);`
- `.credential-card h4`: `font-size: var(--text-lg); margin-bottom: var(--space-2); color: var(--color-navy);`
- `.credential-card p`: `font-size: var(--text-sm); color: var(--color-medium-gray);`

#### CTA Banner Section

Full-width banner above footer.

```html
<section class="cta-banner">
  <div class="container cta-banner-content">
    <h2>Ready to Take the First Step?</h2>
    <p>Schedule your free initial consultation. No obligation, no referral needed.</p>
    <div class="cta-banner-actions">
      <a href="contact.html#book" class="btn btn-gold btn-lg">Book Free Consultation</a>
      <a href="tel:9376686974" class="btn btn-secondary btn-lg" style="border-color: white; color: white;">Call (937) 668-6974</a>
    </div>
  </div>
</section>
```

- `background: linear-gradient(135deg, var(--color-deep-blue), var(--color-navy)); padding: var(--space-16) 0; text-align: center;`
- `h2`: `color: var(--color-white); font-size: var(--text-4xl); margin-bottom: var(--space-4);`
- `p`: `color: rgba(255,255,255,0.8); font-size: var(--text-lg); margin-bottom: var(--space-8);`
- `.cta-banner-actions`: `display: flex; justify-content: center; gap: var(--space-4); flex-wrap: wrap;`

---

### 6B. ABOUT PAGE (`about.html`)

#### Page Hero (smaller than home hero)

```html
<section class="page-hero">
  <div class="container">
    <span class="section-label">About MACH I</span>
    <h1>Pioneers in Aviation & Aerospace Medicine</h1>
    <p class="page-hero-subtitle">Founded by clinicians who are also pilots, MACH I bridges the gap between clinical cardiology and the aviation medical world.</p>
  </div>
</section>
```

- `background: var(--color-navy); padding: var(--space-24) 0 var(--space-16); text-align: center;`
- `h1`: `color: var(--color-white); font-size: var(--text-5xl); max-width: 800px; margin: 0 auto var(--space-6);` Mobile: `var(--text-4xl)`.
- `.page-hero-subtitle`: `color: rgba(255,255,255,0.7); font-size: var(--text-lg); max-width: 600px; margin: 0 auto;`

#### Mission Section

Background: `var(--color-white)`.

```html
<section class="mission">
  <div class="container">
    <div class="mission-grid">
      <div class="mission-content">
        <span class="section-label">Our Mission</span>
        <h2 class="section-title" style="text-align:left;">Aviation Medicine, Done Right</h2>
        <p>MACH I was founded on a simple principle: pilots and aviation professionals deserve physicians who truly understand their world — clinicians who are also aviators.</p>
        <p>We provide comprehensive cardiovascular, pulmonary, and aerospace medical care tailored to the unique physiological and regulatory demands of flight. Whether you need an FAA medical exam, a cardiac workup for special issuance, or a complete human performance assessment, MACH I delivers military precision with patient-centered care.</p>
        <p>Located in Dayton, Ohio — the birthplace of aviation — we serve pilots, air traffic controllers, astronaut candidates, and aviation professionals from across the country.</p>
      </div>
      <div class="mission-values">
        <div class="value-item">
          <h4>Clinical Excellence</h4>
          <p>Board-certified specialists using the latest evidence-based diagnostics and treatment protocols.</p>
        </div>
        <div class="value-item">
          <h4>Aviation Expertise</h4>
          <p>Physicians who hold pilot certificates and understand FAA medical standards from both sides.</p>
        </div>
        <div class="value-item">
          <h4>Patient Advocacy</h4>
          <p>We work with the FAA on your behalf, guiding you through special issuance and medical certification.</p>
        </div>
        <div class="value-item">
          <h4>Military Heritage</h4>
          <p>USAF flight surgeon experience brings discipline, thoroughness, and an aerospace medicine perspective.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

- `.mission-grid`: `display: grid; grid-template-columns: 1.2fr 1fr; gap: var(--space-12);` Mobile: single column.
- `.mission-content p`: Same as body text, with `margin-bottom: var(--space-4); font-size: var(--text-lg);`
- `.value-item`: `padding: var(--space-5) 0; border-bottom: 1px solid var(--color-light-gray);`
- `.value-item h4`: `color: var(--color-navy); font-size: var(--text-lg); margin-bottom: var(--space-2);`
- `.value-item p`: `font-size: var(--text-sm); color: var(--color-medium-gray);`

#### Team Section

Background: `var(--color-off-white)`.

```html
<section class="team" style="background: var(--color-off-white);">
  <div class="container">
    <div class="section-header">
      <span class="section-label">Our Physicians</span>
      <h2 class="section-title">Meet the MACH I Team</h2>
      <p class="section-subtitle">Military veterans, licensed pilots, and board-certified specialists.</p>
    </div>
    <div class="team-cards">
      <!-- Team card 1: Dr. Davenport -->
      <!-- Team card 2: Dr. Young -->
    </div>
  </div>
</section>
```

- `.team-cards`: `display: flex; flex-direction: column; gap: var(--space-8);`

**Dr. Eddie Davenport Card Content:**
- Name: Dr. Eddie Davenport, M.D.
- Role: Founder & Medical Director — Cardiologist
- Placeholder initials: "ED" on `var(--color-deep-blue)` background
- Bio: "Dr. Eddie Davenport is a board-certified cardiologist, USAF Colonel (retired), and licensed pilot who founded MACH I to bring together his twin passions for clinical cardiology and aviation medicine. As an FAA Cardiovascular Specialty Consultant, he serves as a bridge between aviators and the FAA, helping pilots navigate complex medical certification issues. With over 100 peer-reviewed publications and decades of experience in both military and civilian aerospace medicine, Dr. Davenport provides an unmatched level of expertise for aviation professionals."
- Credentials list:
  - Board-Certified Cardiologist
  - USAF Colonel (Retired)
  - FAA Cardiovascular Specialty Consultant
  - Licensed Pilot
  - 100+ Peer-Reviewed Publications
  - Aerospace Medicine Specialist

**Dr. Adam Young Card Content:**
- Name: Dr. Adam Young, D.O.
- Role: Lead Pulmonologist
- Placeholder initials: "AY" on `var(--color-steel-blue)` background
- Bio: "Dr. Adam Young is a triple board-certified physician specializing in pulmonary medicine, critical care, and internal medicine. A USAF flight surgeon, Dr. Young brings firsthand understanding of the physiological demands of flight to his clinical practice. As an aerospace pulmonary consultant, he provides comprehensive respiratory evaluation and management specifically tailored to the needs of aviators and aviation medical certification."
- Credentials list:
  - Triple Board-Certified (Pulmonary, Critical Care, Internal Medicine)
  - USAF Flight Surgeon
  - Aerospace Pulmonary Consultant
  - Pulmonary Function & CPET Specialist

#### CTA Banner

Same CTA banner component as home page.

---

### 6C. SERVICES PAGE (`services.html`)

#### Page Hero

Same `.page-hero` component with:
- Label: "Our Services"
- Title: "Comprehensive Aviation & Aerospace Medicine"
- Subtitle: "From routine FAA exams to advanced cardiovascular diagnostics and human performance optimization."

#### Services Introduction

Background: `var(--color-white)`.

```html
<section class="services-intro">
  <div class="container">
    <p class="services-intro-text">MACH I offers a full spectrum of aviation medical services. All consultations include access to on-site advanced diagnostics, and our physicians' unique combination of clinical expertise and aviation experience ensures you receive care that meets both medical and FAA regulatory standards.</p>
    <div class="services-nav-pills">
      <a href="#aviation" class="pill active">Aviation Medicine</a>
      <a href="#cardiology" class="pill">Cardiology</a>
      <a href="#pulmonary" class="pill">Pulmonary</a>
      <a href="#performance" class="pill">Performance</a>
      <a href="#other" class="pill">Other Services</a>
    </div>
  </div>
</section>
```

- `.services-intro-text`: `font-size: var(--text-lg); color: var(--color-dark-gray); max-width: 800px; margin: 0 auto var(--space-8); text-align: center; line-height: var(--leading-relaxed);`
- `.services-nav-pills`: `display: flex; justify-content: center; gap: var(--space-3); flex-wrap: wrap;`
- `.pill`: `padding: var(--space-2) var(--space-5); border-radius: 999px; font-size: var(--text-sm); font-weight: 500; background: var(--color-off-white); color: var(--color-dark-gray); border: 1px solid var(--color-light-gray); transition: all 0.2s;`
- `.pill:hover, .pill.active`: `background: var(--color-sky-blue); color: var(--color-white); border-color: var(--color-sky-blue);`

#### Service Category Sections

Each category gets its own section with an `id` for anchor navigation. Alternate backgrounds between `var(--color-white)` and `var(--color-off-white)`.

**Section layout:**
```html
<section class="service-category" id="aviation">
  <div class="container">
    <div class="section-header">
      <span class="section-label">Aviation Medicine</span>
      <h2 class="section-title">FAA Medical Examinations</h2>
    </div>
    <div class="service-detail-cards">
      <!-- detailed service cards -->
    </div>
  </div>
</section>
```

**Detailed Service Card (`.service-detail-card`):**
```html
<div class="service-detail-card">
  <div class="service-detail-header">
    <h3>FAA Aviation Medical Exam (AME)</h3>
    <div class="service-detail-price">
      <span class="price-amount">$300</span>
    </div>
  </div>
  <div class="service-detail-body">
    <p class="service-detail-desc">Description...</p>
    <ul class="service-detail-includes">
      <li>Included item 1</li>
      <li>Included item 2</li>
    </ul>
  </div>
  <div class="service-detail-footer">
    <a href="contact.html#book" class="btn btn-primary">Schedule Appointment</a>
  </div>
</div>
```

- `.service-detail-card`: `background: var(--color-white); border-radius: var(--border-radius-lg); border: 1px solid var(--color-light-gray); overflow: hidden; box-shadow: var(--shadow-sm);`
- `.service-detail-header`: `display: flex; justify-content: space-between; align-items: center; padding: var(--space-6) var(--space-8); border-bottom: 1px solid var(--color-light-gray); flex-wrap: wrap; gap: var(--space-4);`
- `.service-detail-header h3`: `font-size: var(--text-xl); color: var(--color-navy);`
- `.price-amount`: `font-size: var(--text-2xl); font-weight: 700; color: var(--color-navy);`
- `.service-detail-body`: `padding: var(--space-6) var(--space-8);`
- `.service-detail-includes li`: Same bullet list style as `.why-list`, with gold bullets. `padding: var(--space-2) 0;`
- `.service-detail-footer`: `padding: var(--space-4) var(--space-8) var(--space-6); border-top: 1px solid var(--color-light-gray);`
- `.service-detail-cards`: `display: flex; flex-direction: column; gap: var(--space-6);`

**Category 1: Aviation Medicine** (`id="aviation"`) — background `var(--color-off-white)`
Service: **FAA Aviation Medical Exam (AME)** — $300
- Description: "Comprehensive FAA medical examination for all pilot certificate classes (First, Second, and Third Class). Our AME physicians are also licensed pilots who understand aviation and the FAA medical certification process from the inside. We specialize in complex special issuance cases involving cardiovascular, pulmonary, and neurological conditions."
- Includes:
  - All classes of FAA medical certificates
  - Special issuance expertise and guidance
  - On-site ECG when required
  - FAA MedXPress coordination
  - Pilot-physician consultation on medical strategy
  - Same-day results for standard exams

**Category 2: Cardiology** (`id="cardiology"`) — background `var(--color-white)`
Service: **Cardiology Consultation** — $600
- Description: "In-depth cardiovascular evaluation performed by a board-certified cardiologist who is also an FAA Cardiovascular Specialty Consultant. We understand both the clinical and regulatory implications of cardiac findings for pilots and aviation professionals."
- Includes:
  - Comprehensive cardiovascular history and physical
  - Resting 12-lead ECG
  - Echocardiography (transthoracic)
  - Treadmill stress testing
  - Cardiac risk stratification
  - Coronary calcium scoring (CT)
  - FAA cardiovascular reporting and special issuance support
  - Holter / event monitoring (if indicated)

**Category 3: Pulmonary** (`id="pulmonary"`) — background `var(--color-off-white)`
Service: **Pulmonology Consultation** — $600
- Description: "Comprehensive respiratory evaluation by a triple board-certified pulmonologist and USAF flight surgeon. Tailored to the unique respiratory demands of high-altitude and pressurized-cabin flight environments."
- Includes:
  - Complete pulmonary history and physical
  - Pulmonary Function Tests (PFTs / Spirometry)
  - Cardiopulmonary Exercise Testing (CPET)
  - Hypoxia altitude simulation (if indicated)
  - Sleep-disordered breathing evaluation
  - Respiratory management for aviators
  - FAA pulmonary special issuance support

**Category 4: Performance** (`id="performance"`) — background `var(--color-white)`
Two services in this category:

Service 1: **Executive Health Exam** — $599
- Description: "A comprehensive preventive health screening designed for high-performing professionals. Combines cardiovascular, metabolic, and general health assessments for a complete picture of your current health status and future risk."
- Includes:
  - Resting 12-lead ECG
  - Echocardiogram
  - Coronary artery calcium score (CT)
  - Comprehensive metabolic and lipid panels
  - Complete blood count
  - Thyroid function tests
  - PSA (men) / additional screening (women)
  - Body composition assessment
  - Physician consultation and written report

Service 2: **Human Performance Optimization** — $2,000
- Description: "Our most comprehensive offering: a 2-3 day intensive assessment designed for pilots, astronaut candidates, military operators, and elite performers who demand peak physiological and cognitive function. This program integrates advanced cardiovascular, pulmonary, and metabolic testing with performance-specific evaluation."
- Includes:
  - Everything in Executive Health Exam
  - Cardiopulmonary Exercise Testing (CPET) with VO2max
  - Advanced body composition (DEXA or equivalent)
  - Neurocognitive baseline testing
  - Nutritional assessment and optimization plan
  - Exercise prescription and periodization
  - Altitude/hypoxia tolerance evaluation
  - Personalized performance optimization report
  - Follow-up consultation (virtual, 30 days)

**Category 5: Other Services** (`id="other"`) — background `var(--color-off-white)`
Two services:

Service 1: **Speaking Engagements** — Negotiable
- Description: "Dr. Davenport and Dr. Young are available for speaking engagements at aviation conferences, medical symposia, corporate wellness events, and military units. Topics include aerospace cardiology, aviation medical certification, human performance optimization, and cardiovascular risk management for aviators."
- Includes:
  - Keynote presentations
  - CME / CE accredited lectures
  - Panel moderation
  - Corporate wellness seminars
  - Custom topic development
- Note: Display price as "Contact for Pricing"

Service 2: **Free Initial Consultation** — $0
- Description: "We offer a complimentary one-hour initial consultation for new patients. This is an opportunity to discuss your medical history, aviation medical concerns, and how MACH I can help — with no obligation and no referral required."
- Includes:
  - Up to 60-minute consultation
  - Medical history review
  - FAA medical strategy discussion
  - Treatment/evaluation recommendations
  - No referral required
  - No obligation
- Note: Display price as "FREE" with special styling — add class `.service-detail-card--featured` with `border: 2px solid var(--color-gold);` and a gold "FREE" badge.

#### CTA Banner

Same CTA banner component as home page.

---

### 6D. CONTACT PAGE (`contact.html`)

#### Page Hero

Same `.page-hero` component with:
- Label: "Get In Touch"
- Title: "Contact MACH I"
- Subtitle: "Schedule your free consultation or reach out with any questions about our services."

#### Contact Section

Background: `var(--color-white)`.

```html
<section class="contact-section">
  <div class="container">
    <div class="contact-grid">
      <div class="contact-form-wrapper" id="book">
        <h2>Send Us a Message</h2>
        <p>Fill out the form below and we'll get back to you within one business day.</p>
        <form class="contact-form" id="contactForm" novalidate>
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name *</label>
              <input type="text" id="firstName" name="firstName" required>
              <span class="form-error">Please enter your first name</span>
            </div>
            <div class="form-group">
              <label for="lastName">Last Name *</label>
              <input type="text" id="lastName" name="lastName" required>
              <span class="form-error">Please enter your last name</span>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" name="email" required>
              <span class="form-error">Please enter a valid email address</span>
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="tel" id="phone" name="phone">
            </div>
          </div>
          <div class="form-group">
            <label for="service">Service of Interest</label>
            <select id="service" name="service">
              <option value="">Select a service...</option>
              <option value="ame">FAA AME Exam ($300)</option>
              <option value="cardiology">Cardiology Consultation ($600)</option>
              <option value="pulmonology">Pulmonology Consultation ($600)</option>
              <option value="executive">Executive Health Exam ($599)</option>
              <option value="performance">Human Performance Optimization ($2,000)</option>
              <option value="speaking">Speaking Engagement</option>
              <option value="free">Free Initial Consultation</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label for="pilotCert">Pilot Certificate (if applicable)</label>
            <select id="pilotCert" name="pilotCert">
              <option value="">Select if applicable...</option>
              <option value="student">Student Pilot</option>
              <option value="private">Private Pilot</option>
              <option value="commercial">Commercial Pilot</option>
              <option value="atp">ATP</option>
              <option value="cfi">CFI</option>
              <option value="atc">Air Traffic Controller</option>
              <option value="military">Military Aviator</option>
              <option value="none">Not a pilot</option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">Message *</label>
            <textarea id="message" name="message" rows="5" required placeholder="Tell us about your medical concerns, FAA situation, or how we can help..."></textarea>
            <span class="form-error">Please enter a message</span>
          </div>
          <button type="submit" class="btn btn-primary btn-lg" style="width: 100%;">Send Message</button>
        </form>
      </div>
      <div class="contact-info-sidebar">
        <div class="contact-info-card">
          <h3>Contact Information</h3>
          <div class="contact-info-item">
            <h4>Address</h4>
            <p>7061 Corporate Way, Suite 109<br>Dayton, OH 45459</p>
          </div>
          <div class="contact-info-item">
            <h4>Phone</h4>
            <p><a href="tel:9376686974">(937) 668-6974</a></p>
          </div>
          <div class="contact-info-item">
            <h4>Email</h4>
            <p><a href="mailto:medicalaerospacecardiology@gmail.com">medicalaerospacecardiology@gmail.com</a></p>
          </div>
          <div class="contact-info-item">
            <h4>Hours</h4>
            <p>Monday - Friday: 8:00 AM - 5:00 PM<br>Saturday - Sunday: Closed</p>
          </div>
        </div>
        <div class="contact-info-card contact-info-card--highlight">
          <h3>Free Consultation</h3>
          <p>New patients receive a complimentary 1-hour initial consultation. No referral required, no obligation.</p>
          <a href="tel:9376686974" class="btn btn-gold" style="width: 100%; margin-top: var(--space-4);">Call Now</a>
        </div>
        <div class="map-placeholder">
          <div class="map-inner">
            <p>7061 Corporate Way, Suite 109<br>Dayton, OH 45459</p>
            <a href="https://maps.google.com/?q=7061+Corporate+Way+Suite+109+Dayton+OH+45459" target="_blank" rel="noopener" class="btn btn-secondary btn-sm">Open in Google Maps</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- `.contact-grid`: `display: grid; grid-template-columns: 1.5fr 1fr; gap: var(--space-10);` Mobile: single column (form first, sidebar second).
- `.contact-form-wrapper h2`: `font-size: var(--text-3xl); margin-bottom: var(--space-3);`
- `.contact-form-wrapper > p`: `color: var(--color-medium-gray); margin-bottom: var(--space-8);`

**Form Styling:**
- `.form-row`: `display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);` Mobile: single column.
- `.form-group`: `margin-bottom: var(--space-5);`
- `label`: `display: block; font-size: var(--text-sm); font-weight: 600; color: var(--color-navy); margin-bottom: var(--space-2);`
- `input, select, textarea`: `width: 100%; padding: var(--space-3) var(--space-4); border: 1px solid var(--color-light-gray); border-radius: var(--border-radius-md); font-family: var(--font-body); font-size: var(--text-base); color: var(--color-dark-gray); transition: border-color 0.2s, box-shadow 0.2s; background: var(--color-white);`
- Focus: `border-color: var(--color-sky-blue); box-shadow: 0 0 0 3px rgba(74, 159, 217, 0.15); outline: none;`
- Error state (`.form-group.error input/textarea`): `border-color: var(--color-error);`
- `.form-error`: `display: none; font-size: var(--text-xs); color: var(--color-error); margin-top: var(--space-1);`
- `.form-group.error .form-error`: `display: block;`

**Sidebar Styling:**
- `.contact-info-card`: `background: var(--color-off-white); border-radius: var(--border-radius-lg); padding: var(--space-8); margin-bottom: var(--space-6);`
- `.contact-info-card h3`: `font-size: var(--text-xl); color: var(--color-navy); margin-bottom: var(--space-6);`
- `.contact-info-item`: `margin-bottom: var(--space-5);`
- `.contact-info-item h4`: `font-size: var(--text-sm); text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-medium-gray); margin-bottom: var(--space-1);`
- `.contact-info-item p`: `font-size: var(--text-base); color: var(--color-dark-gray);`
- `.contact-info-card--highlight`: `background: var(--color-navy); color: var(--color-white);` Override h3 and p colors to white/off-white.
- `.map-placeholder`: `background: var(--color-light-gray); border-radius: var(--border-radius-lg); overflow: hidden; aspect-ratio: 4/3;`
- `.map-inner`: `display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; padding: var(--space-6); color: var(--color-medium-gray);`

---

## 7. JavaScript Specification (`js/main.js`)

### 7A. Mobile Menu Toggle

```javascript
// Toggle mobile menu open/closed
// - Listens for click on #mobileMenuToggle
// - Toggles class 'nav-open' on <body> and the nav element
// - Adds 'active' class to hamburger button for X animation
// - Prevents body scroll when menu is open (overflow: hidden on body)
// - Closes menu when a nav link is clicked
// - Closes menu when clicking outside the nav panel (click on overlay)
```

Implementation details:
- When `nav-open` class is on body, show a semi-transparent overlay (`position: fixed; inset: 0; background: rgba(10,22,40,0.5); z-index: 999;`) behind the nav panel.
- The nav panel itself is `z-index: 1000`.
- Add `body.nav-open { overflow: hidden; }` in CSS.

### 7B. Sticky Header Scroll Effect

```javascript
// Add 'header-scrolled' class to .site-header when scrolled past 50px
// Remove class when scrolled back to top
// Use requestAnimationFrame or passive scroll listener for performance
```

### 7C. Smooth Scroll for Anchor Links

```javascript
// Intercept clicks on links with href starting with '#'
// Smooth scroll to the target element
// Account for sticky header height (80px offset)
// Works for same-page anchors and cross-page anchors (e.g., services.html#cardiology)
```

Use `element.scrollIntoView({ behavior: 'smooth' })` and then adjust for header offset, or calculate position manually with `element.getBoundingClientRect().top + window.scrollY - 80`.

### 7D. Contact Form Validation

```javascript
// Client-side validation on form submit:
// 1. Prevent default submission
// 2. Validate required fields (firstName, lastName, email, message)
// 3. Validate email format with regex
// 4. Add 'error' class to invalid .form-group elements
// 5. Remove 'error' class on valid fields
// 6. If all valid, show a success message (replace form or show overlay)
//    - "Thank you! We'll be in touch within one business day."
//    - Since this is a prototype, don't actually submit anywhere
// 7. On field input/change, clear that field's error state in real-time
```

### 7E. Services Nav Pills (scroll highlight)

```javascript
// On services.html only:
// - Listen for scroll events
// - Determine which service category section is currently in view
// - Update the 'active' class on the corresponding pill in .services-nav-pills
// - Also handle click on pills to smooth-scroll to the section
```

### 7F. Active Navigation Link

```javascript
// On page load, determine the current page from window.location
// Add 'active' class to the matching nav link
```

---

## 8. File Structure

```
MACH-I-Website/
  index.html
  about.html
  services.html
  contact.html
  css/
    styles.css
  js/
    main.js
  design-spec.md        (this file)
  working-notes.md
```

No images directory needed — all visuals are CSS-only (gradients, colors, placeholder initials). No external assets beyond Google Fonts CDN.

---

## 9. HTML Boilerplate

Every HTML file should use this base structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Page Title] | MACH I - Medical Aerospace Cardiology & Human Performance Institute</title>
  <meta name="description" content="[Page-specific description]">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- HEADER (shared across all pages) -->
  <header class="site-header">...</header>

  <main>
    <!-- PAGE-SPECIFIC CONTENT -->
  </main>

  <!-- FOOTER (shared across all pages) -->
  <footer class="site-footer">...</footer>

  <script src="js/main.js"></script>
</body>
</html>
```

**Page titles:**
- Home: "MACH I - Medical Aerospace Cardiology & Human Performance Institute"
- About: "About Us | MACH I - Medical Aerospace Cardiology & Human Performance Institute"
- Services: "Services & Pricing | MACH I - Medical Aerospace Cardiology & Human Performance Institute"
- Contact: "Contact Us | MACH I - Medical Aerospace Cardiology & Human Performance Institute"

**Meta descriptions:**
- Home: "MACH I provides FAA medical exams, cardiology, pulmonology, and human performance optimization for pilots and aviation professionals. Led by board-certified physicians who are also pilots."
- About: "Meet the physicians of MACH I — board-certified cardiologists and pulmonologists, USAF veterans, and licensed pilots specializing in aviation and aerospace medicine."
- Services: "FAA AME exams, cardiology consultations, pulmonary evaluations, executive health exams, and human performance optimization. View all services and pricing."
- Contact: "Schedule your free consultation at MACH I. Located in Dayton, OH. Call (937) 668-6974 or send us a message."

---

## 10. Implementation Notes for Agents

### Build Order
Implement in this order to avoid duplication:
1. **`css/styles.css`** — Build the complete stylesheet first. Include all custom properties, reset/normalize, typography, layout utilities, and all component styles.
2. **`js/main.js`** — Build the complete JavaScript file with all interactions.
3. **`index.html`** — Home page (establishes the header/footer template).
4. **`about.html`** — About page.
5. **`services.html`** — Services page.
6. **`contact.html`** — Contact page.

### CSS Architecture
- Start with a minimal reset (box-sizing, margin/padding reset, img max-width)
- Define all custom properties on `:root`
- Organize by: Reset > Custom Properties > Base Typography > Layout > Components > Page-Specific > Responsive
- Use BEM-lite naming (not strict BEM, but descriptive class names as shown in this spec)
- No `!important` usage

### Accessibility
- All interactive elements must be keyboard accessible
- Use semantic HTML (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`)
- Form inputs must have associated `<label>` elements
- Buttons must have visible focus states (use `outline` or `box-shadow`)
- Color contrast: all text must meet WCAG AA (4.5:1 for body text, 3:1 for large text)
- The hamburger menu button needs `aria-label` and `aria-expanded` attributes
- Skip navigation link (optional but nice): hidden link at top of page that becomes visible on focus, jumps to `<main>`

### Icons
Since we're not using icon libraries, use Unicode characters or simple CSS shapes for any icon needs:
- Airplane: Use text "AME" or simple CSS triangle
- Heart: Unicode `\2665` or CSS shape
- Checkmark: Unicode `\2713`
- Phone: Unicode `\260E`
- Email: Unicode `\2709`
- Or simply omit icons and let the typography and layout carry the design. The service card icons can use simple colored circles with emoji or single-letter abbreviations.

For the service card icons on the home page, use these emoji in the `.service-card-icon` div:
- FAA AME Exam: Use text "AME" styled in bold navy
- Cardiology: Use text with Unicode heart
- Pulmonology: Use text with Unicode wind/dash
- Executive Health: Use text with Unicode shield

### What NOT to Include
- No image files or image references (everything is CSS/text)
- No JavaScript frameworks or libraries
- No CSS frameworks (no Bootstrap, Tailwind, etc.)
- No build tools, preprocessors, or bundlers
- No analytics, tracking, or third-party scripts
- No actual form submission endpoint
- No cookie banners or popups

---

## 11. Quality Checklist

Before considering the prototype complete, verify:

- [ ] All four pages load without errors in a browser
- [ ] Navigation works: all links go to correct pages
- [ ] Active nav link is highlighted on each page
- [ ] Mobile menu opens and closes correctly
- [ ] Mobile menu closes when a link is clicked
- [ ] Sticky header works on scroll
- [ ] Smooth scroll works for anchor links
- [ ] Contact form validates required fields
- [ ] Contact form shows error states
- [ ] Contact form shows success message on valid submission
- [ ] Service category pills scroll to correct sections
- [ ] All text is readable (contrast, size)
- [ ] Layout is responsive: desktop (1200px+), tablet (768px), mobile (375px)
- [ ] No horizontal scrollbar on any viewport
- [ ] Footer links work
- [ ] Phone number and email are clickable (tel: and mailto:)
- [ ] Google Fonts load correctly
- [ ] Copyright year is current (2025)
- [ ] No console errors in browser developer tools
