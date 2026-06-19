/*
 * note: newlines are added to the end of test wikiattrs to illustrate that they
 * really are 'block' elements.
 */

import type { WikiRefTestCase } from '../types';


export const wikiAttrMixedCases: WikiRefTestCase[] = [
  // single / list
  {
    descr: 'wikiattr; mixed; single + list',
    mkdn: ':attrtype1::[[fname-a]]\n'
        + ':attrtype2::\n'
        + '- [[fname-b]]\n'
        + '- [[fname-c]]\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<dt>attrtype1</dt>\n'
        + '<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '<dt>attrtype2</dt>\n'
        + '<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>\n'
        + '</dl>\n'
        + '</aside>\n',
  },

  // prefixed / unprefixed

  // w/ (deactivated) caml syntax
  {
    descr: 'wikiattr; mixed; wikirefs + caml; wiki single, caml single',
    mkdn: ':attrtype1::[[fname-a]]\n'
        + ':attrtype2::string\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<dt>attrtype1</dt>\n'
        + '<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '</dl>\n'
        + '</aside>\n'
        + '<p>:attrtype2::string</p>\n',
  },
  {
    descr: 'wikiattr; mixed; wikirefs + caml; wiki multi single, caml multi single',
    mkdn: ':attrtype1::[[fname-a]]\n'
        + ':attrtype2::[[fname-b]]\n'
        + ':attrtype3::string\n'
        + ':attrtype4::string\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<dt>attrtype1</dt>\n'
        + '<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '<dt>attrtype2</dt>\n'
        + '<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</dl>\n'
        + '</aside>\n'
        + '<p>:attrtype3::string\n:attrtype4::string</p>\n',
  },
  {
    descr: 'wikiattr; mixed; wikirefs + caml; wiki multi single, caml mkdn list',
    mkdn: ':attrtype1::[[fname-a]]\n'
        + ':attrtype2::[[fname-b]]\n'
        + ':attrtype3::\n'
        + '- string\n'
        + '- string\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<dt>attrtype1</dt>\n'
        + '<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '<dt>attrtype2</dt>\n'
        + '<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</dl>\n'
        + '</aside>\n'
        + '<p>:attrtype3::</p>\n'
        + '<ul>\n'
        + '<li>string</li>\n'
        + '<li>string</li>\n'
        + '</ul>\n',
  },
  {
    descr: 'wikiattr; mixed; wikirefs + caml; wiki mkdn list, caml two single',
    mkdn: ':attrtype1::\n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n'
        + ':attrtype2::string\n'
        + ':attrtype3::string\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<dt>attrtype1</dt>\n'
        + '<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</dl>\n'
        + '</aside>\n'
        + '<p>:attrtype2::string\n:attrtype3::string</p>\n',
  },
  {
    descr: 'wikiattr; mixed; wikirefs + caml; wiki mkdn list, caml mkdn list',
    mkdn: ':attrtype1::\n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n'
        + ':attrtype2::\n'
        + '- string\n'
        + '- string\n',
    html: '<aside class="attrbox">\n'
        + '<dl>\n'
        + '<dt>attrtype1</dt>\n'
        + '<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>\n'
        + '<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>\n'
        + '</dl>\n'
        + '</aside>\n'
        + '<p>:attrtype2::</p>\n'
        + '<ul>\n'
        + '<li>string</li>\n'
        + '<li>string</li>\n'
        + '</ul>\n',
  },
];
