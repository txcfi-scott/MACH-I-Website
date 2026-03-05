# Dr. D Practice Tech Stack — Setup Scope & Runbook

**Document type:** In-person setup meeting plan
**Practice:** MACH-I Aerospace Cardiology — Dr. Eddie Davenport, MD
**Prepared by:** Scott
**Status:** Pre-meeting draft — open questions need answers before finalizing

---

## Overview

This document covers the end-to-end setup of a lightweight, HIPAA-aware practice management stack for Dr. Davenport's solo aerospace cardiology practice. The goal is to deploy a complete system in a single in-person session on Dr. D's Mac Studio: a self-hosted OpenClaw instance for CRM and workflow automation, Google Workspace for email and calendar with a custom domain, Patient Gain for HIPAA-compliant secure file transfers, Claude Code for website self-service editing, and GitHub for version control and remote support. The MACH-I website (already live on Netlify) will feed patient intake forms directly into OpenClaw, triggering automated confirmation emails, calendar holds, and follow-up workflows. Dr. D will be able to update his own website using Claude Code, with all changes automatically version-controlled in GitHub so Scott can monitor and help remotely. When the meeting ends, Dr. D will have a fully operational system he can manage without ongoing technical support for routine operations.

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
**Setup cost:** One-time in-person session (no SaaS setup fees beyond subscriptions)

