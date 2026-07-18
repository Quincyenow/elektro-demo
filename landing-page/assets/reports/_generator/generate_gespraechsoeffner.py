# -*- coding: utf-8 -*-
#
# Master-Vorlage für die Gratis-Report-PDFs (Navy/Gold-Branding).
#
# Für ein neues Thema: Diese Datei kopieren, umbenennen und nur die
# Textvariablen weiter unten ändern (Titel, Untertitel, "intro", die
# 3 Einträge in "openers", "closing", "cta_body") -- Layout, Farben,
# Logo und Seitenumbruch-Logik bleiben automatisch gleich.
#
# Ausführen: pip install reportlab pillow && python3 generate_<thema>.py
# Ergebnis liegt danach eine Ebene höher unter assets/reports/<thema>.pdf
# -- dort auch als neuen Eintrag in LEAD_MAGNETS in index.html eintragen.
#
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.lib.utils import ImageReader
from PIL import Image

NAVY = HexColor("#0b1c3f")
NAVY_DEEP = HexColor("#050b1c")
GOLD = HexColor("#e8c877")
GOLD2 = HexColor("#f6e4b0")
INK = HexColor("#f7f5ef")
MUTED = HexColor("#aeb7cc")

PAGE_W, PAGE_H = A4
MARGIN = 20 * mm
CONTENT_W = PAGE_W - 2 * MARGIN
BOTTOM_LIMIT = 24 * mm

import os
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", "..", "..", ".."))
LOGO_PATH = os.path.join(REPO_ROOT, "flirt-psychologie-paket", "assets", "img", "logo.png")
logo_img = Image.open(LOGO_PATH)
logo_w_px, logo_h_px = logo_img.size
logo_ratio = logo_h_px / logo_w_px
LOGO_W = 32 * mm
LOGO_H = LOGO_W * logo_ratio
logo_reader = ImageReader(LOGO_PATH)

OUTPUT_PATH = os.path.join(SCRIPT_DIR, "..", "gespraechsoeffner.pdf")
c = canvas.Canvas(OUTPUT_PATH, pagesize=A4)
page_num = [0]

def new_page(show_header=True):
    page_num[0] += 1
    c.setFillColor(NAVY)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    y = PAGE_H - MARGIN
    if show_header:
        c.drawImage(logo_reader, MARGIN, y - LOGO_H + 4, width=LOGO_W, height=LOGO_H,
                    mask='auto', preserveAspectRatio=True)
        c.setFont("Helvetica-Bold", 9)
        c.setFillColor(GOLD)
        c.drawRightString(MARGIN + CONTENT_W, y - 3, "GRATIS-REPORT")
        y -= max(LOGO_H, 8 * mm) + 6 * mm
    return y

def wrap_text(text, font, size, max_width):
    words = text.split()
    lines = []
    cur = ""
    for w in words:
        test = (cur + " " + w).strip()
        if stringWidth(test, font, size) <= max_width:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines

def ensure_space(y, needed):
    if y - needed < BOTTOM_LIMIT:
        draw_footer(page_num[0])
        c.showPage()
        y = new_page(show_header=False)
    return y

def draw_footer(n):
    c.setFont("Helvetica", 8)
    c.setFillColor(MUTED)
    c.drawCentredString(PAGE_W / 2, 12 * mm, f"Flirt Psychologie  ·  goflirtpsychologie.de  ·  Seite {n}")

def draw_paragraph(text, x, y, font, size, leading, color, max_width, space_after=6 * mm):
    lines = wrap_text(text, font, size, max_width)
    c.setFont(font, size)
    c.setFillColor(color)
    for line in lines:
        y = ensure_space(y, leading)
        c.drawString(x, y, line)
        y -= leading
    return y - (space_after - leading if space_after > leading else 0)

def draw_heading(text, x, y, size=14):
    y = ensure_space(y, size + 4)
    c.setFont("Helvetica-Bold", size)
    c.setFillColor(INK)
    c.drawString(x, y, text)
    return y - (size + 3)

# ---------- Page 1 ----------
y = new_page()

c.setFont("Helvetica-Bold", 10)
c.setFillColor(GOLD)
c.drawString(MARGIN, y, "FLIRT PSYCHOLOGIE")
y -= 13 * mm

