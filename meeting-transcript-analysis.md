# Eddie Review Call — Transcript Analysis

**Date:** 2026-02-23
**Analyst:** Pepper (Comms Lead, MACH-I Website)
**Participants:** Scott Hutchinson, Dr. Eddie Davenport
**Raw transcript:** `research/eddie-review-call-transcript.md`

---

## 1. Action Items

### Eddie's To-Dos

| # | Action Item | Context |
|---|------------|---------|
| E1 | **Review entire website content** — go through every page, dictate corrections, email audio/text to Scott | Scott said "whatever is the fastest easiest way... if you want to just dictate it, that's fine. You can even send me an audio file and Claude will deal with it." Eddie agreed. |
| E2 | **Review all 9 special issuance condition cards** for medical accuracy (waiting periods, required tests, timelines, "strong case" factors) | Scott: "I don't trust any of this... it all needs to be reviewed." Eddie: "I'll review everything I can get back to you." |
| E3 | **Review FAQ answers** on the special issuance page | Same as above — all AI-generated content needs Eddie's sign-off. |
| E4 | **Provide Dr. Young's credentials** if Young is staying on the aerospace site | Scott asked for them specifically. |
| E5 | **Get Mac Studio specs** and send to Scott | Eddie: "I'll get the specs on my studio." Scott: "I'm sure it's fine. Even the cheapest studio would be fine." Eddie said ~$2K. |
| E6 | **Create a Netlify account** at netlify.com ($9/month personal plan) | Scott told him to go ahead and do it now. Eddie asked "should I go ahead?" — Scott said yes. |
| E7 | **Create a Fastmail account** (Family plan, $140/year) | Scott recommended it during the call. Eddie agreed. |
| E8 | **Choose a new shorter domain name** from the candidates list | Scott surfaced options live: Mach One Cardiology, Flying Heart Doc, Cleared to Fly, Fly Mach One Med, etc. Eddie needs to pick one. |
| E9 | **Send more photos / art** — anything reflecting the practice, the vibe he wants | Scott: "more pictures would be helpful. Any sort of art would be great. Just if you hand me a stack of pictures." |
| E10 | **Provide style/color feedback** on the current site design | Scott: "if you like the coloring on the site or you want something different, any sort of style updates, just describe what you'd like." |
| E11 | **Have Mac Studio set up and accessible** for next session | Scott: "next time we get together, let's also have your studio set up someplace. Probably best that you're in front of it." |

### Scott's To-Dos

| # | Action Item | Context |
|---|------------|---------|
| S1 | **Process Eddie's dictated corrections** when received — feed to Claude, update site | Scott committed to this workflow. |
| S2 | **Deploy the Eddie Review Checklist** to the live site so Eddie can see it in one place | Done during the call — checklist appeared on the site. |
| S3 | **Set up VPN/remote access** to Eddie's Mac Studio in next session | Scott: "we can set up a VPN and I can help you, I can have my cloud actually control yours." |
| S4 | **Create a Claude package** for Eddie's machine so his Claude doesn't have to start from scratch | Scott: "my cloud will create a package for your cloud, so that your cloud doesn't have to recreate the wheel." |
| S5 | **Lock down/secure Eddie's Studio** | Scott: "It's also going to need to be locked down. So everything that you're doing has to be secured." |
| S6 | **Update credential corrections** on site — NATO role fix and cardiology subspecialty correction | Already partially done live during the call (NATO fix deployed). Cardiology subspecialty needs updating. |
| S7 | **Consider Oshkosh speaking slot** for Eddie | Scott: "It's not too late to do to go to Oshkosh and give a talk." |
| S8 | **Migrate DNS** from Wix to Netlify once domain is chosen and site is approved | Discussed but depends on Eddie picking domain + approving content. |

### Both / Joint

