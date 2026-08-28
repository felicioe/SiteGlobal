import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";
import { NoticiasPublicas } from "./NoticiasPublicas";

export const metadata: Metadata = {
  title: "Publicações | Associação Capitular Adonhiramita",
  description: "Publicações institucionais da Associação Capitular Adonhiramita ao Vale de Itajaí.",
};

export default function Page() {
  return (
    <SiteChrome currentPath="/publicacoes" currentLabel="Publicações">
      <main className="content-page">
        <header className="content-heading">
          <p>Conteúdo institucional</p>
          <h1>Publicações</h1>
          <p>Notícias e comunicados publicados pela administração do portal.</p>
        </header>
        <NoticiasPublicas />
      </main>
    </SiteChrome>
  );
}
