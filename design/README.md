# YouTube-Banner · Dr. Quincy

- `youtube-banner.html` – Quelle (2560×1440, Safe-Zone 1546×423 zentriert)
- `youtube-banner.png` – gerendertes Banner
- `foto.png` – **hier dein freigestelltes Foto ablegen** (transparent, Blick nach rechts).
  Sobald die Datei existiert, wird sie beim erneuten Rendern automatisch links eingesetzt.

## Neu rendern
```
CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
"$CHROME" --headless=new --no-sandbox --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=2560,1440 \
  --screenshot=youtube-banner.png youtube-banner.html
```
