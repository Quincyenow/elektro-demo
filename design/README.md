# YouTube-Banner · Dr. Quincy

**2560×1440 px** – alle Inhalte in der Safe-Zone (1546×423, auf Handy/Desktop/TV sichtbar).

## Dateien
- `youtube-banner.png` – **fertiger Banner** (hier hochladen bei YouTube → Kanal anpassen → Branding → Banner)
- `youtube-banner.html` – Quelle (Texte/Farben/Layout editierbar)
- `foto.png` – Original-Porträt (grauer Studio-Hintergrund)
- `foto_cut.png` – freigestelltes Porträt (transparent), wird im Banner verwendet
- `cutout.py` – Skript, das `foto.png` → `foto_cut.png` freistellt (netzwerkfrei)

## Neu freistellen (falls Foto getauscht wird)
```
python3 cutout.py      # erzeugt foto_cut.png aus foto.png
```

## Banner neu rendern
```
CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
"$CHROME" --headless=new --no-sandbox --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=2560,1440 \
  --screenshot=youtube-banner.png youtube-banner.html
```
