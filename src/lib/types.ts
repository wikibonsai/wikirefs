export interface wikiattr {
  kind: 'wikiattr';
  index: number;
  doctype: string;
  attrtype: string;
  filenames: string;
}

export interface wikilink {
  kind: 'wikilink';
  index: number;
  doctype: string;
  linktype: string;
  filename: string;
  // header: string;
  // block: string;
  label: string;
}

export interface wikiembed {
  kind: 'wikiembed';
  doctype?: string; // only for mkdn
  filename: string;
  media: string;
}

// export interface WikiAttrData extends AttrDataItem {
//   type: 'wikilink';
//   doctype: string;
//   filename: string;
//   htmlHref: string;
//   htmlText: string;
//   baseUrl: string; // this is so remark-caml plugins can rebuild baseUrl + href
// }

// export type WikiLinkData = {
//   doctype: string;
//   filename: string;
//   // header: string;
//   // block: string;
//   linktype: string;
//   label: string | undefined;
// }