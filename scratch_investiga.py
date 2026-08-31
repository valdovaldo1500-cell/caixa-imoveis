import sys
sys.path.insert(0, '/home/valdo/scripts')
from chrome_session import chrome_context

urls = {
    "leilao_sfi": "https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel=8787718965896",
    "licitacao": "https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel=8444428508937",
    "venda_direta": "https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel=8444428469311",
    "venda_online": "https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel=8444428815589",
}

with chrome_context("o6-edital") as (page, ctx):
    for name, url in urls.items():
        page.goto(url, timeout=30000, wait_until="domcontentloaded")
        page.wait_for_timeout(2000)
        text = page.inner_text("body")
        with open(f"/tmp/o6-edital/detail_{name}.txt", "w") as f:
            f.write(text)
        # Also grab any links containing 'edital' or 'pdf'
        links = page.eval_on_selector_all("a", "els => els.map(e => ({href: e.href, text: e.innerText}))")
        with open(f"/tmp/o6-edital/links_{name}.txt", "w") as f:
            for l in links:
                f.write(f"{l['text']!r} -> {l['href']}\n")
        print(f"done {name}, len={len(text)}")
