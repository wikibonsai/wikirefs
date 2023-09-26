import * as string from '../../util/string';
import { RGX } from '../var/regex';


export function retypeRefType(
  oldRefType: string,
  newRefType: string,
  content: string,
): string {
  if (content.length < oldRefType.length) {
    return 'wikirefs.retypeRefType() error: content \'content\' is shorter than \'oldRefType\', aborting.';
  }
  if (content.length < newRefType.length) {
    return 'wikirefs.retypeRefType() error: content \'content\' is shorter than \'newRefType\', aborting.';
  }
  content = retypeAttrType(oldRefType, newRefType, content);
  content = retypeLinkType(oldRefType, newRefType, content);
  return content;
}

export function retypeAttrType(
  oldAttrType: string,
  newAttrType: string,
  content: string,
): string {
  if (content.length < oldAttrType.length) {
    return 'wikirefs.retypeAttrType() error: content \'content\' is shorter than \'oldAttrType\', aborting.';
  }
  if (content.length < newAttrType.length) {
    return 'wikirefs.retypeAttrType() error: content \'content\' is shorter than \'newAttrType\', aborting.';
  }
  const wikiattr: RegExp = new RegExp(RGX.WIKI.ATTR, 'gm');
  return string.replace(wikiattr, oldAttrType, newAttrType, content, { pad: true });
}

export function retypeLinkType(
  oldLinkType: string,
  newLinkType: string,
  content: string,
): string {
  if (content.length < oldLinkType.length) {
    return 'wikirefs.retypeLinkType() error: content \'content\' is shorter than \'oldLinkType\', aborting.';
  }
  if (content.length < newLinkType.length) {
    return 'wikirefs.retypeLinkType() error: content \'content\' is shorter than \'newLinkType\', aborting.';
  }
  const wikilink: RegExp = new RegExp(RGX.WIKI.LINK, 'g');
  return string.replace(wikilink, oldLinkType, newLinkType, content);
}
