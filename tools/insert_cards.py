"""Insert generated cards into the site pages and harvest their Q&A into interview-bank.json.

usage: python tools/insert_cards.py <cards_dir> <headings.json> [--dry]
  <cards_dir>/<page>/NN_ID.html     new card, appended under a sub-section heading
  <cards_dir>/<page>/append_ID.html block added at the end of an existing card's body
  <cards_dir>/<page>/replace_ID.html full replacement of an existing card
headings.json: {"page": [["Heading", ["ID", ...]], ...]}
"""
import html, json, re, sys
from pathlib import Path

repo = Path(__file__).resolve().parent.parent
cards_dir, head_path = Path(sys.argv[1]), Path(sys.argv[2])
DRY = '--dry' in sys.argv
HEADINGS = json.loads(head_path.read_text(encoding='utf-8'))
DIV = re.compile(r'<div\b|</div>')
QA = re.compile(r'>Q:\s*(.*?)</div>\s*<div[^>]*>A:\s*(.*?)</div>', re.S)
TOPIC = {'lte': 'LTE', '5g': '5G', 'nr': '5G', 'measurements': 'Measurements', 'protocol': 'Protocol', 'rct': 'RCT',
         'tx': 'TX', 'rx': 'RX', 'aau': 'AAU', 'call-flow': 'Call Flow', 'hardware': 'Hardware', 'debug': 'Debug',
         'troubleshooting': 'Debug', 'automation': 'Automation', 'fundamentals': 'RF Fundamentals', 'architecture': 'Architecture',
         'common-feature': 'Common', 'phy': 'PHY', 'kpi': 'KPI', 'oran': 'O-RAN', 'ue': 'UE', 'handover': 'Handover',
         'framework': 'Framework', 'nr-sa': '5G SA', 'nr-nsa': '5G NSA', 'endc': 'EN-DC/NSA', 'rssi': 'RSSI',
         'efficiency': 'PA/Efficiency', 'lab': 'Lab', 'prach': 'PRACH', 'rffe': 'RFFE', 'security': 'Security',
         'ca': 'Carrier Aggregation', 'timing': 'Timing/Sync', 'sync': 'Timing/Sync', 'tdd': 'TDD',
         'positioning': 'Positioning', 'noise': 'Noise/NF', 'rf': 'RF', 'volte': 'Protocol'}


def span(s, cid):
    i = s.index(f'<div class="module-card" id="{cid}"')
    d = 0
    for m in DIV.finditer(s, i):
        d += -1 if m.group() == '</div>' else 1
        if d == 0:
            return i, m.end()
    raise ValueError(cid)


def check(frag, name):
    if len(re.findall(r'<div\b', frag)) != frag.count('</div>'):
        raise SystemExit(f'{name}: unbalanced divs')
    if '<script' in frag.lower():
        raise SystemExit(f'{name}: contains <script>')


def plain(x):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', x))).strip()


bank_path = repo / 'interview-bank.json'
bank = json.loads(bank_path.read_text(encoding='utf-8'))
have = {e['q'] for e in bank}
added = 0
for pdir in sorted(p for p in cards_dir.iterdir() if p.is_dir()):
    page = repo / f'{pdir.name}.html'
    s = page.read_text(encoding='utf-8')
    files = sorted(pdir.glob('*.html'))
    touched = []
    for f in files:
        frag = f.read_text(encoding='utf-8').strip()
        check(frag, f.name)
        if f.name.startswith('replace_'):
            cid = f.stem[8:]
            a, b = span(s, cid)
            s = s[:a] + frag + s[b:]
            touched.append((cid, frag))
        elif f.name.startswith('append_'):
            cid = f.stem[7:]
            a, b = span(s, cid)
            c = s[a:b]
            k = c.rfind('</div>', 0, c.rfind('</div>'))
            s = s[:a] + c[:k] + frag + '\n' + c[k:] + s[b:]
            touched.append((cid, frag))
    new = [f for f in files if not f.name.startswith(('replace_', 'append_'))]
    if new:
        by_id, order = {}, []
        for f in new:
            frag = f.read_text(encoding='utf-8').strip()
            cid = re.search(r'id="([^"]+)"', frag).group(1)
            if f'id="{cid}"' in s:
                raise SystemExit(f'{cid} already on {page.name}')
            by_id[cid] = frag
            order.append(cid)
        out, placed = [], set()
        for title, ids in HEADINGS.get(pdir.name, []):
            ids = [i for i in ids if i in by_id]
            if ids:
                out.append(f'<div class="sub-sec"><span class="sub-sec-t">{title}</span></div>')
                out += [by_id[i] for i in ids]
                placed |= set(ids)
        rest = [i for i in order if i not in placed]
        if rest:
            out.append('<div class="sub-sec"><span class="sub-sec-t">New additions</span></div>')
            out += [by_id[i] for i in rest]
        k = s.rfind('<div class="div-line"></div>')
        if k < 0:
            k = s.rindex('</body>')
        s = s[:k] + '\n'.join(out) + '\n' + s[k:]
        touched += [(i, by_id[i]) for i in order]
    for cid, frag in touched:
        tags = re.search(r'<div class="module-card[^"]*" id="%s" data-tags="([^"]*)"' % re.escape(cid), s).group(1)
        topics = sorted({TOPIC[t] for t in tags.split() if t in TOPIC}) or ['General']
        for q, a in QA.findall(frag):
            q, a = plain(q), plain(a)
            if q and a and q not in have:
                bank.append({'q': q, 'a': a, 'file': page.name, 'card': cid, 'tags': tags, 'topics': topics, 'real': False})
                have.add(q)
                added += 1
    print(f'{page.name}: {len(touched)} cards/edits')
    if not DRY:
        page.write_text(s, encoding='utf-8', newline='\n')
if not DRY:
    bank_path.write_text(json.dumps(bank, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print(f'interview bank: +{added} -> {len(bank)}')