| # | Action Item | Context |
|---|------------|---------|
| B1 | **Schedule next working session** with Eddie in front of his Mac Studio | For Studio setup, VPN, Claude installation, security lockdown. |
| B2 | **Coordinate YouTube interview timing** — site must be live on real domain before it airs | Pat Brown / Jamie / Mad Props Aero want Eddie on; Scott wants site ready first. |

---

## 2. Key Decisions Made

1. **Keep the free consultation** but shrink its scope — it becomes a brief "here's what I need, here's what it costs" call, not a full hour. Eddie's personal touch (answering the phone) is a competitive differentiator vs. Ariano.

2. **No scheduler on the site** for now — too risky with unfiltered inbound. Forms + email follow-up is the workflow.

3. **Split aerospace cardiology and sports cardiology** into two separate websites — Scott's recommendation, Eddie agreed. Don't blend the brands.

4. **Wix stays as a redirect** — keep the existing Wix domain for SEO continuity, redirect to the new Netlify site.

5. **Netlify for hosting** ($9/mo) — Eddie to create his own account. Currently running on Scott's account.

6. **Fastmail for email** — Family plan ($140/year), supports multiple domains and multiple inbound addresses (info@, eddie@, etc.). API-accessible for Claude automation.

7. **Eddie's Mac Studio as primary dev/ops environment** — always-on machine at home or office, running Claude agents, VPN-accessible from MacBook.

8. **Eddie will dictate corrections** rather than type them — fastest path for a busy doctor. Audio files acceptable; Claude will process.

9. **New shorter domain needed** — current `medicalaerospacecardiology.com` is too long. Candidates surfaced live: Mach One Cardiology, Flying Heart Doc, Cleared to Fly, Fly Mach One Med. Eddie to choose.

---

## 3. Eddie's Feedback on the Site

### Positive
- **"I really like the site. I think that's one way to just go live."** — His first substantive comment was very positive.
- He confirmed the NATO fix deployed correctly: "Yeah, it did. Yeah, it's all fixed."
- He was engaged and excited: "I'm excited, I'm excited to see if this all works out."
- He was impressed by the live-update capability (checklist appearing on site in real time): "Sweet, great."

### Needs Changing
- **Credential corrections** (see Section 4 below).
- **Special issuance condition cards** — Scott himself said "I don't trust any of this" and Eddie needs to verify all medical content. Eddie acknowledged: "I'll review everything."
- **FAQ answers** — same, need Eddie's sign-off.
- **Scott (not Eddie) said** he's "not crazy about the way each of these things lay out" regarding the condition cards — but this was Scott speaking from his own review perspective, wanting Eddie to validate the medical accuracy and the user experience of condition-specific checklists.
- **More photos needed** — site is currently stock-photo heavy.
- **Style feedback pending** — Eddie hasn't commented on colors/design yet; Scott explicitly asked for this.

---

## 4. Credential Corrections

These were given verbally during the call and need to be applied to the site:

### NATO Working Group
- **WRONG:** Chairman of the NATO Aviation Cardiology Working Group
- **RIGHT:** **Prior Chair** of the NATO Aviation Cardiology Working Group, **current member**
- Progression was: Deputy Chair -> Chair -> Member (current)
- He is still an active member of the NATO Working Group

### Cardiology Subspecialty
- **WRONG:** Board-certified in interventional cardiology (or whatever is currently on the site)
- **RIGHT:** Board-certified in **Cardiology** and **Internal Medicine**
- He is **invasive, non-interventional** — this is the correct subspecialty descriptor
- Can be listed as "invasive cardiologist" for simplicity ("they won't know the difference and that's fine")
- **Nuclear qualified** — Eddie said to keep this: "I guess we can keep that if that sounds cool"
- He is **NOT** interventional, **NOT** non-invasive

### Dr. Young's Role (Clarified)
- Pulmonologist, works for the **Air Force Aeromedical Consult Service**
- Can run CPETs (cardiopulmonary exercise tests)
- Can do pulmonary function tests, spirometry, "all the lung stuff"
- Is an AME, but **active duty military** — can only do AME exams for military personnel
- For civilian patients: he does the pulmonary work, Eddie does the AME parts
- **Cannot** do an official AME exam for civilians

