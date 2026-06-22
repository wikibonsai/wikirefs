import assert from 'node:assert/strict';

import { RGX, MatchAttr } from '../src';


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
        content: ':attrtype::\n'
        + '- [[wikilink-1]]\n'
        + '- [[wikilink-2]]\n'
        + '- [[wikilink-3]]\n',
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
        content: ':attrtype::\n'
        + '- [[wikilink-1]]\n'
        + '- [[wikilink-2]]\n'
        + '- [[wikilink-3]]\n',
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

    describe('ATTR', () => {

      it('unprefixed; single; end of line', testRegex({
        regex: RGX.WIKI._ATTR,
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
        regex: RGX.WIKI._ATTR,
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
        regex: RGX.WIKI._ATTR,
        content: 'attrtype::[[wikilink|label]]\n',
        match: null,
      }));

      it('unprefixed; list; comma', testRegex({
        regex: RGX.WIKI._ATTR,
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
        regex: RGX.WIKI._ATTR,
        content: 'attrtype::\n'
        + '- [[wikilink-1]]\n'
        + '- [[wikilink-2]]\n'
        + '- [[wikilink-3]]\n',
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
        regex: RGX.WIKI._ATTR,
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
        regex: RGX.WIKI._ATTR,
        content: ':attrtype::[[wikilink|label]]\n',
        match: null,
      }));

      it('prefixed; list; comma', testRegex({
        regex: RGX.WIKI._ATTR,
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
        regex: RGX.WIKI._ATTR,
        content: ':attrtype::\n'
        + '- [[wikilink-1]]\n'
        + '- [[wikilink-2]]\n'
        + '- [[wikilink-3]]\n',
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

    describe('ATTR() function', () => {

      it('unprefixed; single', () => {
        const results: MatchAttr[] = RGX.WIKI.ATTR('attrtype::[[wikilink]]\n');
        assert.strictEqual(results.length, 1);
        assert.strictEqual(results[0].type[0], 'attrtype');
        assert.strictEqual(results[0].filenames.length, 1);
        assert.strictEqual(results[0].filenames[0][0], 'wikilink');
        assert.strictEqual(results[0].listFormat, 'none');
      });

      it('prefixed; single', () => {
        const results: MatchAttr[] = RGX.WIKI.ATTR(':attrtype::[[wikilink]]\n');
        assert.strictEqual(results.length, 1);
        assert.strictEqual(results[0].type[0], 'attrtype');
        assert.strictEqual(results[0].filenames.length, 1);
        assert.strictEqual(results[0].filenames[0][0], 'wikilink');
        assert.strictEqual(results[0].listFormat, 'none');
      });

      it('list; comma; all filenames extracted', () => {
        const results: MatchAttr[] = RGX.WIKI.ATTR(':attrtype::[[fname-a]], [[fname-b]], [[fname-c]]\n');
        assert.strictEqual(results.length, 1);
        assert.strictEqual(results[0].filenames.length, 3);
        assert.strictEqual(results[0].filenames[0][0], 'fname-a');
        assert.strictEqual(results[0].filenames[1][0], 'fname-b');
        assert.strictEqual(results[0].filenames[2][0], 'fname-c');
        assert.strictEqual(results[0].listFormat, 'comma');
      });

      it('list; mkdn; all filenames extracted', () => {
        const results: MatchAttr[] = RGX.WIKI.ATTR(
          ':attrtype::\n'
          + '- [[fname-a]]\n'
          + '- [[fname-b]]\n'
          + '- [[fname-c]]\n',
        );
        assert.strictEqual(results.length, 1);
        assert.strictEqual(results[0].filenames.length, 3);
        assert.strictEqual(results[0].filenames[0][0], 'fname-a');
        assert.strictEqual(results[0].filenames[1][0], 'fname-b');
        assert.strictEqual(results[0].filenames[2][0], 'fname-c');
        assert.strictEqual(results[0].listFormat, 'mkdn');
      });

      it('multi; single + list (comma)', () => {
        const content = ':type1::[[fname-a]]\n'
          + ':type2::[[fname-b]], [[fname-c]]\n';
        const results: MatchAttr[] = RGX.WIKI.ATTR(content);
        assert.strictEqual(results.length, 2);
        assert.strictEqual(results[0].type[0], 'type1');
        assert.strictEqual(results[0].filenames.length, 1);
        assert.strictEqual(results[1].type[0], 'type2');
        assert.strictEqual(results[1].filenames.length, 2);
      });

      it('attrtype offsets', () => {
        const content = ':attrtype::[[wikilink]]\n';
        const results: MatchAttr[] = RGX.WIKI.ATTR(content);
        assert.strictEqual(results[0].start, 0);
        assert.strictEqual(results[0].type[1], 1); // after ':'
        assert.strictEqual(results[0].filenames[0][1], 13); // after '::['
        assert.strictEqual(content.substring(results[0].filenames[0][1], results[0].filenames[0][1] + 8), 'wikilink');
      });

      it('no matches returns empty array', () => {
        const results: MatchAttr[] = RGX.WIKI.ATTR('no wikirefs here');
        assert.strictEqual(results.length, 0);
      });

      it('labelled; empty', () => {
        const results: MatchAttr[] = RGX.WIKI.ATTR(':attrtype::[[wikilink|]]\n');
        assert.strictEqual(results.length, 0);
      });

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
          undefined,
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
          undefined,
          'label',
        ],
      }));

      describe('header', () => {

        it('untyped; html id (kebab-case)', testRegex({
          regex: RGX.WIKI.LINK,
          content: '[[filename#header-text]].',
          match: [
            '[[filename#header-text]]',
            undefined,
            'filename',
            'header-text',
            undefined,
          ],
        }));

        it('untyped; header text (Title Case)', testRegex({
          regex: RGX.WIKI.LINK,
          content: '[[filename#Header Text]].',
          match: [
            '[[filename#Header Text]]',
            undefined,
            'filename',
            'Header Text',
            undefined,
          ],
        }));

        it('untyped; labelled; header; kebab-case', testRegex({
          regex: RGX.WIKI.LINK,
          content: '[[filename#header-text|See Results]].',
          match: [
            '[[filename#header-text|See Results]]',
            undefined,
            'filename',
            'header-text',
            'See Results',
          ],
        }));

        it('typed; html id (kebab-case)', testRegex({
          regex: RGX.WIKI.LINK,
          content: ':linktype::[[filename#header-text]].',
          match: [
            ':linktype::[[filename#header-text]]',
            'linktype',
            'filename',
            'header-text',
            undefined,
          ],
        }));

        it('typed; labelled; header; Title Case', testRegex({
          regex: RGX.WIKI.LINK,
          content: ':linktype::[[filename#Header Text|See Results]].',
          match: [
            ':linktype::[[filename#Header Text|See Results]]',
            'linktype',
            'filename',
            'Header Text',
            'See Results',
          ],
        }));

        it('untyped; setext; html id (kebab-case)', testRegex({
          regex: RGX.WIKI.LINK,
          content: '[[filename#setext-h1]].',
          match: [
            '[[filename#setext-h1]]',
            undefined,
            'filename',
            'setext-h1',
            undefined,
          ],
        }));

        it('untyped; setext; header text (Title Case)', testRegex({
          regex: RGX.WIKI.LINK,
          content: '[[filename#Setext H1]].',
          match: [
            '[[filename#Setext H1]]',
            undefined,
            'filename',
            'Setext H1',
            undefined,
          ],
        }));

      });

    });

    describe('EMBED', () => {

      it('base', testRegex({
        regex: RGX.WIKI.EMBED,
        content: '![[wikilink]].',
        match: [
          '![[wikilink]]',
          'wikilink',
          undefined,
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

      describe('header', () => {

        it('html id (kebab-case)', testRegex({
          regex: RGX.WIKI.EMBED,
          content: '![[embed-doc#header-text]].',
          match: [
            '![[embed-doc#header-text]]',
            'embed-doc',
            'header-text',
          ],
        }));

        it('header text (Title Case)', testRegex({
          regex: RGX.WIKI.EMBED,
          content: '![[embed-doc#Header Text]].',
          match: [
            '![[embed-doc#Header Text]]',
            'embed-doc',
            'Header Text',
          ],
        }));

        it('empty', testRegex({
          regex: RGX.WIKI.EMBED,
          content: '![[embed-doc#]].',
          match: [
            '![[embed-doc#]]',
            'embed-doc',
            '',
          ],
        }));

        it('setext; html id (kebab-case)', testRegex({
          regex: RGX.WIKI.EMBED,
          content: '![[embed-doc#setext-h1]].',
          match: [
            '![[embed-doc#setext-h1]]',
            'embed-doc',
            'setext-h1',
          ],
        }));

        it('setext; header text (Title Case)', testRegex({
          regex: RGX.WIKI.EMBED,
          content: '![[embed-doc#Setext H1]].',
          match: [
            '![[embed-doc#Setext H1]]',
            'embed-doc',
            'Setext H1',
          ],
        }));

      });

    });

  });

  describe('GET', () => {

    describe('LINKTYPE', () => {

      it('attr; prefixed; list; mkdn', testRegex({
        regex: RGX.GET.LINKTYPE,
        content: ':reftype::\n'
        + '- [[wikilink]]\n',
        match: null,
      }));

      it('attr; prefixed; list; mkdn; pad', testRegex({
        regex: RGX.GET.LINKTYPE,
        content: ': reftype ::\n'
        + '- [[wikilink]]\n',
        match: null,
      }));

      it('attr; unprefixed; list; mkdn', testRegex({
        regex: RGX.GET.LINKTYPE,
        content: 'reftype::\n'
        + '- [[wikilink]]\n',
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
        content: ':reftype::\n'
        + '- [[wikilink]]\n',
        match: [
          ':reftype::\n- [[wikilink]]\n',
          'reftype',
        ],
      }));

      it('attr; prefixed; list; mkdn; pad', testRegex({
        regex: RGX.GET.ATTRTYPE,
        content: ': reftype ::\n'
        + '- [[wikilink]]\n',
        match: [
          ': reftype ::\n- [[wikilink]]\n',
          'reftype ',
          undefined,
          '-',
        ],
      }));

      it('attr; unprefixed; list; mkdn', testRegex({
        regex: RGX.GET.ATTRTYPE,
        content: 'reftype::\n'
        + '- [[wikilink]]\n',
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
        content: ':reftype::\n'
        + '- [[wikilink]]\n',
        match: [
          ':reftype::',
          'reftype',
          undefined,
        ],
      }));

      it('attr; prefixed; list; mkdn; pad', testRegex({
        regex: RGX.GET.REFTYPE,
        content: ': reftype ::\n'
        + '- [[wikilink]]\n',
        match: [
          ': reftype ::',
          'reftype ',
          undefined,
        ],
      }));

      it('attr; unprefixed; list; mkdn', testRegex({
        regex: RGX.GET.REFTYPE,
        content: 'reftype::\n'
        + '- [[wikilink]]\n',
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
        content: ':reftype::\n'
        + '- [[wikilink]]\n',
        match: [
          '[[wikilink]]',
          'wikilink',
        ],
      }));

      it('attr; unprefixed; list; mkdn', testRegex({
        regex: RGX.GET.FILENAME,
        content: 'reftype::\n'
        + '- [[wikilink]]\n',
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

    describe('HEADER', () => {

      // GET.HEADER matches fragment only: #header (group 1) then | or ]]
      it('untyped; html id (kebab-case)', testRegex({
        regex: RGX.GET.HEADER,
        content: '[[filename#header-text]]',
        match: [
          '#header-text]]',
          'header-text',
        ],
      }));

      it('untyped; header text (Title Case)', testRegex({
        regex: RGX.GET.HEADER,
        content: '[[filename#Header Text]]',
        match: [
          '#Header Text]]',
          'Header Text',
        ],
      }));

      it('untyped; with label', testRegex({
        regex: RGX.GET.HEADER,
        content: '[[filename#header-text|See Results]]',
        match: [
          '#header-text|',
          'header-text',
        ],
      }));

      it('typed', testRegex({
        regex: RGX.GET.HEADER,
        content: ':linktype::[[filename#header-text]].',
        match: [
          '#header-text]]',
          'header-text',
        ],
      }));

      it('typed; labelled; header; Title Case', testRegex({
        regex: RGX.GET.HEADER,
        content: ':linktype::[[filename#Header Text|See Results]].',
        match: [
          '#Header Text|',
          'Header Text',
        ],
      }));

      it('untyped; setext; html id (kebab-case)', testRegex({
        regex: RGX.GET.HEADER,
        content: '[[filename#setext-h1]]',
        match: [
          '#setext-h1]]',
          'setext-h1',
        ],
      }));

      it('untyped; setext; header text (Title Case)', testRegex({
        regex: RGX.GET.HEADER,
        content: '[[filename#Setext H1]]',
        match: [
          '#Setext H1]]',
          'Setext H1',
        ],
      }));

    });

  });

  describe('sticky (y-flag) pattern usage', () => {

    // These tests illustrate how the sticky (y) flag works as JS's
    // equivalent of Ruby's \G anchor. The y flag anchors each exec()
    // to lastIndex — if the pattern doesn't match at that exact
    // position, it returns null (unlike 'g' which skips ahead).
    //
    // The actual _STICKY regexes are private to the RGX namespace
    // (used internally by WIKI.ATTR()). These tests reconstruct
    // equivalent patterns to demonstrate the mechanics.

    it('comma items: walks contiguous comma-separated [[items]]', () => {
      const content = ':attrtype::[[fname-a]], [[fname-b]], [[fname-c]]\n';
      // equivalent of _STICKY.ATTR_ITEM_COMMA
      const re = / *,? *\[\[([^\n\r!#:^|[\]]+)\]\] */iy;
      re.lastIndex = 11; // right after '::'
      const filenames: string[] = [];
      let m: RegExpExecArray | null;
      while ((m = re.exec(content)) !== null) {
        filenames.push(m[1]);
      }
      assert.deepStrictEqual(filenames, ['fname-a', 'fname-b', 'fname-c']);
    });

    it('comma items: stops at non-matching position (no skip-ahead)', () => {
      const content = ':attrtype::[[fname-a]], GARBAGE, [[fname-c]]\n';
      const re = / *,? *\[\[([^\n\r!#:^|[\]]+)\]\] */iy;
      re.lastIndex = 11;
      const filenames: string[] = [];
      let m: RegExpExecArray | null;
      while ((m = re.exec(content)) !== null) {
        filenames.push(m[1]);
      }
      // only fname-a matched — sticky stopped at GARBAGE
      assert.deepStrictEqual(filenames, ['fname-a']);
    });

    it('mkdn items: walks contiguous list items', () => {
      const content = ':attrtype::\n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n'
        + '- [[fname-c]]\n';
      // equivalent of _STICKY.ATTR_ITEM_MKDN
      const re = /\n(?: *)([+*-]) (\[\[[^\n\r!#:^|[\]]+\]\])/iy;
      re.lastIndex = 11; // right after '::'
      const filenames: string[] = [];
      let m: RegExpExecArray | null;
      while ((m = re.exec(content)) !== null) {
        filenames.push(m[2].replace(/^\[\[/, '').replace(/\]\]$/, ''));
      }
      assert.deepStrictEqual(filenames, ['fname-a', 'fname-b', 'fname-c']);
    });

    it('y-flag vs g-flag: g skips gaps, y does not', () => {
      const content = '[[a]] GARBAGE [[b]]';
      // g-flag: finds both — skips over GARBAGE
      const gRe = /\[\[([^\]]+)\]\]/g;
      const gResults: string[] = [];
      let gm: RegExpExecArray | null;
      while ((gm = gRe.exec(content)) !== null) { gResults.push(gm[1]); }
      assert.deepStrictEqual(gResults, ['a', 'b']);
      // y-flag: finds only first — stops at GARBAGE
      const yRe = /\[\[([^\]]+)\]\] */y;
      yRe.lastIndex = 0;
      const yResults: string[] = [];
      let ym: RegExpExecArray | null;
      while ((ym = yRe.exec(content)) !== null) { yResults.push(ym[1]); }
      assert.deepStrictEqual(yResults, ['a']);
    });

  });

  describe('_MKDN', () => {

    describe('ATX_HEADER', () => {

      it('matches h1 with space', () => {
        const match = RGX._MKDN.ATX_HEADER.exec('# Heading\n');
        assert.notStrictEqual(match, null);
        assert.strictEqual(match![1].trim(), 'Heading');
      });

      it('matches h2 with space', () => {
        const match = RGX._MKDN.ATX_HEADER.exec('## Heading\n');
        assert.notStrictEqual(match, null);
        assert.strictEqual(match![1].trim(), 'Heading');
      });

      it('matches h6', () => {
        const match = RGX._MKDN.ATX_HEADER.exec('###### Heading\n');
        assert.notStrictEqual(match, null);
        assert.strictEqual(match![1].trim(), 'Heading');
      });

      it('does not match without space after #', () => {
        const match = RGX._MKDN.ATX_HEADER.exec('#NoSpace\n');
        assert.strictEqual(match, null);
      });

      it('does not match 7+ hashes', () => {
        const match = RGX._MKDN.ATX_HEADER.exec('####### Not a heading\n');
        assert.strictEqual(match, null);
      });

      it('matches with tab after #', () => {
        const match = RGX._MKDN.ATX_HEADER.exec('#\tTabbed\n');
        assert.notStrictEqual(match, null);
        assert.strictEqual(match![1].trim(), 'Tabbed');
      });

      it('captures content with trailing hashes stripped by caller', () => {
        const match = RGX._MKDN.ATX_HEADER.exec('## Heading ##\n');
        assert.notStrictEqual(match, null);
        // regex captures everything after space; trailing ## stripping is caller's job
        assert.ok(match![1].includes('Heading'));
      });

    });

  });

});
