import { RGX } from './var/regex';

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, '-')          // Replace spaces with -
    .replace(/[^\w\-]+/g, '')        // Remove all non-word chars
    .replace(/\-\-+/g, '-')          // Replace multiple - with single -
    .replace(/^-+/, '')              // Trim - from start of text
    .replace(/-+$/, '');             // Trim - from end of text
}

interface HeaderMatch {
  level: number;
  text: string;
  start: number; // index of first char of this header line
  end: number;   // index of first char after this header line (incl. newline)
}

function getHeaders(content: string): HeaderMatch[] {
  const headers: HeaderMatch[] = [];
  const lines: string[] = content.split(/\r?\n/);
  let offset: number = 0;
  let prevLineStart: number = 0;
  for (let i = 0; i < lines.length; i++) {
    const line: string = lines[i];
    const lineStart: number = offset;
    const hasNewline: boolean = i < lines.length - 1;
    const lineEnd: number = offset + line.length + (hasNewline ? 1 : 0);
    const atx: RegExpMatchArray | null = RGX._MKDN.ATX_HEADER.exec(line + '\n');
    if (atx) {
      const text: string = atx[1].replace(/\s*#+\s*$/, '').trim(); // trim trailing #
      headers.push({
        level: (atx[0].match(/^#+/) as RegExpMatchArray)[0].length,
        text,
        start: lineStart,
        end: lineEnd,
      });
    } else if (i > 0 && /^[-=][-=]*\s*$/.test(line)) {
      // setext: previous line is header text; = is h1, - is h2
      const prev: string = lines[i - 1].trim();
      if (prev) {
        headers.push({
          level: line.startsWith('=') ? 1 : 2,
          text: prev,
          start: prevLineStart,
          end: lineEnd,
        });
      }
    }
    prevLineStart = lineStart;
    offset = lineEnd;
  }
  return headers;
}

/**
 * Extract the markdown section for a given header, for embed rendering.
 * The section runs from the end of the matching header line until the next
 * header of the same or higher level, or end of content.
 *
 * @param content - Full markdown document
 * @param headerRef - Header identifier: id/slug (e.g. "header-text") or raw text (e.g. "Header Text")
 * @returns The section markdown (after the header line), or undefined if no matching header
 */
export function getHeaderSection(content: string, headerRef: string): string | undefined {
  if (!headerRef || (typeof headerRef !== 'string')) {
    return undefined;
  }
  const refSlug: string = slugify(headerRef);
  const refTrim: string = headerRef.trim();
  const headers: HeaderMatch[] = getHeaders(content);
  const idx = headers.findIndex(
    (h: HeaderMatch) => slugify(h.text) === refSlug || h.text === refTrim,
  );
  if (idx === -1) {
    return undefined;
  }
  const sectionStart: number = headers[idx].end;
  const next: HeaderMatch | undefined = headers.slice(idx + 1).find((h: HeaderMatch) => h.level <= headers[idx].level);
  const sectionEnd: number = next !== undefined ? next.start : content.length;
  return content.slice(sectionStart, sectionEnd).trim();
}
