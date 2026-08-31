import sys
sys.path.insert(0, '/home/valdo/scripts')
from chrome_session import chrome_context

ids = ['8444429188685', '8444419226797', '1787701268374', '8787712019484']
BASE = "https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel="

with chrome_context("o6-edital") as (page, ctx):
    for cid in ids:
        out = f"/tmp/o6-edital-sample/venda_online_{cid}.html"
        resp = page.goto(BASE + cid, timeout=20000, wait_until="domcontentloaded")
        page.wait_for_timeout(600)
        html = page.content()
        with open(out, "w") as f:
            f.write(html)
        print(cid, "status", resp.status if resp else None, "len", len(html))
