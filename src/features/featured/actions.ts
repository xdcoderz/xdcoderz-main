"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/features/admin/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { initialSpotlight } from "./defaults";
import type { EditorState, Spotlight } from "./types";
import { validateSpotlight } from "./validation";

export async function saveSpotlight(_state: EditorState, form: FormData): Promise<EditorState> {
  await requireAdmin();
  const mode = String(form.get("intent") ?? "");
  if (!["draft", "publish", "disable"].includes(mode)) return { error: "Choose a valid action." };
  let uploadedPath: string | undefined;
  let db: ReturnType<typeof createSupabaseAdminClient> | undefined;
  try {
    db = createSupabaseAdminClient();
    if (mode === "disable") {
      const { data, error } = await db.from("homepage_featured").select("content").eq("slot", "published").maybeSingle();
      if (error) throw error;
      const content = { ...(data?.content ?? initialSpotlight), enabled: false };
      const result = await db.from("homepage_featured").upsert({ slot: "published", content, updated_at: new Date().toISOString() });
      if (result.error) throw result.error;
    } else {
      const text = (key: string) => String(form.get(key) ?? "").trim();
      const value: Spotlight = {
        title: text("title"), description: text("description"), badge: text("badge"),
        href: text("href"), buttonLabel: text("buttonLabel"), image: text("image"),
        imageAlt: text("imageAlt"), enabled: form.get("enabled") === "on",
        startsAt: text("startsAt"), endsAt: text("endsAt"),
      };
      const validation = validateSpotlight(value);
      if (validation) return { error: validation };
      const file = form.get("upload");
      if (file instanceof File && file.size > 0) {
        if (file.size > 2 * 1024 * 1024) return { error: "Choose an image smaller than 2 MB." };
        const bytes = Buffer.from(await file.arrayBuffer());
        const png = bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
        const jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
        const webp = bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
        const ext = png ? "png" : jpg ? "jpg" : webp ? "webp" : "";
        const mime = png ? "image/png" : jpg ? "image/jpeg" : "image/webp";
        if (!ext || file.type !== mime) return { error: "Upload a valid PNG, JPEG, or WebP image." };
        uploadedPath = `spotlights/${crypto.randomUUID()}.${ext}`;
        const upload = await db.storage.from("featured-images").upload(uploadedPath, bytes, { contentType: mime, upsert: false });
        if (upload.error) throw upload.error;
        value.image = db.storage.from("featured-images").getPublicUrl(uploadedPath).data.publicUrl;
      }
      const base = db.storage.from("featured-images").getPublicUrl("").data.publicUrl;
      if (value.image !== initialSpotlight.image && !value.image.startsWith(base)) return { error: "Upload an image using this form." };
      const updated_at = new Date().toISOString();
      const rows = [{ slot: "draft", content: value, updated_at }];
      if (mode === "publish") rows.push({ slot: "published", content: value, updated_at });
      const { error } = await db.from("homepage_featured").upsert(rows);
      if (error) throw error;
      revalidatePath("/");
      revalidatePath("/admin/featured");
      return { message: mode === "draft" ? "Draft saved. The live spotlight is unchanged." : "Spotlight published. Schedule and visibility settings now apply.", saved: value };
    }
    revalidatePath("/");
    revalidatePath("/admin/featured");
    return { message: "The live spotlight is now hidden." };
  } catch {
    if (uploadedPath && db) await db.storage.from("featured-images").remove([uploadedPath]);
    return { error: "Could not save. Check Supabase configuration and apply docs/supabase-featured.sql before retrying." };
  }
}

