import * as string from '../../util/string';
import { RGX } from '../var/regex';


export function renameHeader(
  oldHeader: string,
  newHeader: string,
  content: string,
  opts?: { filename?: string },
): string {
  // Only match #header inside [[...]] or ![[...]] (group 1 = header)
  const linkOrEmbed: string = '(?:' + RGX.MARKER.EMBED.source + ')?'
                              + RGX.MARKER.OPEN.source
                              + '(?:' + RGX.VALID_CHARS.FILENAME.source + ')';
  let headerRegex: RegExp;
  if (opts?.filename) {
    const escapedFname: string = opts.filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    headerRegex = new RegExp(
                              '(?:' + RGX.MARKER.EMBED.source + ')?'
                              + RGX.MARKER.OPEN.source
                              + '(?:' + escapedFname + ')'
                              + RGX.GET.HEADER.source,
                              'gi',
                            );
  } else {
    headerRegex = new RegExp(linkOrEmbed + RGX.GET.HEADER.source, 'gi');
  }
  return string.replace(headerRegex, oldHeader, newHeader, content);
}

// alias
export function rehead(
  oldHeader: string,
  newHeader: string,
  content: string,
  opts?: { filename?: string },
): string {
  return renameHeader(oldHeader, newHeader, content, opts);
}
