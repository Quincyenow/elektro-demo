# -*- coding: utf-8 -*-
#
# Master-Vorlage für die Gratis-Report-PDFs (Navy/Gold-Branding).
#
# Für ein neues Thema: Diese Datei kopieren, umbenennen und nur die Texte
# im Abschnitt "CONTENT" weiter unten ändern (Titel, Einstieg, Intro,
# OPENERS, Closing, Ausstieg, CTA-Texte) sowie LANDING_LINK und
# OUTPUT_PATH anpassen. Layout, Farben, Logo, Button und
# Seitenumbruch-Logik bleiben automatisch gleich.
#
# Ausführen: pip install reportlab pillow && python3 generate_<thema>.py
#
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.lib.utils import ImageReader
from PIL import Image
import os

NAVY = HexColor("#0b1c3f")
NAVY_DEEP = HexColor("#050b1c")
GOLD = HexColor("#e8c877")
GOLD2 = HexColor("#f6e4b0")
INK = HexColor("#f7f5ef")
MUTED = HexColor("#aeb7cc")
BTN_TEXT = HexColor("#221a08")

PAGE_W, PAGE_H = A4
MARGIN = 20 * mm
CONTENT_W = PAGE_W - 2 * MARGIN
BOTTOM_LIMIT = 24 * mm

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", "..", "..", ".."))
LANDING_LINK = "https://goflirtpsychologie.de/?lead_magnet=gespraechsoeffner"
LOGO_PATH = os.path.join(REPO_ROOT, "flirt-psychologie-paket", "assets", "img", "logo.png")
logo_img = Image.open(LOGO_PATH)
logo_ratio = logo_img.size[1] / logo_img.size[0]
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
    lines, cur = [], ""
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
    c.setFillColor(GOLD)
    c.drawCentredString(PAGE_W / 2, 12 * mm, f"Flirt Psychologie  ·  goflirtpsychologie.de")

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

def draw_divider(y, gap_before=0, gap_after=9*mm, weight=1):
    y -= gap_before
    y = ensure_space(y, weight + gap_after)
    c.setStrokeColor(GOLD)
    c.setLineWidth(weight)
    c.line(MARGIN, y, MARGIN + CONTENT_W, y)
    return y - gap_after

# ================= CONTENT =================

TITLE_L1 = "3 verführerische"
TITLE_L2 = "Gesprächsöffner"
SUBTITLE = "So beginnst du ein Gespräch, das im Kopf bleibt"

EINSTIEG = ("Willkommen bei Flirt Psychologie. Dass du diesen Report in den Händen hältst, "
            "zeigt mir, dass du nicht länger dem Zufall überlassen willst, wie du auf Frauen "
            "wirkst. Du bist bereit, das Ruder in die Hand zu nehmen. Die folgenden 3 "
            "Gesprächsöffner sind dein Werkzeug für den ersten Schritt – aber vergiss nicht: "
            "Das Ziel ist nicht, einen „perfekten Satz“ zu besitzen, sondern als der "
            "selbstsichere Mann aufzutreten, der du sein willst. Lies dir diese Strategien "
            "aufmerksam durch und betrachte sie als dein Training für die echte Welt.")

INTRO = ("Die meisten Männer beschäftigen sich stundenlang mit der Frage: „Was sage ich als "
         "Erstes?“ Dabei liegt genau hier der erste Denkfehler. Der perfekte Satz existiert nicht "
         "– und du brauchst ihn auch nicht, um ins Gespräch zu kommen. Was wirklich zählt, ist "
         "deine Haltung in diesem Moment: locker, neugierig und bei dir selbst. Ein Gespräch beginnt "
         "nicht mit cleveren Worten, sondern mit echtem Interesse. Die folgenden drei Ansätze zeigen "
         "dir, wie du diesen Einstieg findest – ganz ohne auswendig gelernte Sprüche.")

