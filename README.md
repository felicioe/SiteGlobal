# SiteGlobal

Portal institucional da Associação Capitular Adonhiramita ao Vale de Itajaí,
da Loja de Perfeição Adonhiram e do Sublime Capítulo Adonhiramita Ayres Gevaerd.

## Situação atual

Portal publicado em `https://associacaoadonhiramita.org`, com exportação
estática automática pelo GitHub Actions e implantação na Hostinger. Agenda,
publicações, páginas e menu público podem consumir o CMS hospedado em
`https://sistema.associacaoadonhiramita.org`.

O portal também é instalável como PWA. O manifesto, os ícones e o service
worker ficam em `public/` e são copiados para `static-site/` pelo exportador.

Para o histórico operacional mais recente e os cuidados de continuidade, leia
[`CLAUDE.md`](./CLAUDE.md).

## Desenvolvimento

Requer Node.js 22.13 ou superior.

```bash
pnpm install
pnpm dev
pnpm build
```

## Conteúdo e privacidade

- Não publicar fotografias de pessoas, reuniões ou instalações.
- Não incluir dados de membros, documentos reservados ou credenciais.
- Páginas sem texto institucional aprovado devem permanecer como "Em construção".
- Credenciais futuras de hospedagem devem existir apenas como segredos do GitHub.
