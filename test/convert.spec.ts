import assert from 'node:assert/strict';

import * as wikirefs from '../src';


const testMkdnToWiki = (params: any) => () => {
  const input: string = params.icontent;
  const expdOutput: string = params.ocontent;
  const opts: any = params.opts ? params.opts : {};
  const actlOutput: any = wikirefs.mkdnToWiki(input, opts);
  assert.deepStrictEqual(actlOutput, expdOutput);
};

const testWikiToMkdn = (params: any) => () => {
  const input: string = params.icontent;
  const expdOutput: string = params.ocontent;
  const opts: any = params.opts ? params.opts : {};
  const actlOutput: any = wikirefs.wikiToMkdn(input, opts);
  assert.deepStrictEqual(actlOutput, expdOutput);
};

describe('convert', () => {

  describe('links', () => {

    describe('mkdn -> wiki', () => {

      it('empty', testMkdnToWiki({
        icontent: 'no links here!',
        opts: {},
        ocontent: 'no links here!',
      }));

      describe('attr', () => {

        it('single', testMkdnToWiki({
          icontent: ':attrtype:: [fname-a](/fname-a)\n',
          opts: {},
          ocontent: ':attrtype:: [[fname-a]]\n',
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

        it('list; mkdn', testMkdnToWiki({
          icontent: ':attrtype::\n- [fname-a](/fname-a)\n- [fname-b](/fname-b)\n',
          opts: {},
          ocontent: ':attrtype::\n- [[fname-a]]\n- [[fname-b]]\n',
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

        it('label', testMkdnToWiki({
          icontent: '[label](/fname-a)',
          opts: {},
          ocontent: '[[fname-a|label]]',
        }));

        it('zombie (defaults to filename format)', testMkdnToWiki({
          icontent: 'here is a link: [zombie](/zombie)',
          opts: {},
          ocontent: 'here is a link: [[zombie]]',
        }));

      });

      describe('embed', () => {

        it.skip('markdown', testMkdnToWiki({
          icontent: '![](/fname-a)',
          opts: {},
          ocontent: '![[fname-a]]',
        }));

        it('image', testMkdnToWiki({
          icontent: '![](/img.png)',
          opts: {},
          ocontent: '![[img.png]]',
        }));

        it.skip('audio', testMkdnToWiki({
          icontent: '![](/aud.mp3)',
          opts: {},
          ocontent: '![[aud.mp3]]',
        }));

        it.skip('video', testMkdnToWiki({
          icontent: '![](/vid.mp4)',
          opts: {},
          ocontent: '![[vid.mp4]]',
        }));

      });

      describe('opts', () => {

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

        it('label', testWikiToMkdn({
          icontent: 'here is a link: [[fname-a|label]]',
          opts: {},
          ocontent: 'here is a link: [label](/fname-a)',
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

        it.skip('audio', testWikiToMkdn({
          icontent: '![[aud.mp3]]',
          opts: {},
          ocontent: '[](/aud.mp3)',
        }));

        it.skip('video', testWikiToMkdn({
          icontent: '![[vid.mp4]]',
          opts: {},
          ocontent: '[](/vid.mp4)',
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