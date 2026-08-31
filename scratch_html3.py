import sys
sys.path.insert(0, '/home/valdo/scripts')
from chrome_session import chrome_context

urls = {
    "venda_direta": "https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel=8444428469311",
    "venda_online": "https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel=8444428815589",
}

with chrome_context("o6-edital") as (page, ctx):
    for name, url in urls.items():
        page.goto(url, timeout=30000, wait_until="domcontentloaded")
        page.wait_for_timeout(2000)
        html = page.content()
        with open(f"/tmp/o6-edital/full_{name}.html", "w") as f:
            f.write(html)
        print(name, len(html))
