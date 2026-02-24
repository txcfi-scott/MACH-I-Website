# MACH I Website — Working Notes

## Live Site
- **URL:** https://mach-i-cardiology.netlify.app
- **Admin:** https://app.netlify.com/projects/mach-i-cardiology
- **Netlify Project ID:** 739ce002-1192-45ae-a5ed-9ba7088c2a12
- **Deploy date:** 2026-02-12

## Status: Phase 2 — Eddie Review In Progress (as of 2026-02-23)

All 8 pages built and deployed:
1. `index.html` — Authority-first homepage with hero, trust bar, credentials, services, CTA
2. `about.html` — Dr. Davenport & Dr. Young profiles, credentials, mission
3. `services.html` — 6 service categories with pricing and nav pills
4. `special-issuance.html` — Condition-by-condition FAA special issuance guide (SEO-focused)
5. `publications.html` — NATO series, publications, awards, leadership, speaking
6. `contact.html` — Form-first design, Netlify contact form, map embed, travel info
7. `intake.html` — Patient intake form (noindex, linked from nav and all pages)
8. `thank-you.html` — Form submission confirmation page (noindex)

## Tech Stack
- Static HTML/CSS/JS, no frameworks
- Hosted on Netlify (free tier)
- Shared header/footer via JS injection (main.js)
- Netlify Forms for contact + intake
- CSS custom properties design system (navy/blue/gold palette)
- Scroll reveal animations (IntersectionObserver)
- JSON-LD MedicalClinic schema, Open Graph meta, favicon
- Security headers via netlify.toml (CSP, X-Frame-Options, etc.)

## Next Steps (Phase 2: Launch — Eddie Review In Progress)
- [x] Schedule review session(s) with Dr. D to verify content accuracy — **DONE 2026-02-23**
- [x] Record transcript of review discussion for iteration — **DONE** (saved to `research/eddie-review-call-transcript.md`, analysis in `meeting-transcript-analysis.md`)
- [ ] **Apply credential corrections from call:**
  - NATO: "Prior Chair, current member" (was "Chairman")
  - Cardiology: "invasive, non-interventional" (was "interventional" or similar)
  - Keep "nuclear qualified"
  - Dr. Young: Pulmonologist, Air Force Aeromedical Consult Service, active duty military, AME (military only), runs CPETs/PFTs, cannot do civilian AME exams
- [ ] Dr. D to provide professional headshot photos (both doctors) — reminded, still pending
- [ ] Dr. D reviewing all site content — will dictate corrections via audio/text and email to Scott
- [ ] Dr. D to review condition card data (waiting periods, tests, timelines) — pending
- [ ] Dr. D to review FAQ answers — pending
- [ ] Collect 2-3 patient testimonials (first name, condition, outcome) — not discussed
- [ ] **Eddie creating Netlify account** ($9/mo personal plan) — told to go ahead
- [ ] **Eddie creating Fastmail account** (Family plan, $140/year) — told to go ahead
- [ ] **Eddie choosing new domain name** — candidates: Mach One Cardiology, Flying Heart Doc, Cleared to Fly, Fly Mach One Med (current `medicalaerospacecardiology.com` too long)
- [ ] DNS migration — Wix stays as redirect to new domain on Netlify
- [ ] Set up Netlify Analytics
- [ ] Test forms end-to-end (verify Netlify receives submissions)
- [ ] Final polish based on review feedback
- [ ] **Eddie sending Mac Studio specs** (~$2K model, unused)

## Next Steps (Phase 2.5: Launch Campaign)
- [ ] Coordinate Mad Props Aero / Pat Brown / Jamie YouTube interview timing — they want Eddie on, topic: "you just had a heart attack, how to get back in the air"
- [ ] Website goes live on real domain BEFORE interview airs — critical prerequisite
- [ ] **Next session: Eddie's Mac Studio setup** — VPN (Tailscale), Claude install, security lockdown. Eddie must be in front of the machine.
- [ ] Scott to create Claude package for Eddie's machine (so his Claude starts with full context)
- [ ] Prepare interview talking points for Dr. D
- [ ] **Submit Oshkosh EAA AirVenture speaking proposal** — Scott says not too late, huge exposure
- [ ] **Sun 'n Fun** (Lakeland, April) — Eddie invited to attend with Scott's group for networking (not speaking)
- [ ] **No scheduler on the site** for now — decided during call

