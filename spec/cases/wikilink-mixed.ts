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
  },
  {
    descr: 'wikilink; mixed; header and non-header',
    mkdn: 'see [[fname-a#header]] and [[fname-b]].\n',
    html: '<p>see <a class="wiki link" href="/tests/fixtures/fname-a#header" data-href="/tests/fixtures/fname-a#header">title a</a> and <a class="wiki link" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a>.</p>\n',
  },
  {
    descr: 'wikilink; mixed; header and non-header; setext',
    mkdn: 'see [[fname-a#setext-h1]] and [[fname-b]].\n',
    html: '<p>see <a class="wiki link" href="/tests/fixtures/fname-a#setext-h1" data-href="/tests/fixtures/fname-a#setext-h1">title a</a> and <a class="wiki link" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a>.</p>\n',
  },
];
