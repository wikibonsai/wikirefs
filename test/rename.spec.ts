import assert from 'node:assert/strict';

import * as wikirefs from '../src';


const oldFileName: string = 'wikilink';
const newFileName: string = 'hello-world';

describe('renameFileName()', () => {

  const testRenameFileName = (params: any) => () => {
    const mkdn: string = params.mkdn;
    const expdMkdn: string = params.expdMkdn;
    const actlMkdn: string = wikirefs.renameFileName(oldFileName, newFileName, mkdn);
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
      wikirefs.renameFileName(
        'c++',
        'cpp',
        'Hopefully this wikilink -- [[c++]] will get renamed.',
      ),
      'Hopefully this wikilink -- [[cpp]] will get renamed.',
    );
  });

  describe('embed', () => {

    it('base', testRenameFileName({
      mkdn: 'Here is some content with an embedded ![[wikilink]].',
      expdMkdn: 'Here is some content with an embedded ![[hello-world]].',
    }));

    it('with extension', () => {
      const mkdn: string = 'Here is some content with an embedded ![[wikilink.pdf]].';
      const expdMkdn: string = 'Here is some content with an embedded ![[hello-world.pdf]].';
      const actlMkdn: string = wikirefs.renameFileName('wikilink.pdf', 'hello-world.pdf', mkdn);
      assert.strictEqual(actlMkdn, expdMkdn);
    });

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

  });

  describe('attr', () => {

    it('single', testRenameFileName({
      mkdn: 'linktype::[[wikilink]]\nHere is some content.',
      expdMkdn: 'linktype::[[hello-world]]\nHere is some content.',
    }));

    it('list; comma-separated', testRenameFileName({
      mkdn: 'linktype::[[wikilink]],[[another]]\nHere is some content.',
      expdMkdn: 'linktype::[[hello-world]],[[another]]\nHere is some content.',
    }));

    it('list; mkdn-separated', testRenameFileName({
      mkdn: 'linktype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
      expdMkdn: 'linktype::\n- [[hello-world]]\n- [[another]]\nHere is some content.',
    }));

  });

  describe('ref', () => {

    it('all', testRenameFileName({
      mkdn: `
:attrtype::
- [[wikilink]]
- [[wikilink]]

this is a :typed::[[wikilink]].

this is an untyped [[wikilink]].

![[wikilink]]
`,
      expdMkdn: `
:attrtype::
- [[hello-world]]
- [[hello-world]]

this is a :typed::[[hello-world]].

this is an untyped [[hello-world]].

![[hello-world]]
`,
    }));

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
