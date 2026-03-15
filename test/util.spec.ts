import assert from 'node:assert/strict';

import { getHeaderSection, slugify } from '../src';

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

describe('getHeaderSection()', () => {
  const content: string = 'Here is some content.\n\n## Header Text\n\nHeader content.\n';

  it('returns section by id (kebab-case)', () => {
    assert.strictEqual(getHeaderSection(content, 'header-text'), 'Header content.');
  });

  it('returns section by raw header text', () => {
    assert.strictEqual(getHeaderSection(content, 'Header Text'), 'Header content.');
  });

  it('returns undefined when header not found', () => {
    assert.strictEqual(getHeaderSection(content, 'nonexistent'), undefined);
  });

  it('stops at next header of same level', () => {
    const md: string = '## A\n\none.\n\n## B\n\ntwo.';
    assert.strictEqual(getHeaderSection(md, 'a'), 'one.');
    assert.strictEqual(getHeaderSection(md, 'b'), 'two.');
  });

  it('stops at next header of higher level (lower number)', () => {
    const md: string = '## Section\n\nbody.\n\n# Top';
    assert.strictEqual(getHeaderSection(md, 'section'), 'body.');
  });

  it('includes content until end when no following same-or-higher header', () => {
    const md: string = '## Only\n\nonly body.';
    assert.strictEqual(getHeaderSection(md, 'only'), 'only body.');
  });

  it('returns undefined for empty headerRef', () => {
    assert.strictEqual(getHeaderSection(content, ''), undefined);
  });

  describe('header levels', () => {

    it('extracts section for h1', () => {
      const md: string = '# One\n\nbody one.\n\n# End\n\nend.';
      assert.strictEqual(getHeaderSection(md, 'one'), 'body one.');
      assert.strictEqual(getHeaderSection(md, 'end'), 'end.');
    });

    // All ATX levels with a top-level stopper so each section is bounded
    const allLevels: string =
      '# One\n\nbody one.\n\n'
      + '## Two\n\nbody two.\n\n'
      + '### Three\n\nbody three.\n\n'
      + '#### Four\n\nbody four.\n\n'
      + '##### Five\n\nbody five.\n\n'
      + '###### Six\n\nbody six.\n\n'
      + '# End\n\nend.';

    it('extracts section for h2', () => {
      assert.strictEqual(getHeaderSection(allLevels, 'two'), 'body two.\n\n### Three\n\nbody three.\n\n#### Four\n\nbody four.\n\n##### Five\n\nbody five.\n\n###### Six\n\nbody six.');
    });

    it('extracts section for h3', () => {
      assert.strictEqual(getHeaderSection(allLevels, 'three'), 'body three.\n\n#### Four\n\nbody four.\n\n##### Five\n\nbody five.\n\n###### Six\n\nbody six.');
    });

    it('extracts section for h4', () => {
      assert.strictEqual(getHeaderSection(allLevels, 'four'), 'body four.\n\n##### Five\n\nbody five.\n\n###### Six\n\nbody six.');
    });

    it('extracts section for h5', () => {
      assert.strictEqual(getHeaderSection(allLevels, 'five'), 'body five.\n\n###### Six\n\nbody six.');
    });

    it('extracts section for h6', () => {
      assert.strictEqual(getHeaderSection(allLevels, 'six'), 'body six.');
    });

    it('extracts section for trailing h1 stopper in multi-level doc', () => {
      assert.strictEqual(getHeaderSection(allLevels, 'end'), 'end.');
    });

    it('stops at next same-level header (h3)', () => {
      const md: string = '### A\n\none.\n\n### B\n\ntwo.';
      assert.strictEqual(getHeaderSection(md, 'a'), 'one.');
      assert.strictEqual(getHeaderSection(md, 'b'), 'two.');
    });

    it('stops at higher-level header (h4 section before h2)', () => {
      const md: string = '#### Deep\n\ndeep body.\n\n## Upper\n\nupper body.';
      assert.strictEqual(getHeaderSection(md, 'deep'), 'deep body.');
      assert.strictEqual(getHeaderSection(md, 'upper'), 'upper body.');
    });

    it('includes nested subsections until same or higher level (h2 then h3s)', () => {
      const md: string = '## Main\n\nintro.\n\n### Sub A\n\nsub a.\n\n### Sub B\n\nsub b.\n\n## Next\n\nnext.';
      assert.strictEqual(getHeaderSection(md, 'main'), 'intro.\n\n### Sub A\n\nsub a.\n\n### Sub B\n\nsub b.');
      assert.strictEqual(getHeaderSection(md, 'sub-a'), 'sub a.');
      assert.strictEqual(getHeaderSection(md, 'sub-b'), 'sub b.');
      assert.strictEqual(getHeaderSection(md, 'next'), 'next.');
    });

    it('finds section by slug regardless of header level (h1–h6)', () => {
      const levels = [1, 2, 3, 4, 5, 6] as const;
      for (const level of levels) {
        const hashes = '#'.repeat(level);
        const md: string = `${hashes} Section Title\n\nbody for level ${level}.`;
        assert.strictEqual(getHeaderSection(md, 'section-title'), `body for level ${level}.`, `level ${level}`);
      }
    });

    it('finds section by raw header text regardless of header level (h1–h6)', () => {
      const levels = [1, 2, 3, 4, 5, 6] as const;
      for (const level of levels) {
        const hashes = '#'.repeat(level);
        const md: string = `${hashes} Section Title\n\nbody for level ${level}.`;
        assert.strictEqual(getHeaderSection(md, 'Section Title'), `body for level ${level}.`, `level ${level}`);
      }
    });

    it('finds section for setext h1 (=) by slug and raw text', () => {
      const md: string = 'Setext H1 Title\n==============\n\nbody for setext h1.';
      assert.strictEqual(getHeaderSection(md, 'setext-h1-title'), 'body for setext h1.');
      assert.strictEqual(getHeaderSection(md, 'Setext H1 Title'), 'body for setext h1.');
    });

    it('finds section for setext h2 (-) by slug and raw text', () => {
      const md: string = 'Setext H2 Title\n---------------\n\nbody for setext h2.';
      assert.strictEqual(getHeaderSection(md, 'setext-h2-title'), 'body for setext h2.');
      assert.strictEqual(getHeaderSection(md, 'Setext H2 Title'), 'body for setext h2.');
    });

    it('finds section for setext h1 with leading spaces on underline', () => {
      const md: string = 'Setext H1 Title\n  ==============\n\nbody for setext h1.';
      assert.strictEqual(getHeaderSection(md, 'setext-h1-title'), 'body for setext h1.');
    });

    it('finds section for setext h2 with leading spaces on underline', () => {
      const md: string = 'Setext H2 Title\n   ---------------\n\nbody for setext h2.';
      assert.strictEqual(getHeaderSection(md, 'setext-h2-title'), 'body for setext h2.');
    });

  });

});
