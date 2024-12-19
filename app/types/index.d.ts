import type { Hymn } from "~~/server/database/types";
import '@nuxtjs/algolia'

export interface UiHymnResponse extends Omit<Hymn, 'hymnSearch' | 'createdAt' | 'id'> {
  language: Array<string>
}

export type UiHymnPage = Omit<Hymn, 'hymnSearch' | 'createdAt' | 'id'> & {
  stanzas: Array<{
    number: number,
    verse: string,
    is_refrain: boolean
  }>
}

// types.d.ts


export declare module '@nuxtjs/algolia' {
  interface AlgoliaIndices {
    hymns: {
      title: string;
      number: string;
      author: string;
      mp3: string;
      language: Array<string>;
      stanzas: string;
    }
  }
}
