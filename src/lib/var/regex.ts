/* eslint-disable indent*/
/* eslint-disable @typescript-eslint/no-namespace */

import { esc } from 'escape-mkdn';

import { CONST } from './const';


export interface MatchAttr {
  text: string;
  start: number;
  type: [string, number];
  filenames: [string, number][];
  listFormat: 'comma' | 'mkdn' | 'none';
}

export namespace RGX {

  // <------------------------------------------------------------------------>
  //  markdown/wikilink special/reserved characters
  // <------------------------------------------------------------------------>

  export const _MKDN = {
    // markdown (originally from kramdown)
    // atx header: https://github.com/gettalong/kramdown/blob/master/lib/kramdown/parser/kramdown/header.rbL29
    ATX_HEADER        : /^#{1,6}[\t ]+([^ \t].*)\n/im,
    // setext header: https://github.com/gettalong/kramdown/blob/master/lib/kramdown/parser/kramdown/header.rbL17
    SETEXT_HEADER     : /^ {0,3}([^ \t].*)\n[-=][-=]*[ \t\r\f\v]*\n/im,
    // list item: https://github.com/gettalong/kramdown/blob/master/lib/kramdown/parser/kramdown/list.rbL49
    BULLET            : /[^\n\r\S]{0,4}([+*-]) /i,
    // markdown link: [label](uri) — excludes images (negative lookbehind for !)
    LINK              : /(?<!!)\[(^$|.*?)\]\((.*?)\)/gi,
    // markdown image: ![alt](uri)
    IMAGE             : /!\[(.*?)]\((.*?)\)/gi,
    // markdown-style block-reference
    // BLOCK          : /".* \^" + BLOCK_ID$/i,
  } as const;

  export const MARKER = {
    // wikilink (by order of syntactic appearance)
    EMBED             : new RegExp(esc(CONST.MARKER.EMBED)),
    NOT_EMBED         : new RegExp('(?<!' + esc(CONST.MARKER.EMBED) + ')', 'i'),
    PREFIX            : new RegExp('(?:' + CONST.MARKER.PREFIX + ' ?)'),
    TYPE              : new RegExp('(?: *' + CONST.MARKER.TYPE + ' ?)'),
    OPEN              : new RegExp(esc(CONST.MARKER.OPEN)),
    HEADER            : new RegExp(CONST.MARKER.HEADER),
    // BLOCK             : new RegExp(esc(CONST.MARKER.BLOCK)),
    LABEL             : new RegExp(esc(CONST.MARKER.LABEL)),
    CLOSE             : new RegExp(esc(CONST.MARKER.CLOSE)),
  } as const;

  // <------------------------------------------------------------------------>
  //  valid characters for wikilink text (wikitext)
  // <------------------------------------------------------------------------>

  export const VALID_CHARS = {
    TYPE              : /[^\n\r!:^|[\]]+/i,
    FILENAME          : /[^\n\r!#:^|[\]]+/i,
    HEADER            : /[^\n\r!^|[\]]*/i,
    // BLOCK_ID          : /[^\n\r!:^|[\]\/]+/i,
    LABEL             : /.+?(?=\]{2})/i,
  } as const;

  // <------------------------------------------------------------------------>
  //  capture groups for wikilink text (wikitext)
  // <------------------------------------------------------------------------>

  export const CAP_GRP = {
    TYPE              : new RegExp('(' + VALID_CHARS.TYPE.source + ')', 'i'),
    FILENAME          : new RegExp('(' + VALID_CHARS.FILENAME.source + ')', 'i'),
    HEADER            : new RegExp('(' + VALID_CHARS.HEADER.source + ')', 'i'),
    // BLOCK_ID          : new RegExp('(' + VALID_CHARS.BLOCK_ID.source + ')', 'i'),
    LABEL             : new RegExp('(' + VALID_CHARS.LABEL.source + ')', 'i'),
  } as const;

  // <------------------------------------------------------------------------>
  //  used to build wikiattr regexes; will not return complete wikilinks
  // <------------------------------------------------------------------------>

