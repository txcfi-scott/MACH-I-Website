# Session Scripts — Dr. D Mac Studio Setup

## Session 1: Remote Access (~30 min phone/Zoom call)

### Pre-Session
- [ ] Confirm Dr. D is at his Mac Studio
- [ ] Have him on phone or Zoom for voice guidance
- [ ] Make sure he's connected to internet via ethernet

### 1. Install Tailscale
**Tell Dr. D:**
> "Open Safari and go to tailscale.com. Click Download. Open the file and drag Tailscale to Applications. Then open it from Applications."

- [ ] Dr. D installs Tailscale
- [ ] Walk him through signing in (use Google/Apple ID — whatever's easiest)
- [ ] Add his machine to Scott's Tailnet (Scott does this in Tailscale admin)
- [ ] Note his Tailscale IP: `_________________`

### 2. Enable Remote Login (SSH)
**Tell Dr. D:**
> "Open System Settings. Click General on the left. Click Sharing. Turn on Remote Login."

- [ ] Remote Login enabled
- [ ] Note: May need to click the (i) and ensure "Allow full disk access for remote users" if needed

### 3. Enable Screen Sharing
**Tell Dr. D:**
> "While you're still in Sharing, also turn on Screen Sharing."

- [ ] Screen Sharing enabled

### 4. Machine Hardening
**Tell Dr. D:**
> "Now go back to System Settings main screen."

**FileVault:**
> "Click Privacy & Security on the left. Scroll down to FileVault. Turn it on."

- [ ] FileVault enabled (will encrypt in background)

**Firewall:**
> "Scroll down a little more to Firewall. Turn it on."

- [ ] Firewall enabled

**Auto-Updates:**
> "Go to General → Software Update → Automatic Updates. Make sure everything is turned on."

- [ ] Auto-updates enabled

**Prevent Sleep:**
> "Go to Energy Saver (or Displays → Advanced). Set 'Prevent automatic sleeping when the display is off' or similar to ON."

- [ ] Mac Studio set to never sleep

### 5. Verify Access
From Scott's machine:
```bash
# SSH test
ssh dr-d-studio  # or use Tailscale IP

# Screen Sharing test
# Open Finder → Go → Connect to Server → vnc://[tailscale-ip]
```

- [ ] Scott can SSH in
- [ ] Scott can Screen Share in
- [ ] Walk Dr. D through Screen Sharing from his MacBook to Studio

### Post-Session
- [ ] Save Tailscale IP and machine name
- [ ] Add SSH config entry on Scott's machine:
```
Host dr-d-studio
    HostName [tailscale-ip]
    User [dr-d-username]
```
- [ ] Schedule Session 2

---

## Session 2: Software + Accounts (~1.5 hrs Screen Sharing)

### Pre-Session
- [ ] Scott SSHs into Dr. D's Studio
- [ ] Also Screen Sharing open for account creation parts

### Part A: Software Installation (Scott via SSH — Dr. D can watch or take a break)

#### Install Homebrew
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Note: May prompt for Dr. D's password. If so, ask him to type it.

After install, add to PATH:
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

- [ ] Homebrew installed
- [ ] `brew --version` works

#### Install Core Tools
```bash
brew install node@22 python@3 git gh
```

- [ ] Node installed: `node --version`
- [ ] Python installed: `python3 --version`
- [ ] Git installed: `git --version`
- [ ] GitHub CLI installed: `gh --version`

#### Install Claude Code
```bash
npm install -g @anthropic-ai/claude-code
```

- [ ] `claude --version` works

#### Install Netlify CLI
```bash
npm install -g netlify-cli
```

- [ ] `netlify --version` works

### Part B: Account Creation (Screen Sharing with Dr. D)

#### Netlify Account
**Tell Dr. D:**
> "I'm going to open netlify.com in your browser. You'll create an account with your email."

1. Open Safari → netlify.com → Sign Up
2. Dr. D creates account with his email
3. Choose Starter plan ($9/mo when needed — may start free)
4. Scott transfers site:
   - In Scott's Netlify: Site Settings → Transfer site → Enter Dr. D's team
5. On Dr. D's machine in Terminal:
```bash
netlify login
netlify link  # in the project directory later
```

- [ ] Netlify account created
- [ ] Site transfer initiated
- [ ] `netlify login` successful

#### GitHub Account
1. Open github.com → Sign Up (if Dr. D doesn't have one)
2. Use his practice email
3. On Dr. D's machine:
```bash
gh auth login
# Choose: GitHub.com → HTTPS → Login with web browser
```
4. Scott adds Dr. D as collaborator on txcfi-scott/MACH-I-Website repo

- [ ] GitHub account created/signed in
- [ ] `gh auth login` successful
- [ ] Dr. D added as collaborator

#### Domain Registration
1. Review candidate domain names with Dr. D
2. He picks one
3. Register at chosen registrar (Namecheap, Squarespace, etc.)
4. **DNS Setup:**
   - A record → Netlify load balancer IP (check Netlify docs for current)
   - Or use Netlify DNS (easier): change nameservers to Netlify's
5. In Netlify dashboard: Domain management → Add custom domain

- [ ] Domain registered: `_________________`
- [ ] DNS configured
- [ ] Custom domain working in Netlify (may take up to 24hrs)
- [ ] SSL certificate auto-provisioned by Netlify

#### Fastmail Account
1. Open fastmail.com → Sign Up
2. Choose Family plan (~$140/yr) — gives custom domain email
3. Add the new domain in Settings → Domains
4. **MX Records** — add to domain DNS:
   ```
   MX 10 in1-smtp.messagingengine.com
   MX 20 in2-smtp.messagingengine.com
   ```
5. **SPF Record:**
   ```
   TXT "v=spf1 include:spf.messagingengine.com ~all"
   ```
6. **DKIM** — Fastmail provides these, add as CNAME records
7. Set up aliases:
   - eddie@[domain]
   - info@[domain]
   - intake@[domain]
8. Create app-specific password for future IMAP use
9. Save in macOS Keychain

- [ ] Fastmail account created
- [ ] Domain added and verified
- [ ] MX records configured
- [ ] SPF record added
- [ ] DKIM configured
- [ ] Aliases created
- [ ] App password created and saved to Keychain

### Post-Session
- [ ] All accounts noted in Dr. D's secure notes
- [ ] DNS propagation check: `dig +short [domain]`
- [ ] MX propagation check: `dig MX +short [domain]`
- [ ] Schedule Session 3 (ideally 24-48 hrs later for DNS propagation)

---

## Session 3: Website Handoff + Training (~1 hr Screen Sharing)

### Pre-Session
- [ ] DNS has propagated (site loads on new domain)
- [ ] Email works (send test to eddie@[domain])
- [ ] Screen Sharing to Dr. D's Studio

### 1. Set Up Website Project
Via SSH or Screen Sharing Terminal:
```bash
mkdir -p ~/Sites
cd ~/Sites
git clone https://github.com/txcfi-scott/MACH-I-Website.git mach-i
cd mach-i
netlify link
```

- [ ] Repo cloned
- [ ] Netlify linked

### 2. Install CLAUDE.md
```bash
# Copy the prepared CLAUDE.md into the project
# (Scott transfers the file)
```

- [ ] CLAUDE.md in place

### 3. Claude Code Setup
**Tell Dr. D:**
> "Now let's set up Claude so you can talk to it to edit your site."

1. Dr. D subscribes to Claude Pro at claude.ai ($20/mo)
2. In Terminal:
```bash
cd ~/Sites/mach-i
claude login
# Walk through the browser auth flow
```
3. Test:
```bash
claude
# "What pages does this website have?"
```

- [ ] Claude Pro subscription active
- [ ] `claude login` successful
- [ ] Claude responds correctly about the site

### 4. Practice Real Edit
**Tell Dr. D:**
> "Let's make a real change together. What's something on the site you want to update?"

Walk him through:
1. Starting Claude: `cd ~/Sites/mach-i && claude`
2. Describing the change in plain English
3. Reviewing what Claude did
4. Deploying: "Deploy the site"
5. Checking the live site in browser

- [ ] Dr. D made a real edit
- [ ] Site deployed successfully
- [ ] Change visible on live site

### 5. Wix Transition
In Wix dashboard:
1. Set up 301 redirect from old domain to new domain
2. Or: Update Wix site to show "We've moved to [newdomain]" with auto-redirect

- [ ] Wix redirect configured
- [ ] Old URL redirects to new site

### 6. Clean Up Review Page
```bash
cd ~/Sites/mach-i
claude
# "Remove the Dr. D Review nav link from the navigation and delete any review/checklist pages"
```

- [ ] Review nav link removed
- [ ] Review page(s) deleted
- [ ] Deployed

### 7. Review Quick Reference Guide
- [ ] Walk through each section with Dr. D
- [ ] He bookmarks it or prints it
- [ ] Verify he can do the Terminal → claude workflow unassisted

### Post-Session
- [ ] Dr. D can independently: open Terminal → cd → claude → make edit → deploy
- [ ] All verification checklist items passed
- [ ] Update working-notes.md with completion status
- [ ] Schedule follow-up check-in (1 week)
