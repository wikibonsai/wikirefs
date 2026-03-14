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
  // scoped: only rename headers in wikilinks matching the given filename
  if (opts?.filename) {
    const escapedFname: string = opts.filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const scopedRegex: RegExp = new RegExp(
      RGX.MARKER.OPEN.source
      + '(?:' + escapedFname + ')'
      + RGX.MARKER.HEADER.source
      + RGX.CAP_GRP.HEADER.source
      + '(?:'
        + RGX.MARKER.LABEL.source
        + '|' + RGX.MARKER.CLOSE.source
      + ')'
    , 'g');
    return string.replace(scopedRegex, oldHeader, newHeader, content);
  // global: rename headers across all filenames
  } else {
    const wikiTextHeader: RegExp = new RegExp(RGX.GET.HEADER, 'g');
    return string.replace(wikiTextHeader, oldHeader, newHeader, content);
  }
}
