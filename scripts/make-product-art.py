from pathlib import Path

out = Path('public/product-art')
out.mkdir(parents=True, exist_ok=True)

palette = {
    'kit': ('#f3e1d0', '#73302d'), 'diya': ('#f7e3cb', '#b34927'),
    'incense': ('#e7e9dc', '#315748'), 'offering': ('#e8e7d6', '#60733c'),
    'brass': ('#f5e5cf', '#aa782f'), 'gift': ('#eedde0', '#8c3644'),
    'powder': ('#f5e4d5', '#b44a2d'), 'hawan': ('#eee3d3', '#775739'),
}

def bowl(fill, x, y, scale=1):
    return f'<g transform="translate({x} {y}) scale({scale})"><ellipse cx="0" cy="0" rx="64" ry="25" fill="#9b692e"/><path d="M-64 0 Q-55 76 0 79 Q55 76 64 0" fill="#bc8a40"/><ellipse cx="0" cy="-5" rx="57" ry="20" fill="{fill}"/><path d="M-45 55 Q0 75 43 55" fill="none" stroke="#e5b761" stroke-width="5"/></g>'

def lamp(x,y,s=1):
    return f'<g transform="translate({x} {y}) scale({s})"><path d="M-82 0 Q-55 63 0 57 Q55 63 82 0 Q0 21 -82 0" fill="#b84f2b"/><ellipse cx="0" cy="0" rx="82" ry="18" fill="#d96e35"/><path d="M0 -12 C-24 -47 -5 -67 4 -90 C28 -60 22 -39 0 -12" fill="#f1ad28"/><path d="M0 -14 C-10 -38 0 -52 5 -65 C15 -44 11 -25 0 -14" fill="#fff0aa"/></g>'

def sticks(x,y):
    return f'<g stroke-linecap="round" transform="translate({x} {y})"><path d="M-45 105 L-20 -93 M-10 105 L3 -105 M25 105 L35 -82" stroke="#8c5838" stroke-width="7"/><path d="M-20 -93 L-16 -124 M3 -105 L5 -137 M35 -82 L40 -112" stroke="#34332e" stroke-width="12"/><path d="M-20 -139 Q-35 -160 -21 -177 M5 -151 Q-9 -175 6 -191" fill="none" stroke="#d4c4ad" stroke-width="5" opacity=".65"/></g>'

def box(x,y,accent):
    return f'<g transform="translate({x} {y})"><rect x="-98" y="-65" width="196" height="146" rx="8" fill="#bd9168"/><rect x="-105" y="-76" width="210" height="40" rx="7" fill="#d6a77b"/><path d="M-17 -76 V81 M16 -76 V81" stroke="{accent}" stroke-width="19"/><path d="M0 -76 C-73 -77 -64 -131 -24 -128 C-2 -126 0 -98 0 -76 M0 -76 C73 -77 64 -131 24 -128 C2 -126 0 -98 0 -76" fill="none" stroke="{accent}" stroke-width="14"/></g>'

