/*
 * note: periods are added to the end of test wikilinks to illustrate that they
 * really are 'inline' elements.
 */

import type { WikiRefTestCase } from '../types';


export const wikiLinkMixedCases: WikiRefTestCase[] = [
  {
    descr: 'wikilink; mixed; untyped first, with regular text sprinkled in',
    mkdn: 'some [[fname-a]] link :linktype::[[fname-a]].\n',
    html: '<p>some <a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a> link <a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  },
  {
    descr: 'wikilink; mixed; typed first, with regular text sprinkled in',
    mkdn: 'some :linktype::[[fname-a]] link [[fname-a]].\n',
    html: '<p>some <a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a> link <a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  }
];
