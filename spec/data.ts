import type { TestFileData } from './types';

// example 'index'

// note: 'title' ~= 'html-text'
export const fileDataMap: TestFileData[] = [
  {
    filename: 'fname-a',
    title: 'Title A',
    href: '/tests/fixtures/fname-a',
  },
  {
    filename: 'fname-b',
    title: 'Title B',
    href: '/tests/fixtures/fname-b',
  },
  {
    filename: 'fname-c',
    title: 'Title C',
    href: '/tests/fixtures/fname-c',
  },
  {
    filename: 'fname-d',
    title: 'Title D',
    href: '/tests/fixtures/fname-d',
  },
  // single-char case
  {
    filename: 'a',
    title: 'A',
    href: '/tests/fixtures/a',
  },
  // missing 'title' (html text) case
  {
    filename: 'no-html-text',
    href: '/tests/fixtures/no-html-text',
  },
  // embeds //
  // mkdn
  {
    filename: 'embed-doc',
    title: 'Embedded Document',
    href: '/tests/fixtures/embed-doc',
    content: 'Here is some content.',
    media: 'markdown',
  },
  {
    filename: 'nested-embed-doc',
    title: 'Nested Embedded Document',
    href: '/tests/fixtures/nested-embed-doc',
    content: 'Here is some content with another ![[embed-doc]].',
    media: 'markdown',
  },
  {
    filename: 'cycle-self-embed-doc',
    title: 'Cycle Self Embedded Document',
    href: '/tests/fixtures/cycle-self-embed-doc',
    content: '![[cycle-self-embed-doc]]',
    media: 'markdown',
  },
  {
    filename: 'cycle-nest-embed-doc',
    title: 'Cycle Nested Embedded Document',
    href: '/tests/fixtures/cycle-nest-embed-doc',
    content: '![[cycle-self-embed-doc]]',
    media: 'markdown',
  },
  // header level embeds
  {
    filename: 'embed-doc-w-header',
    title: 'Embedded Document with Header Text',
    href: '/tests/fixtures/embed-doc-w-header',
    content: 'Here is some content.\n\n## Header Text\n\nHeader content.',
    media: 'markdown',
  },
  {
    filename: 'embed-doc-header-mkdn',
    title: 'Embed Doc Header Constructs',
    href: '/tests/fixtures/embed-doc-header-mkdn',
    content: 'Preamble.\n\n'
      + '## Bold\n\n'
      + '**bold text**\n\n'
      + '## Italic\n\n'
      + '_italic text_\n\n'
      + '## List Section\n\n'
      + '- item one\n- item two\n\n'
      + '## Blockquote\n\n'
      + '> quoted line\n\n'
      + '## Markdown Link\n\n'
      + 'Text with [a link](http://example.com).\n\n'
      + '## Reference Link\n\n'
      + 'See [reference][1].\n\n'
      + '[1]: http://example.com\n\n'
      + '## Strikethrough\n\n'
      + '~~strikethrough text~~\n\n'
      + '## Footnote\n\n'
      + 'Body[^1].\n\n'
      + '[^1]: note text\n\n'
      + '## Table\n\n'
      + '| A | B |\n'
      + '| - | - |\n'
      + '| C | D |\n\n'
      + '## Code Block\n\n'
      + '```js\nconst x = 1;\n```\n\n'
      + '## Nested Embed\n\n'
      + 'Content with ![[embed-doc]] here.\n',
    media: 'markdown',
  },
  {
    filename: 'cycle-self-header-embed-doc',
    title: 'Cycle Self Header Embed Document',
    href: '/tests/fixtures/cycle-self-header-embed-doc',
    content: 'Intro.\n\n## Section\n\nContent with ![[cycle-self-header-embed-doc#section]].',
    media: 'markdown',
  },
  // mkdn; error states
  {
    filename: 'embed-doc-no-content',
    title: 'Embedded Document Without Content',
    href: '/tests/fixtures/embed-doc-no-content',
    media: 'markdown',
  },
  {
    filename: 'embed-doc-no-html-text',
    href: '/tests/fixtures/embed-doc-no-html-text',
    content: 'Here is some content.',
    media: 'markdown',
  },
  {
    filename: 'embed-doc-no-html-href',
    title: 'Embedded Document Without Html Href',
    content: 'Here is some content.',
    media: 'markdown',
  },
  {
    filename: 'embed-doc-no-resolvers',
  },
  // invalid
  {
    filename: 'invalid.abc',
    href: '/tests/fixtures/invalid.abc',
    media: '',
  },
  // embed media
  // audio
  {
    filename: 'audio.mp3',
    href: '/tests/fixtures/audio.mp3',
    media: 'audio',
  },
  // document
  // pdf
  {
    filename: 'document.pdf',
    href: '/tests/fixtures/document.pdf',
    media: 'pdf',
  },
  // open office
  {
    filename: 'document.odt',
    href: '/tests/fixtures/document.odt',
    media: 'document',
  },
  // microsoft word
  {
    filename: 'document.docx',
    href: '/tests/fixtures/document.docx',
    media: 'document',
  },
  // image
  {
    filename: 'image.png',
    href: '/tests/fixtures/image.png',
    media: 'image',
  },
  // video
  {
    filename: 'video.mp4',
    href: '/tests/fixtures/video.mp4',
    media: 'video',
  },
];
