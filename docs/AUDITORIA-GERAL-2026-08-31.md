# Auditoria geral — portal, sistema, desktop e mobile

Data da auditoria: 31/08/2026  
Domínios: `associacaoadonhiramita.org` e
`sistema.associacaoadonhiramita.org`  
Repositórios: `felicioe/SiteGlobal` e `felicioe/lojaperfeicao`

## Escopo e método

A auditoria combinou inspeção do código, detector Impeccable, lint, testes,
TypeScript, builds de produção, auditoria de dependências, verificações HTTP e
validação real no navegador em 1440 × 900 e 390 × 844. Foram percorridas as
rotas públicas principais do portal, as páginas públicas do sistema, `/auth` e
o redirecionamento de `/dashboard`.

A área autenticada não foi acessada com credenciais nesta rodada. Suas rotas
foram cobertas por análise estática, TypeScript, build e verificadores internos,
mas fluxos com dados reais — tesouraria, cadastros, relatórios, permissões e
painel do Irmão — ainda exigem uma sessão de teste autorizada para auditoria
funcional completa.

## Veredito de integridade

**Aprovado com ressalvas.** Os dois produtos são coerentes com a identidade
SGLFM, têm separação clara entre portal público e sistema e não apresentaram
quebra de layout ou erro de console em abas novas durante a confirmação. Há,
porém, conteúdo editorial de teste em produção, proteção HTTP insuficiente no
sistema privado e pendências de acessibilidade/instalação que impedem uma nota
de excelência.

## Pontuação consolidada

| Dimensão | Portal | Sistema | Consolidado | Principal evidência |
|---|---:|---:|---:|---|
| Acessibilidade | 3/4 | 2/4 | 2/4 | Alvos abaixo de 44 px e salto de H1 para H3 |
| Performance | 4/4 | 2/4 | 3/4 | Portal leve; sistema gera chunks acima de 500 kB |
| Responsividade | 4/4 | 3/4 | 4/4 | Sem overflow horizontal em 1440 px e 390 px |
| Theming | 3/4 | 3/4 | 3/4 | Identidade coerente; dívida de tokens documentados |
| Integridade | 3/4 | 3/4 | 3/4 | Builds passam, mas há conteúdo de teste e lacunas operacionais |
| **Total** | **17/20** | **13/20** | **15/20** | **Bom — corrigir dimensões fracas** |

## Resumo executivo

- Resultado: **15/20 — Bom**.
- Achados materiais: **0 P0, 3 P1, 6 P2 e 2 P3**.
- O portal e o sistema responderam `200 OK`; `/dashboard` sem sessão terminou
  corretamente em `/auth` no navegador.
- O link `Área restrita` do portal aponta para
  `https://sistema.associacaoadonhiramita.org/dashboard` no desktop e mobile.
- O manifesto e os novos ícones institucionais do sistema estão publicados;
  os arquivos 192, 512 e maskable respondem como `image/png`.
- Portal: lint limpo, 10/10 testes e exportação Hostinger concluída.
- Sistema: TypeScript e build concluídos; verificador do CMS aprovado.

## Achados P1 — corrigir antes de considerar a auditoria encerrada

### P1.1 — Conteúdo “Teste” visível em Publicações

- **Local:** `https://associacaoadonhiramita.org/publicacoes/`; origem no CMS
  do sistema.
- **Categoria:** integridade editorial.
- **Impacto:** transmite estado de homologação em um portal institucional e
  reduz confiança pública.
- **Recomendação:** despublicar ou substituir a publicação no CMS, preservando
  somente conteúdo aprovado.
- **Comando sugerido:** `$impeccable harden`.

### P1.2 — Sistema privado sem cabeçalhos HTTP defensivos essenciais

- **Local:** respostas HTML e API de
  `sistema.associacaoadonhiramita.org`; entrada principal em
  `src/server.ts`.
