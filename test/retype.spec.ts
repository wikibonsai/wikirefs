import assert from 'node:assert/strict';

import * as wikirefs from '../src';


const oldRefType: string = 'old-reftype';
const newRefType: string = 'new-reftype';

describe('retypeRefType()', () => {

  const testRetypeRefType = (params: any) => () => {
    const mkdn: string = params.mkdn;
    const expdMkdn: string = params.expdMkdn;
    const actlMkdn: string = wikirefs.retypeRefType(oldRefType, newRefType, mkdn);
    assert.strictEqual(actlMkdn, expdMkdn);
  };

  describe('attr', () => {

    describe('unprefixed', () => {

      it('single', testRetypeRefType({
        mkdn: 'old-reftype::[[wikilink]]\nHere is some content.',
        expdMkdn: 'new-reftype::[[wikilink]]\nHere is some content.',
      }));

      it('list; comma', testRetypeRefType({
        mkdn: 'old-reftype::[[wikilink]],[[another]]\nHere is some content.',
        expdMkdn: 'new-reftype::[[wikilink]],[[another]]\nHere is some content.',
      }));

      it('list; mkdn', testRetypeRefType({
        mkdn: 'old-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
        expdMkdn: 'new-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
      }));

    });

    describe('prefixed', () => {

      it('single', testRetypeRefType({
        mkdn: ':old-reftype::[[wikilink]]\nHere is some content.',
        expdMkdn: ':new-reftype::[[wikilink]]\nHere is some content.',
      }));

      it('single; pad', testRetypeRefType({
        mkdn: ': old-reftype ::[[wikilink]]\nHere is some content.',
        expdMkdn: ': new-reftype ::[[wikilink]]\nHere is some content.',
      }));

      it('single; pretty', testRetypeRefType({
        mkdn: ': old-reftype    ::[[wikilink]]\nHere is some content.',
        expdMkdn: ': new-reftype    ::[[wikilink]]\nHere is some content.',
      }));

      it('list; comma', testRetypeRefType({
        mkdn: ':old-reftype::[[wikilink]],[[another]]\nHere is some content.',
        expdMkdn: ':new-reftype::[[wikilink]],[[another]]\nHere is some content.',
      }));

      it('list; mkdn', testRetypeRefType({
        mkdn: ':old-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
        expdMkdn: ':new-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
      }));

    });

  });

  describe('link', () => {

    describe('untyped', () => {

      it('base -- no change', testRetypeRefType({
        mkdn: 'Here is some content with a [[wikilink]].',
        expdMkdn: 'Here is some content with a [[wikilink]].',
      }));

      it('labelled; base -- no change', testRetypeRefType({
        mkdn: 'Here is some content with a [[wikilink|label]].',
        expdMkdn: 'Here is some content with a [[wikilink|label]].',
      }));

    });

    describe('typed', () => {

      it('base', testRetypeRefType({
        mkdn: 'Here is some content with a :old-reftype::[[wikilink]].',
        expdMkdn: 'Here is some content with a :new-reftype::[[wikilink]].',
      }));

      it('labelled; base', testRetypeRefType({
        mkdn: 'Here is some content with a :old-reftype::[[wikilink|label]].',
        expdMkdn: 'Here is some content with a :new-reftype::[[wikilink|label]].',
      }));

    });

  });

});


