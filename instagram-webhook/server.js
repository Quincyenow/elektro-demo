/**
 * Instagram Webhook — Keyword-triggered DM sender
 *
 * Listens for Instagram comments and @mentions. When a comment contains a
 * configured keyword (e.g. "FLIRT"), it sends the commenter a Direct Message
 * via the Instagram Graph API with a link to your site.
 *
 * Required environment variables (copy .env.example → .env):
 *   INSTAGRAM_VERIFY_TOKEN   — arbitrary string you set in Meta App Dashboard
 *   INSTAGRAM_ACCESS_TOKEN   — Page-scoped or System User token with
 *                              instagram_manage_messages + instagram_basic
 *   INSTAGRAM_PAGE_ID        — Numeric ID of your Instagram Business Account
 *   PORT                     — (optional) defaults to 3000
 */

import express from 'express';
import { verifySignature } from './lib/verify-signature.js';
import { sendDM } from './lib/send-dm.js';
import { extractTriggers } from './lib/extract-triggers.js';

// ── Config ────────────────────────────────────────────────────────────────────

const {
  INSTAGRAM_VERIFY_TOKEN,
  INSTAGRAM_ACCESS_TOKEN,
  INSTAGRAM_APP_SECRET,   // optional but recommended for signature verification
  INSTAGRAM_PAGE_ID,
  PORT = '3000',
} = process.env;

if (!INSTAGRAM_VERIFY_TOKEN || !INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_PAGE_ID) {
  console.error(
    '[startup] Missing required env vars. ' +
    'Copy .env.example → .env and fill in the values.'
  );
  process.exit(1);
}

// Keywords that trigger an auto-DM (case-insensitive, whole-word match)
const TRIGGER_KEYWORDS = ['FLIRT'];

// The message sent to the commenter
const DM_MESSAGE =
  'Hey! 👋 Du hast das Zauberwort gefunden. ' +
  'Hier ist dein Link zur Flirt-Psychologie: https://www.flirt-psychologie.de/ ✨';

// ── Express app ───────────────────────────────────────────────────────────────

const app = express();

// Raw body buffer needed for HMAC signature verification
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

// ── Webhook verification (GET) ────────────────────────────────────────────────
// Meta calls this once when you register the webhook URL in the App Dashboard.

app.get('/webhook', (req, res) => {
  const mode      = req.query['hub.mode'];
  const token     = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === INSTAGRAM_VERIFY_TOKEN) {
    console.log('[webhook] Verification handshake succeeded.');
    res.status(200).send(challenge);
  } else {
    console.warn('[webhook] Verification failed — token mismatch or wrong mode.');
    res.sendStatus(403);
  }
});

// ── Webhook event receiver (POST) ─────────────────────────────────────────────

app.post('/webhook', async (req, res) => {
  // Acknowledge immediately — Meta expects a 200 within 20 s
  res.sendStatus(200);

  // Optional but strongly recommended: verify the X-Hub-Signature-256 header
  if (INSTAGRAM_APP_SECRET) {
    const valid = verifySignature(req.rawBody, req.headers['x-hub-signature-256'], INSTAGRAM_APP_SECRET);
    if (!valid) {
      console.warn('[webhook] Signature mismatch — payload ignored.');
      return;
    }
  }

  const body = req.body;

  // Only handle instagram events
  if (body.object !== 'instagram') {
    return;
  }

  for (const entry of body.entry ?? []) {
    for (const change of entry.changes ?? []) {
      await handleChange(change);
    }
    // Messaging events arrive in entry.messaging, not entry.changes
    for (const messaging of entry.messaging ?? []) {
      await handleMessaging(messaging);
    }
  }
});

// ── Event handlers ────────────────────────────────────────────────────────────

/**
 * Handles `changes` items — covers comment webhooks on feed posts.
 */
