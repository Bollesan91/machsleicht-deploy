import re,sys; sys.stdout.reconfigure(encoding='utf-8')
src=open('party-worker.js',encoding='utf-8').read()
assert 'asStr' not in src, 'Helfer schon vorhanden'
def lineno(s,pos): return s[:pos].count('\n')+1

# 1. Server-seitige asStr-Coercion (nur Zeilen < 1000 -> Client-Templates ausgeschlossen)
def repl_str(m):
    if lineno(src, m.start()) >= 1000: return m.group(0)  # Client-Template: NICHT anfassen
    return f'asStr({m.group(1)}.{m.group(2)})'
new = re.sub(r'\((body|w)\.(\w+)\s*\|\|\s*""\)', repl_str, src)

# 2. body.wishes Array-Coercion
new = new.replace('(body.wishes||[])', 'asArr(body.wishes)')

# 3. paren-lose create time/endTime (Z.318: gespeichert ohne slice -> falscher Typ moeglich)
new = new.replace('time: body.time||"", endTime: body.endTime||""',
                  'time: asStr(body.time), endTime: asStr(body.endTime)')

# 4. Helfer nach safeReqJson einfuegen
anchor='async function safeReqJson(req) { try { return await req.json(); } catch (e) { return null; } }'
assert anchor in new, 'Anker safeReqJson nicht gefunden'
helpers = anchor + '\n' + \
  '// #30 Type-Confusion-Schutz: anonyme Endpunkte koennen Nicht-Strings senden ({"name":[]}) ->\n' + \
  '// .trim()/.slice() wuerfe TypeError -> 500. Coercion macht Nicht-Strings sauber zu ""/[] (-> 400 statt 500).\n' + \
  'function asStr(v) { return typeof v === "string" ? v : ""; }\n' + \
  'function asArr(v) { return Array.isArray(v) ? v : []; }'
new = new.replace(anchor, helpers, 1)

n_str = src.count('||"')  # grob
open('party-worker.js','w',encoding='utf-8').write(new)
print('asStr-Ersetzungen:', new.count('asStr(')-1, '(minus 1 Definition)')
print('asArr-Ersetzungen:', new.count('asArr(')-1)
print('Client-Z.1751 unangetastet:', '(w.price||"")' in new)
