import type { Metadata } from "next";
import { ConstructionPage } from "../components/ConstructionPage";

export const metadata: Metadata = {
  title: "Contato | Associação Capitular Adonhiramita",
  description: "Canal institucional de contato da Associação Capitular Adonhiramita ao Vale de Itajaí.",
};

export default function Page() { return <ConstructionPage title="Contato" path="/contato" />; }
