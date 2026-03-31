import assert from 'node:assert/strict';

import * as wikirefs from '../src';


const oldFileName: string = 'wikilink';
const newFileName: string = 'hello-world';

describe('rename()', () => {

  const testRenameFileName = (params: any) => () => {
    const mkdn: string = params.mkdn;
    const expdMkdn: string = params.expdMkdn;
    const actlMkdn: string = wikirefs.rename(oldFileName, newFileName, mkdn);
    assert.strictEqual(actlMkdn, expdMkdn);
  };

  it('replace only wikitext, not regular text', testRenameFileName({
    mkdn: 'Rename the wikilink in this [[wikilink]].',
    expdMkdn: 'Rename the wikilink in this [[hello-world]].',
  }));

  it('replace exact wikitext match', testRenameFileName({
    mkdn: 'Do not rename greedily -- not [[wikilinking]], but [[wikilink]].',
    expdMkdn: 'Do not rename greedily -- not [[wikilinking]], but [[hello-world]].',
  }));

  it('leave content with no matches alone', testRenameFileName({
    mkdn: 'There are no wikilinks here, so I should look the same!',
    expdMkdn: 'There are no wikilinks here, so I should look the same!',
  }));

  it('regex special chars that are valid filename chars work', () => {
    assert.strictEqual(
      wikirefs.rename(
        'c++',
        'cpp',
        'Hopefully this wikilink -- [[c++]] will get renamed.',
      ),
      'Hopefully this wikilink -- [[cpp]] will get renamed.',
    );
  });

  describe('ref', () => {

    it('all', testRenameFileName({
      mkdn: '\n'
        + ':attrtype::\n'
        + '- [[wikilink]]\n'
        + '- [[wikilink]]\n'
        + '\n'
        + 'this is a :typed::[[wikilink]].\n'
        + '\n'
        + 'this is an untyped [[wikilink]].\n'
        + '\n'
        + '![[wikilink]]\n',
      expdMkdn: '\n'
        + ':attrtype::\n'
        + '- [[hello-world]]\n'
        + '- [[hello-world]]\n'
        + '\n'
        + 'this is a :typed::[[hello-world]].\n'
        + '\n'
        + 'this is an untyped [[hello-world]].\n'
        + '\n'
        + '![[hello-world]]\n',
    }));

  });

  describe('attr', () => {

    it('single', testRenameFileName({
      mkdn: 'attrtype::[[wikilink]]\nHere is some content.',
      expdMkdn: 'attrtype::[[hello-world]]\nHere is some content.',
    }));

    it('list; comma-separated', testRenameFileName({
      mkdn: 'attrtype::[[wikilink]],[[another]]\nHere is some content.',
      expdMkdn: 'attrtype::[[hello-world]],[[another]]\nHere is some content.',
    }));

    it('list; mkdn-separated', testRenameFileName({
      mkdn: 'attrtype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
      expdMkdn: 'attrtype::\n- [[hello-world]]\n- [[another]]\nHere is some content.',
    }));

  });

  describe('link', () => {

    it('untyped', testRenameFileName({
      mkdn: 'Here is some content with a [[wikilink]].',
      expdMkdn: 'Here is some content with a [[hello-world]].',
    }));

    it('typed', testRenameFileName({
      mkdn: 'Here is some content with a :linktype::[[wikilink]].',
      expdMkdn: 'Here is some content with a :linktype::[[hello-world]].',
    }));

    describe('labelled', () => {

      it('link untyped', testRenameFileName({
        mkdn: 'Here is some content with a [[wikilink|label]].',
        expdMkdn: 'Here is some content with a [[hello-world|label]].',
      }));

      it('link typed', testRenameFileName({
        mkdn: 'Here is some content with a :linktype::[[wikilink|label]].',
        expdMkdn: 'Here is some content with a :linktype::[[hello-world|label]].',
      }));

      it('exact wikitext match', testRenameFileName({
        mkdn: 'Do not rename greedily -- not [[wikilinking|label]], but [[wikilink|label]].',
        expdMkdn: 'Do not rename greedily -- not [[wikilinking|label]], but [[hello-world|label]].',
      }));

    });

    describe('header (fragment preserved)', () => {

      it('untyped; html id (kebab-case)', testRenameFileName({
        mkdn: 'See [[wikilink#some-section]] for details.',
        expdMkdn: 'See [[hello-world#some-section]] for details.',
      }));

      it('untyped; header text (Title Case)', testRenameFileName({
        mkdn: 'See [[wikilink#Some Section]] for details.',
        expdMkdn: 'See [[hello-world#Some Section]] for details.',
      }));

      it('typed; html id (kebab-case)', testRenameFileName({
        mkdn: 'See :linktype::[[wikilink#some-section]] for details.',
        expdMkdn: 'See :linktype::[[hello-world#some-section]] for details.',
      }));

      it('typed; header text (Title Case)', testRenameFileName({
        mkdn: 'See :linktype::[[wikilink#Some Section]] for details.',
        expdMkdn: 'See :linktype::[[hello-world#Some Section]] for details.',
      }));

      it('untyped; labelled; header; kebab-case', testRenameFileName({
        mkdn: 'See [[wikilink#some-section|Jump to section]].',
        expdMkdn: 'See [[hello-world#some-section|Jump to section]].',
      }));

      it('typed; labelled; header; Title Case', testRenameFileName({
        mkdn: 'See :linktype::[[wikilink#Some Section|Jump to section]].',
        expdMkdn: 'See :linktype::[[hello-world#Some Section|Jump to section]].',
      }));

      it('untyped; setext; html id (kebab-case)', testRenameFileName({
        mkdn: 'See [[wikilink#setext-h1]] for details.',
        expdMkdn: 'See [[hello-world#setext-h1]] for details.',
      }));

      it('untyped; setext; header text (Title Case)', testRenameFileName({
        mkdn: 'See [[wikilink#Setext H1]] for details.',
        expdMkdn: 'See [[hello-world#Setext H1]] for details.',
      }));

      it('typed; setext; html id (kebab-case)', testRenameFileName({
        mkdn: 'See :linktype::[[wikilink#setext-h1]] for details.',
        expdMkdn: 'See :linktype::[[hello-world#setext-h1]] for details.',
      }));

    });

  });

  describe('embed', () => {

    it('base', testRenameFileName({
      mkdn: 'Here is some content with an embedded ![[wikilink]].',
      expdMkdn: 'Here is some content with an embedded ![[hello-world]].',
    }));

    it('with extension', () => {
      const mkdn: string = 'Here is some content with an embedded ![[wikilink.pdf]].';
      const expdMkdn: string = 'Here is some content with an embedded ![[hello-world.pdf]].';
      const actlMkdn: string = wikirefs.rename('wikilink.pdf', 'hello-world.pdf', mkdn);
      assert.strictEqual(actlMkdn, expdMkdn);
    });

  });

  describe('escaped; attr; prefixed', () => {

    it('single', testRenameFileName({
      mkdn: '```\n:old-reftype::[[wikilink]]\n```\nHere is some content.',
      expdMkdn: '```\n:old-reftype::[[wikilink]]\n```\nHere is some content.',
    }));

    it('list; comma-separated', testRenameFileName({
      mkdn: '```\n:old-reftype::[[wikilink]],[[another]]\n```\nHere is some content.',
      expdMkdn: '```\n:old-reftype::[[wikilink]],[[another]]\n```\nHere is some content.',
    }));

    it('list; mkdn-separated', testRenameFileName({
      mkdn: '```\n:old-reftype::\n- [[wikilink]]\n- [[another]]\n```\nHere is some content.',
      expdMkdn: '```\n:old-reftype::\n- [[wikilink]]\n- [[another]]\n```\nHere is some content.',
    }));

  });

});
