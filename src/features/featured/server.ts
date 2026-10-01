import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { initialSpotlight } from "./defaults";
import type { Spotlight } from "./types";
import { isVisible } from "./validation";

class MissingFeaturedTable extends Error {}

export async function readSpotlight(slot: "draft" | "published"): Promise<Spotlight | null> {
  const { data, error } = await createSupabaseAdminClient().from("homepage_featured")
    .select("content").eq("slot", slot).maybeSingle();
  if (error) {
    const message = "Featured storage is unavailable. Apply docs/supabase-featured.sql and check Supabase configuration.";
    if (error.code === "42P01" || error.code === "PGRST205") throw new MissingFeaturedTable(message);
    throw new Error(message);
  }
  return data?.content as Spotlight | null;
}

export async function getPublicSpotlight() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return initialSpotlight;
  try {
    const published = await readSpotlight("published");
    // No published row means first-time setup; disabled/expired rows never use the fallback.
    const value = published ?? initialSpotlight;
    return isVisible(value) ? value : null;
  } catch (error) {
    if (error instanceof MissingFeaturedTable) return initialSpotlight;
    // Hide on operational failures rather than resurrecting a disabled promotion.
    return null;
  }
}

