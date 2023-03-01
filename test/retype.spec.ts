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

  describe('error', () => {

    describe('protect against mis-ordered function params', () => {

      it('\'content\' string longer than \'oldRefType\' (protects against mis-ordered function params)', () => {
        const mkdn: string = 'Here is some content with a [[wikiref]].';
        const expdMkdn: string = 'wikirefs.retypeRefType() error: content \'content\' is shorter than \'oldRefType\', aborting.';
        const actlMkdn: string = wikirefs.retypeRefType(mkdn, 'wikilink.pdf', 'hello-world.pdf');
        assert.strictEqual(actlMkdn, expdMkdn);
      });

      it('\'content\' string longer than \'newRefType\' (protects against mis-ordered function params)', () => {
        const mkdn: string = 'Here is some content with a [[wikiref]].';
        const expdMkdn: string = 'wikirefs.retypeRefType() error: content \'content\' is shorter than \'newRefType\', aborting.';
        const actlMkdn: string = wikirefs.retypeRefType('wikilink.pdf', mkdn, 'hello-world.pdf');
        assert.strictEqual(actlMkdn, expdMkdn);
      });

    });

  });

  describe('link', () => {

    it('untyped -- no change', testRetypeRefType({
      mkdn: 'Here is some content with a [[wikilink]].',
      expdMkdn: 'Here is some content with a [[wikilink]].',
    }));

    it('typed', testRetypeRefType({
      mkdn: 'Here is some content with a :old-reftype::[[wikilink]].',
      expdMkdn: 'Here is some content with a :new-reftype::[[wikilink]].',
    }));

    describe('labelled', () => {

      it('link untyped -- no change', testRetypeRefType({
        mkdn: 'Here is some content with a [[wikilink|label]].',
        expdMkdn: 'Here is some content with a [[wikilink|label]].',
      }));
  
      it('link typed', testRetypeRefType({
        mkdn: 'Here is some content with a :old-reftype::[[wikilink|label]].',
        expdMkdn: 'Here is some content with a :new-reftype::[[wikilink|label]].',
      }));
  
    });
  });

  describe('attr', () => {

    // prefixed

    it('prefixed; single', testRetypeRefType({
      mkdn: ':old-reftype::[[wikilink]]\nHere is some content.',
      expdMkdn: ':new-reftype::[[wikilink]]\nHere is some content.',
    }));

    it('prefixed; list; comma-separated', testRetypeRefType({
      mkdn: ':old-reftype::[[wikilink]],[[another]]\nHere is some content.',
      expdMkdn: ':new-reftype::[[wikilink]],[[another]]\nHere is some content.',
    }));

    it('prefixed; list; mkdn-separated', testRetypeRefType({
      mkdn: ':old-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
      expdMkdn: ':new-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
    }));

    // prefixed w/ pad

    it('prefixed; pad; single', testRetypeRefType({
      mkdn: ': old-reftype ::[[wikilink]]\nHere is some content.',
      expdMkdn: ': new-reftype ::[[wikilink]]\nHere is some content.',
    }));

    it('prefixed; pretty; single', testRetypeRefType({
      mkdn: ': old-reftype    ::[[wikilink]]\nHere is some content.',
      expdMkdn: ': new-reftype    ::[[wikilink]]\nHere is some content.',
    }));

    // unprefixed

    it('unprefixed; single', testRetypeRefType({
      mkdn: 'old-reftype::[[wikilink]]\nHere is some content.',
      expdMkdn: 'new-reftype::[[wikilink]]\nHere is some content.',
    }));

    it('unprefixed; list; comma-separated', testRetypeRefType({
      mkdn: 'old-reftype::[[wikilink]],[[another]]\nHere is some content.',
      expdMkdn: 'new-reftype::[[wikilink]],[[another]]\nHere is some content.',
    }));

    it('unprefixed; list; mkdn-separated', testRetypeRefType({
      mkdn: 'old-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
      expdMkdn: 'new-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
    }));

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

  describe('error', () => {

    describe('protect against mis-ordered function params', () => {

      it('\'content\' string longer than \'oldAttrType\' (protects against mis-ordered function params)', () => {
        const mkdn: string = 'Here is some content with a [[wikiref]].';
        const expdMkdn: string = 'wikirefs.retypeAttrType() error: content \'content\' is shorter than \'oldAttrType\', aborting.';
        const actlMkdn: string = wikirefs.retypeAttrType(mkdn, 'wikilink.pdf', 'hello-world.pdf');
        assert.strictEqual(actlMkdn, expdMkdn);
      });

      it('\'content\' string longer than \'newAttrType\' (protects against mis-ordered function params)', () => {
        const mkdn: string = 'Here is some content with a [[wikiref]].';
        const expdMkdn: string = 'wikirefs.retypeAttrType() error: content \'content\' is shorter than \'newAttrType\', aborting.';
        const actlMkdn: string = wikirefs.retypeAttrType('wikilink.pdf', mkdn, 'hello-world.pdf');
        assert.strictEqual(actlMkdn, expdMkdn);
      });

    });

  });


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

  describe('link -- should be no change', () => {

    it('untyped -- no change', testRetypeAttrType({
      mkdn: 'Here is some content with a [[wikilink]].',
      expdMkdn: 'Here is some content with a [[wikilink]].',
    }));

    it('typed -- no change', testRetypeAttrType({
      mkdn: 'Here is some content with a :old-reftype::[[wikilink]].',
      expdMkdn: 'Here is some content with a :old-reftype::[[wikilink]].',
    }));

    describe('labelled', () => {

      it('link untyped -- no change', testRetypeAttrType({
        mkdn: 'Here is some content with a [[wikilink|label]].',
        expdMkdn: 'Here is some content with a [[wikilink|label]].',
      }));
  
      it('link typed -- no change', testRetypeAttrType({
        mkdn: 'Here is some content with a :old-reftype::[[wikilink|label]].',
        expdMkdn: 'Here is some content with a :old-reftype::[[wikilink|label]].',
      }));
  
    });

  });

  describe('attr; unprefixed', () => {

    it('single', testRetypeAttrType({
      mkdn: 'old-reftype::[[wikilink]]\nHere is some content.',
      expdMkdn: 'new-reftype::[[wikilink]]\nHere is some content.',
    }));

    it('list; comma-separated', testRetypeAttrType({
      mkdn: 'old-reftype::[[wikilink]],[[another]]\nHere is some content.',
      expdMkdn: 'new-reftype::[[wikilink]],[[another]]\nHere is some content.',
    }));

    it('list; mkdn-separated', testRetypeAttrType({
      mkdn: 'old-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
      expdMkdn: 'new-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
    }));

  });

  describe('attr; prefixed', () => {

    it('single', testRetypeAttrType({
      mkdn: ':old-reftype::[[wikilink]]\nHere is some content.',
      expdMkdn: ':new-reftype::[[wikilink]]\nHere is some content.',
    }));

    it('list; comma-separated', testRetypeAttrType({
      mkdn: ':old-reftype::[[wikilink]],[[another]]\nHere is some content.',
      expdMkdn: ':new-reftype::[[wikilink]],[[another]]\nHere is some content.',
    }));

    it('list; mkdn-separated', testRetypeAttrType({
      mkdn: ':old-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
      expdMkdn: ':new-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
    }));

    describe('escaped; attr; prefixed', () => {

      it('single', testRetypeAttrType({
        mkdn: '```\n:old-reftype::[[wikilink]]\n```\nHere is some content.',
        expdMkdn: '```\n:old-reftype::[[wikilink]]\n```\nHere is some content.',
      }));

      it('list; comma-separated', testRetypeAttrType({
        mkdn: '```\n:old-reftype::[[wikilink]],[[another]]\n```\nHere is some content.',
        expdMkdn: '```\n:old-reftype::[[wikilink]],[[another]]\n```\nHere is some content.',
      }));

      it('list; mkdn-separated', testRetypeAttrType({
        mkdn: '```\n:old-reftype::\n- [[wikilink]]\n- [[another]]\n```\nHere is some content.',
        expdMkdn: '```\n:old-reftype::\n- [[wikilink]]\n- [[another]]\n```\nHere is some content.',
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

  describe('error', () => {

    describe('protect against mis-ordered function params', () => {

      it('\'content\' string longer than \'oldLinkType\'', () => {
        const mkdn: string = 'Here is some content with a [[wikiref]].';
        const expdMkdn: string = 'wikirefs.retypeLinkType() error: content \'content\' is shorter than \'oldLinkType\', aborting.';
        const actlMkdn: string = wikirefs.retypeLinkType(mkdn, 'wikilink.pdf', 'hello-world.pdf');
        assert.strictEqual(actlMkdn, expdMkdn);
      });

      it('\'content\' string longer than \'oldLinkType\'', () => {
        const mkdn: string = 'Here is some content with a [[wikiref]].';
        const expdMkdn: string = 'wikirefs.retypeLinkType() error: content \'content\' is shorter than \'newLinkType\', aborting.';
        const actlMkdn: string = wikirefs.retypeLinkType('wikilink.pdf', mkdn, 'hello-world.pdf');
        assert.strictEqual(actlMkdn, expdMkdn);
      });

    });

  });

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

  describe('link', () => {

    it('untyped -- no change', testRetypeLinkType({
      mkdn: 'Here is some content with a [[wikilink]].',
      expdMkdn: 'Here is some content with a [[wikilink]].',
    }));

    it('typed', testRetypeLinkType({
      mkdn: 'Here is some content with a :old-reftype::[[wikilink]].',
      expdMkdn: 'Here is some content with a :new-reftype::[[wikilink]].',
    }));

    describe('labelled', () => {

      it('link untyped -- no change', testRetypeLinkType({
        mkdn: 'Here is some content with a [[wikilink|label]].',
        expdMkdn: 'Here is some content with a [[wikilink|label]].',
      }));
  
      it('link typed', testRetypeLinkType({
        mkdn: 'Here is some content with a :old-reftype::[[wikilink|label]].',
        expdMkdn: 'Here is some content with a :new-reftype::[[wikilink|label]].',
      }));
  
    });

  });

  describe('attr', () => {

    it('single -- no change', testRetypeLinkType({
      mkdn: 'old-reftype::[[wikilink]]\nHere is some content.',
      expdMkdn: 'old-reftype::[[wikilink]]\nHere is some content.',
    }));

    it('list; comma-separated -- no change', testRetypeLinkType({
      mkdn: 'old-reftype::[[wikilink]],[[another]]\nHere is some content.',
      expdMkdn: 'old-reftype::[[wikilink]],[[another]]\nHere is some content.',
    }));

    it('list; mkdn-separated -- no change', testRetypeLinkType({
      mkdn: 'old-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
      expdMkdn: 'old-reftype::\n- [[wikilink]]\n- [[another]]\nHere is some content.',
    }));

  });

});