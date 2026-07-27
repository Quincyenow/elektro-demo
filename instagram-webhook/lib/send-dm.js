/**
 * Sends an Instagram Direct Message via the Graph API.
 *
 * Requires the token to have:
 *   instagram_manage_messages
 *   instagram_basic
 *
 * API reference:
 *   https://developers.facebook.com/docs/messenger-platform/instagram/features/send-message
 */

const GRAPH_API_VERSION = 'v21.0';
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

/**
 * @param {object} opts
 * @param {string} opts.recipientId   - Instagram-scoped user ID of the recipient
 * @param {string} opts.message       - Text to send
 * @param {string} opts.accessToken   - Page / System User access token
 * @param {string} opts.pageId        - Instagram Business Account ID
 * @returns {Promise<{ message_id: string }>}
 */
export async function sendDM({ recipientId, message, accessToken, pageId }) {
  const url = `${GRAPH_BASE}/${pageId}/messages`;

  const body = {
    recipient: { id: recipientId },
    message:   { text: message },
    // messaging_type RESPONSE is valid within the 24-hour window after
    // the user last contacted you. For proactive DMs triggered by comments
    // use MESSAGE_TAG with the correct tag.
    messaging_type: 'MESSAGE_TAG',
    tag: 'HUMAN_AGENT',
  };

  const res = await fetch(url, {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    const detail = data?.error?.message ?? JSON.stringify(data);
    throw new Error(`Graph API error ${res.status}: ${detail}`);
  }

  return data; // { recipient_id, message_id }
}
