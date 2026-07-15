#!/usr/bin/env python3
"""Build a minimal animated dotted line-art portrait SVG from the OG photo.

Canny edges give a portrait that survives being reduced to dots — a halftone of
the raw photo just reads as noise, because the studio background is as bright as
the subject. Dots are dropped on the edges and revealed top-to-bottom, so the
thing draws itself like a plotter.
"""
import re
import subprocess
import sys

SRC = "src/app/opengraph-image.png"
OUT = "public/portrait.svg"

GRID = 104       # samples across
CELL = 6         # svg units per cell
R = 1.7          # dot radius
EDGE_MIN = 0.18  # sampled edge strength to count as ink
BUCKETS = 14     # scan-line reveal steps

raw = subprocess.run(
    [
        "magick", SRC,
        "-background", "black", "-alpha", "remove",
        "-colorspace", "gray", "-normalize",
        "-canny", "0x1+8%+25%",
        "-resize", f"{GRID}x{GRID}!",
        "txt:-",
    ],
    capture_output=True, text=True, check=True,
).stdout

px = {}
for line in raw.splitlines():
    m = re.match(r"(\d+),(\d+): \((\d+)", line)
    if m:
        x, y, g = (int(v) for v in m.groups())
        px[(x, y)] = g / 255.0

if not px:
    sys.exit("no pixels parsed")

size = GRID * CELL
c = size / 2
radius = size / 2

dots = []
for (x, y), edge in px.items():
    if edge < EDGE_MIN:
        continue
    cx_, cy_ = x * CELL + CELL / 2, y * CELL + CELL / 2
    if ((cx_ - c) ** 2 + (cy_ - c) ** 2) ** 0.5 / radius > 0.96:
        continue
    bucket = min(BUCKETS - 1, int((cy_ / size) * BUCKETS))  # reveal top->bottom
    dots.append((round(cx_), round(cy_), bucket))

circles = "\n".join(f'<circle cx="{x}" cy="{y}" r="{R}" class="b{b}"/>' for x, y, b in dots)
delays = "".join(f".b{i}{{animation-delay:{i * 0.07:.2f}s}}" for i in range(BUCKETS))
circum = round(2 * 3.14159 * (radius - 1), 1)

svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" '
    f'role="img" aria-labelledby="t">'
    f"<title id=\"t\">Md Shahriyar Alam, drawn as dotted line art</title>"
    f"<style>"
    f"svg{{color:#E7E7F5}}"  # standalone default; the site is dark-only
    f"circle{{fill:currentColor;transform-box:fill-box;transform-origin:center;"
    f"animation:p .5s cubic-bezier(.2,.8,.2,1) backwards}}"
    f"{delays}"
    f"@keyframes p{{from{{transform:scale(0);opacity:0}}to{{transform:scale(1);opacity:1}}}}"
    f".r{{fill:none;stroke:currentColor;stroke-opacity:.3;stroke-width:1.5;"
    f"stroke-dasharray:{circum};stroke-dashoffset:{circum};"
    f"animation:d 1.4s ease-out forwards}}"
    f"@keyframes d{{to{{stroke-dashoffset:0}}}}"
    f"@media(prefers-reduced-motion:reduce){{circle,.r{{animation:none}}"
    f".r{{stroke-dashoffset:0}}}}"
    f"</style>"
    f'<circle class="r" cx="{c}" cy="{c}" r="{radius - 1}" transform="rotate(-90 {c} {c})"/>'
    f"<g>{circles}</g>"
    f"</svg>\n"
)

with open(OUT, "w") as f:
    f.write(svg)

print(f"dots: {len(dots)}  size: {len(svg) / 1024:.1f} KB  viewBox: {size}")
