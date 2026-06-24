#!/usr/bin/env python3
"""Stufe-3-Fixes aus claude.ai-Review der preparationWeeks (Countdown-Plan).
Format byte-treu (minified bleibt minified). Idempotent (nur wenn nicht vorhanden)."""
import json,glob,os,sys,re
sys.stdout.reconfigure(encoding='utf-8')
ROOT=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DRY = '--write' not in sys.argv

BALLON=' Geplatzte oder nicht aufgeblasene Ballons sofort einsammeln — Latex-Fetzen sind die häufigste Erstickungsursache bei Kleinkindern; nicht in den Mund, Ballonspiel beaufsichtigen.'
ALLERG_LIST='Allergien/Unverträglichkeiten der Gäste abfragen (Nuss, Laktose, Gluten)'
ALLERG_ITEM={'icon':'🥜','title':'Allergien/Unverträglichkeiten abfragen','detail':'Bei Einladung/Zusage abklären (Nuss, Laktose, Gluten) — Liste am Back- und Party-Tag griffbereit.'}

def items_of(pw):
    """yield (setter) für jedes Text-tragende Element, schema-agnostisch."""
    out=[]
    if isinstance(pw,list):
        for ph in pw:
            for i,t in enumerate(ph.get('tasks',[])):
                if isinstance(t,str): out.append(('list',ph,i,t))
    elif isinstance(pw,dict):
        for ph in pw.values():
            for it in ph.get('items',[]):
                if isinstance(it,dict): out.append(('dict',it,None,(it.get('title','')+' '+it.get('detail',''))))
                # string-items lassen wir
    return out

def add_balloon(pw):
    chg=0
    for kind,obj,idx,txt in items_of(pw):
        if 'ballon' in txt.lower() and 'erstick' not in txt.lower():
            if kind=='list': obj['tasks'][idx]=obj['tasks'][idx].rstrip('. ')+'.'+BALLON
            else: obj['detail']=(obj.get('detail','').rstrip()+BALLON)
            chg+=1
    return chg

def add_allergy(pw):
    blob=json.dumps(pw,ensure_ascii=False).lower()
    if 'allergi' in blob or 'unverträglich' in blob: return 0
    if isinstance(pw,list) and pw:
        pw[0].setdefault('tasks',[]).insert(0,ALLERG_LIST); return 1
    if isinstance(pw,dict):
        first=next(iter(pw.values()))
        first.setdefault('items',[]).insert(0,dict(ALLERG_ITEM)); return 1
    return 0

def add_uv(pw):
    chg=0
    for kind,obj,idx,txt in items_of(pw):
        if re.search(r'uv-schrift|uv-set|uv-lampe|uv-licht',txt,re.I) and 'in die augen' not in txt.lower():
            if kind=='list': obj['tasks'][idx]=obj['tasks'][idx].rstrip('. ')+'. UV-Lampe nie in die Augen leuchten.'
            else: obj['detail']=(obj.get('detail','').rstrip()+' UV-Lampe nie in die Augen leuchten.')
            chg+=1
    return chg

BALLON_TARGET={'klein','mittel'}   # gross: Risiko vernachlässigbar
report={}
for fn in sorted(glob.glob(os.path.join(ROOT,'data','motto','*.json'))):
    b=os.path.basename(fn); grp=b.rsplit('-',1)[1].replace('.json','')
    raw=open(fn,encoding='utf-8').read(); d=json.loads(raw); pw=d.get('preparationWeeks')
    if pw is None: continue
    chg=0; notes=[]
    if grp in BALLON_TARGET:
        n=add_balloon(pw); chg+=n; notes+=['ballon+%d'%n] if n else []
    n=add_allergy(pw); chg+=n; notes+=['allergie+%d'%n] if n else []
    # UV verworfen (UNSICHER/minor, über-appliziert)
    if b=='dino-klein.json':
        s=json.dumps(d,ensure_ascii=False)
        s2=s.replace('Plastik-Eier 20er (~5€)','Plastik-Eier 40er-Pack (~8€)').replace('Plastik-Eier 20er','Plastik-Eier 40er-Pack')
        s2=s2.replace('Mini-Dinos > 3 cm wählen','Mini-Dinos so groß wählen, dass sie NICHT durch eine Klopapierrolle passen (Verschluck-Test)')
        if s2!=s: d=json.loads(s2); pw=d.get('preparationWeeks'); chg+=1; notes+=['dino-eier/dino-groesse']
    if chg:
        report[b]=notes
        if not DRY:
            assert json.loads(json.dumps(d))  # valide
            if raw.strip().count('\n')==0: out=json.dumps(d,ensure_ascii=False,separators=(',',':'))
            else: out=json.dumps(d,ensure_ascii=False,indent=2)+('\n' if raw.endswith('\n') else '')
            open(fn,'w',encoding='utf-8').write(out)
print(('WRITE' if not DRY else 'DRY-RUN')+' — betroffene Dateien: %d'%len(report))
for k,v in report.items(): print('  ',k,'->',v)
