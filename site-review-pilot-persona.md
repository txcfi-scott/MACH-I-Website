# MACH I Website Review: Scared Pilot Persona

**Reviewer Persona:** 52-year-old corporate executive, Cirrus SR22 pilot, 2 weeks post-MI, medical suspended, terrified of never flying again. Found this site through desperate Googling.

**Date:** February 13, 2026
**Site:** https://mach-i-cardiology.netlify.app
**Pages Reviewed:** All 7 (Home, About, Services, Special Issuance, Publications, Contact, Intake)

---

## Executive Summary

This site does an exceptional job of speaking directly to a pilot's fear and establishing Dr. Davenport's unique authority. The messaging is sharp, the value proposition is clear, and the emotional arc moves from "you're not alone" to "here's how we fix this" to "pick up the phone." It is, however, undermined by one critical technical failure: **both forms (contact and intake) return 404 errors on submission**, meaning the site's two digital conversion paths are completely broken. A scared pilot who works up the courage to reach out via form instead of phone will hit a dead end.

**Overall Grade: B+ for content/messaging, D for functionality**

The content is ready for launch. The plumbing is not.

---

## Page-by-Page Review

### 1. Homepage (index.html)

**First Impression (the "3 seconds" test):**
As a panicked pilot, the very first thing I see is: *"The Cardiologist Who Wrote the Book on Flying After a Heart Event"*. That headline is perfect. It tells me three things instantly: (1) this is about hearts, (2) this is about flying, (3) this person is THE authority. I'm not bouncing.

**What Works Well:**
- The subheadline immediately establishes who Dr. Davenport is: "the FAA's go-to cardiovascular specialist" -- this is exactly what I need to hear
- "Call (937) 668-6974" as the primary CTA is bold, gold, and unmissable
- The credential bar (FAA Specialty Consultant / All USAF Waiver Guides / 100+ Publications / Col. USAF Ret.) is devastating in a good way -- each one builds on the last
- "Pilots Come to Us When the Stakes Are Highest" -- this section heading validates my emotional state. I AM at the highest stakes
- "Denied or Deferred?" card speaks directly to my situation
- "Your Medical Certificate Doesn't Have to End Here" -- the closing CTA gives hope without being false
- Free consultation prominently featured -- removes financial barrier to first contact
- Phone number appears 4+ times on the page -- impossible to miss

**What Gives Me Pause:**
- No photos of Dr. Davenport anywhere on the homepage. I want to see the face of the person I'm trusting with my flying career. The credential initials (ED) are a placeholder circle, not a real headshot. This is a significant trust gap.
- No patient testimonials or success stories. I want to hear from a pilot like me who had an MI and got back in the air. "We've helped hundreds of pilots" is a claim; a quote from one of them is proof.
- No mention of success rates or typical timelines. I want to know: "How long does this take?" and "What are my odds?"
- The "Peak Performance" card in the "How We Help" section feels out of place for someone in my situation -- I'm not thinking about optimization, I'm thinking about survival. It dilutes the urgency.

**Functionality:**
- All navigation links work
- Phone number is clickable (tel: link) -- confirmed
- "Learn About Special Issuance" link works (uses `/special-issuance` path, Netlify redirects handle it)
- Service card "Learn More" links all work with hash anchors on services page
- Scroll reveal animations work smoothly
- Sticky header functions properly

---

### 2. About Page (about.html)

**Emotional Response:**
The heading -- *"The Only Practice Where Both Physicians Are Subspecialists, Military Veterans, Aviators, AND FAA Consultants"* -- followed by the devastating understatement *"That's not marketing. It's simply true."* This is confidence that borders on swagger, and for a scared pilot, swagger from the right person is exactly what I need.

