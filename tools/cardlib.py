"""HTML helpers for writing guide cards in the site's standard markup.

Use from a generator script:  sys.path.insert(0, 'tools'); from cardlib import *
"""
C = {'blue': '#5bc4ef', 'green': '#00d4a0', 'orange': '#f5a623', 'purple': '#9b8cf8', 'red': '#ff6b6b', 'grey': '#8a94b0'}


def block(title, body, col='blue'):
    c = C.get(col, col)
    return (f'<div style="margin:14px 0;padding:14px 16px;background:{c}11;border-left:3px solid {c};border-radius:6px">'
            f'<div style="font-weight:700;color:{c};margin-bottom:8px;font-size:13px">{title}</div>'
            f'<div style="font-size:13px;color:#c8c8d8;line-height:1.7">{body}</div></div>\n')


def table(head, rows, col='green'):
    c = C.get(col, col)
    h = ''.join(f'<th style="padding:6px 8px;text-align:left;color:{c};border-bottom:1px solid #1e2535">{x}</th>' for x in head)
    b = ''
    for i, r in enumerate(rows):
        bg = '#0d0f14' if i % 2 == 0 else '#111420'
        b += f'<tr style="background:{bg}">' + ''.join(f'<td style="padding:6px 8px;color:#c8c8d8;vertical-align:top">{x}</td>' for x in r) + '</tr>\n'
    return (f'<div style="overflow-x:auto;margin:10px 0"><table style="width:100%;border-collapse:collapse;font-size:11.5px;min-width:560px">'
            f'<thead><tr style="background:#0a0c10">{h}</tr></thead><tbody>{b}</tbody></table></div>')


def code(txt):
    return f'<pre style="background:#0a0c10;border:1px solid #1e2535;border-radius:6px;padding:10px 12px;font-size:11.5px;color:#c8c8d8;overflow-x:auto;white-space:pre">{txt}</pre>'


def figure(title, svg, caption):
    return (f'<div style="margin:12px 0;padding:12px 14px;background:#0a0c10;border:1px solid #1e2535;border-radius:8px">'
            f'<div style="font-size:12px;color:#8a94b0;margin-bottom:6px;font-weight:700">{title}</div>{svg}'
            f'<div style="font-size:10.5px;color:#4a5470;margin-top:4px">{caption}</div></div>\n')


def qa(pairs):
    inner = ''.join(
        f'<div style="margin:8px 0;padding:10px 14px;background:#1e253522;border-radius:6px">'
        f'<div style="color:#f5a623;font-size:12px;font-weight:700;margin-bottom:4px">Q: {q}</div>'
        f'<div style="color:#c8c8d8;font-size:12px;line-height:1.6">A: {a}</div></div>' for q, a in pairs)
    return block('Interview Q&amp;A', inner, 'orange')


def card(cid, tags, title, label, body):
    return (f'<div class="module-card" id="{cid}" data-tags="{tags}">\n'
            f'<div class="module-hdr" onclick="toggleModule(this)">\n  <span class="mod-num">{cid}</span>\n'
            f'  <span class="mod-title">{title}</span>\n  <span class="mod-tag advanced">{label}</span>\n'
            f'  <span class="mod-expand">click to expand</span>\n  <span class="chevron">▾</span>\n</div>\n'
            f'<div class="module-body" style="display:none">\n<div style="padding:20px 24px;max-width:1200px;margin:0 auto">\n'
            f'{body}</div>\n</div>\n</div>\n')
