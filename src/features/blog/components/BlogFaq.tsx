export type BlogFaqItem = {
  question: string;
  answer: string;
};

type BlogFaqProps = {
  items: BlogFaqItem[];
};

export function BlogFaq({ items }: BlogFaqProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section id="faq" aria-labelledby="faq-title" className="mt-14 border-t border-neutral-200 pt-12">
      <p className="text-xs font-semibold uppercase text-neutral-500">FAQ</p>
      <h2 id="faq-title" className="mt-3 text-2xl font-semibold text-neutral-950 sm:text-3xl">
        Quick answers before you act on this
      </h2>
      <div className="mt-7 grid gap-4">
        {items.map((item) => (
          <details key={item.question} className="group border border-neutral-200 bg-white p-5">
            <summary className="cursor-pointer list-none text-base font-semibold text-neutral-950 marker:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="text-xl font-normal text-neutral-400 group-open:hidden" aria-hidden="true">
                  +
                </span>
                <span className="hidden text-xl font-normal text-neutral-400 group-open:inline" aria-hidden="true">
                  -
                </span>
              </span>
            </summary>
            <p className="mt-4 leading-7 text-neutral-650">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
