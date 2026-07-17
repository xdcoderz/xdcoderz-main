import { insertSupabaseRow } from "@/lib/supabase/server";
import type { ToolEventInput } from "./events";

export function saveToolEvent(input: ToolEventInput) {
  return insertSupabaseRow("tool_events", {
    session_id: input.sessionId,
    tool_slug: input.tool,
    event_name: input.event,
    source_path: `/tools/${input.tool}`,
    metadata: input.metadata ?? {},
  });
}
