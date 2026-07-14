type SupabaseConfig = {
  url: string;
  secretKey: string;
};

type SupabaseWriteResult =
  | { ok: true; skipped: false }
  | { ok: false; skipped: true; reason: string };

function getSupabaseConfig(): SupabaseConfig | null {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim();
  const secretKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SECRET_KEY?.trim();

  if (!url || !secretKey) {
    return null;
  }

  return { url, secretKey };
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseConfig());
}

export async function insertSupabaseRow(
  table: string,
  row: Record<string, unknown>,
): Promise<SupabaseWriteResult> {
  return writeSupabaseRow(table, row);
}

export async function upsertSupabaseRow(
  table: string,
  row: Record<string, unknown>,
  conflictColumn: string,
): Promise<SupabaseWriteResult> {
  return writeSupabaseRow(table, row, conflictColumn);
}

async function writeSupabaseRow(
  table: string,
  row: Record<string, unknown>,
  conflictColumn?: string,
): Promise<SupabaseWriteResult> {
  const config = getSupabaseConfig();

  if (!config) {
    return {
      ok: false,
      skipped: true,
      reason: "Supabase environment variables are not configured.",
    };
  }

  const endpoint = new URL(`/rest/v1/${table}`, config.url);

  if (conflictColumn) {
    endpoint.searchParams.set("on_conflict", conflictColumn);
  }

  const response = await fetch(endpoint.toString(), {
    method: "POST",
    headers: {
      apikey: config.secretKey,
      authorization: `Bearer ${config.secretKey}`,
      "content-type": "application/json",
      prefer: conflictColumn
        ? "resolution=merge-duplicates,return=minimal"
        : "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (response.ok) {
    return { ok: true, skipped: false };
  }

  let detail = "";

  try {
    detail = await response.text();
  } catch {
    detail = "";
  }

  throw new Error(
    `Supabase ${table} write failed with ${response.status}${detail ? `: ${detail}` : "."}`,
  );
}
