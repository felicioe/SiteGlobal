"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type InstallPrompt = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPwa({ compact = false }: { compact?: boolean }) {
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [mostrarAjuda, setMostrarAjuda] = useState(false);
  const [instalado, setInstalado] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js");
    const standalone = window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    if (standalone) { Promise.resolve().then(() => setInstalado(true)); return; }

    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    Promise.resolve().then(() => setIsIos(ios));
    const onPrompt = (event: Event) => { event.preventDefault(); setPrompt(event as InstallPrompt); };
    const onInstalled = () => { setInstalado(true); setPrompt(null); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (instalado || (!prompt && !isIos)) return null;

  async function instalar() {
    if (prompt) {
      await prompt.prompt();
      const escolha = await prompt.userChoice;
      if (escolha.outcome === "accepted") setPrompt(null);
    } else {
      setMostrarAjuda(true);
    }
  }

  if (compact) return <button className="pwa-install pwa-install--compact" type="button" onClick={instalar}>Instalar aplicativo</button>;

  return <aside className="pwa-callout" aria-label="Instalar aplicativo da Associação">
    <Image src="/icons/icon-192.png" alt="" width={48} height={48} unoptimized />
    <div><strong>Tenha a Associação na tela inicial</strong><span>Acesso rápido, como um aplicativo.</span></div>
    <button className="pwa-install" type="button" onClick={instalar}>Instalar</button>
    {mostrarAjuda && <p role="status">No iPhone ou iPad: toque em Compartilhar e depois em “Adicionar à Tela de Início”.</p>}
  </aside>;
}
