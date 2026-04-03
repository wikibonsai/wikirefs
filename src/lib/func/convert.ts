import { scan } from './scan';
import { CONST } from '../var/const';
import { RGX } from '../var/regex';
import { buildURI, extractFileName } from '../../util/uri';
import { isValidUriFormat, isValidWikiKind } from '../../util/valid';
import { slugify } from '../util';


// todo:
// - handle 'wikiattr' individually
// - ignore escaped links?

export interface ConvertOpts {
  kind?: 'wikiref' | 'wikilink' | 'wikiembed';   // CONST.WIKI...
  format?: 'filename' | 'relative' | 'absolute'; // CONST.URL...
  ext?: boolean;
  fnameToUriHash?: Record<string, string>;
  uriToFnameHash?: Record<string, string>;
}

/** Decode percent-encoded fragment; returns raw string on malformed input (e.g. `%ZZ`). */
function decodeURI_safe(fragment: string): string {
  try { return decodeURIComponent(fragment); }
  catch { return fragment; }
}

/**
 * Remove pointless wikilink labels: empty `|`, or `|target` when label duplicates the target
 * (including `[[file#header|file#header]]`). Applies to `[[...]]` and `![[...]]`.
 */
export function stripEmptyWikiLinkLabels(content: string): string {
  const stripInner = (target: string, label: string): string | null => {
    if (label === '' || label === target) {
      return CONST.MARKER.OPEN + target + CONST.MARKER.CLOSE;
    }
    return null;
  };
  let out: string = content;
  out = out.replace(/!\[\[([^\|\]]+)\|([^\]]*)\]\]/g, (m, target, label) => {
    const inner: string | null = stripInner(target, label);
    return inner !== null ? CONST.MARKER.EMBED + inner : m;
  });
  out = out.replace(/(?<!!)\[\[([^\|\]]+)\|([^\]]*)\]\]/g, (m, target, label) => {
    const inner: string | null = stripInner(target, label);
    return inner !== null ? inner : m;
  });
  return out;
}

export function mkdnToWiki(content: string, opts?: ConvertOpts): string | undefined {
  // opts
  const kind  : string = (opts?.kind   && isValidWikiKind(opts.kind))     ? opts.kind   : CONST.WIKI.REF;
  const format: string = (opts?.format && isValidUriFormat(opts.format)) ? opts.format : CONST.URI.FNAME;
  const uriToFnameHash: Record<string, string> = opts?.uriToFnameHash ?? {};
  // links (includes attrs)
  if ((kind === CONST.WIKI.REF) || (kind === CONST.WIKI.LINK)) {
    content = content.replace(RGX._MKDN.LINK, (match: string, label: string, uri: string) => {
      // extract header if present
      let header: string = '';
      let cleanUri: string = uri;
      const hashIndex = uri.indexOf('#');
      if (hashIndex !== -1) {
        header = decodeURI_safe(uri.substring(hashIndex + 1));
        cleanUri = uri.substring(0, hashIndex);
      }
      /* eslint-disable indent */
      const filename: string | undefined = Object.keys(uriToFnameHash).includes(cleanUri)
                                            ? uriToFnameHash[cleanUri]
                                            : extractFileName(cleanUri, format);
      /* eslint-disable indent */
      if (filename !== undefined) {
        const wikiBase = CONST.MARKER.OPEN + filename + (header ? CONST.MARKER.HEADER + header : '');
        const wikiTarget: string = filename + (header ? CONST.MARKER.HEADER + header : '');
        if (label === '' || label === filename || label === wikiTarget) {
          return wikiBase + CONST.MARKER.CLOSE;
        }
        return wikiBase
              + CONST.MARKER.LABEL
              + label
              + CONST.MARKER.CLOSE;
      }
      // simply put back if unable to determine wiki-equivalent
      return `[${label}](${uri})`;
    });
  }
  // embeds
  if ((kind === CONST.WIKI.REF) || (kind === CONST.WIKI.EMBED)) {
    content = content.replace(RGX._MKDN.IMAGE, (match: string, label: string, uri: string) => {
      let header: string = '';
      let cleanUri: string = uri;
      const hashIndex = uri.indexOf('#');
      if (hashIndex !== -1) {
        header = decodeURI_safe(uri.substring(hashIndex + 1));
        cleanUri = uri.substring(0, hashIndex);
      }
      const filename: string | undefined = extractFileName(cleanUri, format);
      if (filename) {
        const wikiBase = CONST.MARKER.EMBED
              + CONST.MARKER.OPEN
              + filename
              + (header ? CONST.MARKER.HEADER + header : '');
        return wikiBase + CONST.MARKER.CLOSE;
      }
      // simply put back if unable to determine wiki-equivalent
      return `![${label}](${uri})`;
    });
  }
  return content;
}

