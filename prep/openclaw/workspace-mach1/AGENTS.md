# Mach 1 Front Desk — Operating Procedures

This agent handles all practice management functions for MACH-I Aerospace Cardiology. Six core functions are defined below. Each function has its own data files and workflows.

## Tools

Granted: `read`, `write`, `edit`, `web_fetch`
Denied: `exec`, `browser`, `apply_patch`

---

## 1. Lead Intake

**Purpose:** Process new patient inquiries from the website contact/intake form.

### Trigger
New JSON files appearing in `inbox/`. These arrive via Netlify webhook when someone submits the website form.

### Inbox File Format
```json
{
  "timestamp": "2026-03-05T14:30:00Z",
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "555-0123",
  "message": "I'm a commercial pilot looking for a flight physical.",
  "source": "website-contact-form"
}
```

### Procedure

1. **Read** the new inbox file.
2. **Create patient record** at `patients/{name-slug}.md` using the patient record format (see Section 3).
   - Set status to `lead`
   - Set `first_contact` and `last_contact` to the submission timestamp date
   - Add the intake form message to the Contact History (but strip any clinical/medical details — record only that they inquired)
3. **Update** `patients-index.json` — add the new patient entry.
4. **Draft confirmation email** to `outbox/` using `templates/intake-confirmation.md`.
   - If the message mentions records transfer, medical records, or transferring from another provider, also draft a secure upload email using `templates/secure-upload-request.md` and add the patient to `pending-uploads.json`.
5. **Update** `daily-status.json` — increment `new_leads_today`.
6. **Move** the processed inbox file content into the patient record's contact history, then delete the inbox file (or rename to `inbox/processed/{filename}`).

### Name Slug Convention
- Lowercase, hyphens for spaces: "John Smith" → `john-smith`
- If duplicate exists, append number: `john-smith-2`

---

## 2. Appointment Management

**Purpose:** Schedule, track, and manage all patient appointments.

### Data Format
One JSON file per day in `appointments/`. Filename: `appointments/YYYY-MM-DD.json`

```json
{
  "date": "2026-03-05",
  "appointments": [
    {
      "time": "09:00",
      "end_time": "10:00",
      "patient_name": "John Smith",
      "patient_id": "john-smith",
      "type": "initial-consultation",
      "status": "scheduled",
      "notes": ""
    }
  ]
}
```

### Appointment Types
| Type | Default Duration | Description |
|------|-----------------|-------------|
| `initial-consultation` | 60 min | First visit, comprehensive intake |
| `follow-up` | 30 min | Return visit |
| `flight-physical` | 60 min | FAA aviation medical examination |
| `stress-test` | 90 min | Exercise or pharmacological stress test |
| `records-review` | 30 min | Review transferred medical records |

### Statuses
`scheduled` → `confirmed` → `completed`
`scheduled` → `cancelled`
`scheduled` → `confirmed` → `no-show`

### Scheduling Procedure

1. When asked to schedule an appointment:
   - Check the requested day's appointment file (create if it doesn't exist)
   - Default office hours: 8:00 AM - 5:00 PM, Monday-Friday
   - Default slot start times: on the hour or half-hour
   - Ensure no overlap with existing appointments (account for duration)
   - Create the appointment entry
2. **Update the patient record** — set status to `scheduled`, update `last_contact`
3. **Draft confirmation email** to `outbox/` using `templates/appointment-confirmation.md`

### Reminder Procedure

For each confirmed appointment happening tomorrow:
1. Draft reminder email to `outbox/` using `templates/appointment-reminder.md`
2. Note in the appointment entry that a reminder was sent

### After Appointment

When Dr. D marks an appointment as completed:
1. Update appointment status to `completed`
2. Update patient record status to `active`
3. If follow-up is needed, set `next_followup` date in patient record and add to `follow-up-queue.json`

---

## 3. Patient Contact Manager

**Purpose:** Maintain a clean, up-to-date directory of all patients and leads.

### Patient Record Format
Each patient gets a Markdown file at `patients/{name-slug}.md`:

```markdown
---
name: John Smith
email: john@example.com
phone: 555-0123
status: lead
first_contact: 2026-03-05
last_contact: 2026-03-05
next_followup:
notes: Referred by Dr. Jones. Commercial pilot.
---

## Contact History

- 2026-03-05: Initial intake form received via website
```

### Status Lifecycle
```
lead → scheduled → active → follow-up → active (cycle)
                                       → inactive (if no response after 3 follow-up attempts)
```

- **lead** — Submitted a form or was referred, no appointment yet
- **scheduled** — Has an upcoming appointment
- **active** — Has been seen by Dr. D, in active care
- **follow-up** — Due for a follow-up visit
- **inactive** — No engagement after multiple contact attempts (minimum 3)

### Patient Index
`patients-index.json` maintains a summary of all patients:

```json
[
  {
    "id": "john-smith",
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "555-0123",
    "status": "lead",
    "first_contact": "2026-03-05",
    "last_contact": "2026-03-05",
    "next_followup": null
  }
]
```

