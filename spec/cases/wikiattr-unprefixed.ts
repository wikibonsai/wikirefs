/*
 * note: newlines are added to the end of test wikiattrs to illustrate that they
 * really are 'attr' elements.
 */

import type { WikiRefTestCase } from '../types';

export const wikiAttrUnprefixedCases: WikiRefTestCase[] = [
  // single
  {
    descr: 'wikiattr; unprefixed; single; base',
    mkdn: 'attrtype::[[fname-a]]',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; base (safe)',
    mkdn: 'attrtype::[[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; slugify (uppercase -> lowercase; whitespace -> dash; rm non-alpha-numeric',
    mkdn: ':Attr Type&::[[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>Attr Type&</dt>\n'
        +     '<dd><a class="attr wiki reftype__attr-type" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; w/ prior newline',
    mkdn: '\nattrtype::[[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; padded whitespace allowed around attrtype construct',
    mkdn: 'attrtype :: [[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; long whitespace before attrtype special char (::)',
    mkdn: 'attrtype     :: [[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; long whitespace after attrtype special char (::) not allowed',
    mkdn: 'attrtype ::     [[fname-a]]\n',
    html: '<p>attrtype ::     <a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; renders at top of content',
    mkdn: 'some text.\n\nattrtype::[[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n'
        + '<p>some text.</p>\n',
  },
  // escaped
  {
    descr: 'wikiattr; unprefixed; single; escaped; code fence',
    mkdn: '`attrtype::[[fname-a]]`\n',
    html: '<p><code>attrtype::[[fname-a]]</code></p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; escaped; backslash',
    mkdn: 'attrtype\\::\\[[fname-a]]\n',
    html: '<p>attrtype::[[fname-a]]</p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; escaped; whitespace prefix >= 4 spaces',
    mkdn: '    attrtype::[[fname-a]]\n',
    html: '<pre><code>attrtype::[[fname-a]]\n</code></pre>\n',
  },
  // 'fname-' config functions
  // render fallback
  {
    descr: 'wikiattr; unprefixed; single; render fallback; no \'htmlText\'',
    mkdn: 'attrtype::[[no-html-text]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/no-html-text" data-href="/tests/fixtures/no-html-text">no-html-text</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  // invalid
  {
    descr: 'wikiattr; unprefixed; single; invalid; no \'htmlHref\'',
    mkdn: 'attrtype::[[no-html-href]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki invalid">[[no-html-href]]</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  // multi
  {
    descr: 'wikiattr; unprefixed; single; multi; w/o space',
    mkdn: 'attrtype-1::[[fname-a]]\n'
        + 'attrtype-2::[[fname-b]]\n'
        + 'attrtype-3::[[fname-c]]\n', 
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-1</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-3</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; w/ space',
    mkdn: 'attrtype-1::[[fname-a]]\n'
        + '\n'
        + 'attrtype-2::[[fname-b]]\n'
        + '\n'
        + 'attrtype-3::[[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-1</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-3</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; variable space before attrtype special char (::)',
    mkdn: 'attrtype-1 :: [[fname-a]]\n'
        + 'attrtype-2  :: [[fname-b]]\n'
        + 'attrtype-3     :: [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-1</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-3</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; variable space before attrtype special char (::) should not exceed 4 spaces (past prior attrtype)',
    mkdn: 'attrtype-1 :: [[fname-a]]\n'
        + 'attrtype-2  :: [[fname-b]]\n'
        + 'attrtype-3       :: [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-1</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-3</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; error; only one (optional) space allowed after attrtype special char (::)',
    mkdn: 'attrtype-1 :: [[fname-a]]\n'
        + 'attrtype-2  :: [[fname-b]]\n'
        + 'attrtype-3  ::  [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-1</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<p>attrtype-3  ::  <a class="wiki link" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; merge; no duplicates',
    mkdn: 'attrtype-1::[[fname-a]]\n'
        + 'attrtype-2::[[fname-b]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-1</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; merge; duplicate attrtypes (merged), different filenames (preserved)',
    mkdn: 'attrtype::[[fname-a]]\n'
        + 'attrtype::[[fname-b]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; merge; duplicate attrtype (merged), duplicate filenames (preserved)',
    mkdn: 'attrtype::[[fname-a]]\n'
        + 'attrtype::[[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; merge; with text in between',
    mkdn: 'attrtype-1::[[fname-a]]\n'
        + 'some in between text\n'
        + 'attrtype-2::[[fname-b]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-1</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<p>some in between text</p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; can start on line other than first line; w/ space',
    mkdn: 'some random text.\n'
        + '\n'
        + 'attrtype-1::[[fname-a]]\n'
        + 'attrtype-2::[[fname-b]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-1</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<p>some random text.</p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; can start on line other than first line; w/o space',
    mkdn: 'some random text.\n'
        + 'attrtype-1::[[fname-a]]\n'
        + 'attrtype-2::[[fname-b]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-1</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<p>some random text.</p>\n',
  },
  // list
  // comma-separated
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; w/o whitespace pad',
    mkdn: 'attrtype::[[fname-a]],[[fname-b]],[[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; w/ full whitespace pad',
    mkdn: 'attrtype :: [[fname-a]] , [[fname-b]] , [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; w/ comma whitespace prefix pad',
    mkdn: 'attrtype::[[fname-a]] ,[[fname-b]] ,[[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; w/ comma whitespace suffix pad',
    mkdn: 'attrtype::[[fname-a]], [[fname-b]], [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; merge; no duplicates',
    mkdn: 'attrtype-1::[[fname-a]],[[fname-b]]\n'
        + 'attrtype-2::[[fname-c]],[[fname-d]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-1</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-d" data-href="/tests/fixtures/fname-d">title d</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; multi; merge; duplicate attrtypes (merged), different filenames (preserved)',
    mkdn: 'attrtype::[[fname-a]],[[fname-b]]\n'
        + 'attrtype::[[fname-c]],[[fname-d]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-d" data-href="/tests/fixtures/fname-d">title d</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; multi; merge; duplicate attrtype (merged), duplicate filenames (preserved)',
    mkdn: 'attrtype::[[fname-a]],[[fname-b]]\n'
        + 'attrtype::[[fname-a]],[[fname-b]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; merge; with text in between',
    mkdn: 'attrtype-1::[[fname-a]]\n'
        + 'some in between text\n'
        + 'attrtype-2::[[fname-b]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-1</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<p>some in between text</p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; immediate text before',
    mkdn: 'some random text.\n'
        + 'attrtype::[[fname-a]],[[fname-b]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<p>some random text.</p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; immediate text after',
    mkdn: 'attrtype::[[fname-a]],[[fname-b]]\n'
        + 'some random text.\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<p>some random text.</p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; text before, on same line (should not be at attr)',
    error: true,
    // note: since unprefixed attrtype text is so inclusive, the "random text" that comes before has to include an invalid char or else the entire string is just parsed as attrtype text
    mkdn:'some random text! attrtype::[[fname-a]],[[fname-b]]\n',
    html: '<p>some random text! attrtype::<a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>,<a class="wiki link" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; text after, on same line (should not be at attr)',
    error: true,
    mkdn: 'attrtype::[[fname-a]],[[fname-b]] some random text.\n',
    html: '<p>attrtype::<a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>,<a class="wiki link" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a> some random text.</p>\n',
  },
  // mkdn-separated
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; kind; dash',
    mkdn: 'attrtype::\n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n'
        + '- [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; kind; plus',
    mkdn: 'attrtype::\n'
        + '+ [[fname-a]]\n'
        + '+ [[fname-b]]\n'
        + '+ [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; kind; asterisk',
    mkdn: 'attrtype::\n'
        + '* [[fname-a]]\n'
        + '* [[fname-b]]\n'
        + '* [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; kind; mixed',
    mkdn: 'attrtype::\n'
        + '- [[fname-a]]\n'
        + '+ [[fname-b]]\n'
        + '* [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; whitespace; none',
    mkdn: 'attrtype::\n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n'
        + '- [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; whitespace; pad',
    mkdn: 'attrtype ::\n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n'
        + '- [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; whitespace; pretty (does not trigger indentented code)',
    mkdn: 'attrtype ::\n'
        + '            - [[fname-a]]\n'
        + '            - [[fname-b]]\n'
        + '            - [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; whitespace; item whitespace prefix; 2 space',
    mkdn: 'attrtype::\n'
        + '  - [[fname-a]]\n'
        + '  - [[fname-b]]\n'
        + '  - [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; whitespace; item whitespace prefix; variable',
    mkdn: 'attrtype::\n'
        + '- [[fname-a]]\n'
        + '  - [[fname-b]]\n'
        + '    - [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; whitespace; attrtype char (::) whitespace; variable',
    mkdn: 'attrtype     :: \n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n'
        + '- [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; merge; no duplicates',
    mkdn: 'attrtype-1::\n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n'
        + 'attrtype-2::\n'
        + '- [[fname-c]]\n'
        + '- [[fname-d]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-1</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-d" data-href="/tests/fixtures/fname-d">title d</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; multi; merge; duplicate attrtypes (merged), different filenames (preserved)',
    mkdn: 'attrtype::\n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n'
        + 'attrtype::\n'
        + '- [[fname-c]]\n'
        + '- [[fname-d]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-d" data-href="/tests/fixtures/fname-d">title d</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; multi; merge; duplicate attrtype (merged), duplicate filenames (preserved)',
    mkdn: 'attrtype::\n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n'
        + 'attrtype::\n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        +   '</aside>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; multi; merge; with text in between',
    mkdn: 'attrtype-1::\n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n'
        + 'some in between text\n'
        + 'attrtype-2::\n'
        + '- [[fname-c]]\n'
        + '- [[fname-d]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-1</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-d" data-href="/tests/fixtures/fname-d">title d</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<p>some in between text</p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; does not handle lazy lines',
    error: true,
    mkdn: 'attrtype::\n'
        + '- [[fname-a]]\n'
        + '\n'
        + '- [[fname-b]]\n'
        + '- [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<ul>\n'
        + '<li><a class="wiki link" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></li>\n'
        + '<li><a class="wiki link" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></li>\n'
        + '</ul>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; ensure not overreaching to lists containing wikilinks',
    mkdn: 'attrtype::\n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n'
        + '\n'
        + 'some random text.\n'
        + '\n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<p>some random text.</p>\n'
        + '<ul>\n'
        + '<li><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></li>\n'
        + '<li><a class="wiki link" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></li>\n'
        + '</ul>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; immediate text before',
    mkdn: 'some random text.\n'
        + 'attrtype::\n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<p>some random text.</p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; immediate text after',
    mkdn: 'attrtype::\n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n'
        + 'some random text.\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<p>some random text.</p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; empty list, turned setext header',
    error: true,
    mkdn: 'attrtype::\n'
        + '- \n',
    html: '<h2>attrtype::</h2>\n',
  },
  // mkdn / comma
  {
    descr: 'wikiattr; unprefixed; list; comma / mkdn lists do not mix',
    error: true,
    mkdn: 'attrtype::[[fname-a]]\n'
        + '- [[fname-b]]\n'
        + '- [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<ul>\n'
        + '<li><a class="wiki link" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></li>\n'
        + '<li><a class="wiki link" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></li>\n'
        + '</ul>\n',
  },
  // alongside other markdown constructs
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; near headers; before',
    mkdn: 'attrtype::[[fname-a]]\n'
        + '\n'
        + '# a header\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<h1>a header</h1>\n',
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; near headers; immediate before',
    mkdn: 'attrtype::[[fname-a]]\n'
        + '# a header\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<h1>a header</h1>\n',
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; near headers; after',
    mkdn: '# a header\n'
        + '\n'
        + 'attrtype::[[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<h1>a header</h1>\n',
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; near headers; immediate after',
    mkdn: '# a header\n'
        + 'attrtype::[[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<h1>a header</h1>\n',
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; near lists; before',
    mkdn: 'attrtype::[[fname-a]]\n'
        + '\n'
        + '- list-item-1\n'
        + '- list-item-2\n'
        + '- list-item-3\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<ul>\n'
        + '<li>list-item-1</li>\n'
        + '<li>list-item-2</li>\n'
        + '<li>list-item-3</li>\n'
        + '</ul>\n',
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; near lists; immediate before',
    mkdn: 'attrtype::[[fname-a]]\n'
        + '- list-item-1\n'
        + '- list-item-2\n'
        + '- list-item-3\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<ul>\n'
        + '<li>list-item-1</li>\n'
        + '<li>list-item-2</li>\n'
        + '<li>list-item-3</li>\n'
        + '</ul>\n',
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; near lists; after',
    mkdn: '- list-item-1\n'
        + '- list-item-2\n'
        + '- list-item-3\n'
        + '\n'
        + 'attrtype::[[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<ul>\n'
        + '<li>list-item-1</li>\n'
        + '<li>list-item-2</li>\n'
        + '<li>list-item-3</li>\n'
        + '</ul>\n',
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; near lists; immediate after',
    mkdn: '- list-item-1\n'
        + '- list-item-2\n'
        + '- list-item-3\n'
        + 'attrtype::[[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<ul>\n'
        + '<li>list-item-1</li>\n'
        + '<li>list-item-2</li>\n'
        + '<li>list-item-3</li>\n'
        + '</ul>\n',
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; near blockquotes; before',
    mkdn: 'attrtype::[[fname-a]]\n'
        + '\n'
        + '> some text\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<blockquote>\n'
        + '<p>some text</p>\n'
        + '</blockquote>\n',
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; near blockquotes; immediate before',
    mkdn: 'attrtype::[[fname-a]]\n'
        + '> some text\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<blockquote>\n'
        + '<p>some text</p>\n'
        + '</blockquote>\n',
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; near blockquotes; after',
    mkdn: '> some text\n'
        + '\n'
        + 'attrtype::[[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<blockquote>\n'
        + '<p>some text</p>\n'
        + '</blockquote>\n',
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; near blockquotes; immediate after',
    mkdn: '> some text\n'
        + 'attrtype::[[fname-a]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<blockquote>\n'
        + '<p>some text</p>\n'
        + '</blockquote>\n',
  },
  // nested
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; nested; list; not allowed inside',
    mkdn: '- attrtype::[[fname-a]]\n',
    html: '<ul>\n'
        + '<li>attrtype::<a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></li>\n'
        + '</ul>\n',
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; nested; blockquote; not allowed inside',
    mkdn: '> attrtype::[[fname-a]]\n',
    html: '<blockquote>\n'
        + '<p>attrtype::<a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></p>\n'
        + '</blockquote>\n',
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; nested; gfm; footnote',
    mkdn: '\n'
        + '[^fn]\n'
        + '[^fn]: attrtype::[[fname-a]]\n',
    html: 'warn: markdown footnotes don\'t seem to have a standardized html format -- please supply target footnote html here',
  },
  // malformed
  {
    descr: 'wikiattr; unprefixed; malformed; single; multi; w/ extraneous chars and newline',
    mkdn: 'attrtype-1::[[fname-a]]jj\n'
        + '\n'
        + 'attrtype-2::[[fname-b]]\n'
        + 'attrtype-3::[[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-3</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<p>attrtype-1::<a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>jj</p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; malformed; single; multi; w/ extraneous chars and no newline',
    mkdn: 'attrtype-1::[[fname-a]]jj\n'
        + 'attrtype-2::[[fname-b]]\n'
        + 'attrtype-3::[[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-3</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<p>attrtype-1::<a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>jj</p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; malformed; single; multi; w/ a blank value',
    mkdn: 'attrtype-1::\n'
        + 'attrtype-2::[[fname-b]]\n'
        + 'attrtype-3::[[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-3</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<p>attrtype-1::</p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; malformed; single; multi; single square brackets, first',
    mkdn: 'attrtype-1::[fname-a]\n'
        + 'attrtype-2::[[fname-b]]\n'
        + 'attrtype-3::[[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-2</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-3</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<p>attrtype-1::[fname-a]</p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; malformed; single; multi; single square brackets, second',
    mkdn: 'attrtype-1::[[fname-a]]\n'
        + 'attrtype-2::[fname-b]\n'
        + 'attrtype-3::[[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        +   '<dl>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-1</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</div>\n'
        + '<div class="attr-item">\n'
        +     '<dt>attrtype-3</dt>\n'
        +     '<dd><a class="attr wiki reftype__attrtype-3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</div>\n'
        +   '</dl>\n'
        + '</aside>\n'
        + '<p>attrtype-2::[fname-b]</p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; malformed; list; comma-separated; items not [[bracketed]]',
    mkdn: 'attrtype-3::string,string\n',
    html: '<p>attrtype-3::string,string</p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; malformed; list; mkdn-separated; items not [[bracketed]]',
    mkdn: 'attrtype-3::\n'
        + '- string\n'
        + '- string\n',
    html: '<p>attrtype-3::</p>\n'
        + '<ul>\n'
        + '<li>string</li>\n'
        + '<li>string</li>\n'
        + '</ul>\n',
  },
  {
    descr: 'wikiattr; unprefixed; malformed; headers not supported in wikiattrs',
    mkdn: 'attrtype::[[fname-a#header-text]]\n',
    html: '<p>attrtype::<a class="wiki link" href="/tests/fixtures/fname-a#header-text" data-href="/tests/fixtures/fname-a#header-text">title a</a></p>\n',
  },
];