**What Works Well:**
- The mission statement nails it: "MACH I exists because pilots deserve cardiologists and pulmonologists who understand aviation. Not physicians who have to look up what a special issuance is. Not generalists who've never sat in a cockpit." This is the clearest articulation of the value proposition on the entire site.
- "They don't just treat your heart or lungs -- they understand what it means to lose your medical" -- this tells me they GET IT emotionally, not just medically
- Dr. Davenport's bio is comprehensive without being bloated
- "Licensed Pilot" in his credentials -- he's one of us
- The Dayton/aviation birthplace connection is a nice touch
- Dr. Young adds pulmonology capability and reinforces the "both physicians are..." claim

**What Gives Me Pause:**
- Again, no photos. The "ED" and "AY" initial circles are placeholders. For a premium medical consultancy, this feels unfinished. I want to see these people. Trust is built face-to-face, even if the "face" is a professional headshot.
- The credential lists are thorough but may overwhelm someone in a panicked state. Consider highlighting the 3-4 most relevant credentials more prominently and putting the full list behind an expandable section.
- No personal story from either doctor. Why did Dr. Davenport dedicate his career to aviation cardiology? A sentence or two about motivation would humanize the credential list.
- Dr. Young's section reads slightly more distantly than Dr. Davenport's -- the accessibility tree showed a stray opening quotation mark in the rendered text ("Dr. Young is triple board-certified...") which may be a rendering artifact, but worth verifying in multiple browsers.

---

### 3. Services Page (services.html)

**Emotional Response:**
Clear, well-organized, with transparent pricing. This is actually reassuring -- no hidden fees, no "call for pricing" games. I can see exactly what I'd be paying.

**What Works Well:**
- Pill navigation at top (Aviation Medicine / Cardiology / Pulmonary / Special Issuance / Performance / Other) makes the page easy to navigate
- Transparent pricing: $300 AME, $600 Cardiology, $1,200 Special Issuance, Free consultation
- "Not just a cardiology workup -- an evaluation designed from the start to meet FAA requirements" -- this differentiator is critical and well-stated
- Free Initial Consultation is the second service listed, with a "Call to Schedule" CTA -- perfect placement
- "What to Expect" subsections reduce anxiety about the unknown
- Special Issuance section: "Your path back to the cockpit starts here" -- emotionally resonant
- "View Special Issuance Roadmap" link from SI section connects to the dedicated page

**What Gives Me Pause:**
- $1,200 for Special Issuance evaluation feels reasonable given the expertise, but there's no context. Does insurance cover any of this? Is this a one-time fee or will there be additional costs? A note about insurance/payment would be helpful.
- "Ongoing case management through authorization" is listed under the $1,200 service -- does that mean they manage the case until FAA approves it, all for $1,200? Or are there recurring fees? Ambiguity here could cause hesitation.
- Executive Health Screening at $599 and Human Performance Optimization at $2,000 -- these feel like they belong on a different site for a different customer. As a scared MI pilot, seeing these luxuries next to my life-or-death evaluation feels tonally off.
- No mention of what happens if the evaluation determines I'm NOT a candidate. Do I still pay $1,200? A "candidacy assessment" framing helps, but an explicit "if we don't think you're a candidate, we'll tell you during the free consultation before you spend anything" would remove risk.

---

### 4. Special Issuance Page (special-issuance.html)

**Emotional Response:**
This is THE page. If I'm a scared MI pilot, this is where I will spend the most time, and it does not disappoint.

**What Works Well:**
- *"Your Roadmap Back to the Cockpit"* -- the headline alone gives hope
- *"A cardiac event doesn't have to end your flying career"* -- the opening sentence is exactly what I need to hear
- *"Your Cardiologist Treats Your Heart. We Get You Back in the Air."* -- this is the single best line on the entire site. It draws a clear distinction between my local cardiologist (who has no idea about FAA) and MACH I (who exists for this specific purpose)
- The Conditions grid lists "Coronary Heart Disease" first with "MI, CABG, stenting, angioplasty, angina, and coronary artery disease with significant stenosis" -- I see my exact condition listed. This matters enormously. I'm not an edge case; they've seen this before.
- The 5-step process (Consultation > Records & Intake > Evaluation > FAA Submission > Authorization) demystifies what felt like an impossible bureaucratic maze
- "Not Sure Where You Fit?" card with a direct phone CTA is well-placed
- AASI program mention for renewals -- "your AME can issue your certificate same-day" -- this gives me a vision of the future where this isn't a perpetual nightmare
- "Authorization lasts 5 years with annual follow-up testing" -- concrete, reassuring

