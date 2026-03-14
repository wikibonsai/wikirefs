import assert from 'node:assert/strict';

import { slugify } from '../src/lib/util';

describe('slugify()', () => {

  it('lowercases', () => {
    assert.strictEqual(slugify('Header Text'), 'header-text');
  });

  it('trims whitespace', () => {
    assert.strictEqual(slugify('  Some Section  '), 'some-section');
  });

  it('replaces spaces with single dash', () => {
    assert.strictEqual(slugify('a b c'), 'a-b-c');
  });

  it('strips non-word characters except hyphen', () => {
    assert.strictEqual(slugify('foo & bar!'), 'foo-bar');
  });

  it('collapses multiple dashes', () => {
    assert.strictEqual(slugify('a---b'), 'a-b');
  });

  it('removes leading and trailing dashes', () => {
    assert.strictEqual(slugify('--hello--'), 'hello');
  });

  it('empty string returns empty string', () => {
    assert.strictEqual(slugify(''), '');
  });

  it('only whitespace returns empty string', () => {
    assert.strictEqual(slugify('   '), '');
  });

});
