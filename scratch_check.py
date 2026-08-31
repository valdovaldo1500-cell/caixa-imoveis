import sys
sys.path.insert(0, '/home/valdo/scripts')
from chrome_session import chrome_context

with chrome_context("o6-edital") as (page, ctx):
    resp = page.goto("https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel=8787718965896", timeout=30000, wait_until="domcontentloaded")
    print("status:", resp.status if resp else None)
    page.wait_for_timeout(1500)
    print(page.title())
    print(page.inner_text("body")[:300])
