import assert from "node:assert/strict";
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
  assert.doesNotMatch(html, /Acessar o SGLFM|Acessar o sistema/);
  assert.doesNotMatch(html, /John Doe|Twenty Twenty-Five|codex-preview/);
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