  // this is a local-only variable -- see WIKILINK.BASE for exported version
  const _CAP_GRP_BASE = new RegExp(
                                    MARKER.OPEN.source
                                    + CAP_GRP.FILENAME.source
                                    + MARKER.CLOSE.source
                                  , 'i');
  const _BASE         = new RegExp(
                                    MARKER.OPEN.source
                                    + VALID_CHARS.FILENAME.source
                                    + MARKER.CLOSE.source
                                  , 'i');

  export const ATTR_UTIL = {
    // list-comma is responsible for catching the single case too
    LIST_COMMA        : new RegExp(
                                    _CAP_GRP_BASE.source + ' ?'
                                    + '(?:'
                                      + ', *' + _CAP_GRP_BASE.source + ' *'
                                    + ')*'
                                  , 'i'),
    PREFIX            : new RegExp(
                                    '^'
                                    + MARKER.PREFIX.source + '?'
                                    + CAP_GRP.TYPE.source
                                    + MARKER.TYPE.source
                                  , 'im'),
  } as const;

  // <------------------------------------------------------------------------>
  //  for full parsing (w/ line-by-line utilities)
  // <------------------------------------------------------------------------>

  // for line-by-line attr processing
  export const ATTR_LINE = {
    // todo: TYPE -> SINGLE_OR_TYPE
    TYPE              : new RegExp(
                                    ATTR_UTIL.PREFIX.source
                                    + '(?:' + ATTR_UTIL.LIST_COMMA.source + ')?'
                                    + '$'
                                  , 'im'),
    LIST_ITEM         : new RegExp(
                                    '^' + '(?: *)' + _MKDN.BULLET.source
                                    + '(' + _CAP_GRP_BASE.source + ')'
                                  , 'im'),
  } as const;

