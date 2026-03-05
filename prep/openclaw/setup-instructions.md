# MACH-1 Front Desk Agent — OpenClaw Setup Instructions

## Prerequisites

- OpenClaw installed and running on Dr. D's machine
- OpenAI API access configured in OpenClaw (Dr. D's OpenAI OAuth subscription)
- Telegram bot token configured in OpenClaw (for agent communication)
- Gmail API OAuth credentials (for email automation — can be deferred to Phase 2)
- Netlify site with form notifications enabled (for lead capture)

## Step-by-Step Deployment

### 1. Copy the Agent Workspace

Copy the workspace directory to OpenClaw's home:

```bash
cp -r workspace-mach1/ ~/.openclaw/workspace-mach1/
```

This includes the agent's CLAUDE.md (system prompt), data templates, and directory structure.

**No credentials needed for this step.**

### 2. Register the Agent

Open `~/.openclaw/openclaw.json` and add the agent and binding blocks from `openclaw-agent-config.json`.

Add the `agent` object to the `agents` array and the `binding` object to the `bindings` array. The exact structure depends on your openclaw.json format — the config file shows what fields to add.

**Requires:** OpenAI model access already configured in OpenClaw.

### 3. Install Hooks

Copy the hook directories:

```bash
cp -r hooks/gmail-bridge/ ~/.openclaw/hooks/gmail-bridge/
cp -r hooks/netlify-webhook/ ~/.openclaw/hooks/netlify-webhook/
```

Register the hooks in `~/.openclaw/openclaw.json`:

```json
{
  "hooks": [
    {
      "id": "gmail-bridge",
      "event": "message",
      "handler": "./hooks/gmail-bridge/index.js"
    },
    {
      "id": "netlify-webhook",
      "event": "webhook",
      "path": "/hooks/netlify-form",
      "handler": "./hooks/netlify-webhook/index.js"
    }
  ]
}
```

**Gmail hook is optional for Phase 1** — the agent writes outbox files that Dr. D can send manually.

### 4. Add Cron Jobs

Copy or merge the cron job definitions from `cron-jobs.json` into `~/.openclaw/cron/jobs.json`.

If the file already exists, merge the `jobs` array. If creating new:

```bash
mkdir -p ~/.openclaw/cron/
cp cron-jobs.json ~/.openclaw/cron/jobs.json
```

The three cron jobs:
- **Daily Briefing** — 8:00 AM ET, weekdays
- **Follow-up Check** — 9:00 AM ET, Mon/Wed/Fri
- **End of Day Summary** — 5:00 PM ET, weekdays

**No credentials needed for this step.**

### 5. Set Environment Variables (for Gmail automation)

These are needed only when enabling automated email sending. Skip for Phase 1 if Dr. D will send emails manually from the outbox.

```bash
export GMAIL_CLIENT_ID="<from Google Cloud Console>"
export GMAIL_CLIENT_SECRET="<from Google Cloud Console>"
export GMAIL_REFRESH_TOKEN="<from OAuth flow>"
```

To get these credentials:
1. Go to Google Cloud Console > APIs & Services > Credentials
2. Create an OAuth 2.0 client ID (Desktop application type)
3. Enable the Gmail API in the project
4. Run the OAuth consent flow to get a refresh token
5. Store these securely — they grant email send access

**Requires Dr. D's Google account access.** This cannot be pre-configured.

### 6. Configure Netlify Webhook

In the Netlify dashboard for the MACH-1 site:
1. Go to Site Settings > Forms > Form Notifications
2. Add an Outgoing Webhook notification
3. Set the URL to the OpenClaw webhook endpoint:
   - If OpenClaw has built-in webhooks: `https://<openclaw-host>/hooks/netlify-form`
   - If using standalone server: `http://<server-ip>:3456/webhook`
4. Select "New form submission" as the trigger event

**Requires:** Netlify account access and the OpenClaw instance to be reachable from the internet (or use a tunnel like ngrok for testing).

### 7. Restart OpenClaw Gateway

```bash
# The exact command depends on OpenClaw's installation method
openclaw restart
# or
systemctl restart openclaw
# or restart the Docker container
```

### 8. Test: Agent Communication

Send a test message to the agent via Telegram:

> "Hello, what's on the schedule today?"

The agent should respond using its MACH-1 Front Desk persona. If it doesn't respond:
- Check that the Telegram binding is configured correctly
- Verify the agent ID matches ("mach1")
- Check OpenClaw logs for errors

### 9. Test: Cron Jobs

Verify cron jobs are registered:

```bash
openclaw cron list
```

You should see all three jobs. To test one manually:

```bash
openclaw cron trigger mach1-daily-briefing
```

Check that:
- The agent runs and produces output
- `daily-status.json` is written to the workspace
- A summary is delivered via Telegram

### 10. Test: Netlify Form Submission

Submit a test form on the MACH-1 website:
1. Fill out the contact form with test data
2. Check the agent's `inbox/` directory for a new JSON file
3. On the next agent interaction or cron run, the agent should acknowledge the new lead

---

## What Needs Dr. D's Credentials

| Item | Pre-configurable? | Needs Dr. D? |
|---|---|---|
| Workspace files (CLAUDE.md, templates) | Yes | No |
| Agent config (model, tools, identity) | Yes | No |
| Cron job definitions | Yes | No |
| Hook code (gmail-bridge, netlify-webhook) | Yes | No |
| OpenAI API / model access | No | Already configured in OpenClaw |
| Telegram bot binding | No | Needs Dr. D's Telegram config |
| Gmail OAuth credentials | No | Needs Dr. D's Google account |
| Netlify webhook URL | No | Needs Dr. D's Netlify account |

## Phase 1 vs Phase 2

**Phase 1 (manual email):**
- Agent writes email drafts to `outbox/` as JSON files
- Dr. D reviews and sends them manually
- All other features (cron, inbox, briefings) work automatically
- Gmail hook is installed but inactive without credentials

**Phase 2 (automated email):**
- Configure Gmail OAuth credentials (Step 5)
- Gmail bridge hook sends emails automatically
- Consider adding an approval mode where Dr. D confirms each send via Telegram

## Troubleshooting

- **Agent not responding:** Check `openclaw logs` for errors. Verify agent ID and bindings.
- **Cron not firing:** Ensure timezone is correct (America/New_York). Check `openclaw cron status`.
- **Webhook not received:** Verify Netlify webhook URL is reachable. Check `logs/netlify-webhook.log`.
- **Email send failures:** Check `logs/gmail-bridge.log`. Verify OAuth tokens are valid and not expired.
