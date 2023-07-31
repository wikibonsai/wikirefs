/* eslint indent: 0 */
/* eslint @typescript-eslint/no-namespace: 0 */

////
// note:
// 
// at the time of writing, constants are mainly a means of defining a
// controlled vocabulary that is referenced across the entire WikiBonsai
// project (https://github.com/wikibonsai/wikibonsai/blob/main/docs/TERMS.md).

export namespace CONST {

  // const names

  // "direction"
  export const DIR = {
    FORE     : 'fore',
    BACK     : 'back',
  } as const;

  // kind of relationships
  // (used for short-hand)
  export const REL = {
    // tree
    FAM      : {
      FAM        : 'fam',
      ANCESTOR   : 'ancestor',   // all up
      PARENT     : 'parent',     // one up
      SIBLING    : 'sibling',    // all sides
      CHILDREN   : 'children',   // one down
      DESCENDANT : 'descendant', // all down
      LINEAGE    : 'lineage',    // all up + all down - self (excludes self)
    },
    // web
    REF      : {
      REF      : 'ref',
      ATTR     : 'attr',
      LINK     : 'link',
      EMBED    : 'embed',
      // direction
      DIR      : {
        FORE     : 'fore',
        BACK     : 'back',
      },
    },
  } as const;

  // wiki construct kinds
  export const WIKI = {
    REF      : 'wikiref',
    ATTR     : 'wikiattr',
    LINK     : 'wikilink',
    EMBED    : 'wikiembed',
  } as const;

  // type kinds
  // (embeds don't have types)
  export const TYPE = {
    REF      : 'reftype',
    ATTR     : 'attrtype',
    LINK     : 'linktype',
  } as const;

  // "direction"
  export const DIR = {
    FORE     : 'fore',
    BACK     : 'back',
  } as const;

  export const MEDIA = {
    // individual
    MD       : 'markdown',
    PDF      : 'pdf',
    // categorical
    AUD      : 'audio',
    IMG      : 'image',
    VID      : 'video',
  } as const;

  // uri formats
  // (used for markdown link conversion)
  export const URI = {
    FNAME    : 'filename',
    ABSPATH  : 'absolute',
    RELPATH  : 'relative',
  } as const;

  // const marker symbols

  export const MARKER = {
    EMBED    : '!',
    PREFIX   : ':',
    TYPE     : '::',
    OPEN     : '[[',
    HEADER   : '#',
    // BLOCK    : '#^',
    LABEL    : '|',
    CLOSE    : ']]',
  } as const;

  // const file extensions

  export const EXTS = {
    MD       : '.md',
    PDF      : '.pdf',
    AUD      : new Set([
                '.mp3',
                '.webm',
                '.wav',
                '.m4a',
                '.ogg',
                '.3gp',
                '.flac',
              ]),
    // DOC    : new Set([
    //           '.doc',
    //           '.docx',
    //           '.rtf',
    //           '.txt',
    //           '.odt',
    //           '.xls',
    //           '.xlsx',
    //           '.ppt',
    //           '.pptm',
    //           '.pptx',
    //           '.pages',
    //           '.tldr',
    //           '.excalidraw',
    //         ]),
    IMG      : new Set([
                '.png',
                '.jpg',
                '.jpeg',
                '.gif',
                '.psd',
                '.svg',
                // from: https://github.com/blacksmithgu/obsidian-dataview/blob/0f1ecc771bba6561fbb1767bc96f221dc2978bd8/src/util/media.ts#L3
                '.tif',
                '.tiff',
                '.apng',
                '.avif',
                '.jfif',
                '.pjepg',
                '.pjp',
                '.webp',
                '.bmp',
                '.ico',
                '.cur',
              ]),
    VID     : new Set([
                '.mp4',
                '.mov',
                '.wmv',
                '.flv',
                '.avi',
                '.mkv',
                '.ogv',
              ]),
  } as const;

  // glob

  export const GLOB_MEDIA: string = '[' + 
    ([] as string[])
      .concat([CONST.EXTS.PDF])
      .concat(Array.from(CONST.EXTS.AUD))
      .concat(Array.from(CONST.EXTS.IMG))
      .concat(Array.from(CONST.EXTS.VID)).join('|')
  + ']';
}
