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
  assert.match(html, /Acessar o SGLFM/);
  assert.doesNotMatch(html, /John Doe|Twenty Twenty-Five|codex-preview/);
});

test("renderiza páginas ainda não publicadas como em construção", async () => {
  const response = await render("/historia");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Em construção/);
  assert.match(html, /após revisão e aprovação institucional/);
});
