import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renderiza a página institucional", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Associação Capitular Adonhiramita/);
  assert.match(html, /Conhecer a História do Rito/);
  assert.match(html, /Área restrita/);
  assert.match(html, /href="https:\/\/sistema\.associacaoadonhiramita\.org\/auth"/);
  assert.doesNotMatch(html, /Acessar o SGLFM|Acessar o sistema|Entrar no sistema/);
  assert.doesNotMatch(html, /John Doe|Twenty Twenty-Five|codex-preview/);
});

test("usa metadados próprios nas páginas institucionais", async () => {
  const response = await render("/links");
  const html = await response.text();
  assert.match(html, /<title>Links institucionais \| Associação Capitular Adonhiramita<\/title>/);
});

test("renderiza a publicação histórica completa", async () => {
  const response = await render("/historia");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /O Rito Adonhiramita/);
  assert.match(html, /Leitura integral/);
  assert.match(html, /o-rito-adonhiramita-historia\.pdf/);
  assert.doesNotMatch(html, /Em construção/);
});

test("renderiza a agenda pública sem nomes civis", async () => {
  const response = await render("/agenda");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Agenda/);
  assert.match(html, /nomes históricos/);
  assert.doesNotMatch(html, /nome_civil|nome profano/);
});

test("todas as rotas públicas respondem e preservam a estrutura acessível", async () => {
  const routes = ["/", "/instituicoes", "/historia", "/agenda", "/publicacoes", "/links", "/contato"];
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, `Falha ao renderizar ${route}`);
    const html = await response.text();
    assert.match(html, /<html[^>]+lang="pt-BR"/);
    assert.match(html, /Pular para o conteúdo/);
    assert.match(html, /<main(?:\s|>)/);
    if (route !== "/") {
      assert.match(html, /data-back-link/);
      assert.match(html, /Voltar/);
      assert.match(html, /aria-current="page"/);
    }
  }
});

test("publica arquivos de descoberta para buscadores", async () => {
  const robots = await readFile(new URL("../public/robots.txt", import.meta.url), "utf8");
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  assert.match(robots, /Sitemap: https:\/\/associacaoadonhiramita\.org\/sitemap\.xml/);
  for (const route of ["", "instituicoes", "historia", "agenda", "publicacoes", "links", "contato"]) {
    assert.match(sitemap, new RegExp(`<loc>https://associacaoadonhiramita\\.org/${route}</loc>`));
  }
});

test("publica PWA instalável com identidade institucional", async () => {
  const manifest = JSON.parse(await readFile(new URL("../public/manifest.webmanifest", import.meta.url), "utf8"));
  const serviceWorker = await readFile(new URL("../public/sw.js", import.meta.url), "utf8");
  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.start_url, "/?source=pwa");
  assert.ok(manifest.icons.some((icon) => icon.sizes === "192x192"));
  assert.ok(manifest.icons.some((icon) => icon.sizes === "512x512"));
  assert.ok(manifest.icons.some((icon) => icon.purpose === "maskable"));
  assert.match(serviceWorker, /associacao-v1/);
  assert.match(serviceWorker, /event\.request\.mode === "navigate"/);
  for (const icon of ["icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"]) {
    const bytes = await readFile(new URL(`../public/icons/${icon}`, import.meta.url));
    assert.ok(bytes.length > 1000, `${icon} não foi gerado corretamente`);
  }
});

test("mantém o hero contido no viewport móvel", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.hero__content\s*\{[^}]*min-width:\s*0;[^}]*max-width:\s*100%/s);
  assert.match(css, /\.hero h1\s*\{[^}]*max-width:\s*100%;[^}]*overflow-wrap:\s*anywhere;/s);
});

test("exporta cabeçalhos de segurança essenciais", async () => {
  const exporter = await readFile(new URL("../scripts/export-static.mjs", import.meta.url), "utf8");
  assert.match(exporter, /Strict-Transport-Security/);
  assert.match(exporter, /Permissions-Policy/);
  assert.match(exporter, /X-Content-Type-Options/);
  assert.match(exporter, /Referrer-Policy/);
});

test("exporta retorno contextual com fallback para o início", async () => {
  const exporter = await readFile(new URL("../scripts/export-static.mjs", import.meta.url), "utf8");
  assert.match(exporter, /data-back-link/);
  assert.match(exporter, /window\.history\.back\(\)/);
});
