import { ReactNode } from "react";

/**
 * Parses the small subset of Markdown-like syntax blog authors are told
 * to use in the admin dashboard:
 *   # Heading        -> <h2>
 *   ## Subheading     -> <h3>
 *   - bullet          -> <li> (consecutive lines group into one <ul>)
 *   blank line        -> paragraph break
 *   anything else     -> plain paragraph
 *
 * Intentionally not a full Markdown parser (no inline bold/links/etc) —
 * just enough structure for a home-care blog post to look organized.
 */
export function renderBlogContent(content: string): ReactNode[] {
  if (!content.trim()) return [];

  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let listBuffer: string[] = [];
  let paragraphBuffer: string[] = [];
  let key = 0;

  function flushList() {
    if (listBuffer.length === 0) return;
    blocks.push(
      <ul key={`ul-${key++}`} className="list-disc space-y-1.5 pl-5">
        {listBuffer.map((item, i) => (
          <li key={i} className="text-sm leading-relaxed text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  }

  function flushParagraph() {
    if (paragraphBuffer.length === 0) return;
    blocks.push(
      <p key={`p-${key++}`} className="text-sm leading-relaxed text-gray-700">
        {paragraphBuffer.join(" ")}
      </p>
    );
    paragraphBuffer = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line === "") {
      flushList();
      flushParagraph();
      continue;
    }

    if (line.startsWith("## ")) {
      flushList();
      flushParagraph();
      blocks.push(
        <h3 key={`h3-${key++}`} className="mt-2 text-base font-bold text-brand-navy">
          {line.slice(3)}
        </h3>
      );
      continue;
    }

    if (line.startsWith("# ")) {
      flushList();
      flushParagraph();
      blocks.push(
        <h2 key={`h2-${key++}`} className="mt-3 text-lg font-bold text-brand-navy">
          {line.slice(2)}
        </h2>
      );
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      listBuffer.push(line.slice(2));
      continue;
    }

    flushList();
    paragraphBuffer.push(line);
  }

  flushList();
  flushParagraph();

  return blocks;
}
