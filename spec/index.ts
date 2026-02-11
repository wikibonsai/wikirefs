// import

import type { WikiRefTestCase } from './types';

import { wikiAttrUnprefixedCases } from './cases/wikiattr-unprefixed';
import { wikiAttrPrefixedCases } from './cases/wikiattr-prefixed';
import { wikiAttrMixedCases } from './cases/wikiattr-mixed';

import { wikiLinkTypedCases } from './cases/wikilink-typed';
import { wikiLinkUntypedCases } from './cases/wikilink-untyped';
import { wikiLinkMixedCases } from './cases/wikilink-mixed';

import { wikiEmbedCases } from './cases/wikiembed';


// test cases

// vars

/* eslint-disable indent */
const wikiAttrCases : WikiRefTestCase[] = ([] as WikiRefTestCase[]).concat(wikiAttrUnprefixedCases)
                                                                   .concat(wikiAttrPrefixedCases)
                                                                   .concat(wikiAttrMixedCases);
const wikiLinkCases : WikiRefTestCase[] = ([] as WikiRefTestCase[]).concat(wikiLinkTypedCases)
                                                                   .concat(wikiLinkUntypedCases)
                                                                   .concat(wikiLinkMixedCases);
// const wikiEmbedCases: WikiRefTestCase[] = wikiEmbedCases;
const wikiRefCases  : WikiRefTestCase[] = ([] as WikiRefTestCase[]).concat(wikiAttrCases)
                                                                   .concat(wikiLinkCases)
                                                                   .concat(wikiEmbedCases);
/* eslint-enable indent */

// export

// test data

export { fileDataMap } from './data';

// test cases

export { wikiAttrUnprefixedCases } from './cases/wikiattr-unprefixed';
export { wikiAttrPrefixedCases } from './cases/wikiattr-prefixed';
export { wikiAttrMixedCases } from './cases/wikiattr-mixed';

export { wikiLinkTypedCases } from './cases/wikilink-typed';
export { wikiLinkUntypedCases } from './cases/wikilink-untyped';
export { wikiLinkMixedCases } from './cases/wikilink-mixed';

export { wikiRefCases, wikiAttrCases, wikiLinkCases, wikiEmbedCases };

// types

export type { WikiRefTestCase, TestFileData } from './types';