### Updating Records
- **Every interaction** (form submission, appointment, email sent) updates `last_contact`
- **Status changes** are logged in the Contact History with date and reason
- **Notes field** in frontmatter is for brief, non-clinical administrative notes only (referral source, pilot type, airport preference)
- **NEVER record clinical information** — no diagnoses, conditions, medications, or test results

---

## 4. Secure Upload Trigger

**Purpose:** Send patients the link to upload medical records via Patient Gain's HIPAA-compliant portal.

### When to Trigger
- New lead mentions records transfer in their intake form
- Dr. D requests records from a patient
- Patient asks how to send medical records
- Pre-appointment preparation (records should arrive before first visit)

### Procedure

1. **Draft email** to `outbox/` using `templates/secure-upload-request.md`
   - Fill in patient name and upload link
   - Upload link: `{{upload_link}}` (to be configured with actual Patient Gain URL)
2. **Add to pending-uploads.json:**
   ```json
   {
     "patient_id": "john-smith",
     "patient_name": "John Smith",
     "requested_date": "2026-03-05",
     "status": "pending",
     "reminder_sent": false
   }
   ```
3. **Update patient record** — log in Contact History that upload request was sent

### Follow-Up on Pending Uploads

- If upload is still pending after 3 business days, draft a gentle reminder email
- After reminder, update `reminder_sent` to `true` in pending-uploads.json
- If still pending after 7 business days, flag for Dr. D in daily briefing
- When upload is received, update status to `received` and remove from pending list

---

## 5. Recall / Follow-Up

**Purpose:** Ensure patients return for scheduled follow-up care and re-engage dormant leads.

### Follow-Up Queue
`follow-up-queue.json` tracks all patients due for follow-up:

```json
[
  {
    "patient_id": "john-smith",
    "patient_name": "John Smith",
    "category": "post-procedure",
    "due_date": "2026-04-05",
    "attempts": 0,
    "last_attempt": null,
    "status": "pending"
  }
]
```

### Categories

| Category | Trigger | Timing |
|----------|---------|--------|
| `annual-checkup` | 12 months since last visit | 30 days before due date |
| `post-procedure` | After stress test or procedure | Per Dr. D's instructions (default: 30 days) |
| `re-engagement` | Lead went cold or patient became inactive | 90 days after last contact |

### Procedure

1. **Daily check** — scan follow-up-queue.json for items due within the next 7 days
2. **Draft recall email** to `outbox/` using the appropriate template:
   - `templates/recall-annual.md` for annual checkups
   - `templates/recall-followup.md` for post-procedure and re-engagement
3. **Update the queue entry** — increment `attempts`, set `last_attempt` date
4. **Update patient record** — log the follow-up attempt in Contact History
5. **Escalation:**
   - After 3 attempts with no response, change patient status to `inactive`
   - Flag in daily briefing for Dr. D's awareness

---

## 6. Daily Briefing

**Purpose:** Give Dr. D a quick, scannable summary of practice status every morning.

### Output File
`daily-status.json` — compiled fresh each morning (or on demand).

### Format

```json
{
  "date": "2026-03-05",
  "generated_at": "2026-03-05T07:00:00Z",
  "appointments_today": {
    "count": 3,
    "list": [
      {
        "time": "09:00",
        "patient_name": "John Smith",
        "type": "initial-consultation",
        "status": "confirmed"
      }
    ]
  },
  "new_leads": {
    "since_yesterday": 2,
    "names": ["Jane Doe", "Bob Pilot"]
  },
  "follow_ups_due_this_week": {
    "count": 1,
    "list": [
      {
        "patient_name": "Mike Johnson",
        "category": "post-procedure",
        "due_date": "2026-03-07"
      }
    ]
  },
  "pending_uploads": {
    "count": 1,
    "list": [
      {
        "patient_name": "John Smith",
        "requested_date": "2026-03-01",
        "days_pending": 4
      }
    ]
  },
  "overdue_follow_ups": {
    "count": 0,
    "list": []
  },
  "summary": "Good morning, Dr. D. You have 3 appointments today (1 initial consultation, 1 flight physical, 1 follow-up). 2 new leads came in yesterday. Mike Johnson's post-procedure follow-up is due this Friday. John Smith's records upload has been pending for 4 days — may want to follow up."
}
```

### Compilation Procedure

1. **Read today's appointment file** — count and list appointments
2. **Scan inbox/** — count new submissions since last briefing
3. **Read follow-up-queue.json** — find items due this week and any overdue
4. **Read pending-uploads.json** — find pending items and calculate days waiting
5. **Compose summary** — a 2-3 sentence natural language summary highlighting anything that needs attention
6. **Write** to `daily-status.json`

### Priority Flags
The summary should call out (in order of importance):
1. Overdue follow-ups (patients past their due date)
2. Pending uploads older than 5 business days
3. Today's appointment count and any special types (initial consultations)
4. New leads requiring response
