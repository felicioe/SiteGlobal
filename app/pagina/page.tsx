"use client";

import { useEffect, useState } from "react";
import { SiteChrome } from "../components/SiteChrome";

type Pagina = { titulo: string; slug: string; conteudo: string; publicado_em: string };

export default function PaginaCms() {
  const [pagina, setPagina] = useState<Pagina | null>(null);
  const [estado, setEstado] = useState<"carregando" | "ok" | "erro">("carregando");

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("slug");
    if (!slug) {
      Promise.resolve().then(() => setEstado("erro"));
      return;
    }
    fetch(`https://sistema.associacaoadonhiramita.org/api/publico/paginas/${encodeURIComponent(slug)}`)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload: { pagina?: Pagina }) => { if (!payload.pagina) throw new Error(); setPagina(payload.pagina); setEstado("ok"); })
      .catch(() => setEstado("erro"));
  }, []);

  return <SiteChrome currentPath="/pagina" currentLabel={pagina?.titulo ?? "Página institucional"}>
    <main className="content-page">
      {estado === "carregando" && <section className="content-state" aria-live="polite"><p>Carregando conteúdo…</p></section>}
      {estado === "erro" && <section className="content-state" role="alert"><h1>Conteúdo não encontrado</h1><p>Esta página não está publicada ou está temporariamente indisponível.</p></section>}
      {estado === "ok" && pagina && <article className="cms-page"><header><p>Conteúdo institucional</p><h1>{pagina.titulo}</h1></header><div className="rich-content" dangerouslySetInnerHTML={{ __html: pagina.conteudo }} /></article>}
    </main>
  </SiteChrome>;
}
