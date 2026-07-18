// Vercel Serverless Function: nimmt E-Mail-Anmeldungen vom Landing-Page-Formular
// entgegen und verschickt sie per Resend (https://resend.com) als E-Mail.
//
// Benötigte Umgebungsvariablen (im Vercel-Projekt unter Settings -> Environment
// Variables setzen):
//   RESEND_API_KEY         – API-Key von resend.com
//   LEAD_NOTIFICATION_EMAIL – Adresse, an die neue Anmeldungen gemeldet werden
//   RESEND_FROM_EMAIL       – Absenderadresse (optional, Default: onboarding@resend.dev)
//
// Sobald ihr euch für ein richtiges Newsletter-Tool (z.B. Mailchimp, Brevo,
// ConvertKit) entscheidet, kann diese Funktion durch einen Aufruf von dessen
// API ersetzt werden – das Formular im Frontend bleibt dabei unverändert.

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function utmToHtml(utm) {
  if (!utm || typeof utm !== 'object') return '';
  const labels = {
    utm_source: 'Quelle',
    utm_medium: 'Medium',
    utm_campaign: 'Kampagne',
    utm_content: 'Inhalt',
    utm_term: 'Suchbegriff',
  };
  const rows = Object.keys(labels)
    .filter((key) => utm[key])
    .map((key) => `<p><strong>${labels[key]}:</strong> ${escapeHtml(utm[key])}</p>`)
    .join('');
  return rows;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Methode nicht erlaubt.' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const { name, email, utm, leadMagnet } = body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ ok: false, error: 'Bitte eine gültige E-Mail-Adresse angeben.' });
    return;
  }

  // Nur bekannte Report-Dateien zulassen (kein beliebiger Pfad von außen).
  const reportFile =
    leadMagnet && typeof leadMagnet.file === 'string' && /^assets\/reports\/[a-z0-9_-]+\.pdf$/.test(leadMagnet.file)
      ? leadMagnet.file
      : 'assets/reports/default.pdf';
  const reportTitle = leadMagnet && leadMagnet.title ? String(leadMagnet.title) : 'Dein Gratis-Report';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const downloadUrl = `https://${host}/${reportFile}`;

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const notifyEmail = process.env.LEAD_NOTIFICATION_EMAIL;

  if (!apiKey || !notifyEmail) {
    res.status(500).json({ ok: false, error: 'Anmeldung aktuell nicht möglich. Bitte später erneut versuchen.' });
    return;
  }

  const notification = {
    from: fromEmail,
    to: notifyEmail,
    reply_to: email,
    subject: `Neue Gratis-Report-Anmeldung (${email})`,
    html: `
      <h2>Neue Newsletter-Anmeldung über die Landing Page</h2>
      <p><strong>Name:</strong> ${escapeHtml(name || '–')}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Angeforderter Report:</strong> ${escapeHtml(reportTitle)}</p>
      ${utmToHtml(utm)}
    `,
  };

  const confirmation = {
    from: fromEmail,
    to: email,
    subject: `${reportTitle} – hier ist dein Download`,
    html: `
      <p>Hallo${name ? ' ' + escapeHtml(name) : ''},</p>
      <p>danke für dein Interesse! Hier ist dein Report zum Download:</p>
      <p><a href="${downloadUrl}">${escapeHtml(reportTitle)} herunterladen</a></p>
      <p>Viele Grüße<br>Quincy – Experte für Gesprächsführung</p>
    `,
  };

  console.log('[subscribe] apiKey present:', !!apiKey, 'len:', apiKey ? apiKey.length : 0);
  console.log('[subscribe] notifyEmail:', notifyEmail, 'fromEmail:', fromEmail);

  try {
    const responses = await Promise.all(
      [notification, confirmation].map((payload) =>
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }),
      ),
    );

    for (const r of responses) {
      const text = await r.clone().text();
      console.log('[subscribe] resend response status:', r.status, 'body:', text);
    }

    const failed = responses.find((r) => !r.ok);
    if (failed) {
      res.status(502).json({ ok: false, error: 'Anmeldung konnte nicht gesendet werden. Bitte versuch es später erneut.' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.log('[subscribe] threw:', err && err.stack ? err.stack : err);
    res.status(500).json({ ok: false, error: 'Anmeldung konnte nicht gesendet werden. Bitte versuch es später erneut.' });
  }
};
