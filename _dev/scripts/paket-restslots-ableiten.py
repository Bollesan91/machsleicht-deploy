import pathlib, json, re, difflib, sys
TPL = pathlib.Path('paket/_maschine/template.html'); MAN = pathlib.Path('paket/_maschine/manifeste')
tpl = TPL.read_text(encoding='utf-8')
man = {p.stem: json.loads(p.read_text(encoding='utf-8')) for p in sorted(MAN.glob('*.json'))}
def bauen(m, t):
    for s in ['palette','cfg','epithets','gamemeta','demo']: t = t.replace('{{%s}}'%s, m[s])
    for r in ['signet','siegel','cover']: t = t.replace('{{svg:%s}}'%r, m['svg'][r])
    for sid, w in (m.get('woerter') or {}).items(): t = t.replace('{{%s}}'%sid, w)
    return t
def normiert(motto, m):
    t = pathlib.Path('paket/%s/index.html'%motto).read_text(encoding='utf-8')
    for rolle, alt in m['svgNamen'].items(): t = re.sub(r'\b%s\b'%alt, '%sSvg'%rolle, t)
    return t
kand = {}
for motto, m in man.items():
    if motto == 'feuerwehr': continue
    za, zb = normiert(motto, m).split('\n'), bauen(m, tpl).split('\n')
    for tag,i1,i2,j1,j2 in difflib.SequenceMatcher(None,za,zb,autojunk=False).get_opcodes():
        if tag!='replace' or (i2-i1)!=(j2-j1): continue
        for a,b in zip(za[i1:i2], zb[j1:j2]): kand.setdefault(b.strip(),{})[motto]=a.strip()
zeilen = tpl.split('\n'); flach=[z.strip() for z in zeilen]
nutzbar=[k for k in kand if k in flach and k and not k.startswith('{{')]
start = max(int(s[1:]) for s in man['feuerwehr']['woerter']) if man['feuerwehr'].get('woerter') else 0
neu=list(zeilen); zus={m:{} for m in man}
for n,k in enumerate(sorted(nutzbar,key=lambda x: flach.index(x)), start+1):
    sid='w%02d'%n
    for i,z in enumerate(zeilen):
        if z.strip()==k: neu[i]=z[:len(z)-len(z.lstrip())]+'{{%s}}'%sid
    for m in man: zus[m][sid]= k if m=='feuerwehr' else kand[k].get(m,k)
TPL.write_text('\n'.join(neu),encoding='utf-8')
for m,v in zus.items():
    p=MAN/('%s.json'%m); d=json.loads(p.read_text(encoding='utf-8'))
    d['woerter']={**(d.get('woerter') or {}), **v}
    p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Erweitert um %d Slots.'%len(nutzbar))
