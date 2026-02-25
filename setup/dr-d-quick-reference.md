# Dr. D's Quick Reference Guide
## Your Mac Studio & Website

---

## 🖥️ Your Mac Studio
Your Mac Studio should **always be on** and **connected to ethernet** (the cable plugged into the back). This lets Scott help you remotely when needed.

**If it gets turned off:** Just turn it back on. Tailscale and everything else will reconnect automatically.

---

## ✅ Check Tailscale Is Connected
Look for the Tailscale icon in your **menu bar** (top-right of screen).
- **Connected** = icon is visible and active
- **Not connected** = click the icon → "Connect"

This is what lets Scott access your machine securely when you need help.

---

## 🌐 Update Your Website

### Step 1: Open Terminal
- Press **⌘ Space** (Command + Space) to open Spotlight
- Type **Terminal**
- Press **Enter**

### Step 2: Go to Your Website Folder
Type this and press Enter:
```
cd ~/Sites/mach-i
```

### Step 3: Start Claude
Type this and press Enter:
```
claude
```

### Step 4: Tell Claude What You Want
Just type in plain English. Examples:

| What you want | What to type |
|---|---|
| Change a price | "Update the AME exam price to $350" |
| Fix a phone number | "Change the office phone to 555-123-4567" |
| Add a new condition | "Add a condition card for hypertrophic cardiomyopathy" |
| Update your bio | "Add that I gave a keynote in Milan in May 2026" |
| Add a service | "Add a new service for pilot wellness consultations at $200" |
| See the site | "Open the site in my browser" |
| Deploy changes | "Deploy the site" |

### Step 5: Deploy
After Claude makes your changes, tell it:
```
Deploy the site
```
Claude will commit your changes, push to GitHub, and deploy to Netlify.

**That's it!** Your live site is updated.

---

## 📱 Screen Share to Your Studio from Your MacBook

If you're away from your Studio but need to use it:

1. On your MacBook, open **Finder**
2. In the menu bar: **Go → Connect to Server** (or press ⌘K)
3. Type: `vnc://[your-studio-tailscale-ip]`
4. Enter your Mac Studio password
5. You'll see your Studio desktop — use it like you're sitting in front of it

---

## 📧 Your Email
Your practice email runs through **Fastmail** (fastmail.com).

**Your addresses:**
- `eddie@[yourdomain]` — Your personal practice email
- `info@[yourdomain]` — General inquiries
- `intake@[yourdomain]` — Patient intake (for future automation)

**To check email:** Go to fastmail.com and log in, or set up the Fastmail app on your phone.

---

## 🆘 When Things Go Wrong

| Problem | What to do |
|---|---|
| Terminal shows an error | Copy the error, paste it to Claude — it can usually fix itself |
| Claude seems stuck | Type `/quit` to exit, then type `claude` to restart |
| Can't connect to Studio remotely | Check that Tailscale is connected on both machines |
| Website looks broken | Tell Claude: "Something looks wrong with the site, can you check?" |
| Scott needs to help | Just text/call Scott — he can SSH in via Tailscale |

---

## 🔑 Your Accounts

| Service | URL | What it's for | Cost |
|---|---|---|---|
| **Netlify** | netlify.com | Hosts your website | ~$9/mo |
| **Fastmail** | fastmail.com | Practice email | ~$140/yr |
| **GitHub** | github.com | Stores your website code | Free |
| **Claude** | claude.ai | AI that edits your site | $20/mo |
| **Domain** | [registrar] | Your domain name | ~$12/yr |
| **Tailscale** | tailscale.com | Secure remote access | Free |

**Total: ~$50/month**

*Credentials are stored in your macOS Keychain and in a secure note.*

---

## 💡 Tips
- **You can't break anything permanently.** Everything is backed up in GitHub. If something goes wrong, Scott or Claude can restore it.
- **Talk to Claude like a person.** "Make the heading bigger" works. You don't need technical language.
- **Deploy after every change session.** Don't leave un-deployed changes sitting around.
- **Keep your Mac Studio plugged in and on.** It's your server — treat it like a medical device that should always be running.