---

## 5. Business Model / Pricing Discussion

### Current Volume
- **Special issuance cases** (like Scott's): ~1 per week
- **Regular AME exams** (no complications): 0-5 per week, variable. "That's the easy money."

### Free Consultation
- Scott asked whether to keep the free consult. Scott (the developer, relaying his own recommendation) said **keep it, but shrink the scope**.
- Make it a brief call: "here's what I need, here's what it costs."
- Eddie's personal accessibility (actually answering the phone) is his competitive edge vs. Ariano and others.

### Initial Evaluation Pricing
- Scott recommended **charging for the records review / go-no-go decision** — it's considerable work, and if the answer is "no-go," there's no downstream revenue.
- Referenced **Ariano charges ~$1,200** for the initial evaluation.
- Scott indicated that's "probably reasonable if you send a whole boatload of stuff."
- After the eval, Eddie generates a quote for the full paperwork build. Exam is additional (~$1,000 or whatever).

### Patient Checklists
- Scott wants condition-specific checklists of "here's everything you need" with timing requirements — so patients don't show up with stale tests (e.g., echo that's 2 months old when it needs to be current).
- This is already partially on the site via the condition cards, but needs Eddie's review for accuracy.

### Retention Strategy
- Scott recommended building a patient database with automatic follow-up for recurring medicals (e.g., first class every 4 months — system reminds patient to schedule).
- "It takes more effort to get a new customer than it does to keep them."

---

## 6. Technical Decisions

### Hosting
- **Netlify** confirmed as hosting platform. Currently on Scott's account ($9/mo).
- Eddie to create his own Netlify account. Site will be transferred.
- Wix will remain as a redirect to preserve SEO.

### Email
- **Fastmail** chosen over Gmail/Wix email.
- Family plan ($140/year = ~$12-13/month), supports up to 5 domains.
- Multiple inbound addresses per domain (info@, eddie@, etc.) all to one mailbox.
- Critical advantage: **API-accessible** — Claude can be set up to read/process emails.
- Eddie currently uses Gmail; no custom domain email yet.

### Domain
- Current domain `medicalaerospacecardiology.com` is too long ("that's a mouthful").
- Eddie did it through Wix.
- Candidates surfaced during the call:
  - **Mach One Cardiology** (available)
  - **Flying Heart Doc** (available)
  - **Cleared to Fly**
  - **Fly Mach One Med**
- `aviationcardiology.com` is taken.
- Domains are cheap ($10-12/year). Eddie to pick.

### Eddie's Mac Studio
- ~$2,000 model. Not yet used for work. No sensitive data on it.
- Plan: Set it up as always-on primary dev/ops machine.
- Scott will set up **VPN via Tailscale** for remote access.
- Scott's Claude will remote-control Eddie's machine for initial setup.
- Scott will create a **Claude package** so Eddie's Claude starts with all context.
- Machine needs to be **security-locked down**.
- Eddie also has a MacBook (bought for Christmas) — for mobile access via VPN to Studio.
- Next session: Eddie needs to be physically in front of the Studio.

### AI Agent Architecture (Future)
- Scott demonstrated his own setup: OpenClaude agents, Pepper (admin agent), student management dashboard.
- Vision for Eddie: similar patient management system with:
  - Inbound email triage (cheap AI like DeepSeek for initial sort)
  - Patient database with pipeline stages
  - Draft email responses (human-approved before sending)
  - Follow-up tracking
  - HIPAA-compliant file intake via secure links
- Scott emphasized guardrails: agents draft but don't send; strict permissions; budget limits on token usage.
- Messaging options discussed: Telegram, Discord, or desktop-only.
- This is Phase 3+ — not immediate.

---

## 7. Marketing / Growth Strategy

