/*
 * note: periods are added to the end of test wikilinks to illustrate that they
 * really are 'link' elements.
 */

import type { WikiRefTestCase } from '../types';


export const wikiLinkTypedCases: WikiRefTestCase[] = [
  {
    descr: 'wikilink; typed; base -- this is actually a valid wikiattr!',
    mkdn: ':attrtype::[[fname-a]]',
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikilink; typed; base (safe)',
    mkdn: ':linktype::[[fname-a]].',
    html: '<p><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  },
  {
    descr: 'wikilink; typed; slugify (uppercase -> lowercase; whitespace -> dash; rm non-alpha-numeric-dash-underscore',
    mkdn: ':Link Type&::[[fname-a]].',
    html: '<p><a class="wiki link type reftype__link-type" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  },
  {
    descr: 'wikilink; typed; w/ prior newline',
    mkdn: '\n:linktype::[[fname-a]].',
    html: '<p><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  },
  {
    descr: 'wikilink; typed; padded whitespace allowed around linktype construct',
    mkdn: ': linktype :: [[fname-a]].',
    html: '<p><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  },
  {
    descr: 'wikilink; typed; long whitespace before link type special char (::)',
    mkdn: ': linktype     :: [[fname-a]].',
    html: '<p><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  },
  {
    descr: 'wikilink; typed; long whitespace after link type special char (::)',
    mkdn: ': linktype ::     [[fname-a]].',
    html: '<p>: linktype ::     <a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  },
  // {
  //   descr: 'wikilink; typed; all valid linktype chars',
  //   mkdn: ': ::[[fname-a]].',
  //   html: '<p><a class="wiki link type " href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  // }
  {
    descr: 'wikilink; typed; with surrounding text',
    mkdn: 'here is some text, :linktype::[[fname-a]], and some other text.',
    html: '<p>here is some text, <a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>, and some other text.</p>\n',
  },
  {
    descr: 'wikilink; typed; allow single char for linktype link',
    mkdn: ':a::[[fname-a]].',
    html: '<p><a class="wiki link type reftype__a" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  },
  // render config functions
  // render fallback
  {
    descr: 'wikilink; typed; render fallback; no \'htmlText\'',
    mkdn: ':linktype::[[no-html-text]].',
    html: '<p><a class="wiki link type reftype__linktype" href="/tests/fixtures/no-html-text" data-href="/tests/fixtures/no-html-text">no-html-text</a>.</p>\n',
  },
  {
    descr: 'wikilink; typed; render fallback; no \'htmlText\'; labelled',
    mkdn: ':linktype::[[no-html-text|[bracketted] label txt]].',
    html: '<p><a class="wiki link type reftype__linktype" href="/tests/fixtures/no-html-text" data-href="/tests/fixtures/no-html-text">[bracketted] label txt</a>.</p>\n',
  },
  // invalid
  {
    descr: 'wikilink; typed; invalid; no \'htmlHref\'',
    mkdn: ':linktype::[[no-html-href]].',
    html: '<p><a class="wiki link invalid">:linktype::[[no-html-href]]</a>.</p>\n',
  },
  {
    descr: 'wikilink; typed; invalid; no \'htmlHref\'; labelled',
    mkdn: ':linktype::[[no-html-href|[bracketted] label txt]].',
    html: '<p><a class="wiki link invalid">:linktype::[[no-html-href|[bracketted] label txt]]</a>.</p>\n',
  },
  // escaped
  {
    descr: 'wikilink; typed; escaped; code span',
    mkdn: '`:linktype::[[fname-a]]`.',
    html: '<p><code>:linktype::[[fname-a]]</code>.</p>\n',
  },
  {
    descr: 'wikilink; typed; escaped; backslash',
    mkdn: ':linktype\\:\\:\\[\\[fname-a\\]\\].',
    html: '<p>:linktype::[[fname-a]].</p>\n',
  },
  {
    descr: 'wikilink; typed; escaped; whitespace prefix >= 4 spaces',
    mkdn: '    :linktype::[[fname-a]].',
    html: '<pre><code>:linktype::[[fname-a]].\n</code></pre>\n',
  },
  // multi
  {
    descr: 'wikilink; typed; multi; base',
    mkdn: 'Here are :linktype::[[fname-a]] :linktype::[[fname-b]] to :linktype::[[fname-c]].',
    html: '<p>Here are <a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a> <a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a> to <a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a>.</p>\n',
  },
  {
    descr: 'wikilink; typed; multi; w/ same name',
    mkdn: 'Here are :linktype::[[fname-a]] :linktype::[[fname-a]].',
    html: '<p>Here are <a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a> <a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  },
  // labelled
  {
    descr: 'wikilink; typed; labelled; base',
    mkdn: ':linktype::[[fname-a|label txt]].',
    html: '<p><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">label txt</a>.</p>\n',
  },
  {
    descr: 'wikilink; typed; labelled; empty label',
    mkdn: ':linktype::[[fname-a|]].',
    html: '<p>:linktype::[[fname-a|]].</p>\n',
  },
  {
    descr: 'wikilink; typed; labelled; w/ [single brackets]',
    mkdn: ':linktype::[[fname-a|[bracketted] label txt]].',
    html: '<p><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">[bracketted] label txt</a>.</p>\n',
  },
  {
    descr: 'wikilink; typed; labelled; w/ newline should not trigger attr',
    mkdn: ':linktype::[[fname-a|label]]\n',
    html: '<p><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">label</a></p>\n',
  },
  // alongside/within other markdown constructs
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; bold',
    mkdn: '**:linktype::[[fname-a]]**',
    html: '<p><strong><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></strong></p>\n',
  },
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; bold; no \'htmlHref\'',
    mkdn: '**:linktype::[[no-html-href]]**',
    html: '<p><strong><a class="wiki link invalid">:linktype::[[no-html-href]]</a></strong></p>\n',
  },
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; italics',
    mkdn: '_:linktype::[[fname-a]]_',
    html: '<p><em><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></em></p>\n',
  },
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; italics; no \'htmlHref\'',
    mkdn: '_:linktype::[[no-html-href]]_',
    html: '<p><em><a class="wiki link invalid">:linktype::[[no-html-href]]</a></em></p>\n',
  },
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; markdown links',
    mkdn: ':linktype::[[fname-a]] and [a link](www.example.com)',
    html: '<p><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a> and <a href="www.example.com">a link</a></p>\n',
  },
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; reference markdown links',
    mkdn:
`:linktype::[[fname-a]] and [a link][ref-link]

[ref-link]: <www.example.com>`,
    html: '<p><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a> and <a href="www.example.com">a link</a></p>\n',
  },
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; headers',
    mkdn:
`# :linktype::[[fname-a]]
`,
    html: '<h1><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></h1>\n',
  },
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; headers; no \'htmlHref\'',
    mkdn:
`# :linktype::[[no-html-href]]
`,
    html: '<h1><a class="wiki link invalid">:linktype::[[no-html-href]]</a></h1>\n',
  },
//   {
//     descr: 'wikilink; typed; w/ other mkdn constructs; url',
//     mkdn:
// `<www.example.com>
// [[fname-a]]
// `,
//     html:
// `<p><a href="www.example.com">www.example.com</a><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></p>
// `,
//   },
//   {
//     descr: 'wikilink; typed; w/ other mkdn constructs; angle brackets',
//     mkdn:
// `<some text>
// [[fname-a]]
// `,
//     html:
// `<p><some text><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></p>
// `,
//   },
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; blockquote',
    mkdn: '> :linktype::[[fname-a]]',
    html:
`<blockquote>
<p><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></p>
</blockquote>
`,
  },
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; blockquote; no \'htmlHref\'',
    mkdn: '> :linktype::[[no-html-href]]',
    html:
