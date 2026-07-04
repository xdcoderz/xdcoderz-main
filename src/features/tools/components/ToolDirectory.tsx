import { ToolCard } from "./ToolCard";
import { getToolsByCategory, toolCategories } from "../data";

export function ToolDirectory() {
  return (
    <div className="grid gap-12">
      {toolCategories.map((category) => {
        const categoryTools = getToolsByCategory(category);

        return (
          <section key={category} aria-labelledby={`${category}-heading`}>
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-neutral-200 pb-4 dark:border-white/10">
              <div>
                <h2
                  id={`${category}-heading`}
                  className="text-2xl font-semibold text-neutral-950 dark:text-white"
                >
                  {category}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-650 dark:text-neutral-300">
                  {categoryDescriptions[category]}
                </p>
              </div>
              <span className="hidden rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-650 dark:bg-white/[0.06] dark:text-neutral-300 sm:inline-flex">
                {categoryTools.length} tools
              </span>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {categoryTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

const categoryDescriptions = {
  "Planning Tools":
    "Turn raw ideas, budgets, and operational friction into clearer software decisions.",
  "Business Tools":
    "Small practical utilities that help operators move faster without buying heavy systems.",
  "Developer Tools":
    "Focused browser tools for builders, testers, students, and technical teams.",
  "Growth Tools":
    "Tools that improve messaging, discovery, and the quality of online business execution.",
};

