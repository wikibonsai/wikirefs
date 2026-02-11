import * as string from '../../util/string';
import { RGX } from '../var/regex';


export function retypeRefType(
  oldRefType: string,
  newRefType: string,
  content: string,
): string {
  content = retypeAttrType(oldRefType, newRefType, content);
  content = retypeLinkType(oldRefType, newRefType, content);
  return content;
}

export function retypeAttrType(
  oldAttrType: string,
  newAttrType: string,
  content: string,
): string {
  const wikiattr: RegExp = new RegExp(RGX.WIKI.ATTR, 'gm');
  return string.replace(wikiattr, oldAttrType, newAttrType, content, { pad: true });
}

export function retypeLinkType(
  oldLinkType: string,
  newLinkType: string,
  content: string,
): string {
  const wikilink: RegExp = new RegExp(RGX.WIKI.LINK, 'g');
  return string.replace(wikilink, oldLinkType, newLinkType, content);
}
