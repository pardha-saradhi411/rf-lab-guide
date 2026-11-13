"""Animated sequence-diagram SVG (SMIL): messages appear one by one, a dot travels each arrow, then the flow loops.

seq_svg(entities, messages) — entities: list of names; messages: (src, dst, label, kind)
kind: rrc | nas | ap (S1AP/X2AP/NGAP/XnAP) | core (Diameter/GTP-C/SBI/PFCP) | sip | data (user plane)
"""
KIND = {'rrc': '#5bc4ef', 'nas': '#9b8cf8', 'ap': '#f5a623', 'core': '#8a94b0', 'sip': '#ff8fab', 'data': '#00d4a0'}
LEGEND = [('rrc', 'RRC / radio'), ('nas', 'NAS'), ('ap', 'S1AP · X2AP · NGAP'), ('core', 'core (Diameter · GTP-C · SBI · PFCP)'), ('sip', 'SIP (IMS)'), ('data', 'user plane / data')]
STEP, TRAVEL, HOLD = 0.9, 0.6, 3.0


def seq_svg(entities, messages, width=780, uid='sq'):
    n = len(messages)
    total = n * STEP + HOLD
    left, right = 70, width - 60
    gap = (right - left) / (len(entities) - 1)
    xs = {e: left + i * gap for i, e in enumerate(entities)}
    top, row = 86, 27
    h = top + n * row + 30
    out = ['<defs>'] + [f'<marker id="{uid}-{k}" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">'
                        f'<path d="M0,0 L8,4 L0,8 z" fill="{c}"/></marker>' for k, c in KIND.items()] + ['</defs>']
    lx = 10
    used = {m[3] for m in messages}
    for k, name in [l for l in LEGEND if l[0] in used]:
        out.append(f'<line x1="{lx}" y1="12" x2="{lx + 18}" y2="12" stroke="{KIND[k]}" stroke-width="2"'
                   f'{" stroke-dasharray=\"4,3\"" if k == "data" else ""}/><text x="{lx + 22}" y="15" fill="{KIND[k]}" font-size="9.5">{name}</text>')
        lx += 40 + len(name) * 5.6
    for e, x in xs.items():
        out.append(f'<rect x="{x - 52}" y="30" width="104" height="30" rx="6" fill="#0a0c10" stroke="#3a4570"/>'
                   f'<text x="{x}" y="50" fill="#c8c8d8" font-size="11" font-weight="700" text-anchor="middle">{e}</text>'
                   f'<line x1="{x}" y1="60" x2="{x}" y2="{h - 10}" stroke="#2a3050" stroke-dasharray="3,4"/>')
    for i, (src, dst, label, kind) in enumerate(messages):
        y = top + i * row
        x1, x2 = xs[src], xs[dst]
        c = KIND[kind]
        a = i * STEP / total
        b = min((i * STEP + TRAVEL) / total, 0.985)
        show = f'<animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;{a:.4f};{b:.4f};0.985;1" dur="{total:.1f}s" repeatCount="indefinite"/>'
        dash = ' stroke-dasharray="5,3"' if kind == 'data' else ''
        fits = abs(x2 - x1) > (len(label) + 4) * 5.0
        tx, anchor = ((x1 + x2) / 2, 'middle') if fits else (min(x1, x2) + 8, 'start')
        if not fits and min(x1, x2) + 8 + (len(label) + 4) * 5.0 > width - 4:
            tx, anchor = max(x1, x2) - 8, 'end'
        if x1 == x2:
            continue
        sx = x1 + (6 if x2 > x1 else -6)
        ex = x2 - (6 if x2 > x1 else -6)
        out.append(f'<g opacity="0">{show}'
                   f'<line x1="{sx:.1f}" y1="{y}" x2="{ex:.1f}" y2="{y}" stroke="{c}" stroke-width="1.6"{dash} marker-end="url(#{uid}-{kind})"/>'
                   f'<text x="{tx:.1f}" y="{y - 5}" fill="#c8c8d8" font-size="9.5" text-anchor="{anchor}">'
                   f'<tspan fill="{c}" font-weight="700">{i + 1}.</tspan> {label}</text></g>')
        out.append(f'<circle r="4" fill="{c}" opacity="0">'
                   f'<animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;{a:.4f};{a + 0.001:.4f};{b:.4f};{b + 0.001:.4f};1" dur="{total:.1f}s" repeatCount="indefinite"/>'
                   f'<animateMotion dur="{total:.1f}s" repeatCount="indefinite" path="M{sx:.1f},{y} L{ex:.1f},{y}" '
                   f'keyPoints="0;0;1;1" keyTimes="0;{a:.4f};{b:.4f};1" calcMode="linear"/></circle>')
    return f'<svg viewBox="0 0 {width} {h}" style="width:100%;max-width:{width}px">' + ''.join(out) + '</svg>'
