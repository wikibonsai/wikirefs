/*
 * note: newlines are added to the end of test wikiattrs to illustrate that they
 * really are 'block' elements.
 */

import type { WikiRefTestCase } from '../types';


export const wikiAttrMixedCases: WikiRefTestCase[] = [
  // single / list
  {
    descr: 'wikiattr; mixed; single + list',
    mkdn:
`:attrtype1::[[fname-a]]
:attrtype2::
- [[fname-b]]
- [[fname-c]]
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype1</dt>
<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dt>attrtype2</dt>
<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
<dd><a class="attr wiki reftype__attrtype2" href="/tests/fixtures/fname-c" data-href="/tests/fixtures/fname-c">title c</a></dd>
</dl>
</aside>
`,
  },

  // prefixed / unprefixed

  // w/ (deactivated) caml syntax
  {
    descr: 'wikiattr; mixed; wikirefs + caml; wiki single, caml single',
    mkdn: 
`:attrtype1::[[fname-a]]
:attrtype2::string
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype1</dt>
<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
</dl>
</aside>
<p>:attrtype2::string</p>
`,
  },
  {
    descr: 'wikiattr; mixed; wikirefs + caml; wiki multi single, caml multi single',
    mkdn:
`:attrtype1::[[fname-a]]
:attrtype2::[[fname-b]]
:attrtype3::string
:attrtype4::string
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
<p>:attrtype3::string
:attrtype4::string</p>
`,
  },
  {
    descr: 'wikiattr; mixed; wikirefs + caml; wiki multi single, caml mkdn list',
    mkdn:
`:attrtype1::[[fname-a]]
:attrtype2::[[fname-b]]
:attrtype3::
- string
- string
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
<p>:attrtype3::</p>
<ul>
<li>string</li>
<li>string</li>
</ul>
`,
  },
  {
    descr: 'wikiattr; mixed; wikirefs + caml; wiki mkdn list, caml two single',
    mkdn:
`:attrtype1::
- [[fname-a]]
- [[fname-b]]
:attrtype2::string
:attrtype3::string
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype1</dt>
<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
</dl>
</aside>
<p>:attrtype2::string\n:attrtype3::string</p>
`,
  },
  {
    descr: 'wikiattr; mixed; wikirefs + caml; wiki mkdn list, caml mkdn list',
    mkdn: 
`:attrtype1::
- [[fname-a]]
- [[fname-b]]
:attrtype2::
- string
- string
`,
    html:
`<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attrtype1</dt>
<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-a" data-href="/tests/fixtures/fname-a">title a</a></dd>
<dd><a class="attr wiki reftype__attrtype1" href="/tests/fixtures/fname-b" data-href="/tests/fixtures/fname-b">title b</a></dd>
</dl>
</aside>
<p>:attrtype2::</p>
<ul>
<li>string</li>
<li>string</li>
</ul>
`,
  },
];
