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

  describe('ref', () => {

    it('all; same fname', testScan({
      mkdn: '\n'
        + ':attrtype::[[fname-a]]\n'
        + '\n'
        + 'this is a :typed::[[fname-a]].\n'
        + '\n'
        + 'this is an untyped [[fname-a]].\n'
        + '\n'
        + '![[fname-a]]\n',
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
        header: [],
        label: [],
      }, {
        kind: 'wikilink',
        text: '[[fname-a]]',
        start: 76,
        type: [],
        filename: ['fname-a', 78],
        header: [],
        label: [],
      }, {
        kind: 'wikiembed',
        media: 'markdown',
        text: '![[fname-a]]',
        start: 90,
        filename: ['fname-a', 93],
        header: '',
      }],
    }));

    it('wikiattr; single; multi', testScan({
      mkdn: '\n'
        + ':reftype::[[fname-a]]\n'
        + ':attrtype::[[fname-b]]\n',
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

  describe('attr', () => {

    describe('unprefixed', () => {

      it('single; end of line', testScan({
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

      it('single; newline', testScan({
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

      it('list; comma', testScan({
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

      it('list; mkdn', testScan({
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

      it('list; mkdn; multi', testScan({
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

    });

    describe('prefixed', () => {

      it('single', testScan({
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

      it('single; pad', testScan({
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

      it('list; comma', testScan({
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

      it('list; mkdn', testScan({
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

      it('with header (parsed as wikilink)', testScan({
        mkdn: ':attrtype::[[filename#header]]\n',
        expdData: [{
          kind: 'wikilink',
          text: ':attrtype::[[filename#header]]',
          start: 0,
          type: ['attrtype', 1],
          filename: ['filename', 13],
          header: ['header', 22],
          label: [],
        }]
      }));

    });

  });

  describe('link', () => {

    describe('untyped', () => {

      it('base', testScan({
        mkdn: '[[wikilink]]',
        expdData: [{
          kind: 'wikilink',
          text: '[[wikilink]]',
          start: 0,
          type: [],
          filename: ['wikilink', 2],
          header: [],
          label: [],
        }]
      }));

      it('header; base; html id (kebab-case)', testScan({
        mkdn: '[[wikilink#header-text]]',
        expdData: [{
          kind: 'wikilink',
          text: '[[wikilink#header-text]]',
          start: 0,
          type: [],
          filename: ['wikilink', 2],
          header: ['header-text', 11],
          label: [],
        }]
      }));

      it('header; base; header text (Title Case)', testScan({
        mkdn: '[[filename#Header Text]]',
        expdData: [{
          kind: 'wikilink',
          text: '[[filename#Header Text]]',
          start: 0,
          type: [],
          filename: ['filename', 2],
          header: ['Header Text', 11],
          label: [],
        }]
      }));

      it('header; empty', testScan({
        mkdn: '[[filename#]]',
        expdData: [{
          kind: 'wikilink',
          text: '[[filename#]]',
          start: 0,
          type: [],
          filename: ['filename', 2],
          header: ['', 11],
          label: [],
        }]
      }));

      it('labelled; base', testScan({
        mkdn: '[[wikilink|label]]',
        expdData:[{
          kind: 'wikilink',
          text: '[[wikilink|label]]',
          start: 0,
          type: [],
          filename: ['wikilink', 2],
          header: [],
          label: ['label', 11],
        }],
      }));

      it('header; labelled; html id (kebab-case)', testScan({
        mkdn: '[[filename#header-text|label]]',
        expdData: [{
          kind: 'wikilink',
          text: '[[filename#header-text|label]]',
          start: 0,
          type: [],
          filename: ['filename', 2],
          header: ['header-text', 11],
          label: ['label', 23],
        }],
      }));

      it('header; labelled; header text (Title Case)', testScan({
        mkdn: '[[filename#Header Text|label]]',
        expdData: [{
          kind: 'wikilink',
          text: '[[filename#Header Text|label]]',
          start: 0,
          type: [],
          filename: ['filename', 2],
          header: ['Header Text', 11],
          label: ['label', 23],
        }],
      }));

      it('header; setext; html id (kebab-case)', testScan({
        mkdn: '[[wikilink#setext-h1]]',
        expdData: [{
          kind: 'wikilink',
          text: '[[wikilink#setext-h1]]',
          start: 0,
          type: [],
          filename: ['wikilink', 2],
          header: ['setext-h1', 11],
          label: [],
        }],
      }));

      it('header; setext; header text (Title Case)', testScan({
        mkdn: '[[filename#Setext H1]]',
        expdData: [{
          kind: 'wikilink',
          text: '[[filename#Setext H1]]',
          start: 0,
          type: [],
          filename: ['filename', 2],
          header: ['Setext H1', 11],
          label: [],
        }],
      }));

    });

    describe('typed', () => {

      it('base', testScan({
        mkdn: ':linktype::[[wikilink]].',
        expdData:[{
          kind: 'wikilink',
          text: ':linktype::[[wikilink]]',
          start: 0,
          type: ['linktype', 1],
          filename: ['wikilink', 13],
          header: [],
          label: [],
        }]
      }));

      it('header; base; html id (kebab-case)', testScan({
        mkdn: ':linktype::[[wikilink#header-text]]',
        expdData: [{
          kind: 'wikilink',
          text: ':linktype::[[wikilink#header-text]]',
          start: 0,
          type: ['linktype', 1],
          filename: ['wikilink', 13],
          header: ['header-text', 22],
          label: [],
        }]
      }));

      it('header; base; header text (Title Case)', testScan({
        mkdn: ':linktype::[[filename#Header Text]]',
        expdData: [{
          kind: 'wikilink',
          text: ':linktype::[[filename#Header Text]]',
          start: 0,
          type: ['linktype', 1],
          filename: ['filename', 13],
          header: ['Header Text', 22],
          label: [],
        }]
      }));

      it('header; empty', testScan({
        mkdn: ':linktype::[[filename#]]',
        expdData: [{
          kind: 'wikilink',
          text: ':linktype::[[filename#]]',
          start: 0,
          type: ['linktype', 1],
          filename: ['filename', 13],
          header: ['', 22],
          label: [],
        }]
      }));

      it('labelled; base', testScan({
        mkdn: ':linktype::[[wikilink|label]]',
        expdData:[{
          kind: 'wikilink',
          text: ':linktype::[[wikilink|label]]',
          start: 0,
          type: ['linktype', 1],
          filename: ['wikilink', 13],
          header: [],
          label: ['label', 22],
        }],
      }));

      it('header; labelled; html id (kebab-case)', testScan({
        mkdn: ':linktype::[[filename#header-text|label]]',
        expdData: [{
          kind: 'wikilink',
          text: ':linktype::[[filename#header-text|label]]',
          start: 0,
          type: ['linktype', 1],
          filename: ['filename', 13],
          header: ['header-text', 22],
          label: ['label', 34],
        }],
      }));

      it('header; labelled; header text (Title Case)', testScan({
        mkdn: ':linktype::[[filename#Header Text|label]]',
        expdData: [{
          kind: 'wikilink',
          text: ':linktype::[[filename#Header Text|label]]',
          start: 0,
          type: ['linktype', 1],
          filename: ['filename', 13],
          header: ['Header Text', 22],
          label: ['label', 34],
        }],
      }));

      it('header; setext; html id (kebab-case)', testScan({
        mkdn: ':linktype::[[wikilink#setext-h1]]',
        expdData: [{
          kind: 'wikilink',
          text: ':linktype::[[wikilink#setext-h1]]',
          start: 0,
          type: ['linktype', 1],
          filename: ['wikilink', 13],
          header: ['setext-h1', 22],
          label: [],
        }],
      }));

      it('header; setext; header text (Title Case)', testScan({
        mkdn: ':linktype::[[filename#Setext H1]]',
        expdData: [{
          kind: 'wikilink',
          text: ':linktype::[[filename#Setext H1]]',
          start: 0,
          type: ['linktype', 1],
          filename: ['filename', 13],
          header: ['Setext H1', 22],
          label: [],
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
          header: [],
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
          header: [],
          label: [],
          type: [],
        }],
      }));

    });

  });

  describe('embed', () => {

    it('base', testScan({
      mkdn: '![[wikiembed]]',
      expdData: [{
        kind: 'wikiembed',
        text: '![[wikiembed]]',
        start: 0,
        filename: ['wikiembed', 3],
        media: 'markdown',
        header: '',
      }]
    }));

    describe('header', () => {

      it('html id (kebab-case)', testScan({
        mkdn: '![[embed-doc#header-text]]',
        expdData: [{
          kind: 'wikiembed',
          text: '![[embed-doc#header-text]]',
          start: 0,
          filename: ['embed-doc', 3],
          media: 'markdown',
          header: 'header-text',
        }]
      }));

      it('header text (Title Case)', testScan({
        mkdn: '![[embed-doc#Header Text]]',
        expdData: [{
          kind: 'wikiembed',
          text: '![[embed-doc#Header Text]]',
          start: 0,
          filename: ['embed-doc', 3],
          media: 'markdown',
          header: 'Header Text',
        }]
      }));

      it('empty (full-doc embed)', testScan({
        mkdn: '![[embed-doc#]]',
        expdData: [{
          kind: 'wikiembed',
          text: '![[embed-doc#]]',
          start: 0,
          filename: ['embed-doc', 3],
          media: 'markdown',
          header: '',
        }]
      }));

      it('setext; html id (kebab-case)', testScan({
        mkdn: '![[embed-doc#setext-h1]]',
        expdData: [{
          kind: 'wikiembed',
          text: '![[embed-doc#setext-h1]]',
          start: 0,
          filename: ['embed-doc', 3],
          media: 'markdown',
          header: 'setext-h1',
        }]
      }));

      it('setext; header text (Title Case)', testScan({
        mkdn: '![[embed-doc#Setext H1]]',
        expdData: [{
          kind: 'wikiembed',
          text: '![[embed-doc#Setext H1]]',
          start: 0,
          filename: ['embed-doc', 3],
          media: 'markdown',
          header: 'Setext H1',
        }]
      }));

    });

  });


  describe('opts', () => {

    describe('target specific file', () => {

      it('wikiattr; single; multi', testScan({
        mkdn: '\n'
        + ':reftype::[[fname-a]]\n'
        + ':attrtype::[[fname-b]]\n',
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
        mkdn: '\n'
        + ':reftype::[[fname-a]],[[fname-b]]\n',
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
        mkdn: '\n'
        + ':reftype::\n'
        + '- [[fname-a]]\n'
        + '- [[fname-b]]\n',
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
        mkdn: '\n'
        + ': reftype ::\n'
        + '            - [[fname-a]]\n'
        + '            - [[fname-b]]\n',
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
        mkdn: '\n'
        + ':mixed-list::\n'
        + '- [[item-dash]]\n'
        + '+ [[item-plus]]\n'
        + '* [[item-asterisk]]\n',
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
            header: [],
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
            header: [],
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
            text: '![[wikiembed-mkdn]]',
            header: '',
          },
          {
            filename: [
              'wikiembed-img.png',
              358
            ],
            kind: 'wikiembed',
            media: 'image',
            start: 355,
            text: '![[wikiembed-img.png]]',
            header: '',
          },
          {
            filename: [
              'wikiembed-aud.mp3',
              381
            ],
            kind: 'wikiembed',
            media: 'audio',
            start: 378,
            text: '![[wikiembed-aud.mp3]]',
            header: '',
          },
          {
            filename: [
              'wikiembed-vid.mp4',
              404
            ],
            kind: 'wikiembed',
            media: 'video',
            start: 401,
            text: '![[wikiembed-vid.mp4]]',
            header: '',
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

  describe('escaped', () => {

    describe('code spans', () => {

      it('wikiattr; unprefixed', testScan({
        mkdn: 'Here is `attrtype::[[fname]]` in code.',
        expdData: []
      }));

      it('wikiattr; prefixed', testScan({
        mkdn: 'Here is `:attrtype::[[fname]]` in code.',
        expdData: []
      }));

      it('wikiattr; outside code spans', testScan({
        mkdn: 'attrtype::[[fname]]\nHere is `some code` text.',
        expdData: [{
          kind: 'wikiattr',
          text: 'attrtype::[[fname]]\n',
          start: 0,
          type: ['attrtype', 0],
          filenames: [['fname', 12]],
          listFormat: 'none',
        }]
      }));

      it('wikilink', testScan({
        mkdn: 'Here is `[[wikilink]]` in code.',
        expdData: []
      }));

      it('wikiembed', testScan({
        mkdn: 'Here is `![[embed]]` in code.',
        expdData: []
      }));

    });

    describe('backslash', () => {

      it('wikiattr; prefixed', testScan({
        mkdn: ':attrtype\\::\\[[fname-a]]\n',
        expdData: [{
          kind: 'wikilink',
          text: '[[fname-a]]',
          start: 13,
          type: [],
          filename: ['fname-a', 15],
          header: [],
          label: [],
        }]
      }));

      it('wikiattr; unprefixed', testScan({
        mkdn: 'attrtype\\::\\[[fname-a]]\n',
        expdData: [{
          kind: 'wikilink',
          text: '[[fname-a]]',
          start: 12,
          type: [],
          filename: ['fname-a', 14],
          header: [],
          label: [],
        }]
      }));

      it('wikilink; escaped brackets', testScan({
        mkdn: '\\[[wikilink\\]]',
        expdData: [{
          kind: 'wikilink',
          text: '[[wikilink\\]]',
          start: 1,
          type: [],
          filename: ['wikilink\\', 3],
          header: [],
          label: [],
        }]
      }));

      it('wikiembed', testScan({
        mkdn: '!\\[[embed\\]]',
        expdData: [{
          kind: 'wikilink',
          text: '[[embed\\]]',
          start: 2,
          type: [],
          filename: ['embed\\', 4],
          header: [],
          label: [],
        }]
      }));

    });

    describe('indented code blocks (4+ spaces)', () => {

      it('wikiattr; prefixed', testScan({
        mkdn: '    :attrtype::[[fname-a]]\n',
        expdData: []
      }));

      it('wikiattr; unprefixed', testScan({
        mkdn: '    attrtype::[[fname-a]]\n',
        expdData: []
      }));

      it('wikilink', testScan({
        mkdn: '    [[wikilink]]',
        expdData: []
      }));

      it('wikiembed', testScan({
        mkdn: '    ![[embed]]',
        expdData: []
      }));

    });

  });

  describe('nested in markdown constructs', () => {

    describe('lists', () => {

      it('wikiattr; prefixed; becomes typed wikilink', testScan({
        mkdn: '- :attrtype::[[fname-a]]\n',
        expdData: [{
          kind: 'wikilink',
          text: ':attrtype::[[fname-a]]',
          start: 2,
          type: ['attrtype', 3],
          filename: ['fname-a', 15],
          header: [],
          label: [],
        }]
      }));

      it('wikiattr; unprefixed; plain text + wikilink', testScan({
        mkdn: '- attrtype::[[fname-a]]\n',
        expdData: [{
          kind: 'wikiattr',
          text: '- attrtype::[[fname-a]]\n',
          start: 0,
          type: ['- attrtype', 0],
          filenames: [['fname-a', 14]],
          listFormat: 'none',
        }]
      }));

      it('wikilink; in list item', testScan({
        mkdn: '- [[wikilink]] in list',
        expdData: [{
          kind: 'wikilink',
          text: '[[wikilink]]',
          start: 2,
          type: [],
          filename: ['wikilink', 4],
          header: [],
          label: [],
        }]
      }));

      it('wikiembed; in list item', testScan({
        mkdn: '- ![[embed]] in list',
        expdData: [{
          kind: 'wikiembed',
          text: '![[embed]]',
          start: 2,
          filename: ['embed', 5],
          media: 'markdown',
          header: '',
        }]
      }));

    });

    describe('blockquotes', () => {

      it('wikiattr; prefixed; becomes typed wikilink', testScan({
        mkdn: '> :attrtype::[[fname-a]]\n',
        expdData: [{
          kind: 'wikilink',
          text: ':attrtype::[[fname-a]]',
          start: 2,
          type: ['attrtype', 3],
          filename: ['fname-a', 15],
          header: [],
          label: [],
        }]
      }));

      it('wikiattr; unprefixed; plain text + wikilink', testScan({
        mkdn: '> attrtype::[[fname-a]]\n',
        expdData: [{
          kind: 'wikiattr',
          text: '> attrtype::[[fname-a]]\n',
          start: 0,
          type: ['> attrtype', 0],
          filenames: [['fname-a', 14]],
          listFormat: 'none',
        }]
      }));

      it('wikilink; in blockquote', testScan({
        mkdn: '> [[wikilink]] in quote',
        expdData: [{
          kind: 'wikilink',
          text: '[[wikilink]]',
          start: 2,
          type: [],
          filename: ['wikilink', 4],
          header: [],
          label: [],
        }]
      }));

      it('wikiembed; in blockquote', testScan({
        mkdn: '> ![[embed]] in quote',
        expdData: [{
          kind: 'wikiembed',
          text: '![[embed]]',
          start: 2,
          filename: ['embed', 5],
          media: 'markdown',
          header: '',
        }]
      }));

    });

  });

  describe('malformed', () => {

    describe('attr', () => {

      it('blank value; unprefixed', testScan({
        mkdn: 'attrtype::\nattrtype2::[[fname]]\n',
        expdData: [{
          kind: 'wikiattr',
          text: 'attrtype2::[[fname]]\n',
          start: 11,
          type: ['attrtype2', 11],
          filenames: [['fname', 24]],
          listFormat: 'none',
        }]
      }));

      it('blank value; prefixed', testScan({
        mkdn: ':attrtype::\n:attrtype2::[[fname]]\n',
        expdData: [{
          kind: 'wikiattr',
          text: ':attrtype2::[[fname]]\n',
          start: 12,
          type: ['attrtype2', 13],
          filenames: [['fname', 26]],
          listFormat: 'none',
        }]
      }));

      it('single brackets', testScan({
        mkdn: ':attrtype::[fname]\n',
        expdData: []
      }));

      it('extraneous chars after', testScan({
        mkdn: ':attrtype::[[fname]]extra\n',
        expdData: [{
          kind: 'wikilink',
          text: ':attrtype::[[fname]]',
          start: 0,
          type: ['attrtype', 1],
          filename: ['fname', 13],
          header: [],
          label: [],
        }]
      }));

      it('list; comma; not bracketed', testScan({
        mkdn: ':attrtype::string,string\n',
        expdData: []
      }));

      it('list; mkdn; not bracketed', testScan({
        mkdn: ':attrtype::\n- string\n- string\n',
        expdData: []
      }));

    });

    describe('link', () => {

      it('single brackets', testScan({
        mkdn: '[wikilink]',
        expdData: []
      }));

      it('mismatched brackets', testScan({
        mkdn: '[[wikilink]',
        expdData: []
      }));

      it('newline in link', testScan({
        mkdn: '[[wiki\nlink]]',
        expdData: []
      }));

    });

    describe('embed', () => {

      it('single brackets', testScan({
        mkdn: '![embed]',
        expdData: []
      }));

      it('mismatched brackets', testScan({
        mkdn: '![[embed]',
        expdData: []
      }));

    });

  });

  describe('whitespace variations', () => {

    describe('attr', () => {

      it('padded attrtype', testScan({
        mkdn: ': attrtype :: [[fname]]\n',
        expdData: [{
          kind: 'wikiattr',
          text: ': attrtype :: [[fname]]\n',
          start: 0,
          type: ['attrtype', 2],
          filenames: [['fname', 16]],
          listFormat: 'none',
        }]
      }));

      it('long whitespace before ::', testScan({
        mkdn: 'attrtype     :: [[fname]]\n',
        expdData: [{
          kind: 'wikiattr',
          text: 'attrtype     :: [[fname]]\n',
          start: 0,
          type: ['attrtype', 0],
          filenames: [['fname', 18]],
          listFormat: 'none',
        }]
      }));

      it('too much whitespace after :: (not valid)', testScan({
        mkdn: 'attrtype ::     [[fname]]\n',
        expdData: [{
          kind: 'wikilink',
          text: '[[fname]]',
          start: 16,
          type: [],
          filename: ['fname', 18],
          header: [],
          label: [],
        }]
      }));

      it('list; mkdn; pretty printed', testScan({
        mkdn: ': attrtype :: \n              - [[fname-a]]\n              - [[fname-b]]\n',
        expdData: [{
          kind: 'wikiattr',
          text: ': attrtype :: \n              - [[fname-a]]\n              - [[fname-b]]\n',
          start: 0,
          type: ['attrtype', 2],
          filenames: [
            ['fname-a', 33],
            ['fname-b', 61]
          ],
          listFormat: 'mkdn',
        }]
      }));

    });

  });

  describe('edge cases', () => {

    it('wikiattr at EOF without newline', testScan({
      mkdn: 'attrtype::[[fname]]',
      expdData: [{
        kind: 'wikiattr',
        text: 'attrtype::[[fname]]',
        start: 0,
        type: ['attrtype', 0],
        filenames: [['fname', 12]],
        listFormat: 'none',
      }]
    }));

    it('multiple wikiattrs on same line (not valid as attrs)', testScan({
      mkdn: 'attr1::[[fname1]] attr2::[[fname2]]',
      expdData: [{
        kind: 'wikilink',
        text: '[[fname1]]',
        start: 7,
        type: [],
        filename: ['fname1', 9],
        header: [],
        label: [],
      }, {
        kind: 'wikilink',
        text: '[[fname2]]',
        start: 25,
        type: [],
        filename: ['fname2', 27],
        header: [],
        label: [],
      }]
    }));

    it('wikiattr with text on same line after', testScan({
      mkdn: 'attrtype::[[fname]] some text\n',
      expdData: [{
        kind: 'wikilink',
        text: '[[fname]]',
        start: 10,
        type: [],
        filename: ['fname', 12],
        header: [],
        label: [],
      }]
    }));

    it('wikiattr with text on same line before (unprefixed)', testScan({
      mkdn: 'some text attrtype::[[fname]]\n',
      expdData: [{
        kind: 'wikiattr',
        text: 'some text attrtype::[[fname]]\n',
        start: 0,
        type: ['some text attrtype', 0],
        filenames: [['fname', 22]],
        listFormat: 'none',
      }]
    }));

  });

});
