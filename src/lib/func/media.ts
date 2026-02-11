import path from 'path';
import { CONST } from '../var/const';


export function getMediaKind(filename: string): string {
  const mediaExt: string = path.extname(filename).toLowerCase();
  let media: string;
  // individual
  if (mediaExt === CONST.EXTS.PDF) {
    media = CONST.MEDIA.PDF;
  // categorical
  } else if (CONST.EXTS.AUD.has(mediaExt)) {
    media = CONST.MEDIA.AUD;
  } else if (CONST.EXTS.IMG.has(mediaExt)) {
    media = CONST.MEDIA.IMG;
  } else if (CONST.EXTS.VID.has(mediaExt)) {
    media = CONST.MEDIA.VID;
  } else {
    // presume markdown -- might actually include unsupported media extension though...
    media = CONST.MEDIA.MD;
  }
  return media;
}

export function isMedia(filename: string): boolean {
  const mediaExt: string = path.extname(filename).toLowerCase();
  return (CONST.EXTS.PDF === mediaExt) ||
          CONST.EXTS.AUD.has(mediaExt) ||
          CONST.EXTS.IMG.has(mediaExt) ||
          CONST.EXTS.VID.has(mediaExt);
}
