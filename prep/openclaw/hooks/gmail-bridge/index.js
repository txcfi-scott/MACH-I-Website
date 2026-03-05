/**
 * Gmail Bridge Hook for OpenClaw
 *
 * This hooks into OpenClaw's hook system to send emails via Gmail API
 * when the MACH-1 agent writes outbox files.
 *
 * How it works:
 * - The agent drafts emails by writing JSON files to outbox/
 * - This hook watches for new files in the outbox directory
 * - Each file contains: { to, subject, body, template, variables }
 * - The hook sends via Gmail API using OAuth credentials
 * - After sending, moves the file to outbox/sent/ with a timestamp
 *
 * Environment variables needed:
 *   GMAIL_CLIENT_ID      - OAuth2 client ID from Google Cloud Console
 *   GMAIL_CLIENT_SECRET   - OAuth2 client secret
 *   GMAIL_REFRESH_TOKEN   - Long-lived refresh token for Dr. D's Gmail
 *
 * For Phase 1, Dr. D can also just read the outbox/ files and send
 * emails manually. This hook automates that step when ready.
 *
 * TODO: Test with actual Gmail API credentials
 * TODO: Add rate limiting (Gmail API has daily send limits)
 * TODO: Add retry logic for transient failures
 * TODO: Consider adding a "hold" mode where emails require approval
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

// --- Configuration ---

const OUTBOX_DIR = path.join(process.env.OPENCLAW_WORKSPACE || ".", "outbox");
const SENT_DIR = path.join(OUTBOX_DIR, "sent");
const LOG_FILE = path.join(
  process.env.OPENCLAW_WORKSPACE || ".",
  "logs",
  "gmail-bridge.log"
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

  // Ensure log directory exists
  const logDir = path.dirname(LOG_FILE);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  fs.appendFileSync(LOG_FILE, line);

  if (level === "error") {
    console.error(`[gmail-bridge] ${message}`, data || "");
  } else {
    console.log(`[gmail-bridge] ${message}`);
  }
}

// --- Gmail API helpers ---

/**
 * Get a fresh access token using the refresh token.
 * TODO: Cache the access token and only refresh when expired.
 */
async function getAccessToken() {
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Missing Gmail OAuth credentials. Set GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN."
    );
  }

  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }).toString();

    const options = {
      hostname: "oauth2.googleapis.com",
      path: "/token",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(body);
          if (parsed.access_token) {
            resolve(parsed.access_token);
          } else {
            reject(new Error(`Token refresh failed: ${body}`));
          }
        } catch (e) {
          reject(new Error(`Failed to parse token response: ${body}`));
        }
      });
    });

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

/**
 * Send an email via Gmail API.
 * TODO: Add support for HTML bodies and attachments.
 */
async function sendEmail(accessToken, { to, subject, body }) {
  // Build RFC 2822 message
  const messageParts = [
    `To: ${to}`,
    `Subject: ${subject}`,
    "Content-Type: text/plain; charset=utf-8",
    "",
    body,
  ];
  const rawMessage = messageParts.join("\r\n");

  // Base64url encode
  const encoded = Buffer.from(rawMessage)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ raw: encoded });

    const options = {
      hostname: "gmail.googleapis.com",
      path: "/gmail/v1/users/me/messages/send",
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let responseBody = "";
      res.on("data", (chunk) => (responseBody += chunk));
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(responseBody));
        } else {
          reject(
            new Error(
              `Gmail API error (${res.statusCode}): ${responseBody}`
            )
          );
        }
      });
    });

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

// --- Template rendering ---
// TODO: Implement proper template system. For now, simple variable substitution.

function renderTemplate(body, template, variables) {
  if (!template || !variables) return body;

  let rendered = body || "";
  for (const [key, value] of Object.entries(variables)) {
    rendered = rendered.replace(new RegExp(`{{${key}}}`, "g"), value);
  }
  return rendered;
}

// --- Outbox processing ---