  // full regex -- can be used with 'g' (global) option
  export const WIKI = {
    // base [[wikilink]] for wikiattrs, since they only support file level links
    BASE              : new RegExp(
                                    MARKER.OPEN.source
                                    + CAP_GRP.FILENAME.source
                                    + MARKER.CLOSE.source
                                  , 'i'),
    // javascript/typescript regex does not support + or * in lookarounds (from: https://stackoverflow.com/questions/9030305/regular-expression-lookbehind-doesnt-work-with-quantifiers-or)
    // link / inline / text
    LINK              : new RegExp(                                                                      // capture indices (0 is full match)
                                    '(?:'
                                      + '(?:'
                                        + MARKER.PREFIX.source
                                        + CAP_GRP.TYPE.source                                            // 1
                                        + MARKER.TYPE.source
                                      + ')?'
                                      // skip embed
                                      + MARKER.NOT_EMBED.source
                                      + MARKER.OPEN.source
                                        + CAP_GRP.FILENAME.source                                        // 2
                                        + '(?:' + MARKER.HEADER.source + CAP_GRP.HEADER.source + ')?'   // 3
                                        // + '(?:' + MARKER.BLOCK.source + CAP_GRP.BLOCK_ID.source + ')?'//
                                      + '(?:' + MARKER.LABEL.source + CAP_GRP.LABEL.source + ')?'       // 4
                                      + MARKER.CLOSE.source
                                    + ')'
                                  , 'i'),
    EMBED             : new RegExp(                                                                      // capture indices (0 is full match)
                                    '(?:'
                                      // skip embed
                                      + MARKER.EMBED.source
                                      + MARKER.OPEN.source
                                        + CAP_GRP.FILENAME.source                                        // 1
                                        + '(?:'
                                          + MARKER.HEADER.source
                                          + CAP_GRP.HEADER.source                                         // 2
                                        + ')?'
                                      + MARKER.CLOSE.source
                                    + ')'
                                  , 'i'),
    // raw attr block regex — use WIKI.ATTR() function for structured results
    _ATTR             : new RegExp(
                                    ATTR_UTIL.PREFIX.source                                            // 1
                                    + '(?:'
                                      // comma-separated
                                      + '(?:'
                                        + '(?<!\n)'
                                        + ATTR_UTIL.LIST_COMMA.source                                    // only captures first and last item
                                        + '(?:\n|$)'
                                      + ')'
                                      + '|'
                                      // mkdwn-list-separated
                                      + '\n'
                                      + '(?:'
                                        + ATTR_LINE.LIST_ITEM.source                                     // only captures last item
                                        + '(?:\n|$)'
                                      + ')+'
                                    + ')'
                                  , 'im'),
    /**
     * Match all wikiattr blocks in content and extract filenames in one call.
     * Returns structured results with type, filenames, offsets, and list format.
     *
     * Uses sticky (y-flag) regexes internally — JS equivalent of Ruby's \G anchor.
     * The raw block regex is available as `WIKI._ATTR` for find-and-replace uses.
     */
    ATTR(content: string): MatchAttr[] {
      const results: MatchAttr[] = [];
      const blockRegex: RegExp = new RegExp(WIKI._ATTR, 'gim');
      let attrMatch: RegExpExecArray | null;
      while ((attrMatch = blockRegex.exec(content)) !== null) {
        const matchText: string = attrMatch[0];
        const attrtypeText: string = attrMatch[1];
        const attrtypeOffset: number = attrMatch.index + matchText.indexOf(attrtypeText);
        // detect list format
        const isMkdnList: boolean = /\n *[-+*] /.test(matchText);
        let listFormat: 'comma' | 'mkdn' | 'none' = 'none';
        if (isMkdnList) {
          listFormat = 'mkdn';
        } else if (/ *, */.test(matchText)) {
          listFormat = 'comma';
        }
        // extract filenames via sticky walk
        const filenames: [string, number][] = [];
        const stickyItemRegex: RegExp = isMkdnList
          ? new RegExp(_STICKY.ATTR_ITEM_MKDN, 'iy')
          : new RegExp(_STICKY.ATTR_ITEM_COMMA, 'iy');
        const prefixRegex: RegExp = new RegExp(_STICKY.ATTR_PREFIX, 'im');
        const prefixMatch = prefixRegex.exec(matchText);
        if (prefixMatch) {
          const valueStart: number = attrMatch.index
                                   + prefixMatch.index
                                   + prefixMatch[0].length;
          stickyItemRegex.lastIndex = valueStart;
          let fnameMatch: RegExpExecArray | null;
          while ((fnameMatch = stickyItemRegex.exec(content)) !== null) {
            const filenameText: string = isMkdnList
              ? fnameMatch[2].replace(/^\[\[/, '').replace(/\]\]$/, '')
              : fnameMatch[1];
            const twoLeftBrackets: number = 2;
            const bracketOffset: number = fnameMatch[0].indexOf('[[');
            const filenameOffset: number = fnameMatch.index + bracketOffset + twoLeftBrackets;
            filenames.push([filenameText, filenameOffset]);
          }
        }
        results.push({
          text: matchText,
          start: attrMatch.index,
          type: [attrtypeText.trim(), attrtypeOffset],
          filenames,
          listFormat,
        });
      }
      return results;
    },
  };


  // <------------------------------------------------------------------------>
  //  utilities to extract out target wikitext
  //  (useful for entity interactions, renaming things, etc.)
  // <------------------------------------------------------------------------>