async function handleChange(change) {
  const { field, value } = change;

  if (field === 'comments') {
    // value.from.id  — commenter's Instagram-scoped user ID
    // value.text     — comment text
    const commenterId = value?.from?.id;
    const text        = value?.text ?? '';
    const mediaId     = value?.media?.id ?? value?.media_id ?? '';

    if (!commenterId || commenterId === INSTAGRAM_PAGE_ID) {
      // Skip own comments
      return;
    }

    console.log(`[comment] from=${commenterId} media=${mediaId} text="${text}"`);

    if (hasTriggerKeyword(text)) {
      await triggerDM(commenterId, text, 'comment');
    }
  }

  if (field === 'mentions') {
    // Fired when someone @mentions your account in a comment or caption
    const commenterId = value?.commenter_id;
    const mediaId     = value?.media_id ?? '';

    if (!commenterId) return;

    console.log(`[mention] from=${commenterId} media=${mediaId}`);

    // Fetch the comment text to check for keyword (mentions payload omits text)
    const text = await fetchCommentText(mediaId, commenterId);
    if (text && hasTriggerKeyword(text)) {
      await triggerDM(commenterId, text, 'mention');
    } else {
      // Still DM on any mention if you prefer — remove the keyword guard
      // await triggerDM(commenterId, '', 'mention');
    }
  }
}

/**
 * Handles `messaging` items — covers Instagram Direct messages sent TO the page.
 * Useful if you also want to respond to incoming DMs containing the keyword.
 */
async function handleMessaging(messaging) {
  const senderId = messaging?.sender?.id;
  const text     = messaging?.message?.text ?? '';

  if (!senderId || senderId === INSTAGRAM_PAGE_ID) return;

  // Ignore echo events (messages the page sent)
  if (messaging?.message?.is_echo) return;

  console.log(`[dm-received] from=${senderId} text="${text}"`);

  if (hasTriggerKeyword(text)) {
    await triggerDM(senderId, text, 'dm');
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function hasTriggerKeyword(text) {
  const normalised = text.toUpperCase();
  return TRIGGER_KEYWORDS.some((kw) => {
    // Whole-word / hashtag-aware match
    const pattern = new RegExp(`(?:^|[\\s#])${kw}(?:[\\s!?.,:;]|$)`);
    return pattern.test(normalised);
  });
}

/**
 * Sends the DM and logs the outcome.
 */
async function triggerDM(recipientId, originalText, source) {
  console.log(
    `[trigger] keyword matched via ${source} — sending DM to ${recipientId}`
  );
  try {
    const result = await sendDM({
      recipientId,
      message: DM_MESSAGE,
      accessToken: INSTAGRAM_ACCESS_TOKEN,
      pageId: INSTAGRAM_PAGE_ID,
    });
    console.log(`[dm-sent] to=${recipientId} messageId=${result?.message_id}`);
  } catch (err) {
    console.error(`[dm-error] to=${recipientId}`, err.message ?? err);
  }
}

/**
 * Fetches the text of a specific comment — needed for mention events which
 * don't include the comment body in the webhook payload.
 */
async function fetchCommentText(mediaId, commenterId) {
  try {
    const url = new URL(`https://graph.facebook.com/v21.0/${mediaId}/comments`);
    url.searchParams.set('fields', 'text,from');
    url.searchParams.set('access_token', INSTAGRAM_ACCESS_TOKEN);

    const res  = await fetch(url.toString());
    const data = await res.json();

    const match = (data.data ?? []).find((c) => c.from?.id === commenterId);
    return match?.text ?? null;
  } catch (err) {
    console.warn('[fetchCommentText] Failed:', err.message);
    return null;
  }
}

// Also expose extractTriggers for use in tests / CLI checks
export { extractTriggers, hasTriggerKeyword };

// ── Start ─────────────────────────────────────────────────────────────────────

app.listen(Number(PORT), () => {
  console.log(`[server] Instagram webhook listening on http://localhost:${PORT}/webhook`);
  console.log(`[server] Trigger keywords: ${TRIGGER_KEYWORDS.join(', ')}`);
});
