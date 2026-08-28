---
name: Associação Capitular Adonhiramita
description: Um santuário editorial sóbrio para tradição, conhecimento e continuidade.
colors:
  deep-ink: "#0b1626"
  layered-ink: "#14243a"
  ceremonial-paper: "#f4f0e7"
  bright-paper: "#fffdf8"
  restrained-gold: "#c6a65b"
  illuminated-gold: "#e0c984"
  muted-blue-gray: "#9ba9b9"
  paper-muted: "#4f5d70"
  paper-gold: "#73581d"
  ceremonial-line: "rgba(198, 166, 91, 0.3)"
typography:
  display:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "clamp(4rem, 8vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Cormorant Garamond, serif"
    fontSize: "clamp(2.5rem, 5vw, 4.7rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 800
    lineHeight: 1.65
    letterSpacing: "0.12em"
components:
  button-primary:
    backgroundColor: "{colors.restrained-gold}"
    textColor: "{colors.deep-ink}"
    typography: "{typography.label}"
    padding: "0 24px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.illuminated-gold}"
    textColor: "{colors.deep-ink}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.bright-paper}"
    typography: "{typography.label}"
    padding: "0 24px"
    height: "50px"
---

# Design System: Associação Capitular Adonhiramita

## Overview

**Creative North Star: "O Santuário Editorial"**

O sistema combina a solenidade de um acervo institucional com a clareza de uma publicação contemporânea. Azul profundo cria reserva e concentração; papel quente oferece leitura; ouro aparece apenas para hierarquia, orientação e ação.

A composição é formal sem ser burocrática. Tipografia editorial, grandes margens, linhas finas e símbolos institucionais em baixa intensidade sustentam uma atmosfera documental e respeitosa.

**Key Characteristics:**

- Sóbrio, institucional e documental.
- Alto contraste entre superfícies de tinta e papel.
- Hierarquia criada por tipografia, espaço e linhas, não por cartões genéricos.
- Ouro raro e funcional.
- Formas predominantemente retas, com geometria simbólica pontual.

## Colors

A paleta alterna tinta azul profunda, papel marfim e ouro cerimonial, com cinzas azulados para informação secundária.

### Primary

- **Ouro Contido:** reservado a chamadas principais, foco, estados ativos e linhas cerimoniais.
- **Ouro Iluminado:** utilizado em hover, foco e detalhes que precisam ganhar presença sem parecer promocionais.

### Neutral

- **Tinta Profunda:** superfície institucional principal e texto sobre papel.
- **Tinta Estratificada:** seções secundárias, menus e camadas de navegação.
- **Papel Cerimonial:** superfície de leitura longa e contraste editorial.
- **Papel Luminoso:** branco quente reservado a texto ou superfícies de maior luminosidade.
- **Cinza Azul Silencioso:** metadados e informações secundárias em fundos escuros.

**The Rare Gold Rule.** O ouro orienta e hierarquiza; nunca deve preencher grandes superfícies nem competir com o conteúdo.

## Typography

**Display Font:** Cormorant Garamond, com fallback serifado.
**Body Font:** Manrope, com fallback sans-serif.

**Character:** Cormorant Garamond traz autoridade histórica e ritmo editorial. Manrope garante leitura direta, navegação limpa e boa renderização em telas pequenas.

### Hierarchy

- **Display:** peso 600, escala fluida e entrelinha compacta; exclusivo para títulos de chegada e marcos editoriais.
- **Headline:** peso 600 e ritmo próximo de 1; organiza seções sem concorrer com o display.
- **Title:** entre 1.8rem e 3.1rem, serifado; identifica entidades, sessões e capítulos.
- **Body:** 1rem, entrelinha 1.65 e medida preferencial de 65–70 caracteres.
- **Label:** aproximadamente 0.78rem, peso 700–800 e espaçamento ampliado; usado com parcimônia em metadados e navegação.

**The Two Voices Rule.** Cormorant fala pela tradição; Manrope fala pela orientação. Não introduzir uma terceira família tipográfica.

## Layout

O sistema usa margens laterais fluidas de 5–8vw e seções com respiro vertical amplo. Conteúdo editorial alterna composições em duas colunas no desktop e coluna única abaixo de 720px. O breakpoint intermediário de 1050px compacta a navegação e os grids mais densos.

Itens de grid e flex devem aceitar encolhimento com `min-width: 0`. Alvos de toque têm no mínimo 44px, e títulos fluidos devem permanecer contidos a partir de 320px. A barra contextual fica visível durante a rolagem nas páginas internas.

## Elevation & Depth

O sistema é plano por padrão. Profundidade vem da alternância entre tinta e papel, de linhas translúcidas e de sobreposições funcionais. Sombras aparecem somente em menus suspensos, botões principais e no documento incorporado.

### Shadow Vocabulary

- **Menu suspenso:** `0 20px 44px rgba(0,0,0,.34)` para separar navegação temporária do conteúdo.
- **Ação principal:** `0 12px 30px rgba(0,0,0,.24)` para dar presença discreta ao CTA.
- **Documento:** `0 24px 54px rgba(0,0,0,.28)` para simular uma folha acima da mesa de leitura.

**The Flat-by-Default Rule.** Sombras são funcionais, nunca ornamento recorrente.

## Shapes

Retângulos de cantos retos, bordas de 1px e linhas longas formam a gramática principal. Círculos pertencem apenas ao halo do emblema; recortes poligonais pertencem ao enquadramento simbólico do hero. Não arredondar indiscriminadamente botões, painéis ou listas.

## Components

### Buttons

- **Shape:** retangular, sem raio aparente, altura mínima de 50px.
- **Primary:** ouro contido sobre tinta profunda, padding horizontal de 24px.
- **Hover / Focus:** ouro iluminado no hover; foco externo de 3px preservado em todos os controles.
- **Quiet:** transparente, texto claro e borda branca translúcida.

### Cards / Containers

O sistema evita cartões tradicionais. Entidades, links e marcos são linhas editoriais separadas por divisores, com padding vertical generoso e sem cantos arredondados.

### Navigation

A navegação usa Manrope em peso alto, alvos mínimos de 44px e estado ativo em ouro sublinhado. No celular, o menu vira `<details>/<summary>` e cada destino recebe 48px de altura. Páginas internas exibem barra contextual fixa com retorno confiável ao início.

### Historical Reader

O leitor combina índice numerado, PDF incorporado e alternativa textual para dispositivos que não exibem o documento. A navegação do índice permanece independente da hierarquia principal do site.

## Do's and Don'ts

### Do:

- **Do** usar ouro apenas para hierarquia, foco e ação.
- **Do** manter texto corrido entre 65 e 70 caracteres por linha sempre que possível.
- **Do** preservar alvos de toque de pelo menos 44px e foco visível.
- **Do** alternar superfícies de tinta e papel para estruturar narrativas longas.
- **Do** tratar imagens institucionais como evidência, com proporção e descrição corretas.

### Don't:

- **Don't** introduzir gradientes em texto, vidro decorativo, emojis como ícones ou cartões genéricos.
- **Don't** transformar ouro em cor de fundo dominante.
- **Don't** arredondar componentes que hoje pertencem à gramática retilínea.
- **Don't** inventar fotografias, depoimentos, fatos históricos ou textos institucionais.
- **Don't** ocultar transbordamento para mascarar um layout que não reflui.
