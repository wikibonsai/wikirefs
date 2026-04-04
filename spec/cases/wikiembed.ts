import type { WikiRefTestCase } from '../types';


export const wikiEmbedCases: WikiRefTestCase[] = [
  ////
  // markdown
  {
    descr: 'wikiembed; md',
    mkdn: '![[embed-doc]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc" data-href="/tests/fixtures/embed-doc">\n'
        +           'embedded document\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc" data-href="/tests/fixtures/embed-doc">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>Here is some content.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  // render other markdown constructs
  {
    descr: 'wikiembed; w/ other mkdn constructs; bold',
    mkdn: '![[embed-doc-mkdn-bold]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-mkdn-bold" data-href="/tests/fixtures/embed-doc-mkdn-bold">\n'
        +           'embed doc mkdn bold\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-mkdn-bold" data-href="/tests/fixtures/embed-doc-mkdn-bold">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p><strong>bold text</strong></p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; italic',
    mkdn: '![[embed-doc-mkdn-italic]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-mkdn-italic" data-href="/tests/fixtures/embed-doc-mkdn-italic">\n'
        +           'embed doc mkdn italic\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-mkdn-italic" data-href="/tests/fixtures/embed-doc-mkdn-italic">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p><em>italic text</em></p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; list',
    mkdn: '![[embed-doc-mkdn-list]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-mkdn-list" data-href="/tests/fixtures/embed-doc-mkdn-list">\n'
        +           'embed doc mkdn list\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-mkdn-list" data-href="/tests/fixtures/embed-doc-mkdn-list">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<ul>\n'
        +           '<li>item one</li>\n'
        +           '<li>item two</li>\n'
        +         '</ul>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; blockquote',
    mkdn: '![[embed-doc-mkdn-blockquote]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-mkdn-blockquote" data-href="/tests/fixtures/embed-doc-mkdn-blockquote">\n'
        +           'embed doc mkdn blockquote\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-mkdn-blockquote" data-href="/tests/fixtures/embed-doc-mkdn-blockquote">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<blockquote>\n'
        +           '<p>quoted line</p>\n'
        +         '</blockquote>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; markdown link',
    mkdn: '![[embed-doc-mkdn-link]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-mkdn-link" data-href="/tests/fixtures/embed-doc-mkdn-link">\n'
        +           'embed doc mkdn link\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-mkdn-link" data-href="/tests/fixtures/embed-doc-mkdn-link">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>Text with <a href="http://example.com">a link</a>.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; reference link',
    mkdn: '![[embed-doc-mkdn-ref-link]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-mkdn-ref-link" data-href="/tests/fixtures/embed-doc-mkdn-ref-link">\n'
        +           'embed doc mkdn ref link\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-mkdn-ref-link" data-href="/tests/fixtures/embed-doc-mkdn-ref-link">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>See <a href="http://example.com">reference</a>.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; gfm; strikethrough',
    mkdn: '![[embed-doc-mkdn-strikethrough]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-mkdn-strikethrough" data-href="/tests/fixtures/embed-doc-mkdn-strikethrough">\n'
        +           'embed doc mkdn strikethrough\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-mkdn-strikethrough" data-href="/tests/fixtures/embed-doc-mkdn-strikethrough">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p><del>strikethrough text</del></p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; gfm; footnote',
    mkdn: '![[embed-doc-mkdn-footnote]]',
    html: 'warn: markdown footnotes don\'t seem to have a standardized html format -- please supply target footnote html here',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; gfm; table',
    mkdn: '![[embed-doc-mkdn-table]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-mkdn-table" data-href="/tests/fixtures/embed-doc-mkdn-table">\n'
        +           'embed doc mkdn table\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-mkdn-table" data-href="/tests/fixtures/embed-doc-mkdn-table">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<table>\n'
        +           '<thead>\n'
        +             '<tr>\n'
        +               '<th>A</th>\n'
        +               '<th>B</th>\n'
        +             '</tr>\n'
        +           '</thead>\n'
        +           '<tbody>\n'
        +             '<tr>\n'
        +               '<td>C</td>\n'
        +               '<td>D</td>\n'
        +             '</tr>\n'
        +           '</tbody>\n'
        +         '</table>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; code block',
    mkdn: '![[embed-doc-mkdn-code]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-mkdn-code" data-href="/tests/fixtures/embed-doc-mkdn-code">\n'
        +           'embed doc mkdn code\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-mkdn-code" data-href="/tests/fixtures/embed-doc-mkdn-code">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<pre><code class="language-js">const x = 1;\n'
        +         '</code></pre>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; nested embed',
    mkdn: '![[embed-doc-mkdn-nested]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-mkdn-nested" data-href="/tests/fixtures/embed-doc-mkdn-nested">\n'
        +           'embed doc mkdn nested\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-mkdn-nested" data-href="/tests/fixtures/embed-doc-mkdn-nested">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>Content with \n'
        +           '<p>\n'
        +             '<div class="embed-wrapper">\n'
        +               '<div class="embed-title">\n'
        +                 '<a class="wiki embed" href="/tests/fixtures/embed-doc" data-href="/tests/fixtures/embed-doc">\n'
        +                   'embedded document\n'
        +                 '</a>\n'
        +               '</div>\n'
        +               '<div class="embed-link">\n'
        +                 '<a class="embed-link-icon" href="/tests/fixtures/embed-doc" data-href="/tests/fixtures/embed-doc">\n'
        +                   '<i class="link-icon"></i>\n'
        +                 '</a>\n'
        +               '</div>\n'
        +               '<div class="embed-content">\n'
        +                 '<p>Here is some content.</p>\n'
        +                 '\n'
        +               '</div>\n'
        +             '</div>\n'
        +           '</p>\n'
        +         ' here.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  // headers (embed-doc-w-header has # Header Text)
  {
    descr: 'wikiembed; w/ other mkdn constructs; header; html id (kebab-case)',
    mkdn: '![[embed-doc-w-header#header-text]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-w-header#header-text" data-href="/tests/fixtures/embed-doc-w-header#header-text">\n'
        +           'embedded document with header text\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-w-header#header-text" data-href="/tests/fixtures/embed-doc-w-header#header-text">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>Header content.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; header; header text (Title Case)',
    mkdn: '![[embed-doc-w-header#Header Text]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-w-header#header-text" data-href="/tests/fixtures/embed-doc-w-header#header-text">\n'
        +           'embedded document with header text\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-w-header#header-text" data-href="/tests/fixtures/embed-doc-w-header#header-text">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>Header content.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; header; empty (full-doc embed)',
    mkdn: '![[embed-doc-w-header#]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-w-header" data-href="/tests/fixtures/embed-doc-w-header">\n'
        +           'embedded document with header text\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-w-header" data-href="/tests/fixtures/embed-doc-w-header">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>Here is some content.</p>\n'
        +         '<h1>Header Text</h1>\n'
        +         '<p>Header content.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  // setext-style headers (=== h1, --- h2)
  {
    descr: 'wikiembed; w/ other mkdn constructs; header; setext h1 (=)',
    mkdn: '![[embed-doc-setext#setext-h1]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-setext#setext-h1" data-href="/tests/fixtures/embed-doc-setext#setext-h1">\n'
        +           'embed doc setext headers\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-setext#setext-h1" data-href="/tests/fixtures/embed-doc-setext#setext-h1">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>body for setext h1.</p>\n'
        +         '<h2>Setext H2</h2>\n'
        +         '<p>body for setext h2.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; header; setext h2 (-)',
    mkdn: '![[embed-doc-setext#setext-h2]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-setext#setext-h2" data-href="/tests/fixtures/embed-doc-setext#setext-h2">\n'
        +           'embed doc setext headers\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-setext#setext-h2" data-href="/tests/fixtures/embed-doc-setext#setext-h2">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>body for setext h2.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  // render other markdown constructs
  {
    descr: 'wikiembed; w/ other mkdn constructs; header; section w/ bold',
    mkdn: '![[embed-doc-header-mkdn#bold]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-header-mkdn#bold" data-href="/tests/fixtures/embed-doc-header-mkdn#bold">\n'
        +           'embed doc header constructs\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-header-mkdn#bold" data-href="/tests/fixtures/embed-doc-header-mkdn#bold">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p><strong>bold text</strong></p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; header; section w/ italic',
    mkdn: '![[embed-doc-header-mkdn#italic]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-header-mkdn#italic" data-href="/tests/fixtures/embed-doc-header-mkdn#italic">\n'
        +           'embed doc header constructs\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-header-mkdn#italic" data-href="/tests/fixtures/embed-doc-header-mkdn#italic">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p><em>italic text</em></p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; header; section w/ list',
    mkdn: '![[embed-doc-header-mkdn#list-section]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-header-mkdn#list-section" data-href="/tests/fixtures/embed-doc-header-mkdn#list-section">\n'
        +           'embed doc header constructs\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-header-mkdn#list-section" data-href="/tests/fixtures/embed-doc-header-mkdn#list-section">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<ul>\n'
        +           '<li>item one</li>\n'
        +           '<li>item two</li>\n'
        +         '</ul>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; header; section w/ blockquote',
    mkdn: '![[embed-doc-header-mkdn#blockquote]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-header-mkdn#blockquote" data-href="/tests/fixtures/embed-doc-header-mkdn#blockquote">\n'
        +           'embed doc header constructs\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-header-mkdn#blockquote" data-href="/tests/fixtures/embed-doc-header-mkdn#blockquote">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<blockquote>\n'
        +           '<p>quoted line</p>\n'
        +         '</blockquote>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; header; section w/ markdown link',
    mkdn: '![[embed-doc-header-mkdn#markdown-link]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-header-mkdn#markdown-link" data-href="/tests/fixtures/embed-doc-header-mkdn#markdown-link">\n'
        +           'embed doc header constructs\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-header-mkdn#markdown-link" data-href="/tests/fixtures/embed-doc-header-mkdn#markdown-link">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>Text with <a href="http://example.com">a link</a>.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; header; section w/ reference link',
    mkdn: '![[embed-doc-header-mkdn#reference-link]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-header-mkdn#reference-link" data-href="/tests/fixtures/embed-doc-header-mkdn#reference-link">\n'
        +           'embed doc header constructs\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-header-mkdn#reference-link" data-href="/tests/fixtures/embed-doc-header-mkdn#reference-link">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>See <a href="http://example.com">reference</a>.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; header; gfm; section w/ strikethrough',
    mkdn: '![[embed-doc-header-mkdn#strikethrough]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-header-mkdn#strikethrough" data-href="/tests/fixtures/embed-doc-header-mkdn#strikethrough">\n'
        +           'embed doc header constructs\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-header-mkdn#strikethrough" data-href="/tests/fixtures/embed-doc-header-mkdn#strikethrough">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p><del>strikethrough text</del></p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; header; gfm; section w/ footnote',
    mkdn: '![[embed-doc-header-mkdn#footnote]]',
    html: 'warn: markdown footnotes don\'t seem to have a standardized html format -- please supply target footnote html here',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; header; gfm; section w/ table',
    mkdn: '![[embed-doc-header-mkdn#table]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-header-mkdn#table" data-href="/tests/fixtures/embed-doc-header-mkdn#table">\n'
        +           'embed doc header constructs\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-header-mkdn#table" data-href="/tests/fixtures/embed-doc-header-mkdn#table">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<table>\n'
        +           '<thead>\n'
        +             '<tr>\n'
        +               '<th>A</th>\n'
        +               '<th>B</th>\n'
        +             '</tr>\n'
        +           '</thead>\n'
        +           '<tbody>\n'
        +             '<tr>\n'
        +               '<td>C</td>\n'
        +               '<td>D</td>\n'
        +             '</tr>\n'
        +           '</tbody>\n'
        +         '</table>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; header; section w/ code block',
    mkdn: '![[embed-doc-header-mkdn#code-block]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-header-mkdn#code-block" data-href="/tests/fixtures/embed-doc-header-mkdn#code-block">\n'
        +           'embed doc header constructs\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-header-mkdn#code-block" data-href="/tests/fixtures/embed-doc-header-mkdn#code-block">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<pre><code class="language-js">const x = 1;\n'
        +         '</code></pre>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  // header; nested header levels (h2 parent includes h3 children)
  {
    descr: 'wikiembed; w/ other mkdn constructs; header; nested; h2 parent includes h3 children',
    mkdn: '![[embed-doc-nested-headers#parent-header]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-nested-headers#parent-header" data-href="/tests/fixtures/embed-doc-nested-headers#parent-header">\n'
        +           'embed doc nested headers\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-nested-headers#parent-header" data-href="/tests/fixtures/embed-doc-nested-headers#parent-header">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>Parent content.</p>\n'
        +         '<h3>Child Header</h3>\n'
        +         '<p>Child content.</p>\n'
        +         '<h3>Another Child</h3>\n'
        +         '<p>Another child content.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; nested',
    mkdn: '![[nested-embed-doc]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/nested-embed-doc" data-href="/tests/fixtures/nested-embed-doc">\n'
        +           'nested embedded document\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/nested-embed-doc" data-href="/tests/fixtures/nested-embed-doc">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>Here is some content with another \n'
        +           '<p>\n'
        +             '<div class="embed-wrapper">\n'
        +               '<div class="embed-title">\n'
        +                 '<a class="wiki embed" href="/tests/fixtures/embed-doc" data-href="/tests/fixtures/embed-doc">\n'
        +                   'embedded document\n'
        +                 '</a>\n'
        +               '</div>\n'
        +               '<div class="embed-link">\n'
        +                 '<a class="embed-link-icon" href="/tests/fixtures/embed-doc" data-href="/tests/fixtures/embed-doc">\n'
        +                   '<i class="link-icon"></i>\n'
        +                 '</a>\n'
        +               '</div>\n'
        +               '<div class="embed-content">\n'
        +                 '<p>Here is some content.</p>\n'
        +                 '\n'
        +               '</div>\n'
        +             '</div>\n'
        +           '</p>\n'
        +         '.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; nested; header',
    mkdn: '![[embed-doc-header-mkdn#nested-embed]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-header-mkdn#nested-embed" data-href="/tests/fixtures/embed-doc-header-mkdn#nested-embed">\n'
        +           'embed doc header constructs\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-header-mkdn#nested-embed" data-href="/tests/fixtures/embed-doc-header-mkdn#nested-embed">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>Content with \n'
        +           '<p>\n'
        +             '<div class="embed-wrapper">\n'
        +               '<div class="embed-title">\n'
        +                 '<a class="wiki embed" href="/tests/fixtures/embed-doc" data-href="/tests/fixtures/embed-doc">\n'
        +                   'embedded document\n'
        +                 '</a>\n'
        +               '</div>\n'
        +               '<div class="embed-link">\n'
        +                 '<a class="embed-link-icon" href="/tests/fixtures/embed-doc" data-href="/tests/fixtures/embed-doc">\n'
        +                   '<i class="link-icon"></i>\n'
        +                 '</a>\n'
        +               '</div>\n'
        +               '<div class="embed-content">\n'
        +                 '<p>Here is some content.</p>\n'
        +                 '\n'
        +               '</div>\n'
        +             '</div>\n'
        +           '</p>\n'
        +         ' here.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; nested; header; child only',
    mkdn: '![[embed-doc-nested-headers#child-header]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-nested-headers#child-header" data-href="/tests/fixtures/embed-doc-nested-headers#child-header">\n'
        +           'embed doc nested headers\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-nested-headers#child-header" data-href="/tests/fixtures/embed-doc-nested-headers#child-header">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>Child content.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; nested; header; sibling after parent with children',
    mkdn: '![[embed-doc-nested-headers#sibling-header]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-nested-headers#sibling-header" data-href="/tests/fixtures/embed-doc-nested-headers#sibling-header">\n'
        +           'embed doc nested headers\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-nested-headers#sibling-header" data-href="/tests/fixtures/embed-doc-nested-headers#sibling-header">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>Sibling content.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  // render fallbacks
  {
    descr: 'wikiembed; w/ other mkdn constructs; render fallback; no \'embedContent\'',
    mkdn: '![[embed-doc-no-content]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-no-content" data-href="/tests/fixtures/embed-doc-no-content">\n'
        +           'embedded document without content\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-no-content" data-href="/tests/fixtures/embed-doc-no-content">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         'Error: Content not found for \'embed-doc-no-content\'\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; render fallback; no \'htmlText\'',
    mkdn: '![[embed-doc-no-html-text]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/embed-doc-no-html-text" data-href="/tests/fixtures/embed-doc-no-html-text">\n'
        +           'embed-doc-no-html-text\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-no-html-text" data-href="/tests/fixtures/embed-doc-no-html-text">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>Here is some content.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; render fallback; no \'htmlHref\'',
    mkdn: '![[embed-doc-no-html-href]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed invalid">\n'
        +           'embedded document without html href\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon invalid">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>Here is some content.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; render fallback; no \'embedContent\', \'htmlText\', or \'htmlHref\'',
    mkdn: '![[embed-doc-no-resolvers]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed invalid">\n'
        +           'embed-doc-no-resolvers\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon invalid">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         'Error: Content not found for \'embed-doc-no-resolvers\'\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  // cycles
  {
    descr: 'wikiembed; w/ other mkdn constructs; cycle; self',
    mkdn: '![[cycle-self-embed-doc]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">\n'
        +           'cycle self embedded document\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>\n'
        +           '<p>\n'
        +             '<div class="embed-wrapper">\n'
        +               '<div class="embed-title">\n'
        +                 '<a class="wiki embed" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">\n'
        +                   'cycle self embedded document\n'
        +                 '</a>\n'
        +               '</div>\n'
        +               '<div class="embed-link">\n'
        +                 '<a class="embed-link-icon" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">\n'
        +                   '<i class="link-icon"></i>\n'
        +                 '</a>\n'
        +               '</div>\n'
        +               '<div class="embed-content">\n'
        +                 'cycle detected\n'
        +               '</div>\n'
        +             '</div>\n'
        +           '</p>\n'
        +         '</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; cycle; self; header',
    mkdn: '![[cycle-self-header-embed-doc#header-text]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/cycle-self-header-embed-doc#header-text" data-href="/tests/fixtures/cycle-self-header-embed-doc#header-text">\n'
        +           'cycle self header embed document\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/cycle-self-header-embed-doc#header-text" data-href="/tests/fixtures/cycle-self-header-embed-doc#header-text">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>Content with \n'
        +           '<p>\n'
        +             '<div class="embed-wrapper">\n'
        +               '<div class="embed-title">\n'
        +                 '<a class="wiki embed" href="/tests/fixtures/cycle-self-header-embed-doc#header-text" data-href="/tests/fixtures/cycle-self-header-embed-doc#header-text">\n'
        +                   'cycle self header embed document\n'
        +                 '</a>\n'
        +               '</div>\n'
        +               '<div class="embed-link">\n'
        +                 '<a class="embed-link-icon" href="/tests/fixtures/cycle-self-header-embed-doc#header-text" data-href="/tests/fixtures/cycle-self-header-embed-doc#header-text">\n'
        +                   '<i class="link-icon"></i>\n'
        +                 '</a>\n'
        +               '</div>\n'
        +               '<div class="embed-content">\n'
        +                 'cycle detected\n'
        +               '</div>\n'
        +             '</div>\n'
        +           '</p>\n'
        +         '.</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; cycle; nested',
    mkdn: '![[cycle-nest-embed-doc]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/cycle-nest-embed-doc" data-href="/tests/fixtures/cycle-nest-embed-doc">\n'
        +           'cycle nested embedded document\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/cycle-nest-embed-doc" data-href="/tests/fixtures/cycle-nest-embed-doc">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         '<p>\n'
        +           '<p>\n'
        +             '<div class="embed-wrapper">\n'
        +               '<div class="embed-title">\n'
        +                 '<a class="wiki embed" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">\n'
        +                   'cycle self embedded document\n'
        +                 '</a>\n'
        +               '</div>\n'
        +               '<div class="embed-link">\n'
        +                 '<a class="embed-link-icon" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">\n'
        +                   '<i class="link-icon"></i>\n'
        +                 '</a>\n'
        +               '</div>\n'
        +               '<div class="embed-content">\n'
        +                 '<p>\n'
        +                   '<p>\n'
        +                     '<div class="embed-wrapper">\n'
        +                       '<div class="embed-title">\n'
        +                         '<a class="wiki embed" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">\n'
        +                           'cycle self embedded document\n'
        +                         '</a>\n'
        +                       '</div>\n'
        +                       '<div class="embed-link">\n'
        +                         '<a class="embed-link-icon" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">\n'
        +                           '<i class="link-icon"></i>\n'
        +                         '</a>\n'
        +                       '</div>\n'
        +                       '<div class="embed-content">\n'
        +                         'cycle detected\n'
        +                       '</div>\n'
        +                     '</div>\n'
        +                   '</p>\n'
        +                 '</p>\n'
        +                 '\n'
        +               '</div>\n'
        +             '</div>\n'
        +           '</p>\n'
        +         '</p>\n'
        +         '\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  // escaped
  {
    descr: 'wikiembed; w/ other mkdn constructs; escaped; code fence',
    mkdn: '`![[fname-a]]`\n',
    html: '<p><code>![[fname-a]]</code></p>\n'
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; escaped; backslash',
    mkdn: '\\!\\[\\[fname-a\\]\\]\n',
    html: '<p>![[fname-a]]</p>\n'
  },
  {
    descr: 'wikiembed; w/ other mkdn constructs; escaped; whitespace prefix >= 4 spaces',
    mkdn: '    ![[fname-a]]\n',
    html: '<pre><code>![[fname-a]]\n'
        + '</code></pre>\n',
  },
  ////
  // media
  // pdf
  //   {
  //     descr: 'wikiembed; pdf',
  //     mkdn: '![[document.pdf]]',
  //     html:
  // `<p>

  // </p>
  // `,
  //   },
  // audio
  // mp3
  {
    descr: 'wikiembed; audio; mp3',
    mkdn: '![[audio.mp3]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<span class="embed-media" src="audio.mp3" alt="audio.mp3">\n'
        +       '<audio class="embed-audio" controls type="audio/mp3" src="/tests/fixtures/audio.mp3"></audio>\n'
        +     '</span>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; audio; mp3; render fallback; no \'htmlHref\'',
    mkdn: '![[missing-audio.mp3]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<span class="embed-media" src="missing-audio.mp3" alt="missing-audio.mp3">\n'
        +       '<audio class="embed-audio" controls type="audio/mp3"></audio>\n'
        +     '</span>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  // img
  // png
  {
    descr: 'wikiembed; img; png',
    mkdn: '![[image.png]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<span class="embed-media" src="image.png" alt="image.png">\n'
        +       '<img class="embed-image" src="/tests/fixtures/image.png">\n'
        +       '</span>\n'
        +     '</p>\n'
        +   '</p>\n',
  },
  {
    descr: 'wikiembed; img; png; render fallback; no \'htmlHref\'',
    mkdn: '![[missing-image.png]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<span class="embed-media" src="missing-image.png" alt="missing-image.png">\n'
        +       '<img class="embed-image">\n'
        +       '</span>\n'
        +     '</p>\n'
        +   '</p>\n',
  },
  // video
  // mp4
  {
    descr: 'wikiembed; video; mp4',
    mkdn: '![[video.mp4]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<span class="embed-media" src="video.mp4" alt="video.mp4">\n'
        +       '<video class="embed-video" controls type="video/mp4" src="/tests/fixtures/video.mp4"></video>\n'
        +     '</span>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; video; mp4; render fallback; no \'htmlHref\'',
    mkdn: '![[missing-video.mp4]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<span class="embed-media" src="missing-video.mp4" alt="missing-video.mp4">\n'
        +       '<video class="embed-video" controls type="video/mp4"></video>\n'
        +     '</span>\n'
        +   '</p>\n'
        + '</p>\n',
  },
  // invalid media kind -- will just be processed as markdown
  {
    descr: 'wikiembed; invalid media kind (handled as markdown -- similar to no \'embedContent\' and \'htmlText\')',
    mkdn: '![[invalid.abc]]',
    html: '<p>\n'
        +   '<p>\n'
        +     '<div class="embed-wrapper">\n'
        +       '<div class="embed-title">\n'
        +         '<a class="wiki embed" href="/tests/fixtures/invalid.abc" data-href="/tests/fixtures/invalid.abc">\n'
        +           'invalid.abc\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-link">\n'
        +         '<a class="embed-link-icon" href="/tests/fixtures/invalid.abc" data-href="/tests/fixtures/invalid.abc">\n'
        +           '<i class="link-icon"></i>\n'
        +         '</a>\n'
        +       '</div>\n'
        +       '<div class="embed-content">\n'
        +         'Error: Content not found for \'invalid.abc\'\n'
        +       '</div>\n'
        +     '</div>\n'
        +   '</p>\n'
        + '</p>\n',
  },
];
