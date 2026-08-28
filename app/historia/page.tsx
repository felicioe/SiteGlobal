import type { Metadata } from "next";
import Image from "next/image";
import { SiteChrome } from "../components/SiteChrome";

const documentUrl = "/publicacoes/o-rito-adonhiramita-historia.pdf";

const chapters = [
  { title: "Editorial", page: 4 },
  { title: "O Rito Adonhiramita — visão histórica", page: 6 },
  { title: "Considerações iniciais", page: 7 },
  { title: "Publicações antimaçônicas", page: 8 },
  { title: "Adonhiram — a lendária figura", page: 12 },
  { title: "O nascimento do Rito", page: 14 },
  { title: "Características do Rito", page: 18 },
  { title: "Os primórdios do Rito", page: 22 },
  { title: "O Rito Adonhiramita no Brasil", page: 26 },
  { title: "O Rito na atualidade", page: 32 },
  { title: "Datas importantes da história da Maçonaria", page: 39 },
  { title: "Datas importantes da história da Maçonaria brasileira", page: 41 },
  { title: "Complementos históricos e ritualísticos", page: 45 },
  { title: "O fundador do Rito", page: 58 },
  { title: "A Livre Maçonaria Adonhiramita", page: 68 },
];

const landmarks = [
  { year: "1743", title: "A figura de Adonhiram ganha evidência", text: "A obra Le Catechisme des Francs Maçons apresenta o nome Adonhiram no contexto da lenda do terceiro grau." },
  { year: "1744", title: "O personagem é consolidado", text: "Novas publicações ampliam a presença do nome e alimentam os debates que antecederam a formação do Rito." },
  { year: "1781", title: "Formação do Rito Adonhiramita", text: "A narrativa histórica situa na França do século XVIII a organização do sistema que viria a receber esse nome." },
  { year: "1815", title: "Fixação efetiva no Brasil", text: "Segundo a publicação, o Rito se estabelece de maneira duradoura no Brasil quando o território já era Reino Unido." },
];

export const metadata: Metadata = {
  title: "Nossa História | O Rito Adonhiramita",
  description: "Leitura institucional sobre a história, a formação e a presença do Rito Adonhiramita no Brasil.",
};

export default function HistoriaPage() {
  return (
    <SiteChrome currentPath="/historia" currentLabel="Nossa História">
      <main className="history-page">
        <section className="history-hero" aria-labelledby="history-title">
          <div className="history-hero__copy">
            <h1 id="history-title">O Rito<br />Adonhiramita</h1>
            <p className="history-hero__lead">Uma leitura documental sobre sua origem, seus símbolos, sua formação na França do século XVIII e sua trajetória no Brasil.</p>
            <p className="history-edition">Edição institucional do Sublime Grande Capítulo Adonhiramita do Brasil</p>
            <div className="history-hero__actions">
              <a className="button button--primary" href="#leitura-integral">Iniciar leitura</a>
              <a className="history-download" href={documentUrl} download>Baixar publicação completa <small>PDF · 829 KB</small></a>
            </div>
          </div>
          <figure className="history-hero__emblem">
            <div className="history-hero__halo" aria-hidden="true" />
            <Image src="/institucional/stekna-sgcab.webp" alt="Stekenna, brasão do Rito Adonhiramita" width={900} height={780} priority unoptimized />
            <figcaption>Stekenna — brasão do Rito Adonhiramita</figcaption>
          </figure>
        </section>

        <section className="history-preface" aria-labelledby="preface-title">
          <div className="history-preface__title"><h2 id="preface-title">História documentada, compreensão em movimento.</h2></div>
          <div className="history-preface__copy">
            <p>A publicação parte de uma revisão crítica das narrativas repetidas ao longo do tempo. Seu propósito é apresentar uma visão histórica apoiada em pesquisa, datas e fontes, distinguindo fatos documentais de mitos posteriormente revistos.</p>
            <blockquote>“A história é estática, feita de fatos que depois de ocorridos são imutáveis. Dinâmica é a compreensão e o ensinamento retirado do fato histórico.”</blockquote>
            <p className="history-preface__note">Texto e interpretação histórica conforme a publicação institucional disponibilizada pelo Sublime Grande Capítulo Adonhiramita do Brasil.</p>
          </div>
        </section>

        <section className="history-landmarks" aria-labelledby="landmarks-title">
          <header>
            <h2 id="landmarks-title">Marcos para orientar a leitura</h2>
            <p>Um percurso inicial. A publicação integral apresenta as fontes, controvérsias e complementos de cada período.</p>
          </header>
          <div className="history-timeline">
            {landmarks.map((landmark) => (
              <article className="history-landmark" key={landmark.year}>
                <time>{landmark.year}</time>
                <div><h3>{landmark.title}</h3><p>{landmark.text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="history-reader" id="leitura-integral" aria-labelledby="reader-title">
          <header className="history-reader__header">
            <div><h2 id="reader-title">Leitura integral</h2><p>Selecione um capítulo ou percorra as 83 páginas da publicação original.</p></div>
            <a className="button button--quiet" href={documentUrl} target="_blank" rel="noreferrer">Abrir em tela cheia</a>
          </header>
          <div className="history-reader__layout">
            <nav className="history-index" aria-label="Índice da publicação">
              <h3>Índice de leitura</h3>
              <ol>
                {chapters.map((chapter) => (
                  <li key={chapter.title}>
                    <a href={`${documentUrl}#page=${chapter.page}`} target="history-document" rel="noreferrer"><span>{chapter.title}</span><small>p. {chapter.page}</small></a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="history-document">
              <iframe title="Publicação O Rito Adonhiramita — História" name="history-document" src={`${documentUrl}#page=4&view=FitH`} />
              <p className="history-document__fallback"><strong>Leitura alternativa:</strong> caso o documento não apareça neste dispositivo, <a href={documentUrl} target="_blank" rel="noreferrer">abra a publicação completa</a>.</p>
            </div>
          </div>
        </section>

        <footer className="history-citation">
          <Image src="/institucional/brasao-sgcab.jpeg" alt="Brasão do Sublime Grande Capítulo Adonhiramita do Brasil" width={86} height={68} unoptimized />
          <p><strong>Fonte institucional</strong>Sublime Grande Capítulo Adonhiramita do Brasil. <cite>O Rito Adonhiramita — visão histórica.</cite></p>
        </footer>
      </main>
    </SiteChrome>
  );
}