### YouTube — Pat Brown / Mad Props Aero / Jamie
- Pat Brown and Jamie want Eddie on their YouTube channel.
- Topic: "You just had a heart attack — what does it take to get back in the air?"
- Channel gets 60,000-100,000 views per video.
- Even 1% conversion = 600-1,000 site visits, potentially hundreds of inbound emails.
- **Critical prerequisite:** Site must be live on real domain with all content verified BEFORE the interview airs.
- Scott views the video as "a marketing event."

### Air Shows
- **Sun 'n Fun** (Lakeland, FL, 2nd week of April): Too late to get a speaking slot but Eddie is invited to attend with Scott's group. Scott offered: 9-bedroom group house, $500 deposit, fly into Kissimmee/Orlando.
- **Oshkosh / EAA AirVenture** (late July): **Not too late** to submit a speaking proposal. No pay, no expense coverage, but massive exposure. Scott: "Huge exposure."
- Eddie has never been to either show. "I've always kind of wanted to go."
- Eddie already does QR codes at presentations and sees traffic spikes (400 hits after a recent talk).

### Bigger YouTube Channels
- Scott mentioned larger channels getting 500,000 views per video would also be interested.
- Sequence: start with Pat Brown's channel, then pitch bigger channels.
- Risk: getting flooded with inbound without a system to handle it. "You go from being that friendly doctor I saw on YouTube to being the guy who never returns my emails."