`<blockquote>
<p><a class="wiki link invalid">:linktype::[[no-html-href]]</a></p>
</blockquote>
`,
  },
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; list',
    mkdn:
`- :linktype::[[fname-a]]
- some text.
`,
    html:
`<ul>
<li><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></li>
<li>some text.</li>
</ul>
`,
  },
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; list; no \'htmlHref\'',
    mkdn:
`- :linktype::[[no-html-href]]
- some text.
`,
    html:
`<ul>
<li><a class="wiki link invalid">:linktype::[[no-html-href]]</a></li>
<li>some text.</li>
</ul>
`,
  },
  // gfm
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; gfm; strikethrough',
    mkdn: '~~:linktype::[[fname-a]]~~',
    html: '<p><del><a class="wiki link type reftype__linktype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></del></p>\n',
  },
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; gfm; strikethrough; no \'htmlHref\'',
    mkdn: '~~:linktype::[[no-html-href]]~~',
    html: '<p><del><a class="wiki link invalid">:linktype::[[no-html-href]]</a></del></p>\n',
  },
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; gfm; footnote',
    mkdn:
`Here is[^1] :linktype1::[[fname-a]].

[^1]: A footnote with :linktype2::[[fname-b]].`,
    html: 'warn: markdown footnotes don\'t seem to have a standardized html format -- please supply target footnote html here',
  },
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; gfm; tables',
    mkdn:
`| :linktype1::[[fname-a]]      | Text Descr |
| ---------------------------- | ---------- |
| :linktype2::[[fname-b]]      | Title      |
`,
    html: '<table>\n<thead>\n<tr>\n<th><a class="wiki link type reftype__linktype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></th>\n<th>Text Descr</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><a class="wiki link type reftype__linktype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></td>\n<td>Title</td>\n</tr>\n</tbody>\n</table>\n',
  },
  {
    descr: 'wikilink; typed; w/ other mkdn constructs; gfm; tables; no \'htmlHref\'',
    mkdn:
`| :linktype1::[[no-html-href]] | Text Descr |
| ---------------------------- | ---------- |
| :linktype2::[[no-html-href]] | Text       |
`,
    html: '<table>\n<thead>\n<tr>\n<th><a class="wiki link invalid">:linktype1::[[no-html-href]]</a></th>\n<th>Text Descr</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><a class="wiki link invalid">:linktype2::[[no-html-href]]</a></td>\n<td>Text</td>\n</tr>\n</tbody>\n</table>\n',
  },
  // malformed
  {
    descr: 'wikilink; typed; malformed; empty linktype + empty filename',
    mkdn: ':::[[]].',
    html: '<p>:::[[]].</p>\n',
  },
  {
    descr: 'wikilink; typed; malformed; empty linktype',
    mkdn: ':::[[fname-a]].',
    html: '<p>:::<a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  },
  {
    descr: 'wikilink; typed; malformed; empty filename',
    mkdn: ':linktype::[[]].',
    html: '<p>:linktype::[[]].</p>\n',
  },
  {
    descr: 'wikilink; typed; malformed, partial',
    mkdn: ':linktype::[fname-a].',
    html: '<p>:linktype::[fname-a].</p>\n',
  },
  {
    descr: 'wikilink; typed; malformed; missing prefix colon',
    mkdn: 'linktype::[[fname-a]].',
    html: '<p>linktype::<a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>.</p>\n',
  },
];
