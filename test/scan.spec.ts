import assert from 'node:assert/strict';

import * as wikirefs from '../src';


const testScan = (params: any) => () => {
  const mkdn: string = params.mkdn;
  const expdData: any = params.expdData;
  const opts: any = params.opts ? params.opts : {};
  const actlData: any = wikirefs.scan(mkdn, opts);
  assert.deepStrictEqual(actlData, expdData);
};

describe('scan()', () => {

  describe('embed', () => {

    it('base', testScan({
      mkdn: '![[wikilink]]',
      expdData: [{
        kind: 'wikiembed',
        filename: ['wikilink', 3],
        media: 'markdown',
      }]
    }));

  });

  describe('link', () => {

    it('untyped', testScan({
      mkdn: '[[wikilink]]',
      expdData: [{
        kind: 'wikilink',
        type: [],
        filename: ['wikilink', 2],
        label: [],
      }]
    }));

    it('typed', testScan({
      mkdn: ':linktype::[[wikilink]]',
      expdData:[{
        kind: 'wikilink',
        type: ['linktype', 1],
        filename: ['wikilink', 13],
        label: [],
      }]
    }));

    describe('labelled', () => {

      it('link untyped', testScan({
        mkdn: '[[wikilink|label]]',
        expdData:[{
          kind: 'wikilink',
          type: [],
          filename: ['wikilink', 2],
          label: ['label', 11],
        }],
      }));
  
      it('link typed', testScan({
        mkdn: ':linktype::[[wikilink|label]]',
        expdData:[{
          kind: 'wikilink',
          type: ['linktype', 1],
          filename: ['wikilink', 13],
          label: ['label', 22],
        }],
      }));
  
    });

    describe('malformed; attr-like but not an attr', () => {

      it('[[wikilink]] on later line', testScan({
        mkdn: ': attrtype ::\n\n[[wikilink]]\n',
        expdData:[{
          kind: 'wikilink',
          filename:['wikilink', 17],
          label: [],
          type: [],
        }],
      }));

      it('[[wikilink]] on later line', testScan({
        mkdn: ': attrtype :: \'\' \n\n[[wikilink]]\n',
        expdData:[{
          kind: 'wikilink',
          filename: ['wikilink', 21],
          label: [],
          type: [],
        }],
      }));

    });

  });

  describe('attr', () => {

    it('unprefixed; single', testScan({
      mkdn: 'attrtype::[[wikilink]]\n',
      expdData:[{
        kind: 'wikiattr',
        type: ['attrtype', 0],
        filenames: [
          ['wikilink', 12],
        ],
      }]
    }));

    it('unprefixed; list-comma', testScan({
      mkdn: 'attrtype::[[wikilinks]],[[wikilink]]\n',
      expdData: [{
        kind: 'wikiattr',
        type: ['attrtype', 0],
        filenames: [
          ['wikilinks', 12],
          ['wikilink', 26],
        ],
      }]
    }));

    it('unprefixed; list-mkdn', testScan({
      mkdn: 'attrtype::\n- [[wikilinks]]\n- [[wikilink]]\n',
      expdData:[{
        kind: 'wikiattr',
        type: ['attrtype', 0],
        filenames: [
          ['wikilinks', 15],
          ['wikilink', 31],
        ],
      }],
    }));

    it('unprefixed; list; mkdn; multi', testScan({
      mkdn: '\nattrtype1::\n- [[wikilink]]\nattrtype2::\n- [[wikilink]]\n',
      expdData:[
        {
          kind: 'wikiattr',
          type: ['attrtype1', 1],
          filenames: [
            ['wikilink', 17],
          ],
        },
        {
          kind: 'wikiattr',
          type: ['attrtype2', 28],
          filenames: [
            ['wikilink', 44],
          ],
        }
      ],
    }));

    it('prefixed; single;', testScan({
      mkdn: ':attrtype::[[wikilink]]\n',
      expdData:[{
        kind: 'wikiattr',
        type: ['attrtype', 1],
        filenames: [
          ['wikilink', 13],
        ],
      }]
    }));

    it('prefixed; single; pad', testScan({
      mkdn: ': attrtype ::[[wikilink]]\n',
      expdData:[{
        kind: 'wikiattr',
        type: ['attrtype', 2],
        filenames: [
          ['wikilink', 15],
        ],
      }]
    }));

    it('prefixed; list; comma', testScan({
      mkdn: ':attrtype::[[wikilinks]],[[wikilink]]\n',
      expdData: [{
        kind: 'wikiattr',
        type: ['attrtype', 1],
        filenames: [
          ['wikilinks', 13],
          ['wikilink', 27],
        ],
      }]
    }));

    it('prefixed; list; mkdn', testScan({
      mkdn: ':attrtype::\n- [[wikilinks]]\n- [[wikilink]]\n',
      expdData:[{
        kind: 'wikiattr',
        type: ['attrtype', 1],
        filenames: [
          ['wikilinks', 16],
          ['wikilink', 32],
        ],
      }],
    }));

  });

  describe('ref', () => {

    it('wikiattr; single; multi', testScan({
      mkdn: `
:reftype::[[fname-a]]
:attrtype::[[fname-b]]
`,
      expdData: [{
        kind: 'wikiattr',
        type: ['reftype', 2],
        filenames: [ ['fname-a', 13] ],
      }, {
        kind: 'wikiattr',
        type: ['attrtype', 24],
        filenames: [ ['fname-b', 36] ],
      }],
    }));

  });

  describe('target specific file', () => {

    it('wikiattr; single; multi', testScan({
      mkdn: `
:reftype::[[fname-a]]
:attrtype::[[fname-b]]
`,
      opts: { filename: 'fname-a' },
      expdData: [
        {
          kind: 'wikiattr',
          type: ['reftype', 2],
          filenames: [ ['fname-a', 13] ],
        }
        // note: 'fname-b' is left out
      ],
    }));

  });

});