**What Gives Me Pause:**
- No timeline expectations. How long does this typically take from first call to FAA authorization? 3 months? 6 months? A year? For someone who's grounded, every day matters. Even a range ("typical cases resolve in 4-8 months") would help.
- No discussion of waiting periods. After an MI, the FAA typically requires a 6-month waiting period before Special Issuance can be granted. Not mentioning this could set unrealistic expectations -- or worse, make the pilot wonder if these people actually know the rules.
- No success rate data. "We've helped hundreds of pilots" appears elsewhere, but this page should be more specific. "Over 90% of our cardiac special issuance candidates receive authorization" (if true) would be transformative.
- The conditions list doesn't mention what conditions are generally NOT eligible. Managing expectations is important. If someone has a condition that makes flying genuinely unsafe, telling them upfront builds trust.
- No FAQ section. Scared pilots have predictable questions: "Can I fly while my application is pending?" "What if I'm denied?" "How much does the whole process cost?" "Does insurance cover any of this?" "Will I have restrictions on my certificate?"

---

### 5. Publications Page (publications.html)

**Emotional Response:**
This is the credibility page. It's not where I'll spend the most time, but scanning it makes me think: "This guy isn't just a cardiologist who also does FAA stuff -- he IS aviation cardiology."

**What Works Well:**
- NATO Aviation Cardiology Series (10 papers in Heart/BMJ) is prominently featured
- PubMed links for verification -- any skeptic can click through and confirm
- NATO Science & Technology Award 2024 is recent and prestigious
- The Fundamentals of Aerospace Medicine textbook chapter -- "the definitive textbook in the field" -- reinforces "wrote the book" claim from the homepage
- Professional Leadership Positions laid out clearly

**What Gives Me Pause:**
- This page is more for SEO and credibility-by-depth than for scared pilots. That's fine, but it's currently the 5th nav item. Most scared pilots will go Home > Special Issuance > Contact. This page is for the analytically-minded pilot who wants to verify claims before calling.
- Some PubMed links are present, some are not. Inconsistency might make someone wonder about the ones without links.
- "100+ Career Publications" is mentioned but only ~15 are listed. Consider adding a note like "Selected publications shown. Full CV available on request."

---

### 6. Contact Page (contact.html)

**Emotional Response:**
Clean, professional, multiple ways to reach out. The phone number is HUGE at the top -- exactly right.

**What Works Well:**
- Phone number displayed at massive size: "(937) 668-6974" -- clickable, dominant
- Hours clearly stated: Mon-Fri 8:00 AM - 5:00 PM EST
- Form is simple and not overwhelming (6 fields + message)
- "Service of Interest" dropdown includes "Special Issuance Evaluation" as an option
- "Pilot Certificate" dropdown is a nice touch -- shows they understand their audience
- "Free Initial Consultation" callout card in the sidebar is strategically placed
- Google Maps embed shows the office location
- "Patients Come From Across the Country" section with nearby airports (DAY, MGY) -- speaks directly to out-of-towners who would need to fly in
- Hotel accommodation mention -- practical and thoughtful
- Bottom CTA: "We understand the urgency of aviation medical issues" -- validates my emotional state

