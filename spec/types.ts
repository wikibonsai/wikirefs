export interface TestFileData {
  filename: string;
  href?: string;
  title?: string;
  content?: string;
  media?: string;
}

export interface WikiRefTestCase {
  descr: string;    // test description
  error?: boolean;  // test reflects an error state
  opts?: any;       // options
  mkdn: string;     // markdown input
  html: string;     // html output
}