- **Categoria:** segurança / implementação.
- **Evidência:** produção entrega apenas
  `Content-Security-Policy: upgrade-insecure-requests`; não foram localizados
  `Strict-Transport-Security`, `X-Content-Type-Options` nem proteção contra
  framing (`frame-ancestors` ou `X-Frame-Options`). O portal público já entrega
  HSTS, `nosniff` e `SAMEORIGIN`.
- **Impacto:** reduz a defesa em profundidade contra clickjacking, interpretação
  incorreta de conteúdo e downgrade em um sistema com dados pessoais e
  financeiros.
- **Recomendação:** aplicar os cabeçalhos no wrapper de resposta do servidor,
  com CSP compatível com Google Fonts/OAuth e testes automatizados.
- **Comando sugerido:** `$impeccable harden`.

### P1.3 — Instalação do PWA do sistema não orienta usuários leigos

- **Local:** `lojaperfeicao/public/manifest.json`, `public/sw.js`,
  `src/lib/use-service-worker.ts` e interface do sistema.
- **Categoria:** PWA / onboarding.
- **Evidência:** manifesto, service worker e ícones existem, mas não há fluxo
  visível de `beforeinstallprompt`, botão de instalação nem instruções para
  Android/iOS no sistema. O portal público possui esse componente.
- **Impacto:** o usuário depende do menu do navegador, exatamente o cenário
  difícil para pessoas com pouca afinidade tecnológica.
- **Recomendação:** adicionar convite de instalação discreto após login e ajuda
  específica para Android/iOS, sem interromper tarefas.
- **Comando sugerido:** `$impeccable onboard`.

## Achados P2 — próxima rodada

### P2.1 — Alvos de toque menores que o padrão de 44 px

- **Portal:** marca “SGLFM” mede 101 × 34 px; o link de fallback do leitor
  histórico mede aproximadamente 157 × 18 px.
- **Sistema:** “Esqueci minha senha” mede aproximadamente 106 × 16 px; links do
  cabeçalho público medem 28 px de altura; o botão mobile de menu mede 40 × 44
  px.
- **Impacto:** piora o uso por pessoas com baixa destreza ou visão reduzida.
- **Referência:** WCAG 2.2, 2.5.8; 44 px permanece a meta inclusiva do projeto.
- **Recomendação:** ampliar área clicável com padding, sem necessariamente
  aumentar visualmente o texto.
- **Comando sugerido:** `$impeccable adapt`.

### P2.2 — Hierarquia de títulos salta de H1 para H3 na agenda do sistema

- **Local:** `src/routes/agenda.tsx:50` e `src/routes/agenda.tsx:67`.
- **Impacto:** leitores de tela recebem uma estrutura documental incompleta.
- **Recomendação:** introduzir um H2 de agrupamento ou tornar “Trabalhos” H2
  conforme a estrutura semântica real.
- **Comando sugerido:** `$impeccable clarify`.

### P2.3 — Página Contato continua sem canal operacional

- **Local:** `SiteGlobal/app/contato/page.tsx:9`.
- **Impacto:** visitantes não conseguem concluir a intenção de contato.
- **Ressalva:** o `PRODUCT.md` proíbe inventar dados institucionais e permite o
  estado “Em construção”; portanto é pendência de conteúdo aprovado, não falha
  técnica.
- **Recomendação:** publicar somente após o responsável fornecer e aprovar o
  canal oficial.
- **Comando sugerido:** `$impeccable clarify`.

### P2.4 — Bundle principal do sistema é grande

- **Evidência:** build local gerou chunk cliente de aproximadamente 635 kB e
  editor rico de aproximadamente 334 kB antes de gzip; o Vite emitiu aviso para
  chunks acima de 500 kB.
- **Impacto:** maior tempo de carregamento em celulares e redes lentas.
- **Recomendação:** revisar imports, separar módulos administrativos e carregar
  editores/relatórios sob demanda.
- **Comando sugerido:** `$impeccable optimize`.

