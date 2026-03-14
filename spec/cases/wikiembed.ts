import type { WikiRefTestCase } from '../types';


export const wikiEmbedCases: WikiRefTestCase[] = [
  ////
  // markdown
  {
    descr: 'wikiembed; md',
    mkdn: '![[embed-doc]]',
    html: '<p>\n'
        + '<p>\n'
        + '<div class="embed-wrapper">\n'
        + '<div class="embed-title">\n'
        + '<a class="wiki embed" href="/tests/fixtures/embed-doc" data-href="/tests/fixtures/embed-doc">\n'
        + 'embedded document\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-link">\n'
        + '<a class="embed-link-icon" href="/tests/fixtures/embed-doc" data-href="/tests/fixtures/embed-doc">\n'
        + '<i class="link-icon"></i>\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-content">\n'
        + '<p>Here is some content.</p>\n'
        + '\n'
        + '</div>\n'
        + '</div>\n'
        + '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; md; nested',
    mkdn: '![[nested-embed-doc]]',
    html: '<p>\n'
        + '<p>\n'
        + '<div class="embed-wrapper">\n'
        + '<div class="embed-title">\n'
        + '<a class="wiki embed" href="/tests/fixtures/nested-embed-doc" data-href="/tests/fixtures/nested-embed-doc">\n'
        + 'nested embedded document\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-link">\n'
        + '<a class="embed-link-icon" href="/tests/fixtures/nested-embed-doc" data-href="/tests/fixtures/nested-embed-doc">\n'
        + '<i class="link-icon"></i>\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-content">\n'
        + '<p>Here is some content with another \n'
        + '<p>\n'
        + '<div class="embed-wrapper">\n'
        + '<div class="embed-title">\n'
        + '<a class="wiki embed" href="/tests/fixtures/embed-doc" data-href="/tests/fixtures/embed-doc">\n'
        + 'embedded document\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-link">\n'
        + '<a class="embed-link-icon" href="/tests/fixtures/embed-doc" data-href="/tests/fixtures/embed-doc">\n'
        + '<i class="link-icon"></i>\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-content">\n'
        + '<p>Here is some content.</p>\n'
        + '\n'
        + '</div>\n'
        + '</div>\n'
        + '</p>\n'
        + '.</p>\n'
        + '\n'
        + '</div>\n'
        + '</div>\n'
        + '</p>\n'
        + '</p>\n',
  },
  // render fallbacks
  {
    descr: 'wikiembed; md; render fallback; no \'embedContent\'',
    mkdn: '![[embed-doc-no-content]]',
    html: '<p>\n'
        + '<p>\n'
        + '<div class="embed-wrapper">\n'
        + '<div class="embed-title">\n'
        + '<a class="wiki embed" href="/tests/fixtures/embed-doc-no-content" data-href="/tests/fixtures/embed-doc-no-content">\n'
        + 'embedded document without content\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-link">\n'
        + '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-no-content" data-href="/tests/fixtures/embed-doc-no-content">\n'
        + '<i class="link-icon"></i>\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-content">\n'
        + 'Error: Content not found for \'embed-doc-no-content\'\n'
        + '</div>\n'
        + '</div>\n'
        + '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; md; render fallback; no \'htmlText\'',
    mkdn: '![[embed-doc-no-html-text]]',
    html: '<p>\n'
        + '<p>\n'
        + '<div class="embed-wrapper">\n'
        + '<div class="embed-title">\n'
        + '<a class="wiki embed" href="/tests/fixtures/embed-doc-no-html-text" data-href="/tests/fixtures/embed-doc-no-html-text">\n'
        + 'embed-doc-no-html-text\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-link">\n'
        + '<a class="embed-link-icon" href="/tests/fixtures/embed-doc-no-html-text" data-href="/tests/fixtures/embed-doc-no-html-text">\n'
        + '<i class="link-icon"></i>\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-content">\n'
        + '<p>Here is some content.</p>\n'
        + '\n'
        + '</div>\n'
        + '</div>\n'
        + '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; md; render fallback; no \'htmlHref\'',
    mkdn: '![[embed-doc-no-html-href]]',
    html: '<p>\n'
        + '<p>\n'
        + '<div class="embed-wrapper">\n'
        + '<div class="embed-title">\n'
        + '<a class="wiki embed invalid">\n'
        + 'embedded document without html href\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-link">\n'
        + '<a class="embed-link-icon invalid">\n'
        + '<i class="link-icon"></i>\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-content">\n'
        + '<p>Here is some content.</p>\n'
        + '\n'
        + '</div>\n'
        + '</div>\n'
        + '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; md; render fallback; no \'embedContent\', \'htmlText\', or \'htmlHref\'',
    mkdn: '![[embed-doc-no-resolvers]]',
    html: '<p>\n'
        + '<p>\n'
        + '<div class="embed-wrapper">\n'
        + '<div class="embed-title">\n'
        + '<a class="wiki embed invalid">\n'
        + 'embed-doc-no-resolvers\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-link">\n'
        + '<a class="embed-link-icon invalid">\n'
        + '<i class="link-icon"></i>\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-content">\n'
        + 'Error: Content not found for \'embed-doc-no-resolvers\'\n'
        + '</div>\n'
        + '</div>\n'
        + '</p>\n'
        + '</p>\n',
  },
  // cycles
  {
    descr: 'wikiembed; md; cycle; self',
    mkdn: '![[cycle-self-embed-doc]]',
    html: '<p>\n'
        + '<p>\n'
        + '<div class="embed-wrapper">\n'
        + '<div class="embed-title">\n'
        + '<a class="wiki embed" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">\n'
        + 'cycle self embedded document\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-link">\n'
        + '<a class="embed-link-icon" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">\n'
        + '<i class="link-icon"></i>\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-content">\n'
        + '<p>\n'
        + '<p>\n'
        + '<div class="embed-wrapper">\n'
        + '<div class="embed-title">\n'
        + '<a class="wiki embed" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">\n'
        + 'cycle self embedded document\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-link">\n'
        + '<a class="embed-link-icon" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">\n'
        + '<i class="link-icon"></i>\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-content">\n'
        + 'cycle detected\n'
        + '</div>\n'
        + '</div>\n'
        + '</p>\n'
        + '</p>\n'
        + '\n'
        + '</div>\n'
        + '</div>\n'
        + '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; md; cycle; nested',
    mkdn: '![[cycle-nest-embed-doc]]',
    html: '<p>\n'
        + '<p>\n'
        + '<div class="embed-wrapper">\n'
        + '<div class="embed-title">\n'
        + '<a class="wiki embed" href="/tests/fixtures/cycle-nest-embed-doc" data-href="/tests/fixtures/cycle-nest-embed-doc">\n'
        + 'cycle nested embedded document\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-link">\n'
        + '<a class="embed-link-icon" href="/tests/fixtures/cycle-nest-embed-doc" data-href="/tests/fixtures/cycle-nest-embed-doc">\n'
        + '<i class="link-icon"></i>\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-content">\n'
        + '<p>\n'
        + '<p>\n'
        + '<div class="embed-wrapper">\n'
        + '<div class="embed-title">\n'
        + '<a class="wiki embed" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">\n'
        + 'cycle self embedded document\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-link">\n'
        + '<a class="embed-link-icon" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">\n'
        + '<i class="link-icon"></i>\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-content">\n'
        + '<p>\n'
        + '<p>\n'
        + '<div class="embed-wrapper">\n'
        + '<div class="embed-title">\n'
        + '<a class="wiki embed" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">\n'
        + 'cycle self embedded document\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-link">\n'
        + '<a class="embed-link-icon" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">\n'
        + '<i class="link-icon"></i>\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-content">\n'
        + 'cycle detected\n'
        + '</div>\n'
        + '</div>\n'
        + '</p>\n'
        + '</p>\n'
        + '\n'
        + '</div>\n'
        + '</div>\n'
        + '</p>\n'
        + '</p>\n'
        + '\n'
        + '</div>\n'
        + '</div>\n'
        + '</p>\n'
        + '</p>\n',
  },
  // escaped
  {
    descr: 'wikiembed; md; escaped; code fence',
    mkdn: '`![[fname-a]]`\n',
    html: '<p><code>![[fname-a]]</code></p>\n',
  },
  {
    descr: 'wikiembed; md; escaped; backslash',
    mkdn: '\\!\\[\\[fname-a\\]\\]\n',
    html: '<p>![[fname-a]]</p>\n',
  },
  {
    descr: 'wikiembed; md; escaped; whitespace prefix >= 4 spaces',
    mkdn: '    ![[fname-a]]\n',
    html: '<pre><code>![[fname-a]]\n</code></pre>\n',
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
        + '<p>\n'
        + '<span class="embed-media" src="audio.mp3" alt="audio.mp3">\n'
        + '<audio class="embed-audio" controls type="audio/mp3" src="/tests/fixtures/audio.mp3"></audio>\n'
        + '</span>\n'
        + '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; audio; mp3; render fallback; no \'htmlHref\'',
    mkdn: '![[missing-audio.mp3]]',
    html: '<p>\n'
        + '<p>\n'
        + '<span class="embed-media" src="missing-audio.mp3" alt="missing-audio.mp3">\n'
        + '<audio class="embed-audio" controls type="audio/mp3"></audio>\n'
        + '</span>\n'
        + '</p>\n'
        + '</p>\n',
  },
  // img
  // png
  {
    descr: 'wikiembed; img; png',
    mkdn: '![[image.png]]',
    html: '<p>\n'
        + '<p>\n'
        + '<span class="embed-media" src="image.png" alt="image.png">\n'
        + '<img class="embed-image" src="/tests/fixtures/image.png">\n'
        + '</span>\n'
        + '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; img; png; render fallback; no \'htmlHref\'',
    mkdn: '![[missing-image.png]]',
    html: '<p>\n'
        + '<p>\n'
        + '<span class="embed-media" src="missing-image.png" alt="missing-image.png">\n'
        + '<img class="embed-image">\n'
        + '</span>\n'
        + '</p>\n'
        + '</p>\n',
  },
  // video
  // mp4
  {
    descr: 'wikiembed; video; mp4',
    mkdn: '![[video.mp4]]',
    html: '<p>\n'
        + '<p>\n'
        + '<span class="embed-media" src="video.mp4" alt="video.mp4">\n'
        + '<video class="embed-video" controls type="video/mp4" src="/tests/fixtures/video.mp4"></video>\n'
        + '</span>\n'
        + '</p>\n'
        + '</p>\n',
  },
  {
    descr: 'wikiembed; video; mp4; render fallback; no \'htmlHref\'',
    mkdn: '![[missing-video.mp4]]',
    html: '<p>\n'
        + '<p>\n'
        + '<span class="embed-media" src="missing-video.mp4" alt="missing-video.mp4">\n'
        + '<video class="embed-video" controls type="video/mp4"></video>\n'
        + '</span>\n'
        + '</p>\n'
        + '</p>\n',
  },
  // invalid media kind -- will just be processed as markdown
  {
    descr: 'wikiembed; invalid media kind (handled as markdown -- similar to no \'embedContent\' and \'htmlText\')',
    mkdn: '![[invalid.abc]]',
    html: '<p>\n'
        + '<p>\n'
        + '<div class="embed-wrapper">\n'
        + '<div class="embed-title">\n'
        + '<a class="wiki embed" href="/tests/fixtures/invalid.abc" data-href="/tests/fixtures/invalid.abc">\n'
        + 'invalid.abc\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-link">\n'
        + '<a class="embed-link-icon" href="/tests/fixtures/invalid.abc" data-href="/tests/fixtures/invalid.abc">\n'
        + '<i class="link-icon"></i>\n'
        + '</a>\n'
        + '</div>\n'
        + '<div class="embed-content">\n'
        + 'Error: Content not found for \'invalid.abc\'\n'
        + '</div>\n'
        + '</div>\n'
        + '</p>\n'
        + '</p>\n',
  },
];
