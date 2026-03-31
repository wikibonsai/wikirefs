import assert from 'node:assert/strict';

import * as wikirefs from '../src';


const oldHeader: string = 'old-header';
const newHeader: string = 'new-header';
const filename: string = 'filename';

describe('rehead()', () => {

  describe('with filename option (scoped)', () => {

    const testRehead = (params: any) => () => {
      const mkdn: string = params.mkdn;
      const expdMkdn: string = params.expdMkdn;
      const actlMkdn: string = wikirefs.rehead(oldHeader, newHeader, mkdn, { filename });
      assert.strictEqual(actlMkdn, expdMkdn);
    };

    it('basic', testRehead({
      mkdn: 'Here is a [[filename#old-header]].',
      expdMkdn: 'Here is a [[filename#new-header]].',
    }));

    it('with label', testRehead({
      mkdn: 'Here is a [[filename#old-header|label]].',
      expdMkdn: 'Here is a [[filename#new-header|label]].',
    }));

    it('typed', testRehead({
      mkdn: 'Here is a :linktype::[[filename#old-header]].',
      expdMkdn: 'Here is a :linktype::[[filename#new-header]].',
    }));

    it('scoped to filename; other filenames unchanged', testRehead({
      mkdn: 'Here is a [[other-file#old-header]] and [[filename#old-header]].',
      expdMkdn: 'Here is a [[other-file#old-header]] and [[filename#new-header]].',
    }));

    it('multiple occurrences', testRehead({
      mkdn: 'First [[filename#old-header]] and second [[filename#old-header]].',
      expdMkdn: 'First [[filename#new-header]] and second [[filename#new-header]].',
    }));

    it('embed', testRehead({
      mkdn: 'Embed section: ![[filename#old-header]].',
      expdMkdn: 'Embed section: ![[filename#new-header]].',
    }));

    it('embed and link; scoped to filename', testRehead({
      mkdn: '[[other#old-header]] and ![[filename#old-header]] and [[filename#old-header]].',
      expdMkdn: '[[other#old-header]] and ![[filename#new-header]] and [[filename#new-header]].',
    }));

    it('mixed; link and embed; same filename; both renamed', testRehead({
      mkdn: 'Link [[filename#old-header]] and embed ![[filename#old-header]].',
      expdMkdn: 'Link [[filename#new-header]] and embed ![[filename#new-header]].',
    }));

    it('setext header (kebab)', () => {
      const mkdn = 'Here is a [[filename#setext-h1]].';
      const expdMkdn = 'Here is a [[filename#setext-h2]].';
      const actlMkdn = wikirefs.rehead('setext-h1', 'setext-h2', mkdn, { filename });
      assert.strictEqual(actlMkdn, expdMkdn);
    });

  });

  describe('without filename option (global)', () => {

    const testReheadGlobal = (params: any) => () => {
      const mkdn: string = params.mkdn;
      const expdMkdn: string = params.expdMkdn;
      const actlMkdn: string = wikirefs.rehead(oldHeader, newHeader, mkdn);
      assert.strictEqual(actlMkdn, expdMkdn);
    };

    it('renames header across all filenames', testReheadGlobal({
      mkdn: 'Both [[file-a#old-header]] and [[file-b#old-header]] get renamed.',
      expdMkdn: 'Both [[file-a#new-header]] and [[file-b#new-header]] get renamed.',
    }));

    it('renames header in links and embeds', testReheadGlobal({
      mkdn: 'Link [[file-a#old-header]] and embed ![[file-b#old-header]].',
      expdMkdn: 'Link [[file-a#new-header]] and embed ![[file-b#new-header]].',
    }));

    it('mixed; links and embeds; all renamed', testReheadGlobal({
      mkdn: '[[file-a#old-header]] and ![[file-a#old-header]] and [[file-b#old-header]] and ![[file-b#old-header]].',
      expdMkdn: '[[file-a#new-header]] and ![[file-a#new-header]] and [[file-b#new-header]] and ![[file-b#new-header]].',
    }));

  });

  describe('shared', () => {

    it('no match passthrough', () => {
      const mkdn: string = 'There are no matching headers here [[filename#other-header]].';
      const actlMkdn: string = wikirefs.rehead(oldHeader, newHeader, mkdn, { filename });
      assert.strictEqual(actlMkdn, mkdn);
    });

    it('escaped; wikilinks inside code blocks are not renamed', () => {
      const mkdn: string = '```\n[[filename#old-header]]\n```\nHere is some content.';
      const actlMkdn: string = wikirefs.rehead(oldHeader, newHeader, mkdn, { filename });
      assert.strictEqual(actlMkdn, mkdn);
    });

    it('escaped; wikiembeds inside code blocks are not renamed', () => {
      const mkdn: string = '```\n![[filename#old-header]]\n```\nHere is some content.';
      const actlMkdn: string = wikirefs.rehead(oldHeader, newHeader, mkdn, { filename });
      assert.strictEqual(actlMkdn, mkdn);
    });

  });

});
