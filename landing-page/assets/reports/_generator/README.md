# PDF-Generator für Gratis-Reports

`generate_gespraechsoeffner.py` ist die Master-Vorlage für alle Gratis-Report-PDFs
(Navy/Gold-Branding, Logo oben links, nummerierte Abschnitte, CTA-Box am Ende).

## Neues Thema erstellen

1. Datei kopieren und sinnvoll umbenennen, z.B. `generate_selbstbewusstsein.py`.
2. Nur die Textvariablen anpassen: `Titel`, Untertitel, `intro`, die drei
   Einträge in `openers` (Überschrift, Haupttext, "Warum das funktioniert"),
   `closing` und `cta_body`. Layout, Farben, Logo und Seitenumbruch bleiben
   automatisch identisch.
3. Am Ende des Skripts den Dateinamen in `OUTPUT_PATH` anpassen (Standard:
   eine Ebene höher, also direkt in `assets/reports/`).
4. Ausführen:
   ```
   pip install reportlab pillow
   python3 generate_<thema>.py
   ```
5. In `landing-page/index.html` im Objekt `LEAD_MAGNETS` einen neuen Eintrag
   hinzufügen (Titel + Dateiname), z.B.:
   ```js
   selbstbewusstsein: { title: 'Mehr Selbstbewusstsein – Gratis-Report', file: 'assets/reports/selbstbewusstsein.pdf' },
   ```
6. Der Link fürs jeweilige YouTube-Video lautet dann z.B.:
   `https://goflirtpsychologie.de/?lead_magnet=selbstbewusstsein`

## Wichtig

Die Texte müssen eigenständig geschrieben sein -- keine Inhalte von fremden
Webseiten/Artikeln übernehmen oder nur leicht umformulieren, das ist eine
Urheberrechtsverletzung.
