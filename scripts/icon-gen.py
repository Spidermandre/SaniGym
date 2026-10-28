# Genera gli SVG dell'icona SaniFit (identità grigio grafite + arancione fluo).
# Atleta con bilanciere sopra la testa, disegnato con lo stesso tratto lineare
# arrotondato delle icone dell'app, in gradiente arancione con un leggero bagliore,
# su una lastra grafite in stile "liquid glass".
# uso: python3 scripts/icon-gen.py <cartella-output>
import sys

out = sys.argv[1]

ORANGE_LIGHT, ORANGE, ORANGE_DEEP = "#ffa24d", "#ff7a00", "#ff5500"
G0, G1, G2 = "#3b3c42", "#232428", "#141518"   # grafite, dal centro ai bordi
STROKE = 30


def figure():
    # Coordinate su 512; la figura va da y≈95 (dischi) a y≈465 (piedi).
    return f'''
    <g fill="none" stroke="url(#orange)" stroke-width="{STROKE}" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)">
      <!-- bilanciere e dischi -->
      <path d="M112 150H400"/>
      <path d="M96 96V204M416 96V204"/>
      <path d="M140 116V184M372 116V184" stroke-width="{STROKE - 4}"/>
      <!-- braccia tese e linea delle spalle -->
      <path d="M192 150 226 254H286L320 150"/>
      <!-- testa piena: leggibile anche a 16 px -->
      <circle cx="256" cy="198" r="31" fill="url(#orange)" stroke="none"/>
      <!-- busto e gambe, ginocchia aperte come nell'icona Gambe -->
      <path d="M256 254V346"/>
      <path d="M256 346 206 392 218 452M256 346 306 392 294 452"/>
    </g>'''


def svg(rounded, scale, size=512):
    rx = ' rx="112"' if rounded else ''
    tf = f'translate(256 256) scale({scale}) translate(-256 -280)'
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="{size}" height="{size}" role="img" aria-label="SaniFit">
  <defs>
    <radialGradient id="graphite" cx="50%" cy="34%" r="78%">
      <stop offset="0" stop-color="{G0}"/>
      <stop offset=".6" stop-color="{G1}"/>
      <stop offset="1" stop-color="{G2}"/>
    </radialGradient>
    <radialGradient id="halo" cx="50%" cy="52%" r="46%">
      <stop offset="0" stop-color="{ORANGE}" stop-opacity=".20"/>
      <stop offset="1" stop-color="{ORANGE}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".12"/>
      <stop offset=".45" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <!-- userSpaceOnUse: le linee orizzontali e verticali hanno bounding box piatta,
         con le unità di default il gradiente non verrebbe disegnato -->
    <linearGradient id="orange" gradientUnits="userSpaceOnUse" x1="96" y1="96" x2="416" y2="466">
      <stop offset="0" stop-color="{ORANGE_LIGHT}"/>
      <stop offset=".5" stop-color="{ORANGE}"/>
      <stop offset="1" stop-color="{ORANGE_DEEP}"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b"/>
      <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 .45 0 0 0  0 0 0 0 0  0 0 0 .55 0" result="g"/>
      <feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="512" height="512"{rx} fill="url(#graphite)"/>
  <rect width="512" height="512"{rx} fill="url(#halo)"/>
  <rect width="512" height="512"{rx} fill="url(#gloss)"/>
  <rect x="3" y="3" width="506" height="506"{' rx="109"' if rounded else ''} fill="none" stroke="#ffffff" stroke-opacity=".07" stroke-width="6"/>
  <g transform="{tf}">{figure()}
  </g>
</svg>
'''


variants = {
    "icon.svg":     (True,  0.94),   # scheda del browser: angoli arrotondati
    "full.svg":     (False, 0.94),   # PNG a pieno campo (iOS/Android applicano la loro maschera)
    "maskable.svg": (False, 0.72),   # figura dentro la safe zone maskable
}
for name, (rounded, scale) in variants.items():
    with open(f"{out}/{name}", "w") as f:
        f.write(svg(rounded, scale))
print("ok")
