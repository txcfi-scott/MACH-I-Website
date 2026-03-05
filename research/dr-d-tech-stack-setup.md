# Dr. D Practice Tech Stack — Setup Scope & Runbook

**Document type:** Remote FaceTime setup plan
**Practice:** MACH-I Aerospace Cardiology — Dr. Eddie Davenport, MD
**Prepared by:** Scott
**Status:** Pre-meeting draft — open questions need answers before finalizing

---

## Overview

This document covers the end-to-end setup of a lightweight, HIPAA-aware practice management stack for Dr. Davenport's solo aerospace cardiology practice. The core approach is simple: **Eddie installs Tailscale. Scott does everything else via SSH.**

The FaceTime call is approximately 2 hours total, structured as four steps. Eddie's active involvement is needed only for Tailscale setup (~10 min), a few GUI approvals during remote installation (~5 min of attention), and account/credential work (~30 min). Scott (and Claude Code) handle all the technical installation and configuration remotely via SSH once Tailscale is up.

The stack covers: a self-hosted OpenClaw instance for CRM and workflow automation, Google Workspace for email and calendar with a custom domain (Eddie has already subscribed; domain email setup is likely not yet complete), Patient Gain for HIPAA-compliant secure file transfers, Claude Code for website self-service editing, and GitHub for version control and remote support. Eddie has two websites/domains — his current site and the new MACH-I site (machaerospacecardiology.com) — and we'll be setting up both.

The MACH-I website (already live on Netlify) will feed patient intake forms directly into OpenClaw, triggering automated confirmation emails, calendar holds, and follow-up workflows. Dr. D will be able to update his own website using Claude Code, with all changes automatically version-controlled in GitHub so Scott can monitor and help remotely. When the call ends, Dr. D will have a fully operational system he can manage without ongoing technical support for routine operations.

---

## Tech Stack Summary

| Component | Role | Cost |
|---|---|---|
| **OpenClaw** (self-hosted, Docker) | CRM, scheduling, patient tracking, automation engine, daily briefing | Free |
| **Google Workspace** (Business Starter or higher) | Email (Gmail) + calendar (Google Calendar) with custom domain (HIPAA-appropriate for non-PHI communications) | Already purchased |
| **Patient Gain** | HIPAA-compliant secure file transfer for medical records | $99/mo |
| **MACH-I Website** (Netlify) | Public-facing intake forms; webhooks feed OpenClaw | Already deployed |
| **Docker Desktop** (Mac) | Runtime for OpenClaw; runs locally on Mac Studio | Free |
| **Claude Code** | Website self-service editing via AI-assisted CLI | Anthropic subscription (~$20/mo) |
| **GitHub** | Version control + remote safety net for website and OpenClaw config | Free (private repos) |
| **OpenAI** | OpenClaw AI backend (OAuth) | OpenAI subscription (~$20/mo) |
| **Tailscale** | Remote Access | Free (Personal plan) |

**Monthly ongoing cost:** ~$139/mo + Google Workspace subscription (already purchased)
**Setup cost:** Pre-call remote work (Scott) + ~2-hour FaceTime call with Eddie (no SaaS setup fees beyond subscriptions)

