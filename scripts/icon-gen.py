# Genera gli SVG dell icona SaniFit: atleta con bilanciere, arancione fluo su grigio scuro.
# uso: python3 scripts/icon-gen.py <cartella-output>
import sys
out = sys.argv[1]

FIG = "#ff7a00"   # arancione fluo
BG0, BG1, BG2 = "#3a3b41", "#25262a", "#18191c"   # grigio scuro, radiale

def figure():
    # Atleta che tiene il bilanciere sopra la testa (slancio), tratti arrotondati.
    return f'''
  <g fill="{FIG}" stroke="{FIG}" stroke-linecap="round" stroke-linejoin="round">
    <!-- bilanciere -->
    <line x1="80" y1="150" x2="432" y2="150" stroke-width="18"/>
    <rect x="94"  y="98"  width="34" height="104" rx="11" stroke="none"/>
    <rect x="132" y="116" width="22" height="68"  rx="8"  stroke="none"/>
    <rect x="384" y="98"  width="34" height="104" rx="11" stroke="none"/>
    <rect x="358" y="116" width="22" height="68"  rx="8"  stroke="none"/>
    <!-- braccia tese verso l'alto -->
    <line x1="220" y1="268" x2="198" y2="154" stroke-width="26" fill="none"/>
    <line x1="292" y1="268" x2="314" y2="154" stroke-width="26" fill="none"/>
    <!-- testa -->
    <circle cx="256" cy="212" r="31" stroke="none"/>
    <!-- busto -->
    <path d="M206 262 H306 L282 356 H230 Z" stroke-width="14"/>
    <!-- gambe, leggera flessione -->
    <polyline points="240,352 208,400 198,452" stroke-width="28" fill="none"/>
    <polyline points="272,352 304,400 314,452" stroke-width="28" fill="none"/>
  </g>'''

def svg(rounded, scale, size=512):
    bg_shape = f'<rect width="512" height="512" rx="112" fill="url(#bg)"/>' if rounded else '<rect width="512" height="512" fill="url(#bg)"/>'
    rx = ' rx="112"' if rounded else ''
    gloss = f'<rect width="512" height="512"{rx} fill="url(#gloss)"/>'
    # centra verticalmente la figura (estensione 98..466 → centro 282) e applica la scala
    tf = f'translate(256 256) scale({scale}) translate(-256 -282)'
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="{size}" height="{size}" role="img" aria-label="SaniFit">
  <defs>
    <radialGradient id="bg" cx="50%" cy="30%" r="80%">
      <stop offset="0" stop-color="{BG0}"/>
      <stop offset=".55" stop-color="{BG1}"/>
      <stop offset="1" stop-color="{BG2}"/>
    </radialGradient>
    <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".10"/>
      <stop offset=".5" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  {bg_shape}
  {gloss}
  <g transform="{tf}">{figure()}
  </g>
</svg>
'''

variants = {
    "icon.svg":              (True,  0.92),   # scheda browser: angoli arrotondati
    "full.svg":              (False, 0.92),   # PNG a pieno campo (iOS/Android mascherano da sé)
    "maskable.svg":          (False, 0.70),   # safe zone maskable
}
for name, (rounded, scale) in variants.items():
    open(f"{out}/{name}", "w").write(svg(rounded, scale))
print("ok")
