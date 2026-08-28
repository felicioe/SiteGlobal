"use client";

import { useEffect, useState } from "react";

type Noticia = { id: string; titulo: string; resumo: string | null; conteudo: string; publicado_em: string };

export function NoticiasPublicas() {
  const [noticias, setNoticias] = useState<Noticia[] | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    fetch("https://sistema.associacaoadonhiramita.org/api/publico/noticias")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload: { noticias?: Noticia[] }) => setNoticias(Array.isArray(payload.noticias) ? payload.noticias : []))
      .catch(() => setErro(true));
  }, []);

  if (erro) return <section className="content-state" role="alert"><h2>Publicações temporariamente indisponíveis</h2><p>Tente novamente em alguns instantes.</p></section>;
  if (noticias === null) return <section className="content-state" aria-live="polite"><p>Carregando publicações…</p></section>;
  if (noticias.length === 0) return <section className="content-state"><h2>Nenhuma publicação disponível</h2><p>Novos conteúdos aparecerão aqui após a publicação no CMS.</p></section>;

  return <section className="news-list" aria-label="Publicações">
    {noticias.map((noticia) => <article className="news-item" key={noticia.id}>
      <time dateTime={noticia.publicado_em.replace(" ", "T")}>{new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(noticia.publicado_em.replace(" ", "T")))}</time>
      <h2>{noticia.titulo}</h2>
      {noticia.resumo && <p className="news-summary">{noticia.resumo}</p>}
      <div className="rich-content" dangerouslySetInnerHTML={{ __html: noticia.conteudo }} />
    </article>)}
  </section>;
}
