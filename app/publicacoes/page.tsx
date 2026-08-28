import type { Metadata } from "next";
import { ConstructionPage } from "../components/ConstructionPage";

export const metadata: Metadata = {
  title: "Publicações | Associação Capitular Adonhiramita",
  description: "Publicações institucionais da Associação Capitular Adonhiramita ao Vale de Itajaí.",
};

export default function Page() { return <ConstructionPage title="Publicações" path="/publicacoes" />; }
