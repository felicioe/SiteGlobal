import Link from "next/link";
import Image from "next/image";

const navigation = [
  ["Início", "/"],
  ["Instituições", "/instituicoes"],
  ["Nossa História", "/historia"],
  ["Agenda", "/agenda"],
  ["Publicações", "/publicacoes"],
  ["Links", "/links"],
  ["Contato", "/contato"],
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Página inicial do SGLFM">
          <Image src="/brand/sglfm-mark.svg" alt="" width={26} height={34} />
          <span>SGLFM</span>
        </Link>
        <nav aria-label="Navegação principal">
          {navigation.map(([label, href]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
        </nav>
        <a className="header-access" href="https://sistema.associacaoadonhiramita.org/" target="_blank" rel="noreferrer">
          Área restrita
        </a>
      </header>
      <div id="conteudo">{children}</div>
      <footer className="site-footer">
        <div className="footer-brand">
          <Image src="/brand/sglfm-mark.svg" alt="" width={24} height={31} />
          <div>
            <strong>SGLFM</strong>
            <span>Sistema de Gestão de Loja Filosófica Maçônica</span>
          </div>
        </div>
        <p>Conteúdo institucional. Informações reservadas permanecem no ambiente restrito.</p>
        <div className="footer-links">
          <Link href="/links">Links institucionais</Link>
          <a href="https://sistema.associacaoadonhiramita.org/" target="_blank" rel="noreferrer">Acessar o sistema</a>
        </div>
      </footer>
    </div>
  );
}
