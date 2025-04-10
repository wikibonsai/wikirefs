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
      mkdn: ':linktype::[[wikilink]].',
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

    it('unprefixed; single; end of line', testScan({
      mkdn: 'attrtype::[[wikilink]]',
      expdData:[{
        kind: 'wikiattr',
        text: 'attrtype::[[wikilink]]',
        start: 0,
        type: ['attrtype', 0],
        filenames: [
          ['wikilink', 12],
        ],
        listFormat: 'none',
      }]
    }));

    it('unprefixed; single; newline', testScan({
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

  describe('opts', () => {

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

      it('wikiattr; list; comma', testScan({
        mkdn: `
:reftype::[[fname-a]],[[fname-b]]
`,
        opts: { filename: 'fname-a' },
        expdData: [
          {
            kind: 'wikiattr',
            text: ':reftype::[[fname-a]],[[fname-b]]\n',
            start: 1,
            type: ['reftype', 2],
            filenames: [ ['fname-a', 13] ],
            listFormat: 'comma',
          }
          // note: 'fname-b' is left out
        ],
      }));

      it('wikiattr; list; mkdn (clean)', testScan({
        mkdn: `
:reftype::
- [[fname-a]]
- [[fname-b]]
`,
        opts: { filename: 'fname-a' },
        expdData: [
          {
            kind: 'wikiattr',
            text: ':reftype::\n- [[fname-a]]\n- [[fname-b]]\n',
            start: 1,
            type: ['reftype', 2],
            filenames: [ ['fname-a', 16] ],
            listFormat: 'mkdn',
          }
          // note: 'fname-b' is left out
        ],
      }));

      it('wikiattr; list; mkdn (pretty)', testScan({
        mkdn: `
: reftype ::
            - [[fname-a]]
            - [[fname-b]]
`,
        opts: { filename: 'fname-a' },
        expdData: [
          {
            kind: 'wikiattr',
            text: ': reftype ::\n            - [[fname-a]]\n            - [[fname-b]]\n',
            start: 1,
            type: ['reftype', 3],
            filenames: [ ['fname-a', 30] ],
            listFormat: 'mkdn',
          }
          // note: 'fname-b' is left out
        ],
      }));

    });

    describe('specific wikiref kind', () => {

      const input: string = `
:type1::[[wikiattr-single]]
:type2::[[wikiattr-list-comma-1]], [[wikiattr-list-comma-2]]
:type3::
- [[wikiattr-list-mkdn-clean-1]]
- [[wikiattr-list-mkdn-clean-2]]
: type4 ::
          - [[wikiattr-list-mkdn-pretty-1]]
          - [[wikiattr-list-mkdn-pretty-2]]

Then there is a :typed::[[wikilink-typed]] and [[wikilink-untyped]].

![[wikiembed-mkdn]]
![[wikiembed-img.png]]
![[wikiembed-aud.mp3]]
![[wikiembed-vid.mp4]]

`;

      it('wikiattr (single, list-comma, list-mkdn)', testScan({
        mkdn: input,
        opts: { kind: 'wikiattr' },
        expdData: [
          {
            filenames: [
              [
                'wikiattr-single',
                11
              ]
            ],
            kind: 'wikiattr',
            listFormat: 'none',
            start: 1,
            text: ':type1::[[wikiattr-single]]\n',
            type: [
              'type1',
              2
            ]
          },
          {
            'filenames': [
              [
                'wikiattr-list-comma-1',
                39
              ],
              [
                'wikiattr-list-comma-2',
                66
              ]
            ],
            kind: 'wikiattr',
            listFormat: 'comma',
            start: 29,
            text: ':type2::[[wikiattr-list-comma-1]], [[wikiattr-list-comma-2]]\n',
            type: [
              'type2',
              30
            ]
          },
          {
            'filenames': [
              [
                'wikiattr-list-mkdn-clean-1',
                103
              ],
              [
                'wikiattr-list-mkdn-clean-2',
                136
              ]
            ],
            kind: 'wikiattr',
            listFormat: 'mkdn',
            start: 90,
            text: ':type3::\n- [[wikiattr-list-mkdn-clean-1]]\n- [[wikiattr-list-mkdn-clean-2]]\n',
            type: [
              'type3',
              91
            ]
          },
          {
            filenames: [
              [
                'wikiattr-list-mkdn-pretty-1',
                190
              ],
              [
                'wikiattr-list-mkdn-pretty-2',
                234
              ]
            ],
            kind: 'wikiattr',
            listFormat: 'mkdn',
            start: 165,
            text:
`: type4 ::
          - [[wikiattr-list-mkdn-pretty-1]]
          - [[wikiattr-list-mkdn-pretty-2]]
`,
            type: [
              'type4',
              167
            ]
          }
        ],
      }));

      it('wikiattr (mixed bullet point kinds)', testScan({
        mkdn: `
:mixed-list::
- [[item-dash]]
+ [[item-plus]]
* [[item-asterisk]]
`,
        opts: { kind: 'wikiattr' },
        expdData: [
          {
            kind: 'wikiattr',
            text: ':mixed-list::\n- [[item-dash]]\n+ [[item-plus]]\n* [[item-asterisk]]\n',
            start: 1,
            type: ['mixed-list', 2],
            filenames: [
              ['item-dash', 19],
              ['item-plus', 35],
              ['item-asterisk', 51],
            ],
            listFormat: 'mkdn',
          }
        ],
      }));

      it.skip('wikilink (labelled)');

      it('wikilink (untyped, typed)', testScan({
        mkdn: input,
        opts: { kind: 'wikilink' },
        expdData: [
          {
            filename: [
              'wikilink-typed',
              291
            ],
            kind: 'wikilink',
            label: [],
            start: 281,
            text: ':typed::[[wikilink-typed]]',
            type: [
              'typed',
              282
            ]
          },
          {
            filename: [
              'wikilink-untyped',
              314
            ],
            kind: 'wikilink',
            label: [],
            start: 312,
            text: '[[wikilink-untyped]]',
            type: []
          }
        ],
      }));

      it('wikiembed (md, img, aud, vid)', testScan({
        mkdn: input,
        opts: { kind: 'wikiembed' },
        expdData: [
          {
            filename: [
              'wikiembed-mkdn',
              338
            ],
            kind: 'wikiembed',
            media: 'markdown',
            start: 335,
            text: '![[wikiembed-mkdn]]'
          },
          {
            filename: [
              'wikiembed-img.png',
              358
            ],
            kind: 'wikiembed',
            media: 'image',
            start: 355,
            text: '![[wikiembed-img.png]]'
          },
          {
            filename: [
              'wikiembed-aud.mp3',
              381
            ],
            kind: 'wikiembed',
            media: 'audio',
            start: 378,
            text: '![[wikiembed-aud.mp3]]'
          },
          {
            filename: [
              'wikiembed-vid.mp4',
              404
            ],
            kind: 'wikiembed',
            media: 'video',
            start: 401,
            text: '![[wikiembed-vid.mp4]]'
          }
        ],
      }));

      it.skip('base (traditional [[wikilinks]])', testScan({
        mkdn: input,
        opts: { kind: 'wikilink' },
        expdData: [
        ]
      }));

    });

  });

});
