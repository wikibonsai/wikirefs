import { getEscIndices, isStrEscaped } from 'escape-mkdn';

import { CONST } from '../var/const';
import { RGX, WikiAttrMatch } from '../var/regex';
import { getMediaKind } from './media';


export interface ScanOpts {
  filename?: string;
  kind?: string;
  skipEsc?: boolean;
}

export interface ScanResult {
  kind: string;
  text: string;
  start: number;
}

export interface WikiAttrResult extends ScanResult {
  type: [string, number] | [];
  filenames: [string, number][];
  listFormat: string; // 'mkdn' or 'comma'
}

export interface WikiLinkResult extends ScanResult {
  type: [string, number] | [];
  filename: [string, number];
  header: [string, number] | [];
  label: [string, number] | [];
}

export interface WikiEmbedResult extends ScanResult {
  filename: [string, number];
  media: string;
  header: string;
}

export function scan(content: string, opts?: ScanOpts): (WikiAttrResult | WikiLinkResult | WikiEmbedResult)[] {
  const res: (WikiAttrResult | WikiLinkResult | WikiEmbedResult)[] = [];
  // opts
  const kind     : string | undefined  = opts ? opts.kind     : undefined;
  const filename : string | undefined  = opts ? opts.filename : undefined;
  const skipEsc  : boolean | undefined = opts ? opts.skipEsc  : true;
  const escdIndices: number[] = getEscIndices(content);
  // go
  // attr //
  const attrMatches: WikiAttrMatch[] = RGX.WIKI.ATTR(content);
  for (const am of attrMatches) {
    // filter filenames by opts
    const filenames: [string, number][] = [];
    for (const [fnameText, fnameOffset] of am.filenames) {
      if (!filename || (filename === fnameText)) {
        const isMkdnList: boolean = am.listFormat === 'mkdn';
        const escaped: boolean = isStrEscaped(
          fnameText, content, fnameOffset, escdIndices,
        ) && !isMkdnList;
        if (!kind || (kind === CONST.WIKI.REF) || (kind === CONST.WIKI.ATTR)
          && (skipEsc || !escaped)
        ) {
          filenames.push([fnameText, fnameOffset]);
        }
      }
    }
    const [trimmedAttrTypeText, attrtypeOffset] = am.type;
    const escaped: boolean = isStrEscaped(
      trimmedAttrTypeText, content, attrtypeOffset, escdIndices,
    );
    if ((!kind || (kind === CONST.WIKI.REF) || (kind === CONST.WIKI.ATTR))
        && (filenames.length !== 0)
        && (skipEsc || !escaped)
    ) {
      res.push({
        kind: CONST.WIKI.ATTR,
        text: am.text,
        start: am.start,
        type: am.type,
        filenames: filenames,
        listFormat: am.listFormat,
      });
    }
  }
  // note: consume processed wikiattrs so they are
  //       not mistaken for inlines in next section
  for (const am of attrMatches) {
    content = content.replace(am.text, (match) => {
    // pad with whitespace so positions don't get screwed up
      return ' '.repeat(match.length);
    });
  }
  // embed //
  if (!kind || (kind === CONST.WIKI.REF) || (kind === CONST.WIKI.EMBED)) {
    const embedsGottaCatchEmAll: RegExp = new RegExp(RGX.WIKI.EMBED, 'g');
    // 🦨 do-while: https://stackoverflow.com/a/6323598
    let embedMatch: RegExpExecArray | null;
    do {
      embedMatch = embedsGottaCatchEmAll.exec(content);
      if (embedMatch) {
        const matchText      : string = embedMatch[0];
        const fileNameText   : string = embedMatch[1];
        const headerText     : string | undefined = embedMatch[2];

        const wikilinkOffset = embedMatch.index;
        const filenameOffset = matchText.indexOf(fileNameText);
        if (!filename || (filename === fileNameText)) {
          /* eslint-disable indent */
          const escaped: boolean = isStrEscaped(
                                                  matchText, content,
                                                  wikilinkOffset, escdIndices,
                                                );
          /* eslint-enable indent */
          if (skipEsc || !escaped) {
            res.push({
              kind: CONST.WIKI.EMBED,
              text: matchText,
              start: embedMatch.index,
              filename: [fileNameText, wikilinkOffset + filenameOffset],
              media: getMediaKind(fileNameText),
              header: headerText !== undefined ? headerText : '',
            });
          }
        }
      }
    } while (embedMatch);
  }
  // link //
  if (!kind || (kind === CONST.WIKI.REF) || (kind === CONST.WIKI.LINK)) {
    const linksGottaCatchEmAll: RegExp = new RegExp(RGX.WIKI.LINK, 'g');
    // 🦨 do-while: https://stackoverflow.com/a/6323598
    let linkMatch: RegExpExecArray | null;
    do {
      linkMatch = linksGottaCatchEmAll.exec(content);
      if (linkMatch) {
        const matchText      : string = linkMatch[0];
        const linkTypeText   : string = linkMatch[1];
        const fileNameText   : string = linkMatch[2];
        const headerText     : string = linkMatch[3];
        const labelText      : string = linkMatch[4];

        const wikilinkOffset = linkMatch.index;
        const linkTypeOffset = matchText.indexOf(linkTypeText);
        const filenameOffset = matchText.indexOf(fileNameText);
        const headerOffset   = (headerText !== undefined) ? 
          (headerText === '' ? matchText.indexOf('#') + 1 : matchText.indexOf(headerText)) : -1;
        const labelOffset    = matchText.indexOf(labelText);
        if (!filename || (filename === fileNameText)) {
          /* eslint-disable indent */
          const escaped: boolean = isStrEscaped(
                                                  matchText, content,
                                                  wikilinkOffset, escdIndices,
                                                );
          /* eslint-enable indent */
          if (skipEsc || !escaped) {
            const type  : [string, number] | [] = (linkTypeText) ? [linkTypeText.trim(), linkMatch.index + linkTypeOffset] : [];
            const header: [string, number] | [] = (headerText !== undefined) ? [headerText, linkMatch.index + headerOffset] : [];
            const label : [string, number] | [] = (labelText)    ? [labelText, linkMatch.index + labelOffset]            : [];
            res.push({
              kind: CONST.WIKI.LINK,
              text: matchText,
              start: linkMatch.index,
              type: type,
              filename: [fileNameText, wikilinkOffset + filenameOffset],
              header: header,
              label: label,
            });
          }
        }
      }
    } while (linkMatch);
  }
  // sort matches by start position
  return res.sort((a, b) => a.start - b.start);
}
