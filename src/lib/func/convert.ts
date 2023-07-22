import { scan } from './scan';
import { CONST } from '../var/const';
import { buildURI, extractFileName } from '../../util/uri';
import { isValidUriFormat, isValidWikiKind } from '../../util/valid';


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

export function mkdnToWiki(content: string, opts?: ConvertOpts): string | undefined {
  // opts
  const kind  : string = (opts?.kind   && isValidWikiKind(opts.kind))     ? opts.kind   : CONST.WIKI.REF;
  const format: string = (opts?.format && isValidUriFormat(opts.format)) ? opts.format : CONST.URI.FNAME;
  const uriToFnameHash: Record<string, string> = opts?.uriToFnameHash ?? {};
  // links (includes attrs)
  if ((kind === CONST.WIKI.REF) || (kind === CONST.WIKI.LINK)) {
    content = content.replace(RGX_MKDN_LINK, (match: string, label: string, uri: string) => {
      /* eslint-disable indent */
      const filename: string | undefined = Object.keys(uriToFnameHash).includes(uri)
                                            ? uriToFnameHash[uri]
                                            : extractFileName(uri, format);
      /* eslint-disable indent */
      if (filename !== undefined) {
        // unlabelled
        if (label === filename) {
          return CONST.MARKER.OPEN
                + filename
                + CONST.MARKER.CLOSE;
        // labelled
        } else {
          return CONST.MARKER.OPEN
                + filename
                + CONST.MARKER.LABEL
                + label
                + CONST.MARKER.CLOSE;
        }
      }
      // simply put back if unable to determine wiki-equivalent
      return `[${label}](${uri})`;
    });
  }
  // embeds
  if ((kind === CONST.WIKI.REF) || (kind === CONST.WIKI.EMBED)) {
    content = content.replace(RGX_MKDN_IMAGE, (match: string, label: string, uri: string) => {
      const filename: string | undefined = extractFileName(uri, format);
      if (filename) {
        return CONST.MARKER.EMBED
              + CONST.MARKER.OPEN
              + filename
              + CONST.MARKER.CLOSE;
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
      // unlabelled
      if (m.label.length === 0) {
        mkdnContent += `[${m.filename[0]}](${uri})`;
        curPos = m.start + m.text.length;
      // labelled
      } else {
        mkdnContent += `[${m.label[0]}](${uri})`;
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
        mkdnContent += `![](${uri})`;
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
        mkdnContent += `[${m.filename[0]}](${uri})`;
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