  export const GET = {                                                                                   // capture indices (0 is full match)
    // link / inline / text
    LINKTYPE          : new RegExp(
                                    MARKER.PREFIX.source
                                    + CAP_GRP.TYPE.source                                                // 1
                                    + MARKER.TYPE.source
                                    + MARKER.OPEN.source
                                      + VALID_CHARS.FILENAME.source
                                        // + '(?:'
                                        //   + '(?:' + CAP_GRP.HEADER.source + CAP_GRP.HEADER.source + ')?' //
                                        //   + '|'
                                        //   + '(?:' + CAP_GRP.BLOCK.source + CAP_GRP.BLOCK_ID.source + ')?'//
                                        //   + '|'
                                        // + ')?'
                                      + '(?:' + MARKER.LABEL.source + VALID_CHARS.LABEL.source + ')?'
                                    + MARKER.CLOSE.source
                                    + '(?!\n)'
                                  , 'i'),
    // attr / block / flow
    ATTRTYPE          : new RegExp(
                                    '^'
                                    + '(?:' + MARKER.PREFIX.source + ')?'
                                    + CAP_GRP.TYPE.source                                                // 1
                                    + MARKER.TYPE.source
                                    + '(?:'
                                      // single / comma
                                      + '(?:'
                                        + _BASE.source
                                        + '(' + ', *' + _BASE.source + ' *' + ')*'
                                        + '\n'
                                      + ')'
                                      + '|'
                                      // mkdn-list-separated
                                      + '(?:' + '\n' + '(?:'
                                        + '^ *' + _MKDN.BULLET.source + _BASE.source + '\n'
                                      + ')+' + ')'
                                    + ')'
                                  , 'im'),
    REFTYPE           : new RegExp(
                                    // attr
                                    '(?:'
                                      + '^'
                                      + '(?:' + MARKER.PREFIX.source + ')?'
                                      + CAP_GRP.TYPE.source + MARKER.TYPE.source                        // 1 (attr)
                                      + '(?:'
                                        // single / comma
                                        + '(?:'
                                          + _BASE.source + '$' + '|' + ','
                                        + ')'
                                        + '|'
                                        // mkdn list
                                        + '$'
                                      +')'
                                    + ')'
                                    + '|'
                                    // link
                                    + '(?:'
                                      + MARKER.PREFIX.source
                                      + CAP_GRP.TYPE.source + MARKER.TYPE.source                        // 2 (link)
                                      + MARKER.OPEN.source
                                    + ')'
                                  , 'im'),
    FILENAME          : new RegExp(
                                    MARKER.OPEN.source
                                    + CAP_GRP.FILENAME.source                                            // 1
                                    + '(?:'
                                      + MARKER.HEADER.source // includes BLOCK
                                      + '|'
                                      + MARKER.LABEL.source
                                      + '|'
                                      + MARKER.CLOSE.source
                                    + ')'
                                  , 'i'),
    HEADER            : new RegExp(
                                    MARKER.HEADER.source
                                    + CAP_GRP.HEADER.source                                             // 1
                                    + '(?:'
                                      + MARKER.LABEL.source
                                      + '|'
                                      + MARKER.CLOSE.source
                                    + ')'
                                  , 'i'),
    // BLOCK_ID         : new RegExp(MARKER.LINK_LEFT.source
    //                               + '(?:' + VALID_CHARS.FILENAME.source + ')'
    //                               + MARKER.BLOCK.source
    //                               + CAP_GRP.BLOCK_ID.source
    //                               + '(?:'
    //                                 + MARKER.LINK_LABEL.source
    //                                 + '|' + MARKER.LINK_RIGHT.source
    //                               + ')'
    //                               , 'i'),
  } as const;

  // <------------------------------------------------------------------------>
  //  sticky (y-flag) regexes — JS equivalent of Ruby's \G anchor.
  //
  //  The 'y' flag anchors each exec() to lastIndex and returns null if the
  //  pattern doesn't match at that exact position. Usage:
  //
  //    const re = new RegExp(RGX._STICKY.ATTR_ITEM_COMMA, 'iy');
  //    re.lastIndex = startOffset;
  //    let m;
  //    while ((m = re.exec(content)) !== null) {
  //      // m[1] = filename; re.lastIndex is advanced automatically
  //    }
  //
  //  Create a fresh RegExp per use — sticky regexes are stateful via lastIndex.
  // <------------------------------------------------------------------------>

  const _STICKY = {
    /** Locates where `:type::` prefix ends so we know where to anchor the item regex. */
    ATTR_PREFIX       : new RegExp(
                                    ATTR_UTIL.PREFIX.source
                                  , 'im'),
    /** Matches one [[filename]] in a comma-separated attr value. Capture [1] = filename. */
    ATTR_ITEM_COMMA   : new RegExp(
                                    ' *,? *'
                                    + MARKER.OPEN.source
                                    + CAP_GRP.FILENAME.source                                              // 1
                                    + MARKER.CLOSE.source
                                    + ' *'
                                  , 'iy'),
    /** Matches one `- [[filename]]` line in a mkdn-list attr value. Capture [1] = bullet, [2] = full `[[filename]]`. */
    ATTR_ITEM_MKDN    : new RegExp(
                                    '\\n'
                                    + '(?: *)'
                                    + _MKDN.BULLET.source                                                  // 1
                                    + '(' + _CAP_GRP_BASE.source + ')'                                     // 2
                                  , 'iy'),
  } as const;
}
