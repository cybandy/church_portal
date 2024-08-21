import type { Hymn } from "~~/server/database/types";

export interface UiHymnResponse extends Omit<Hymn, 'hymnSearch' | 'createdAt' | 'id'> {
  language: Array<string>
}

export type UiHymnPage = UiHymnResponse & {
  stanzas: Array<{
    number: number,
    verse: string,
    is_refrain:boolean
  }>
}