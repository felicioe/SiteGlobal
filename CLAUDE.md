# Continuidade operacional do portal público

Este arquivo é o ponto de partida para Claude/Codex ao retomar o portal da
Associação. Não confundir os dois projetos:

- `SiteGlobal` (este repositório) publica o portal público em
  `https://associacaoadonhiramita.org`.
- `felicioe/lojaperfeicao` publica o sistema administrativo e o CMS em
  `https://sistema.associacaoadonhiramita.org`.

## Estado confirmado em 31/08/2026

- A auditoria consolidada de portal, sistema, desktop e mobile está em
  `docs/AUDITORIA-GERAL-2026-08-31.md`. Resultado atual: **15/20 (Bom)**,
  com 0 P0, 3 P1, 6 P2 e 2 P3. Ler esse relatório antes de declarar a revisão
  completa ou iniciar a próxima rodada de correções.

- Portal público, agenda, publicações, contato e rota genérica de página CMS
  respondem `200 OK`.
- O botão `Área restrita`, inclusive no menu mobile, aponta para
  `https://sistema.associacaoadonhiramita.org/dashboard`. Essa é a entrada do
  sistema: com sessão abre o ambiente operacional; sem sessão redireciona para
  `/auth`; perfis de Irmão são encaminhados pelo próprio sistema a `/painel`.
- O healthcheck do sistema responde `200 OK`.
- A API pública do CMS responde sem modo degradado.
- Agenda e notícias reais aparecem no portal público.
- Menu e páginas do CMS estavam vazios na última verificação; por isso o portal
  mantém a navegação institucional local como fallback até haver cadastros.
- O portal público é PWA instalável, com manifesto, ícones 192/512, ícone
  maskable, Apple Touch Icon, modo standalone, service worker e orientação de
  instalação para iPhone/iPad.

## Incidente e causa raiz

O sistema Node da Hostinger compilava, mas `/api/health` respondia `503` com
`open EEXIST`. A pilha mostrou que o erro ocorria antes da conexão MySQL: o
`mysql2` empacotado carregava a fachada ESM do builtin `process`, e o runtime
isolado da Hostinger falhava ao sincronizar `stdin` em `node:net`.

Uma tentativa de externalizar `mysql2` removeu o erro original, mas o artefato
Nitro não levava `node_modules` para produção e passou a responder
`ERR_MODULE_NOT_FOUND`. Essa tentativa não é a solução correta neste provedor.

## Correção aplicada no sistema

No repositório `felicioe/lojaperfeicao`:

- `src/lib/backend/process-shim.cjs` exporta `globalThis.process`.
- `vite.config.ts` redireciona a importação exata de `process` para esse shim.
- O driver `mysql2` continua empacotado dentro do artefato Nitro.
- O detalhe temporário de stack usado no diagnóstico foi removido após a
  recuperação.

Commits desta recuperação: `dd98535` (tentativa de externalização), `659b155`
(diagnóstico), `96a79b8` (correção efetiva) e `9c10410` (limpeza). O arquivo
`CLAUDE.md` do sistema contém também a recuperação posterior de 30/31-08.

## Correções aplicadas no portal público

- `12d92aa`: conectou publicações, agenda, páginas e menu ao CMS, com fallback
  seguro quando menu/páginas estão vazios.
- A atualização de 31/08 corrigiu `Área restrita` para `/auth` e acrescentou o
  PWA instalável.
- O exportador estático preserva os scripts de hidratação e copia manifesto,
  service worker e ícones para a branch de publicação.

## Arquitetura do PWA

- `public/manifest.webmanifest`: identidade, cores, modo standalone, atalhos e
  ícones.
- `public/icons/`: SVG-fonte e PNGs 192, 512, maskable e Apple Touch Icon.
- `public/sw.js`: navegação network-first com fallback offline e cache de
  recursos locais; chamadas ao CMS em outro domínio não são interceptadas.
- `app/components/InstallPwa.tsx`: registra o service worker, usa o prompt
  nativo de instalação quando disponível e explica o caminho manual no iOS.

## Publicação e validação obrigatória

Fluxo: `main` -> GitHub Actions (`Preparar publicação Hostinger`) -> branch
`hostinger` -> Hostinger.

Antes de publicar:

```bash
pnpm lint
pnpm test
pnpm build:hostinger
```

Depois de publicar, validar no domínio real:

1. HTTP 200 para `/`, `/agenda/`, `/publicacoes/`, `/pagina/`,
   `/manifest.webmanifest`, `/sw.js` e ícones 192/512.
2. No mobile, abrir o menu e confirmar que `Área restrita` solicita
   `/dashboard`; sem sessão, o redirecionamento esperado termina em `/auth`.
3. Confirmar que agenda e publicações carregam dados da API do sistema.
4. Confirmar `200 OK` em `https://sistema.associacaoadonhiramita.org/api/health`.
5. Testar instalação PWA em Chrome/Android e “Adicionar à Tela de Início” em
   Safari/iOS quando houver dispositivo disponível.

## Cuidados

- Não inventar conteúdo institucional, fatos históricos, fotos ou depoimentos.
- Não remover o fallback local do menu enquanto o CMS puder retornar lista
  vazia.
- Não cachear respostas do CMS no service worker do domínio público; conteúdo
  administrativo deve permanecer atual e vem de outra origem.
- Build local ou push não comprovam produção: sempre testar HTTP e o navegador
  depois do deploy.