c.setFont("Helvetica-Bold", 25)
c.setFillColor(INK)
c.drawString(MARGIN, y, "3 verführerische")
y -= 10.5 * mm
c.setFillColor(GOLD)
c.drawString(MARGIN, y, "Gesprächsöffner")
y -= 8 * mm

c.setFont("Helvetica", 12)
c.setFillColor(MUTED)
c.drawString(MARGIN, y, "So beginnst du ein Gespräch, das im Kopf bleibt")
y -= 12 * mm

c.setStrokeColor(GOLD)
c.setLineWidth(1)
c.line(MARGIN, y, MARGIN + CONTENT_W, y)
y -= 9 * mm

intro = ("Die meisten Männer beschäftigen sich stundenlang mit der Frage: „Was sage ich als "
         "Erstes?“ Dabei liegt genau hier der erste Denkfehler. Der perfekte Satz existiert nicht "
         "– und du brauchst ihn auch nicht, um ins Gespräch zu kommen. Was wirklich zählt, ist "
         "deine Haltung in diesem Moment: locker, neugierig und bei dir selbst. Ein Gespräch beginnt "
         "nicht mit cleveren Worten, sondern mit echtem Interesse. Die folgenden drei Ansätze zeigen "
         "dir, wie du diesen Einstieg findest – ganz ohne auswendig gelernte Sprüche.")
y = draw_paragraph(intro, MARGIN, y, "Helvetica", 10.5, 14.5, MUTED, CONTENT_W, space_after=8*mm)

openers = [
    ("1", "Der Moment-Opener",
     "Der einfachste Einstieg liegt direkt vor dir: die Situation, in der ihr euch gerade "
     "befindet. Sprich an, was passiert, was du siehst oder was dir auffällt – ganz ohne "
     "Umweg. An der Bushaltestelle zum Beispiel: „Fährt die Bahn hier eigentlich öfter zu "
     "spät, oder hab ich heute einfach Pech?“ Im Supermarkt: „Ich steh hier schon seit "
     "fünf Minuten und kann mich zwischen diesen zwei Sorten nicht entscheiden – welche "
     "würdest du nehmen?“ Diese Art von Opener wirkt leicht und alltäglich, weil sie genau "
     "das aufgreift, was gerade real zwischen euch passiert. Es gibt kein Risiko, seltsam zu "
     "wirken, weil der Anlass offensichtlich ist.",
     "Warum das funktioniert: Menschen reagieren instinktiv positiv auf geteilte "
     "Beobachtungen – es entsteht sofort ein „Wir“, ohne dass du dich erklären musst."),
    ("2", "Die Neugier-Frage",
     "Eine einfache, leicht zu beantwortende Frage schafft Nähe, ohne Druck aufzubauen. "
     "Wichtig dabei: Die Frage muss so simpel sein, dass die Antwort ohne Nachdenken kommt. "
     "Im Café: „Was ist das für ein Kuchen, sieht richtig gut aus – lohnt sich der?“ "
     "Beim Sport: „Machst du das schon lange, oder bist du auch noch am Reinkommen?“ "
     "Entscheidend ist nicht die Frage selbst, sondern der Ton, mit dem du sie stellst: "
     "entspannt, ehrlich interessiert, ohne Hintergedanken. Wenn du wirklich wissen willst, "
     "was sie antwortet, merkt man das – und genau das macht den Unterschied zu einer "
     "plumpen Anmache.",
     "Warum das funktioniert: Fragen aktivieren automatisch eine Antwort – dein Gegenüber "
     "reagiert praktisch von selbst, und aus dieser ersten Reaktion entsteht der Gesprächsfluss."),
    ("3", "Das ehrliche Kompliment",
     "Ein direktes, ehrliches Kompliment wirkt oft stärker als jeder ausgeklügelte Spruch – "
     "vorausgesetzt, es ist wirklich ehrlich gemeint. „Dein Lachen eben war richtig "
     "ansteckend“ oder „Du strahlst gerade richtig gute Laune aus“ – kurz, "
     "konkret, ohne Erwartungshaltung. Vermeide reine Äußerlichkeiten wie „Du bist "
     "hübsch“, die jede Frau schon hundertfach gehört hat. Bezieh dich stattdessen auf "
     "etwas, das du in diesem Moment tatsächlich wahrnimmst – ihre Energie, ihre "
     "Ausstrahlung, eine Reaktion. Das zeigt echte Aufmerksamkeit statt einer einstudierten "
     "Masche.",
     "Warum das funktioniert: Ehrliche, spezifische Komplimente signalisieren, dass du wirklich "
     "hinschaust – das unterscheidet dich von den meisten Männern, die nur Standardsprüche "
     "abspulen."),
]

