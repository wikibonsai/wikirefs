import assert from 'node:assert/strict';

import * as wikirefs from '../src';
import type { ScanResult, ScanRef, ScanAttr, ScanLink, ScanEmbed, ScannedFileName } from '../src';


const testScan = (params: any) => () => {
  const mkdn: string = params.mkdn;
  const expdWikirefs: any = params.expdWikirefs;
  const expdFilenames: any = params.expdFilenames;
  const opts: any = params.opts ? params.opts : {};
  const result: ScanResult = wikirefs.scan(mkdn, opts);
  if (expdWikirefs !== undefined) {
    assert.deepStrictEqual(result.wikirefs, expdWikirefs);
  }
  if (expdFilenames !== undefined) {
    assert.deepStrictEqual(result.filenames, expdFilenames);
  }
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
      expdWikirefs: [{
        kind: 'wikiattr',
        match: ':attrtype::[[fname-a]]\n',
        start: 1,
        type: { text: 'attrtype', start: 2 },
        filenames: [ { text: 'fname-a', start: 14 } ],
        listFormat: 'none',
      }, {
        kind: 'wikilink',
        match: ':typed::[[fname-a]]',
        start: 35,
        type: { text: 'typed', start: 36 },
        filename: { text: 'fname-a', start: 45 },
      }, {
        kind: 'wikilink',
        match: '[[fname-a]]',
        start: 76,
        filename: { text: 'fname-a', start: 78 },
      }, {
        kind: 'wikiembed',
        media: 'markdown',
        match: '![[fname-a]]',
        start: 90,
        filename: { text: 'fname-a', start: 93 },
      }],
    }));

    it('wikiattr; single; multi', testScan({
      mkdn: '\n'
        + ':reftype::[[fname-a]]\n'
        + ':attrtype::[[fname-b]]\n',
      expdWikirefs: [{
        kind: 'wikiattr',
        match: ':reftype::[[fname-a]]\n',
        start: 1,
        type: { text: 'reftype', start: 2 },
        filenames: [ { text: 'fname-a', start: 13 } ],
        listFormat: 'none',
      }, {
        kind: 'wikiattr',
        match: ':attrtype::[[fname-b]]\n',
        start: 23,
        type: { text: 'attrtype', start: 24 },
        filenames: [ { text: 'fname-b', start: 36 } ],
        listFormat: 'none',
      }],
    }));

  });

  describe('attr', () => {

    describe('unprefixed', () => {

      it('single; end of line', testScan({
        mkdn: 'attrtype::[[wikilink]]',
        expdWikirefs:[{
          kind: 'wikiattr',
          match: 'attrtype::[[wikilink]]',
          start: 0,
          type: { text: 'attrtype', start: 0 },
          filenames: [ { text: 'wikilink', start: 12 } ],
          listFormat: 'none',
        }]
      }));

      it('single; newline', testScan({
        mkdn: 'attrtype::[[wikilink]]\n',
        expdWikirefs:[{
          kind: 'wikiattr',
          match: 'attrtype::[[wikilink]]\n',
          start: 0,
          type: { text: 'attrtype', start: 0 },
          filenames: [ { text: 'wikilink', start: 12 } ],
          listFormat: 'none',
        }]
      }));

      it('list; comma', testScan({
        mkdn: 'attrtype::[[wikilinks]],[[wikilink]]\n',
        expdWikirefs: [{
          kind: 'wikiattr',
          match: 'attrtype::[[wikilinks]],[[wikilink]]\n',
          start: 0,
          type: { text: 'attrtype', start: 0 },
          filenames: [
            { text: 'wikilinks', start: 12 },
            { text: 'wikilink', start: 26 },
          ],
          listFormat: 'comma',
        }],
      }));

      it('list; mkdn', testScan({
        mkdn: 'attrtype::\n- [[wikilinks]]\n- [[wikilink]]\n',
        expdWikirefs:[{
          kind: 'wikiattr',
          match: 'attrtype::\n- [[wikilinks]]\n- [[wikilink]]\n',
          start: 0,
          type: { text: 'attrtype', start: 0 },
          filenames: [
            { text: 'wikilinks', start: 15 },
            { text: 'wikilink', start: 31 },
          ],
          listFormat: 'mkdn',
        }],
      }));

      it('list; mkdn; multi', testScan({
        mkdn: '\nattrtype1::\n- [[wikilink]]\nattrtype2::\n- [[wikilink]]\n',
        expdWikirefs:[
          {
            kind: 'wikiattr',
            match: 'attrtype1::\n- [[wikilink]]\n',
            start: 1,
            type: { text: 'attrtype1', start: 1 },
            filenames: [ { text: 'wikilink', start: 17 } ],
            listFormat: 'mkdn',
          },
          {
            kind: 'wikiattr',
            match: 'attrtype2::\n- [[wikilink]]\n',
            start: 28,
            type: { text: 'attrtype2', start: 28 },
            filenames: [ { text: 'wikilink', start: 44 } ],
            listFormat: 'mkdn',
          }
        ],
      }));

    });

    describe('prefixed', () => {

      it('single', testScan({
        mkdn: ':attrtype::[[wikilink]]\n',
        expdWikirefs:[{
          kind: 'wikiattr',
          match: ':attrtype::[[wikilink]]\n',
          start: 0,
          type: { text: 'attrtype', start: 1 },
          filenames: [ { text: 'wikilink', start: 13 } ],
          listFormat: 'none',
        }]
      }));

      it('single; pad', testScan({
        mkdn: ': attrtype ::[[wikilink]]\n',
        expdWikirefs:[{
          kind: 'wikiattr',
          match: ': attrtype ::[[wikilink]]\n',
          start: 0,
          type: { text: 'attrtype', start: 2 },
          filenames: [ { text: 'wikilink', start: 15 } ],
          listFormat: 'none',
        }]
      }));

      it('list; comma', testScan({
        mkdn: ':attrtype::[[wikilinks]],[[wikilink]]\n',
        expdWikirefs: [{
          kind: 'wikiattr',
          match: ':attrtype::[[wikilinks]],[[wikilink]]\n',
          start: 0,
          type: { text: 'attrtype', start: 1 },
          filenames: [
            { text: 'wikilinks', start: 13 },
            { text: 'wikilink', start: 27 },
          ],
          listFormat: 'comma',
        }]
      }));

      it('list; mkdn', testScan({
        mkdn: ':attrtype::\n- [[wikilinks]]\n- [[wikilink]]\n',
        expdWikirefs:[{
          kind: 'wikiattr',
          match: ':attrtype::\n- [[wikilinks]]\n- [[wikilink]]\n',
          start: 0,
          type: { text: 'attrtype', start: 1 },
          filenames: [
            { text: 'wikilinks', start: 16 },
            { text: 'wikilink', start: 32 },
          ],
          listFormat: 'mkdn',
        }],
      }));

      it('with header (parsed as wikilink)', testScan({
        mkdn: ':attrtype::[[filename#header]]\n',
        expdWikirefs: [{
          kind: 'wikilink',
          match: ':attrtype::[[filename#header]]',
          start: 0,
          type: { text: 'attrtype', start: 1 },
          filename: { text: 'filename', start: 13 },
          header: { text: 'header', start: 22 },
        }]
      }));

    });

  });

  describe('link', () => {

    describe('untyped', () => {

      it('base', testScan({
        mkdn: '[[wikilink]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: '[[wikilink]]',
          start: 0,
          filename: { text: 'wikilink', start: 2 },
        }]
      }));

      it('header; base; html id (kebab-case)', testScan({
        mkdn: '[[wikilink#header-text]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: '[[wikilink#header-text]]',
          start: 0,
          filename: { text: 'wikilink', start: 2 },
          header: { text: 'header-text', start: 11 },
        }]
      }));

      it('header; base; header text (Title Case)', testScan({
        mkdn: '[[filename#Header Text]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: '[[filename#Header Text]]',
          start: 0,
          filename: { text: 'filename', start: 2 },
          header: { text: 'Header Text', start: 11 },
        }]
      }));

      it('header; empty', testScan({
        mkdn: '[[filename#]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: '[[filename#]]',
          start: 0,
          filename: { text: 'filename', start: 2 },
          header: { text: '', start: 11 },
        }]
      }));

      it('labelled; base', testScan({
        mkdn: '[[wikilink|label]]',
        expdWikirefs:[{
          kind: 'wikilink',
          match: '[[wikilink|label]]',
          start: 0,
          filename: { text: 'wikilink', start: 2 },
          label: { text: 'label', start: 11 },
        }],
      }));

      it('labelled; header; html id (kebab-case)', testScan({
        mkdn: '[[filename#header-text|label]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: '[[filename#header-text|label]]',
          start: 0,
          filename: { text: 'filename', start: 2 },
          header: { text: 'header-text', start: 11 },
          label: { text: 'label', start: 23 },
        }],
      }));

      it('labelled; header; header text (Title Case)', testScan({
        mkdn: '[[filename#Header Text|label]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: '[[filename#Header Text|label]]',
          start: 0,
          filename: { text: 'filename', start: 2 },
          header: { text: 'Header Text', start: 11 },
          label: { text: 'label', start: 23 },
        }],
      }));

      it('header; setext; html id (kebab-case)', testScan({
        mkdn: '[[wikilink#setext-h1]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: '[[wikilink#setext-h1]]',
          start: 0,
          filename: { text: 'wikilink', start: 2 },
          header: { text: 'setext-h1', start: 11 },
        }],
      }));

      it('header; setext; header text (Title Case)', testScan({
        mkdn: '[[filename#Setext H1]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: '[[filename#Setext H1]]',
          start: 0,
          filename: { text: 'filename', start: 2 },
          header: { text: 'Setext H1', start: 11 },
        }],
      }));

    });

    describe('typed', () => {

      it('base', testScan({
        mkdn: ':linktype::[[wikilink]].',
        expdWikirefs:[{
          kind: 'wikilink',
          match: ':linktype::[[wikilink]]',
          start: 0,
          type: { text: 'linktype', start: 1 },
          filename: { text: 'wikilink', start: 13 },
        }]
      }));

      it('header; base; html id (kebab-case)', testScan({
        mkdn: ':linktype::[[wikilink#header-text]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: ':linktype::[[wikilink#header-text]]',
          start: 0,
          type: { text: 'linktype', start: 1 },
          filename: { text: 'wikilink', start: 13 },
          header: { text: 'header-text', start: 22 },
        }]
      }));

      it('header; base; header text (Title Case)', testScan({
        mkdn: ':linktype::[[filename#Header Text]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: ':linktype::[[filename#Header Text]]',
          start: 0,
          type: { text: 'linktype', start: 1 },
          filename: { text: 'filename', start: 13 },
          header: { text: 'Header Text', start: 22 },
        }]
      }));

      it('header; empty', testScan({
        mkdn: ':linktype::[[filename#]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: ':linktype::[[filename#]]',
          start: 0,
          type: { text: 'linktype', start: 1 },
          filename: { text: 'filename', start: 13 },
          header: { text: '', start: 22 },
        }]
      }));

      it('labelled; base', testScan({
        mkdn: ':linktype::[[wikilink|label]]',
        expdWikirefs:[{
          kind: 'wikilink',
          match: ':linktype::[[wikilink|label]]',
          start: 0,
          type: { text: 'linktype', start: 1 },
          filename: { text: 'wikilink', start: 13 },
          label: { text: 'label', start: 22 },
        }],
      }));

      it('labelled; header; html id (kebab-case)', testScan({
        mkdn: ':linktype::[[filename#header-text|label]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: ':linktype::[[filename#header-text|label]]',
          start: 0,
          type: { text: 'linktype', start: 1 },
          filename: { text: 'filename', start: 13 },
          header: { text: 'header-text', start: 22 },
          label: { text: 'label', start: 34 },
        }],
      }));

      it('labelled; header; header text (Title Case)', testScan({
        mkdn: ':linktype::[[filename#Header Text|label]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: ':linktype::[[filename#Header Text|label]]',
          start: 0,
          type: { text: 'linktype', start: 1 },
          filename: { text: 'filename', start: 13 },
          header: { text: 'Header Text', start: 22 },
          label: { text: 'label', start: 34 },
        }],
      }));

      it('header; setext; html id (kebab-case)', testScan({
        mkdn: ':linktype::[[wikilink#setext-h1]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: ':linktype::[[wikilink#setext-h1]]',
          start: 0,
          type: { text: 'linktype', start: 1 },
          filename: { text: 'wikilink', start: 13 },
          header: { text: 'setext-h1', start: 22 },
        }],
      }));

      it('header; setext; header text (Title Case)', testScan({
        mkdn: ':linktype::[[filename#Setext H1]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: ':linktype::[[filename#Setext H1]]',
          start: 0,
          type: { text: 'linktype', start: 1 },
          filename: { text: 'filename', start: 13 },
          header: { text: 'Setext H1', start: 22 },
        }],
      }));

    });

    describe('malformed; attr-like but not an attr', () => {

      it('[[wikilink]] on later line; empty attrtype', testScan({
        mkdn: ': attrtype ::\n\n[[wikilink]]\n',
        expdWikirefs:[{
          kind: 'wikilink',
          match: '[[wikilink]]',
          start: 15,
          filename: { text: 'wikilink', start: 17 },
        }],
      }));

      it('[[wikilink]] on later line; empty string attrtype', testScan({
        mkdn: ': attrtype :: \'\' \n\n[[wikilink]]\n',
        expdWikirefs:[{
          kind: 'wikilink',
          match: '[[wikilink]]',
          start: 19,
          filename: { text: 'wikilink', start: 21 },
        }],
      }));

    });

  });

  describe('embed', () => {

    it('base', testScan({
      mkdn: '![[wikiembed]]',
      expdWikirefs: [{
        kind: 'wikiembed',
        match: '![[wikiembed]]',
        start: 0,
        filename: { text: 'wikiembed', start: 3 },
        media: 'markdown',
      }]
    }));

    describe('header', () => {

      it('html id (kebab-case)', testScan({
        mkdn: '![[embed-doc#header-text]]',
        expdWikirefs: [{
          kind: 'wikiembed',
          match: '![[embed-doc#header-text]]',
          start: 0,
          filename: { text: 'embed-doc', start: 3 },
          media: 'markdown',
          header: { text: 'header-text', start: 13 },
        }]
      }));

      it('header text (Title Case)', testScan({
        mkdn: '![[embed-doc#Header Text]]',
        expdWikirefs: [{
          kind: 'wikiembed',
          match: '![[embed-doc#Header Text]]',
          start: 0,
          filename: { text: 'embed-doc', start: 3 },
          media: 'markdown',
          header: { text: 'Header Text', start: 13 },
        }]
      }));

      it('empty (full-doc embed)', testScan({
        mkdn: '![[embed-doc#]]',
        expdWikirefs: [{
          kind: 'wikiembed',
          match: '![[embed-doc#]]',
          start: 0,
          filename: { text: 'embed-doc', start: 3 },
          media: 'markdown',
          header: { text: '', start: 13 },
        }]
      }));

      it('setext; html id (kebab-case)', testScan({
        mkdn: '![[embed-doc#setext-h1]]',
        expdWikirefs: [{
          kind: 'wikiembed',
          match: '![[embed-doc#setext-h1]]',
          start: 0,
          filename: { text: 'embed-doc', start: 3 },
          media: 'markdown',
          header: { text: 'setext-h1', start: 13 },
        }]
      }));

      it('setext; header text (Title Case)', testScan({
        mkdn: '![[embed-doc#Setext H1]]',
        expdWikirefs: [{
          kind: 'wikiembed',
          match: '![[embed-doc#Setext H1]]',
          start: 0,
          filename: { text: 'embed-doc', start: 3 },
          media: 'markdown',
          header: { text: 'Setext H1', start: 13 },
        }]
      }));

    });

  });

  describe('filenames (flat view)', () => {

    it('mixed content produces flat list', testScan({
      mkdn: ':attrtype::[[fname-a]], [[fname-b]]\n\n[[fname-c]]\n\n![[fname-d]]\n',
      expdFilenames: [
        { filename: { text: 'fname-a', start: 13 }, kind: 'wikiattr', type: { text: 'attrtype', start: 1 }, listFormat: 'comma' },
        { filename: { text: 'fname-b', start: 26 }, kind: 'wikiattr', type: { text: 'attrtype', start: 1 }, listFormat: 'comma' },
        { filename: { text: 'fname-c', start: 39 }, kind: 'wikilink' },
        { filename: { text: 'fname-d', start: 53 }, kind: 'wikiembed', media: 'markdown' },
      ],
    }));

  });

  describe('opts', () => {

    describe('target specific file', () => {

      it('wikiattr; single; multi', testScan({
        mkdn: '\n'
        + ':reftype::[[fname-a]]\n'
        + ':attrtype::[[fname-b]]\n',
        opts: { filename: 'fname-a' },
        expdWikirefs: [
          {
            kind: 'wikiattr',
            match: ':reftype::[[fname-a]]\n',
            start: 1,
            type: { text: 'reftype', start: 2 },
            filenames: [ { text: 'fname-a', start: 13 } ],
            listFormat: 'none',
          }
          // note: 'fname-b' is left out
        ],
      }));

      it('wikiattr; list; comma', testScan({
        mkdn: '\n'
        + ':reftype::[[fname-a]],[[fname-b]]\n',
        opts: { filename: 'fname-a' },
        expdWikirefs: [
          {
            kind: 'wikiattr',
            match: ':reftype::[[fname-a]],[[fname-b]]\n',
            start: 1,
            type: { text: 'reftype', start: 2 },
            filenames: [ { text: 'fname-a', start: 13 } ],
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
        expdWikirefs: [
          {
            kind: 'wikiattr',
            match: ':reftype::\n- [[fname-a]]\n- [[fname-b]]\n',
            start: 1,
            type: { text: 'reftype', start: 2 },
            filenames: [ { text: 'fname-a', start: 16 } ],
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
        expdWikirefs: [
          {
            kind: 'wikiattr',
            match: ': reftype ::\n            - [[fname-a]]\n            - [[fname-b]]\n',
            start: 1,
            type: { text: 'reftype', start: 3 },
            filenames: [ { text: 'fname-a', start: 30 } ],
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
        expdWikirefs: [
          {
            filenames: [ { text: 'wikiattr-single', start: 11 } ],
            kind: 'wikiattr',
            listFormat: 'none',
            start: 1,
            match: ':type1::[[wikiattr-single]]\n',
            type: { text: 'type1', start: 2 },
          },
          {
            filenames: [
              { text: 'wikiattr-list-comma-1', start: 39 },
              { text: 'wikiattr-list-comma-2', start: 66 },
            ],
            kind: 'wikiattr',
            listFormat: 'comma',
            start: 29,
            match: ':type2::[[wikiattr-list-comma-1]], [[wikiattr-list-comma-2]]\n',
            type: { text: 'type2', start: 30 },
          },
          {
            filenames: [
              { text: 'wikiattr-list-mkdn-clean-1', start: 103 },
              { text: 'wikiattr-list-mkdn-clean-2', start: 136 },
            ],
            kind: 'wikiattr',
            listFormat: 'mkdn',
            start: 90,
            match: ':type3::\n- [[wikiattr-list-mkdn-clean-1]]\n- [[wikiattr-list-mkdn-clean-2]]\n',
            type: { text: 'type3', start: 91 },
          },
          {
            filenames: [
              { text: 'wikiattr-list-mkdn-pretty-1', start: 190 },
              { text: 'wikiattr-list-mkdn-pretty-2', start: 234 },
            ],
            kind: 'wikiattr',
            listFormat: 'mkdn',
            start: 165,
            match:
`: type4 ::
          - [[wikiattr-list-mkdn-pretty-1]]
          - [[wikiattr-list-mkdn-pretty-2]]
`,
            type: { text: 'type4', start: 167 },
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
        expdWikirefs: [
          {
            kind: 'wikiattr',
            match: ':mixed-list::\n- [[item-dash]]\n+ [[item-plus]]\n* [[item-asterisk]]\n',
            start: 1,
            type: { text: 'mixed-list', start: 2 },
            filenames: [
              { text: 'item-dash', start: 19 },
              { text: 'item-plus', start: 35 },
              { text: 'item-asterisk', start: 51 },
            ],
            listFormat: 'mkdn',
          }
        ],
      }));

      it.skip('wikilink (labelled)');

      it('wikilink (untyped, typed)', testScan({
        mkdn: input,
        opts: { kind: 'wikilink' },
        expdWikirefs: [
          {
            filename: { text: 'wikilink-typed', start: 291 },
            kind: 'wikilink',
            start: 281,
            match: ':typed::[[wikilink-typed]]',
            type: { text: 'typed', start: 282 },
          },
          {
            filename: { text: 'wikilink-untyped', start: 314 },
            kind: 'wikilink',
            start: 312,
            match: '[[wikilink-untyped]]',
          }
        ],
      }));

      it('wikiembed (md, img, aud, vid)', testScan({
        mkdn: input,
        opts: { kind: 'wikiembed' },
        expdWikirefs: [
          {
            filename: { text: 'wikiembed-mkdn', start: 338 },
            kind: 'wikiembed',
            media: 'markdown',
            start: 335,
            match: '![[wikiembed-mkdn]]',
          },
          {
            filename: { text: 'wikiembed-img.png', start: 358 },
            kind: 'wikiembed',
            media: 'image',
            start: 355,
            match: '![[wikiembed-img.png]]',
          },
          {
            filename: { text: 'wikiembed-aud.mp3', start: 381 },
            kind: 'wikiembed',
            media: 'audio',
            start: 378,
            match: '![[wikiembed-aud.mp3]]',
          },
          {
            filename: { text: 'wikiembed-vid.mp4', start: 404 },
            kind: 'wikiembed',
            media: 'video',
            start: 401,
            match: '![[wikiembed-vid.mp4]]',
          }
        ],
      }));

      it.skip('base (traditional [[wikilinks]])');

    });

  });

  describe('escaped', () => {

    describe('code spans', () => {

      it('wikiattr; unprefixed', testScan({
        mkdn: 'Here is `attrtype::[[fname]]` in code.',
        expdWikirefs: []
      }));

      it('wikiattr; prefixed', testScan({
        mkdn: 'Here is `:attrtype::[[fname]]` in code.',
        expdWikirefs: []
      }));

      it('wikiattr; outside code spans', testScan({
        mkdn: 'attrtype::[[fname]]\nHere is `some code` text.',
        expdWikirefs: [{
          kind: 'wikiattr',
          match: 'attrtype::[[fname]]\n',
          start: 0,
          type: { text: 'attrtype', start: 0 },
          filenames: [{ text: 'fname', start: 12 }],
          listFormat: 'none',
        }]
      }));

      it('wikilink', testScan({
        mkdn: 'Here is `[[wikilink]]` in code.',
        expdWikirefs: []
      }));

      it('wikiembed', testScan({
        mkdn: 'Here is `![[embed]]` in code.',
        expdWikirefs: []
      }));

    });

    describe('backslash', () => {

      it('wikiattr; prefixed', testScan({
        mkdn: ':attrtype\\::\\[[fname-a]]\n',
        expdWikirefs: [{
          kind: 'wikilink',
          match: '[[fname-a]]',
          start: 13,
          filename: { text: 'fname-a', start: 15 },
        }]
      }));

      it('wikiattr; unprefixed', testScan({
        mkdn: 'attrtype\\::\\[[fname-a]]\n',
        expdWikirefs: [{
          kind: 'wikilink',
          match: '[[fname-a]]',
          start: 12,
          filename: { text: 'fname-a', start: 14 },
        }]
      }));

      it('wikilink; escaped brackets', testScan({
        mkdn: '\\[[wikilink\\]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: '[[wikilink\\]]',
          start: 1,
          filename: { text: 'wikilink\\', start: 3 },
        }]
      }));

      it('wikiembed', testScan({
        mkdn: '!\\[[embed\\]]',
        expdWikirefs: [{
          kind: 'wikilink',
          match: '[[embed\\]]',
          start: 2,
          filename: { text: 'embed\\', start: 4 },
        }]
      }));

    });

    describe('indented code blocks (4+ spaces)', () => {

      it('wikiattr; prefixed', testScan({
        mkdn: '    :attrtype::[[fname-a]]\n',
        expdWikirefs: []
      }));

      it('wikiattr; unprefixed', testScan({
        mkdn: '    attrtype::[[fname-a]]\n',
        expdWikirefs: []
      }));

      it('wikilink', testScan({
        mkdn: '    [[wikilink]]',
        expdWikirefs: []
      }));

      it('wikiembed', testScan({
        mkdn: '    ![[embed]]',
        expdWikirefs: []
      }));

    });

  });

  describe('nested in markdown constructs', () => {

    describe('lists', () => {

      it('wikiattr; prefixed; becomes typed wikilink', testScan({
        mkdn: '- :attrtype::[[fname-a]]\n',
        expdWikirefs: [{
          kind: 'wikilink',
          match: ':attrtype::[[fname-a]]',
          start: 2,
          type: { text: 'attrtype', start: 3 },
          filename: { text: 'fname-a', start: 15 },
        }]
      }));

      it('wikiattr; unprefixed; plain text + wikilink', testScan({
        mkdn: '- attrtype::[[fname-a]]\n',
        expdWikirefs: [{
          kind: 'wikiattr',
          match: '- attrtype::[[fname-a]]\n',
          start: 0,
          type: { text: '- attrtype', start: 0 },
          filenames: [{ text: 'fname-a', start: 14 }],
          listFormat: 'none',
        }]
      }));

      it('wikilink; in list item', testScan({
        mkdn: '- [[wikilink]] in list',
        expdWikirefs: [{
          kind: 'wikilink',
          match: '[[wikilink]]',
          start: 2,
          filename: { text: 'wikilink', start: 4 },
        }]
      }));

      it('wikiembed; in list item', testScan({
        mkdn: '- ![[embed]] in list',
        expdWikirefs: [{
          kind: 'wikiembed',
          match: '![[embed]]',
          start: 2,
          filename: { text: 'embed', start: 5 },
          media: 'markdown',
        }]
      }));

    });

    describe('blockquotes', () => {

      it('wikiattr; prefixed; becomes typed wikilink', testScan({
        mkdn: '> :attrtype::[[fname-a]]\n',
        expdWikirefs: [{
          kind: 'wikilink',
          match: ':attrtype::[[fname-a]]',
          start: 2,
          type: { text: 'attrtype', start: 3 },
          filename: { text: 'fname-a', start: 15 },
        }]
      }));

      it('wikiattr; unprefixed; plain text + wikilink', testScan({
        mkdn: '> attrtype::[[fname-a]]\n',
        expdWikirefs: [{
          kind: 'wikiattr',
          match: '> attrtype::[[fname-a]]\n',
          start: 0,
          type: { text: '> attrtype', start: 0 },
          filenames: [{ text: 'fname-a', start: 14 }],
          listFormat: 'none',
        }]
      }));

      it('wikilink; in blockquote', testScan({
        mkdn: '> [[wikilink]] in quote',
        expdWikirefs: [{
          kind: 'wikilink',
          match: '[[wikilink]]',
          start: 2,
          filename: { text: 'wikilink', start: 4 },
        }]
      }));

      it('wikiembed; in blockquote', testScan({
        mkdn: '> ![[embed]] in quote',
        expdWikirefs: [{
          kind: 'wikiembed',
          match: '![[embed]]',
          start: 2,
          filename: { text: 'embed', start: 5 },
          media: 'markdown',
        }]
      }));

    });

  });

  describe('malformed', () => {

    describe('attr', () => {

      it('blank value; unprefixed', testScan({
        mkdn: 'attrtype::\nattrtype2::[[fname]]\n',
        expdWikirefs: [{
          kind: 'wikiattr',
          match: 'attrtype2::[[fname]]\n',
          start: 11,
          type: { text: 'attrtype2', start: 11 },
          filenames: [{ text: 'fname', start: 24 }],
          listFormat: 'none',
        }]
      }));

      it('blank value; prefixed', testScan({
        mkdn: ':attrtype::\n:attrtype2::[[fname]]\n',
        expdWikirefs: [{
          kind: 'wikiattr',
          match: ':attrtype2::[[fname]]\n',
          start: 12,
          type: { text: 'attrtype2', start: 13 },
          filenames: [{ text: 'fname', start: 26 }],
          listFormat: 'none',
        }]
      }));

      it('single brackets', testScan({
        mkdn: ':attrtype::[fname]\n',
        expdWikirefs: []
      }));

      it('extraneous chars after', testScan({
        mkdn: ':attrtype::[[fname]]extra\n',
        expdWikirefs: [{
          kind: 'wikilink',
          match: ':attrtype::[[fname]]',
          start: 0,
          type: { text: 'attrtype', start: 1 },
          filename: { text: 'fname', start: 13 },
        }]
      }));

      it('list; comma; not bracketed', testScan({
        mkdn: ':attrtype::string,string\n',
        expdWikirefs: []
      }));

      it('list; mkdn; not bracketed', testScan({
        mkdn: ':attrtype::\n- string\n- string\n',
        expdWikirefs: []
      }));

    });

    describe('link', () => {

      it('single brackets', testScan({
        mkdn: '[wikilink]',
        expdWikirefs: []
      }));

      it('mismatched brackets', testScan({
        mkdn: '[[wikilink]',
        expdWikirefs: []
      }));

      it('newline in link', testScan({
        mkdn: '[[wiki\nlink]]',
        expdWikirefs: []
      }));

    });

    describe('embed', () => {

      it('single brackets', testScan({
        mkdn: '![embed]',
        expdWikirefs: []
      }));

      it('mismatched brackets', testScan({
        mkdn: '![[embed]',
        expdWikirefs: []
      }));

    });

  });

  describe('whitespace variations', () => {

    describe('attr', () => {

      it('padded attrtype', testScan({
        mkdn: ': attrtype :: [[fname]]\n',
        expdWikirefs: [{
          kind: 'wikiattr',
          match: ': attrtype :: [[fname]]\n',
          start: 0,
          type: { text: 'attrtype', start: 2 },
          filenames: [{ text: 'fname', start: 16 }],
          listFormat: 'none',
        }]
      }));

      it('long whitespace before ::', testScan({
        mkdn: 'attrtype     :: [[fname]]\n',
        expdWikirefs: [{
          kind: 'wikiattr',
          match: 'attrtype     :: [[fname]]\n',
          start: 0,
          type: { text: 'attrtype', start: 0 },
          filenames: [{ text: 'fname', start: 18 }],
          listFormat: 'none',
        }]
      }));

      it('too much whitespace after :: (not valid)', testScan({
        mkdn: 'attrtype ::     [[fname]]\n',
        expdWikirefs: [{
          kind: 'wikilink',
          match: '[[fname]]',
          start: 16,
          filename: { text: 'fname', start: 18 },
        }]
      }));

      it('list; mkdn; pretty printed', testScan({
        mkdn: ': attrtype :: \n              - [[fname-a]]\n              - [[fname-b]]\n',
        expdWikirefs: [{
          kind: 'wikiattr',
          match: ': attrtype :: \n              - [[fname-a]]\n              - [[fname-b]]\n',
          start: 0,
          type: { text: 'attrtype', start: 2 },
          filenames: [
            { text: 'fname-a', start: 33 },
            { text: 'fname-b', start: 61 },
          ],
          listFormat: 'mkdn',
        }]
      }));

    });

  });

  describe('edge cases', () => {

    it('wikiattr at EOF without newline', testScan({
      mkdn: 'attrtype::[[fname]]',
      expdWikirefs: [{
        kind: 'wikiattr',
        match: 'attrtype::[[fname]]',
        start: 0,
        type: { text: 'attrtype', start: 0 },
        filenames: [{ text: 'fname', start: 12 }],
        listFormat: 'none',
      }]
    }));

    it('multiple wikiattrs on same line (not valid as attrs)', testScan({
      mkdn: 'attr1::[[fname1]] attr2::[[fname2]]',
      expdWikirefs: [{
        kind: 'wikilink',
        match: '[[fname1]]',
        start: 7,
        filename: { text: 'fname1', start: 9 },
      }, {
        kind: 'wikilink',
        match: '[[fname2]]',
        start: 25,
        filename: { text: 'fname2', start: 27 },
      }]
    }));

    it('wikiattr with text on same line after', testScan({
      mkdn: 'attrtype::[[fname]] some text\n',
      expdWikirefs: [{
        kind: 'wikilink',
        match: '[[fname]]',
        start: 10,
        filename: { text: 'fname', start: 12 },
      }]
    }));

    it('wikiattr with text on same line before (unprefixed)', testScan({
      mkdn: 'some text attrtype::[[fname]]\n',
      expdWikirefs: [{
        kind: 'wikiattr',
        match: 'some text attrtype::[[fname]]\n',
        start: 0,
        type: { text: 'some text attrtype', start: 0 },
        filenames: [{ text: 'fname', start: 22 }],
        listFormat: 'none',
      }]
    }));

  });

});
