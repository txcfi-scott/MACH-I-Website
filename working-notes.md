# Working Notes — Dr. D Mac Studio Setup

## Project Status: Pre-Session 1

## Overview
Setting up Dr. D's Mac Studio so he can maintain his MACH-I website via Claude Code, with remote access for Scott.

## Phases
1. **Remote Access** — Tailscale + SSH + Screen Sharing (Session 1 with Dr. D, ~30 min)
2. **Software Installation** — Homebrew, Node, Python, Git, Claude Code, Netlify CLI (Session 2, Scott via SSH)
3. **Accounts & Services** — Netlify, domain, Fastmail, Wix transition (Session 2 with Dr. D, Screen Sharing)
4. **Website Dev Environment** — GitHub, repo clone, Netlify link, CLAUDE.md (Session 3)
5. **Training & Handoff** — Walk Dr. D through Claude Code workflow, quick reference guide (Session 3)

## Session 1 Checklist (Remote Access — ~30 min call)
- [ ] Dr. D downloads Tailscale from tailscale.com
- [ ] Install + sign in to Scott's Tailnet
- [ ] Enable Remote Login (SSH) in System Settings → General → Sharing
- [ ] Enable Screen Sharing in System Settings → General → Sharing
- [ ] Turn on FileVault encryption
- [ ] Turn on Firewall (block all incoming except Tailscale)
- [ ] Enable auto-updates
- [ ] Confirm Mac Studio on ethernet, set to never sleep
- [ ] Verify: Scott SSHs in over Tailscale
- [ ] Verify: Scott Screen Shares over Tailscale
- [ ] Verify: Dr. D Screen Shares from MacBook to Studio

## Session 2 Checklist (Software + Accounts — ~1.5 hrs Screen Sharing)
### Scott via SSH:
- [ ] Install Homebrew
- [ ] `brew install node@22 python@3 git gh`
- [ ] `npm install -g @anthropic-ai/claude-code`
- [ ] `npm install -g netlify-cli`

### With Dr. D via Screen Sharing:
- [ ] Dr. D creates Netlify account ($9/mo Starter)
- [ ] Scott transfers mach-i-cardiology site to Dr. D's team
- [ ] `netlify login` on Dr. D's machine
- [ ] Dr. D creates GitHub account (or signs in)
- [ ] `gh auth login`
- [ ] Dr. D picks domain name from candidate list
- [ ] Register domain (Namecheap or similar)
- [ ] Configure DNS A record → Netlify
- [ ] Configure custom domain in Netlify dashboard
- [ ] Dr. D creates Fastmail account (Family plan ~$140/yr)
- [ ] Add domain to Fastmail
- [ ] Configure MX records
- [ ] Set up aliases: info@, eddie@, intake@
- [ ] Create app-specific password, store in Keychain

## Session 3 Checklist (Website Handoff + Training — ~1 hr Screen Sharing)
- [ ] `git clone` repo to ~/Sites/mach-i
- [ ] `cd ~/Sites/mach-i && netlify link`
- [ ] Dr. D subscribes to Claude Pro ($20/mo)
- [ ] `claude login` — walk through auth
- [ ] Walk Dr. D through a real edit via Claude Code
- [ ] Practice: edit → commit → deploy cycle
- [ ] Review quick reference guide together
- [ ] Set up Wix 301 redirect to new domain
- [ ] Remove "Dr. D Review" nav link and checklist page
- [ ] Print/bookmark quick reference guide

## Verification Checklist
- [ ] Scott can SSH to Studio over Tailscale
- [ ] Scott can Screen Share to Studio over Tailscale
- [ ] Dr. D can Screen Share from MacBook to Studio
- [ ] `claude` runs in website project directory
- [ ] Dr. D makes a real site edit via Claude Code
- [ ] `netlify deploy --prod --dir=.` succeeds
- [ ] `git push` succeeds
- [ ] Email arrives at eddie@[newdomain] via Fastmail
- [ ] Old Wix domain redirects to new site
- [ ] Dr. D has quick reference guide printed/bookmarked

## Decisions
- OpenClaw, CRM, email automation are a **separate follow-on project**
- Keep Wix site as redirect (preserves SEO/Google ranking)

## Open Questions
- Which domain name will Dr. D pick?
- Does Dr. D already have a GitHub account?
- Namecheap vs Squarespace for domain registration?

## Next Step
Schedule Session 1 call with Dr. D
