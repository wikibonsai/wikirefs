import { getEscIndices, isStrEscaped } from 'escape-mkdn';

import { CONST } from '../var/const';
import { RGX } from '../var/regex';
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
  label: [string, number] | [];
}

export interface WikiEmbedResult extends ScanResult {
  filename: [string, number];
  media: string;
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
  const fullTxtAttrs: string[] = [];
  let attrMatch, fnameMatch: RegExpExecArray | null;
  const attrsGottaCatchEmAll: RegExp = new RegExp(RGX.WIKI.ATTR, 'gim');
  const singlesGottaCatchEmAll: RegExp = new RegExp(RGX.WIKI.BASE, 'gim');
  // 🦨 do-while: https://stackoverflow.com/a/6323598
  do {
    attrMatch = attrsGottaCatchEmAll.exec(content);
    if (attrMatch) {
      fullTxtAttrs.push(attrMatch[0]);
      const matchText: string = attrMatch[0];
      const attrtypeText: string = attrMatch[1];
      // files
      const filenames: [string, number][] = [];
      do {
        fnameMatch = singlesGottaCatchEmAll.exec(matchText);
        if (fnameMatch) {
          const twoLeftBrackets = 2;
          const filenameText: string = fnameMatch[1];
          const filenameOffset = attrMatch.index + twoLeftBrackets + fnameMatch.index;
          if (!filename || (filename === filenameText)) {
            /* eslint-disable indent */
            // override indented code blocks for wikiattr-lists-mkdn-pretty
            const noEscLists: boolean = /:: *\n *- /.test(matchText);
            const escaped: boolean = isStrEscaped(
                                                    filenameText, content,
                                                    filenameOffset, escdIndices,
                                                  ) && !noEscLists;
            /* eslint-enable indent */
            if (!kind || (kind === CONST.WIKI.REF) || (kind === CONST.WIKI.ATTR)
              && (skipEsc || !escaped)
            ) {
              filenames.push([filenameText, filenameOffset]);
            }
          }
        }
      } while (fnameMatch);
      const attrtypeOffset: number = attrMatch.index + matchText.indexOf(attrtypeText);
      const trimmedAttrTypeText: string = attrtypeText.trim();
      let listFormat: string = 'none';
      // single case
      if (filenames.length === 1) {
        listFormat = 'none';
      }
      if (/\n *- /.test(matchText)) {
        listFormat = 'mkdn';
      }
      if (/ *, */.test(matchText)) {
        listFormat = 'comma';
      }
      /* eslint-disable indent */
      const escaped: boolean = isStrEscaped(
                                              trimmedAttrTypeText, content,
                                              attrtypeOffset, escdIndices,
                                            );
      /* eslint-enable indent */
      if ((!kind || (kind === CONST.WIKI.REF) || (kind === CONST.WIKI.ATTR))
          && (filenames.length !== 0)
          && (skipEsc || !escaped)
      ) {
        res.push({
          kind: CONST.WIKI.ATTR,
          text: matchText,
          start: attrMatch.index,
          type: [trimmedAttrTypeText, attrtypeOffset],
          filenames: filenames,
          listFormat: listFormat,
        });
      }
    }
  } while (attrMatch);
  // note: consume processed wikiattrs so they are
  //       not mistaken for inlines in next section
  for (const txt of fullTxtAttrs) {
    content = content.replace(txt, (match) => {
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
        // const headerText     : string = linkMatch[4];
        const labelText      : string = linkMatch[3];

        const wikilinkOffset = linkMatch.index;
        const linkTypeOffset = matchText.indexOf(linkTypeText);
        const filenameOffset = matchText.indexOf(fileNameText);
        const labelOffset    = matchText.indexOf(labelText);
        if (!filename || (filename === fileNameText)) {
          /* eslint-disable indent */
          const escaped: boolean = isStrEscaped(
                                                  matchText, content,
                                                  wikilinkOffset, escdIndices,
                                                );
          /* eslint-enable indent */
          if (skipEsc || !escaped) {
            const type : [string, number] | [] = (linkTypeText) ? [linkTypeText.trim(), linkMatch.index + linkTypeOffset] : [];
            const label: [string, number] | [] = (labelText)    ? [labelText, linkMatch.index + labelOffset]              : [];
            res.push({
              kind: CONST.WIKI.LINK,
              text: matchText,
              start: linkMatch.index,
              type: type,
              filename: [fileNameText, wikilinkOffset + filenameOffset],
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
