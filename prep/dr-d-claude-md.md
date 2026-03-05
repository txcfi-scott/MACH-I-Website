# MACH-I Aerospace Cardiology Website

## About This Project

This is the website for MACH-I Aerospace Cardiology, Dr. Eddie Davenport's aerospace cardiology practice. It is a static HTML/CSS website hosted on Netlify. Changes pushed to the `main` branch on GitHub are automatically deployed to the live site.

## How This Website Works

- Static HTML files (no build step, no framework)
- CSS for styling
- Images in the images/ directory
- Hosted on Netlify with auto-deploy from GitHub
- Every change you make and save will automatically go live within a few minutes

## What You Can Safely Ask Claude Code To Do

- Update text content on any page (office hours, phone numbers, descriptions, etc.)
- Add new content sections to existing pages
- Add new pages (Claude Code will create the HTML file and add navigation links)
- Update images (place new images in the images/ directory)
- Fix typos or broken links
- Adjust colors, fonts, or spacing
- Add or update the services listed
- Update airport locations or coverage areas

## What NOT To Do

- Do NOT delete files unless you're sure they're not needed
- Do NOT change the hosting configuration or deployment settings
- Do NOT modify .gitignore, netlify.toml, or any configuration files
- Do NOT install packages, frameworks, or build tools — this is a simple HTML site
- Do NOT add JavaScript that collects patient information (use the intake form for that)
- Do NOT put any patient names, medical information, or HIPAA-protected data anywhere on this site
- Do NOT share API keys, passwords, or credentials in any file

## After Making Changes

Claude Code will automatically commit and push your changes to GitHub. Netlify will deploy them within 1-2 minutes. You can verify your changes are live by visiting your website.

If something looks wrong after a change, don't panic — tell Scott. Every change is saved in GitHub and can be easily reversed.

## Getting Help

- For website changes: Ask Claude Code
- For technical problems: Contact Scott — he can access your machine remotely via Tailscale
- For content questions: You know your practice best — just tell Claude Code what you want to say

## Important Files

- index.html — Home page
- about.html — About Dr. Davenport
- services.html — Services offered
- contact.html — Contact information
- intake.html — Patient intake form
- styles.css — Website styling
- images/ — All website images
