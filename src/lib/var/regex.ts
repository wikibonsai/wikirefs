/* eslint-disable indent*/
/* eslint-disable @typescript-eslint/no-namespace */

import { esc } from 'escape-mkdn';

import { CONST } from './const';


export namespace RGX {

  // <------------------------------------------------------------------------>
  //  markdown/wikilink special/reserved characters
  // <------------------------------------------------------------------------>

  export const MARKER = {
    // markdown (originally from kramdown)
    // atx header: https://github.com/gettalong/kramdown/blob/master/lib/kramdown/parser/kramdown/header.rbL29
    ATX_HEADER        : /^#{1,6}[\t ]*([^ \t].*)\n/im,
    // setext header: https://github.com/gettalong/kramdown/blob/master/lib/kramdown/parser/kramdown/header.rbL17
    SETEXT_HEADER     : /^ {0,3}([^ \t].*)\n[-=][-=]*[ \t\r\f\v]*\n/im,
    // list item: https://github.com/gettalong/kramdown/blob/master/lib/kramdown/parser/kramdown/list.rbL49
    BULLET            : /[^\n\r\S]{0,4}([+*-]) /i,
    // markdown-style block-reference
    // BLOCK          : /".* \^" + BLOCK_ID$/i,

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
    FILENAME          : /[^\n\r!:^|[\]]+/i,
    HEADER            : /[^\n\r!^|[\]]+/i,
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
                                    '^' + '(?: *)' + MARKER.BULLET.source
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
                                        // + '(?:'
                                        //   + '(?:' + CAP_GRP.HEADER.source + CAP_GRP.HEADER.source + ')?' //
                                        //   + '|'
                                        //   + '(?:' + CAP_GRP.BLOCK.source + CAP_GRP.BLOCK_ID.source + ')?'//
                                        //   + '|'
                                        // + ')?'
                                      + '(?:' + MARKER.LABEL.source + CAP_GRP.LABEL.source + ')?'       // 3
                                      + MARKER.CLOSE.source
                                    + ')'
                                  , 'i'),
    EMBED             : new RegExp(                                                                      // capture indices (0 is full match)
                                    '(?:'
                                      // skip embed
                                      + MARKER.EMBED.source
                                      + MARKER.OPEN.source
                                        + CAP_GRP.FILENAME.source                                        // 1
                                      + MARKER.CLOSE.source
                                    + ')'
                                  , 'i'),
    // since javascript/typescript regex does not support the \G anchor (see: https://ruby-doc.org/core-2.5.1/Regexp.html#class-Regexp-label-Anchors),
    // filenames should be extracted from list items in the full match string
    // ('WIKI.BASE' is useful for this)
    // attr / block / flow
    ATTR              : new RegExp(
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
  } as const;

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
                                        + '^ *' + MARKER.BULLET.source + _BASE.source + '\n'
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
    // HEADER           : new RegExp(MARKER.LINK_LEFT.source
    //                               + '(?:' + VALID_CHARS.FILENAME.source + ')'
    //                               + MARKER.HEADER.source 
    //                               + CAP_GRP.HEADER.source
    //                               + '(?:'
    //                                 + MARKER.LINK_LABEL.source
    //                                 + '|' + MARKER.LINK_RIGHT.source
    //                               + ')'
    //                               , 'i'),
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
}
