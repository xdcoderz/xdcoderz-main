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
      nodes.push(<strong key={`${match.index}-strong`}>{match[2]}</strong>);
    } else if (match[3] && match[4]) {
      nodes.push(
        <a key={`${match.index}-link`} href={match[4]}>
          {match[3]}
        </a>,
      );
    } else if (match[5]) {
      nodes.push(<code key={`${match.index}-code`}>{match[5]}</code>);
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
        <h3 key={index}>{renderInline(line.replace("### ", ""))}</h3>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={index}>{renderInline(line.replace("## ", ""))}</h2>,
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
        <blockquote key={index}>
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
        <ul key={index}>
          {items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
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
      <p key={index}>{renderInline(paragraphLines.join(" "))}</p>,
    );
  }

  return <div className="article-prose">{elements}</div>;
}
