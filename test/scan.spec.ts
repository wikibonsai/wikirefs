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
      mkdn: '![[wikiembed]]',
      expdData: [{
        kind: 'wikiembed',
        text: '![[wikiembed]]',
        start: 0,
        filename: ['wikiembed', 3],
        media: 'markdown',
      }]
    }));

  });

  describe('link', () => {

    it('untyped', testScan({
      mkdn: '[[wikilink]]',
      expdData: [{
        kind: 'wikilink',
        text: '[[wikilink]]',
        start: 0,
        type: [],
        filename: ['wikilink', 2],
        label: [],
      }]
    }));

    it('typed', testScan({
      mkdn: ':linktype::[[wikilink]]',
      expdData:[{
        kind: 'wikilink',
        text: ':linktype::[[wikilink]]',
        start: 0,
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
          text: '[[wikilink|label]]',
          start: 0,
          type: [],
          filename: ['wikilink', 2],
          label: ['label', 11],
        }],
      }));
  
      it('link typed', testScan({
        mkdn: ':linktype::[[wikilink|label]]',
        expdData:[{
          kind: 'wikilink',
          text: ':linktype::[[wikilink|label]]',
          start: 0,
          type: ['linktype', 1],
          filename: ['wikilink', 13],
          label: ['label', 22],
        }],
      }));
  
    });

    describe('malformed; attr-like but not an attr', () => {

      it('[[wikilink]] on later line; empty attrtype', testScan({
        mkdn: ': attrtype ::\n\n[[wikilink]]\n',
        expdData:[{
          kind: 'wikilink',
          text: '[[wikilink]]',
          start: 15,
          filename:['wikilink', 17],
          label: [],
          type: [],
        }],
      }));

      it('[[wikilink]] on later line; empty string attrtype', testScan({
        mkdn: ': attrtype :: \'\' \n\n[[wikilink]]\n',
        expdData:[{
          kind: 'wikilink',
          text: '[[wikilink]]',
          start: 19,
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
        text: 'attrtype::[[wikilink]]\n',
        start: 0,
        type: ['attrtype', 0],
        filenames: [
          ['wikilink', 12],
        ],
        listFormat: 'none',
      }]
    }));

    it('unprefixed; list; comma', testScan({
      mkdn: 'attrtype::[[wikilinks]],[[wikilink]]\n',
      expdData: [{
        kind: 'wikiattr',
        text: 'attrtype::[[wikilinks]],[[wikilink]]\n',
        start: 0,
        type: ['attrtype', 0],
        filenames: [
          ['wikilinks', 12],
          ['wikilink', 26],
        ],
        listFormat: 'comma',
      }],
    }));

    it('unprefixed; list; mkdn', testScan({
      mkdn: 'attrtype::\n- [[wikilinks]]\n- [[wikilink]]\n',
      expdData:[{
        kind: 'wikiattr',
        text: 'attrtype::\n- [[wikilinks]]\n- [[wikilink]]\n',
        start: 0,
        type: ['attrtype', 0],
        filenames: [
          ['wikilinks', 15],
          ['wikilink', 31],
        ],
        listFormat: 'mkdn',
      }],
    }));

    it('unprefixed; list; mkdn; multi', testScan({
      mkdn: '\nattrtype1::\n- [[wikilink]]\nattrtype2::\n- [[wikilink]]\n',
      expdData:[
        {
          kind: 'wikiattr',
          text: 'attrtype1::\n- [[wikilink]]\n',
          start: 1,
          type: ['attrtype1', 1],
          filenames: [
            ['wikilink', 17],
          ],
          listFormat: 'mkdn',
        },
        {
          kind: 'wikiattr',
          text: 'attrtype2::\n- [[wikilink]]\n',
          start: 28,
          type: ['attrtype2', 28],
          filenames: [
            ['wikilink', 44],
          ],
          listFormat: 'mkdn',
        }
      ],
    }));

    it('prefixed; single;', testScan({
      mkdn: ':attrtype::[[wikilink]]\n',
      expdData:[{
        kind: 'wikiattr',
        text: ':attrtype::[[wikilink]]\n',
        start: 0,
        type: ['attrtype', 1],
        filenames: [
          ['wikilink', 13],
        ],
        listFormat: 'none',
      }]
    }));

    it('prefixed; single; pad', testScan({
      mkdn: ': attrtype ::[[wikilink]]\n',
      expdData:[{
        kind: 'wikiattr',
        text: ': attrtype ::[[wikilink]]\n',
        start: 0,
        type: ['attrtype', 2],
        filenames: [
          ['wikilink', 15],
        ],
        listFormat: 'none',
      }]
    }));

    it('prefixed; list; comma', testScan({
      mkdn: ':attrtype::[[wikilinks]],[[wikilink]]\n',
      expdData: [{
        kind: 'wikiattr',
        text: ':attrtype::[[wikilinks]],[[wikilink]]\n',
        start: 0,
        type: ['attrtype', 1],
        filenames: [
          ['wikilinks', 13],
          ['wikilink', 27],
        ],
        listFormat: 'comma',
      }]
    }));

    it('prefixed; list; mkdn', testScan({
      mkdn: ':attrtype::\n- [[wikilinks]]\n- [[wikilink]]\n',
      expdData:[{
        kind: 'wikiattr',
        text: ':attrtype::\n- [[wikilinks]]\n- [[wikilink]]\n',
        start: 0,
        type: ['attrtype', 1],
        filenames: [
          ['wikilinks', 16],
          ['wikilink', 32],
        ],
        listFormat: 'mkdn',
      }],
    }));

  });

  describe('ref', () => {

    it('all; same fname', testScan({
      mkdn: `
:attrtype::[[fname-a]]

this is a :typed::[[fname-a]].

this is an untyped [[fname-a]].

![[fname-a]]
`,
      expdData: [{
        kind: 'wikiattr',
        text: ':attrtype::[[fname-a]]\n',
        start: 1,
        type: ['attrtype', 2],
        filenames: [ ['fname-a', 14] ],
        listFormat: 'none',
      }, {
        kind: 'wikilink',
        text: ':typed::[[fname-a]]',
        start: 35,
        type: ['typed', 36],
        filename: ['fname-a', 45],
        label: [],
      }, {
        kind: 'wikilink',
        text: '[[fname-a]]',
        start: 76,
        type: [],
        filename: ['fname-a', 78],
        label: [],
      }, {
        kind: 'wikiembed',
        media: 'markdown',
        text: '![[fname-a]]',
        start: 90,
        filename: ['fname-a', 93],
      }],
    }));

    it('wikiattr; single; multi', testScan({
      mkdn: `
:reftype::[[fname-a]]
:attrtype::[[fname-b]]
`,
      expdData: [{
        kind: 'wikiattr',
        text: ':reftype::[[fname-a]]\n',
        start: 1,
        type: ['reftype', 2],
        filenames: [ ['fname-a', 13] ],
        listFormat: 'none',
      }, {
        kind: 'wikiattr',
        text: ':attrtype::[[fname-b]]\n',
        start: 23,
        type: ['attrtype', 24],
        filenames: [ ['fname-b', 36] ],
        listFormat: 'none',
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
          text: ':reftype::[[fname-a]]\n',
          start: 1,
          type: ['reftype', 2],
          filenames: [ ['fname-a', 13] ],
          listFormat: 'none',
        }
        // note: 'fname-b' is left out
      ],
    }));

  });

});
