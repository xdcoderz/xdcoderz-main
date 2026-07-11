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
    <section id="faq" aria-labelledby="faq-title" className="article-faq">
      <p className="journal-section-label">FAQ</p>
      <h2 id="faq-title">
        Quick answers before you act on this
      </h2>
      <div className="article-faq__list">
        {items.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
