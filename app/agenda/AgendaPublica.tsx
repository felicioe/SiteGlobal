"use client";

import { useEffect, useState } from "react";

type Trabalho = { titulo: string; nome_historico: string | null };
type Sessao = {
  id: string;
  data: string;
  tipo: string;
  grau: number;
  nome_grau: string | null;
  corpo: string | null;
  trabalhos: Trabalho[];
};

const tipoLabel: Record<string, string> = {
  ordinaria: "Sessão ordinária",
  magna: "Sessão magna",
  branca: "Sessão branca",
  administrativa: "Sessão administrativa",
  iniciacao: "Sessão de iniciação",
};

function dataDaSessao(data: string) {
  const [datePart, timePart = ""] = data.split(" ");
  const [ano, mes, dia] = datePart.split("-").map(Number);
  const [hora = 0, minuto = 0] = timePart.split(":").map(Number);
  const date = new Date(ano, mes - 1, dia, hora, minuto);
  return {
    dia: new Intl.DateTimeFormat("pt-BR", { day: "2-digit" }).format(date),
    mes: new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(date).replace(".", ""),
    semana: new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date),
    horario: timePart ? `${String(hora).padStart(2, "0")}h${String(minuto).padStart(2, "0")}` : null,
  };
}

function rotuloDoGrau(grau: number, nome: string | null) {
  const nomeLimpo = nome?.trim();
  const nomeNormalizado = nomeLimpo?.toLocaleLowerCase("pt-BR").replace(/\s+/g, " ");
  if (!nomeLimpo || nomeNormalizado === `grau ${grau}` || nomeNormalizado === String(grau)) {
    return `Grau ${grau}`;
  }
  return `Grau ${grau} — ${nomeLimpo}`;
}

export function AgendaPublica() {
  const [agenda, setAgenda] = useState<Sessao[] | null>(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://sistema.associacaoadonhiramita.org/api/publico/agenda", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Agenda indisponível");
        return response.json() as Promise<{ agenda: Sessao[] }>;
      })
      .then((payload) => setAgenda(payload.agenda))
      .catch((error: Error) => {
        if (error.name !== "AbortError") setErro(true);
      });
    return () => controller.abort();
  }, []);

  if (erro) {
    return (
      <section className="agenda-state" role="alert">
        <h2>Agenda temporariamente indisponível</h2>
        <p>Tente novamente em alguns instantes.</p>
        <button type="button" onClick={() => window.location.reload()}>Atualizar agenda</button>
      </section>
    );
  }

  if (agenda === null) {
    return <section className="agenda-state" aria-live="polite"><p>Carregando próximas sessões…</p></section>;
  }

  if (agenda.length === 0) {
    return <section className="agenda-state"><h2>Nenhuma sessão programada</h2><p>A próxima programação será apresentada aqui assim que for cadastrada.</p></section>;
  }

  return (
    <section className="agenda-list" aria-label="Próximas sessões">
      {agenda.map((sessao) => {
        const data = dataDaSessao(sessao.data);
        return (
          <article className="agenda-session" key={sessao.id}>
            <time className="agenda-date" dateTime={sessao.data.replace(" ", "T")}>
              <strong>{data.dia}</strong><span>{data.mes}</span><small>{data.semana}</small>
            </time>
            <div className="agenda-session__body">
              <div className="agenda-session__meta">
                <span>{tipoLabel[sessao.tipo] ?? "Sessão"}</span>
                {data.horario && <span>{data.horario}</span>}
                {sessao.corpo && <span>{sessao.corpo}</span>}
              </div>
              <h2>{rotuloDoGrau(sessao.grau, sessao.nome_grau)}</h2>
              {sessao.trabalhos.length > 0 ? (
                <div className="agenda-works">
                  {sessao.trabalhos.map((trabalho, index) => (
                    <div className="agenda-work" key={`${trabalho.titulo}-${index}`}>
                      <p>{trabalho.titulo}</p>
                      {trabalho.nome_historico && <span>Apresentação: {trabalho.nome_historico}</span>}
                    </div>
                  ))}
                </div>
              ) : <p className="agenda-session__pending">Trabalho ainda não informado.</p>}
            </div>
          </article>
        );
      })}
    </section>
  );
}
