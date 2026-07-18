// Vercel Serverless Function: nimmt die 4 SPIN-Funnel-Antworten samt E-Mail
// entgegen und schickt eine strukturierte Zusammenfassung per Resend.
//
// Nutzt dieselben Umgebungsvariablen wie subscribe.js:
//   RESEND_API_KEY, LEAD_NOTIFICATION_EMAIL, RESEND_FROM_EMAIL (optional)

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const QUESTIONS = {
  q1: 'Größte Herausforderung in der Gesprächsführung',
  q2: 'Bisheriges Hindernis für nachhaltige Verbesserung',
  q3: 'Auswirkung auf das Selbstvertrauen',
  q4: 'Verbindlichkeit, das Thema in 30 Tagen anzugehen',
};

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
  const { name, email, answers } = body || {};

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ ok: false, error: 'Bitte eine gültige E-Mail-Adresse angeben.' });
    return;
  }
  if (!answers || typeof answers !== 'object') {
    res.status(400).json({ ok: false, error: 'Fehlende Antworten.' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const notifyEmail = process.env.LEAD_NOTIFICATION_EMAIL;

  if (!apiKey || !notifyEmail) {
    res.status(500).json({ ok: false, error: 'Anfrage aktuell nicht möglich. Bitte später erneut versuchen.' });
    return;
  }

  const rows = Object.keys(QUESTIONS)
    .map((key) => {
      const answer = answers[key];
      if (!answer) return '';
      return `<tr><td style="padding:6px 12px 6px 0;color:#888;vertical-align:top;white-space:nowrap">${escapeHtml(QUESTIONS[key])}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(answer)}</td></tr>`;
    })
    .join('');

  const notification = {
    from: fromEmail,
    to: notifyEmail,
    reply_to: email,
    subject: `Neuer SPIN-Funnel-Abschluss (${email})`,
    html: `
      <h2>Neuer Erstgespräch-Lead über den SPIN-Funnel</h2>
      <p><strong>Name:</strong> ${escapeHtml(name || '–')}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      <table cellspacing="0" cellpadding="0" style="margin-top:12px;border-collapse:collapse">${rows}</table>
    `,
  };

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notification),
    });

    const text = await response.clone().text();
    console.log('[spin-summary] resend response status:', response.status, 'body:', text);

    if (!response.ok) {
      res.status(502).json({ ok: false, error: 'Zusammenfassung konnte nicht gesendet werden.' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.log('[spin-summary] threw:', err && err.stack ? err.stack : err);
    res.status(500).json({ ok: false, error: 'Zusammenfassung konnte nicht gesendet werden.' });
  }
};
