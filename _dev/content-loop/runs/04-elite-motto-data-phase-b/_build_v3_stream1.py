import sys, io, json
sys.stdout.reconfigure(encoding='utf-8')

review = io.open('_dev/content-loop/runs/04-elite-motto-data-phase-b/01-preparationWeeks/v2-review.md', encoding='utf-8').read()
prompt = f"""Hier ist das Reviewer-v2-Feedback zu deinem v1:

---

{review}

---

Schreibe jetzt **v3** — JSON-Block + 2-3 Sätze Self-Assessment am Schluss (neuer Score-Estimat). Integriere ALLE Fixes aus Reviewer-Punkten 1-N. Wenn ein Reviewer-Punkt deiner Meinung nach falsch oder schwächt v1, sag das explizit im Self-Assessment statt blind zu übernehmen — Sycophancy-Drift ist nicht erlaubt.

Direkt los, JSON-Block ohne Vorrede."""

js_string = json.dumps(prompt, ensure_ascii=False)
js_payload = '(() => { const t = ' + js_string + '; const e = document.querySelector(\'div[contenteditable="true"]\'); if (!e) return JSON.stringify({error:"no editor"}); e.focus(); document.execCommand("insertText", false, t); return JSON.stringify({len: e.textContent.length, expected: t.length}); })()'
with io.open('C:/Users/Bolle/AppData/Local/Temp/machsleicht-sync/v3-stream1-payload.txt', 'w', encoding='utf-8') as f:
    f.write(js_payload)
print(f'STREAM 1: prompt_len={len(prompt)} | js_payload={len(js_payload)}')
