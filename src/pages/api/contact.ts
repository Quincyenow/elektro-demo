export const prerender = false;

import { business } from '../../data/business.ts';

interface ContactPayload {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST({ request }: { request: Request }) {
  let data: ContactPayload;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Ungültige Anfrage.' }), { status: 400 });
  }

  const { name, phone, email, service, message } = data;

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Bitte Name, E-Mail und Nachricht ausfüllen.' }),
      { status: 400 },
    );
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const fromEmail = import.meta.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const notifyEmail = import.meta.env.CONTACT_NOTIFICATION_EMAIL || business.email;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Anfrage konnte nicht versendet werden. Bitte ruf uns direkt an.' }),
      { status: 500 },
    );
  }

  const internalNotification = {
    from: fromEmail,
    to: notifyEmail,
    reply_to: email,
    subject: `Neue Anfrage von ${name}${service ? ` (${service})` : ''}`,
    html: `
      <h2>Neue Kontaktanfrage über die Website</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(phone || '–')}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Leistung:</strong> ${escapeHtml(service || '–')}</p>
      <p><strong>Nachricht:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `,
  };

  const confirmation = {
    from: fromEmail,
    to: email,
    subject: `${business.name} – wir haben Ihre Anfrage erhalten`,
    html: `
      <p>Hallo ${escapeHtml(name)},</p>
      <p>vielen Dank für Ihre Anfrage bei ${business.name}. Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
      <p>Bei dringenden Fällen erreichen Sie uns direkt unter ${business.phone}.</p>
      <p>Viele Grüße<br>${business.name}</p>
    `,
  };

  try {
    const responses = await Promise.all(
      [internalNotification, confirmation].map((payload) =>
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

    const failed = responses.find((r) => !r.ok);
    if (failed) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Anfrage konnte nicht versendet werden. Bitte ruf uns direkt an.' }),
        { status: 502 },
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Anfrage konnte nicht versendet werden. Bitte ruf uns direkt an.' }),
      { status: 500 },
    );
  }
}
