import { getEscIndices, isStrEscaped } from 'escape-mkdn';

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
  const escdIndices: number[] = getEscIndices(content);
  // 🦨 do-while: https://stackoverflow.com/a/6323598
  let match: RegExpExecArray | null;
  let lastOffset: number = 0;
  let updatedContent: string = '';
  do {
    match = wikiattr.exec(content);
    if (match && (match[1].trim() === oldAttrType)) {
      const matchText: string = match[0];
      // for possible initial whitespace pad
      const attrTypeTextOffset: number = matchText.indexOf(oldAttrType);
      // attrtype range
      const start: number = (match.index + attrTypeTextOffset);
      const end: number = (match.index + attrTypeTextOffset + oldAttrType.length);
      // check for escapes
      /* eslint-disable indent */
      const escaped: boolean = isStrEscaped(
                                              oldAttrType, content,
                                              attrTypeTextOffset, escdIndices,
                                            );
      /* eslint-enable indent */
      if (!escaped) {
        updatedContent += content.substring(lastOffset, start)
                        + newAttrType;
        lastOffset = end;
      }
    }
  } while (match);
  updatedContent += content.substring(lastOffset);
  return updatedContent;
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
  const escdIndices: number[] = getEscIndices(content);
  // 🦨 do-while: https://stackoverflow.com/a/6323598
  let match: RegExpExecArray | null;
  let lastOffset: number = 0;
  let updatedContent: string = '';
  do {
    match = wikilink.exec(content);
    if (match && (match[1] === oldLinkType)) {
      const matchText: string = match[0];
      const linkTypeTextOffset: number = matchText.indexOf(oldLinkType);
      // linktype range
      const start: number = (match.index + linkTypeTextOffset);
      const end: number = (match.index + linkTypeTextOffset + oldLinkType.length);
      // check for escapes
      /* eslint-disable indent */
      const escaped: boolean = isStrEscaped(
                                              oldLinkType, content,
                                              linkTypeTextOffset, escdIndices,
                                            );
      /* eslint-enable indent */
      if (!escaped) {
        updatedContent += content.substring(lastOffset, start)
                        + newLinkType;
        lastOffset = end;
      }
    }
  } while (match);
  updatedContent += content.substring(lastOffset);
  return updatedContent;
}
