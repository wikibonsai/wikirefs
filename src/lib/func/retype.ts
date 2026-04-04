import * as string from '../../util/string';
import { RGX } from '../var/regex';


export function retypeRefType(
  oldRefType: string,
  newRefType: string,
  content: string,
  opts?: { escape?: boolean },
): string {
  content = retypeAttrType(oldRefType, newRefType, content, opts);
  content = retypeLinkType(oldRefType, newRefType, content, opts);
  return content;
}

export function retypeAttrType(
  oldAttrType: string,
  newAttrType: string,
  content: string,
  opts?: { escape?: boolean },
): string {
  const wikiattr: RegExp = new RegExp(RGX.WIKI._ATTR, 'gm');
  const skip: boolean = opts?.escape !== undefined ? opts.escape : true;
  return string.replace(wikiattr, oldAttrType, newAttrType, content, { pad: true, escape: skip });
}

export function retypeLinkType(
  oldLinkType: string,
  newLinkType: string,
  content: string,
  opts?: { escape?: boolean },
): string {
  const wikilink: RegExp = new RegExp(RGX.WIKI.LINK, 'g');
  const skip: boolean = opts?.escape !== undefined ? opts.escape : true;
  return string.replace(wikilink, oldLinkType, newLinkType, content, { escape: skip });
}
