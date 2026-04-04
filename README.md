# wikirefs

[![A WikiBonsai Project](https://img.shields.io/badge/%F0%9F%8E%8B-A%20WikiBonsai%20Project-brightgreen)](https://github.com/wikibonsai/wikibonsai)
[![NPM package](https://img.shields.io/npm/v/wikirefs)](https://npmjs.org/package/wikirefs)

<p align="center">
  <img src="./wikirefs.svg" width="300" height="300"/>
</p>

A collection of utilities to parse, process, and edit `[[wikirefs]]`.

🕸 Weave a semantic web in your [🎋 WikiBonsai](https://github.com/wikibonsai/wikibonsai) digital garden.

## Install

Install with [npm](https://docs.npmjs.com/cli/v9/commands/npm-install):

```
npm install wikirefs
```

## Use

```js
import * as wikirefs from 'wikirefs';

const { wikirefs: refs, filenames } = wikirefs.scan('[[wikilink]]');

// refs (grouped constructs):
// [{
//   kind: 'wikilink',
//   match: '[[wikilink]]',
//   start: 0,
//   filename: { text: 'wikilink', start: 2 },
// }]

// filenames (flat list):
// [{
//   filename: { text: 'wikilink', start: 2 },
//   kind: 'wikilink',
// }]
```

## Syntax

See [`./spec`](https://github.com/wikibonsai/wikirefs/tree/main/spec) for syntax spec (esp. the `README.md`).

## Function API

Function utilities for editting `[[wikirefs]]`.

See [`./src/lib/func`](https://github.com/wikibonsai/wikirefs/tree/main/src/lib/func/) for more on functions.

### `mkdnToWiki(content: string, opts?: ConvertOpts): string`

Convert `[markdown](links)` to `[[wikirefs]]` in a given `content` string.

```typescript
import { mkdnToWiki } from 'wikirefs';

const result: string | undefined = mkdnToWiki('[my note](my-note)');
// result = '[[my-note]]'

const labeled: string | undefined = mkdnToWiki('[label text](my-note)');
// labeled = '[[my-note|label text]]'
```

In the given `content` string conversions occur as shown below (file extensions are preserved for media):

| mkdn                       | [[wiki]]                      |
| -------------------------- | ----------------------------- |
| `[filename](url)`          | `[[filename]]`                |
| `[label](url)`             | `[[filename\|label]]`         |
| `[filename](url#header)`   | `[[filename#header]]`         |
| `[label](url#header)`      | `[[filename#header\|label]]`  |
| `![alt](img-url)`          | `![[filename]]`               |
| `![alt](img-url#header)`   | `![[filename#header]]`        |

*Filename is extracted from the URL based on the format option.*

Options:

`opts.kind: 'wikiref' | 'wikilink' | 'wikiembed'`: target specific wikiref constructs for conversion (`attr`s are implicitly included in `link`s).

`opts.format: 'filename' | 'relative' | 'absolute'`: how to format markdown link uris based on wikiref filenames: use a slugified filename, relative path, or absolute path of the file (paths rely on `uriToFnameHash` option to be provided).

`opts.uriToFnameHash: Record<string, string>`: a hash table explicitly defining what uri maps to what filename.

### `rename(oldFileName: string, newFileName: string, content: string, opts?): string`

For all references in a given `content` string which point to an `oldFileName` and rename them to the `newFileName`. Skips escaped instances (code spans, code fences, math) by default.

```typescript
import { rename } from 'wikirefs';

const content: string = 'See [[old-note]] for details.';
const result: string = rename('old-note', 'new-note', content);
// result = 'See [[new-note]] for details.'

// escaped wikirefs are skipped by default
const escaped: string = rename('old-note', 'new-note', 'see `[[old-note]]` in code.');
// escaped = 'see `[[old-note]]` in code.'  (unchanged)

// opt out of escape detection
const all: string = rename('old-note', 'new-note', 'see `[[old-note]]` in code.', { escape: false });
// all = 'see `[[new-note]]` in code.'  (renamed inside code span)
```

#### Alias

`renameFileName()` is an alias of `rename()`.

#### Parameters

##### `oldFileName: string`

The old filename string to be removed.

##### `newFileName: string`

The new filename string to be added.

##### `content: string`

The content string to make the file rename.

##### `opts.escape: boolean` (optional, default `true`)

If `true`, skip wikirefs inside code spans, code fences, code blocks (4+ spaces), and math spans/fences. Set to `false` to process all wikirefs regardless of context.

### `rehead(oldHeader: string, newHeader: string, content: string, opts?): string`

For all **header level** references (the `#...` part) in a given `content` string which match the `oldHeader`, rename them to the `newHeader`. Skips escaped instances by default.

If `opts.filename` is provided, only header fragments in wikilinks matching that filename are renamed (scoped). Otherwise, header fragments are renamed across all filenames (global).

```typescript
import { rehead } from 'wikirefs';

const content: string = 'See [[note#old-header]] for details.';
const result: string = rehead('old-header', 'new-header', content);
// result = 'See [[note#new-header]] for details.'

// scoped to a specific filename
const scoped: string = rehead('old-header', 'new-header', content, { filename: 'note' });
// scoped = 'See [[note#new-header]] for details.'
```

#### Alias

`renameHeader()` is an alias of `rehead()`.

#### Parameters

##### `oldHeader: string`

The old header string to be removed.

##### `newHeader: string`

The new header string to be added.

##### `content: string`

The content string to make the header rename.

##### `opts.filename: string` (optional)

If provided, only rename headers in wikilinks matching this filename.

##### `opts.escape: boolean` (optional, default `true`)

If `true`, skip wikirefs inside escaped markdown contexts. Set to `false` to process all wikirefs.

### `retypeRefType(oldRefType: string, newRefType: string, content: string, opts?): string`

For all reference types in a given `content` string which match the given `oldRefType`, rename them to `newRefType`. Skips escaped instances by default.

Since 'reftypes' contain 'attrtypes' (wikiattr) and 'linktypes' (wikilink), this function will preform the operations of both `retypeAttrType()` and `retypeLinkType()` below.

```typescript
import { retypeRefType } from 'wikirefs';

const content: string = ':old-type::[[note]]\n:old-type::[[link]]';
const result: string = retypeRefType('old-type', 'new-type', content);
// result = ':new-type::[[note]]\n:new-type::[[link]]'
```

#### Parameters

##### `oldRefType: string`

The old reftype string to be removed.

##### `newRefType: string`

The new reftype string to be added.

##### `content: string`

The content string to make the retype (rename).

##### `opts.escape: boolean` (optional, default `true`)

If `true`, skip wikirefs inside escaped markdown contexts. Set to `false` to process all wikirefs.

### `retypeAttrType(oldAttrType: string, newAttrType: string, content: string, opts?): string`

For all attribute types in a given `content` string which match the given `oldAttrType`, rename them to `newAttrType`. Skips escaped instances by default.

```typescript
import { retypeAttrType } from 'wikirefs';

const content: string = ':old-attr::[[note]]';
const result: string = retypeAttrType('old-attr', 'new-attr', content);
// result = ':new-attr::[[note]]'
```

#### Parameters

##### `oldAttrType: string`

The old attrtype string to be removed.

##### `newAttrType: string`

The new attrtype string to be added.

##### `content: string`

The content string to make the retype (rename).

##### `opts.escape: boolean` (optional, default `true`)

If `true`, skip wikirefs inside escaped markdown contexts. Set to `false` to process all wikirefs.

### `retypeLinkType(oldLinkType: string, newLinkType: string, content: string, opts?): string`

For all link types in a given `content` string which match the given `oldLinkType`, rename them to be `newLinkType`. Skips escaped instances by default.

```typescript
import { retypeLinkType } from 'wikirefs';

const content: string = ':old-link::[[note]]';
const result: string = retypeLinkType('old-link', 'new-link', content);
// result = ':new-link::[[note]]'
```

#### Parameters

##### `oldLinkType: string`

The old linktype string to be removed.

##### `newLinkType: string`

The new linktype string to be added.

##### `content: string`

The content string to make the retype (rename).

##### `opts.escape: boolean` (optional, default `true`)

If `true`, skip wikirefs inside escaped markdown contexts. Set to `false` to process all wikirefs.

### `scan(content: string, opts?: ScanOpts): ScanResult`

Scan a given `content` string and return all valid wikiref constructs. Returns a `ScanResult` with two views of the same data:

- **`wikirefs`**: Grouped constructs in source order — one entry per syntactic construct (attr block, link, embed). Use for display, rendering attr boxes, tree views.
- **`filenames`**: Flat list in source order — one entry per referenced filename (attr blocks with multiple filenames are exploded). Use for syntax highlighting, link validation, rename propagation.

```typescript
import { scan } from 'wikirefs';
import type { ScanResult, ScanRef, ScannedFileName } from 'wikirefs';

const result: ScanResult = scan(':attr::[[note-a]]\nSee [[note-b]] for details.');

// grouped constructs
for (const ref of result.wikirefs) {
  if (ref.kind === 'wikiattr') {
    ref.type.text       // 'attr'
    ref.filenames[0].text // 'note-a'
  }
  if (ref.kind === 'wikilink') {
    ref.filename.text   // 'note-b'
    ref.header?.text    // undefined (no header)
  }
}

// flat filenames
for (const f of result.filenames) {
  f.filename.text  // 'note-a', then 'note-b'
  f.kind           // 'wikiattr', then 'wikilink'
}

// filter by kind
const { wikirefs } = scan('[[note-a]]\n![[image.png]]', { kind: 'wikilink' });
// wikirefs = [{ kind: 'wikilink', ... }]  // embed excluded
```

#### Types

The `ScanTxt` atom holds a text value and its position in the content string:

```typescript
interface ScanTxt {
  text: string;
  start: number;
}
```

Grouped construct types:

```typescript
interface ScanAttr {
  kind: 'wikiattr';
  match: string;                          // full matched text
  start: number;                          // offset in content
  type: ScanTxt;                          // attrtype name + position
  filenames: ScanTxt[];                   // all [[wikilink]] targets
  listFormat: 'comma' | 'mkdn' | 'none'; // list format
}

interface ScanLink {
  kind: 'wikilink';
  match: string;
  start: number;
  type?: ScanTxt;       // linktype (undefined if untyped)
  filename: ScanTxt;
  header?: ScanTxt;     // undefined if no header
  label?: ScanTxt;      // undefined if no label
}

interface ScanEmbed {
  kind: 'wikiembed';
  match: string;
  start: number;
  filename: ScanTxt;
  header?: ScanTxt;     // undefined if no header
  media: string;        // 'markdown' | 'image' | 'audio' | 'video' | ...
}

type ScanRef = ScanAttr | ScanLink | ScanEmbed;
```

Flat filename type:

```typescript
interface ScannedFileName {
  filename: ScanTxt;
  kind: 'wikiattr' | 'wikilink' | 'wikiembed';
  type?: ScanTxt;
  header?: ScanTxt;
  label?: ScanTxt;
  media?: string;
  listFormat?: 'comma' | 'mkdn' | 'none';
}
```

#### Options

`opts.filename: string`: a specific filename to be targetted -- non-target-filename wiki constructs will be ignored.

`opts.kind: string`: specific kinds of wiki constructs may be targetted; valid options are `'wikiattr'`, `'wikilink'`, and `'wikiembed'`.

`opts.skipEsc: boolean`: whether or not to skip escaped wiki construct instances; set to `true` by default.

### `wikiToMkdn(content: string, opts?: ConvertOpts): string`

Convert `[[wikirefs]]` to `[markdown](links)` in a given `content` string.

```typescript
import { wikiToMkdn } from 'wikirefs';

const result: string | undefined = wikiToMkdn('See [[my-note]] for details.');
// result = 'See [my-note](my-note) for details.'

const withHash: string | undefined = wikiToMkdn('See [[my-note|custom label]].');
// withHash = 'See [custom label](my-note).'
```

In the given `content` string conversions occur as shown below (File extensions are preserved for media):

| [[wiki]]                    | mkdn                      |
| --------------------------- | ------------------------- |
| `[[filename]]`              | `[filename](url)`         |
| `[[filename\|label]]`       | `[label](url)`            |
| `[[filename#header]]`       | `[filename](url#header)`  |
| `[[filename#header\|label]]`| `[label](url#header)`     |
| `![[filename]]`             | `![](url)`                |

Options:

`opts.kind: 'wikiref' | 'wikilink' | 'wikiembed'`: target specific wikiref constructs for conversion (`attr`s are implicitly included in `link`s).

`opts.format: 'filename' | 'relative' | 'absolute'`: how to format markdown link uris based on wikiref filenames: use a slugified filename, relative path, or absolute path of the file.

`opts.ext: boolean`: whether or not to include file extension in uri.

`opts.fnameToUriHash: Record<string, string>`: a hash table explicitly defining what filename maps to what uri.

### `slugify(text: string): string`

Normalize a string into a URL-safe slug (e.g. for filenames or header fragments). Lowercases, trims, replaces spaces with `-`, strips non-word characters except hyphen, and collapses multiple dashes.

```typescript
import { slugify } from 'wikirefs';

const slug: string = slugify('File Name');         // 'file-name'
const trimmed: string = slugify('Header Text ');   // 'header-text'
const cleaned: string = slugify('  Some Section  '); // 'some-section'
```

### `getHeaderSection(content: string, headerRef: string): string | undefined`

Extract the markdown section for a given header, for embed rendering. The section runs from the end of the matching header line until the next header of the same or higher level, or end of content. Supports both ATX (`#`–`######`) and setext (underlined) headers. Returns the section markdown (after the header line), or `undefined` if no matching header.

#### Parameters

##### `content: string`

The full markdown document to search.

##### `headerRef: string`

The header identifier, either as id/slug (e.g. `header-text`) or raw text (e.g. `Header Text`).

```typescript
import { getHeaderSection } from 'wikirefs';

const md: string = 'Here is some content.\n\n## Header Text\n\nHeader content.\n';
const section: string | undefined = getHeaderSection(md, 'header-text');
// section = 'Header content.'
const byText: string | undefined = getHeaderSection(md, 'Header Text');
// byText = 'Header content.'
const missing: string | undefined = getHeaderSection(md, 'missing');
// missing = undefined
```

### Regex API

Regex utilities for extracting wiki constructs from strings. All regexes are case insensitive and the `g` option may be added to find all instances of a wiki construct.

See [`regex.ts`](https://github.com/wikibonsai/wikirefs/blob/main/src/lib/var/regex.ts) for more regex utilities.

### `RGX.WIKI.ATTR(content: string): MatchAttr[]`

A function that scans content and returns structured results for all wikiattr blocks, with filenames extracted in a single call (no two-pass needed). Uses sticky (`y`-flag) regexes internally — JS's equivalent of Ruby's `\G` anchor.

```typescript
import * as wikirefs from 'wikirefs';
import type { MatchAttr } from 'wikirefs';

// comma-separated
const results: MatchAttr[] = wikirefs.RGX.WIKI.ATTR(':attrtype::[[fname-a]], [[fname-b]]\n');
// results[0].type         = ['attrtype', 1]
// results[0].filenames    = [['fname-a', 13], ['fname-b', 26]]
// results[0].listFormat   = 'comma'

// mkdn-list
const mkdnResults: MatchAttr[] = wikirefs.RGX.WIKI.ATTR(
  ':attrtype::\n'
  + '- [[fname-a]]\n'
  + '- [[fname-b]]\n',
);
// mkdnResults[0].filenames = [['fname-a', 16], ['fname-b', 32]]
// mkdnResults[0].listFormat = 'mkdn'
```

The raw block-detection regex is available as `RGX.WIKI._ATTR` for find-and-replace use cases (e.g. `retypeAttrType`).

### `RGX.WIKI.LINK`

Note: The wikilink regex results will include single wikiattr constructs that match successfully. To see if the result is actually a wikiattr, check that the match is followed by a newline.

```js
import * as wikirefs from 'wikirefs';

const match = wikirefs.RGX.WIKI.LINK.exec(':linktype::[[wikilink#header|label]]');

const matchText    : string = match[0]; // ':linktype::[[wikilink#header|label]]'
const linkTypeText : string = match[1]; // 'linktype'
const fileNameText : string = match[2]; // 'wikilink'
const headerText   : string = match[3]; // 'header'
const labelText    : string = match[4]; // 'label'
```

### `RGX.WIKI.EMBED`

```js
import * as wikirefs from 'wikirefs';

const match = wikirefs.RGX.WIKI.EMBED.exec('![[filename#header]]');

const matchText    : string = match[0]; // '![[filename]]'
const fileNameText : string = match[1]; // 'filename'
const headerText   : string = match[2]; // 'header-text'
```

## A Note On Terminology

```
'wikitext'  : refers to the characters in a wikilink
              that describe the link.
'wikistring': refers to all characters in a wikilink,
              which includes the wikitext and the 
              special characters of the wikilink.

 'wikitext'
      👇
  • <--> •
[[wikilink]]
• <------> •
      👆
'wikistring'


      'wikitext'
    👇          👇
 • <-> •    • <--> •
:reftype::[[wikilink]]
• <----------------> •
          👆
      'wikistring'
```