**AI subscriptions note:** Dr. D will have two separate AI subscriptions. Anthropic (for Claude Code, used to edit the website) and OpenAI (for OpenClaw's AI backend). These serve different purposes and are not interchangeable.

**HIPAA posture:** No PHI flows through email or calendar. Google Workspace handles scheduling communications only (appointment times, confirmations, reminders — no clinical content). All medical records and clinical documents transfer exclusively through Patient Gain's HIPAA-compliant portal.

---

## Pre-Call Prep (Scott does before the FaceTime call)

This section is more important than ever with a remote format. Everything Scott can do independently — either on his own machine or remotely on Dr. D's Mac Studio via Tailscale once Step 1 is complete — should be done before the FaceTime call. The FaceTime call is reserved for the Tailscale setup, things that require Eddie's passwords and logins, and training.

**The critical split:**
- **Eddie does on the FaceTime call (Step 1):** Tailscale install, Remote Login, Screen Sharing — the minimal setup required to hand over SSH access to Scott
- **Scott does remotely via SSH (Step 2):** All software installation, configuration, repo setup, automation wiring — everything else
- **Eddie does with Scott (Steps 3–4):** Account logins, Google Workspace email domain setup, training and handoff

### Pre-Build and Remote File Prep

Once Scott has SSH access (after Step 1), he deploys files to Dr. D's Mac Studio via Tailscale SSH/SCP. No USB transfers needed.

- **Pre-pull the OpenClaw Docker image** on Scott's machine: `docker pull openclaw/openclaw:latest`. Export with `docker save` if needed. Push to Dr. D's machine via Tailscale SCP once connected, or pull directly during Step 2.
- **Docker Desktop DMG** — approximately 500 MB. Confirm Dr. D's Mac Studio chip type (Apple Silicon vs Intel) before the call. Download and push via Tailscale SCP during Step 2, or install directly from docker.com via SSH command.
- **Xcode Command Line Tools** — installs via Apple's servers during `xcode-select --install`. Runs remotely via SSH in Step 2.
- **Claude Code** — npm install via `npm install -g @anthropic-ai/claude-code`. Done remotely via Tailscale SSH in Step 2.
- **Node.js** — installed via Homebrew during Step 2.

### Accounts to Create / Confirm

- [ ] **Google Workspace** — Dr. D has subscribed to Google Workspace but has probably not yet set up email on his domain. Confirm which account the subscription is tied to, what plan tier he's on, and whether he has admin access to Google Admin Console (admin.google.com). Domain email setup will be done together during Step 3.
- [ ] **Patient Gain** — decide with Dr. D whether he prefers to create this account himself before the call or during Step 3. Creating before saves 15 minutes; creating during means he owns the credentials from the start. Recommendation: do it together during Step 3 so Dr. D goes through the setup flow himself.
- [ ] **GitHub account** — create a GitHub account for Dr. D (or get his existing credentials if he has one). Scott will be added as a collaborator on all repos.

### GitHub Repos and Files to Prepare

- [ ] Create private GitHub repos for both domains/websites and OpenClaw configuration. Fork/transfer the existing MACH-I-Website repo to Dr. D's GitHub account (or create fresh and push). Also set up a repo for his current site if it needs to be managed via GitHub.
- [ ] Pre-write the `CLAUDE.md` guardrails file for the website project. This file tells Claude Code the rules for operating in the repo. Contents should include:
  - "This is a static HTML/CSS website hosted on Netlify. Do not change the build process."
  - "Always commit changes after making edits."
  - "Never delete files without explicit confirmation."
  - "Do not modify hosting configuration, DNS settings, or deployment config."
  - "Do not commit credentials, API keys, or .env files."
  - "Keep changes focused on content — text, images, page additions. Do not refactor the site architecture."
- [ ] Pre-write `.gitignore` files for both repos (exclude `.env`, credentials, Docker volumes, `node_modules`, `.DS_Store`, etc.)
- [ ] Pre-write the auto-push `launchd` plist (see Step 2 details below)
- [ ] Have Tailscale already running on Scott's machine before the call starts

### Domain and DNS

- [ ] Confirm Dr. D's domain registrar for **both** domains — his current site and machaerospacecardiology.com (GoDaddy, Namecheap, Google Domains, Squarespace, etc.). Get login access before the call or confirm Dr. D can log in during Step 3.
- [ ] Identify the correct DNS zone for each domain — both domains may already have Netlify nameservers or A records for their websites. Google Workspace MX records need to coexist with existing website DNS, not replace it.
- [ ] Pre-write the exact DNS records to add for Google Workspace:
  - MX records (Google provides 5 priority-tiered MX records pointing to aspmx.l.google.com and alternates)
  - SPF TXT record: `v=spf1 include:_spf.google.com ~all`
  - DKIM TXT record (generated in Google Admin Console → Apps → Google Workspace → Gmail → Authenticate email — must be done after custom domain is verified)
  - DMARC TXT record (can use a sensible default: `v=DMARC1; p=none; rua=mailto:dmarc@[domain]`)
- [ ] **DNS changes are ideally done 24–48 hours before the call** to allow propagation before the meeting. If Eddie hasn't provided registrar access yet, DNS changes will be done during Step 3 instead — just note the email verification delay risk.
- [ ] Pre-verify that the custom domain is not yet added to Google Admin Console, or if it is, whether it is already verified. If not yet added, this will be done in Step 3.

### OpenClaw Pre-Build on Scott's Instance

These skills should be built and tested on Scott's OpenClaw instance before the call, then deployed to Dr. D's instance remotely via Tailscale SSH during Step 2. This is the most time-intensive pre-work and should be done well in advance.

- [ ] Build and test all six skills listed in the next section
- [ ] Document any configuration variables that will need to be changed for Dr. D's instance (API keys, email addresses, domain names, webhook URLs)
- [ ] Export skills as portable packages or note the exact skill definitions to re-enter
- [ ] Test the full intake-to-confirmation flow on Scott's instance with a fake patient record
- [ ] Pre-download the OpenClaw Docker image: `docker pull openclaw/openclaw:latest` (or equivalent) — avoids a large download on Dr. D's connection during Step 2; push via Tailscale SCP once connected
- [ ] **OpenClaw auth configuration:** Confirm OpenClaw is configured to use **OpenAI OAuth** for its AI backend. Dr. D will use his own OpenAI subscription for this. Document the OpenAI API key setup steps in OpenClaw config.

### Netlify Webhook

- [ ] Identify the correct Netlify form (the intake form on intake.html) for both the MACH-I site and any intake form on Eddie's current site
- [ ] Determine the webhook format Netlify sends on form submission
- [ ] Pre-write the OpenClaw webhook handler configuration — so during Step 2 it's paste-and-configure, not build-from-scratch
- [ ] Test the webhook on Scott's instance with a Netlify test submission

### Credentials and Tokens to Gather

- [ ] Google Workspace admin credentials — confirm Dr. D has access to admin.google.com
- [ ] Gmail API OAuth 2.0 credentials — a Google Cloud project with Gmail API enabled; OAuth client ID and secret for OpenClaw (or confirm OpenClaw has a built-in Google integration that handles this)
- [ ] Google Calendar API credentials — typically the same OAuth app as Gmail if using a single Google Cloud project
- [ ] Netlify API token (for webhook configuration, if needed)
- [ ] Patient Gain API credentials (if Patient Gain offers an API for generating upload links programmatically)
- [ ] OpenAI API key (for OpenClaw AI backend)

### Decisions to Make Before the Meeting

- [ ] **What email address format does Dr. D want?**
  - `eddie@mach-i.com` (informal, easy to type)
  - `dr.davenport@mach-i.com` (formal, professional)
  - `edward.davenport@mach-i.com`
  - `info@mach-i.com` for general inquiries + a personal address for direct contact?
  - Does he want a separate address for patient communications vs. administrative?
- [ ] **Does Dr. D want SMS/Telegram notifications** in addition to email for the daily briefing, or is email sufficient?
- [ ] **Calendar migration:** does he have an existing calendar (iCloud, a personal Google account) to import, or starting fresh?
- [ ] **What Google Workspace plan tier does Dr. D have?** Business Starter, Business Standard, or higher. This affects storage limits and API quotas.
- [ ] **Does Dr. D have admin access to Google Admin Console?** (admin.google.com) — required to verify the custom domain, configure MX records, and generate DKIM keys. If he does not have admin access, this needs to be resolved before the call. Note: if domain email is not yet set up (likely), we will do this together during Step 3.

---

## OpenClaw Skills to Build

### 1. Lead Intake Agent

**What it does:** Monitors incoming Netlify form submissions via webhook. When a new intake form is submitted, creates a contact record in OpenClaw tagged as "Lead," sends an automated confirmation email to the patient via Gmail, and creates a calendar hold for an initial consultation in Google Calendar.

**APIs/services it connects to:**
- Netlify webhook (inbound trigger)
- OpenClaw contacts API (create/update contact record)
- Gmail API (send confirmation email via OAuth 2.0)
- Google Calendar API (create calendar hold)

**What needs to be configured on Dr. D's instance:**
- Netlify webhook URL pointing to Dr. D's OpenClaw endpoint
- Gmail API OAuth 2.0 credentials (client ID, client secret, refresh token)
- Confirmation email template (Dr. D's name, practice name, phone number)
- Default calendar hold duration and buffer time preferences

**Estimated build complexity:** Moderate — webhook handler + two outbound API calls + template customization. Note: OpenClaw has a native Gmail integration via Pub/Sub triggers, which may simplify the email side significantly compared to a custom JMAP or SMTP integration.

---

### 2. Appointment Manager

**What it does:** Reads and writes Dr. D's Google Calendar via the Google Calendar API. Handles appointment confirmations (send confirmation email when appointment is booked), reminders (24-hour and 1-hour reminders before scheduled appointments), and cancellation handling (update contact record status, free the calendar slot).

**APIs/services it connects to:**
- Google Calendar API (read/write calendar events via OAuth 2.0)
- Gmail API (send confirmation and reminder emails)
- OpenClaw contacts API (update patient/lead status)

**What needs to be configured on Dr. D's instance:**
- Google Calendar API OAuth credentials (same Google Cloud project as Gmail)
- Target calendar ID within Google Workspace
- Reminder timing preferences (24 hours before, 1 hour before, or other)
- Email templates for confirmation, reminder, and cancellation

**Estimated build complexity:** Moderate — Google Calendar API integration requires OAuth setup; reminder scheduling needs a cron-style polling loop

---

### 3. Patient Contact Manager

**What it does:** Provides CRUD operations on patient and lead contact records. Tracks contact lifecycle status through defined stages: Lead (inquiry submitted, not yet scheduled) → Scheduled (appointment booked) → Active Patient (has been seen) → Follow-up (needs recall/outreach) → Inactive. Allows Dr. D or Scott to query, update, and export contact records. Optionally syncs contacts to Google People API for unified contact management across Google Workspace.

**APIs/services it connects to:**
- OpenClaw internal contacts/CRM store
- Google People API (optional contact sync to Google Workspace contacts)

**What needs to be configured on Dr. D's instance:**
- Contact field schema (name, phone, email, referral source, pilot certificate type, AME information, notes, status, dates)
- Status transition rules (what triggers each stage change)
- Any custom fields specific to aerospace cardiology (FAA case number, SI type, flight class, etc.)
- Whether Google People API sync is desired (nice-to-have, not required for core function)

**Estimated build complexity:** Simple — primarily data model and query interface; other agents call this one

---

### 4. Secure Upload Trigger

**What it does:** When Dr. D (or an agent) determines that medical records are needed from a patient, generates or retrieves a Patient Gain secure upload link and sends it to the patient via Gmail. Logs in the contact record that an upload request was sent, and date/time sent.

**APIs/services it connects to:**
- Patient Gain API (generate secure upload link, if API is available; otherwise uses a pre-configured shareable link)
- Gmail API (send upload request email to patient via OAuth 2.0)
- OpenClaw contacts API (log upload request event on contact record)

**What needs to be configured on Dr. D's instance:**
- Patient Gain account credentials / API key
- Upload request email template (explains what to upload, reassures patient about security)
- Patient Gain portal URL or link template

**Estimated build complexity:** Simple to Moderate — depends on whether Patient Gain offers an API for dynamic link generation or uses static shareable links

---

### 5. Recall and Follow-up Agent

**What it does:** Automated outreach for three scenarios: (1) annual cardiac clearance recall for established patients, (2) follow-up for scheduled patients who have not checked in after their appointment, (3) re-engagement of dormant leads who submitted an intake form but never booked. Runs on a schedule (daily check), identifies contacts due for outreach, and sends templated follow-up emails via Gmail.

**APIs/services it connects to:**
- OpenClaw contacts API (query contacts by status and last-contact date)
- Gmail API (send outreach emails via OAuth 2.0)

**What needs to be configured on Dr. D's instance:**
- Recall interval preferences (annual = 12 months from last appointment date)
- Dormant lead threshold (how many days before a lead is considered dormant and triggers re-engagement)
- Post-appointment follow-up timing (e.g., 7 days after appointment date if status not updated to "Active Patient")
- Email templates for each scenario (annual recall, post-appointment check-in, dormant lead re-engagement)

**Estimated build complexity:** Moderate — date arithmetic, multiple status-based queries, template selection logic

---

### 6. Daily Briefing Agent

**What it does:** Every morning at a configured time, generates and sends Dr. D a summary email covering: today's scheduled appointments (pulled from Google Calendar), new leads received overnight (new contacts created in the last 24 hours), pending follow-ups due today, and any Patient Gain upload links sent but not yet fulfilled (if trackable). Delivered as a clean, readable email to Dr. D's Gmail inbox at his custom domain.

**APIs/services it connects to:**
- Google Calendar API (read today's calendar events)
- OpenClaw contacts API (query new leads, pending follow-ups)
- Gmail API (send the briefing email to Dr. D)
- Patient Gain API (pending upload status, if available)

**What needs to be configured on Dr. D's instance:**
- Briefing send time (e.g., 7:00 AM local time)
- Dr. D's email address as recipient
- Briefing email template/format preferences
- Time zone

**Estimated build complexity:** Simple — query aggregation and email composition; straightforward once other agents are tested

---

## FaceTime Call Runbook — 4-Step Structure

**Total estimated time (FaceTime call):** ~2 hours
**Pre-call remote work (Scott):** Additional 2–3 hours done independently before the call

The call is divided into four steps that reflect who is doing the work at each stage. Eddie's active participation is needed for Steps 1, 3, and 4. Step 2 is mostly Scott working remotely via SSH while Eddie can step away.

Have ready before the call: pre-built OpenClaw skill definitions, all credentials documented, DNS record values ready to paste, pre-written CLAUDE.md and launchd plist files, GitHub repo URLs. Scott should have Tailscale running on his machine before dialing in.

---

### Step 1: Tailscale Remote Access Setup (~10 min, Eddie does this with Scott guiding on FaceTime)

**Goal:** Eddie installs Tailscale and enables SSH and Screen Sharing. Once Scott has confirmed SSH access, Eddie's active participation is no longer needed until Step 3. This is the first thing done on the call — everything else flows from having SSH access.

1. **Install Tailscale on Mac Studio** (Eddie does, Scott guides by voice):
   - Download from tailscale.com/download → macOS
   - Open the DMG and install
   - Launch Tailscale — first launch prompts for account creation or login
   - Use Google OAuth for simplicity: sign in with Google account
   - Confirm Tailscale icon appears in menu bar and the Mac Studio shows in admin console at tailscale.com/admin/machines
   - Note the Tailscale IP address assigned to Mac Studio (typically 100.x.x.x)

2. **Enable Remote Login (SSH) on Mac Studio** (Eddie does in System Settings):
   - System Settings → General → Sharing → Remote Login
   - Click the lock icon to unlock
   - Enable "Remote Login" (allow access for: all users, or restrict to Dr. D's account)

3. **Enable Screen Sharing on Mac Studio** (Eddie does in System Settings):
   - System Settings → General → Sharing → Screen Sharing
   - Enable Screen Sharing
   - Allow access for: all users, or restrict to Scott's user

4. **Share Mac Studio with Scott via Tailscale admin console** (Eddie does):
   - Open tailscale.com/admin/machines
   - Select the Mac Studio machine
   - Click "Share" (or equivalent — look for share/invite options)
   - Enter Scott's email address to share the node

5. **Scott accepts the share and tests SSH**:
   - Scott logs into his Tailscale account and accepts the share
   - Scott opens Terminal: `ssh [eddie-username]@[tailscale-ip]` (e.g., `ssh eddie@100.64.xx.xx`)
   - On first connection, confirm the host key
   - SSH into Mac Studio confirmed working

6. **Configure Tailscale to auto-start on boot** (Scott can handle via SSH, or Eddie does in System Settings):
   - System Settings → General → Login Items → add Tailscale
   - Or configure via Tailscale's own settings if that option is available

**Checkpoint:** Scott can SSH into Mac Studio via Tailscale IP. Screen Sharing is enabled and Scott can observe Eddie's screen. Tailscale auto-starts on boot. **From this point forward, Scott handles all installation remotely. Eddie can step away and do other things while Scott works.**

---

### Step 2: Scott SSHs in and installs everything (~45 min, Eddie can step away)

**Goal:** All software installed, all configuration complete, all automations wired up — entirely via SSH. Eddie does not need to watch or participate, but may need to briefly approve a GUI dialog for Docker Desktop. Scott can see Eddie's screen via Screen Sharing and will FaceTime him if anything needs a click.

**Note on GUI approvals:** Docker Desktop requires approving a system extension when first launched — this cannot be done via SSH. Scott will see this via Screen Sharing and FaceTime Eddie to click approve. This is the only expected interruption.

#### Developer Tools & CLI Setup

1. **Xcode Command Line Tools** — provides git, make, and other Unix utilities.
   - Check if already installed: `git --version`
   - If not installed: `xcode-select --install`
   - On macOS, this may launch a dialog on Eddie's screen — Scott can see it via Screen Sharing and guide approval if needed
   - Verify: `git --version` (should print a version number, not an error)

2. **Homebrew** — the package manager used to install GitHub CLI and other tools.
   - Check if already installed: `brew --version`
   - If not installed:
     ```
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - On Apple Silicon Macs, Homebrew installs to `/opt/homebrew/` and requires adding it to PATH. The installer prints the exact commands — run them.
   - Verify: `brew --version`

3. **Node.js** — required for Claude Code CLI (npm-based install) and some MCP server tools.
   - Check if already installed: `node --version` and `npm --version`
   - Install via Homebrew: `brew install node`
   - Verify: `node --version` (should be v18 or later) and `npm --version`

4. **Python 3** — likely already present on macOS, but needed for some OpenClaw tools and scripting.
   - Check: `python3 --version`
   - If missing: `brew install python3`
   - No action needed if Python 3.9 or later is present.

5. **GitHub CLI**:
   - `brew install gh`
   - Verify: `gh --version`

6. **Docker Desktop for Mac** — the runtime for OpenClaw. This is a larger install (~500 MB DMG).
   - Push the pre-downloaded DMG via Tailscale SCP: `scp Docker.dmg eddie@100.x.x.x:~/`
   - SSH in and install via command line (or walk Eddie through double-clicking the DMG via Screen Sharing)
   - After installing, launch Docker Desktop — **this requires Eddie to briefly approve the system extension** (Scott sees the dialog via Screen Sharing, FaceTimes Eddie to click approve)
   - Wait for the Docker whale icon in the menu bar to stop animating
   - Verify: `docker --version`

7. **Claude Code CLI**:
   - `npm install -g @anthropic-ai/claude-code`
   - Verify: `claude --version`

8. **MCP Tools for Claude Code**:
   - Filesystem MCP server: `npm install -g @modelcontextprotocol/server-filesystem`
   - GitHub MCP server: `npm install -g @modelcontextprotocol/server-github`
   - Push the pre-written MCP configuration block via SCP and place it at the appropriate path
   - Verify MCP servers are registered

#### Mac Studio Foundation — OpenClaw

9. Check Mac Studio macOS version — must be macOS 12 Monterey or later for Docker Desktop compatibility.
10. Confirm Docker Desktop is running (whale icon in menu bar, steady).
11. Push the OpenClaw Docker Compose setup via Tailscale SCP: `scp -r openclaw-config eddie@100.x.x.x:~/`
12. Create project directory: `mkdir ~/openclaw && cd ~/openclaw`
13. Place the `docker-compose.yml` in that directory, edited for Dr. D's configuration (data directory, port, environment variables).
14. Start the stack: `docker compose up -d`
15. Verify OpenClaw is running: `curl http://localhost:PORT` to confirm the service responds.
16. Set Docker Desktop to "Start at Login" in Docker Desktop settings.

#### Git & GitHub Setup

17. Configure Git identity for Dr. D:
    - `git config --global user.name "Eddie Davenport"`
    - `git config --global user.email "eddie@mach-i.com"` (or whatever email is chosen)
18. Set up GitHub authentication via SSH key:
    - Generate a key: `ssh-keygen -t ed25519 -C "eddie@mach-i.com"`
    - Add the public key to Dr. D's GitHub account at github.com → Settings → SSH Keys
    - (Eddie may need to log into GitHub briefly to paste the key — Scott guides via FaceTime if needed)
19. Clone repos to the Mac Studio:
    - `cd ~ && git clone git@github.com:ACCOUNT/MACH-I-Website.git`
    - `cd ~ && git clone git@github.com:ACCOUNT/openclaw-config.git`
20. Verify push/pull works: make a trivial commit and push. Confirm on GitHub.
21. Add Scott as a collaborator on both repos.

#### Netlify Auto-Deploy

22. Confirm the GitHub repo is linked to the MACH-I site in Netlify dashboard:
    - Verify deploy context: branch = `main`, auto-deploy on push = enabled
    - Build command: blank; publish directory: `.`
23. Test the full pipeline: make a small change, commit, push, confirm Netlify deploy fires and the change is live.

#### OpenClaw Configuration

24. Open the OpenClaw dashboard at localhost.
25. Configure OpenAI OAuth for the AI backend:
    - Enter Dr. D's OpenAI API key (gathered in pre-call prep)
    - Test the connection
26. Set up Gmail API connection:
    - Use OpenClaw's native Gmail integration (if available) or configure OAuth 2.0 client credentials
    - Test: send a test email via OpenClaw and confirm delivery
27. Set up Google Calendar API connection:
    - Authorize with the same Google Cloud project / OAuth app as Gmail
    - Specify the target calendar ID
    - Test: confirm OpenClaw can read and create calendar events
28. Deploy pre-built skills, in order:
    - Patient Contact Manager
    - Lead Intake Agent
    - Appointment Manager
    - Secure Upload Trigger
    - Recall and Follow-up Agent
    - Daily Briefing Agent
29. For each skill, update configuration variables for Dr. D's instance:
    - Email address references (from Scott's test addresses to Dr. D's actual addresses)
    - Practice name, phone number, and contact info in email templates
    - Patient Gain credentials (will be updated after Step 3)
    - Time zone and scheduling preferences
    - Recall intervals and dormant lead thresholds
    - Google Calendar ID
30. Configure the Netlify webhook:
    - In OpenClaw, find the webhook endpoint URL for the Lead Intake Agent
    - In Netlify dashboard, navigate to MACH-I site → Forms → intake form → Form notifications → Add webhook
    - Paste the OpenClaw endpoint URL and save
31. Test the Netlify webhook: submit a test entry on the intake form (fake data). Confirm OpenClaw receives it, creates a contact record, and sends a confirmation email.

#### Remaining Automated Systems

32. **Auto-Push Safety Net:**
    - Install the pre-written `launchd` plist: copy to `~/Library/LaunchAgents/com.machi.autopush.plist`
    - The plist runs a script hourly:
      ```
      cd ~/MACH-I-Website && git add -A && git diff --cached --quiet || git commit -m "auto-save $(date '+%Y-%m-%d %H:%M')" && git push
      cd ~/openclaw-config && git add -A && git diff --cached --quiet || git commit -m "auto-save $(date '+%Y-%m-%d %H:%M')" && git push
      ```
    - Load the agent: `launchctl load ~/Library/LaunchAgents/com.machi.autopush.plist`
    - Test manually: make a small change to a file, run the script, confirm GitHub receives the commit

33. **CLAUDE.md guardrails:** Deploy the pre-written `CLAUDE.md` file into the MACH-I-Website project root.

34. **`.gitignore` files:** Verify they are in place for both repos (`.env`, `*.key`, `*.pem`, Docker volumes, `.DS_Store`, `node_modules`).

35. **Energy Saver settings:** Via SSH, set Mac Studio to prevent automatic sleep — ensures OpenClaw stays running. (Can also be done via System Settings via Screen Sharing.)

**Verification Checklist — all must pass before Step 3:**

- [ ] `git --version` — prints a version number
- [ ] `brew --version` — prints a version number
- [ ] `node --version` — v18 or later
- [ ] `npm --version` — prints a version number
- [ ] `python3 --version` — 3.9 or later
- [ ] `docker --version` — prints a version number
- [ ] `gh --version` — prints a version number
- [ ] `claude --version` — prints a version number
- [ ] Docker Desktop whale icon in menu bar is steady (not animating)
- [ ] OpenClaw dashboard accessible at localhost
- [ ] Both repos cloned; push and pull verified working
- [ ] Netlify auto-deploy confirmed working (push → site updates within 1 minute)
- [ ] All six OpenClaw agents showing as active
- [ ] Intake form webhook test: contact record created, confirmation email delivered
- [ ] Auto-push launchd agent loaded and tested; auto-commit visible on GitHub
- [ ] CLAUDE.md in place in website repo
- [ ] MCP servers visible in Claude Code settings

**Checkpoint:** All verification checks pass. Eddie can step back in — Step 3 begins.

---

### Step 3: Eddie comes back for account/login stuff (~30 min, needs Eddie's input)

**Goal:** All accounts that require Eddie's personal credentials are set up. Google Workspace email domain goes live. Patient Gain, GitHub, Anthropic, and OpenAI accounts confirmed. DNS changes made (if not already done in pre-call prep).

**Note on DNS:** If Eddie provided registrar access before the call and DNS changes were made 24–48 hours ahead, this step may just be a verification check. If DNS hasn't been changed yet, do it here and note the propagation delay risk.

1. **Google Workspace custom domain setup** (Eddie logs into admin.google.com):
   - Navigate to Domains → Manage Domains
   - Add and verify the custom domain (add the verification TXT record to DNS)
   - Add Google's MX records:
     - `ASPMX.L.GOOGLE.COM` (priority 1)
     - `ALT1.ASPMX.L.GOOGLE.COM` (priority 5)
     - `ALT2.ASPMX.L.GOOGLE.COM` (priority 5)
     - `ALT3.ASPMX.L.GOOGLE.COM` (priority 10)
     - `ALT4.ASPMX.L.GOOGLE.COM` (priority 10)
   - Add SPF TXT record: `v=spf1 include:_spf.google.com ~all`
   - Generate DKIM key in Google Admin Console → Apps → Gmail → Authenticate email → Generate new record → add to DNS
   - Add DMARC TXT record: `v=DMARC1; p=none; rua=mailto:postmaster@[domain]`
   - Create the primary Gmail address (e.g., `eddie@mach-i.com`) in Google Admin Console → Directory → Users → Add new user
   - Send a test email to a known working address (Scott's email). Confirm it sends and arrives.
   - Confirm inbound mail is working (may be delayed if MX records are still propagating)

2. **GitHub account** (Eddie logs in or creates account):
   - Log in at github.com, or walk Eddie through account creation if he doesn't have one
   - Confirm Scott has collaborator access on both repos
   - If SSH key was set up during Step 2, confirm key is visible in GitHub → Settings → SSH Keys

3. **Anthropic account for Claude Code**:
   - Eddie logs into or creates account at console.anthropic.com
   - Generate an API key at console.anthropic.com → API Keys
   - Configure the key for Claude Code via SSH: set the environment variable or `claude config`
   - Verify: `claude --version` and confirm API authentication works

4. **OpenAI account for OpenClaw**:
   - Eddie logs into or creates account at platform.openai.com
   - Retrieve or generate OpenAI API key
   - Update OpenClaw's AI backend config with the key (Scott does this via SSH)
   - Test OpenClaw's OpenAI connection

5. **Patient Gain signup**:
   - Navigate to patientgain.com
   - Sign up for an account under Dr. D's credentials — walk Eddie through this himself so he owns the account
   - Complete setup: practice information, HIPAA BAA acknowledgment, portal configuration
   - Set practice name (MACH-I Aerospace Cardiology), configure upload portal
   - Generate a test secure upload link; confirm portal loads and looks professional
   - If Patient Gain provides API access, retrieve the API key
   - Return to OpenClaw → Secure Upload Trigger skill → update Patient Gain credentials

6. **DNS changes** (if not done before the call):
   - Log into the domain registrar for each of Eddie's two domains
   - Add Google Workspace MX, SPF, DKIM, and DMARC records as documented above
   - Save all DNS changes

**Checkpoint:** All accounts created and logged in. Google Workspace custom domain email confirmed (or DNS changes made with propagation expected). Patient Gain configured with a working upload link. OpenClaw updated with Patient Gain and OpenAI credentials.

---

### Step 4: Training & Walkthrough (~30 min)

**Goal:** Dr. D understands his daily workflow, knows how to use Claude Code for website edits, and knows what to do if something breaks.

#### Daily Workflow Walkthrough

1. Show Dr. D where to find his daily briefing email each morning in Gmail.
2. Open the OpenClaw dashboard. Walk through: how contacts are organized, how to search for a patient, how to update a contact's status.
3. Show how to view and manage the calendar in Google Calendar (calendar.google.com).
4. Show how to manually trigger a secure upload link for a specific patient.
5. Show how to see new leads that came in overnight.
6. Demonstrate: if Dr. D gets a phone call from a prospective patient, how to manually create a contact record in OpenClaw.

#### Integration Testing (run during or just before Step 4)

**Test Scenario 1 — Full Intake Flow:**
1. Submit the intake form on the live MACH-I website using fake patient data (name: "Test Alpha One," email: a real address you can check).
2. Confirm OpenClaw receives the webhook and creates a contact record tagged "Lead."
3. Confirm the confirmation email arrives at the test email address within 2 minutes.
4. Confirm a calendar hold is created in Dr. D's Google Calendar.
5. In OpenClaw, update the contact status to "Scheduled" and set an appointment date.
6. Trigger the Secure Upload Trigger against this contact. Confirm the upload request email is sent.
7. Update status to "Active Patient."

**Test Scenario 2 — Appointment Reminder:**
1. Manually trigger the Appointment Manager reminder function against a test record.
2. Confirm reminder email is generated correctly with the right appointment details.

**Test Scenario 3 — Daily Briefing:**
1. Manually trigger the Daily Briefing agent.
2. Confirm the briefing email arrives in Dr. D's Gmail inbox at his custom domain.
3. Confirm it correctly lists today's appointments, any new leads, and pending follow-ups.

Fix any issues discovered during testing before completing the handoff.

#### Website Updates with Claude Code

1. Show Dr. D how to open Terminal and navigate to the website project directory.
2. Demonstrate starting Claude Code with the `claude` command.
3. Walk through common requests Dr. D might make:
   - "Update the phone number on the contact page"
   - "Add a new FAQ about aviation medical exams"
   - "Change the office hours"
   - "Add a new page about a service I offer"
4. Show how to review and accept changes Claude Code proposes.
5. Show how to verify changes locally (open the HTML file in a browser).
6. Explain that changes auto-push to GitHub hourly, but Dr. D can also push manually: `git push`
7. Show how to verify changes went live on Netlify.
8. **What NOT to do with Claude Code:**
   - Don't ask it to delete files or directories
   - Don't ask it to change hosting configuration or deployment settings
   - Don't ask it to modify the site architecture or build process
   - If something seems wrong, stop and call Scott

#### Remote Support via Tailscale

1. Explain that Scott can connect to Dr. D's Mac Studio remotely anytime — this is already set up and tested.
2. Show the Tailscale menu bar icon and how to verify it's connected.
3. "If something breaks and you can't fix it, I can SSH back in and fix it. Just let me know."
4. If anything needs a GUI click, Scott can see the screen via Screen Sharing.

#### Google Calendar + OpenClaw Workflow

1. Show how the daily briefing ties Google Calendar to OpenClaw — appointments appear in both.
2. Demonstrate the flow: intake form → OpenClaw lead → calendar hold → appointment confirmed → daily briefing shows it.

#### Emergency Procedures

1. If OpenClaw appears down: open Docker Desktop → confirm the openclaw container shows as "Running." If stopped, click Start. If it won't start, call Scott.
2. If email stops working: log into Gmail directly at mail.google.com as a fallback. This always works independent of OpenClaw.
3. If the intake form stops feeding into OpenClaw: patients still get the form submission acknowledgment from Netlify. The leads are not lost — they're in Netlify's form submissions log, accessible at netlify.com. Scott can manually import them.
4. If the Mac Studio is off: Docker (and OpenClaw) only runs when the Mac Studio is on and awake. Energy Saver is set to prevent sleep, but if the machine is powered down, the automations will not fire.
5. **If the website breaks after a Claude Code edit:** Don't panic — everything is on GitHub and Scott can revert any commit remotely. Netlify can also roll back to any previous deploy. Call Scott and he can fix it without needing access to the Mac Studio.

#### Credentials Document

Prepare a simple printed or digital credentials sheet for Dr. D with:
- Google Workspace admin console URL (admin.google.com), admin email, password
- Gmail login URL (mail.google.com), custom domain email address
- OpenClaw local URL (http://localhost:PORT)
- Patient Gain login URL, email, password
- GitHub login (github.com), username, password/token
- Anthropic account login (console.anthropic.com) — for Claude Code API key management
- OpenAI account login — for OpenClaw AI backend
- Netlify login (if Dr. D needs access to form submissions)
- Domain registrar login
- Scott's contact info for technical support

#### Quick Reference Card

Leave Dr. D with a one-page reference covering:
- How to open Claude Code and make a website edit
- How to check if OpenClaw is running (Docker Desktop)
- How to find new intake leads (OpenClaw dashboard)
- How to manually send a Patient Gain upload link
- Scott's contact info and "if anything breaks, I can SSH back in"

**Checkpoint:** Dr. D can navigate to OpenClaw, find a contact, and trigger a secure upload link unassisted. He can open Claude Code and make a simple website edit. He knows where the credentials document is. He understands that Scott can connect remotely anytime via Tailscale.

---

## Post-Meeting Follow-up

### Items That Cannot Be Completed Same-Day

- **DNS propagation verification:** MX records may not be fully propagated when the call ends. Check Google Admin Console domain status 24 hours after the call. If still showing errors, troubleshoot DNS records remotely.
- **DKIM verification:** DKIM TXT records sometimes take longer to propagate. Google Admin Console → Gmail → Authenticate email will show the verification status.
- **First real intake form submission:** The first live patient submission (not a test) should be spot-checked manually to confirm the full workflow fires correctly.
- **Patient Gain HIPAA BAA:** Some Patient Gain plans require a signed Business Associate Agreement. Confirm this is in place before Dr. D sends any PHI through the portal.

### Monitoring Plan — First Two Weeks

- **Day 1 post-meeting (Scott):** Verify Google Workspace DNS is fully propagated and domain verification is green in Google Admin Console. Check that the daily briefing email fired and arrived in Gmail. Verify auto-push launchd agent is running (check GitHub for an auto-commit).
- **Day 3 (Scott):** Check OpenClaw is still running (Docker container has not stopped). Review any leads or intake submissions that came in. Verify GitHub is receiving auto-pushes.
- **Day 7 (check-in call):** Brief call with Dr. D — is the daily briefing useful? Any confusion about the workflow? Has he tried Claude Code for a website edit? Any issues to fix?
- **Day 14 (check-in call):** Is everything running smoothly? Any follow-up automation tweaks needed? Are email templates sounding right to Dr. D? Review GitHub commit history to see if auto-pushes are working.

### Ongoing Maintenance Reminders

- Google Workspace subscription renews monthly or annually depending on Dr. D's plan — ensure payment method on file is valid.
- Patient Gain subscription renews monthly.
- Anthropic subscription (Claude Code) renews monthly.
- OpenAI subscription (OpenClaw backend) renews monthly.
- Docker Desktop will occasionally prompt for updates — Dr. D should approve these when prompted (they are safe and keep Docker stable).
- OpenClaw updates: Scott handles these as they become available and are tested.

---

## Open Questions

The following need answers before the call can be finalized. Ideal to resolve at least one week before the call date.

1. **Email address format:** What address does Dr. D want? (See options in Pre-Meeting Prep.) Does he want a single address or separate addresses for patient contact vs. administrative use?

2. **Domain registrar access:** What registrar holds the DNS for each of Dr. D's two domains (his current site and machaerospacecardiology.com)? Does he have login credentials, or does someone else manage them? This is critical — without registrar access, MX records cannot be added and email won't work. Need access a few days before the call so DNS changes have time to propagate. If Eddie hasn't provided access by call time, DNS changes will happen during Step 3.

3. **Mac Studio status:** Is Docker Desktop already installed? What macOS version is it running? Has the Mac Studio received recent updates, or are there pending updates that might require a restart during the call? Ask Eddie to run updates and restart the day before.

4. **SMS or Telegram notifications:** Does Dr. D want mobile notifications for new leads or urgent items in addition to email, or is the daily briefing email sufficient?

5. **Patient Gain timing:** Does Dr. D prefer to create the Patient Gain account before the call (so it is ready to configure) or during Step 3 (so he goes through the setup himself)? Given the HIPAA BAA requirement, starting early may be wise.

6. **Existing calendar:** Does Dr. D have an existing calendar (iCloud, a personal Google account) with appointments to migrate, or is he starting fresh? If migrating from iCloud or another Google account, how much history matters?

7. **Practice phone number:** What is the contact phone number for the practice? This goes into email templates and should be finalized before building skill templates.

8. **Energy Saver / Mac Studio always-on:** Is the Mac Studio in a dedicated office location where it can stay on continuously? OpenClaw only runs when the machine is awake. If the Mac Studio is sometimes off, automations will not fire during those windows — Dr. D needs to understand this constraint.

9. **Intake form fields:** Review the current intake form on the MACH-I website to confirm it captures everything OpenClaw needs for the contact record. Are there fields to add before the webhook is configured?

10. **Google Workspace plan tier:** What plan does Dr. D have — Business Starter, Business Standard, or higher? This affects storage, API quotas, and available features. Business Starter is sufficient for this setup, but good to confirm.

11. **Google Admin Console access:** Does Dr. D have admin access to admin.google.com? This is required to verify the custom domain, configure MX routing, generate DKIM keys, and manage users. If he is not the admin on his own Workspace account, this needs to be resolved before the call. If domain email is not yet set up (expected), this entire flow will be done together during Step 3.

12. **Google account tied to Workspace:** What Google account (email address) is the Workspace subscription tied to? Is it a personal @gmail.com account that was used for purchase, or a Workspace admin account? This affects how we log into Admin Console during setup.

13. **Does Dr. D have a GitHub account?** If so, get the username. If not, we will create one during Step 3.

14. **Does Dr. D have an Anthropic account for Claude Code?** If not, we will create one and set up the API key during Step 3.

15. **Does Dr. D have an OpenAI account/subscription?** Needed for OpenClaw's AI backend. If not, we will set one up during Step 3.

16. **What level of Claude Code autonomy should Dr. D have?** Recommendation: require confirmation for all file changes (Claude Code's default behavior). The CLAUDE.md guardrails file adds additional constraints specific to the website project.

17. **Does Dr. D have a Tailscale account?** Can use Google login for simplicity. If not, we will create one during Step 1.

---

## Risk Mitigation

### Risk: DNS Propagation Is Slow

**Likelihood:** Medium. MX record propagation typically takes 15 minutes to 4 hours, but can take up to 48 hours.
**Impact:** Inbound email (mail to Dr. D's new custom domain address) will not work during the call.
**Mitigation:** Make all DNS changes at least 24 hours before the call. Outbound email via Gmail / Gmail API (OpenClaw sending emails) usually works before MX records fully propagate — outbound uses Google's SMTP servers, not inbound routing. So automated confirmations may work even if inbound is not yet live.
**Fallback:** If inbound email is not working by end of the call, Dr. D uses his existing Gmail or a temporary Google Workspace address for testing until DNS propagates. No data is lost.

### Risk: Mac Studio Needs System Updates

**Likelihood:** Low-Medium. Macs in professional settings often run behind on updates.
**Impact:** A required restart mid-call would consume 20–30 minutes and might require re-verifying Docker setup.
**Mitigation:** Ask Dr. D to run all macOS updates and restart the Mac Studio the day before the call.
**Fallback:** If updates are needed, run them first (before Step 1) before starting anything else. Adjust the call agenda accordingly.

### Risk: Docker or OpenClaw Setup Hits an Unexpected Issue

**Likelihood:** Low (pre-tested on Scott's instance), but possible due to Mac Studio hardware/OS differences.
**Impact:** Step 2 OpenClaw setup blocked; downstream phases blocked.
**Mitigation:** Pre-download the Docker image on Scott's laptop so it can be pushed via Tailscale SCP rather than pulled from the internet. Have the docker-compose.yml tested and ready to deploy remotely. Know which ports to use and what permissions Docker needs on macOS.
**Fallback:** If OpenClaw fails to start after 45 minutes of troubleshooting, continue with Google Workspace domain and Patient Gain setup in Step 3 (which are independent). Schedule a follow-up remote session to resolve Docker. Scott can troubleshoot OpenClaw independently via Tailscale SSH after the call. Dr. D can operate manually in the interim.

### Risk: Patient Gain API Is Not Available or Is Complex

**Likelihood:** Medium. Patient Gain may use a different model for link generation than expected.
**Impact:** The Secure Upload Trigger agent cannot dynamically generate unique links; it would send a static portal URL instead.
**Mitigation:** Pre-research Patient Gain's API documentation before the call. If dynamic link generation is not available, configure the agent to send a static link to Patient Gain's upload portal with Dr. D's practice identifier. This is slightly less seamless but functionally equivalent.

### Risk: Google OAuth App Verification Required for Gmail API

**Likelihood:** Low-Medium for a single-user internal setup.
**Impact:** Google may require the OAuth app used by OpenClaw to go through a formal app verification process before it can access Gmail API in production. Unverified apps can only be used by test users added explicitly in the Google Cloud Console.
**Mitigation:** For a single-user setup (Dr. D is the only user of his own OpenClaw instance), an internal/unverified OAuth app is typically sufficient — add Dr. D's Google account as a test user in the Google Cloud project. This avoids the formal verification process entirely. If OpenClaw has a pre-verified Google integration (check OpenClaw docs), use that instead of creating a custom OAuth app.
**Note:** If OpenClaw's native Gmail Pub/Sub integration handles OAuth internally (common in commercial OpenClaw distributions), this risk may not apply — the integration would already have the necessary Google approvals.

### Risk: Dr. D Breaks the Website with Claude Code

**Likelihood:** Low-Medium. Claude Code is powerful and could make unintended changes if given unclear instructions.
**Impact:** Website displays incorrect content or breaks visually.
**Mitigation:** GitHub has full commit history — Scott can revert any commit remotely within minutes. The CLAUDE.md guardrails file prevents Claude Code from performing dangerous operations (deleting files, changing build/deploy config, committing credentials). Netlify maintains a deploy history and can roll back to any previous deploy with one click. Dr. D is trained to review changes before accepting them.
**Fallback:** Scott reverts the offending commit on GitHub. Netlify auto-deploys the reverted version. Total recovery time: under 5 minutes if Scott is available.

### Risk: Auto-Push Fails Silently

**Likelihood:** Low. The launchd agent could stop running if the Mac Studio restarts and the agent is not loaded, or if there are Git authentication issues.
**Impact:** Changes accumulate locally without reaching GitHub. Scott loses visibility into what is happening on Dr. D's machine.
**Mitigation:** Set up a simple health check — a script that checks the last push timestamp and sends an alert email if no push has occurred in 48 hours. During the first two weeks, Scott manually checks GitHub for recent commits during monitoring check-ins.
**Fallback:** If auto-push is broken, Scott troubleshoots remotely via Tailscale SSH or screen share. Local changes are not lost — they are in the local Git repo.

### Risk: Credentials Committed to GitHub Repo

**Likelihood:** Low if `.gitignore` is set up correctly, but possible if Dr. D or Claude Code creates a new file with credentials.
**Impact:** API keys or passwords exposed in a private GitHub repo (limited exposure since repos are private, but still a security concern).
**Mitigation:** Proper `.gitignore` files exclude `.env`, credential files, and common secret patterns. CLAUDE.md explicitly instructs Claude Code never to commit credentials. Secrets are stored in environment variables only. Scott reviews commits during monitoring check-ins.
**Fallback:** If credentials are committed, Scott immediately rotates the affected keys, removes the file from Git history using `git filter-branch` or BFG Repo-Cleaner, and force-pushes the cleaned history.

### Risk: Mac Studio Goes Offline / Tailscale Disconnects

**Likelihood:** Low-Medium. Tailscale disconnection can occur if machine loses network, Tailscale service crashes, or the machine is powered off.
**Impact:** Scott cannot remotely SSH into or view the Mac Studio. If something breaks and Dr. D needs remote help, connectivity is lost until the issue is resolved locally or manually.
**Mitigation:** Configure Tailscale to auto-start on boot (done in Step 1). If the machine is off, Dr. D needs to power it on before Scott can connect. Consider enabling Wake on LAN if the Mac Studio supports it.
**Fallback:** If Tailscale remains unavailable, email-based support and FaceTime calls remain available. Scott can provide verbal guidance for troubleshooting remotely.

### How Dr. D Operates Manually Until Automation Is Proven

For the first 1–2 weeks, Dr. D should treat the automation as a supplement rather than a dependency. Manual fallback procedures:

- **New intake leads:** Check Netlify's form submissions log at netlify.com → site → Forms. All submissions are stored here regardless of whether the webhook fires.
- **Appointment reminders:** Google Calendar sends its own reminders natively — these work without OpenClaw.
- **Secure file requests:** Log into Patient Gain directly and copy the secure upload link to paste into a manually composed Gmail email.
- **Daily overview:** Log into OpenClaw directly and view the contacts dashboard.
- **Website updates:** If Claude Code is not working, Dr. D can call Scott to make website changes remotely via GitHub.

These manual steps cover everything if automation is partly or fully offline. Once the system is running reliably for two weeks with no manual intervention needed, it can be considered production-stable.

---

*Document version: 3.1 — restructured to 4-step call flow; Eddie installs Tailscale, Scott does everything else via SSH; pre-call DNS timing clarified; all content preserved from 3.0*
*Last updated: 2026-03-05*
*Next update: after open questions are resolved and pre-meeting prep is confirmed*
