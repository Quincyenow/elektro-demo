# Instagram Webhook — Keyword DM Bot

Listens for Instagram comment and mention webhook events. When a comment contains
a trigger keyword (default: **FLIRT**), it automatically sends the commenter a
Direct Message with a link to https://www.flirt-psychologie.de/.

## Quick start

```bash
cd instagram-webhook
npm install
cp .env.example .env   # fill in your tokens
npm start
```

The server starts on `http://localhost:3000/webhook`.

## Prerequisites

### 1. Meta App & Instagram account

- A **Meta for Developers** app at https://developers.facebook.com/
- An **Instagram Business or Creator** account connected to a Facebook Page
- The app must have the **Instagram Graph API** product added

### 2. Required permissions (token scopes)

| Permission | Purpose |
|---|---|
| `instagram_basic` | Read account info |
| `instagram_manage_messages` | Send DMs |
| `pages_messaging` | Required alongside Instagram perms |

### 3. Webhook subscriptions

In the App Dashboard → **Webhooks** → **Instagram**, subscribe to:

| Field | What it fires on |
|---|---|
| `comments` | Someone comments on your post |
| `mentions` | Someone @mentions your account in a comment |
| `messages` | Incoming DMs (optional — for keyword DMs too) |

Set **Callback URL** to `https://your-domain.com/webhook` and **Verify Token**
to whatever you put in `INSTAGRAM_VERIFY_TOKEN`.

### 4. Expose locally for testing

Use [ngrok](https://ngrok.com/) or [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) to get a public HTTPS URL:

```bash
ngrok http 3000
# → Forwarding https://abc123.ngrok.io → localhost:3000
```

Paste `https://abc123.ngrok.io/webhook` into the Meta Dashboard.

## Configuration

Edit the top of `server.js` to change keywords or the DM message:

```js
const TRIGGER_KEYWORDS = ['FLIRT', 'INFO'];   // add more as needed

const DM_MESSAGE =
  'Hey! 👋 Hier ist dein Link: https://www.flirt-psychologie.de/ ✨';
```

## How it works

```
Instagram user comments "FLIRT" on your post
         │
         ▼
Meta sends POST /webhook  (signed with X-Hub-Signature-256)
         │
         ▼
server.js verifies signature → parses event type
         │
         ├─ field: "comments"  → check text for keyword
         ├─ field: "mentions"  → fetch comment text → check keyword
         └─ messaging entry    → check DM text for keyword
         │
         ▼
hasTriggerKeyword() matches → sendDM() calls Graph API
POST /v21.0/{PAGE_ID}/messages
         │
         ▼
User receives DM with the configured link
```

## API notes

- The `HUMAN_AGENT` message tag allows proactive DMs outside the 24-hour window.
  It requires your app to be reviewed and approved for that tag by Meta.
- For testing within the 24-hour window (user messaged you first), change
  `messaging_type` to `RESPONSE` in `lib/send-dm.js`.

## File structure

```
instagram-webhook/
├── server.js              # Express app + webhook handlers
├── lib/
│   ├── send-dm.js         # Graph API DM sender
│   ├── verify-signature.js # HMAC signature verification
│   └── extract-triggers.js # Pure keyword matcher (testable)
├── .env.example           # Environment variable template
└── package.json
```
