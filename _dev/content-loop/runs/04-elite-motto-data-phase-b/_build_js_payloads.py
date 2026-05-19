"""Build ready-to-paste JS payloads for reviewer prompts (no base64, JSON-string escape)."""
import sys, io, json
sys.stdout.reconfigure(encoding='utf-8')

streams = [
    (1, '_dev/content-loop/runs/04-elite-motto-data-phase-b/01-preparationWeeks/v1-reviewer-prompt-v2.md'),
    (2, '_dev/content-loop/runs/04-elite-motto-data-phase-b/02-sosScenarios/v1-reviewer-prompt-v2.md'),
    (3, '_dev/content-loop/runs/04-elite-motto-data-phase-b/03-shoppingList-categories/v1-reviewer-prompt-v2.md'),
]
for n, path in streams:
    text = io.open(path, encoding='utf-8').read()
    # JSON string literal — safe for JS const = "..."
    js_string = json.dumps(text, ensure_ascii=False)
    js_payload = '(() => { const t = ' + js_string + '; const e = document.querySelector(\'div[contenteditable="true"]\'); if (!e) return JSON.stringify({error:"no editor"}); e.focus(); document.execCommand("insertText", false, t); return JSON.stringify({len: e.textContent.length, expected: t.length}); })()'
    out_path = f'/c/Users/Bolle/AppData/Local/Temp/machsleicht-sync/r{n}-js-payload.txt'
    # use bash-style path conversion
    win_path = f'C:/Users/Bolle/AppData/Local/Temp/machsleicht-sync/r{n}-js-payload.txt'
    with io.open(win_path, 'w', encoding='utf-8') as f:
        f.write(js_payload)
    print(f'STREAM {n}: raw_text={len(text)} | js_payload={len(js_payload)} | path={win_path}')