describe('retypeAttrType()', () => {

  const testRetypeAttrType = (params: any) =>
    () => {
      const mkdn: string = params.mkdn;
      const expdMkdn: string = params.expdMkdn;
      const actlMkdn: string = wikirefs.retypeAttrType(oldRefType, newRefType, mkdn);
      assert.strictEqual(actlMkdn, expdMkdn);
    };

  it('replace exact reftype match', testRetypeAttrType({
    mkdn: ':old-reftype::[[wikilink]]\n:old-reftype-ing::[[wikilinking]]\n',
    expdMkdn: ':new-reftype::[[wikilink]]\n:old-reftype-ing::[[wikilinking]]\n',
  }));

  it('leave content with no matches alone', testRetypeAttrType({
    mkdn: 'There are no old-reftype s here, so I should look the same!',
    expdMkdn: 'There are no old-reftype s here, so I should look the same!',
  }));

  it('regex special chars that are valid reftype chars work', () => {
    assert.strictEqual(
      wikirefs.retypeAttrType(
        'reftype++',
        'reftypepp',
        ':reftype++::[[wikilink]]\n',
      ),
      ':reftypepp::[[wikilink]]\n',
    );
  });

  describe('attr', () => {

    describe('unprefixed', () => {

      it('single', testRetypeAttrType({
        mkdn: 'old-reftype::[[wikilink]]\nHere is some content.',
        expdMkdn: 'new-reftype::[[wikilink]]\nHere is some content.',
      }));

      it('list; comma', testRetypeAttrType({
        mkdn: 'old-reftype::[[wikilink]],[[another]]\nHere is some content.',
        expdMkdn: 'new-reftype::[[wikilink]],[[another]]\nHere is some content.',
      }));

      it('list; mkdn', testRetypeAttrType({
        mkdn: 'old-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
        expdMkdn: 'new-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
      }));

    });

    describe('prefixed', () => {

      it('single', testRetypeAttrType({
        mkdn: ':old-reftype::[[wikilink]]\nHere is some content.',
        expdMkdn: ':new-reftype::[[wikilink]]\nHere is some content.',
      }));

      it('list; comma', testRetypeAttrType({
        mkdn: ':old-reftype::[[wikilink]],[[another]]\nHere is some content.',
        expdMkdn: ':new-reftype::[[wikilink]],[[another]]\nHere is some content.',
      }));

      it('list; mkdn', testRetypeAttrType({
        mkdn: ':old-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
        expdMkdn: ':new-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
      }));

      describe('escaped', () => {

        it('single', testRetypeAttrType({
          mkdn: '```\n:old-reftype::[[wikilink]]\n```\nHere is some content.',
          expdMkdn: '```\n:old-reftype::[[wikilink]]\n```\nHere is some content.',
        }));

        it('list; comma', testRetypeAttrType({
          mkdn: '```\n:old-reftype::[[wikilink]],[[another]]\n```\nHere is some content.',
          expdMkdn: '```\n:old-reftype::[[wikilink]],[[another]]\n```\nHere is some content.',
        }));

        it('list; mkdn', testRetypeAttrType({
          mkdn: '```\n:old-reftype::\n- [[wikilink]]\n- [[another]]\n```\nHere is some content.',
          expdMkdn: '```\n:old-reftype::\n- [[wikilink]]\n- [[another]]\n```\nHere is some content.',
        }));

      });

    });

  });

  describe('link', () => {

    describe('untyped', () => {

      it('base -- no change', testRetypeAttrType({
        mkdn: 'Here is some content with a [[wikilink]].',
        expdMkdn: 'Here is some content with a [[wikilink]].',
      }));

      it('labelled; base -- no change', testRetypeAttrType({
        mkdn: 'Here is some content with a [[wikilink|label]].',
        expdMkdn: 'Here is some content with a [[wikilink|label]].',
      }));

    });

    describe('typed', () => {

      it('base -- no change', testRetypeAttrType({
        mkdn: 'Here is some content with a :old-reftype::[[wikilink]].',
        expdMkdn: 'Here is some content with a :old-reftype::[[wikilink]].',
      }));

      it('labelled; base -- no change', testRetypeAttrType({
        mkdn: 'Here is some content with a :old-reftype::[[wikilink|label]].',
        expdMkdn: 'Here is some content with a :old-reftype::[[wikilink|label]].',
      }));

    });

  });

});

describe('retypeLinkType()', () => {

  const testRetypeLinkType = (params: any) =>
    () => {
      const mkdn: string = params.mkdn;
      const expdMkdn: string = params.expdMkdn;
      const actlMkdn: string = wikirefs.retypeLinkType(oldRefType, newRefType, mkdn);
      assert.strictEqual(actlMkdn, expdMkdn);
    };

  it('replace only reftypetext, not regular text', testRetypeLinkType({
    mkdn: 'Rename the old-reftype in this :old-reftype::[[wikilink]].',
    expdMkdn: 'Rename the old-reftype in this :new-reftype::[[wikilink]].',
  }));

  it('replace exact reftype match', testRetypeLinkType({
    mkdn: 'Do not rename greedily -- not :old-reftype-ing::[[wikilinking]], but :old-reftype::[[wikilink]].',
    expdMkdn: 'Do not rename greedily -- not :old-reftype-ing::[[wikilinking]], but :new-reftype::[[wikilink]].',
  }));

  it('leave content with no matches alone', testRetypeLinkType({
    mkdn: 'There are no old-reftype s here, so I should look the same!',
    expdMkdn: 'There are no old-reftype s here, so I should look the same!',
  }));

  it('regex special chars that are valid reftype chars work', () => {
    assert.strictEqual(
      wikirefs.retypeLinkType(
        'reftype++',
        'reftypepp',
        'Hopefully this reftype -- :reftype++::[[wikilink]] will get renamed.',
      ),
      'Hopefully this reftype -- :reftypepp::[[wikilink]] will get renamed.',
    );
  });

  describe('attr', () => {

    describe('unprefixed', () => {

      it('single -- no change', testRetypeLinkType({
        mkdn: 'old-reftype::[[wikilink]]\nHere is some content.',
        expdMkdn: 'old-reftype::[[wikilink]]\nHere is some content.',
      }));

      it('list; comma -- no change', testRetypeLinkType({
        mkdn: 'old-reftype::[[wikilink]],[[another]]\nHere is some content.',
        expdMkdn: 'old-reftype::[[wikilink]],[[another]]\nHere is some content.',
      }));

      it('list; mkdn -- no change', testRetypeLinkType({
        mkdn: 'old-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
        expdMkdn: 'old-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
      }));

    });

  });

  describe('link', () => {

    describe('untyped', () => {

      it('base -- no change', testRetypeLinkType({
        mkdn: 'Here is some content with a [[wikilink]].',
        expdMkdn: 'Here is some content with a [[wikilink]].',
      }));

      it('labelled; base -- no change', testRetypeLinkType({
        mkdn: 'Here is some content with a [[wikilink|label]].',
        expdMkdn: 'Here is some content with a [[wikilink|label]].',
      }));

    });

    describe('typed', () => {

      it('base', testRetypeLinkType({
        mkdn: 'Here is some content with a :old-reftype::[[wikilink]].',
        expdMkdn: 'Here is some content with a :new-reftype::[[wikilink]].',
      }));

      it('labelled; base', testRetypeLinkType({
        mkdn: 'Here is some content with a :old-reftype::[[wikilink|label]].',
        expdMkdn: 'Here is some content with a :new-reftype::[[wikilink|label]].',
      }));

    });

  });

});