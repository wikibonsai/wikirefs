import path from 'path';

import { CONST } from '../lib/var/const';
import { isValidUriFormat } from '../util/valid';

// export interface InitUrl {
//   configUri: string;
//   doctypeUri: string;
//   fnameToUri: Record<string, string>;
//   // baseUrl: string;
// }

export function buildURI(
  fileUri: string,
  uriFormat: string = 'filename',
  uriExt: boolean = false,
): string | undefined {
  let uri: string;
  if (!isValidUriFormat(uriFormat)) {
    console.warn('invalid uri format: ' + uriFormat);
    return;
  }
  if (uriFormat === CONST.URI.FNAME) {
    uri = '/' + path.basename(fileUri, CONST.EXTS.MD);
  }
  if (uriFormat === CONST.URI.RELPATH) {
    uri = fileUri.replace(process.cwd(), '');
  }
  if (uriFormat === CONST.URI.ABSPATH) {
    uri = fileUri;
  }
  // w/ file extension
  if (uriExt) {
    const slugifyUri: string = fileUri.trim().toLowerCase().replace(/ /g, '-');
    return slugifyUri;
  // w/o file extension
  } else {
    // this nonsense is to strip the 'extname' (e.g. '.md')
    // @ts-expect-error: if-checks should prevent error
    const dir: string = path.dirname(uri);
    const fname: string = path.basename(fileUri, path.extname(fileUri));
    const fullUri: string = path.join(dir, fname);
    const slugifyUri: string = fullUri.trim().toLowerCase().replace(/ /g, '-');
    return slugifyUri;
  }
}

// 'extractFileName' is the opposite of 'buildURL' -- it takes in a
// uri and infers the filename of the file that corresponds to the uri
// 'uriFormat' should show what the uri is describing.
export function extractFileName(
  uri: string,
  uriFormat: string = 'filename',
): string | undefined {
  if (!isValidUriFormat(uriFormat)) {
    console.warn('invalid uri format: ' + uriFormat);
    return;
  }
  return path.basename(uri, CONST.EXTS.MD);
}