### P2.5 — Oito consultas ainda não classificadas pelo verificador multi-tenant

- **Local:** `src/lib/backend/saas-super-admins.ts` (5),
  `src/lib/backend/saas-lojas.ts` (2) e
  `src/lib/backend/relatorio-exportacao.ts` (1).
- **Impacto:** não prova vazamento, pois várias consultas SaaS são globais por
  natureza, mas mantém uma lacuna de evidência em controles de isolamento.
- **Recomendação:** classificar cada consulta como global intencional ou aplicar
  escopo de loja; adicionar exceções documentadas apenas quando justificadas.
- **Comando sugerido:** `$impeccable harden`.

### P2.6 — Instalação física do PWA ainda não foi comprovada nesta rodada

- **Evidência:** manifestos, ícones, MIME, metadados iOS e service workers foram
  verificados por código/HTTP. O navegador de auditoria não expôs registro de
  service worker, embora os hooks de registro existam nos dois códigos.
- **Impacto:** permanece incerteza sobre a experiência final do prompt e do
  ícone no launcher de Android e iOS reais.
- **Recomendação:** instalar do zero em um Android e um iPhone, abrir offline,
  conferir ícone/nome e registrar evidência visual.
- **Comando sugerido:** `$impeccable audit`.

## Achados P3 — acabamento

### P3.1 — Escala tipográfica e cores do portal têm dívida documental

O detector apontou diversos valores literais em `app/globals.css` fora da
paleta/escala serializada do `DESIGN.md`. Muitos são falsos positivos legítimos
(sombras e cores descritas textualmente no próprio design system), mas a
sidecar precisa ser sincronizada para distinguir intenção de deriva.

### P3.2 — Lint global do sistema é afetado por dívida de CRLF/Prettier

O lint direcionado aos arquivos alterados passou, mas a varredura integral de
`src` encontrou erros mecânicos de final de linha em arquivos não relacionados.
Isso não quebra produção, porém reduz a utilidade do lint como gate global.

## Dependências

`npm audit --omit=dev` encontrou duas ocorrências **moderadas** ligadas a
`uuid` transitivo de `exceljs`. A correção automática proposta rebaixaria
`exceljs` com mudança incompatível; não executar `--force`. Deve-se acompanhar
uma atualização compatível e testar importação/exportação de planilhas.

## Resultados positivos a preservar

- Nenhum overflow horizontal nas dez combinações de rota/viewport avaliadas.
- `lang="pt-BR"`, um H1 por página, landmarks principais e nomes acessíveis em
  botões/formulários nas superfícies testadas.
- Formulário de login com labels e mensagens de erro previstas no código.
- Abas novas e isoladas do portal e `/auth` não emitiram erros ou warnings no
  console durante a confirmação.
- Portal com HSTS, `nosniff`, `SAMEORIGIN`, manifesto com MIME correto, sitemap
  e robots.
- Sistema privado marcado como `noindex, nofollow`.
- PWA do sistema usa agora exclusivamente o ícone institucional versionado.
- Builds locais e endpoints reais de produção estavam saudáveis ao final.

## Ordem recomendada de correção

1. **P1 — `$impeccable harden`:** remover conteúdo de teste e reforçar
   cabeçalhos do sistema.
2. **P1 — `$impeccable onboard`:** criar instalação assistida do PWA no
   sistema.
3. **P2 — `$impeccable adapt`:** normalizar alvos de toque desktop/mobile.
4. **P2 — `$impeccable clarify`:** corrigir hierarquia semântica e concluir
   Contato quando houver dados aprovados.
5. **P2 — `$impeccable optimize`:** dividir os chunks pesados do sistema.
6. **P2 — `$impeccable harden`:** classificar as oito consultas multi-tenant.
7. **Final — `$impeccable polish`:** confirmação visual e física após os
   ajustes.

Reexecutar `$impeccable audit` depois das correções para atualizar a pontuação.

