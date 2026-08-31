import re, os, glob
from collections import defaultdict

files = sorted(glob.glob('/tmp/o6-edital-sample/*.html'))
stats = defaultdict(lambda: defaultdict(int))
blocked = defaultdict(int)

RE_EDITAL = re.compile(r'Edital:&nbsp;([^<]+)</span>')
RE_ITEM = re.compile(r'N.mero do item:\s*(\d+)')
RE_LEILOEIRO = re.compile(r'Leiloeiro\(a\):\s*([^<]+)</span>')
RE_LEILAO1 = re.compile(r'Data do 1. Leil.o\s*-\s*(\d{2}/\d{2}/\d{4})\s*-\s*(\d{2})h(\d{2})')
RE_LEILAO2 = re.compile(r'Data do 2. Leil.o\s*-\s*(\d{2}/\d{2}/\d{4})\s*-\s*(\d{2})h(\d{2})')
RE_LICITACAO = re.compile(r'Data da Licita..o Aberta\s*-\s*(\d{2}/\d{2}/\d{4})\s*-\s*(\d{2})h(\d{2})')
RE_PUBLICADO = re.compile(r'Edital publicado em:\s*(\d{2}/\d{2}/\d{4}\s+\d{2}:\d{2}:\d{2})')
RE_PDF = re.compile(r"ExibeDoc\('(/editais/(?!matricula)[^']+\.PDF)'\)", re.IGNORECASE)
RE_STRLISTA = re.compile(r'strLista:\s*\("1@@"\s*\+\s*"([^"]*)"')

for fp in files:
    base = os.path.basename(fp)
    mod = base.split('_')[0]
    with open(fp, encoding='latin1', errors='replace') as f:
        html = f.read()
    stats[mod]['total'] += 1
    if 'Radware' in html or 'Bot Manager' in html or len(html) < 500:
        blocked[mod] += 1
        continue
    if RE_EDITAL.search(html):
        stats[mod]['edital_numero'] += 1
    if RE_ITEM.search(html):
        stats[mod]['edital_item'] += 1
    if RE_LEILOEIRO.search(html):
        stats[mod]['leiloeiro'] += 1
    if RE_LEILAO1.search(html):
        stats[mod]['leilao1_data'] += 1
    if RE_LEILAO2.search(html):
        stats[mod]['leilao2_data'] += 1
    if RE_LICITACAO.search(html):
        stats[mod]['licitacao_data'] += 1
    if RE_PUBLICADO.search(html):
        stats[mod]['edital_publicado_em'] += 1
    if RE_PDF.search(html):
        stats[mod]['edital_pdf'] += 1
    m = RE_STRLISTA.search(html)
    if m and m.group(1).strip():
        stats[mod]['proposta_prazo'] += 1

for mod, d in stats.items():
    print(f"\n=== {mod} (n={d['total']}, bloqueado={blocked.get(mod,0)}) ===")
    for k, v in d.items():
        if k == 'total':
            continue
        print(f"  {k}: {v}/{d['total']}")