**What Does NOT Work:**
- **CRITICAL: Form submission returns a 404 error.** I filled out the form completely as a scared MI pilot with a heartfelt message and hit "Send Message" -- the browser went to a 404 "Page not found" error. This is devastating. A pilot who can't bring himself to call (phone anxiety is real, especially when you're scared of bad news) just hit a brick wall. This must be fixed before the site goes live.
- Email address is medicalaerospacecardiology@gmail.com -- a Gmail address for a premium medical consultancy undermines credibility. Should be something like info@medicalaerospacecardiology.com or contact@mach-i.med (on a custom domain).
- "We'll respond within one business day" -- for a scared pilot, one business day feels like an eternity. Consider adding "For urgent cases, call us directly" next to this.
- The Google Maps embed uses a generic address lookup (no Google Place ID), which may not show the correct pin/business marker. Should be verified.

---

### 7. Intake Page (intake.html)

**Emotional Response:**
This is a comprehensive intake form that would be appropriate after initial contact. It's well-organized with clear sections.

**What Works Well:**
- Organized into logical sections: Contact Information, Aviation Background, Medical Information, What Brings You to MACH I
- "Primary Cardiac Condition" dropdown includes "Coronary Artery Disease / Heart Attack (MI)" as the first option -- I see my condition immediately
- "Current Medical Certificate Status" includes "Deferred" -- my situation
- The "What Happens Next?" section at the bottom sets clear expectations (4 steps)
- Privacy Notice about HIPAA-compliant upload for medical records -- shows they take data security seriously
- The disclaimer about "preliminary intake only" manages expectations

**What Does NOT Work:**
- **CRITICAL: Form submission returns a 404 error (Netlify "Page not found").** Same issue as the contact form. Both forms are completely broken.
- **This page is an orphan.** No page on the site links to intake.html. It's not in the navigation, not linked from the contact page, not referenced anywhere. How is anyone supposed to find it? It should be linked from the contact page (e.g., "Already spoken with us? Complete your intake form") or sent as a direct link after the initial consultation.
- Date of Birth field uses a browser date picker that shows "mm/dd/yyyy" but requires ISO format (yyyy-mm-dd) internally. On some browsers this works fine; on others it could confuse users.
- No progress indicator for the form -- it's long enough that users might wonder how much more there is.
- No "save and continue later" capability -- if someone gets interrupted filling out medical history, they lose everything.

---

## Cross-Cutting Issues

### Functionality

| Issue | Severity | Details |
|-------|----------|---------|
| Contact form 404 on submit | CRITICAL | Both forms POST to the same page URL, returning 404. Netlify Forms may not be enabled in the Netlify dashboard, or the deploy didn't detect the `data-netlify="true"` attribute. |
| Intake form 404 on submit | CRITICAL | Same root cause as contact form. |
| Intake page is an orphan | HIGH | No internal links point to intake.html. Unreachable except by direct URL. |
| Gmail email address | MEDIUM | medicalaerospacecardiology@gmail.com undermines premium positioning. |
| No headshot photos | MEDIUM | "ED" and "AY" placeholder circles instead of real photos of the doctors. |
| Google Maps Place ID missing | LOW | Map embed uses coordinates + text address but no Place ID. May show generic pin. |

### Mobile Responsiveness

Mobile rendering is generally good:
- Hamburger menu works properly (opens, closes, has X icon)
- Content reflows well on iPhone-size viewport (375px)
- Phone numbers are tap-to-call on mobile
- Forms are usable on mobile
- Font sizes are readable
- No horizontal scrolling issues observed
- Service cards stack vertically as expected

### Navigation & Links

