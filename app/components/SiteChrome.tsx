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

type SiteChromeProps = {
  children: React.ReactNode;
  currentPath?: string;
  currentLabel?: string;
};

export function SiteChrome({ children, currentPath = "/", currentLabel }: SiteChromeProps) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Página inicial do SGLFM">
          <Image src="/brand/sglfm-mark.svg" alt="" width={26} height={34} unoptimized />
          <span>SGLFM</span>
        </Link>
        <nav aria-label="Navegação principal">
          {navigation.map(([label, href]) => (
            <Link href={href} key={href} aria-current={currentPath === href ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        <a className="header-access" href="https://sistema.associacaoadonhiramita.org/" target="_blank" rel="noreferrer">
          Área restrita
        </a>
        <details className="mobile-nav">
          <summary aria-label="Abrir menu de navegação">
            <span aria-hidden="true"><i /><i /><i /></span>
            Menu
          </summary>
          <nav aria-label="Navegação móvel">
            {navigation.map(([label, href]) => (
              <Link href={href} key={href} aria-current={currentPath === href ? "page" : undefined}>{label}</Link>
            ))}
            <a href="https://sistema.associacaoadonhiramita.org/" target="_blank" rel="noreferrer">
              Área restrita
            </a>
          </nav>
        </details>
      </header>
      {currentPath !== "/" && currentLabel && (
        <nav className="page-context" aria-label="Localização na estrutura do site">
          <Link href="/" data-back-link aria-label={`Voltar à página anterior; se não houver histórico, ir ao início. Seção atual: ${currentLabel}`}>
            <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
              <path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Voltar</span>
          </Link>
          <span className="page-context__current" aria-current="page">{currentLabel}</span>
        </nav>
      )}
      <div id="conteudo">{children}</div>
      <footer className="site-footer">
        <div className="footer-brand">
          <Image src="/brand/sglfm-mark.svg" alt="" width={24} height={31} unoptimized />
          <div>
            <strong>SGLFM</strong>
            <span>Sistema de Gestão de Loja Filosófica Maçônica</span>
          </div>
        </div>
        <p>Conteúdo institucional. Informações reservadas permanecem no ambiente restrito.</p>
        <div className="footer-links">
          <Link href="/links">Links institucionais</Link>
        </div>
      </footer>
    </div>
  );
}
