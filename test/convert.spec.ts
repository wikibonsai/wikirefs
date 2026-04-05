import assert from 'node:assert/strict';
import sinon from 'sinon';

import * as wikirefs from '../src';


let fakeConsoleWarn: sinon.SinonSpy;

const testMkdnToWiki = (params: any) => () => {
  const input: string = params.icontent;
  const expdOutput: string = params.ocontent;
  const opts: any = params.opts ? params.opts : {};
  const actlOutput: any = wikirefs.mkdnToWiki(input, opts);
  assert.deepStrictEqual(actlOutput, expdOutput);
  if (params.warn) {
    assert.strictEqual(fakeConsoleWarn.callCount, 1);
    assert.strictEqual(
      fakeConsoleWarn.firstCall.args[0],
      params.warn,
    );
    assert.ok(fakeConsoleWarn.calledWith(params.warn));
  }
};

const testWikiToMkdn = (params: any) => () => {
  const input: string = params.icontent;
  const expdOutput: string = params.ocontent;
  const opts: any = params.opts ? params.opts : {};
  const actlOutput: any = wikirefs.wikiToMkdn(input, opts);
  assert.deepStrictEqual(actlOutput, expdOutput);
  if (params.warn) {
    assert.strictEqual(fakeConsoleWarn.callCount, 1);
    assert.strictEqual(
      fakeConsoleWarn.firstCall.args[0],
      params.warn,
    );
    assert.ok(fakeConsoleWarn.calledWith(params.warn));
  }
};