badge_r = 5.5 * mm
text_x = MARGIN + 2 * badge_r + 6 * mm
text_w = CONTENT_W - (text_x - MARGIN)

for num, heading, body, why in openers:
    y = ensure_space(y, 14 * mm)
    badge_cy = y - badge_r + 1 * mm
    c.setFillColor(GOLD)
    c.circle(MARGIN + badge_r, badge_cy, badge_r, fill=1, stroke=0)
    c.setFillColor(NAVY_DEEP)
    c.setFont("Helvetica-Bold", 12)
    c.drawCentredString(MARGIN + badge_r, badge_cy - 4, num)

    c.setFont("Helvetica-Bold", 14)
    c.setFillColor(INK)
    c.drawString(text_x, y - 4, heading)
    y -= 11 * mm

    y = draw_paragraph(body, text_x, y, "Helvetica", 10, 14, MUTED, text_w, space_after=4*mm)
    y = draw_paragraph(why, text_x, y, "Helvetica-Oblique", 9.5, 13, GOLD2, text_w, space_after=9*mm)

y = ensure_space(y, 30 * mm)
c.setStrokeColor(GOLD)
c.setLineWidth(0.75)
c.line(MARGIN, y, MARGIN + CONTENT_W, y)
y -= 9 * mm

y = draw_heading("Wichtiger als die Worte: deine Haltung", MARGIN, y, size=13)
closing = ("So gut ein Opener auch formuliert ist – er funktioniert nur, wenn du ihn mit der "
           "richtigen inneren Haltung sagst: entspannt, präsent, ohne dich zu verstellen. Deine "
           "Körpersprache und dein Tonfall tragen einen Großteil der Wirkung; die Worte sind nur "
           "der Anfang des Gesprächs, nicht die ganze Miete. Übe die drei Ansätze in "
           "Alltagssituationen, bei denen wenig auf dem Spiel steht – so gewinnst du Routine, "
           "bevor es wirklich zählt.")
y = draw_paragraph(closing, MARGIN, y, "Helvetica", 10.5, 14.5, MUTED, CONTENT_W, space_after=10*mm)

# ---------- CTA box (dynamische Höhe, damit nichts überlappt) ----------
cta_body = ("Ein guter Gesprächseinstieg ist nur der Anfang. In einem kostenlosen "
            "Erstgespräch schauen wir gemeinsam auf deine aktuelle Situation – kein "
            "Verkaufsgespräch, sondern ein ehrlicher, konkreter Fahrplan von Quincy, "
            "deinem Experten für Gesprächsführung.")
box_pad = 8 * mm
box_inner_w = CONTENT_W - 2 * box_pad
cta_lines = wrap_text(cta_body, "Helvetica", 10, box_inner_w)

heading_h = 7 * mm
body_line_h = 5 * mm
gap_before_link = 6 * mm
link_h = 6 * mm
box_h = box_pad + heading_h + len(cta_lines) * body_line_h + gap_before_link + link_h + box_pad

y = ensure_space(y, box_h + 4 * mm)
box_y = y - box_h
c.setFillColor(NAVY_DEEP)
c.roundRect(MARGIN, box_y, CONTENT_W, box_h, 4 * mm, fill=1, stroke=0)

ty = y - box_pad - 3 * mm
c.setFont("Helvetica-Bold", 13)
c.setFillColor(INK)
c.drawString(MARGIN + box_pad, ty, "Bereit für den nächsten Schritt?")
ty -= heading_h

c.setFont("Helvetica", 10)
c.setFillColor(MUTED)
for line in cta_lines:
    c.drawString(MARGIN + box_pad, ty, line)
    ty -= body_line_h

ty -= (gap_before_link - body_line_h)
c.setFont("Helvetica-Bold", 12)
c.setFillColor(GOLD)
c.drawString(MARGIN + box_pad, ty, "goflirtpsychologie.de")

y = box_y

draw_footer(page_num[0])
c.showPage()
c.save()
print("saved, pages:", page_num[0])
