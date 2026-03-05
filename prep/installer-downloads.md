# Pre-Meeting Preparation Checklist

This is a checklist of everything Scott needs to download/prepare before the meeting at Dr. D's Mac Studio. Include direct download URLs where possible.

## Pre-Download Checklist (Do Before Meeting Day)

### Installers to Download (bring on USB drive as backup)
- [ ] Docker Desktop for Mac (Apple Silicon) — https://www.docker.com/products/docker-desktop/ (~500MB)
- [ ] Tailscale for Mac — https://tailscale.com/download/mac
- [ ] Node.js LTS (macOS Apple Silicon .pkg) — https://nodejs.org/en/download/
- [ ] GitHub CLI — will install via Homebrew, but note: `brew install gh`
- [ ] Claude Code — will install via npm: `npm install -g @anthropic-ai/claude-code`

### Docker Images to Pre-Pull (save to USB)
- [ ] OpenClaw Docker image — `docker pull` then `docker save -o openclaw.tar <image>` (saves time vs downloading on-site)

### Accounts to Verify/Create Before Meeting
- [ ] Dr. D's Google Workspace — verify admin access, note plan tier
- [ ] Dr. D's domain registrar — get login, identify current DNS settings
- [ ] GitHub account for Dr. D — create or confirm existing
- [ ] Patient Gain account — can do during meeting, but research signup flow beforehand
- [ ] Anthropic account for Dr. D — for Claude Code (can use API key)
- [ ] OpenAI account for Dr. D — for OpenClaw

### DNS Changes (Do 24-48 Hours Before Meeting)
- [ ] Get domain registrar access from Dr. D
- [ ] Add Google Workspace MX records:
  - Priority 1: ASPMX.L.GOOGLE.COM
  - Priority 5: ALT1.ASPMX.L.GOOGLE.COM
  - Priority 5: ALT2.ASPMX.L.GOOGLE.COM
  - Priority 10: ALT3.ASPMX.L.GOOGLE.COM
  - Priority 10: ALT4.ASPMX.L.GOOGLE.COM
- [ ] Add SPF record: `v=spf1 include:_spf.google.com ~all`
- [ ] Generate and add DKIM record from Google Admin Console
- [ ] Add DMARC record: `v=DMARC1; p=none; rua=mailto:dmarc@[domain]`
- [ ] Verify DNS propagation before meeting day

### Files to Prepare (Already Done)
- [ ] CLAUDE.md guardrails for website project
- [ ] .gitignore for website repo
- [ ] .gitignore for OpenClaw config repo
- [ ] launchd auto-push plist
- [ ] auto-push shell script
- [ ] install-autopush.sh installer

### USB Drive Contents Checklist
Pack all of the above onto a USB drive:
- [ ] Docker Desktop DMG
- [ ] Tailscale installer
- [ ] Node.js PKG
- [ ] OpenClaw Docker image tar
- [ ] prep/ folder with all config files
- [ ] This checklist (printed copy too)

### Scott's Machine Prep
- [ ] Verify Tailscale is running on Scott's machine
- [ ] Have GitHub account ready to be added as collaborator
- [ ] Test SSH from Scott's machine (will test during meeting)
