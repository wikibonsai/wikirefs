import type { WikiRefTestCase } from '../types';


export const wikiEmbedCases: WikiRefTestCase[] = [
  ////
  // markdown
  {
    descr: 'wikiembed; md',
    mkdn: '![[embed-doc]]',
    html:
`<p>
<p>
<div class="embed-wrapper">
<div class="embed-title">
<a class="wiki embed" href="/tests/fixtures/embed-doc" data-href="/tests/fixtures/embed-doc">
embedded document
</a>
</div>
<div class="embed-link">
<a class="embed-link-icon" href="/tests/fixtures/embed-doc" data-href="/tests/fixtures/embed-doc">
<i class="link-icon"></i>
</a>
</div>
<div class="embed-content">
<p>Here is some content.</p>

</div>
</div>
</p>
</p>
`,
  },
  {
    descr: 'wikiembed; md; nested',
    mkdn: '![[nested-embed-doc]]',
    html:
`<p>
<p>
<div class="embed-wrapper">
<div class="embed-title">
<a class="wiki embed" href="/tests/fixtures/nested-embed-doc" data-href="/tests/fixtures/nested-embed-doc">
nested embedded document
</a>
</div>
<div class="embed-link">
<a class="embed-link-icon" href="/tests/fixtures/nested-embed-doc" data-href="/tests/fixtures/nested-embed-doc">
<i class="link-icon"></i>
</a>
</div>
<div class="embed-content">
<p>Here is some content with another 
<p>
<div class="embed-wrapper">
<div class="embed-title">
<a class="wiki embed" href="/tests/fixtures/embed-doc" data-href="/tests/fixtures/embed-doc">
embedded document
</a>
</div>
<div class="embed-link">
<a class="embed-link-icon" href="/tests/fixtures/embed-doc" data-href="/tests/fixtures/embed-doc">
<i class="link-icon"></i>
</a>
</div>
<div class="embed-content">
<p>Here is some content.</p>

</div>
</div>
</p>
.</p>

</div>
</div>
</p>
</p>
`,
  },
  // render fallbacks
  {
    descr: 'wikiembed; md; render fallback; no \'embedContent\'',
    mkdn: '![[embed-doc-no-content]]',
    html:
`<p>
<p>
<div class="embed-wrapper">
<div class="embed-title">
<a class="wiki embed" href="/tests/fixtures/embed-doc-no-content" data-href="/tests/fixtures/embed-doc-no-content">
embedded document without content
</a>
</div>
<div class="embed-link">
<a class="embed-link-icon" href="/tests/fixtures/embed-doc-no-content" data-href="/tests/fixtures/embed-doc-no-content">
<i class="link-icon"></i>
</a>
</div>
<div class="embed-content">
Error: Content not found for 'embed-doc-no-content'
</div>
</div>
</p>
</p>
`,
  },
  {
    descr: 'wikiembed; md; render fallback; no \'htmlText\'',
    mkdn: '![[embed-doc-no-html-text]]',
    html:
`<p>
<p>
<div class="embed-wrapper">
<div class="embed-title">
<a class="wiki embed" href="/tests/fixtures/embed-doc-no-html-text" data-href="/tests/fixtures/embed-doc-no-html-text">
embed-doc-no-html-text
</a>
</div>
<div class="embed-link">
<a class="embed-link-icon" href="/tests/fixtures/embed-doc-no-html-text" data-href="/tests/fixtures/embed-doc-no-html-text">
<i class="link-icon"></i>
</a>
</div>
<div class="embed-content">
<p>Here is some content.</p>

</div>
</div>
</p>
</p>
`,
  },
  {
    descr: 'wikiembed; md; render fallback; no \'htmlHref\'',
    mkdn: '![[embed-doc-no-html-href]]',
    html:
`<p>
<p>
<div class="embed-wrapper">
<div class="embed-title">
<a class="wiki embed invalid">
embedded document without html href
</a>
</div>
<div class="embed-link">
<a class="embed-link-icon invalid">
<i class="link-icon"></i>
</a>
</div>
<div class="embed-content">
<p>Here is some content.</p>

</div>
</div>
</p>
</p>
`,
  },
  {
    descr: 'wikiembed; md; render fallback; no \'embedContent\', \'htmlText\', or \'htmlHref\'',
    mkdn: '![[embed-doc-no-resolvers]]',
    html:
`<p>
<p>
<div class="embed-wrapper">
<div class="embed-title">
<a class="wiki embed invalid">
embed-doc-no-resolvers
</a>
</div>
<div class="embed-link">
<a class="embed-link-icon invalid">
<i class="link-icon"></i>
</a>
</div>
<div class="embed-content">
Error: Content not found for 'embed-doc-no-resolvers'
</div>
</div>
</p>
</p>
`,
  },
  // cycles
  {
    descr: 'wikiembed; md; cycle; self',
    mkdn: '![[cycle-self-embed-doc]]',
    html:
`<p>
<p>
<div class="embed-wrapper">
<div class="embed-title">
<a class="wiki embed" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">
cycle self embedded document
</a>
</div>
<div class="embed-link">
<a class="embed-link-icon" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">
<i class="link-icon"></i>
</a>
</div>
<div class="embed-content">
<p>
<p>
<div class="embed-wrapper">
<div class="embed-title">
<a class="wiki embed" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">
cycle self embedded document
</a>
</div>
<div class="embed-link">
<a class="embed-link-icon" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">
<i class="link-icon"></i>
</a>
</div>
<div class="embed-content">
cycle detected
</div>
</div>
</p>
</p>

</div>
</div>
</p>
</p>
`,
  },
  {
    descr: 'wikiembed; md; cycle; nested',
    mkdn: '![[cycle-nest-embed-doc]]',
    html:
`<p>
<p>
<div class="embed-wrapper">
<div class="embed-title">
<a class="wiki embed" href="/tests/fixtures/cycle-nest-embed-doc" data-href="/tests/fixtures/cycle-nest-embed-doc">
cycle nested embedded document
</a>
</div>
<div class="embed-link">
<a class="embed-link-icon" href="/tests/fixtures/cycle-nest-embed-doc" data-href="/tests/fixtures/cycle-nest-embed-doc">
<i class="link-icon"></i>
</a>
</div>
<div class="embed-content">
<p>
<p>
<div class="embed-wrapper">
<div class="embed-title">
<a class="wiki embed" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">
cycle self embedded document
</a>
</div>
<div class="embed-link">
<a class="embed-link-icon" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">
<i class="link-icon"></i>
</a>
</div>
<div class="embed-content">
<p>
<p>
<div class="embed-wrapper">
<div class="embed-title">
<a class="wiki embed" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">
cycle self embedded document
</a>
</div>
<div class="embed-link">
<a class="embed-link-icon" href="/tests/fixtures/cycle-self-embed-doc" data-href="/tests/fixtures/cycle-self-embed-doc">
<i class="link-icon"></i>
</a>
</div>
<div class="embed-content">
cycle detected
</div>
</div>
</p>
</p>

</div>
</div>
</p>
</p>

</div>
</div>
</p>
</p>
`,
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
    html:
`<p>
<p>
<span class="embed-media" src="audio.mp3" alt="audio.mp3">
<audio class="embed-audio" controls type="audio/mp3" src="/tests/fixtures/audio.mp3"></audio>
</span>
</p>
</p>
`,
  },
  {
    descr: 'wikiembed; audio; mp3; render fallback; no \'htmlHref\'',
    mkdn: '![[missing-audio.mp3]]',
    html:
`<p>
<p>
<span class="embed-media" src="missing-audio.mp3" alt="missing-audio.mp3">
<audio class="embed-audio" controls type="audio/mp3"></audio>
</span>
</p>
</p>
`,
  },
  // img
  // png
  {
    descr: 'wikiembed; img; png',
    mkdn: '![[image.png]]',
    html:
`<p>
<p>
<span class="embed-media" src="image.png" alt="image.png">
<img class="embed-image" src="/tests/fixtures/image.png">
</span>
</p>
</p>
`,
  },
  {
    descr: 'wikiembed; img; png; render fallback; no \'htmlHref\'',
    mkdn: '![[missing-image.png]]',
    html:
`<p>
<p>
<span class="embed-media" src="missing-image.png" alt="missing-image.png">
<img class="embed-image">
</span>
</p>
</p>
`,
  },
  // video
  // mp4
  {
    descr: 'wikiembed; video; mp4',
    mkdn: '![[video.mp4]]',
    html:
`<p>
<p>
<span class="embed-media" src="video.mp4" alt="video.mp4">
<video class="embed-video" controls type="video/mp4" src="/tests/fixtures/video.mp4"></video>
</span>
</p>
</p>
`,
  },
  {
    descr: 'wikiembed; video; mp4; render fallback; no \'htmlHref\'',
    mkdn: '![[missing-video.mp4]]',
    html:
`<p>
<p>
<span class="embed-media" src="missing-video.mp4" alt="missing-video.mp4">
<video class="embed-video" controls type="video/mp4"></video>
</span>
</p>
</p>
`,
  },
  // invalid media kind -- will just be processed as markdown
  {
    descr: 'wikiembed; invalid media kind (handled as markdown -- similar to no \'embedContent\' and \'htmlText\')',
    mkdn: '![[invalid.abc]]',
    html:
`<p>
<p>
<div class="embed-wrapper">
<div class="embed-title">
<a class="wiki embed" href="/tests/fixtures/invalid.abc" data-href="/tests/fixtures/invalid.abc">
invalid.abc
</a>
</div>
<div class="embed-link">
<a class="embed-link-icon" href="/tests/fixtures/invalid.abc" data-href="/tests/fixtures/invalid.abc">
<i class="link-icon"></i>
</a>
</div>
<div class="embed-content">
Error: Content not found for 'invalid.abc'
</div>
</div>
</p>
</p>
`,
  },
];
