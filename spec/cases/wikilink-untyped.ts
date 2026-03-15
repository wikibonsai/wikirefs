/*
 * note: periods are added to the end of test wikilinks to illustrate that they
 * really are 'link' elements.
 */

import type { WikiRefTestCase } from '../types';


export const wikiLinkUntypedCases: WikiRefTestCase[] = [
  {
    descr: 'wikilink; untyped; base',
    mkdn: '[[fname-a]]',
    html: '<p><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></p>\n',
  },
  {
    descr: 'wikilink; untyped; base (safe)',
    mkdn: '[[fname-a]].',
    html: '<p><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  },
  // {
  //   descr: 'wikilink; untyped; all valid filename chars',
  //   mkdn: '[[]].',
  //   html: '<p><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  // },
  {
    descr: 'wikilink; untyped; w/ prior newline (for test suite parity)',
    mkdn: '\n[[fname-a]].',
    html: '<p><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  },
  {
    descr: 'wikilink; untyped; with surrounding text',
    mkdn: 'here is some text, [[fname-a]], and some other text.',
    html: '<p>here is some text, <a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>, and some other text.</p>\n',
  },
  {
    descr: 'wikilink; untyped; allow single char for filename link',
    mkdn: '[[a]].',
    html: '<p><a class="wiki link" href="/tests/fixtures/a" data-href="/tests/fixtures/a">a</a>.</p>\n',
  },
  {
    descr: 'wikilink; untyped; padded whitespace not allowed with brackets',
    mkdn: '[[ fname-a ]].',
    html: '<p><a class="wiki link invalid">[[ fname-a ]]</a>.</p>\n',
  },
  // 'fname-' config functions
  // render fallback
  {
    descr: 'wikilink; untyped; render fallback; no \'htmlText\'',
    mkdn: '[[no-html-text]].',
    html: '<p><a class="wiki link" href="/tests/fixtures/no-html-text" data-href="/tests/fixtures/no-html-text">no-html-text</a>.</p>\n',
  },
  {
    descr: 'wikilink; untyped; render fallback; no \'htmlText\'; labelled',
    mkdn: '[[no-html-text|[bracketted] label txt]].',
    html: '<p><a class="wiki link" href="/tests/fixtures/no-html-text" data-href="/tests/fixtures/no-html-text">[bracketted] label txt</a>.</p>\n',
  },
  // invalid
  {
    descr: 'wikilink; untyped; invalid; no \'htmlHref\'',
    mkdn: '[[no-html-href]].',
    html: '<p><a class="wiki link invalid">[[no-html-href]]</a>.</p>\n',
  },
  {
    descr: 'wikilink; untyped; invalid; no \'htmlHref\'; labelled',
    mkdn: '[[no-html-href|[bracketted] label txt]].',
    html: '<p><a class="wiki link invalid">[[no-html-href|[bracketted] label txt]]</a>.</p>\n',
  },
  // escaped
  {
    descr: 'wikilink; untyped; escaped; code span',
    mkdn: '`[[fname-a]]`.',
    html: '<p><code>[[fname-a]]</code>.</p>\n',
  },
  {
    descr: 'wikilink; untyped; escaped; backslash',
    mkdn: '\\[\\[fname-a\\]\\].',
    html: '<p>[[fname-a]].</p>\n',
  },
  {
    descr: 'wikilink; untyped; escaped; whitespace prefix >= 4 spaces',
    mkdn: '    [[fname-a]].',
    html: '<pre><code>[[fname-a]].\n</code></pre>\n',
  },
  // multi
  {
    descr: 'wikilink; untyped; multi; basic',
    mkdn: 'Here are [[fname-a]] [[fname-b]] to [[fname-c]].',
    html: '<p>Here are <a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a> <a class="wiki link" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a> to <a class="wiki link" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a>.</p>\n',
  },
  {
    descr: 'wikilink; untyped; multi; w/ same name',
    mkdn: 'Here are [[fname-a]] [[fname-a]].',
    html: '<p>Here are <a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a> <a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  },
  // header
  {
    descr: 'wikilink; untyped; header; base; kebab-case',
    mkdn: '[[fname-a#header-text]].',
    html: '<p><a class="wiki link" href="/tests/fixtures/fname-a#header-text" data-href="/tests/fixtures/fname-a#header-text">title a</a>.</p>\n',
  },
  {
    descr: 'wikilink; untyped; header; base; Title Case',
    mkdn: '[[fname-a#Header Text]].',
    html: '<p><a class="wiki link" href="/tests/fixtures/fname-a#header-text" data-href="/tests/fixtures/fname-a#header-text">title a</a>.</p>\n',
  },
  {
    descr: 'wikilink; untyped; header; setext; kebab-case',
    mkdn: '[[fname-a#setext-h1]].',
    html: '<p><a class="wiki link" href="/tests/fixtures/fname-a#setext-h1" data-href="/tests/fixtures/fname-a#setext-h1">title a</a>.</p>\n',
  },
  {
    descr: 'wikilink; untyped; header; setext; Title Case',
    mkdn: '[[fname-a#Setext H1]].',
    html: '<p><a class="wiki link" href="/tests/fixtures/fname-a#setext-h1" data-href="/tests/fixtures/fname-a#setext-h1">title a</a>.</p>\n',
  },
  {
    descr: 'wikilink; untyped; header; empty',
    mkdn: '[[fname-a#]].',
    html: '<p><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  },
  // labelled
  {
    descr: 'wikilink; untyped; labelled; base',
    mkdn: '[[fname-a|label txt]].',
    html: '<p><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">label txt</a>.</p>\n',
  },
  {
    descr: 'wikilink; untyped; labelled; empty label',
    mkdn: '[[fname-a|]].',
    html: '<p>[[fname-a|]].</p>\n',
  },
  {
    descr: 'wikilink; untyped; labelled; w/ [single brackets]',
    mkdn: '[[fname-a|[bracketted] label txt]].',
    html: '<p><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">[bracketted] label txt</a>.</p>\n',
  },
  {
    descr: 'wikilink; untyped; labelled; w/ newline does not trigger attr',
    mkdn: '[[fname-a|label]]\n',
    html: '<p><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">label</a></p>\n',
  },
  {
    descr: 'wikilink; untyped; labelled; header; kebab-case',
    mkdn: '[[fname-a#header-text|label]].',
    html: '<p><a class="wiki link" href="/tests/fixtures/fname-a#header-text" data-href="/tests/fixtures/fname-a#header-text">label</a>.</p>\n',
  },
  {
    descr: 'wikilink; untyped; labelled; header; Title Case',
    mkdn: '[[fname-a#Header Text|label]].',
    html: '<p><a class="wiki link" href="/tests/fixtures/fname-a#header-text" data-href="/tests/fixtures/fname-a#header-text">label</a>.</p>\n',
  },
  // alongside/within other markdown constructs
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; bold',
    mkdn: '**[[fname-a]]**',
    html: '<p><strong><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></strong></p>\n',
  },
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; bold; no \'htmlHref\'',
    mkdn: '**[[no-html-href]]**',
    html: '<p><strong><a class="wiki link invalid">[[no-html-href]]</a></strong></p>\n',
  },
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; italics',
    mkdn: '_[[fname-a]]_',
    html: '<p><em><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></em></p>\n'
  },
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; italics; no \'htmlHref\'',
    mkdn: '_[[no-html-href]]_',
    html: '<p><em><a class="wiki link invalid">[[no-html-href]]</a></em></p>\n'
  },
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; markdown links',
    mkdn: '[[fname-a]] and [a link](www.example.com)',
    html: '<p><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a> and <a href="www.example.com">a link</a></p>\n',
  },
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; reference markdown links',
    mkdn: '[[fname-a]] and [a link][ref-link]\n'
        + '\n'
        + '[ref-link]: <www.example.com>',
    html: '<p><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a> and <a href="www.example.com">a link</a></p>\n',
  },
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; headers',
    mkdn: '\n'
        + '# [[fname-a]]\n',
    html: '<h1><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></h1>\n',
  },
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; headers; no \'htmlHref\'',
    mkdn: '\n'
        + '# [[no-html-href]]\n',
    html: '<h1><a class="wiki link invalid">[[no-html-href]]</a></h1>\n',
  },
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; blockquote',
    mkdn: '> [[fname-a]]',
    html: '<blockquote>\n'
        + '<p><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></p>\n'
        + '</blockquote>\n',
  },
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; blockquote; no \'htmlHref\'',
    mkdn: '> [[no-html-href]]',
    html: '<blockquote>\n'
        + '<p><a class="wiki link invalid">[[no-html-href]]</a></p>\n'
        + '</blockquote>\n',
  },
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; list',
    mkdn: '\n'
        + '- [[fname-a]]\n'
        + '- some text.\n',
    html: '<ul>\n'
        + '<li><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></li>\n'
        + '<li>some text.</li>\n'
        + '</ul>\n',
  },
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; list; no \'htmlHref\'',
    mkdn: '\n'
        + '- [[no-html-href]]\n'
        + '- some text.\n',
    html: '<ul>\n'
        + '<li><a class="wiki link invalid">[[no-html-href]]</a></li>\n'
        + '<li>some text.</li>\n'
        + '</ul>\n',
  },
  // gfm
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; gfm; strikethrough; valid wikilink',
    mkdn: '~~[[fname-a]]~~',
    html: '<p><del><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></del></p>\n',
  },
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; gfm; strikethrough; invalid wikilink',
    mkdn: '~~[[no-html-href]]~~',
    html: '<p><del><a class="wiki link invalid">[[no-html-href]]</a></del></p>\n',
  },
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; gfm; footnote',
    mkdn: 'Here is[^1] [[fname-a]].\n'
        + '\n'
        + '[^1]: A footnote with [[fname-b]].',
    html: 'warn: markdown footnotes don\'t seem to have a standardized html format -- please supply target footnote html here',
  },
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; gfm; tables; valid wikilink',
    mkdn: '| [[fname-a]]      | Text Descr |\n'
        + '| ---------------- | ---------- |\n'
        + '| [[fname-b]]      | Title      |\n',
    html: '<table>\n'
        +   '<thead>\n'
        +     '<tr>\n'
        +       '<th><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></th>\n'
        +       '<th>Text Descr</th>\n'
        +     '</tr>\n'
        +   '</thead>\n'
        +   '<tbody>\n'
        +     '<tr>\n'
        +       '<td><a class="wiki link" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></td>\n'
        +       '<td>Title</td>\n'
        +     '</tr>\n'
        +   '</tbody>\n'
        + '</table>\n',
  },
  {
    descr: 'wikilink; untyped; w/ other mkdn constructs; gfm; tables; invalid wikilink',
    mkdn: '| [[no-html-href]]  | Text Descr |\n'
        + '| ----------------- | ---------- |\n'
        + '| [[no-html-href]]  | Text       |\n',
    html: '<table>\n'
        +   '<thead>\n'
        +     '<tr>\n'
        +       '<th><a class="wiki link invalid">[[no-html-href]]</a></th>\n'
        +       '<th>Text Descr</th>\n'
        +     '</tr>\n'
        +   '</thead>\n'
        +   '<tbody>\n'
        +     '<tr>\n'
        +       '<td><a class="wiki link invalid">[[no-html-href]]</a></td>\n'
        +       '<td>Text</td>\n'
        +     '</tr>\n'
        +   '</tbody>\n'
        + '</table>\n',
  },
  // malformed
  {
    descr: 'wikilink; untyped; malformed; empty filename',
    mkdn: '[[]].',
    html: '<p>[[]].</p>\n',
  },
  {
    descr: 'wikilink; untyped; malformed; partial',
    mkdn: '[fname-a].',
    html: '<p>[fname-a].</p>\n',
  },
];
