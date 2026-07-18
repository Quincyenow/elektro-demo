# Landing Page – Dating Coach Quincy | Flirt-Psychologie

Eigenständiger Ordner, getrennt von `elektro-demo` und den anderen Paketen im
Repo. Enthält eine einzelne Landingpage (`index.html`) plus eine kleine
Serverless-Funktion (`api/subscribe.js`) für die Newsletter-Anmeldung.

## Deployment

Dieser Ordner ist **noch nicht automatisch live**. Um ihn unter einer eigenen
URL erreichbar zu machen:

1. Neues Vercel-Projekt anlegen, **Root Directory** auf `landing-page` setzen.
2. Unter Project Settings → Environment Variables setzen:
   - `RESEND_API_KEY` – API-Key von [resend.com](https://resend.com)
   - `LEAD_NOTIFICATION_EMAIL` – Adresse, an die neue Anmeldungen gemeldet werden
   - `RESEND_FROM_EMAIL` – Absenderadresse (optional, Default: `onboarding@resend.dev`)
3. Deployen. Vercel erkennt `api/subscribe.js` automatisch als Serverless Function.

## Video live schalten

In `index.html` beim `<iframe>` (Kommentar direkt darüber) den echten
YouTube- oder Loom-Embed-Link einsetzen, danach den `.video-placeholder`-Block
darunter entfernen oder mit `style="display:none"` ausblenden.

## Newsletter-Formular

Aktuell verschickt `api/subscribe.js` Anmeldungen einfach per E-Mail (über
Resend) – als Übergangslösung, bis ihr euch für ein richtiges
Newsletter-Tool (Mailchimp, Brevo, ConvertKit, …) entschieden habt. Das
Frontend-Formular muss dafür später nicht geändert werden, nur die Logik in
`api/subscribe.js` wird gegen die API des gewählten Tools ausgetauscht.
