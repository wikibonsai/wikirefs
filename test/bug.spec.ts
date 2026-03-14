// tests that reproduce bugs that were found

import assert from 'node:assert/strict';

import * as wikirefs from '../src';


const oldFileName: string = 'name-space-link';
const newFileName: string = 'wikilink';

describe('jekyll bug', () => {

  describe('renameFileName()', () => {

    const testRenameFileName = (params: any) => () => {
      const mkdn: string = params.mkdn;
      const expdMkdn: string = params.expdMkdn;
      const actlMkdn: string = wikirefs.renameFileName(oldFileName, newFileName, mkdn);
      assert.strictEqual(actlMkdn, expdMkdn);
    };

    describe('error', () => {

      // not sure what the precise reason was for this error...
      // but the actual text is close to what an actual jekyll blog caught
      it('jekyll bug', testRenameFileName({
        mkdn: '\n'
        + 'name-space-reftype::[[name-space-link]]\n'
        + '\n'
        + 'The [[name-space-link]] functionality is provided by the jekyll-wikilinks plugin. See the [docs](https://github.com/wikibonsai/jekyll-wikirefs) for more details.\n',
        expdMkdn: '\n'
        + 'name-space-reftype::[[wikilink]]\n'
        + '\n'
        + 'The [[wikilink]] functionality is provided by the jekyll-wikilinks plugin. See the [docs](https://github.com/wikibonsai/jekyll-wikirefs) for more details.\n',
      }));

    });

  });

});
