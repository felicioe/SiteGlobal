import type { Metadata } from "next";
import { SiteChrome } from "../components/SiteChrome";
import { AgendaPublica } from "./AgendaPublica";

export const metadata: Metadata = {
  title: "Agenda | Associação Capitular Adonhiramita",
  description: "Agenda pública das sessões e trabalhos dos corpos filosóficos.",
};

export default function AgendaPage() {
  return (
    <SiteChrome currentPath="/agenda" currentLabel="Agenda">
      <main className="agenda-page">
        <header className="agenda-heading">
          <h1>Agenda</h1>
          <p>Sessões, graus e trabalhos programados pelos corpos filosóficos.</p>
          <p className="agenda-privacy">Por respeito à privacidade, os apresentadores são identificados somente por seus nomes históricos.</p>
        </header>
        <AgendaPublica />
      </main>
    </SiteChrome>
  );
}
