# Genera gli SVG dell'icona SaniFit (identità arcade: nero + verde fluo).
# Un sollevatore in pixel art con il bilanciere sopra la testa, disegnato sulla
# stessa griglia "a pixel" delle icone dell'app, con bagliore al neon e linee di
# scansione da monitor CRT.
# uso: python3 scripts/icon-gen.py <cartella-output>
import sys

out = sys.argv[1]

GREEN, GREEN_LIGHT = "#39ff14", "#b6ff9e"

# Metà sinistra dello sprite (12 colonne): la destra è lo specchio.
HALF = [
    "............",  # 0
    "............",  # 1
    ".##.........",  # 2  dischi esterni
    ".###........",  # 3  dischi interni
    ".###########",  # 4  bilanciere
    ".###........",  # 5
    ".##.........",  # 6
    "......#.....",  # 7  mani
    "......#.....",  # 8
    ".......#..##",  # 9  braccia e testa
    ".......#..##",  # 10
    "........#.##",  # 11
    "........#...",  # 12 collo (vuoto: stacca la testa dalle spalle)
    ".........###",  # 13 spalle
    ".........###",  # 14 petto
    "..........##",  # 15 busto
    "..........##",  # 16
    ".........###",  # 17 bacino
    "........##..",  # 18 gambe divaricate
    ".......##...",  # 19
    ".......##...",  # 20
    "......###...",  # 21 piedi
    "............",  # 22
    "............",  # 23
]
ROWS = [r + r[::-1] for r in HALF]
GRID = 24
FLOOR_ROW = 22


def sprite(px, ox, oy):
    rects = []
    for y, row in enumerate(ROWS):
        x = 0
        while x < GRID:
            if row[x] == "#":
                x0 = x
                while x < GRID and row[x] == "#":
                    x += 1
                rects.append(f'<rect x="{ox + x0 * px:g}" y="{oy + y * px:g}" width="{(x - x0) * px:g}" height="{px:g}"/>')
            else:
                x += 1
    # pavimento tratteggiato sotto i piedi
    floor = "".join(
        f'<rect x="{ox + x * px:g}" y="{oy + FLOOR_ROW * px + px * 0.35:g}" width="{px:g}" height="{px * 0.5:g}"/>'
        for x in range(3, GRID - 3, 2)
    )
    return "".join(rects), floor


def svg(rounded, px):
    size = 512
    ox = oy = (size - GRID * px) / 2
    body, floor = sprite(px, ox, oy)
    rx = ' rx="112"' if rounded else ""
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-label="SaniFit">
  <defs>
    <radialGradient id="halo" cx="50%" cy="48%" r="60%">
      <stop offset="0" stop-color="{GREEN}" stop-opacity=".22"/>
      <stop offset=".55" stop-color="{GREEN}" stop-opacity=".05"/>
      <stop offset="1" stop-color="{GREEN}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="scan" width="8" height="8" patternUnits="userSpaceOnUse">
      <rect width="8" height="3" fill="{GREEN}" fill-opacity=".07"/>
    </pattern>
    <linearGradient id="px" gradientUnits="userSpaceOnUse" x1="0" y1="{oy:g}" x2="0" y2="{oy + GRID * px:g}">
      <stop offset="0" stop-color="{GREEN_LIGHT}"/>
      <stop offset=".35" stop-color="{GREEN}"/>
      <stop offset="1" stop-color="{GREEN}"/>
    </linearGradient>
    <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="{px * 0.7:g}" result="b"/>
      <feFlood flood-color="{GREEN}" flood-opacity=".85"/>
      <feComposite in2="b" operator="in" result="g"/>
      <feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="512" height="512"{rx} fill="#000"/>
  <rect width="512" height="512"{rx} fill="url(#halo)"/>
  <g shape-rendering="crispEdges" fill="{GREEN}" fill-opacity=".45">{floor}</g>
  <g shape-rendering="crispEdges" fill="url(#px)" filter="url(#glow)">{body}</g>
  <rect width="512" height="512"{rx} fill="url(#scan)"/>
</svg>
'''


variants = {
    "icon.svg":     (True,  18),   # scheda del browser: angoli arrotondati
    "full.svg":     (False, 18),   # PNG a pieno campo (iOS/Android applicano la loro maschera)
    "maskable.svg": (False, 13),   # figura dentro la safe zone maskable
}
for name, (rounded, px) in variants.items():
    with open(f"{out}/{name}", "w") as f:
        f.write(svg(rounded, px))
print("ok")
