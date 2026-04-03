import { getEscIndices, isStrEscaped } from 'escape-mkdn';

import { CONST } from '../var/const';
import { RGX, MatchAttr } from '../var/regex';
import { getMediaKind } from './media';


// types

export interface ScanOpts {
  filename?: string;
  kind?: string;
  skipEsc?: boolean;
}

export interface ScanTxt {
  text: string;
  start: number;
}

// wikirefs (grouped constructs)

export interface ScanAttr {
  kind: 'wikiattr';
  match: string;
  start: number;
  type: ScanTxt;
  filenames: ScanTxt[];
  listFormat: 'comma' | 'mkdn' | 'none';
}

export interface ScanLink {
  kind: 'wikilink';
  match: string;
  start: number;
  type?: ScanTxt;
  filename: ScanTxt;
  header?: ScanTxt;
  label?: ScanTxt;
}

export interface ScanEmbed {
  kind: 'wikiembed';
  match: string;
  start: number;
  filename: ScanTxt;
  header?: ScanTxt;
  media: string;
}

export type ScanRef = ScanAttr | ScanLink | ScanEmbed;

// filenames (flat)

export interface ScannedFileName {
  filename: ScanTxt;
  kind: 'wikiattr' | 'wikilink' | 'wikiembed';
  type?: ScanTxt;
  header?: ScanTxt;
  label?: ScanTxt;
  media?: string;
  listFormat?: 'comma' | 'mkdn' | 'none';
}

// scan result

export interface ScanResult {
  wikirefs: ScanRef[];
  filenames: ScannedFileName[];
}

// scan

export function scan(content: string, opts?: ScanOpts): ScanResult {
  const wikirefs: ScanRef[] = [];
  // opts
  const kind     : string | undefined  = opts ? opts.kind     : undefined;
  const filename : string | undefined  = opts ? opts.filename : undefined;
  const skipEsc  : boolean | undefined = opts ? opts.skipEsc  : true;
  const escdIndices: number[] = getEscIndices(content);
  // go
  // attr //
  const attrMatches: MatchAttr[] = RGX.WIKI.ATTR(content);
  for (const am of attrMatches) {
    // filter filenames by opts
    const filenames: ScanTxt[] = [];
    for (const [fnameText, fnameOffset] of am.filenames) {
      if (!filename || (filename === fnameText)) {
        const isMkdnList: boolean = am.listFormat === 'mkdn';
        const escaped: boolean = isStrEscaped(
          fnameText, content, fnameOffset, escdIndices,
        ) && !isMkdnList;
        if (!kind || (kind === CONST.WIKI.REF) || (kind === CONST.WIKI.ATTR)
          && (skipEsc || !escaped)
        ) {
          filenames.push({ text: fnameText, start: fnameOffset });
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
      wikirefs.push({
        kind: 'wikiattr',
        match: am.text,
        start: am.start,
        type: { text: trimmedAttrTypeText, start: attrtypeOffset },
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
          const escaped: boolean = isStrEscaped(
            matchText, content, wikilinkOffset, escdIndices,
          );
          if (skipEsc || !escaped) {
            const headerStart: number = matchText.indexOf('#') + 1;
            const embed: ScanEmbed = {
              kind: 'wikiembed',
              match: matchText,
              start: embedMatch.index,
              filename: { text: fileNameText, start: wikilinkOffset + filenameOffset },
              media: getMediaKind(fileNameText),
            };
            if (headerText !== undefined) {
              embed.header = { text: headerText, start: embedMatch.index + headerStart };
            }
            wikirefs.push(embed);
          }
        }
      }
    } while (embedMatch);
  }
  // link //
  if (!kind || (kind === CONST.WIKI.REF) || (kind === CONST.WIKI.LINK)) {
    const linksGottaCatchEmAll: RegExp = new RegExp(RGX.WIKI.LINK, 'g');
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
          const escaped: boolean = isStrEscaped(
            matchText, content, wikilinkOffset, escdIndices,
          );
          if (skipEsc || !escaped) {
            const link: ScanLink = {
              kind: 'wikilink',
              match: matchText,
              start: linkMatch.index,
              filename: { text: fileNameText, start: wikilinkOffset + filenameOffset },
            };
            if (linkTypeText) {
              link.type = { text: linkTypeText.trim(), start: linkMatch.index + linkTypeOffset };
            }
            if (headerText !== undefined) {
              link.header = { text: headerText, start: linkMatch.index + headerOffset };
            }
            if (labelText) {
              link.label = { text: labelText, start: linkMatch.index + labelOffset };
            }
            wikirefs.push(link);
          }
        }
      }
    } while (linkMatch);
  }
  // sort matches by start position
  wikirefs.sort((a, b) => a.start - b.start);
  // build flat filenames list from wikirefs
  const filenames: ScannedFileName[] = [];
  for (const ref of wikirefs) {
    if (ref.kind === 'wikiattr') {
      for (const fname of ref.filenames) {
        const entry: ScannedFileName = {
          filename: fname,
          kind: 'wikiattr',
          type: ref.type,
          listFormat: ref.listFormat,
        };
        filenames.push(entry);
      }
    } else if (ref.kind === 'wikilink') {
      const entry: ScannedFileName = {
        filename: ref.filename,
        kind: 'wikilink',
      };
      if (ref.type) entry.type = ref.type;
      if (ref.header) entry.header = ref.header;
      if (ref.label) entry.label = ref.label;
      filenames.push(entry);
    } else if (ref.kind === 'wikiembed') {
      const entry: ScannedFileName = {
        filename: ref.filename,
        kind: 'wikiembed',
        media: ref.media,
      };
      if (ref.header) entry.header = ref.header;
      filenames.push(entry);
    }
  }
  return { wikirefs, filenames };
}