/**
 * Process all pending outbox files.
 * Each file is a JSON object: { to, subject, body, template, variables }
 */
async function processOutbox() {
  // Ensure directories exist
  if (!fs.existsSync(OUTBOX_DIR)) {
    fs.mkdirSync(OUTBOX_DIR, { recursive: true });
  }
  if (!fs.existsSync(SENT_DIR)) {
    fs.mkdirSync(SENT_DIR, { recursive: true });
  }

  // Find pending JSON files (skip sent/ subdirectory)
  const files = fs.readdirSync(OUTBOX_DIR).filter((f) => {
    return f.endsWith(".json") && !fs.statSync(path.join(OUTBOX_DIR, f)).isDirectory();
  });

  if (files.length === 0) {
    log("info", "No outbox files to process.");
    return { sent: 0, failed: 0 };
  }

  log("info", `Found ${files.length} outbox file(s) to process.`);

  let accessToken;
  try {
    accessToken = await getAccessToken();
  } catch (err) {
    log("error", "Failed to get Gmail access token", { error: err.message });
    // In Phase 1 fallback: just log and leave files for manual send
    return { sent: 0, failed: files.length, error: err.message };
  }

  let sent = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(OUTBOX_DIR, file);
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const email = JSON.parse(raw);

      // Validate required fields
      if (!email.to || !email.subject) {
        throw new Error("Missing required fields: to, subject");
      }

      // Render template if provided
      const finalBody = renderTemplate(email.body, email.template, email.variables);

      // Send via Gmail
      const result = await sendEmail(accessToken, {
        to: email.to,
        subject: email.subject,
        body: finalBody,
      });

      // Move to sent/ with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const sentFileName = `${timestamp}_${file}`;
      const sentPath = path.join(SENT_DIR, sentFileName);

      // Add send metadata to the file
      const sentRecord = {
        ...email,
        _sent: {
          timestamp: new Date().toISOString(),
          gmailMessageId: result.id,
          renderedBody: finalBody,
        },
      };
      fs.writeFileSync(sentPath, JSON.stringify(sentRecord, null, 2));
      fs.unlinkSync(filePath);

      log("info", `Sent email to ${email.to}: "${email.subject}"`, {
        file,
        gmailId: result.id,
      });
      sent++;
    } catch (err) {
      log("error", `Failed to process outbox file: ${file}`, {
        error: err.message,
      });
      failed++;
    }
  }

  log("info", `Outbox processing complete: ${sent} sent, ${failed} failed.`);
  return { sent, failed };
}

// --- OpenClaw Hook Entry Point ---

/**
 * OpenClaw hook handler.
 *
 * This hook runs on the "message" event type. When triggered, it checks
 * the outbox directory for pending emails and sends them.
 *
 * Hook configuration in openclaw.json:
 * {
 *   "hooks": [{
 *     "id": "gmail-bridge",
 *     "event": "message",
 *     "handler": "./hooks/gmail-bridge/index.js"
 *   }]
 * }
 *
 * TODO: Determine the exact OpenClaw hook API signature.
 * TODO: Consider using "cron" event type instead of "message" for batch sends.
 */
module.exports = async function handler(event, context) {
  log("info", "Gmail bridge hook triggered", {
    eventType: event?.type,
    agentId: context?.agentId,
  });

  // Only process for our agent
  if (context?.agentId && context.agentId !== "mach1") {
    return;
  }

  try {
    const result = await processOutbox();
    return {
      status: "ok",
      ...result,
    };
  } catch (err) {
    log("error", "Hook execution failed", { error: err.message });
    return {
      status: "error",
      error: err.message,
    };
  }
};

// --- Direct invocation for testing ---
// Run: node index.js
if (require.main === module) {
  console.log("Running gmail-bridge hook directly for testing...");
  processOutbox()
    .then((result) => console.log("Result:", result))
    .catch((err) => console.error("Error:", err));
}