- All main nav links work (Home, About, Services, Special Issuance, Publications, Contact)
- "Call Now" button in nav is a tel: link -- works
- Footer links all work
- Service page hash anchors (#aviation, #cardiology, etc.) work correctly
- Extensionless paths (/special-issuance, /contact, /services) resolve correctly via Netlify's pretty URLs
- Skip-to-content link is present for accessibility

---

## The Emotional Journey

Here's what it feels like to browse this site as a scared MI pilot:

1. **Homepage:** Relief. Someone specializes in exactly my problem. And not just someone -- THE someone. The FAA's own consultant. Hope stirs.

2. **Special Issuance page:** More hope, now grounded in specifics. My condition is listed. There's a process. It has steps. It ends with "You get cleared to fly." I can see a path.

3. **About page:** Trust builds. These aren't generalists dabbling in aviation medicine. This is a retired Colonel who chaired the NATO working group and wrote the FAA's cardiac waiver guides. He's also a pilot. He gets it.

4. **Services page:** Clarity. I know what it costs ($1,200 for the evaluation, free for the initial consultation). That's less than a month of hangar rent. I can do this.

5. **Contact page:** Decision point. I see the phone number. I see the form. I decide to fill out the form first because I'm nervous about calling. I write a heartfelt message about my MI. I hit Send.

6. **404 error:** Gut punch. The site is broken. Did my message go through? Should I call? Is this practice even real? The emotional momentum built over 10 minutes of browsing crashes into a dead page.

That 404 is not just a bug. It is the site's single biggest problem. Everything else about this site is excellent-to-very-good. The 404 undermines all of it.

---

## Prioritized Recommendations

### CRITICAL (Must fix before any real traffic)

1. **Fix form submissions.** Both the contact form and intake form return 404 on POST. Root cause: Netlify Forms processing is likely not enabled or not detecting the forms during deploy. Check the Netlify dashboard under Forms to see if "contact" and "intake" form names are registered. If not, the forms need to be in static HTML (not JS-injected) for Netlify to detect them at build time. The form HTML looks correct (`data-netlify="true"`, hidden `form-name` field), so the issue is likely on the Netlify configuration side. Also consider adding an `action` attribute pointing to a thank-you page (e.g., `action="/thank-you.html"`) for a better post-submission experience.

2. **Create a thank-you/confirmation page.** Even when forms work, the default Netlify success page is generic. Create a custom page that says "Thank you -- we received your message and will respond within one business day. For faster response, call (937) 668-6974."

3. **Link the intake page from somewhere.** Add a link from the contact page or special issuance page. Something like: "Already spoken with our team? Complete your intake form to get started." Without a link, the page is invisible.

### IMPORTANT (Should fix before promoting the site)

4. **Add photos of both doctors.** Professional headshots of Dr. Davenport and Dr. Young. This is a trust-critical element for a medical practice website. The placeholder initial circles look like the site is under construction.

5. **Add at least 2-3 patient testimonials.** Ideally from pilots who had cardiac events and got back in the air. First name and type of event is enough: "After my MI, I was told I'd never fly again. Dr. Davenport had me back in the cockpit in 8 months. -- Robert M., Private Pilot, SR22." This is the single most persuasive content missing from the site.

6. **Add timeline expectations to the Special Issuance page.** Something like: "Timeline varies by condition and case complexity. Initial MI cases typically receive FAA authorization within 6-12 months of the cardiac event, including the FAA's mandatory observation period." This manages expectations and demonstrates expertise.

7. **Add an FAQ section to the Special Issuance page.** Address the questions every scared pilot has:
   - How long does the process take?
   - What are my chances of approval?
   - Can I fly while my application is pending? (No.)
   - What does it cost total, including tests?
   - Does insurance cover any of this?
   - What happens if I'm denied?
   - Are there restrictions on my certificate after Special Issuance?
   - Do I have to come to Dayton?
   - What about BasicMed -- is that an option for me?

8. **Replace the Gmail address** with a custom domain email. For a practice positioning itself as the nation's premier aviation cardiology consultancy, a Gmail address is incongruent. Even forwarding from info@medicalaerospacecardiology.com to the Gmail would be an improvement.

9. **Mention the FAA's mandatory waiting period** on the Special Issuance page. For MI specifically, there's typically a 6-month observation period. Not mentioning this risks: (a) the pilot feeling misled when they find out, or (b) the pilot thinking MACH I doesn't know the rules. Address it head-on: "The FAA requires a minimum observation period after cardiac events -- but that doesn't mean you have to wait to start the process. We begin working on your case immediately so that when the waiting period ends, your documentation is ready."

10. **Add a "What if I'm not a candidate?" note** to the services page under Special Issuance. Something like: "We provide an honest assessment during your free consultation. If Special Issuance isn't viable for your situation, we'll tell you -- before you spend a dollar."

### NICE TO HAVE (Polish items for later)

11. **Add a sticky phone CTA on mobile.** On mobile, as the user scrolls past the hero, the phone number disappears. A small persistent "Call Now" bar at the bottom of the screen on mobile would improve conversion.

12. **Add estimated timelines to the 5-step process.** Step 1: Consultation (same week). Step 2: Records (1-2 weeks). Step 3: Evaluation (scheduled within 2 weeks of records). Step 4: FAA Submission (within 1 week of eval). Step 5: Authorization (FAA review takes 4-8 weeks typically).

13. **Consider an "Is This You?" section** on the homepage or Special Issuance page: "You just had a cardiac event. Your AME said your medical is suspended. You've been Googling 'can I fly after a heart attack' for hours. You're wondering if your flying career is over. It's not. Call us." -- Speaking directly to the user's current emotional state and search behavior.

14. **Add BasicMed discussion.** Many pilots post-cardiac-event wonder about BasicMed as an alternative to Special Issuance. A brief section explaining when BasicMed is and isn't an option would demonstrate comprehensive knowledge and prevent pilots from going down the wrong path.

15. **Consider adding a "For AMEs" section or page.** AMEs who encounter cardiac patients often don't know where to refer them. A brief section aimed at AMEs could generate referrals.

16. **Publications page -- add more PubMed links.** Some publications have links, some don't. Consistency builds trust.

17. **Add a direct link to the Google Maps listing** (not just an embed) so patients can get directions with one tap.

18. **Consider after-hours messaging.** "It's after hours? Leave a message at (937) 668-6974 or fill out the form below, and we'll respond first thing tomorrow morning."

---

## What Would Make Me Pick Up the Phone

After browsing this site, here is what pushes me toward calling vs. what makes me hesitate:

**Pushing me toward calling:**
- "The Cardiologist Who Wrote the Book on Flying After a Heart Event" -- THE authority
- "Your Cardiologist Treats Your Heart. We Get You Back in the Air." -- they understand the gap
- Free consultation -- no financial risk
- My condition (MI) is explicitly listed
- Clear 5-step process -- I can see the road ahead
- FAA Cardiovascular Specialty Consultant title -- he works WITH the FAA, not against it
- Phone number is everywhere, huge, clickable

**Making me hesitate:**
- No photos of the doctors -- I can't see who I'd be trusting
- No patient testimonials -- I have to take their word for it
- No timeline expectations -- I don't know how long this takes
- Broken forms -- if I can't bring myself to call, I'm stuck
- Gmail address -- is this really a premium practice?
- No mention of success rates -- "hundreds of pilots" is vague

**Bottom line:** The content is 85% of the way to being phenomenal. Fix the forms, add photos, add a couple testimonials, and add timeline/FAQ content to the Special Issuance page, and this site will be a conversion machine for scared pilots.

---

## Comparison to Expectations for a Premium Medical Consultancy

**Exceeds expectations:**
- Messaging clarity and emotional resonance
- Credential presentation
- Value proposition differentiation
- Transparent pricing
- Phone-forward conversion design

**Meets expectations:**
- Visual design (dark navy + gold = authority + premium)
- Mobile responsiveness
- Page structure and information architecture
- Navigation

**Below expectations:**
- No doctor photos (dealbreaker for a medical practice)
- Gmail email address
- No patient testimonials or success metrics
- Broken forms
- No FAQ/education content
- Orphan intake page