### AOPA Context
- Scott described AOPA's "You Can Fly" program, Rusty Pilots seminars, AOPA ambassadors — background on the aviation outreach ecosystem that Pat Brown is part of.
- This audience (lapsed pilots, 40,000+ in AOPA's database) overlaps heavily with Eddie's potential patient base.

---

## 8. New Information

### Milan Keynote
- Eddie received an invitation **today** (2026-02-23) from the **Aerospace Society of Milan, Italy** to give a **keynote** at their annual conference, **end of May 2026**.
- They are arranging travel, tours (including a private tour of The Last Supper), and Eddie requested business class.
- He'll be coming straight from another aerospace conference in Denver.
- **This should be added to the Publications/Speaking page** once confirmed.

### Sports Cardiology Plans
- Eddie plans to expand into **sports cardiology** — a new service line.
- There is **no sports cardiology practice in Dayton** currently.
- He has cardiopulmonary testing equipment (CPETs) already.
- He is **meeting a board-certified sports cardiologist tomorrow** (2026-02-24) about potentially bringing them into the practice.
- Dr. Young would handle pulmonary components of sports cardiology.
- **Decision: Keep this on a separate website** (Scott's recommendation, Eddie agreed).

### Dr. Young's Actual Role (Clarified)
- Works for the **Air Force Aeromedical Consult Service** (not just "Air Force" generically).
- Is **active duty military** — this limits his AME scope to military patients only.
- For Eddie's civilian practice: Young does pulmonary work, Eddie handles all AME components.
- Young cannot sign off on civilian AME exams.

### Eddie's Current Practice Volume
- ~1 special issuance case per week
- 0-5 regular AME exams per week (highly variable)
- This is relevant for pricing the AI infrastructure — he doesn't have enough volume yet to justify a full-time admin, but AI automation could bridge the gap.

### Ariano Reference
- Dr. Ariano (competitor) charges **~$1,200** for initial evaluation.
- Ariano's office is described as impersonal — "You'd never get that from Ariano."
- Eddie's competitive advantage is personal accessibility.

### Eddie's Existing Wix Investment
- Paid **~$600 for Wix for 3-5 years**.
- Domain registered through Wix.
- Wix does have analytics but Eddie doesn't look at them.

---

## 9. Recommended Updates to working-notes.md

### Status Section
- Update from "Phase 1 Complete + Major Content/CTA Update" to **"Phase 2: Eddie Review In Progress"**
- Note that the review meeting happened 2026-02-23
- Eddie has action items and will be sending corrections

### Phase 2 Checklist Updates
- [x] Schedule review session(s) with Dr. D to verify content accuracy — **DONE (2026-02-23)**
- [x] Record transcript of review discussion for iteration — **DONE (saved to research/)**
- [ ] Dr. D to provide professional headshot photos — **Reminded, still pending**
- [ ] Dr. D to verify all credentials — **Partial: NATO and cardiology subspecialty corrections given verbally; full review pending**
- [ ] Dr. D to review condition card data — **Pending, Eddie will dictate corrections**
- [ ] Replace Gmail with custom domain email — **Decision made: Fastmail. Eddie creating account.**
- [ ] DNS migration — **Pending domain choice. Wix will redirect.**

### New Items to Add
- [ ] Apply credential corrections: NATO "Prior Chair, current member"; invasive non-interventional cardiologist; keep nuclear qualified
- [ ] Eddie creating Netlify account (action item from call)
- [ ] Eddie creating Fastmail account (action item from call)
- [ ] Eddie choosing new domain name (candidates provided)
- [ ] Eddie sending Mac Studio specs
- [ ] Next session: Eddie's Mac Studio setup, VPN, Claude installation
- [ ] Add Milan keynote to publications/speaking page when confirmed
- [ ] Sports cardiology — separate site, future project
- [ ] Consider Oshkosh speaking proposal for Eddie
- [ ] Sun 'n Fun attendance (April) — networking opportunity

### Session Log
- Add entry for 2026-02-23 review call with summary of outcomes

---

## 10. Recommended Updates to the Eddie Review Checklist

### Items That Can Be Partially Checked or Updated

| Checklist Item | Status | Notes |
|---------------|--------|-------|
| Bio & credentials | **PARTIAL** | NATO correction given (Prior Chair, current member). Cardiology subspecialty correction given (invasive, non-interventional; not interventional). Nuclear qualified confirmed. Full review still pending. |
| Dr. Young's credentials | **CLARIFIED** | Pulmonologist, Air Force Aeromedical Consult Service, active duty military, AME (military only), runs CPETs/PFTs. Cannot do civilian AME exams. |
| Service descriptions | **PENDING** | Eddie will review and dictate corrections. |
| Pricing | **DISCUSSED** | Free consult stays but scoped down. ~$1,200 initial eval referenced (Ariano's rate). No final pricing confirmed. |
| Special issuance condition cards | **PENDING** | Eddie committed to reviewing all. Scott said "I don't trust any of this." |
| FAQ answers | **PENDING** | Same — needs Eddie's review. |
| Phone number | **NOT DISCUSSED** | Still needs confirmation. |
| Email | **DECIDED** | Moving to Fastmail with custom domain. Gmail stays for now. |
| Address | **NOT DISCUSSED** | Still needs confirmation. |
| Hours | **NOT DISCUSSED** | Still needs confirmation. |
| Professional headshots | **REMINDED** | Still pending. |
| Patient testimonials | **NOT DISCUSSED** | Still pending. |
| Netlify account | **IN PROGRESS** | Eddie told to go create one. |
| Fastmail account | **IN PROGRESS** | Eddie told to go create one. |
| Domain registration | **CANDIDATES PROVIDED** | Mach One Cardiology, Flying Heart Doc, Cleared to Fly, Fly Mach One Med. Eddie to choose. |
| Domain migration | **DISCUSSED** | Wix stays as redirect. New domain points to Netlify. |
| Pat Brown / YouTube | **DISCUSSED** | They want Eddie on. Site must be live first. No firm date. |
| Scheduler | **DECIDED: NO** | Don't put a scheduler on the site for now. |

### New Items to Add to Checklist
- [ ] Eddie to dictate corrections (audio or text) and send to Scott
- [ ] Eddie to pick new domain name from candidates
- [ ] Eddie to create Netlify account
- [ ] Eddie to create Fastmail account
- [ ] Eddie to send Mac Studio specs
- [ ] Schedule next session (Eddie in front of Mac Studio)
- [ ] Decide: Keep Dr. Young on aerospace site or defer to sports cardiology site?
- [ ] Submit Oshkosh EAA AirVenture speaking proposal for Eddie
