import Link from "next/link";
import Image from "next/image";
import { SiteChrome } from "./components/SiteChrome";

const entities = [
  {
    name: "Loja de Perfeição Adonhiram",
    description: "Corpo filosófico dedicado aos graus de aperfeiçoamento.",
    logo: "/institucional/logo-loja-perfeicao-adonhiram.png",
  },
  {
    name: "Sublime Capítulo Adonhiramita Ayres Gevaerd",
    description: "Corpo capitular vinculado à tradição Adonhiramita.",
    logo: "/institucional/logo-capitulo-ayres-gevaerd.png",
  },
];

export default function Home() {
  return (
    <SiteChrome>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__seal" aria-hidden="true">
            <Image src="/brand/sglfm-mark.svg" alt="" width={84} height={105} />
          </div>
          <div className="hero__content">
            <p className="hero__institution">Associação Capitular Adonhiramita ao Vale de Itajaí</p>
            <h1 id="hero-title">Tradição, conhecimento e continuidade.</h1>
            <p className="hero__lead">
              Portal institucional da Loja de Perfeição Adonhiram e do Sublime
              Capítulo Adonhiramita Ayres Gevaerd.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="https://sistema.associacaoadonhiramita.org/" target="_blank" rel="noreferrer">
                Acessar o SGLFM
              </a>
              <Link className="button button--quiet" href="/instituicoes">
                Conhecer as instituições
              </Link>
            </div>
          </div>
          <div className="hero__symbol" aria-hidden="true">
            <Image src="/institucional/stekna-sgcab.jpeg" alt="" width={170} height={146} />
          </div>
          <div className="hero__line" aria-hidden="true" />
        </section>

        <section className="intro" aria-labelledby="intro-title">
          <div>
            <h2 id="intro-title">Duas oficinas, uma história em construção.</h2>
          </div>
          <p>
            Este espaço reunirá informações institucionais, referências sobre o
            Rito Adonhiramita e caminhos seguros para os ambientes oficiais. Os
            conteúdos históricos serão publicados somente após revisão e aprovação.
          </p>
        </section>

        <section className="entities" aria-label="Instituições">
          {entities.map((entity) => (
            <article className="entity" key={entity.name}>
              <div className="entity__logo">
                <Image src={entity.logo} alt="" width={118} height={105} />
              </div>
              <div>
                <h2>{entity.name}</h2>
                <p>{entity.description}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="gateway" aria-labelledby="gateway-title">
          <div className="gateway__copy">
            <h2 id="gateway-title">Informação pública e gestão restrita, cada uma em seu lugar.</h2>
            <p>
              O portal apresenta apenas conteúdo autorizado. Documentos internos,
              dados dos Irmãos e rotinas administrativas permanecem protegidos no SGLFM.
            </p>
          </div>
          <div className="gateway__paths">
            <Link href="/links">
              <span>Referências e instituições</span>
              <strong>Links institucionais</strong>
            </Link>
            <a href="https://sistema.associacaoadonhiramita.org/" target="_blank" rel="noreferrer">
              <span>Ambiente reservado</span>
              <strong>Entrar no sistema</strong>
            </a>
          </div>
        </section>
      </main>
    </SiteChrome>
  );
}
