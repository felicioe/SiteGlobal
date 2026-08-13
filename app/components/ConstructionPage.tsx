import Link from "next/link";
import Image from "next/image";
import { SiteChrome } from "./SiteChrome";

export function ConstructionPage({ title }: { title: string }) {
  return (
    <SiteChrome>
      <main className="construction">
        <div className="construction__mark" aria-hidden="true">
          <Image src="/brand/sglfm-mark.svg" alt="" width={48} height={60} />
        </div>
        <p>{title}</p>
        <h1>Em construção</h1>
        <div className="construction__rule" aria-hidden="true" />
        <p className="construction__message">
          Conteúdo em preparação. Esta página será disponibilizada após revisão e aprovação institucional.
        </p>
        <Link className="button button--primary" href="/">Voltar ao início</Link>
      </main>
    </SiteChrome>
  );
}
