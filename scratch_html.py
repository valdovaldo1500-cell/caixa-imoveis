import sys
sys.path.insert(0, '/home/valdo/scripts')
from chrome_session import chrome_context

url = "https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel=8787718965896"

with chrome_context("o6-edital") as (page, ctx):
    page.goto(url, timeout=30000, wait_until="domcontentloaded")
    page.wait_for_timeout(2000)
    html = page.content()
    with open("/tmp/o6-edital/full_leilao_sfi.html", "w") as f:
        f.write(html)
    print(len(html))
