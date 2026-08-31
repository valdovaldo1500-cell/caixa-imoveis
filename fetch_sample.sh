#!/bin/bash
set -uo pipefail
OUTDIR=/tmp/o6-edital-sample
mkdir -p "$OUTDIR"
while read -r line; do
  if [[ "$line" == "==="* ]]; then
    MOD=$(echo "$line" | sed 's/=== //; s/ ===//')
    MODSLUG=$(echo "$MOD" | tr -d ' /çãáéíóõú' | tr 'A-Z' 'a-z')
    continue
  fi
  [ -z "$line" ] && continue
  ID="$line"
  OUT="$OUTDIR/${MODSLUG}_${ID}.html"
  curl -s -L --max-time 30 \
    -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
    -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" \
    -H "Accept-Language: pt-BR,pt;q=0.9,en;q=0.8" \
    -H "Referer: https://venda-imoveis.caixa.gov.br/sistema/download-lista.asp" \
    "https://venda-imoveis.caixa.gov.br/sistema/detalhe-imovel.asp?hdnimovel=$ID" \
    -o "$OUT"
  sleep 2
done < /tmp/o6-edital/sample_ids.txt
echo "done"