export function wikiToMkdn(content: string, opts?: ConvertOpts): string | undefined {
  // opts
  const kind  : string  = (opts?.kind   && isValidWikiKind(opts.kind))    ? opts.kind   : CONST.WIKI.REF;
  const format: string  = (opts?.format && isValidUriFormat(opts.format)) ? opts.format : CONST.URI.FNAME;
  const ext   : boolean = opts?.ext                                       ? opts.ext    : false;
  const fnameToUriHash: Record<string, string> = opts?.fnameToUriHash ?? {};
  // vars
  let mkdnContent: string = '';
  let curPos: number = 0;
  const { wikirefs } = scan(content);
  for (const m of wikirefs) {
    let linkedFileUri: string;
    // process non-wikiref text
    mkdnContent += content.substring(curPos, m.start);
    curPos = m.start;
    ////
    // attr
    if ((m.kind === 'wikiattr')
      && ((kind === CONST.WIKI.REF) || (kind === CONST.WIKI.ATTR)
        || (kind === CONST.WIKI.LINK)) // todo: remove
    ) {
      for (let fi = 0; fi < m.filenames.length; fi++) {
        const fname: { text: string; start: number } = m.filenames[fi];
        // wikiattrs encode header fragments inside the "filename" capture (e.g. `[[file#Header Text]]`)
        // but markdown links expect the label to be just the filename, with header in the URI fragment.
        const rawTarget: string = fname.text;
        const hashIndex: number = rawTarget.indexOf('#');
        const baseName: string = hashIndex === -1 ? rawTarget : rawTarget.substring(0, hashIndex);
        const headerText: string = hashIndex === -1 ? '' : rawTarget.substring(hashIndex + 1);
        /* eslint-disable indent */
        linkedFileUri = Object.keys(fnameToUriHash).includes(baseName)
                          ? fnameToUriHash[baseName]
                          : '/' + baseName + CONST.EXTS.MD;
        /* eslint-enable indent */
        const uri: string | undefined = buildURI(linkedFileUri, format, ext);
        if (uri === undefined) {
          console.warn('invalid uri from file uri: ', linkedFileUri);
          continue;
        }
        const fullUri: string = headerText ? `${uri}#${slugify(headerText)}` : uri;
        const isFirstItem: boolean = (fi === 0);
        const isNotLastItem: boolean = (fi < m.filenames.length - 1);
        let suffix: string = '';
        if (isNotLastItem) {
          if (m.listFormat === 'comma') {
            // todo: extract precise number of whitespaces
            suffix = ', ';
          }
          if (m.listFormat === 'mkdn') {
            suffix = '\n- ';
          }
        } else {
          suffix = '\n';
        }
        if (isFirstItem) {
          mkdnContent += content.substring(curPos, fname.start - CONST.MARKER.OPEN.length);
        }
        mkdnContent += `[${baseName}](${fullUri})` + suffix;
      }
      curPos = m.start + m.match.length;
    ////
    // link
    } else if ((m.kind === 'wikilink')
      && ((kind === CONST.WIKI.REF) || (kind === CONST.WIKI.LINK))
    ) {
      /* eslint-disable indent */
      linkedFileUri = Object.keys(fnameToUriHash).includes(m.filename.text)
                        ? fnameToUriHash[m.filename.text]
                        : '/' + m.filename.text + CONST.EXTS.MD;
      /* eslint-enable indent */
      const uri: string | undefined = buildURI(linkedFileUri, format, ext);
      if (uri === undefined) {
        console.warn('invalid uri from file uri: ', linkedFileUri);
        continue;
      }
      // append header if present
      // - wikiattrs on attr lines: slugify fragment (e.g. `#header-text`)
      // - ordinary wikilinks: percent-encode fragment so spaces etc. are valid in the URI
      //   (e.g. `#Header%20Text`; round-trips with mkdnToWiki's decodeURI_safe).
      const lineStart: number = content.lastIndexOf('\n', m.start - 1) + 1;
      const lineEnd: number = content.indexOf('\n', m.start);
      const lineText: string = content.substring(lineStart, lineEnd === -1 ? content.length : lineEnd);
      const isAttrLine: boolean = /^\s*:/.test(lineText) && lineText.includes('::');
      const headerFrag: string | null = m.header
        ? (isAttrLine ? slugify(m.header.text) : encodeURIComponent(m.header.text))
        : null;
      const fullUri: string = headerFrag ? `${uri}#${headerFrag}` : uri;
      const linktype: string = m.type
      // todo: read from trug to see if colon prefix is default format
        ? CONST.MARKER.PREFIX + m.type.text + CONST.MARKER.TYPE + ' '
        : '';
      // unlabelled
      const hasExplicitLabelPipe: boolean = m.match.includes(CONST.MARKER.LABEL);
      if (!m.label && !hasExplicitLabelPipe) {
        mkdnContent += linktype + `[${m.filename.text}](${fullUri})`;
        curPos = m.start + m.match.length;
      // labelled
      } else {
        const labelText: string = m.label ? m.label.text : '';
        mkdnContent += linktype + `[${labelText}](${fullUri})`;
        curPos = m.start + m.match.length;
      }
    ////
    // embed
    // convert to markdown img link -- img
    } else if ((m.kind === 'wikiembed')
      && ((kind === CONST.WIKI.REF) || (kind === CONST.WIKI.EMBED))
    ) {
      const headerTxt: string | undefined = m.header?.text;
      // image embed
      if (m.media === CONST.MEDIA.IMG) {
        /* eslint-disable indent */
        linkedFileUri = Object.keys(fnameToUriHash).includes(m.filename.text)
                          ? fnameToUriHash[m.filename.text]
                          : '/' + m.filename.text;
        /* eslint-enable indent */
        const INCLUDE_IMG_EXT: boolean = true;
        const uri: string | undefined = buildURI(linkedFileUri, format, INCLUDE_IMG_EXT);
        if (uri === undefined) {
          console.warn('invalid uri from file uri: ', linkedFileUri);
          continue;
        }
        const fullUri: string = headerTxt ? `${uri}#${slugify(headerTxt)}` : uri;
        mkdnContent += `![](${fullUri})`;
        curPos = m.start + m.match.length;
      // convert to markdown link -- markdown, audio, video
      } else if ((m.media === CONST.MEDIA.MD)
              || (m.media === CONST.MEDIA.AUD)
              || (m.media === CONST.MEDIA.VID)) {
        /* eslint-disable indent */
        linkedFileUri = Object.keys(fnameToUriHash).includes(m.filename.text)
                          ? fnameToUriHash[m.filename.text]
                          : '/' + m.filename.text;
        /* eslint-enable indent */
        const INCLUDE_MEDIA_EXT: boolean = (m.media === CONST.MEDIA.AUD) || (m.media === CONST.MEDIA.VID);
        const uri: string | undefined = buildURI(linkedFileUri, format, INCLUDE_MEDIA_EXT || ext);
        if (uri === undefined) {
          console.warn('invalid uri from file uri: ', linkedFileUri);
          continue;
        }
        const fullUri: string = headerTxt ? `${uri}#${slugify(headerTxt)}` : uri;
        mkdnContent += `[${m.filename.text}](${fullUri})`;
        curPos = m.start + m.match.length;
      }
    // just add the match back since we are not processing it
    } else {
      mkdnContent += m.match;
      curPos = m.start + m.match.length;
    }
  }
  // add remaining content
  mkdnContent += content.substring(curPos);
  // if no links were found, return original content
  return (mkdnContent.length === 0) ? content : mkdnContent;
}
