import type { ReactNode } from "react";

type MarkdownRendererProps = {
  content: string;
};

function renderInline(text: string) {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]+)\)|`([^`]+)`)/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }

    if (match[2]) {
      nodes.push(
        <strong key={`${match.index}-strong`} className="font-semibold text-neutral-950">
          {match[2]}
        </strong>,
      );
    } else if (match[3] && match[4]) {
      nodes.push(
        <a
          key={`${match.index}-link`}
          href={match[4]}
          className="font-semibold text-sky-800 underline decoration-sky-200 underline-offset-4 hover:text-sky-950"
        >
          {match[3]}
        </a>,
      );
    } else if (match[5]) {
      nodes.push(
        <code
          key={`${match.index}-code`}
          className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm text-neutral-900"
        >
          {match[5]}
        </code>,
      );
    }

    cursor = match.index + match[0].length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split(/\r?\n/);
  const elements: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={index} className="mt-10 text-2xl font-semibold tracking-tight text-neutral-950">
          {renderInline(line.replace("### ", ""))}
        </h3>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={index} className="mt-12 text-3xl font-semibold tracking-tight text-neutral-950">
          {renderInline(line.replace("## ", ""))}
        </h2>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];

      while (lines[index]?.startsWith("> ")) {
        quoteLines.push(lines[index].replace("> ", ""));
        index += 1;
      }

      elements.push(
        <blockquote
          key={index}
          className="my-8 border-l-4 border-sky-700 bg-sky-50 px-5 py-4 text-lg font-medium leading-8 text-neutral-900"
        >
          {renderInline(quoteLines.join(" "))}
        </blockquote>,
      );
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];

      while (lines[index]?.startsWith("- ")) {
        items.push(lines[index].replace("- ", ""));
        index += 1;
      }

      elements.push(
        <ul key={index} className="my-6 grid gap-3 pl-5 text-neutral-700">
          {items.map((item) => (
            <li key={item} className="list-disc leading-7">
              {renderInline(item)}
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    const paragraphLines: string[] = [];

    while (
      lines[index]?.trim() &&
      !lines[index].startsWith("## ") &&
      !lines[index].startsWith("### ") &&
      !lines[index].startsWith("> ") &&
      !lines[index].startsWith("- ")
    ) {
      paragraphLines.push(lines[index]);
      index += 1;
    }

    elements.push(
      <p key={index} className="mt-6 text-lg leading-8 text-neutral-700">
        {renderInline(paragraphLines.join(" "))}
      </p>,
    );
  }

  return <div>{elements}</div>;
}
