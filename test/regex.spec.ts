import assert from 'node:assert/strict';

import { RGX } from '../src';


// since RegExpMatchArray is an array-franken-object,
// verify only the array items in the given match franken type
// against the expected match array.
const checkArrayEqual = (arrObj: any, array: (string | undefined)[]) =>
  array.every((el, i) => arrObj[i] === el);

describe('RGX', () => {

  const testRegex = (params: any) => () => {
    const regex: RegExp = params.regex;
    const content: string = params.content;
    const expdMatch: RegExpMatchArray = params.match;
    const actlMatch = regex.exec(content);
    if ((!actlMatch || actlMatch.length === 0)
    || (!expdMatch || expdMatch.length === 0)) {
      assert.strictEqual(actlMatch, expdMatch);
    } else {
      const eql: boolean = checkArrayEqual(actlMatch, expdMatch);
      if (!eql) {
        console.error('actual match: ', JSON.stringify(actlMatch));
        console.error('expected match: ', JSON.stringify(expdMatch));
      }
      assert.strictEqual(eql, true);
    }
  };

  describe('ATTR_UTIL', () => {

    // note: comma-separated lists have to be extracted manually from full match string
    describe('LIST_COMMA', () => {

      it('prefixed; list; comma', testRegex({
        regex: RGX.ATTR_UTIL.LIST_COMMA,
        content: ':attrtype::[[wikilink-1]],[[wikilink-2]],[[wikilink-3]]',
        match: [
          '[[wikilink-1]],[[wikilink-2]],[[wikilink-3]]',
          'wikilink-1',
          'wikilink-3',
        ],
      }));

      it('prefixed; list; mkdn -- matches single', testRegex({
        regex: RGX.ATTR_UTIL.LIST_COMMA,
        content:
`:attrtype::
- [[wikilink-1]]
- [[wikilink-2]]
- [[wikilink-3]]
`,
        match: [
          '[[wikilink-1]]',
          'wikilink-1',
        ],
      }));
      
    });

    describe('PREFIX', () => {

      it('prefixed; single', testRegex({
        regex: RGX.ATTR_UTIL.PREFIX,
        content: ':attrtype::[[wikilink]]\n',
        match: [
          ':attrtype::',
          'attrtype',
        ],
      }));

      it('prefixed; list; comma', testRegex({
        regex: RGX.ATTR_UTIL.PREFIX,
        content: ':attrtype::[[wikilink-1]],[[wikilink-2]],[[wikilink-3]]',
        match: [
          ':attrtype::',
          'attrtype',
        ],
      }));

      it('prefixed; list; mkdn', testRegex({
        regex: RGX.ATTR_UTIL.PREFIX,
        content:
`:attrtype::
- [[wikilink-1]]
- [[wikilink-2]]
- [[wikilink-3]]
`,
        match: [
          ':attrtype::',
          'attrtype',
        ],
      }));
      
    });

  });

  // regexes meant for use in line-by-line parsing will ignore newlines,
  // as they have, presumably, already been stripped

  describe('ATTR_LINE', () => {

    describe('TYPE', () => {

      it('unprefixed; single', testRegex({
        regex: RGX.ATTR_LINE.TYPE,
        content: 'attrtype::[[wikilink]]',
        match: [
          'attrtype::[[wikilink]]',
          'attrtype',
          'wikilink',
          undefined,
        ],
      }));

      it('unprefixed; list; comma', testRegex({
        regex: RGX.ATTR_LINE.TYPE,
        content: 'attrtype::[[wikilink]],[[another]]',
        match: [
          'attrtype::[[wikilink]],[[another]]',
          'attrtype',
          'wikilink',
          'another',
          undefined,
        ],
      }));

      it('unprefixed; list; mkdn', testRegex({
        regex: RGX.ATTR_LINE.TYPE,
        content: 'attrtype::',
        match: [
          'attrtype::',
          'attrtype',
          undefined,
          undefined,
        ],
      }));

    });

    describe('LIST_ITEM', () => {

      it('list-mkdn', testRegex({
        regex: RGX.ATTR_LINE.LIST_ITEM,
        content: '- [[wikilink]]',
        match: [
          '- [[wikilink]]',
          '-',
          '[[wikilink]]',
          'wikilink',
          undefined,
        ],
      }));

    });

  });

  describe('WIKI', () => {

    describe('BASE', () => {

      it('prefixed; single', testRegex({
        regex: RGX.WIKI.BASE,
        content: ':attrtype::[[wikilink]]\n',
        match: [
          '[[wikilink]]',
          'wikilink',
        ],
      }));

    });

    describe('EMBED', () => {

      it('base', testRegex({
        regex: RGX.WIKI.EMBED,
        content: '![[wikilink]].',
        match: [
          '![[wikilink]]',
          'wikilink',
        ],
      }));

      it('no types', testRegex({
        regex: RGX.WIKI.EMBED,
        content: '!:linktype::[[wikilink]].',
        match: null,
      }));

      it('no labels', testRegex({
        regex: RGX.WIKI.EMBED,
        content: '![[wikilink|label]].',
        match: null,
      }));

    });

    describe('LINK', () => {

      it('untyped', testRegex({
        regex: RGX.WIKI.LINK,
        content: '[[wikilink]].',
        match: [
          '[[wikilink]]',
          undefined,
          'wikilink',
          undefined,
        ],
      }));

      it('untyped; labelled', testRegex({
        regex: RGX.WIKI.LINK,
        content: '[[wikilink|label]].',
        match: [
          '[[wikilink|label]]',
          undefined,
          'wikilink',
          'label',
        ],
      }));

      it('untyped; not embeds', testRegex({
        regex: RGX.WIKI.LINK,
        content: '![[wikilink]].',
        match: null,
      }));

      it('typed', testRegex({
        regex: RGX.WIKI.LINK,
        content: ':linktype::[[wikilink]].',
        match: [
          ':linktype::[[wikilink]]',
          'linktype',
          'wikilink',
          undefined,
        ],
      }));

      it('typed; labelled', testRegex({
        regex: RGX.WIKI.LINK,
        content: ':linktype::[[wikilink|label]].',
        match: [
          ':linktype::[[wikilink|label]]',
          'linktype',
          'wikilink',
          'label',
        ],
      }));

    });

    describe('ATTR', () => {

      it('unprefixed; single; end of line', testRegex({
        regex: RGX.WIKI.ATTR,
        content: 'attrtype::[[wikilink]]',
        match: [
          'attrtype::[[wikilink]]',
          'attrtype',
          'wikilink',
          undefined,
          undefined,
          undefined,
          undefined,
        ],
      }));

      it('unprefixed; single; newline', testRegex({
        regex: RGX.WIKI.ATTR,
        content: 'attrtype::[[wikilink]]\n',
        match: [
          'attrtype::[[wikilink]]\n',
          'attrtype',
          'wikilink',
          undefined,
          undefined,
          undefined,
          undefined,
        ],
      }));

      it('unprefixed; single; no label', testRegex({
        regex: RGX.WIKI.ATTR,
        content: 'attrtype::[[wikilink|label]]\n',
        match: null,
      }));

      it('unprefixed; list; comma', testRegex({
        regex: RGX.WIKI.ATTR,
        content: 'attrtype::[[wikilink-1]],[[wikilink-2]],[[wikilink-3]]\n',
        match: [
          'attrtype::[[wikilink-1]],[[wikilink-2]],[[wikilink-3]]\n',
          'attrtype',
          'wikilink-1',
          'wikilink-3',
          undefined,
          undefined,
          undefined,
        ],
      }));

      it('unprefixed; list; mkdn', testRegex({
        regex: RGX.WIKI.ATTR,
        content:
`attrtype::
- [[wikilink-1]]
- [[wikilink-2]]
- [[wikilink-3]]
`,
        match: [
          'attrtype::\n- [[wikilink-1]]\n- [[wikilink-2]]\n- [[wikilink-3]]\n',
          'attrtype',
          undefined,
          undefined,
          '-',
          '[[wikilink-3]]',
          'wikilink-3',
        ],
      }));

      it('prefixed; single', testRegex({
        regex: RGX.WIKI.ATTR,
        content: ':attrtype::[[wikilink]]\n',
        match: [
          ':attrtype::[[wikilink]]\n',
          'attrtype',
          'wikilink',
          undefined,
          undefined,
          undefined,
          undefined,
        ],
      }));

      it('prefixed; single; no label', testRegex({
        regex: RGX.WIKI.ATTR,
        content: ':attrtype::[[wikilink|label]]\n',
        match: null,
      }));

      it('prefixed; list; comma', testRegex({
        regex: RGX.WIKI.ATTR,
        content: ':attrtype::[[wikilink-1]],[[wikilink-2]],[[wikilink-3]]\n',
        match: [
          ':attrtype::[[wikilink-1]],[[wikilink-2]],[[wikilink-3]]\n',
          'attrtype',
          'wikilink-1',
          'wikilink-3',
          undefined,
          undefined,
          undefined,
        ],
      }));

      it('prefixed; list; mkdn', testRegex({
        regex: RGX.WIKI.ATTR,
        content:
`:attrtype::
- [[wikilink-1]]
- [[wikilink-2]]
- [[wikilink-3]]
`,
        match: [
          ':attrtype::\n- [[wikilink-1]]\n- [[wikilink-2]]\n- [[wikilink-3]]\n',
          'attrtype',
          undefined,
          undefined,
          '-',
          '[[wikilink-3]]',
          'wikilink-3',
        ],
      }));

    });

  });

  describe('GET', () => {

    describe('LINKTYPE', () => {

      it('attr; prefixed; list; mkdn', testRegex({
        regex: RGX.GET.LINKTYPE,
        content:
`:reftype::
- [[wikilink]]
`,
        match: null,
      }));

      it('attr; prefixed; list; mkdn; pad', testRegex({
        regex: RGX.GET.LINKTYPE,
        content:
`: reftype ::
- [[wikilink]]
`,
        match: null,
      }));

      it('attr; unprefixed; list; mkdn', testRegex({
        regex: RGX.GET.LINKTYPE,
        content:
`reftype::
- [[wikilink]]
`,
        match: null,
      }));

      it('link', testRegex({
        regex: RGX.GET.LINKTYPE,
        content: ':reftype::[[wikilink]].',
        match: [
          ':reftype::[[wikilink]]',
          'reftype',
        ],
      }));

      it('link; must be prefixed', testRegex({
        regex: RGX.GET.LINKTYPE,
        content: 'some text reftype::[[wikilink]].',
        match: null,
      }));

    });

    describe('ATTRTYPE', () => {

      it('attr; prefixed; list; mkdn', testRegex({
        regex: RGX.GET.ATTRTYPE,
        content:
`:reftype::
- [[wikilink]]
`,
        match: [
          ':reftype::\n- [[wikilink]]\n',
          'reftype',
        ],
      }));

      it('attr; prefixed; list; mkdn; pad', testRegex({
        regex: RGX.GET.ATTRTYPE,
        content:
`: reftype ::
- [[wikilink]]
`,
        match: [
          ': reftype ::\n- [[wikilink]]\n',
          'reftype ',
          undefined,
          '-',
        ],
      }));

      it('attr; unprefixed; list; mkdn', testRegex({
        regex: RGX.GET.ATTRTYPE,
        content:
`reftype::
- [[wikilink]]
`,
        match: [
          'reftype::\n- [[wikilink]]\n',
          'reftype'
        ],
      }));

      it('link', testRegex({
        regex: RGX.GET.ATTRTYPE,
        content: ':reftype::[[wikilink]].',
        match: null,
      }));

      it('link; must be prefixed', testRegex({
        regex: RGX.GET.ATTRTYPE,
        content: 'some text reftype::[[wikilink]].',
        match: null,
      }));

    });

    describe('REFTYPE', () => {

      it('attr; prefixed; list; mkdn', testRegex({
        regex: RGX.GET.REFTYPE,
        content:
`:reftype::
- [[wikilink]]
`,
        match: [
          ':reftype::',
          'reftype',
          undefined,
        ],
      }));

      it('attr; prefixed; list; mkdn; pad', testRegex({
        regex: RGX.GET.REFTYPE,
        content:
`: reftype ::
- [[wikilink]]
`,
        match: [
          ': reftype ::',
          'reftype ',
          undefined,
        ],
      }));

      it('attr; unprefixed; list; mkdn', testRegex({
        regex: RGX.GET.REFTYPE,
        content:
`reftype::
- [[wikilink]]
`,
        match: [
          'reftype::',
          'reftype',
        ],
      }));

      it('link', testRegex({
        regex: RGX.GET.REFTYPE,
        content: ':reftype::[[wikilink]].',
        match: [
          ':reftype::[[',
          undefined,
          'reftype',
        ],
      }));

      it('link; must be prefixed', testRegex({
        regex: RGX.GET.REFTYPE,
        content: 'some text reftype::[[wikilink]].',
        match: null,
      }));

    });

    describe('FILENAME', () => {
      
      describe('minimal examples', () => {

        it('base', testRegex({
          regex: RGX.GET.FILENAME,
          content: '[[wikilink]]',
          match: [
            '[[wikilink]]',
            'wikilink',
          ],
        }));

        it('header', testRegex({
          regex: RGX.GET.FILENAME,
          content: '[[wikilink#',
          match: [
            '[[wikilink#',
            'wikilink',
          ],
        }));

        it('label', testRegex({
          regex: RGX.GET.FILENAME,
          content: '[[wikilink|',
          match: [
            '[[wikilink|',
            'wikilink',
          ],
        }));

      });

      it('attr; prefixed; list; mkdn', testRegex({
        regex: RGX.GET.FILENAME,
        content:
`:reftype::
- [[wikilink]]
`,
        match: [
          '[[wikilink]]',
          'wikilink',
        ],
      }));

      it('attr; unprefixed; list; mkdn', testRegex({
        regex: RGX.GET.FILENAME,
        content:
`reftype::
- [[wikilink]]
`,
        match: [
          '[[wikilink]]',
          'wikilink',
        ],
      }));

      it('link', testRegex({
        regex: RGX.GET.FILENAME,
        content: ':reftype::[[wikilink]].',
        match: [
          '[[wikilink]]',
          'wikilink',
        ],
      }));

      it('link; todo: overgreedy', testRegex({
        regex: RGX.GET.FILENAME,
        content: 'some text reftype::[[wikilink]].',
        match: [
          '[[wikilink]]',
          'wikilink',
        ],
      }));

    });

  });

});
