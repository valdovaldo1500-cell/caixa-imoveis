# Deploy — caixa-imoveis

Push em `main` → GitHub Actions dispara o deploy no Coolify (app `k888wo4k4w8s8kgws00sg0og`,
host `crimebrasil-prod` / `188.34.199.27`). Build: `dockerCompose`, `/docker-compose.prod.yml`.

## Por que via SSH e não HTTP direto (28/08/2026)

Até 17/06/2026 o workflow chamava `${COOLIFY_URL}/api/v1/deploy` direto pela internet.
Em 10/08/2026 o host ganhou `coolify-port-guard.sh` (systemd `coolify-port-guard.service`,
regra em `DOCKER-USER` porque o Docker faz DNAT e ignora `ufw`) fechando `:8000`, `:6001`
e `:6002` para qualquer origem pública — o dashboard do Coolify estava respondendo na
internet aberta só com senha na frente. Isso é endurecimento deliberado e **não deve ser
revertido**. O próprio guard documenta o caminho pós-fechamento: SSH.

O workflow atual (`.github/workflows/deploy.yml`) faz exatamente isso:

1. GitHub Actions conecta em `root@188.34.199.27` com uma chave SSH dedicada
   (secret `CAIXA_DEPLOY_SSH_KEY`), host key pinado no próprio workflow.
2. A chave é **restrita** em `/root/.ssh/authorized_keys` no host com
   `command="/usr/local/sbin/caixa-imoveis-deploy-trigger.sh",no-port-forwarding,
   no-X11-forwarding,no-agent-forwarding,no-pty,restrict` — qualquer comando que o
   cliente tente mandar é ignorado; só esse script roda. Sem shell livre.
3. O script (`/usr/local/sbin/caixa-imoveis-deploy-trigger.sh`, root-only) lê o token
   Coolify de `/root/.config/coolify-caixa-deploy.token` (600, root:root) e chama
   `http://localhost:8000/api/v1/deploy?uuid=k888wo4k4w8s8kgws00sg0og` — nunca sai
   para a internet, roda dentro do próprio host.

Se a chave do secret `CAIXA_DEPLOY_SSH_KEY` vazar, o pior caso é disparar deploys deste
app — nada mais (sem shell, sem outros comandos, sem acesso a outros apps do Coolify).

## Secrets do repo

| Secret | Conteúdo |
|---|---|
| `CAIXA_DEPLOY_SSH_KEY` | chave privada ed25519 dedicada (`~/.ssh/caixa_imoveis_deploy_actions` na máquina do Valdo) |
| `CAIXA_DEPLOY_SSH_HOST` | `188.34.199.27` |
| `COOLIFY_TOKEN`, `COOLIFY_APP_UUID`, `COOLIFY_URL` | legado do método antigo (HTTP direto), mantidos só de referência — não são mais usados pelo workflow |

## Girar / revogar a chave de deploy

```bash
# gerar nova chave
ssh-keygen -t ed25519 -f /tmp/new_key -N "" -C "gh-actions-caixa-imoveis-deploy-trigger"

# no host, trocar a linha "command=..." em /root/.ssh/authorized_keys pela nova pubkey
# atualizar o secret CAIXA_DEPLOY_SSH_KEY no GitHub com a nova chave privada
gh secret set CAIXA_DEPLOY_SSH_KEY -R valdovaldo1500-cell/caixa-imoveis < /tmp/new_key
```

Para revogar sem gerar chave nova: apagar a linha correspondente em
`/root/.ssh/authorized_keys` no host.

## Testar manualmente

```bash
gh workflow run deploy.yml -R valdovaldo1500-cell/caixa-imoveis   # workflow_dispatch
gh run watch -R valdovaldo1500-cell/caixa-imoveis
```

Ou, direto no host, sem passar pelo GitHub:

```bash
ssh crimebrasil-prod "curl -s -H \"Authorization: Bearer \$(cat /root/.config/coolify-caixa-deploy.token)\" \
  http://localhost:8000/api/v1/deployments/<uuid>"
```
