#!/usr/bin/env python3
"""Freistellen: entfernt den glatten grauen Studio-Hintergrund per
border-verbundenem Flood über 'graue, glatte' Pixel. Netzwerkfrei."""
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC = "foto.png"
OUT = "foto_cut.png"

im = Image.open(SRC).convert("RGB")
a = np.asarray(im).astype(np.int16)
H, W, _ = a.shape
R, G, B = a[..., 0], a[..., 1], a[..., 2]

mx = a.max(axis=2)
mn = a.min(axis=2)
spread = (mx - mn)                     # niedrig = grau/neutral
bright = a.mean(axis=2)

# "Hintergrund-Kandidat": neutral-grau, nicht bläulich, mittelhell (kein dunkles Haar)
grey_ish = (spread <= 24) & (B - R <= 12) & (bright >= 70)

# lokale Glätte: Farbunterschied zu 1px-Nachbarn klein -> glatter Verlauf
lab = a.astype(np.float32)
def shift(arr, dy, dx):
    return np.roll(np.roll(arr, dy, 0), dx, 1)
grad = np.zeros((H, W), np.float32)
for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
    d = np.abs(lab - shift(lab, dy, dx)).sum(axis=2)
    grad = np.maximum(grad, d)
smooth = grad < 40

travers = grey_ish & smooth

# border-verbundene Komponente(n) = echter Hintergrund
lbl, n = ndimage.label(travers)
border = set(lbl[0, :]) | set(lbl[-1, :]) | set(lbl[:, 0]) | set(lbl[:, -1])
border.discard(0)
bg = np.isin(lbl, list(border))

# Subjekt = alles andere; Löcher füllen, kleinste Störflecken weg
subj = ~bg
subj = ndimage.binary_fill_holes(subj)
# größte zusammenhängende Subjekt-Komponente behalten
slbl, sn = ndimage.label(subj)
if sn > 1:
    sizes = ndimage.sum(np.ones_like(slbl), slbl, range(1, sn + 1))
    subj = slbl == (np.argmax(sizes) + 1)

# Kante leicht einziehen (Grau-Halo vermeiden) + weich feathern
subj_u8 = (subj * 255).astype(np.uint8)
alpha = Image.fromarray(subj_u8)
alpha = alpha.filter(ImageFilter.MinFilter(3))          # 1px erode
alpha = alpha.filter(ImageFilter.GaussianBlur(1.2))     # feather

out = im.convert("RGBA")
out.putalpha(alpha)

# auf Subjekt zuschneiden
bbox = Image.fromarray(subj_u8).getbbox()
out = out.crop(bbox)
out.save(OUT)
print("cut size:", out.size, "bbox:", bbox)

# Vorschau auf Navy zum Prüfen
prev = Image.new("RGB", out.size, (11, 28, 63))
prev.paste(out, (0, 0), out)
prev.save("foto_preview.png")
print("bg pixels:", int(bg.sum()), "subj pixels:", int(subj.sum()))
