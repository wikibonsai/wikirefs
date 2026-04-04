import * as string from '../../util/string';
import { RGX } from '../var/regex';


// todo:
// - should filename validity be checked here, or at a higher level? (duplicate filenames + valid filename chars)
// - add ability to update only certain kinds of wikirefs (see 'wikiToMkdn' for logic)
export function renameFileName(
  oldFileName: string,
  newFileName: string,
  content: string,
  opts?: { escape?: boolean },
): string {
  const wikiTextFilename: RegExp = new RegExp(RGX.GET.FILENAME, 'g');
  const skip: boolean = opts?.escape !== undefined ? opts.escape : true;
  return string.replace(wikiTextFilename, oldFileName, newFileName, content, { escape: skip });
}

// alias
export function rename(
  oldFileName: string,
  newFileName: string,
  content: string,
  opts?: { escape?: boolean },
): string {
  return renameFileName(oldFileName, newFileName, content, opts);
}
