import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Links institucionais | Associação Capitular Adonhiramita",
  description: "Referências externas e portais institucionais relacionados ao Rito Adonhiramita.",
};

const links = [
  {
    name: "Rito Adonhiramita",
    detail: "História, estudos e referências externas sobre o Rito Adonhiramita.",
    href: "https://www.adonhiramita.org/index.html",
    domain: "adonhiramita.org",
  },
  {
    name: "Grande Oriente de Santa Catarina",
    detail: "Portal institucional do GOSC.",
    href: "https://gosc.org.br/",
    domain: "gosc.org.br",
  },
];

export default function Page() {
  return (
    <SiteChrome>
      <main className="links-page">
        <header>
          <h1>Links institucionais</h1>
          <p>Referências e ambientes externos selecionados para consulta.</p>
        </header>
        <div className="external-list">
          {links.map((item) => (
            <a href={item.href} target="_blank" rel="noreferrer" key={item.href}>
              <div>
                <h2>{item.name}</h2>
                <p>{item.detail}</p>
              </div>
              <span>{item.domain} <span aria-hidden="true">&#8599;</span><span className="sr-only"> (abre em nova aba)</span></span>
            </a>
          ))}
          <div className="external-list__pending">
            <div>
              <h2>SGCAB</h2>
              <p>O endereço oficial será incluído após confirmação.</p>
            </div>
            <span>Em preparação</span>
          </div>
        </div>
        <p className="external-note">Os links acima direcionam para sites externos, com políticas próprias de conteúdo e privacidade.</p>
      </main>
    </SiteChrome>
  );
}
