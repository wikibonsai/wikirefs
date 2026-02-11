import { getEscIndices, isStrEscaped } from 'escape-mkdn';


export interface Opts {
  escape?: boolean;     // if true, ignore escaped matches
  pad?: boolean;        // if true, replace regardless of padded whitespace
}

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

export function replace(
  regex: RegExp,
  oldStr: string,
  newStr: string,
  content: string,
  opts?: Opts,
): string {
  /* eslint-disable indent */
  const defaults: Opts = {
                            escape: true,
                            pad: false,
                          };
  /* eslint-enable indent */
  opts = { ...defaults, ...opts, };
  // 🦨 do-while: https://stackoverflow.com/a/6323598
  let match: RegExpExecArray | null;
  let lastOffset: number = 0;
  let updatedContent: string = '';
  const escdIndices: number[] = opts.escape ? getEscIndices(content) : [];
  do {
    match = regex.exec(content);
    if (match) {
      const matchFull: string = match[0];
      const matchOldStr: string = opts.pad ? match[1].trim() : match[1];
      if (matchOldStr === oldStr) {
        const fnameOffset: number = matchFull.indexOf(oldStr);
        // filename range
        const start: number = (match.index + fnameOffset);
        const end: number = (match.index + fnameOffset + oldStr.length);
        // check for escapes
        /* eslint-disable indent */
        const escaped: boolean = isStrEscaped(
                                              oldStr, content,
                                              fnameOffset, escdIndices,
                                            );
        /* eslint-enable indent */
        if (!escaped) {
          updatedContent += content.substring(lastOffset, start)
                          + newStr;
          lastOffset = end;
        }
      }
    }
  } while (match);
  updatedContent += content.substring(lastOffset);
  return updatedContent;
}