## Next Steps (Phase 3: Patient Management)
- [ ] Create patient-mgmt Claude Code project
- [ ] Build patient record templates, pipeline, follow-up tracker (similar to Scott's student management dashboard)
- [ ] Set up HIPAA-compliant file sharing service — Claude can research best option
- [ ] Automated patient follow-up for recurring medicals (e.g., first class every 4 months)
- [ ] Inbound email triage via AI (DeepSeek for cheap initial sort, Claude for complex work)
- [ ] Draft email responses (human-approved before sending)
- [ ] Train Dr. D on workflow

## Next Steps (Phase 4: Marketing)
- [ ] Reach out to Mad Props Aero (warm intro via Scott) — already in discussion, they want Eddie
- [ ] After Pat Brown's channel, pitch bigger YouTube channels (some get 500K views/video)
- [ ] Pitch 5-10 top podcast targets
- [ ] Post to Facebook groups
- [ ] Submit speaking proposals for 2026 conferences
- [ ] **Add Milan keynote** to publications/speaking page once confirmed (Aerospace Society of Milan, end of May 2026)

## Future Project: Sports Cardiology Site
- Eddie plans to expand into sports cardiology — no sports cardiology practice in Dayton
- Has CPET equipment already; Dr. Young handles pulmonary components
- Meeting a board-certified sports cardiologist 2026-02-24
- **Decision: Separate website** from aerospace cardiology (Scott's recommendation, Eddie agreed)
- Fastmail can handle a second domain on the same plan

## Eddie's Practice Profile (from 2026-02-23 call)
- **Special issuance cases:** ~1/week
- **Regular AME exams:** 0-5/week (variable, "easy money")
- **Eddie's edge:** Personal accessibility — he actually answers the phone; can undercut market rates
- **Free consult:** Keep but scope down to brief "here's what I need, here's the cost"
- **Pricing model:** Charge for records review / go-no-go decision; then quote for full paperwork build
- **Payment:** Prefers cash. Electronic payment (Zelle/credit card) gets 30% surcharge.
- **Current domain:** `medicalaerospacecardiology.com` (through Wix, paid ~$600 for 3-5 years)
- **Wix investment:** Already paid, will keep as redirect

## Research Files
- `research/faa-special-issuance-requirements.md` — Condition-by-condition SI requirements
- `research/davenport-publications.md` — Publications, awards, leadership
- `research/marketing-podcasts-channels.md` — Podcast/YouTube/Facebook targets
- `research/hipaa-file-sharing.md` — HIPAA-compliant file sharing options
- `research/visual-assets.md` — Stock photography sources
- `research/first-impressions-pilot-personas.md` — **NEW** Full persona-based site review (3 personas: Dave/Maria/Jake)
- `research/screenshots/` — Full-page screenshots of all site pages

## Thorough Review Complete (2026-02-12)

Full code review and browser testing of all 7 HTML pages, CSS, JS, and config files. Issues found and fixed:

### Consistency Fixes
- Standardized `id="main"` across all pages (was `main-content` on 4 pages)
- Standardized skip-to-content link text to "Skip to content" on all pages
- Added `cta-banner-content` wrapper and `cta-banner-actions` class to special-issuance.html and publications.html CTA banners (were using non-existent `cta-actions` class)
- Fixed tel: link on publications.html CTA — was `tel:9376686974`, now `tel:+19376686974`
- Added `white-space: nowrap` to nav links to prevent "Special Issuance" from wrapping to two lines

### CSS Fixes
- Fixed `.recovery-table` — moved `border-collapse` from wrapper div to `.recovery-table table`; added `overflow-x: auto` for mobile; added `.table-note` style
- Fixed `.pub-list li` selectors — publication items used plain `<li>` but CSS targeted `.pub-item` class; changed CSS to target `.pub-list li`
- Removed conflicting `.credibility-section` and `.book-section` background colors that overrode utility classes
- Fixed `.speaking-section` background to match the `bg-off-white` class used in HTML
- Added `.credential-cards` grid layout CSS (publications page speaking section had no grid)
- Added complete CSS for redesigned special-issuance.html (si-pitch-grid, si-condition-grid, si-process-steps, etc.)

### SEO Fixes
- Added `<link rel="canonical">` to all 6 public pages
- Added `<meta property="og:url">` to all 6 public pages
- Added `<lastmod>` dates to sitemap.xml entries

### Security Fixes
- Added `connect-src 'self'` to CSP
- Added `maps.googleapis.com` to CSP `frame-src` (Google Maps embeds)
- Added `Permissions-Policy` header (geolocation, microphone, camera disabled)
- Changed cache headers from `immutable` to `must-revalidate` (static files without content hashes should not be immutable)

### HTML Fixes
- Fixed special-issuance.html process step headings — were `<h3>` but CSS targets `.process-step h4`
- Removed broken `action="/intake-thank-you/"` from intake form (no such page exists; Netlify uses default success page)
- Synced `img/favicon.svg` to match `favicon.svg` (was only showing "M", now shows "M I")

### JS Fix
- Updated smooth scroll handler to support both `#main` and `#main-content` anchor targets

## Special Issuance Page Redesign (2026-02-12)

Original page was 486 lines of condition-by-condition tables, checklists, and testing timelines — read like an FAA reference manual. Redesigned twice:

**First redesign:** Cut from 486 to 203 lines. Replaced tables/checklists with condition cards grid, simplified process steps, removed anchor nav. Still looked like a wireframe.

**Second redesign (final):** Focused on visual polish:
- **Intro section:** Removed stats sidebar, centered single-column layout with generous spacing
- **Condition cards:** 2-column grid with gold top borders, no Unicode icons, proper card padding (`--space-8`), `--text-xl` titles. Cards have real visual weight on navy background.
- **Process section:** Replaced vertical numbered timeline with horizontal 5-card infographic layout. "01"–"05" labels in gold, white cards with gold top borders.
- **Overall:** Proper visual rhythm (white → navy → off-white → navy), each section distinct

## Stock Photography Added (2026-02-12)

12 photos downloaded from Unsplash/Pexels (free commercial use) to `img/`:
- `hero-cockpit-pilot.jpg` — Homepage hero background
- `hero-sky-clouds.jpg` — CTA banner backgrounds (all pages)
- `above-clouds.jpg` — Special Issuance hero
- `airplane-wing-sky.jpg` — About page Dayton section
- `aviation-instruments.jpg` — Services & Intake page heroes
- `cardiology-ecg.jpg`, `cardiology-heart.jpg` — Available for future use
- `dayton-aviation.jpg` — Contact page hero
- `medical-stethoscope.jpg` — Publications page hero
- `military-cockpit.jpg` — About page hero
- `pilot-walking-to-jet.jpg`, `private-jet-tarmac.jpg` — Available for future use

All applied with heavy navy gradient overlays (75-92% opacity) for subtle atmospheric depth.

## Form Fix + CTA Refactor (2026-02-13)

### Issue 1: Forms returning 404 on submission
Both contact and intake forms lacked an `action` attribute, causing Netlify to POST back to the current page URL. Fixed by:
- Added `action="/thank-you.html"` to both forms
- Created `thank-you.html` — confirmation page with "We'll be in touch within one business day" message, phone number for immediate help, and links back to homepage/special issuance guide
- Styled to match the navy/gold design system

### Issue 2: Intake page was an orphan
Nothing linked to intake.html. Now linked from:
- **Nav bar** (every page via main.js): "Get Started" button replaces "Call Now"
- **Homepage**: Hero CTA and bottom CTA banner
- **About page**: Dayton section CTA and bottom CTA banner
- **Services page**: Special Issuance service card footer and bottom CTA banner
- **Special Issuance page**: Intro CTA, condition card CTA, and bottom CTA banner
- **Contact page**: Sidebar highlight card ("Ready to Get Started? Complete Intake Form") and bottom CTA banner
- **Publications page**: Bottom CTA banner

### Issue 3: CTA refactor — Phone-first to Form-first with dual intent
Restructured CTAs across all pages from "Call (937) 668-6974" as primary to dual-path form-first approach:

**Two paths:**
- **Path 1 (Quick Question)**: "Ask a Question" / "Have a Question?" -> contact.html
- **Path 2 (Ready to Start)**: "Start Your Case" / "Get Started" / "Begin Your Evaluation" -> intake.html

**Changes made:**
- **Nav bar**: "Call Now" -> "Get Started" (links to intake.html)
- **Homepage hero**: "Call (937)" + "Learn About SI" -> "Start Your Case" + "Ask a Question"
- **All CTA banners** (index, about, services, special-issuance, publications, contact): Primary gold button drives to intake form, secondary outline button drives to contact form
- **All CTA banners**: Added "Prefer to call? (937) 668-6974" as subtle secondary line below buttons
- **Contact page**: Removed phone-hero section, updated hero subtitle to form-first, sidebar highlight card now links to intake form
- **Special Issuance page**: Intro CTA now dual-button ("Start Your Special Issuance Case" + "Have a Question?"), condition card CTA drives to intake form, process step 1 updated from "Call us" to "Submit our intake form or contact us"
- **Services page**: Free consultation card CTA now links to contact form, SI service card footer adds "Start Your Case" link
- **Intake page**: Bottom section updated from phone-centric to "Ask a Question" link to contact form with secondary phone line

**Phone number placement (discoverable, not primary):**
- Footer Contact section (every page)
- Contact page sidebar info card
- "Prefer to call?" lines below CTA banners
- Thank-you page
- Meta descriptions (SEO)

## Special Issuance Expanding Condition Cards Redesign (2026-02-13)

Replaced the simple condition grid on special-issuance.html with inline-expanding roadmap cards. Major content and UX upgrade.

### Changes Made

**HTML (special-issuance.html):**
- Replaced 8-card static grid with 9 expanding accordion cards (+ 2 beyond-cardiac simple cards)
- Each card has collapsed state (condition name, reassurance line, "covers" list, expand indicator) and expanded state with:
  - Waiting periods (by class where applicable)
  - Required testing in plain English with explanations of what each test is
  - Visual 5-step roadmap (numbered circles with labels)
  - Typical timeline estimates
  - "What Makes a Strong Case" bullets
  - Class differences
  - Condition-specific CTA button to intake form
- 9 cardiac conditions: Heart Attack/CAD, Stenting, Bypass, Valve Replacement/Repair, AFib/Flutter, Other Arrhythmias, Heart Failure/Cardiomyopathy, Pacemaker (with ICD note), Aortic Disease
- "Beyond Cardiac" section with Pulmonary card (Dr. Young) and "Other Conditions" card
- "Not Sure" CTA card at bottom of conditions section
- 8-item collapsible FAQ section: timeline, chances, flying while pending, cost, travel, denial, BasicMed, AASI
- All medical data sourced from research/faa-ame-guide-requirements.md and research/faa-si-worksheets-and-process.md
- Written for scared pilots (Dave persona), not doctors: plain English, medical terms explained inline

**CSS (styles.css):**
- New `.si-card` accordion card system with smooth max-height transitions
- Plus/minus indicator using CSS pseudo-elements
- Gold-accented note sections with left border
- Test list and strength list with check/arrow markers
- Visual roadmap steps with numbered gold circles and arrow connectors
- FAQ accordion with matching plus/minus behavior
- "Beyond Cardiac" grid with steel-blue accents
- Full mobile responsive support (cards stack, roadmap goes vertical)
- Reduced motion support (inherits from existing prefers-reduced-motion rule)

**JS (main.js):**
- `initSICards()` — Accordion behavior for condition cards (one open at a time, smooth animation, scroll-into-view, keyboard accessible)
- `initSIFaq()` — Accordion behavior for FAQ items (one open at a time)
- Both support Enter/Space keyboard activation, aria-expanded state management
- Replaced old `initSIScrollSpy()` (no longer needed — anchor nav was removed)

### Data Accuracy Notes
- All waiting periods, testing requirements, and class differences sourced from FAA AME Guide research
- HCM noted as 3rd Class only per research
- ICD 2025 breakthrough mentioned with appropriate caveats
- 2024 stress test renewal simplification noted
- Pacemaker dependency no longer required (2021 change) noted
- BasicMed cardiac condition catch noted in FAQ
- Where uncertainty exists, phrased as "varies by case" or "we'll review your specific situation"

## Deployment + Live Site Testing (2026-02-13)

### Deployment
Deployed to Netlify via `npx netlify-cli deploy --prod --dir=. --site=739ce002-1192-45ae-a5ed-9ba7088c2a12`

### Critical Bug Found & Fixed: Stale JavaScript on CDN
- **Symptom:** Condition card accordion and FAQ accordion did not work on the live site. Clicking cards had no effect.
- **Root cause:** All HTML files referenced `js/main.js` without a cache-busting parameter. The CSS already had `?v=3` but JS did not. Netlify CDN served a stale older version of main.js (13,685 bytes) that lacked `initSICards()` and `initSIFaq()` functions. The local version was 16,722 bytes with the correct functions.
- **Fix:** Added `?v=3` cache-busting parameter to all 8 HTML files' `<script src="js/main.js">` tags, then redeployed. After redeployment, the correct JS loaded and all accordion functionality worked.

### Full Test Results (Special Issuance Page)

**Visual Check — PASS**
- Page loads cleanly at desktop (1280x800)
- Hero section renders properly with "Your Roadmap Back to the Cockpit" heading
- All 9 condition cards render with gold top borders, plus icons, readable text
- Correct layout: cards stack in a list format with proper spacing

**Functionality — PASS (after JS fix)**
- All 9 condition cards expand/collapse correctly
- Accordion behavior works: opening one card closes the other
- Expanded cards contain all required sections: Waiting Period, Required Testing, Your Roadmap (visual 5-step), Typical Timeline, What Makes a Strong Case, Class Differences, CTA button
- All 9 CTA buttons inside cards link to `/intake` and navigate correctly
- All 8 FAQ items expand/collapse with accordion behavior
- FAQ "Services page" inline link navigates to `/services` correctly
- Pacemaker card "contact us" inline link navigates to `/contact` correctly

**Mobile Check — PASS**
- Tested at 375px width
- Cards stack vertically, text readable
- Card expand/collapse works on mobile
- Hamburger menu visible

**Navigation — PASS**
- All 6 nav links (Home, About, Services, Special Issuance, Publications, Contact) work
- "Get Started" nav CTA links to intake.html correctly
- Hero CTAs: "Start Your Special Issuance Case" -> `/intake` (works), "Have a Question?" -> `/contact` (works)
- Bottom CTA banner: "Start Your Special Issuance Case" -> `/intake` (works), "Have a Question?" -> `/contact` (works)
- "Prefer to call?" phone link present and correct (tel:+19376686974)
- "Beyond Cardiac" section: "Start Your Pulmonary Case" -> `/intake`, "Ask Us About Your Situation" -> `/contact`
- "Not Sure" CTA: "Start Your Case" -> `/intake`

**Cross-Page Check — PASS**
- Homepage loads correctly with all sections
- Contact page loads with form and all contact info
- Services page loads with pricing
- About page loads with both physician profiles
- Publications page loads with NATO series and awards
- Intake page loads with full form

**Link Format Note (not a bug):**
- CTA links use `/intake` and `/contact` (without `.html`), while nav links use `intake.html` and `contact.html`. Both resolve correctly on Netlify due to pretty URLs support. This is fine but worth noting for consistency.

### Screenshots Saved
All saved to `/Users/scott/Claude/MACH-I-Website/research/screenshots/`:
- `special-issuance-desktop-top.png` — Hero section, desktop
- `special-issuance-desktop-cards.png` — Condition cards collapsed, desktop
- `special-issuance-card-expanded-working.png` — Working expanded card (Heart Attack)
- `special-issuance-card-roadmap.png` — Roadmap and timeline sections
- `special-issuance-card-cta.png` — CTA button inside card
- `special-issuance-mobile-top.png` — Mobile hero at 375px
- `special-issuance-mobile-cards.png` — Mobile cards stacked
- `special-issuance-mobile-expanded.png` — Mobile card expanded

## Session Log

**2026-02-13 (Major Update — Content, CTA Refactor, Condition Cards):**
- Full site review by Opus agent as panicked executive pilot post-MI — report saved to `site-review-pilot-persona.md`
- Three-persona first impressions review (Dave the retired teacher/PP, Maria the airline captain with a-fib, Jake the student pilot with diabetes) — saved to `research/first-impressions-pilot-personas.md`
- **CTA Refactor:** All pages converted from phone-first to form-first with dual intent:
  - Primary: "Start Your Case" → intake form
  - Secondary: "Ask a Question" → contact form
  - Phone demoted to "Prefer to call?" — discoverable but not primary
  - Nav bar: "Call Now" → "Get Started"
- **Forms Fixed:** Both contact and intake forms were returning 404. Added `action="/thank-you.html"` to both. Created styled thank-you.html confirmation page.
- **Intake Page Linked:** Was orphaned (no links anywhere). Now linked from 12 locations across the site.
- **FAA Research:** Three Opus agents produced ~2,500 lines of condition-specific research:
  - `research/faa-ame-guide-requirements.md` — Official FAA AME Guide requirements for 16 conditions
  - `research/faa-si-worksheets-and-process.md` — SI worksheets, process, forms, common mistakes, tips
  - `research/faa-si-requirements-by-condition.md` — AOPA-sourced supplementary data
- **Condition Roadmap Cards:** Redesigned special-issuance.html with 9 expanding cardiac condition cards, each showing: waiting period, required tests (plain English), 5-step visual roadmap, timeline, strong case factors, class differences, and CTA. Plus 2 "beyond cardiac" cards (pulmonary + other). All data sourced from FAA AME Guide research.
- **FAQ Section:** Added 8-item accordion FAQ to special-issuance.html (timeline, approval chances, flying while pending, cost, travel, denial, BasicMed, AASI)
- **JS Cache Bug Fixed:** Netlify CDN served stale main.js. Added ?v=3 cache-busting to all 8 HTML files.
- **Deployed and QA'd:** Full visual/functional testing on desktop and mobile. All passing.
- **Pat Brown / Mad Props Aero:** Scott met with Pat Brown (DPE, AOPA rep, houstondpe.com, Mad Props Aero YouTube). Discussing a YouTube interview with Dr. D on FAA medicals/cardiology as a launch vehicle. Want website live on real domain first.
- **Eddie's Medical Report:** Scott asked Eddie to submit his FAA medical report and accept lower class if necessary.

**2026-02-23 (Eddie Review Call + Transcript Analysis):**
- Review meeting held via Zoom between Scott and Dr. Eddie Davenport
- **Eddie likes the site** — "I really like the site. I think that's one way to just go live."
- **Credential corrections given:** NATO role is "Prior Chair, current member" (not Chairman); cardiology subspecialty is "invasive, non-interventional" (not interventional); nuclear qualified confirmed
- **Dr. Young clarified:** Pulmonologist at Air Force Aeromedical Consult Service, active duty military, AME (military only), runs CPETs/PFTs
- **Decisions:** Keep free consult (scoped down); no scheduler; split sports cardiology into separate site; Netlify + Fastmail confirmed; Wix stays as redirect; new shorter domain needed
- **Eddie's to-dos:** Review all site content (dictate corrections), create Netlify account, create Fastmail account, pick domain name, send photos/art, send Mac Studio specs
- **New info:** Eddie invited to keynote at Aerospace Society of Milan (end of May 2026); planning sports cardiology expansion (meeting sports cardiologist 2026-02-24); Oshkosh speaking proposal still possible
- **Next session:** Eddie in front of Mac Studio for VPN/Claude setup
- Full transcript saved to `research/eddie-review-call-transcript.md`
- Full analysis saved to `meeting-transcript-analysis.md`

## Known Issues
- Scroll reveal animations use IntersectionObserver — won't trigger in headless browsers (works fine in real browsers)
- Google Maps embed on contact page is placeholder — needs real API key or embed URL
- No real photos of Dr. D or Dr. Young yet — credentials-focused design works without them
