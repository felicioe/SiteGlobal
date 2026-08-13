import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const output = path.join(root, "static-site");
const routes = ["/", "/instituicoes", "/historia", "/agenda", "/publicacoes", "/links", "/contato"];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const workerUrl = pathToFileURL(path.join(root, "dist/server/index.js"));
workerUrl.searchParams.set("export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`https://associacaoadonhiramita.org${route}`, {
      headers: { accept: "text/html" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  if (!response.ok) throw new Error(`Falha ao renderizar ${route}: ${response.status}`);

  let html = await response.text();
  html = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b[^>]*rel=["']modulepreload["'][^>]*>/gi, "")
    .replace(/<link\b[^>]*as=["']script["'][^>]*>/gi, "");

  const routeDir = route === "/" ? output : path.join(output, route.slice(1));
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), html, "utf8");
}

await cp(path.join(root, "dist/client/assets"), path.join(output, "assets"), { recursive: true });
for (const directory of ["brand", "institucional"]) {
  await cp(path.join(root, "public", directory), path.join(output, directory), { recursive: true });
}
await cp(path.join(root, "public/favicon.svg"), path.join(output, "favicon.svg"));

const htaccess = `Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /index.html
<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
</IfModule>
`;
await writeFile(path.join(output, ".htaccess"), htaccess, "utf8");

const home = await readFile(path.join(output, "index.html"), "utf8");
if (!home.includes("Associação Capitular Adonhiramita")) {
  throw new Error("A página inicial exportada não contém a identidade esperada.");
}

console.log(`Exportação estática concluída: ${routes.length} páginas.`);
