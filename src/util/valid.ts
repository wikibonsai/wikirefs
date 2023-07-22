import { CONST } from '../lib/var/const';


// note: (atm, attrs are implicitly included in 'link' option)
export function isValidWikiKind(kind: string): boolean {
  const isValid: boolean = (kind === CONST.WIKI.REF)
                        // || (kind === CONST.WIKI.ATTR) todo
                        || (kind === CONST.WIKI.LINK)
                        || (kind === CONST.WIKI.EMBED);
  if (!isValid) { console.warn('invalid kind: ' + '"' + kind + '"' + '; ' + 'using default instead: "wikiref"'); }
  return isValid;
}

export function isValidUriFormat(format: string): boolean {
  const isValid: boolean = (format === CONST.URI.FNAME)
                        || (format === CONST.URI.RELPATH)
                        || (format === CONST.URI.ABSPATH);
  if (!isValid) { console.warn('invalid uri format: ' + '"' + format + '"' + '; ' + 'using default instead: "filename"'); }
  return isValid;
}
