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
  if (content.length < oldFileName.length) {
    return 'wikirefs.renameFileName() error: content \'content\' is shorter than \'oldFileName\', aborting.';
  }
  const wikiTextFilename: RegExp = new RegExp(RGX.GET.FILENAME, 'g');
  return string.replace(wikiTextFilename, oldFileName, newFileName, content);
}
