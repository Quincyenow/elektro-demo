/**
 * Pure utility — extracts trigger keywords found in a text string.
 * Exported so it can be unit-tested independently of the HTTP layer.
 *
 * @param {string}   text     - Comment or message text
 * @param {string[]} keywords - Upper-cased keyword list (e.g. ['FLIRT'])
 * @returns {string[]}        - Matched keywords
 */
export function extractTriggers(text, keywords) {
  const normalised = text.toUpperCase();
  return keywords.filter((kw) => {
    const pattern = new RegExp(`(?:^|[\\s#])${kw}(?:[\\s!?.,:;]|$)`);
    return pattern.test(normalised);
  });
}
