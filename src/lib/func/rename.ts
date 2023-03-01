import { getEscIndices, isStrEscaped } from 'escape-mkdn';

import { RGX } from '../var/regex';


// todo: 
// - should filename validity be checked here, or at a higher level? (duplicate filenames + valid filename chars)
export function renameFileName(
  oldFileName: string,
  newFileName: string,
  content: string,
): string {
  if (content.length < oldFileName.length) {
    return 'wikirefs.renameFileName() error: content \'content\' is shorter than \'oldFileName\', aborting.';
  }
  if (content.length < newFileName.length) {
    return 'wikirefs.renameFileName() error: content \'content\' is shorter than \'newFileName\', aborting.';
  }
  const wikiTextFilename: RegExp = new RegExp(RGX.GET.FILENAME, 'g');
  const escdIndices: number[] = getEscIndices(content);
  // 🦨 do-while: https://stackoverflow.com/a/6323598
  let match: RegExpExecArray | null;
  do {
    match = wikiTextFilename.exec(content);
    if (match && (match[1] === oldFileName)) {
      const fnameOffset: number = match[0].indexOf(oldFileName);
      // filename range
      const start: number = (match.index + fnameOffset);
      const end: number = (match.index + fnameOffset + oldFileName.length);
      // check for escapes
      /* eslint-disable indent */
      const escaped: boolean = isStrEscaped(
                                              oldFileName, content,
                                              fnameOffset, escdIndices,
                                            );
      /* eslint-enable indent */
      if (!escaped) {
        content = content.substring(0, start)
                  + newFileName
                  + content.substring(end);
      }
    }
  } while (match);
  return content;
}
