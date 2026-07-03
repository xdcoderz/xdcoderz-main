import type { RoadmapItem } from "@/data/roadmap";

const statusStyles: Record<RoadmapItem["status"], string> = {
  Live: "border-emerald-200 bg-emerald-50 text-emerald-800",
  Released: "border-sky-200 bg-sky-50 text-sky-800",
  "In development": "border-amber-200 bg-amber-50 text-amber-800",
  Planned: "border-neutral-200 bg-neutral-50 text-neutral-700",
  Exploring: "border-amber-200 bg-amber-50 text-amber-800",
};

export function RoadmapList({ items }: { items: RoadmapItem[] }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
      {items.map((item) => (
        <article
          key={item.title}
          className="grid gap-4 border-b border-neutral-200 p-5 last:border-b-0 md:grid-cols-[0.35fr_1fr]"
        >
          <div>
            <span
              className={`inline-flex rounded-md border px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
            >
              {item.status}
            </span>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-neutral-950">{item.title}</h3>
            <p className="mt-2 leading-7 text-neutral-650">{item.summary}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
