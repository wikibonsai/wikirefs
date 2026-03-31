import { scan } from './scan';
import { CONST } from '../var/const';
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

export const RGX_MKDN_LINK: RegExp = /(?<!!)\[(^$|.*?)\]\((.*?)\)/gi;
export const RGX_MKDN_IMAGE: RegExp = /!\[(.*?)]\((.*?)\)/gi;

function decodeUriFragment(fragment: string): string {
  try {
    return decodeURIComponent(fragment);
  } catch {
    return fragment;
  }
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
    content = content.replace(RGX_MKDN_LINK, (match: string, label: string, uri: string) => {
      // extract header if present
      let header: string = '';
      let cleanUri: string = uri;
      const hashIndex = uri.indexOf('#');
      if (hashIndex !== -1) {
        header = decodeUriFragment(uri.substring(hashIndex + 1));
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
    content = content.replace(RGX_MKDN_IMAGE, (match: string, label: string, uri: string) => {
      let header: string = '';
      let cleanUri: string = uri;
      const hashIndex = uri.indexOf('#');
      if (hashIndex !== -1) {
        header = decodeUriFragment(uri.substring(hashIndex + 1));
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
  const matches: any = scan(content);
  for (const m of matches) {
    let linkedFileUri: string;
    // process non-wikiref text
    mkdnContent += content.substring(curPos, m.start);
    curPos = m.start;
    ////
    // attr
    if ((m.kind === CONST.WIKI.ATTR)
      && ((kind === CONST.WIKI.REF) || (kind === CONST.WIKI.ATTR)
        || (kind === CONST.WIKI.LINK)) // todo: remove
    ) {
      for (const filename of m.filenames) {
        /* eslint-disable indent */
        linkedFileUri = Object.keys(fnameToUriHash).includes(filename[0])
                          ? fnameToUriHash[filename[0]]
                          : '/' + filename[0] + CONST.EXTS.MD;
        /* eslint-enable indent */
        const uri: string | undefined = buildURI(linkedFileUri, format, ext);
        if (uri === undefined) {
          console.warn('invalid uri from file uri: ', linkedFileUri);
          continue;
        }
        const isFirstItem: boolean = (filename === m.filenames[0]);
        const isNotLastItem: boolean = (filename !== m.filenames[m.filenames.length - 1]);
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
          mkdnContent += content.substring(curPos, filename[1] - CONST.MARKER.OPEN.length);
        }
        mkdnContent += `[${filename[0]}](${uri})` + suffix;
      }
      curPos = m.start + m.text.length;
    ////
    // link
    } else if ((m.kind === CONST.WIKI.LINK)
      && ((kind === CONST.WIKI.REF) || (kind === CONST.WIKI.LINK))
    ) {
      /* eslint-disable indent */
      linkedFileUri = Object.keys(fnameToUriHash).includes(m.filename[0])
                        ? fnameToUriHash[m.filename[0]]
                        : '/' + m.filename[0] + CONST.EXTS.MD;
      /* eslint-enable indent */
      const uri: string | undefined = buildURI(linkedFileUri, format, ext);
      if (uri === undefined) {
        console.warn('invalid uri from file uri: ', linkedFileUri);
        continue;
      }
      // append header if present
      const fullUri: string = m.header && m.header.length > 0 ? `${uri}#${slugify(m.header[0])}` : uri;
      const linktype: string = m.type.length > 0
      // todo: read from trug to see if colon prefix is default format
        ? CONST.MARKER.PREFIX + m.type[0] + CONST.MARKER.TYPE + ' '
        : '';
      // unlabelled
      if (m.label.length === 0) {
        mkdnContent += linktype + `[${m.filename[0]}](${fullUri})`;
        curPos = m.start + m.text.length;
      // labelled
      } else {
        mkdnContent += linktype + `[${m.label[0]}](${fullUri})`;
        curPos = m.start + m.text.length;
      }
    ////
    // embed
    // convert to markdown img link -- img
    } else if ((m.kind === CONST.WIKI.EMBED)
      && ((kind === CONST.WIKI.REF) || (kind === CONST.WIKI.EMBED))
    ) {
      // image embed
      if (m.media === CONST.MEDIA.IMG) {
        /* eslint-disable indent */
        linkedFileUri = Object.keys(fnameToUriHash).includes(m.filename[0])
                          ? fnameToUriHash[m.filename[0]]
                          : '/' + m.filename[0];
        /* eslint-enable indent */
        const INCLUDE_IMG_EXT: boolean = true;
        const uri: string | undefined = buildURI(linkedFileUri, format, INCLUDE_IMG_EXT);
        if (uri === undefined) {
          console.warn('invalid uri from file uri: ', linkedFileUri);
          continue;
        }
        const fullUri: string = m.header ? `${uri}#${slugify(m.header)}` : uri;
        mkdnContent += `![](${fullUri})`;
        curPos = m.start + m.text.length;
      // convert to markdown link -- markdown, audio, video
      } else if ((m.media === CONST.MEDIA.MD)
              || (m.media === CONST.MEDIA.AUD)
              || (m.media === CONST.MEDIA.VID)) {
        /* eslint-disable indent */
        linkedFileUri = Object.keys(fnameToUriHash).includes(m.filename[0])
                          ? fnameToUriHash[m.filename[0]]
                          : '/' + m.filename[0];
        /* eslint-enable indent */
        const uri: string | undefined = buildURI(linkedFileUri, format, ext);
        if (uri === undefined) {
          console.warn('invalid uri from file uri: ', linkedFileUri);
          continue;
        }
        const fullUri: string = m.header ? `${uri}#${slugify(m.header)}` : uri;
        mkdnContent += `[${m.filename[0]}](${fullUri})`;
        curPos = m.start + m.text.length;
      }
    // just add the match back since we are not processing it
    } else {
      mkdnContent += m.text;
      curPos = m.start + m.text.length;
    }
  }
  // add remaining content
  mkdnContent += content.substring(curPos);
  // if no links were found, return original content
  return (mkdnContent.length === 0) ? content : mkdnContent;
}
