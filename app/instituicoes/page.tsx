import type { Metadata } from "next";
import { ConstructionPage } from "../components/ConstructionPage";

export const metadata: Metadata = {
  title: "Instituições | Associação Capitular Adonhiramita",
  description: "Conheça as instituições vinculadas à Associação Capitular Adonhiramita ao Vale de Itajaí.",
};

export default function Page() { return <ConstructionPage title="Instituições" />; }
