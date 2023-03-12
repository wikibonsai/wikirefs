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
    descr: 'wikiattr; unprefixed; single; base (safe)',
    mkdn: 'attrtype::[[fname-a]]\n',
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
    descr: 'wikiattr; unprefixed; slugify (uppercase -> lowercase; whitespace -> dash; rm non-alpha-numeric',
    mkdn: ':Attr Type&::[[fname-a]]\n',
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>Attr Type&</dt>
<dd><a class="attr wiki reftype__attr-type" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; single; w/ prior newline',
    mkdn: '\nattrtype::[[fname-a]]\n',
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
    descr: 'wikiattr; unprefixed; single; padded whitespace allowed around attrtype construct',
    mkdn: 'attrtype :: [[fname-a]]\n',
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
    descr: 'wikiattr; unprefixed; single; long whitespace before attrtype special char (::)',
    mkdn: 'attrtype     :: [[fname-a]]\n',
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
    descr: 'wikiattr; unprefixed; single; long whitespace after attrtype special char (::) not allowed',
    mkdn: 'attrtype ::     [[fname-a]]\n',
    html: '<p>attrtype ::     <a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></p>\n',
  },
  {
    descr: 'wikiattr; unprefixed; single; renders at top of content',
    mkdn: 'some text.\n\nattrtype::[[fname-a]]\n',
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
</dl>
</aside>
<p>some text.</p>
`,
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
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/no-html-text" data-href="/tests/fixtures/no-html-text">no-html-text</a></dd>
</dl>
</aside>
`,
  },
  // invalid
  {
    descr: 'wikiattr; unprefixed; single; invalid; no \'htmlHref\'',
    mkdn: 'attrtype::[[no-html-href]]\n',
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki invalid">[[no-html-href]]</a></dd>
</dl>
</aside>
`,
  },
  // multi
  {
    descr: 'wikiattr; unprefixed; single; multi; w/o space',
    mkdn: 
`attrtype1::[[fname-a]]
attrtype2::[[fname-b]]
attrtype3::[[fname-c]]
`, 
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype1</dt>
<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dt>attrtype2</dt>
<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dt>attrtype3</dt>
<dd><a class="attr wiki reftype__attrtype3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; w/ space',
    mkdn: 
`attrtype1::[[fname-a]]

attrtype2::[[fname-b]]

attrtype3::[[fname-c]]

`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype1</dt>
<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dt>attrtype2</dt>
<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dt>attrtype3</dt>
<dd><a class="attr wiki reftype__attrtype3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; variable space before attrtype special char (::)',
    mkdn:
`attrtype1 :: [[fname-a]]
attrtype2  :: [[fname-b]]
attrtype3     :: [[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype1</dt>
<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dt>attrtype2</dt>
<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dt>attrtype3</dt>
<dd><a class="attr wiki reftype__attrtype3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; variable space before attrtype special char (::) should not exceed 4 spaces (past prior attrtype)',
    mkdn:
`attrtype1 :: [[fname-a]]
attrtype2  :: [[fname-b]]
attrtype3       :: [[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype1</dt>
<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dt>attrtype2</dt>
<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dt>attrtype3</dt>
<dd><a class="attr wiki reftype__attrtype3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; error; only one (optional) space allowed after attrtype special char (::)',
    mkdn: 
`attrtype1 :: [[fname-a]]
attrtype2  :: [[fname-b]]
attrtype3  ::  [[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype1</dt>
<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dt>attrtype2</dt>
<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
</dl>
</aside>
<p>attrtype3  ::  <a class="wiki link" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></p>
`,
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; merge; duplicate attrtypes',
    mkdn: 'attrtype::[[fname-a]]\nattrtype::[[fname-b]]\n',
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; merge; attrtype merged, duplicate filenames preserved',
    mkdn: 
`attrtype::[[fname-a]]
attrtype::[[fname-a]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; can start on line other than first line; w/ space',
    mkdn:
`some random text.

attrtype1::[[fname-a]]
attrtype2::[[fname-b]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype1</dt>
<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dt>attrtype2</dt>
<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
</dl>
</aside>
<p>some random text.</p>
`,
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; can start on line other than first line; w/o space',
    mkdn:
`some random text.
attrtype1::[[fname-a]]
attrtype2::[[fname-b]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype1</dt>
<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dt>attrtype2</dt>
<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
</dl>
</aside>
<p>some random text.</p>
`,
  },
  {
    descr: 'wikiattr; unprefixed; single; multi; merge; multi singles, with text in between',
    mkdn: 'attrtype1::[[fname-a]]\nsome in between text\nattrtype2::[[fname-b]]\n',
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype1</dt>
<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dt>attrtype2</dt>
<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
</dl>
</aside>
<p>some in between text</p>
`,
  },
  // list
  // comma-separated
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; w/o whitespace pad',
    mkdn: 'attrtype::[[fname-a]],[[fname-b]],[[fname-c]]\n',
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; w/ full whitespace pad',
    mkdn: 'attrtype :: [[fname-a]] , [[fname-b]] , [[fname-c]]\n',
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; w/ comma whitespace prefix pad',
    mkdn: 'attrtype::[[fname-a]] ,[[fname-b]] ,[[fname-c]]\n',
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; w/ comma whitespace suffix pad',
    mkdn: 'attrtype::[[fname-a]], [[fname-b]], [[fname-c]]\n',
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; immediate text before',
    mkdn:
`some random text.
attrtype::[[fname-a]],[[fname-b]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
</dl>
</aside>
<p>some random text.</p>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; comma-separated; immediate text after',
    mkdn:
`attrtype::[[fname-a]],[[fname-b]]
some random text.
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
</dl>
</aside>
<p>some random text.</p>
`,
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
    descr: 'wikiattr; unprefixed; list; mkdn-separated; does not handle lazy lines',
    error: true,
    mkdn:
`attrtype::
- [[fname-a]]

- [[fname-b]]
- [[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
</dl>
</aside>
<ul>
<li><a class="wiki link" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></li>
<li><a class="wiki link" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></li>
</ul>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; ensure not overreaching to lists containing wikilinks',
    mkdn:
`attrtype::
- [[fname-a]]
- [[fname-b]]

some random text.

- [[fname-a]]
- [[fname-b]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
</dl>
</aside>
<p>some random text.</p>
<ul>
<li><a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></li>
<li><a class="wiki link" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></li>
</ul>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; immediate text before',
    mkdn:
`some random text.
attrtype::
- [[fname-a]]
- [[fname-b]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
</dl>
</aside>
<p>some random text.</p>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; immediate text after',
    mkdn:
`attrtype::
- [[fname-a]]
- [[fname-b]]
some random text.
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
</dl>
</aside>
<p>some random text.</p>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; kind; dash',
    mkdn:
`attrtype::
- [[fname-a]]
- [[fname-b]]
- [[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; kind; plus',
    mkdn:
`attrtype::
+ [[fname-a]]
+ [[fname-b]]
+ [[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; kind; asterisk',
    mkdn:
`attrtype::
* [[fname-a]]
* [[fname-b]]
* [[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; kind; mixed',
    mkdn:
`attrtype::
- [[fname-a]]
+ [[fname-b]]
* [[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; whitespace; none',
    mkdn:
`attrtype::
- [[fname-a]]
- [[fname-b]]
- [[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; whitespace; pad',
    mkdn:
`attrtype ::
- [[fname-a]]
- [[fname-b]]
- [[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; whitespace; pretty (does not trigger indentented code)',
    mkdn:
`attrtype ::
               - [[fname-a]]
               - [[fname-b]]
               - [[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; whitespace; item whitespace prefix; 2 space',
    mkdn:
`attrtype::
- [[fname-a]]
- [[fname-b]]
- [[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; whitespace; item whitespace prefix; variable',
    mkdn:
`attrtype::
- [[fname-a]]
- [[fname-b]]
- [[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; whitespace; attrtype char (::) whitespace; variable',
    mkdn:
`attrtype     :: 
- [[fname-a]]
- [[fname-b]]
- [[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },
  {
    descr: 'wikiattr; unprefixed; list; mkdn-separated; empty list, turned setext header',
    mkdn: 
`attrtype::
- 
`,
    html: '<h2>attrtype::</h2>\n',
  },
  // mkdn / comma
  {
    descr: 'wikiattr; unprefixed; list; comma / mkdn lists do not mix',
    error: true,
    mkdn:
`attrtype::[[fname-a]]
- [[fname-b]]
- [[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
</dl>
</aside>
<ul>
<li><a class="wiki link" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></li>
<li><a class="wiki link" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></li>
</ul>
`,
  },
  // alongside other markdown constructs
  // lists: mimicks how markdown treats text paragraphs that are next to lists
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; near lists; before',
    mkdn: 
`attrtype::[[fname-a]]

- list-item-1
- list-item-2
- list-item-3`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
</dl>
</aside>
<ul>
<li>list-item-1</li>
<li>list-item-2</li>
<li>list-item-3</li>
</ul>
`,
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; near lists; immediate before',
    mkdn: 
`attrtype::[[fname-a]]
- list-item-1
- list-item-2
- list-item-3`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
</dl>
</aside>
<ul>
<li>list-item-1</li>
<li>list-item-2</li>
<li>list-item-3</li>
</ul>
`,
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; near lists; after',
    mkdn: 
`- list-item-1
- list-item-2
- list-item-3

attrtype::[[fname-a]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
</dl>
</aside>
<ul>
<li>list-item-1</li>
<li>list-item-2</li>
<li>list-item-3</li>
</ul>
`,
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; near lists; immediate after',
    mkdn: 
`- list-item-1
- list-item-2
- list-item-3
attrtype::[[fname-a]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype</dt>
<dd><a class="attr wiki reftype__attrtype" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
</dl>
</aside>
<ul>
<li>list-item-1</li>
<li>list-item-2</li>
<li>list-item-3</li>
</ul>
`,
  },
  // nested
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; nested; list; not allowed inside',
    mkdn: '- attrtype::[[fname-a]]\n',
    html:
`<ul>
<li>attrtype::<a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></li>
</ul>
`,
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; nested; blockquote; not allowed inside',
    mkdn: '> attrtype::[[fname-a]]\n',
    html:
`<blockquote>
<p>attrtype::<a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></p>
</blockquote>
`,
  },
  {
    descr: 'wikiattr; unprefixed; w/ other mkdn constructs; nested; gfm; footnote',
    mkdn:
`
[^fn]
[^fn]: attrtype::[[fname-a]]
`,
    html: 'warn: markdown footnotes don\'t seem to have a standardized html format -- please supply target footnote html here',
  },
  // malformed
  {
    descr: 'wikiattr; unprefixed; malformed; single; multi; w/ extraneous chars and newline',
    mkdn:
`attrtype1::[[fname-a]]jj

attrtype2::[[fname-b]]
attrtype3::[[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype2</dt>
<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dt>attrtype3</dt>
<dd><a class="attr wiki reftype__attrtype3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
<p>attrtype1::<a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>jj</p>
`,
  },
  {
    descr: 'wikiattr; unprefixed; malformed; single; multi; w/ extraneous chars and no newline',
    mkdn: 
`attrtype1::[[fname-a]]jj
attrtype2::[[fname-b]]
attrtype3::[[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype2</dt>
<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dt>attrtype3</dt>
<dd><a class="attr wiki reftype__attrtype3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
<p>attrtype1::<a class="wiki link" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a>jj</p>
`,
  },
  {
    descr: 'wikiattr; unprefixed; malformed; single; multi; w/ a blank value',
    mkdn:
`attrtype1::
attrtype2::[[fname-b]]
attrtype3::[[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype2</dt>
<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dt>attrtype3</dt>
<dd><a class="attr wiki reftype__attrtype3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
<p>attrtype1::</p>
`,
  },
  {
    descr: 'wikiattr; unprefixed; malformed; single; multi; single square brackets, first',
    mkdn:
`attrtype1::[fname-a]
attrtype2::[[fname-b]]
attrtype3::[[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype2</dt>
<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dt>attrtype3</dt>
<dd><a class="attr wiki reftype__attrtype3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
<p>attrtype1::[fname-a]</p>
`,
  },
  {
    descr: 'wikiattr; unprefixed; malformed; single; multi; single square brackets, second',
    mkdn:
`attrtype1::[[fname-a]]
attrtype2::[fname-b]
attrtype3::[[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype1</dt>
<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dt>attrtype3</dt>
<dd><a class="attr wiki reftype__attrtype3" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
<p>attrtype2::[fname-b]</p>
`,
  },
  {
    descr: 'wikiattr; unprefixed; malformed; list; comma-separated; items not [[bracketed]]',
    mkdn:
`attrtype3::string,string
`,
    html:
`<p>attrtype3::string,string</p>
`,
  },
  {
    descr: 'wikiattr; unprefixed; malformed; list; mkdn-separated; items not [[bracketed]]',
    mkdn:
`attrtype3::
- string
- string
`,
    html:
`<p>attrtype3::</p>
<ul>
<li>string</li>
<li>string</li>
</ul>
`,
  },
];
