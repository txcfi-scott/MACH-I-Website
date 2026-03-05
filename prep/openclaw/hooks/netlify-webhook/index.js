/**
 * Netlify Webhook Bridge for OpenClaw
 *
 * Receives Netlify form submission webhooks and writes them as JSON files
 * to the MACH-1 agent's inbox/ directory for processing.
 *
 * How it works:
 * 1. Netlify fires a webhook on form submission (configured in Netlify UI)
 * 2. This hook receives the POST data
 * 3. Extracts form fields and writes to inbox/{timestamp}-{name-slug}.json
 * 4. The agent picks these up on its next interaction or via daily cron
 *
 * Webhook setup options:
 *
 * Option A — OpenClaw built-in webhook support (preferred):
 *   If OpenClaw supports webhook endpoints natively, register this hook
 *   as a webhook handler in openclaw.json:
 *   {
 *     "hooks": [{
 *       "id": "netlify-webhook",
 *       "event": "webhook",
 *       "path": "/hooks/netlify-form",
 *       "handler": "./hooks/netlify-webhook/index.js"
 *     }]
 *   }
 *   Then set the Netlify outgoing webhook URL to:
 *   https://<openclaw-host>/hooks/netlify-form
 *
 * Option B — Standalone Express server:
 *   Run this file directly: node index.js
 *   It starts a minimal Express server on port 3456 (or PORT env var).
 *   Set the Netlify webhook URL to: http://<server-ip>:3456/webhook
 *   TODO: Add authentication token verification for production use.
 *
 * TODO: Verify Netlify webhook payload format against actual submissions
 * TODO: Add webhook signature verification (Netlify uses JWS tokens)
 * TODO: Add deduplication to prevent processing the same submission twice
 */

const fs = require("fs");
const path = require("path");

// --- Configuration ---

const INBOX_DIR = path.join(process.env.OPENCLAW_WORKSPACE || ".", "inbox");
const LOG_FILE = path.join(
  process.env.OPENCLAW_WORKSPACE || ".",
  "logs",
  "netlify-webhook.log"
);

// --- Logging ---

function log(level, message, data) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(data && { data }),
  };
  const line = JSON.stringify(entry) + "\n";

  const logDir = path.dirname(LOG_FILE);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  fs.appendFileSync(LOG_FILE, line);

  if (level === "error") {
    console.error(`[netlify-webhook] ${message}`, data || "");
  } else {
    console.log(`[netlify-webhook] ${message}`);
  }
}

// --- Helpers ---

/**
 * Create a URL-safe slug from a name string.
 */
function slugify(text) {
  if (!text) return "unknown";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 40);
}

/**
 * Extract and normalize form fields from Netlify webhook payload.
 *
 * Netlify form submission webhooks send data in this shape:
 * {
 *   "number": 12,
 *   "title": "Contact Form Submission",
 *   "email": "visitor@example.com",
 *   "name": "Jane Doe",
 *   "first_name": "Jane",
 *   "last_name": "Doe",
 *   "company": null,
 *   "summary": "Message preview...",
 *   "body": "Full message text",
 *   "data": {
 *     "name": "Jane Doe",
 *     "email": "visitor@example.com",
 *     "phone": "555-0123",
 *     "message": "I'd like to schedule...",
 *     "ip": "192.168.1.1",
 *     "user_agent": "Mozilla/5.0...",
 *     "referrer": "https://mach1.aero/contact"
 *   },
 *   "created_at": "2026-03-05T14:30:00.000Z",
 *   "site_url": "https://mach1.aero",
 *   "form_id": "abc123",
 *   "form_name": "contact"
 * }
 *
 * TODO: Verify this against actual Netlify webhook payloads.
 */