describe('convert', () => {

  describe('links', () => {

    describe('mkdn -> wiki', () => {

      it('empty', testMkdnToWiki({
        icontent: 'no links here!',
        opts: {},
        ocontent: 'no links here!',
      }));

      describe('escaped', () => {

        it('code span; link not converted', testMkdnToWiki({
          icontent: 'see `[fname-a](/fname-a)` in code',
          opts: {},
          ocontent: 'see `[fname-a](/fname-a)` in code',
        }));

        it('code span; image not converted', testMkdnToWiki({
          icontent: 'see `![](/img.png)` in code',
          opts: {},
          ocontent: 'see `![](/img.png)` in code',
        }));

        it('code fence; link not converted', testMkdnToWiki({
          icontent: '```\n[fname-a](/fname-a)\n```',
          opts: {},
          ocontent: '```\n[fname-a](/fname-a)\n```',
        }));

        it('outside code span; link converted', testMkdnToWiki({
          icontent: '[fname-a](/fname-a) and `some code`',
          opts: {},
          ocontent: '[[fname-a]] and `some code`',
        }));

      });

      describe('attr', () => {

        it('single', testMkdnToWiki({
          icontent: ':attrtype:: [fname-a](/fname-a)\n',
          opts: {},
          ocontent: ':attrtype:: [[fname-a]]\n',
        }));

        it('single; header; kebab-case', testMkdnToWiki({
          icontent: ':attrtype:: [fname-a#header-text](/fname-a#header-text)\n',
          opts: {},
          ocontent: ':attrtype:: [[fname-a#header-text]]\n',
        }));

        it('single; header; Title Case', testMkdnToWiki({
          icontent: ':attrtype:: [fname-a#Header Text](/fname-a#Header%20Text)\n',
          opts: {},
          ocontent: ':attrtype:: [[fname-a#Header Text]]\n',
        }));

        it('list; comma', testMkdnToWiki({
          icontent: ':attrtype:: [fname-a](/fname-a), [fname-b](/fname-b)\n',
          opts: {},
          ocontent: ':attrtype:: [[fname-a]], [[fname-b]]\n',
        }));

        it.skip('list; comma; preserve whitespace', testMkdnToWiki({
          icontent: ':attrtype::[fname-a](/fname-a) ,  [fname-b](/fname-b)\n',
          opts: {},
          ocontent: ':attrtype::[[fname-a]] ,  [[fname-b]]\n',
        }));

        it('list; comma; header', testMkdnToWiki({
          icontent: ':attrtype:: [fname-a](/fname-a#header-text), [fname-b](/fname-b#other-header)\n',
          opts: {},
          ocontent: ':attrtype:: [[fname-a#header-text]], [[fname-b#other-header]]\n',
        }));

        it('list; mkdn', testMkdnToWiki({
          icontent: ':attrtype::\n- [fname-a](/fname-a)\n- [fname-b](/fname-b)\n',
          opts: {},
          ocontent: ':attrtype::\n- [[fname-a]]\n- [[fname-b]]\n',
        }));

        it('list; mkdn; header', testMkdnToWiki({
          icontent: ':attrtype::\n- [fname-a](/fname-a#header-text)\n- [fname-b](/fname-b#other-header)\n',
          opts: {},
          ocontent: ':attrtype::\n- [[fname-a#header-text]]\n- [[fname-b#other-header]]\n',
        }));

        it('labelled; header', testMkdnToWiki({
          icontent: ':attrtype:: [Jump](/fname-a#header-text)\n',
          opts: {},
          ocontent: ':attrtype:: [[fname-a#header-text|Jump]]\n',
        }));

      });

      describe('link', () => {

        it('filename format', testMkdnToWiki({
          icontent: 'here is a link: [fname-a](/fname-a)',
          opts: {},
          ocontent: 'here is a link: [[fname-a]]',
        }));

        it.skip('filename format; unslugify', testMkdnToWiki({
          icontent: 'here is a link: [fname-a](/fname-a)',
          opts: {},
          ocontent: 'here is a link: [[FName A]]',
        }));

        it('filename format; include file extension', testMkdnToWiki({
          icontent: 'here is a link: [fname-a](/fname-a.md)',
          opts: {},
          ocontent: 'here is a link: [[fname-a]]',
        }));

        it('filename format; nested path', testMkdnToWiki({
          icontent: '[fname-a](/path/to/fname-a)',
          opts: {},
          ocontent: '[[fname-a]]',
        }));

        it('filename format; no leading slash', testMkdnToWiki({
          icontent: '[fname-a](fname-a)',
          opts: {},
          ocontent: '[[fname-a]]',
        }));

        it('header; kebab-case', testMkdnToWiki({
          icontent: '[fname-a](/fname-a#header-text)',
          opts: {},
          ocontent: '[[fname-a#header-text]]',
        }));

        it('header; Title Case', testMkdnToWiki({
          icontent: '[fname-a](/fname-a#Header%20Text)',
          opts: {},
          ocontent: '[[fname-a#Header Text]]',
        }));

        it('labelled', testMkdnToWiki({
          icontent: '[label](/fname-a)',
          opts: {},
          ocontent: '[[fname-a|label]]',
        }));

        it('labelled; with spaces', testMkdnToWiki({
          icontent: '[my label](/fname-a)',
          opts: {},
          ocontent: '[[fname-a|my label]]',
        }));

        it('labelled; matches filename (unlabelled)', testMkdnToWiki({
          icontent: '[fname-a](/fname-a)',
          opts: {},
          ocontent: '[[fname-a]]',
        }));

        it('labelled; empty', testMkdnToWiki({
          icontent: '[](/fname-a)',
          opts: {},
          ocontent: '[[fname-a]]',
        }));

        it('labelled; header; kabob-case', testMkdnToWiki({
          icontent: 'see [text](/fname-a#header-text)\n',
          opts: {},
          ocontent: 'see [[fname-a#header-text|text]]\n',
        }));

        it('labelled; header; Title Case', testMkdnToWiki({
          icontent: 'see [text](/fname-a#Header%20Text)\n',
          opts: {},
          ocontent: 'see [[fname-a#Header Text|text]]\n',
        }));

        it('labelled; header; label is target', testMkdnToWiki({
          icontent: '[fname-a#header-text](/fname-a#header-text)',
          opts: {},
          ocontent: '[[fname-a#header-text]]',
        }));

        it('labelled; header; empty', testMkdnToWiki({
          icontent: '[](/fname-a#header-text)',
          opts: {},
          ocontent: '[[fname-a#header-text]]',
        }));

        it('zombie (defaults to filename format)', testMkdnToWiki({
          icontent: 'here is a link: [zombie](/zombie)',
          opts: {},
          ocontent: 'here is a link: [[zombie]]',
        }));

      });

      describe('embed', () => {

        it('markdown', testMkdnToWiki({
          icontent: '![](/fname-a)',
          opts: {},
          ocontent: '![[fname-a]]',
        }));

        it('image', testMkdnToWiki({
          icontent: '![](/img.png)',
          opts: {},
          ocontent: '![[img.png]]',
        }));

        it('image; nested path', testMkdnToWiki({
          icontent: '![](/path/to/img.png)',
          opts: {},
          ocontent: '![[img.png]]',
        }));

        it('embed; header; kabob-case', testMkdnToWiki({
          icontent: '![](/img.png#header-text)',
          opts: {},
          ocontent: '![[img.png#header-text]]',
        }));

        it('embed; header; Title Case', testMkdnToWiki({
          icontent: '![](/img.png#Header%20Text)',
          opts: {},
          ocontent: '![[img.png#Header Text]]',
        }));

        it('audio', testMkdnToWiki({
          icontent: '![](/aud.mp3)',
          opts: {},
          ocontent: '![[aud.mp3]]',
        }));

        it('video', testMkdnToWiki({
          icontent: '![](/vid.mp4)',
          opts: {},
          ocontent: '![[vid.mp4]]',
        }));

      });

      describe('opts', () => {

        beforeEach(() => {
          console.warn = (msg) => msg + '\n';
          fakeConsoleWarn = sinon.spy(console, 'warn');
        });

        afterEach(() => {
          fakeConsoleWarn.restore();
        });

        describe('kind', () => {

          it.skip('only wikiattrs', testMkdnToWiki({
            icontent: ':attrtype:: [fname-a](/fname-a)\nhere is a link: [fname-a](/fname-a)\nand an embed: ![](/img.png)',
            opts: {
              kind: 'wikiattr',
            },
            ocontent: ':attrtype:: [[fname-a]]\nhere is a link: [fname-a](/fname-a)\nand an embed: ![](/img.png)',
          }));

          it('only wikilinks (+ wikiattrs)', testMkdnToWiki({
            icontent: ':attrtype:: [fname-a](/fname-a)\nhere is a link: [fname-a](/fname-a)\nand an embed: ![](/img.png)',
            opts: {
              kind: 'wikilink',
            },
            ocontent: ':attrtype:: [[fname-a]]\nhere is a link: [[fname-a]]\nand an embed: ![](/img.png)',
          }));

          it('only wikiembeds', testMkdnToWiki({
            icontent: ':attrtype:: [fname-a](/fname-a)\nhere is a link: [fname-a](/fname-a)\nand an embed: ![](/img.png)',
            opts: {
              kind: 'wikiembed',
            },
            ocontent: ':attrtype:: [fname-a](/fname-a)\nhere is a link: [fname-a](/fname-a)\nand an embed: ![[img.png]]',
          }));

          it('warn; invalid wiki construct kind -- defaults to "wikiref"', testMkdnToWiki({
            icontent: ':attrtype:: [fname-a](/fname-a)\nhere is a link: [fname-a](/fname-a)\nand an embed: ![](/img.png)',
            opts: {
              kind: 'noop',
            },
            ocontent: ':attrtype:: [[fname-a]]\nhere is a link: [[fname-a]]\nand an embed: ![[img.png]]',
            warn: 'invalid kind: "noop"; using default instead: "wikiref"',
          }));

        });

        describe('uri format', () => {

          it.skip('relative path format', testMkdnToWiki({
            icontent: 'here is a link: [fname-a](/fixtures/fname-a)',
            opts: {
              format: 'relative',
            },
            ocontent: 'here is a link: [[fname-a]]',
          }));

          it.skip('absolute path format', testMkdnToWiki({
            icontent: 'here is a link: [fname-a](/test/fixtures/fname-a)',
            opts: {
              format: 'absolute',
            },
            ocontent: 'here is a link: [[fname-a]]',
          }));

          it('warn; invalid uri format -- defaults to "filename"', testMkdnToWiki({
            icontent: 'here is a link: [fname-a](/fname-a)',
            opts: {
              format: 'noop',
            },
            ocontent: 'here is a link: [[fname-a]]',
            warn: 'invalid uri format: "noop"; using default instead: "filename"',
          }));

        });

        describe('uriToFnameHash', () => {

          it('with absolute path', testMkdnToWiki({
            icontent: ':attrtype:: [fname-a](/test/fixtures/fname-a)\nhere is a link: [fname-a](/test/fixtures/fname-a)\nand an embed: ![](/test/fixtures/media/img.png)',
            opts: {
              format: 'absolute',
              uriToFnameHash: {
                '/test/fixtures/fname-a': 'fname-a',
                '/test/fixtures/media/img.png': 'img.png',
              },
            },
            ocontent: ':attrtype:: [[fname-a]]\nhere is a link: [[fname-a]]\nand an embed: ![[img.png]]',
          }));

        });

      });

    });

    describe('wiki -> mkdn', () => {

      it('empty', testWikiToMkdn({
        icontent: 'no links here!',
        opts: {},
        ocontent: 'no links here!',
      }));

      describe('attr', () => {

        it('single', testWikiToMkdn({
          icontent: ':attrtype:: [[fname-a]]\n',
          opts: {},
          ocontent: ':attrtype:: [fname-a](/fname-a)\n',
        }));

        it('list; comma', testWikiToMkdn({
          icontent: ':attrtype:: [[fname-a]], [[fname-b]]\n',
          opts: {},
          ocontent: ':attrtype:: [fname-a](/fname-a), [fname-b](/fname-b)\n',
        }));

        it.skip('list; comma; preserve whitespace', testWikiToMkdn({
          icontent: ':attrtype::[[fname-a]] ,  [[fname-b]]\n',
          opts: {},
          ocontent: ':attrtype::[fname-a](/fname-a) ,  [fname-b](/fname-b)\n',
        }));

        it('list; mkdn', testWikiToMkdn({
          icontent: ':attrtype::\n- [[fname-a]]\n- [[fname-b]]\n',
          opts: {},
          ocontent: ':attrtype::\n- [fname-a](/fname-a)\n- [fname-b](/fname-b)\n',
        }));

        it('header; kebab-case', testWikiToMkdn({
          icontent: ':attrtype:: [[fname-a#header-text]]\n',
          opts: {},
          ocontent: ':attrtype:: [fname-a](/fname-a#header-text)\n',
        }));

        it('single; header; Title Case', testWikiToMkdn({
          icontent: ':attrtype:: [[fname-a#Header Text]]\n',
          opts: {},
          ocontent: ':attrtype:: [fname-a](/fname-a#Header%20Text)\n',
        }));

        it('labelled; header', testWikiToMkdn({
          icontent: ':attrtype:: [[fname-a#header-text|label]]\n',
          opts: {},
          ocontent: ':attrtype:: [label](/fname-a#header-text)\n',
        }));

        it('labelled; header; Title Case', testWikiToMkdn({
          icontent: ':attrtype:: [[fname-a#Header Text|label]]\n',
          opts: {},
          ocontent: ':attrtype:: [label](/fname-a#Header%20Text)\n',
        }));

      });

      describe('link', () => {

        it('filename format', testWikiToMkdn({
          icontent: 'here is a link: [[fname-a]]',
          opts: {},
          ocontent: 'here is a link: [fname-a](/fname-a)',
        }));

        it('filename format; slugify', testWikiToMkdn({
          icontent: 'here is a link: [[FName A]]',
          opts: {},
          ocontent: 'here is a link: [FName A](/fname-a)',
        }));

        it('filename format; include file extension', testWikiToMkdn({
          icontent:'here is a link: [[fname-a]]',
          opts: {
            ext: true,
          },
          ocontent: 'here is a link: [fname-a](/fname-a.md)',
        }));

        it('labelled', testWikiToMkdn({
          icontent: 'here is a link: [[fname-a|label]]',
          opts: {},
          ocontent: 'here is a link: [label](/fname-a)',
        }));

        it('header; kebab-case', testWikiToMkdn({
          icontent: 'here is a link: [[fname-a#header-text]]',
          opts: {},
          ocontent: 'here is a link: [fname-a](/fname-a#header-text)',
        }));

        it('header; Title Case', testWikiToMkdn({
          icontent: 'here is a link: [[fname-a#Header Text]]',
          opts: {},
          ocontent: 'here is a link: [fname-a](/fname-a#Header%20Text)',
        }));

        it('labelled; empty (not a valid wikilink — passes through)', testWikiToMkdn({
          icontent: 'here is a link: [[fname-a|]]',
          opts: {},
          ocontent: 'here is a link: [[fname-a|]]',
        }));

        it('labelled; header; kabob-case', testWikiToMkdn({
          icontent: 'here is a link: [[fname-a#header-text|label]]',
          opts: {},
          ocontent: 'here is a link: [label](/fname-a#header-text)',
        }));

        it('labelled; header; Title Case', testWikiToMkdn({
          icontent: 'here is a link: [[fname-a#Header Text|label]]',
          opts: {},
          ocontent: 'here is a link: [label](/fname-a#Header%20Text)',
        }));

        it('labelled; header; label is target', testWikiToMkdn({
          icontent: 'here is a link: [[fname-a#header-text|fname-a#header-text]]',
          opts: {},
          ocontent: 'here is a link: [fname-a#header-text](/fname-a#header-text)',
        }));

        it('labelled; header; empty (not a valid wikilink — passes through)', testWikiToMkdn({
          icontent: 'here is a link: [[fname-a#header-text|]]',
          opts: {},
          ocontent: 'here is a link: [[fname-a#header-text|]]',
        }));

        it('zombie (defaults to filename format)', testWikiToMkdn({
          icontent: 'here is a link: [[zombie]]',
          opts: {},
          ocontent: 'here is a link: [zombie](/zombie)',
        }));

      });

      describe('embed', () => {

        it('markdown', testWikiToMkdn({
          icontent: 'here is an embed: ![[fname-a]]',
          opts: {},
          ocontent: 'here is an embed: [fname-a](/fname-a)',
        }));

        it('image', testWikiToMkdn({
          icontent: '![[img.png]]',
          opts: {},
          ocontent: '![](/img.png)',
        }));

        it('audio', testWikiToMkdn({
          icontent: '![[aud.mp3]]',
          opts: {},
          ocontent: '[aud.mp3](/aud.mp3)',
        }));

        it('video', testWikiToMkdn({
          icontent: '![[vid.mp4]]',
          opts: {},
          ocontent: '[vid.mp4](/vid.mp4)',
        }));

      });

      describe('opts', () => {

        describe('kind', () => {

          it.skip('only wikiattrs', testWikiToMkdn({
            icontent: ':attrtype:: [[fname-a]]\nhere is a link: [[fname-a]]\nand an embed: ![[img.png]]',
            opts: {
              kind: 'wikiattr',
            },
            ocontent: ':attrtype:: [fname-a](/fname-a)\nhere is a link: [[fname-a]]\nand an embed: ![[img.png]]',
          }));

          it('only wikilinks (+ wikiattrs)', testWikiToMkdn({
            icontent: ':attrtype:: [[fname-a]]\nhere is a link: [[fname-a]]\nand an embed: ![[img.png]]',
            opts: {
              kind: 'wikilink',
            },
            ocontent: ':attrtype:: [fname-a](/fname-a)\nhere is a link: [fname-a](/fname-a)\nand an embed: ![[img.png]]',
          }));

          it('only wikiembeds', testWikiToMkdn({
            icontent: ':attrtype:: [[fname-a]]\nhere is a link: [[fname-a]]\nand an embed: ![[img.png]]',
            opts: {
              kind: 'wikiembed',
            },
            ocontent: ':attrtype:: [[fname-a]]\nhere is a link: [[fname-a]]\nand an embed: ![](/img.png)',
          }));

          it('invalid wiki construct kind -- defaults to "wikiref"', testWikiToMkdn({
            icontent: ':attrtype:: [[fname-a]]\nhere is a link: [[fname-a]]\nand an embed: ![[img.png]]',
            opts: {
              kind: 'noop',
            },
            ocontent: ':attrtype:: [fname-a](/fname-a)\nhere is a link: [fname-a](/fname-a)\nand an embed: ![](/img.png)',
          }));

        });

        describe('uri format', () => {

          it.skip('relative path format', testWikiToMkdn({
            icontent: 'here is a link: [[fname-a]]',
            opts: {
              format: 'relative',
            },
            ocontent: 'here is a link: [fname-a](/fixtures/fname-a)',
          }));

          it.skip('absolute path format', testWikiToMkdn({
            icontent: 'here is a link: [[fname-a]]',
            opts: {
              format: 'absolute',
            },
            ocontent: 'here is a link: [fname-a](/test/fixtures/fname-a)',
          }));

          it('warn; invalid uri format -- defaults to "filename"', testWikiToMkdn({
            icontent: 'here is a link: [[fname-a]]',
            opts: {
              format: 'noop',
            },
            ocontent: 'here is a link: [fname-a](/fname-a)',
          }));

        });

        describe('fnameToUriHash', () => {

          it('with absolute path', testWikiToMkdn({
            icontent: ':attrtype:: [[fname-a]]\nhere is a link: [[fname-a]]\nand an embed: ![[img.png]]',
            opts: {
              format: 'absolute',
              fnameToUriHash: {
                'fname-a': '/test/fixtures/fname-a',
                'img.png': '/test/fixtures/media/img.png',
              },
            },
            ocontent: ':attrtype:: [fname-a](/test/fixtures/fname-a)\nhere is a link: [fname-a](/test/fixtures/fname-a)\nand an embed: ![](/test/fixtures/media/img.png)',
          }));

        });

      });

    });

  });

});