OPENERS = [
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

CLOSING_HEADING = "Wichtiger als die Worte: deine Haltung"
CLOSING = ("So gut ein Opener auch formuliert ist – er funktioniert nur, wenn du ihn mit der "
           "richtigen inneren Haltung sagst: entspannt, präsent, ohne dich zu verstellen. Deine "
           "Körpersprache und dein Tonfall tragen einen Großteil der Wirkung; die Worte sind nur "
           "der Anfang des Gesprächs, nicht die ganze Miete. Übe die drei Ansätze in "
           "Alltagssituationen, bei denen wenig auf dem Spiel steht – so gewinnst du Routine, "
           "bevor es wirklich zählt.")

AUSSTIEG = ("Bereit für deine Transformation? Diese 3 Gesprächsöffner sind der Anfang deines "
            "Weges – doch echte Meisterschaft in der Gesprächsführung erfordert mehr als nur "
            "Worte; sie braucht ein System, das individuell auf dich zugeschnitten ist. Wenn du "
            "nicht länger experimentieren willst, sondern einen klaren, psychologisch fundierten "
            "Fahrplan für deinen Erfolg suchst, dann lass uns den nächsten Schritt gehen.")

CTA_HEADING = "Dein kostenloses Erstgespräch"
CTA_BODY = ("Klicke unten, um dir dein kostenloses Erstgespräch mit mir zu sichern. Gemeinsam "
            "analysieren wir deine aktuelle Situation und entwickeln eine Strategie, mit der du "
            "in jeder Begegnung souverän, authentisch und anziehend bleibst. Das ist kein "
            "Verkaufsgespräch, sondern dein konkreter Fahrplan von mir, Quincy – deinem Experten "
            "für Gesprächsführung.")
CTA_MICRO = "Dein Erfolg beginnt mit der Entscheidung, jetzt zu handeln."
CTA_BUTTON_TEXT = "JETZT TERMIN SICHERN →"

# ================= LAYOUT =================

y = new_page()

c.setFont("Helvetica-Bold", 10)
c.setFillColor(GOLD)
c.drawString(MARGIN, y, "FLIRT PSYCHOLOGIE")
y -= 13 * mm

c.setFont("Helvetica-Bold", 25)
c.setFillColor(INK)
c.drawString(MARGIN, y, TITLE_L1)
y -= 10.5 * mm
c.setFillColor(GOLD)
c.drawString(MARGIN, y, TITLE_L2)
y -= 8 * mm

c.setFont("Helvetica", 12)
c.setFillColor(MUTED)
c.drawString(MARGIN, y, SUBTITLE)
y -= 12 * mm

y = draw_divider(y)

# Einstieg -- optisch leicht abgesetzt (goldener Text, etwas größer)
y = draw_paragraph(EINSTIEG, MARGIN, y, "Helvetica-Bold", 11, 15.5, GOLD2, CONTENT_W, space_after=9*mm)

y = draw_paragraph(INTRO, MARGIN, y, "Helvetica", 10.5, 14.5, MUTED, CONTENT_W, space_after=8*mm)

badge_r = 5.5 * mm
text_x = MARGIN + 2 * badge_r + 6 * mm
text_w = CONTENT_W - (text_x - MARGIN)

for num, heading, body, why in OPENERS:
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

y = draw_divider(y, gap_before=3*mm)

y = draw_heading(CLOSING_HEADING, MARGIN, y, size=13)
y = draw_paragraph(CLOSING, MARGIN, y, "Helvetica", 10.5, 14.5, MUTED, CONTENT_W, space_after=10*mm)

y = draw_divider(y, gap_before=3*mm)

y = draw_paragraph(AUSSTIEG, MARGIN, y, "Helvetica-Bold", 10.5, 14.5, INK, CONTENT_W, space_after=10*mm)

# ---------- CTA-Box mit goldenem Button ----------
box_pad = 8 * mm
box_inner_w = CONTENT_W - 2 * box_pad
cta_body_lines = wrap_text(CTA_BODY, "Helvetica", 10, box_inner_w)

btn_w, btn_h = 74 * mm, 12 * mm
heading_h = 7 * mm
body_line_h = 5 * mm
micro_h = 6 * mm
gap_to_btn = 6 * mm

box_h = (box_pad + heading_h + len(cta_body_lines) * body_line_h + micro_h
         + gap_to_btn + btn_h + box_pad)

y = ensure_space(y, box_h + 4 * mm)
box_y = y - box_h
c.setFillColor(NAVY_DEEP)
c.roundRect(MARGIN, box_y, CONTENT_W, box_h, 4 * mm, fill=1, stroke=0)
c.setStrokeColor(GOLD)
c.setLineWidth(0.75)
c.roundRect(MARGIN, box_y, CONTENT_W, box_h, 4 * mm, fill=0, stroke=1)

ty = y - box_pad - 3 * mm
c.setFont("Helvetica-Bold", 13)
c.setFillColor(GOLD)
c.drawString(MARGIN + box_pad, ty, CTA_HEADING)
ty -= heading_h

c.setFont("Helvetica", 10)
c.setFillColor(INK)
for line in cta_body_lines:
    c.drawString(MARGIN + box_pad, ty, line)
    ty -= body_line_h

c.setFont("Helvetica-Oblique", 9.5)
c.setFillColor(MUTED)
c.drawString(MARGIN + box_pad, ty, CTA_MICRO)
ty -= gap_to_btn + 2*mm

# Goldener Button, mittig, klickbar
btn_x = MARGIN + (CONTENT_W - btn_w) / 2
btn_y = ty - btn_h + 3*mm
c.setFillColor(GOLD)
c.roundRect(btn_x, btn_y, btn_w, btn_h, btn_h/2, fill=1, stroke=0)
c.setFillColor(BTN_TEXT)
c.setFont("Helvetica-Bold", 11)
c.drawCentredString(btn_x + btn_w/2, btn_y + btn_h/2 - 3.8, CTA_BUTTON_TEXT)
c.linkURL(LANDING_LINK, (btn_x, btn_y, btn_x + btn_w, btn_y + btn_h), relative=0, thickness=0)

y = box_y

draw_footer(page_num[0])
c.showPage()
c.save()
print("saved, pages:", page_num[0])
