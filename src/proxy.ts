import type { NextRequest } from "next/server";
import { refreshSupabaseAuth } from "@/lib/supabase/auth-proxy";

export async function proxy(request: NextRequest) {
  return refreshSupabaseAuth(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
