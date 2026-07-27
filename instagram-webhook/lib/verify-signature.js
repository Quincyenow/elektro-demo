/**
 * Verifies the X-Hub-Signature-256 header sent by Meta on every webhook POST.
 * This prevents spoofed payloads from triggering DMs.
 *
 * Docs: https://developers.facebook.com/docs/messenger-platform/webhooks#validate-payloads
 */

import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * @param {Buffer}        rawBody    - Raw request body buffer (set by express verify callback)
 * @param {string|undefined} header  - Value of X-Hub-Signature-256 header
 * @param {string}        appSecret  - Your Meta App Secret
 * @returns {boolean}
 */
export function verifySignature(rawBody, header, appSecret) {
  if (!header || !rawBody) return false;

  const expected = `sha256=${createHmac('sha256', appSecret).update(rawBody).digest('hex')}`;

  try {
    return timingSafeEqual(Buffer.from(header), Buffer.from(expected));
  } catch {
    // Buffers of different length throw — means they don't match
    return false;
  }
}