function extractFormData(payload) {
  // The actual form field values are typically in payload.data
  const formData = payload.data || payload;

  return {
    // Lead metadata
    source: "netlify-form",
    form_name: payload.form_name || "unknown",
    submission_number: payload.number || null,
    received_at: new Date().toISOString(),
    netlify_created_at: payload.created_at || null,

    // Contact info (normalized field names)
    name: formData.name || payload.name || null,
    email: formData.email || payload.email || null,
    phone: formData.phone || formData.telephone || null,

    // Message content
    message: formData.message || formData.comments || payload.body || null,
    subject: formData.subject || payload.title || null,

    // Service interest (if the form captures this)
    service_interest: formData.service || formData.interest || null,
    preferred_contact: formData.preferred_contact || formData.contact_method || null,

    // Tracking
    referrer: formData.referrer || null,
    site_url: payload.site_url || null,

    // Processing status for the agent
    _status: "new",
    _processed: false,
  };
}

/**
 * Write a form submission to the inbox as a JSON file.
 */
function writeToInbox(formData) {
  // Ensure inbox directory exists
  if (!fs.existsSync(INBOX_DIR)) {
    fs.mkdirSync(INBOX_DIR, { recursive: true });
  }

  // Generate filename: {ISO-timestamp}-{name-slug}.json
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-")
    .replace("T", "_")
    .replace("Z", "");
  const nameSlug = slugify(formData.name);
  const fileName = `${timestamp}-${nameSlug}.json`;
  const filePath = path.join(INBOX_DIR, fileName);

  fs.writeFileSync(filePath, JSON.stringify(formData, null, 2));

  log("info", `Wrote inbox file: ${fileName}`, {
    name: formData.name,
    email: formData.email,
    form: formData.form_name,
  });

  return { fileName, filePath };
}

// --- OpenClaw Hook Entry Point ---

/**
 * OpenClaw hook handler for webhook events.
 *
 * TODO: Confirm the exact OpenClaw webhook hook API signature.
 */
module.exports = async function handler(event, context) {
  log("info", "Netlify webhook hook triggered", {
    eventType: event?.type,
    agentId: context?.agentId,
  });

  // Only process for our agent
  if (context?.agentId && context.agentId !== "mach1") {
    return { status: "skipped", reason: "wrong agent" };
  }

  try {
    const payload = event?.body || event?.data || event;

    if (!payload || typeof payload !== "object") {
      throw new Error("Invalid webhook payload: expected JSON object");
    }

    const formData = extractFormData(payload);
    const result = writeToInbox(formData);

    log("info", "Form submission processed", {
      file: result.fileName,
      name: formData.name,
      email: formData.email,
    });

    return {
      status: "ok",
      file: result.fileName,
      lead: {
        name: formData.name,
        email: formData.email,
      },
    };
  } catch (err) {
    log("error", "Failed to process webhook", { error: err.message });
    return {
      status: "error",
      error: err.message,
    };
  }
};

// --- Option B: Standalone Express server ---
// TODO: Install express as a dependency if using this mode
// Run: node index.js

if (require.main === module) {
  let express;
  try {
    express = require("express");
  } catch (e) {
    console.error(
      "Express not installed. Run: npm install express\n" +
      "Or use this hook via OpenClaw's built-in webhook support instead."
    );
    process.exit(1);
  }

  const app = express();
  const PORT = process.env.PORT || 3456;

  // TODO: Add webhook signature verification middleware
  // Netlify signs webhooks with JWS — verify before processing
  // See: https://docs.netlify.com/forms/notifications/#outgoing-webhooks

  app.use(express.json());

  app.post("/webhook", async (req, res) => {
    log("info", "Received webhook POST", {
      contentType: req.headers["content-type"],
      bodyKeys: Object.keys(req.body || {}),
    });

    try {
      const formData = extractFormData(req.body);
      const result = writeToInbox(formData);

      res.json({
        status: "ok",
        file: result.fileName,
      });
    } catch (err) {
      log("error", "Webhook processing failed", { error: err.message });
      res.status(500).json({
        status: "error",
        error: err.message,
      });
    }
  });

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.json({ status: "ok", service: "netlify-webhook-bridge" });
  });

  app.listen(PORT, () => {
    console.log(`Netlify webhook bridge listening on port ${PORT}`);
    console.log(`Webhook URL: http://localhost:${PORT}/webhook`);
    console.log(`Inbox directory: ${INBOX_DIR}`);
  });
}