**AI subscriptions note:** Dr. D will have two separate AI subscriptions. Anthropic (for Claude Code, used to edit the website) and OpenAI (for OpenClaw's AI backend). These serve different purposes and are not interchangeable.

**HIPAA posture:** No PHI flows through email or calendar. Google Workspace handles scheduling communications only (appointment times, confirmations, reminders — no clinical content). All medical records and clinical documents transfer exclusively through Patient Gain's HIPAA-compliant portal.

---

## Pre-Meeting Prep (Scott does before the meeting)

These tasks must be completed before sitting down at Dr. D's Mac Studio. Arriving with these done buys roughly 90 minutes of meeting time.

### Pre-Download Installers to Avoid Meeting Delays

Large file downloads during the meeting consume time and depend on Dr. D's connection speed. Pre-download these on Scott's laptop and transfer via USB or AirDrop during Phase 1:

- **Docker Desktop DMG** — approximately 500 MB. Download from docker.com/products/docker-desktop (select "Mac with Apple Chip" or "Mac with Intel Chip" depending on the Mac Studio's processor — confirm this before the meeting). Having this on USB means Phase 1 Docker install takes seconds instead of waiting on a download.
- **Xcode Command Line Tools** — cannot be pre-downloaded as a standalone file; it installs via Apple's servers during `xcode-select --install`. However, if Dr. D's Mac Studio already has Xcode CLT installed (common on developer machines), no download is needed. Confirm in advance by asking Dr. D to run `git --version` in Terminal before the meeting.
- **Claude Code standalone installer** (if not using the npm path) — download from Anthropic's site and have it on USB.
- **Node.js pkg installer** — if nvm is not the preferred path, download the LTS .pkg from nodejs.org as a fallback in case Homebrew has issues.
- **Pre-pulled OpenClaw Docker image** — run `docker pull openclaw/openclaw:latest` on Scott's machine before the meeting, then export with `docker save` to a file on USB. On Dr. D's machine: `docker load -i openclaw.tar`. This avoids pulling a large image over Dr. D's internet connection during the meeting.

### Accounts to Create / Confirm

- [ ] **Google Workspace** — Dr. D already has Google Workspace. Confirm which account it is tied to, what plan tier he is on, and whether he has admin access to Google Admin Console (admin.google.com). No new account creation needed.
- [ ] **Patient Gain** — decide with Dr. D whether he prefers to create this account himself before the meeting or during it. Creating before saves 15 minutes; creating during means he owns the credentials from the start. Recommendation: do it together during the meeting so Dr. D goes through the setup flow himself.
- [ ] **GitHub account** — create a GitHub account for Dr. D (or get his existing credentials if he has one). Scott will be added as a collaborator on all repos.

### GitHub Repos and Files to Prepare

- [ ] Create private GitHub repos for the MACH-I website and OpenClaw configuration. Fork/transfer the existing MACH-I-Website repo to Dr. D's GitHub account (or create fresh and push).
- [ ] Pre-write the `CLAUDE.md` guardrails file for the website project. This file tells Claude Code the rules for operating in the repo. Contents should include:
  - "This is a static HTML/CSS website hosted on Netlify. Do not change the build process."
  - "Always commit changes after making edits."
  - "Never delete files without explicit confirmation."
  - "Do not modify hosting configuration, DNS settings, or deployment config."
  - "Do not commit credentials, API keys, or .env files."
  - "Keep changes focused on content — text, images, page additions. Do not refactor the site architecture."
- [ ] Pre-write `.gitignore` files for both repos (exclude `.env`, credentials, Docker volumes, `node_modules`, `.DS_Store`, etc.)
- [ ] Pre-write the auto-push `launchd` plist (see Phase 8 details below)
- [ ] Ensure Claude Code CLI installer is downloaded and ready (avoid large downloads during the meeting)
- [ ] Download Tailscale installer for Mac. Scott should have Tailscale already running on his machine.

### Domain and DNS

- [ ] Confirm Dr. D's domain registrar (GoDaddy, Namecheap, Google Domains, Squarespace, etc.) and get login access or confirm Dr. D can log in during the meeting.
- [ ] Identify the correct DNS zone — the domain already has Netlify nameservers or A records for the website. Google Workspace MX records need to coexist with the existing website DNS, not replace it.
- [ ] Pre-write the exact DNS records to add for Google Workspace:
  - MX records (Google provides 5 priority-tiered MX records pointing to aspmx.l.google.com and alternates)
  - SPF TXT record: `v=spf1 include:_spf.google.com ~all`
  - DKIM TXT record (generated in Google Admin Console → Apps → Google Workspace → Gmail → Authenticate email — must be done after custom domain is verified)
  - DMARC TXT record (can use a sensible default: `v=DMARC1; p=none; rua=mailto:dmarc@[domain]`)
- [ ] Note: DNS propagation can take 15 minutes to 48 hours. If MX records propagate slowly, email won't work during the meeting. Mitigation: complete DNS changes as early as possible before the meeting — ideally 24 hours before.
- [ ] Pre-verify that the custom domain is not yet added to Google Admin Console, or if it is, whether it is already verified. If not yet added, this will be done in Phase 4.

### OpenClaw Pre-Build on Scott's Instance

These skills should be built and tested on Scott's OpenClaw instance before the meeting, then exported/deployed to Dr. D's instance during the meeting. This is the most time-intensive pre-work.

- [ ] Build and test all six skills listed in the next section
- [ ] Document any configuration variables that will need to be changed for Dr. D's instance (API keys, email addresses, domain names, webhook URLs)
- [ ] Export skills as portable packages or note the exact skill definitions to re-enter
- [ ] Test the full intake-to-confirmation flow on Scott's instance with a fake patient record
- [ ] Pre-download the OpenClaw Docker image: `docker pull openclaw/openclaw:latest` (or equivalent) — avoids a large download during the meeting on Dr. D's connection
- [ ] **OpenClaw auth configuration:** Confirm OpenClaw is configured to use **OpenAI OAuth** for its AI backend. Dr. D will use his own OpenAI subscription for this. Document the OpenAI API key setup steps in OpenClaw config.

### Netlify Webhook

- [ ] Identify the correct Netlify form (the intake form on intake.html)
- [ ] Determine the webhook format Netlify sends on form submission
- [ ] Pre-write the OpenClaw webhook handler configuration — so during the meeting it's paste-and-configure, not build-from-scratch
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
- [ ] **Does Dr. D have admin access to Google Admin Console?** (admin.google.com) — required to verify the custom domain, configure MX records, and generate DKIM keys. If he does not have admin access, this needs to be resolved before the meeting.

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

## Meeting Day Runbook — Installation Tasks

**Total estimated time:** 5 hours 25 minutes + buffer
**Recommended meeting block:** 6 hours

Arrive with: laptop, the pre-built OpenClaw skill definitions, all credentials documented, DNS record values ready to paste, Claude Code installer, pre-written CLAUDE.md and launchd plist files, GitHub repo URLs, Docker Desktop DMG pre-downloaded (see Pre-Meeting Prep note on installer downloads).

---

### Phase 1: Developer Tools & CLI Setup (~30 min)

**Goal:** All foundational CLI and MCP tools installed and verified before anything else can run. This phase must complete before Docker, GitHub, or Claude Code setup can proceed.

#### System Prerequisites

1. **Xcode Command Line Tools** — provides git, make, and other Unix utilities that the rest of the stack depends on.
   - Check if already installed: `git --version`
   - If not installed: `xcode-select --install`
   - A dialog box will appear — click Install and wait. This takes 5–10 minutes depending on connection speed.
   - Once complete, verify: `git --version` (should print a version number, not an error)

2. **Homebrew** — the package manager used to install GitHub CLI and other tools.
   - Check if already installed: `brew --version`
   - If not installed:
     ```
     /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
     ```
   - Follow the post-install instructions. On Apple Silicon Macs, Homebrew installs to `/opt/homebrew/` and requires adding it to PATH. The installer prints the exact commands needed — run them.
   - Verify: `brew --version`

3. **Node.js** — required for Claude Code CLI (npm-based install) and some MCP server tools.
   - Check if already installed: `node --version` and `npm --version`
   - If not installed, two options:
     - Via Homebrew (simpler): `brew install node`
     - Via nvm (better for managing multiple versions, more setup): `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash` then `nvm install --lts`
   - Verify: `node --version` (should be v18 or later) and `npm --version`

4. **Python 3** — likely already present on macOS, but needed for some OpenClaw tools and scripting.
   - Check: `python3 --version`
   - If missing: `brew install python3`
   - No action needed if Python 3.9 or later is present.

#### CLI Tools

5. **Git** — already installed via Xcode CLT in step 1. No additional action needed.

6. **Docker Desktop for Mac** — the runtime for OpenClaw. This is a larger install (~500 MB DMG).
   - If pre-downloaded (see Pre-Meeting Prep): open the DMG and drag Docker to Applications
   - If not pre-downloaded: download from docker.com/products/docker-desktop — allow several minutes for the download
   - After installing, launch Docker Desktop from Applications. Approve the system extension permissions when prompted (this is expected and required).
   - Wait for the Docker whale icon in the menu bar to stop animating before proceeding.
   - Verify: `docker --version`

7. **GitHub CLI** — for repo management, authentication, and scripting.
   - `brew install gh`
   - Verify: `gh --version`

8. **Claude Code CLI** — the AI-assisted editing tool Dr. D will use for website updates.
   - Via npm: `npm install -g @anthropic-ai/claude-code`
   - Or via the standalone installer if pre-downloaded (run the `.pkg` or follow the install script)
   - Verify: `claude --version` (or `claude -v` depending on the installed version)

#### MCP Tools for Claude Code

MCP (Model Context Protocol) servers extend Claude Code with additional capabilities. These are configured in Claude Code's settings file (typically `~/.claude/claude_desktop_config.json` or equivalent). Install and configure the following:

9. **Filesystem MCP server** — allows Claude Code to read and manage local files outside the project directory if needed. Install via npm:
   ```
   npm install -g @modelcontextprotocol/server-filesystem
   ```
   Configure in Claude Code settings to point to approved directories (e.g., the MACH-I-Website project directory).

10. **GitHub MCP server** — enables Claude Code to interact with GitHub repos directly (view issues, PRs, commit history) without leaving the Claude Code session.
    ```
    npm install -g @modelcontextprotocol/server-github
    ```
    Requires a GitHub Personal Access Token. Configure in Claude Code settings with Dr. D's token.

11. **Note on MCP configuration:** All MCP servers are registered in Claude Code's configuration file. Scott should pre-write the configuration block (with appropriate paths and token placeholders) so this step is paste-and-fill rather than build-from-scratch during the meeting. MCP servers are not active until they appear in Claude Code's settings and the app is restarted.

#### Verification Checklist

Run each of these before proceeding to Phase 2 (Mac Studio Foundation). All must succeed.

- [ ] `git --version` — prints a version number
- [ ] `brew --version` — prints a version number
- [ ] `node --version` — v18 or later
- [ ] `npm --version` — prints a version number
- [ ] `python3 --version` — 3.9 or later
- [ ] `docker --version` — prints a version number
- [ ] `gh --version` — prints a version number
- [ ] `claude --version` — prints a version number (or equivalent Claude Code version command)
- [ ] Docker Desktop whale icon in menu bar is steady (not animating)
- [ ] Claude Code MCP servers visible in Claude Code settings

**Checkpoint:** All verification checks pass. Docker Desktop is running. Claude Code is installed. All MCP servers are configured. The machine is ready for the remaining phases.

---

### Phase 1b: Tailscale Remote Access Setup (~15 min)

**Goal:** Enable remote SSH and screen sharing between Scott's machine and Dr. D's Mac Studio via Tailscale private network.

1. Install Tailscale on Mac Studio:
   - If pre-downloaded DMG: open and run the installer
   - If not: download from tailscale.com/download → macOS
   - Launch Tailscale and complete the initial setup
   - Verify: Tailscale icon appears in menu bar

2. Dr. D creates or logs into Tailscale account:
   - First launch prompts for account creation/login
   - Can use Google OAuth for simplicity: sign in with Google account
   - Confirm account is created and Dr. D has access to tailscale.com admin console

3. Enable Tailscale on Mac Studio:
   - In Tailscale menu bar icon → click to toggle on
   - Confirm the Mac Studio appears in Dr. D's admin console at tailscale.com/admin/machines
   - Note the Tailscale IP address assigned to Mac Studio (typically 100.x.x.x)

4. Enable SSH on Mac Studio:
   - System Settings → General → Sharing → Remote Login
   - Click the lock icon to unlock
   - Enable "Remote Login" (allow access for: all users, or restrict to Dr. D's account)
   - Note: standard SSH will be used, not Tailscale SSH (shared nodes don't fully support Tailscale SSH yet)

5. Enable Screen Sharing on Mac Studio:
   - System Settings → General → Sharing → Screen Sharing
   - Enable Screen Sharing
   - Allow access for: all users, or restrict to Scott's user (if already on machine)

6. Share Mac Studio with Scott via Tailscale admin console:
   - Open tailscale.com/admin/machines
   - Select the Mac Studio machine
   - Click "Share" button (or equivalent — look for share/invite options in admin console)
   - Enter Scott's email address to share the node
   - Scott will receive an invite to accept the shared node

7. Scott accepts the share:
   - Scott logs into his Tailscale account
   - Accepts the share from Dr. D
   - Tailscale now shows the Mac Studio in Scott's node list (even though it's not his machine)

8. Test remote SSH connection:
   - Scott opens Terminal on his machine
   - Run: `ssh [username]@[tailscale-ip-of-mac-studio]` (e.g., `ssh eddie@100.64.xx.xx`)
   - On first connection, confirm the host key
   - Should log into Mac Studio without password if Tailscale SSH is set up, or will prompt for password if using standard SSH
   - Note: Tailscale Personal plan supports standard SSH; just use the Tailscale IP as the destination

9. Configure Tailscale to auto-start on boot:
   - System Settings → General → Login Items
   - Add Tailscale to startup apps (or use Tailscale settings if available)
   - Reboot to verify Tailscale auto-starts

**Checkpoint:** Scott can SSH into Mac Studio via Tailscale IP. Screen Sharing is enabled. Tailscale is configured to auto-start on boot.


### Phase 2: Mac Studio Foundation (~20 min)

**Goal:** Get Docker running with OpenClaw accessible at localhost. Docker Desktop was installed in Phase 1 — this phase focuses on deploying and verifying the OpenClaw container stack.

1. Check Mac Studio macOS version — must be macOS 12 Monterey or later for Docker Desktop compatibility. If updates are pending, start them immediately and work around them.
2. Confirm Docker Desktop is running (whale icon in menu bar, steady). If not running, launch it from Applications and wait for it to start.
3. Clone or copy the OpenClaw Docker Compose setup to Dr. D's machine. Options:
   - Clone from GitHub if OpenClaw has a public repo
   - Copy from Scott's instance via USB drive or AirDrop
   - Pull the pre-downloaded Docker image
4. Create a project directory: `mkdir ~/openclaw && cd ~/openclaw`
5. Place the `docker-compose.yml` in that directory, edited for Dr. D's configuration (data directory, port, any environment variables).
6. Start the stack: `docker compose up -d`
7. Verify OpenClaw is running: open a browser, navigate to `http://localhost:PORT`. Confirm the dashboard loads.
8. Set Docker Desktop to "Start at Login" in Docker Desktop settings — ensures OpenClaw restarts automatically if the Mac Studio reboots.

**Checkpoint:** OpenClaw dashboard accessible at localhost. Note the URL and port for later.

---

### Phase 3: Git & GitHub Setup (~20 min)

**Goal:** GitHub authenticated, repos cloned and ready for use. Git was installed via Xcode CLT in Phase 1 — this phase focuses on GitHub authentication and repo setup.

1. Confirm Git is working: `git --version`. If somehow missing (should not be after Phase 1), run `xcode-select --install`.
2. Configure Git identity for Dr. D:
   - `git config --global user.name "Eddie Davenport"`
   - `git config --global user.email "eddie@mach-i.com"` (or whatever email is chosen)
3. Set up GitHub authentication. Two options — choose based on Dr. D's comfort level:
   - **SSH key (recommended):** Generate a key with `ssh-keygen -t ed25519 -C "eddie@mach-i.com"`, then add the public key to Dr. D's GitHub account at github.com → Settings → SSH Keys.
   - **HTTPS with token:** Generate a Personal Access Token at github.com → Settings → Developer settings → Personal access tokens. Store it in the macOS Keychain via Git credential helper: `git config --global credential.helper osxkeychain`.
4. Clone repos to the Mac Studio:
   - `cd ~ && git clone git@github.com:ACCOUNT/MACH-I-Website.git`
   - `cd ~ && git clone git@github.com:ACCOUNT/openclaw-config.git` (or wherever the OpenClaw config repo lives)
5. Verify push/pull works: make a trivial change (e.g., add a blank line to README), commit, and push. Confirm the push appears on GitHub.
6. Add Scott as a collaborator on both repos (github.com → repo → Settings → Collaborators).

**Checkpoint:** Both repos cloned locally. Push and pull verified working. Scott has collaborator access.

---

### Phase 3b: Netlify Auto-Deploy Setup (~10 min)

**Goal:** Configure Netlify to auto-deploy the website whenever changes are pushed to the GitHub repo.

1. Open netlify.com and log into Dr. D's Netlify account (the account that hosts the MACH-I website).
2. Navigate to the MACH-I site dashboard → Site settings → Build & deploy → Repository.
3. Confirm the GitHub repo is linked (it should already be linked if the site was deployed from GitHub).
4. Configure the deploy settings:
   - **Base directory:** Leave blank (site is in root, not a subdirectory)
   - **Build command:** Leave blank (no build needed — this is static HTML/CSS)
   - **Publish directory:** `.` (or the directory containing the index.html, typically the root)
5. Verify the deploy context:
   - Branch to deploy: `main` (all pushes to main should trigger a new deploy)
   - Auto-deploy on push: should be **enabled** (default)
6. Test the full pipeline:
   - Make a small, obvious change to a file in the MACH-I-Website repo (e.g., add a comment to the HTML or change a visible color value)
   - Commit the change: `git add -A && git commit -m "Test Netlify auto-deploy"`
   - Push to GitHub: `git push`
   - Watch Netlify dashboard (netlify.com → site → Deploys) — a new deploy should start within 30 seconds
   - Wait for the deploy to complete (typically 30–60 seconds)
   - Open the live website and verify the change is visible

**Checkpoint:** Auto-deploy from GitHub to Netlify is working. A push to main repo triggers a new deploy within 1 minute. Website is live with the test change visible.

---

### Phase 4: Google Workspace Custom Domain Setup (~30 min)

**Goal:** Dr. D's custom domain is verified in Google Admin Console, Google Workspace MX records are active, and Gmail is sending and receiving on the custom domain.

1. Log into Google Admin Console at admin.google.com using Dr. D's Google Workspace admin account.
2. Navigate to Domains → Manage Domains. If the custom domain (e.g., mach-i.com) is not yet added, click "Add a domain" and follow the verification flow. If it is already listed, confirm its status.
3. Google Admin Console will provide a verification token (typically a TXT record or a meta tag). Switch to the domain registrar tab and add the verification TXT record to DNS. Return to Google Admin Console and click "Verify." Note: TXT record propagation is usually fast (minutes), but can take longer.
4. Once the domain is verified, navigate to Google Admin Console → Apps → Google Workspace → Gmail → Hosts or MX records. Google will display the required MX records. Switch to the registrar and add Google's MX records exactly as specified:
   - `ASPMX.L.GOOGLE.COM` (priority 1)
   - `ALT1.ASPMX.L.GOOGLE.COM` (priority 5)
   - `ALT2.ASPMX.L.GOOGLE.COM` (priority 5)
   - `ALT3.ASPMX.L.GOOGLE.COM` (priority 10)
   - `ALT4.ASPMX.L.GOOGLE.COM` (priority 10)
   - Remove or lower priority of any existing MX records (if this is a fresh domain, there should be none).
5. Add SPF TXT record: `v=spf1 include:_spf.google.com ~all`
6. Generate DKIM key: Google Admin Console → Apps → Google Workspace → Gmail → Authenticate email → select the domain → Generate new record. Copy the DKIM TXT record value and add it to DNS at the specified hostname (typically `google._domainkey.[domain]`).
7. Add DMARC TXT record at `_dmarc.[domain]`: `v=DMARC1; p=none; rua=mailto:postmaster@[domain]` (start with `p=none` to monitor without rejecting; can tighten later).
8. Save all DNS changes. Return to Google Admin Console and initiate domain verification / MX verification. Note: if DNS has not fully propagated, verification may show pending — this is expected. Check again in a few hours if needed.
9. Create the primary Gmail address at the custom domain: Google Admin Console → Directory → Users → Add new user (e.g., `eddie@mach-i.com`). Set a strong password. Create any additional addresses decided in pre-meeting prep.
10. Open Gmail (mail.google.com) and switch to the new custom domain account. Send a test email to a known working address (Scott's email). Confirm it sends and arrives.
11. Send a reply from that external address to Dr. D's new custom domain Gmail address. Confirm receipt. (If MX records haven't propagated, inbound mail will fail — this is the risk to mitigate by doing DNS changes 24 hours early.)

**Checkpoint:** Dr. D can send and receive email at his custom domain through Gmail. Google Workspace domain verified in Admin Console. DNS records documented.

---

### Phase 5: OpenClaw Configuration (~45 min)

**Goal:** All six agents deployed and connected to Gmail, Google Calendar, Netlify, and OpenAI.

1. Open the OpenClaw dashboard at localhost.
2. Configure OpenAI OAuth for the AI backend:
   - Navigate to OpenClaw's AI/LLM settings
   - Select OpenAI as the provider
   - Enter Dr. D's OpenAI API key
   - Test the connection — confirm OpenClaw can authenticate with OpenAI
3. Navigate to Connections/Integrations. Set up Gmail API connection:
   - If OpenClaw has a native Gmail integration (via Pub/Sub triggers), use that flow — it typically involves authorizing an OAuth app and connecting the Google account. This is the preferred path as it gives real-time email event triggers rather than polling.
   - If using a custom Gmail API connection: provide the OAuth 2.0 client ID, client secret, and complete the OAuth authorization flow. Store the refresh token securely. Scopes needed: `gmail.send`, `gmail.compose`, and `gmail.readonly` (or appropriate scopes for the use case).
   - Test the connection — send a test email via OpenClaw and confirm delivery.
4. Set up Google Calendar API connection:
   - Authorize Google Calendar API access through the same Google Cloud project / OAuth app as Gmail (if using a unified OAuth app).
   - Scopes needed: `calendar.events` and `calendar.readonly` (or `calendar` for full read/write).
   - Specify the target calendar ID (typically the primary calendar for Dr. D's Workspace account, or a practice-specific calendar if one is created).
   - Test the connection — confirm OpenClaw can read and create calendar events.
5. Deploy the pre-built skills, in order:
   - Patient Contact Manager (foundation — others depend on it)
   - Lead Intake Agent
   - Appointment Manager
   - Secure Upload Trigger
   - Recall and Follow-up Agent
   - Daily Briefing Agent
6. For each skill, update configuration variables for Dr. D's instance:
   - Email address references (from Scott's test addresses to Dr. D's actual addresses)
   - Practice name, phone number, and contact info in email templates
   - Patient Gain credentials (once Phase 6 is done — may need to return to this)
   - Time zone and scheduling preferences
   - Recall intervals and dormant lead thresholds
   - Google Calendar ID (confirm the correct calendar is targeted)
7. Configure the Netlify webhook:
   - In OpenClaw, find the webhook endpoint URL for the Lead Intake Agent
   - In Netlify dashboard (netlify.com), navigate to the MACH-I site → Forms → intake form → Form notifications → Add webhook
   - Paste the OpenClaw endpoint URL
   - Save
8. Test the Netlify webhook: submit a test entry on the intake form (use obviously fake data like "Test Patient" and a test email address). Confirm:
   - OpenClaw receives the webhook
   - A contact record is created
   - A confirmation email is sent to the test email address via Gmail
9. Configure the Daily Briefing send time and confirm the recipient address is Dr. D's custom domain Gmail inbox.
10. Set the Recall/Follow-up Agent's schedule (daily at a low-traffic time, e.g., 6:00 AM).

**Checkpoint:** All six agents show as active. Intake form test produced a contact record and a confirmation email delivered via Gmail. OpenAI integration confirmed working.

---

### Phase 6: Patient Gain Setup (~15 min)

**Goal:** Patient Gain account active with a working secure upload link ready to use.

1. Navigate to patientgain.com. Sign up for an account under Dr. D's credentials (his email, his credit card). Walk Dr. D through this step himself so he owns the account.
2. Complete the Patient Gain account setup — this typically includes practice information, HIPAA BAA acknowledgment, and portal configuration.
3. Configure the secure file upload portal: practice name (MACH-I Aerospace Cardiology), logo if available, instructions for patients on what to upload.
4. Generate a test secure upload link. Send it to a test email address. Click the link and confirm the upload portal loads and appears professional.
5. If Patient Gain provides API access, retrieve the API key and note it in the credentials document.
6. Return to OpenClaw → Secure Upload Trigger skill → update Patient Gain credentials and portal URL.
7. Test the Secure Upload Trigger: from OpenClaw, trigger the skill against the test contact record. Confirm the upload request email is sent via Gmail with a working link.

**Checkpoint:** Patient Gain portal configured. Secure upload link generates and functions correctly.

---

### Phase 7: Claude Code Setup (~20 min)

**Goal:** Claude Code installed, configured with guardrails, and Dr. D can make a test website edit.

1. Install Claude Code CLI on the Mac Studio:
   - If using npm: `npm install -g @anthropic-ai/claude-code`
   - If using the standalone installer: run the pre-downloaded installer
2. Set up the Anthropic API key:
   - Log into Dr. D's Anthropic account (or create one during the meeting)
   - Generate an API key at console.anthropic.com → API Keys
   - Configure the key for Claude Code (typically via environment variable or `claude config`)
3. Navigate to the website project directory: `cd ~/MACH-I-Website`
4. Install the pre-written `CLAUDE.md` guardrails file into the project root. Review the contents with Dr. D so he understands the constraints:
   - Static HTML/CSS site — no build process changes
   - Always commit after edits
   - Never delete files without confirmation
   - No hosting/deployment config changes
   - No credentials in the repo
5. Walk Dr. D through a test edit:
   - Open Terminal, navigate to the website directory
   - Run `claude` to start Claude Code
   - Ask Claude Code to make a simple content change (e.g., "Update the office hours on the contact page to Monday-Friday 9am-5pm")
   - Review the change Claude Code proposes
   - Accept the change
   - Verify the edit looks correct in the browser (open the HTML file locally)
6. Commit and push the test change:
   - `git add -A && git commit -m "Test edit: updated office hours" && git push`
   - Verify the commit appears on GitHub
   - If Netlify auto-deploy is configured, verify the change goes live on the website

**Checkpoint:** Claude Code installed and working. Dr. D has successfully made a test edit, committed, and pushed. The change is visible on GitHub.

---

### Phase 8: Auto-Push Safety Net (~15 min)

**Goal:** Automatic commit and push mechanism ensures all changes reach GitHub regularly, even if Dr. D forgets to push.

1. Install the pre-written `launchd` plist for hourly auto-commit and push:
   - Copy the plist to `~/Library/LaunchAgents/com.machi.autopush.plist`
   - The plist runs a script hourly that does:
     ```
     cd ~/MACH-I-Website && git add -A && git diff --cached --quiet || git commit -m "auto-save $(date '+%Y-%m-%d %H:%M')" && git push
     cd ~/openclaw-config && git add -A && git diff --cached --quiet || git commit -m "auto-save $(date '+%Y-%m-%d %H:%M')" && git push
     ```
   - Load the agent: `launchctl load ~/Library/LaunchAgents/com.machi.autopush.plist`
2. Test the auto-push mechanism:
   - Make a small change to a file in the website repo
   - Manually run the script to verify it commits and pushes correctly
   - Check GitHub to confirm the auto-commit arrived
3. Verify the `.gitignore` files are in place for both repos to prevent accidental credential commits:
   - `.env`, `*.key`, `*.pem`, credentials files
   - Docker volumes and data directories
   - `.DS_Store`, `node_modules`
4. Verify Scott can see pushes from Dr. D's repos on GitHub from Scott's end (check collaborator access).

**Checkpoint:** Auto-push mechanism installed and tested. Scott can see commits arriving on GitHub.

---

### Phase 9: Integration Testing (~30 min)

**Goal:** Confirm the full patient journey works end-to-end before handing off to Dr. D.

**Test Scenario 1 — Full Intake Flow:**
1. Submit the intake form on the live MACH-I website using fake patient data (name: "Test Alpha One," email: a real address you can check).
2. Confirm OpenClaw receives the webhook and creates a contact record tagged "Lead."
3. Confirm the confirmation email arrives at the test email address within 2 minutes.
4. Confirm a calendar hold is created in Dr. D's Google Calendar.
5. In OpenClaw, update the contact status to "Scheduled" and set an appointment date.
6. Trigger the Secure Upload Trigger against this contact. Confirm the upload request email is sent.
7. Update status to "Active Patient."

**Test Scenario 2 — Appointment Reminder:**
1. Create a test calendar event in Google Calendar for 25 hours from now (so the 24-hour reminder fires in ~1 hour if you adjust the timing for testing).
2. Alternatively: manually trigger the Appointment Manager reminder function against a test record.
3. Confirm reminder email is generated correctly with the right appointment details.

**Test Scenario 3 — Daily Briefing:**
1. Manually trigger the Daily Briefing agent (most OpenClaw installations allow manual skill invocation).
2. Confirm the briefing email arrives in Dr. D's Gmail inbox at his custom domain.
3. Confirm it correctly lists today's appointments, any new leads, and pending follow-ups.

**Test Scenario 4 — Recall Agent:**
1. Create a test contact record with "Last Appointment Date" set to 13 months ago.
2. Manually trigger the Recall agent.
3. Confirm a recall email is sent to the test contact.

Fix any issues discovered during testing before proceeding to Phase 10.

**Checkpoint:** All four test scenarios pass. Dr. D reviews the confirmation and briefing emails and approves the content.

---

### Phase 10: Training and Handoff (~30 min)

**Goal:** Dr. D understands his daily workflow and knows what to do if something breaks.

**Daily Workflow Walkthrough:**
1. Show Dr. D where to find his daily briefing email each morning in Gmail.
2. Open the OpenClaw dashboard. Walk through: how contacts are organized, how to search for a patient, how to update a contact's status.
3. Show how to view and manage the calendar in Google Calendar (calendar.google.com), and optionally in Apple Calendar via CalDAV sync to Google.
4. Show how to manually trigger a secure upload link for a specific patient (when Dr. D needs records from someone).
5. Show how to see new leads that came in overnight.
6. Demonstrate: if Dr. D gets a phone call from a prospective patient, how to manually create a contact record in OpenClaw.

**Website Updates with Claude Code:**
1. Show Dr. D how to open Terminal and navigate to the website project directory.
2. Demonstrate starting Claude Code with the `claude` command.
3. Walk through common requests Dr. D might make:
   - "Update the phone number on the contact page"
   - "Add a new FAQ about aviation medical exams"
   - "Change the office hours"

**Remote Support via Tailscale:**
1. Explain that Scott can connect to Dr. D's Mac Studio remotely via Tailscale if issues arise.
2. Show the Tailscale menu bar icon and how to verify it's connected.
3. If something breaks and can't be fixed locally, Scott can SSH into the machine or view the screen via Tailscale without being on-site.
4. Emphasize: "If something goes wrong and you can't fix it, I can connect to your machine remotely via Tailscale to help."

   - "Add a new page about a service I offer"
4. Show how to review and accept changes Claude Code proposes.
5. Show how to verify changes locally (open the HTML file in a browser).
6. Explain that changes auto-push to GitHub hourly, but Dr. D can also push manually: `git push`
7. Show how to verify changes went live on Netlify (if auto-deploy from GitHub is configured, the site updates within minutes of a push).
8. **What NOT to do with Claude Code:**
   - Don't ask it to delete files or directories
   - Don't ask it to change hosting configuration or deployment settings
   - Don't ask it to modify the site architecture or build process
   - If something seems wrong, stop and call Scott

**Emergency Procedures:**
1. If OpenClaw appears down: open Docker Desktop → confirm the openclaw container shows as "Running." If it shows as stopped, click Start. If it won't start, call Scott.
2. If email stops working: log into Gmail directly at mail.google.com as a fallback. This always works independent of OpenClaw.
3. If the intake form stops feeding into OpenClaw: patients still get the form submission acknowledgment from Netlify. The leads are not lost — they're in Netlify's form submissions log, accessible at netlify.com. Scott can manually import them.
4. If the Mac Studio is off: Docker (and OpenClaw) only runs when the Mac Studio is on and awake. Set Mac Studio Energy Saver settings to "Prevent computer from sleeping automatically" — do this during the meeting.
5. **If the website breaks after a Claude Code edit:** Don't panic — everything is on GitHub and Scott can revert any commit remotely. Netlify can also roll back to any previous deploy. Call Scott and he can fix it from his end without needing access to the Mac Studio.

**Credentials Document:**
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

**Checkpoint:** Dr. D can navigate to OpenClaw, find a contact, and trigger a secure upload link unassisted. He can open Claude Code and make a simple website edit. He knows where the credentials document is.

---

## Post-Meeting Follow-up

### Items That Cannot Be Completed Same-Day

- **DNS propagation verification:** MX records may not be fully propagated when the meeting ends. Check Google Admin Console domain status 24 hours after the meeting. If still showing errors, troubleshoot DNS records.
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

The following need answers before the meeting can be finalized. Ideal to resolve at least one week before the meeting date.

1. **Email address format:** What address does Dr. D want? (See options in Pre-Meeting Prep.) Does he want a single address or separate addresses for patient contact vs. administrative use?

2. **Domain registrar access:** What registrar holds the DNS for Dr. D's domain? Does he have login credentials for it, or does someone else manage it? This is critical — without registrar access, MX records cannot be added and email won't work.

3. **Mac Studio status:** Is Docker Desktop already installed? What macOS version is it running? Has the Mac Studio received recent updates, or are there pending updates that might require a restart during the meeting?

4. **SMS or Telegram notifications:** Does Dr. D want mobile notifications for new leads or urgent items in addition to email, or is the daily briefing email sufficient?

5. **Patient Gain timing:** Does Dr. D prefer to create the Patient Gain account before the meeting (so it is ready to configure) or during the meeting (so he goes through the setup himself)? Given the HIPAA BAA requirement, starting early may be wise.

6. **Existing calendar:** Does Dr. D have an existing calendar (iCloud, a personal Google account) with appointments to migrate, or is he starting fresh? If migrating from iCloud or another Google account, how much history matters?

7. **Practice phone number:** What is the contact phone number for the practice? This goes into email templates and should be finalized before building skill templates.

8. **Energy Saver / Mac Studio always-on:** Is the Mac Studio in a dedicated office location where it can stay on continuously? OpenClaw only runs when the machine is awake. If the Mac Studio is sometimes off, automations will not fire during those windows — Dr. D needs to understand this constraint.

9. **Intake form fields:** Review the current intake form on the MACH-I website to confirm it captures everything OpenClaw needs for the contact record. Are there fields to add before the webhook is configured?

10. **Google Workspace plan tier:** What plan does Dr. D have — Business Starter, Business Standard, or higher? This affects storage, API quotas, and available features. Business Starter is sufficient for this setup, but good to confirm.

11. **Google Admin Console access:** Does Dr. D have admin access to admin.google.com? This is required to verify the custom domain, configure MX routing, generate DKIM keys, and manage users. If he is not the admin on his own Workspace account, this needs to be resolved before the meeting.

12. **Google account tied to Workspace:** What Google account (email address) is the Workspace subscription tied to? Is it a personal @gmail.com account that was used for purchase, or a Workspace admin account? This affects how we log into Admin Console during setup.

13. **Does Dr. D have a GitHub account?** If so, get the username. If not, we will create one during or before the meeting.

14. **Does Dr. D have an Anthropic account for Claude Code?** If not, we will create one and set up the API key during the meeting.

15. **Does Dr. D have an OpenAI account/subscription?** Needed for OpenClaw's AI backend. If not, we will set one up.

16. **What level of Claude Code autonomy should Dr. D have?** Recommendation: require confirmation for all file changes (Claude Code's default behavior). The CLAUDE.md guardrails file adds additional constraints specific to the website project.

17. **Does Dr. D have a Tailscale account?** Can use Google login for simplicity. If not, we will create one during Phase 1b.

---

## Risk Mitigation

### Risk: DNS Propagation Is Slow

**Likelihood:** Medium. MX record propagation typically takes 15 minutes to 4 hours, but can take up to 48 hours.
**Impact:** Inbound email (mail to Dr. D's new custom domain address) will not work during the meeting.
**Mitigation:** Make all DNS changes at least 24 hours before the meeting. Outbound email via Gmail / Gmail API (OpenClaw sending emails) usually works before MX records fully propagate — outbound uses Google's SMTP servers, not inbound routing. So automated confirmations may work even if inbound is not yet live.
**Fallback:** If inbound email is not working by end of meeting, Dr. D uses his existing Gmail or a temporary Google Workspace address for testing until DNS propagates. No data is lost.

### Risk: Mac Studio Needs System Updates

**Likelihood:** Low-Medium. Macs in professional settings often run behind on updates.
**Impact:** A required restart mid-meeting would consume 20–30 minutes and might require re-verifying Docker setup.
**Mitigation:** Ask Dr. D to run all macOS updates and restart the Mac Studio the day before the meeting.
**Fallback:** If updates are needed during the meeting, run them first (before Phase 1) before starting the CLI/Docker setup. Adjust the meeting agenda accordingly.

### Risk: Docker or OpenClaw Setup Hits an Unexpected Issue

**Likelihood:** Low (pre-tested on Scott's instance), but possible due to Mac Studio hardware/OS differences.
**Impact:** Phase 2 (Mac Studio Foundation) and all subsequent phases blocked.
**Mitigation:** Pre-download the Docker image on Scott's laptop so it can be copied via USB or AirDrop rather than pulled from the internet. Have the docker-compose.yml tested and ready to paste. Know which ports to use and what permissions Docker needs on macOS.
**Fallback:** If OpenClaw fails to start after 45 minutes of troubleshooting, acknowledge the issue, set up Google Workspace domain and Patient Gain (which are independent), and schedule a follow-up session to resolve Docker. Dr. D can operate manually in the interim (see below).

### Risk: Patient Gain API Is Not Available or Is Complex

**Likelihood:** Medium. Patient Gain may use a different model for link generation than expected.
**Impact:** The Secure Upload Trigger agent cannot dynamically generate unique links; it would send a static portal URL instead.
**Mitigation:** Pre-research Patient Gain's API documentation before the meeting. If dynamic link generation is not available, configure the agent to send a static link to Patient Gain's upload portal with Dr. D's practice identifier. This is slightly less seamless but functionally equivalent.

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
**Fallback:** If auto-push is broken, Scott troubleshoots remotely via screen share or during next visit. Local changes are not lost — they are in the local Git repo.

### Risk: Credentials Committed to GitHub Repo

**Likelihood:** Low if `.gitignore` is set up correctly, but possible if Dr. D or Claude Code creates a new file with credentials.
**Impact:** API keys or passwords exposed in a private GitHub repo (limited exposure since repos are private, but still a security concern).
**Mitigation:** Proper `.gitignore` files exclude `.env`, credential files, and common secret patterns. CLAUDE.md explicitly instructs Claude Code never to commit credentials. Secrets are stored in environment variables only. Scott reviews commits during monitoring check-ins.
**Fallback:** If credentials are committed, Scott immediately rotates the affected keys, removes the file from Git history using `git filter-branch` or BFG Repo-Cleaner, and force-pushes the cleaned history.


### Risk: Mac Studio Goes Offline / Tailscale Disconnects

**Likelihood:** Low-Medium. Tailscale disconnection can occur if machine loses network, Tailscale service crashes, or the machine is powered off.
**Impact:** Scott cannot remotely SSH into or view the Mac Studio. If something breaks and Dr. D needs remote help, connectivity is lost until the issue is resolved locally or manually.
**Mitigation:** Configure Tailscale to auto-start on boot (done in Phase 1b). If the machine is off, Dr. D needs to power it on before Scott can connect. Consider enabling Wake on LAN if the Mac Studio supports it, so Scott can remotely wake the machine if needed. During first two weeks, verify auto-start is working during monitoring check-ins.
**Fallback:** If Tailscale remains unavailable after the meeting, email-based support and phone calls remain available. Scott can provide verbal guidance for troubleshooting, or visit in person if critical issue requires hands-on diagnosis.

### How Dr. D Operates Manually Until Automation Is Proven

For the first 1–2 weeks, Dr. D should treat the automation as a supplement rather than a dependency. Manual fallback procedures:

- **New intake leads:** Check Netlify's form submissions log at netlify.com → site → Forms. All submissions are stored here regardless of whether the webhook fires.
- **Appointment reminders:** Google Calendar sends its own reminders natively — these work without OpenClaw.
- **Secure file requests:** Log into Patient Gain directly and copy the secure upload link to paste into a manually composed Gmail email.
- **Daily overview:** Log into OpenClaw directly and view the contacts dashboard.
- **Website updates:** If Claude Code is not working, Dr. D can call Scott to make website changes remotely via GitHub.

These manual steps cover everything if automation is partly or fully offline. Once the system is running reliably for two weeks with no manual intervention needed, it can be considered production-stable.

---

*Document version: 2.0 — updated with Claude Code, GitHub, OpenAI additions; Google Workspace replaces Fastmail*
*Last updated: 2026-03-05*
*Next update: after open questions are resolved and pre-meeting prep is confirmed*
