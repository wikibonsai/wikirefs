import * as string from '../../util/string';
import { RGX } from '../var/regex';


// todo: 
// - should filename validity be checked here, or at a higher level? (duplicate filenames + valid filename chars)
// - add ability to update only certain kinds of wikirefs (see 'wikiToMkdn' for logic)
export function renameFileName(
  oldFileName: string,
  newFileName: string,
  content: string,
): string {
  const wikiTextFilename: RegExp = new RegExp(RGX.GET.FILENAME, 'g');
  return string.replace(wikiTextFilename, oldFileName, newFileName, content);
}

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