art = {
 'daily-kit': ('kit', bowl('#bd3f27', -90, 65,.75)+bowl('#dfab29', 75, 85,.68)+lamp(0,-25,.75)),
 'navratri-kit': ('kit', box(-7,42,'#b33a37')+bowl('#c3312a',-110,126,.55)),
 'diwali-kit': ('kit', lamp(-75,45,.7)+lamp(85,35,.8)+bowl('#cf3e26',4,122,.6)),
 'bhai-dooj-set': ('gift', bowl('#c83c2f',-75,67,.72)+bowl('#e2e1c1',76,73,.62)+lamp(0,-35,.55)),
 'chhath-set': ('offering', '<path d="M-135 3 Q0 95 135 3 L108 126 Q0 177 -108 126 Z" fill="#b78d57"/><path d="M-133 14 Q0 85 133 14" fill="none" stroke="#785d3c" stroke-width="12"/>'+bowl('#d09336',0,-16,.8)),
 'kapoor': ('brass', bowl('#f3eee2',0,42,1.55)+'<g fill="#fffaf0" stroke="#d8d0bd" stroke-width="3"><rect x="-40" y="-12" width="31" height="25" rx="4" transform="rotate(-14 -40 -12)"/><rect x="12" y="-10" width="29" height="26" rx="4" transform="rotate(15 12 -10)"/></g>'),
 'agarbatti': ('incense', sticks(0,30)+bowl('#d7b887',0,145,.65)),
 'dhoop': ('incense', '<g fill="#6d4934"><path d="M-95 92 L-60 -12 L-25 92Z"/><path d="M-12 102 L24 -18 L60 102Z"/><path d="M66 89 L94 1 L122 89Z"/></g><path d="M-60 -35 Q-84 -70 -62 -100 M24 -40 Q0 -76 24 -113" fill="none" stroke="#c9c6b4" stroke-width="7"/>'),
 'wicks': ('diya', lamp(70,4,.8)+'<g fill="none" stroke="#eee5d2" stroke-width="12" stroke-linecap="round"><path d="M-112 80 Q-95 30 -75 70 Q-55 104 -38 61"/><path d="M-113 112 Q-85 73 -60 111 Q-35 139 -10 101"/></g>'),
 'diyas': ('diya', lamp(-65,50,.72)+lamp(78,40,.72)),
 'thali': ('brass', '<ellipse cx="0" cy="78" rx="159" ry="78" fill="#ae792d"/><ellipse cx="0" cy="62" rx="146" ry="68" fill="#e8b969"/><ellipse cx="0" cy="62" rx="121" ry="50" fill="#c49545"/>'+bowl('#c9432d',-49,24,.44)+bowl('#eab62f',51,27,.44)),
 'kumkum': ('powder', bowl('#c53726',-74,59,.9)+bowl('#dcab27',75,59,.9)),
 'hawan': ('hawan', '<path d="M-106 5 L108 5 L80 129 L-79 129Z" fill="#a66c3a"/><path d="M-106 4 Q0 -45 108 4 Q0 55 -106 4" fill="#785238"/><g stroke="#bc9d69" stroke-width="13" stroke-linecap="round"><path d="M-67 -12 L42 43 M-16 -20 L80 30 M-47 31 L47 -18"/></g>'),
 'panchmeva': ('offering', bowl('#ab743c',0,72,1.5)+'<g fill="#dec18a"><ellipse cx="-44" cy="18" rx="18" ry="10" transform="rotate(-22 -44 18)"/><ellipse cx="18" cy="5" rx="16" ry="11"/><ellipse cx="55" cy="27" rx="19" ry="9" transform="rotate(22 55 27)"/></g>'),
 'mishri': ('offering', bowl('#eee8d8',0,70,1.5)+'<g fill="#fdfbf1" stroke="#d8d4c4" stroke-width="2"><rect x="-58" y="4" width="27" height="28" transform="rotate(18 -58 4)"/><rect x="-12" y="-9" width="25" height="28" transform="rotate(-11 -12 -9)"/><rect x="32" y="1" width="29" height="26" transform="rotate(15 32 1)"/></g>'),
 'gift-box': ('gift', box(0,36,'#a83744')),
}

for name, (kind, scene) in art.items():
    bg, accent = palette[kind]
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" role="img"><rect width="600" height="600" fill="{bg}"/><circle cx="300" cy="270" r="215" fill="#fff9f0" opacity=".55"/><ellipse cx="300" cy="457" rx="188" ry="22" fill="{accent}" opacity=".15"/><g transform="translate(300 290)">{scene}</g><path d="M49 503 H551" stroke="{accent}" stroke-opacity=".24" stroke-width="2"/></svg>'''
    (out / f'{name}.svg').write_text(svg, encoding='utf-8')
