import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
const testDirectory = path.dirname(fileURLToPath(import.meta.url));

function load(name, imports = {}) {
  const filename = path.join(testDirectory, "../src/features/featured", name + ".ts");
  const code = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const compiled = { exports: {} };
  new Function("require", "module", "exports", code)((key) => {
    if (Object.hasOwn(imports, key)) return imports[key];
    throw new Error("Unexpected import: " + key);
  }, compiled, compiled.exports);
  return compiled.exports;
}

const validation = load("validation");
const initial = {
  title: "GridForge", description: "Turn tables into spreadsheets.", badge: "",
  href: "/products/gridforge", buttonLabel: "Explore", image: "/images/featured/table-workflow.png",
  imageAlt: "Table illustration", enabled: true, startsAt: "", endsAt: "",
};
function form(value = initial, intent = "draft") {
  const data = new FormData();
  for (const [key, item] of Object.entries(value)) data.set(key, typeof item === "boolean" ? item ? "on" : "" : item);
  data.set("intent", intent);
  return data;
}

function harness({ allowed = true, fail = false } = {}) {
  const records = new Map();
  const uploads = [];
  const removals = [];
  const paths = [];
  const db = {
    from: () => ({
      select: () => ({ eq: (_key, slot) => ({ maybeSingle: async () => ({ data: records.has(slot) ? { content: records.get(slot) } : null }) }) }),
      upsert: async (rows) => {
        if (fail) return { error: new Error("write failed") };
        for (const row of Array.isArray(rows) ? rows : [rows]) records.set(row.slot, row.content);
        return { error: null };
      },
    }),
    storage: { from: () => ({
      getPublicUrl: (name) => ({ data: { publicUrl: "https://example.supabase.co/storage/v1/object/public/featured-images/" + name } }),
      upload: async (name) => { uploads.push(name); return { error: null }; },
      remove: async (names) => { removals.push(...names); return { error: null }; },
    }) },
  };
  const actions = load("actions", {
    "next/cache": { revalidatePath: p => paths.push(p) },
    "@/features/admin/auth": { requireAdmin: async () => { if (!allowed) throw new Error("unauthorized"); } },
    "@/lib/supabase/admin": { createSupabaseAdminClient: () => db },
    "./defaults": { initialSpotlight: initial },
    "./validation": validation,
  });
  return { ...actions, records, uploads, removals, paths };
}

test("link validation rejects executable and protocol-relative destinations", () => {
  for (const link of ["javascript:alert(1)", "//evil.test", "/\\evil.test", "http://test.com", "https://user:pass@test.com"]) assert.equal(validation.safeDestination(link), false, link);
  for (const link of ["/products/gridforge", "https://github.com/xdcoderz"]) assert.equal(validation.safeDestination(link), true);
});
test("required content, length and inverted schedule are rejected", () => {
  assert.equal(validation.validateSpotlight(initial), null);
  assert.ok(validation.validateSpotlight({ ...initial, title: "" }));
  assert.ok(validation.validateSpotlight({ ...initial, description: "a".repeat(361) }));
  assert.ok(validation.validateSpotlight({ ...initial, startsAt: "bad-date" }));
  assert.ok(validation.validateSpotlight({ ...initial, startsAt: "2026-10-03T00:00:00Z", endsAt: "2026-10-02T00:00:00Z" }));
});
test("visibility uses inclusive start, exclusive end, and disabled state", () => {
  const start = Date.parse("2026-10-02T00:00:00Z");
  const end = start + 1000;
  const scheduled = { ...initial, startsAt: new Date(start).toISOString(), endsAt: new Date(end).toISOString() };
  assert.equal(validation.isVisible(scheduled, start - 1), false);
  assert.equal(validation.isVisible(scheduled, start), true);
  assert.equal(validation.isVisible(scheduled, end), false);
  assert.equal(validation.isVisible({ ...initial, enabled: false }), false);
});
test("unauthorized actions cannot mutate storage", async () => {
  const h = harness({ allowed: false });
  await assert.rejects(h.saveSpotlight({}, form()), /unauthorized/);
  assert.equal(h.records.size, 0);
});
test("saving draft never changes published content", async () => {
  const h = harness();
  h.records.set("published", initial);
  const next = { ...initial, title: "Next release" };
  const state = await h.saveSpotlight({}, form(next));
  assert.equal(state.error, undefined);
  assert.equal(h.records.get("draft").title, "Next release");
  assert.equal(h.records.get("published").title, "GridForge");
});
test("publish writes both records and invalidates the homepage", async () => {
  const h = harness();
  await h.saveSpotlight({}, form(initial, "publish"));
  assert.deepEqual(h.records.get("draft"), h.records.get("published"));
  assert.ok(h.paths.includes("/"));
});
test("disable retains the draft and hides the live content", async () => {
  const h = harness();
  h.records.set("draft", initial);
  await h.saveSpotlight({}, form(initial, "disable"));
  assert.equal(h.records.get("published").enabled, false);
  assert.equal(h.records.get("draft").enabled, true);
});
test("invalid content and spoofed image bytes are rejected before writing", async () => {
  const h = harness();
  assert.ok((await h.saveSpotlight({}, form({ ...initial, href: "javascript:evil()" }))).error);
  const data = form();
  data.set("upload", new File(["not a PNG"], "fake.png", { type: "image/png" }));
  assert.ok((await h.saveSpotlight({}, data)).error);
  assert.equal(h.records.size, 0);
  assert.equal(h.uploads.length, 0);
});
test("oversized images are rejected", async () => {
  const h = harness();
  const data = form();
  data.set("upload", new File([new Uint8Array(2097153)], "large.png", { type: "image/png" }));
  assert.match((await h.saveSpotlight({}, data)).error, /2 MB/);
});
test("failed database write cleans up a newly uploaded image", async () => {
  const h = harness({ fail: true });
  const data = form();
  data.set("upload", new File([new Uint8Array([137,80,78,71,13,10,26,10])], "image.png", { type: "image/png" }));
  assert.ok((await h.saveSpotlight({}, data)).error);
  assert.deepEqual(h.removals, h.uploads);
  assert.equal(h.uploads.length, 1);
});

test("public reads distinguish initial setup, disabled content, and outages", async () => {
  const previous = process.env.NEXT_PUBLIC_SUPABASE_URL;
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
  try {
    const publicReader = (data, error) => load("server", {
      "server-only": {},
      "@/lib/supabase/admin": { createSupabaseAdminClient: () => ({
        from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data, error }) }) }) }),
      }) },
      "./defaults": { initialSpotlight: initial },
      "./validation": validation,
    });
    assert.deepEqual(await publicReader(null, null).getPublicSpotlight(), initial);
    assert.deepEqual(await publicReader(null, { code: "PGRST205" }).getPublicSpotlight(), initial);
    assert.equal(await publicReader({ content: { ...initial, enabled: false } }, null).getPublicSpotlight(), null);
    assert.equal(await publicReader({ content: { ...initial, endsAt: "2020-01-01T00:00:00Z" } }, null).getPublicSpotlight(), null);
    assert.equal(await publicReader(null, { code: "500" }).getPublicSpotlight(), null);
  } finally {
    if (previous === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = previous;
  }
});
