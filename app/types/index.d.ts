import type { Hymn } from "~~/server/database/types";

export interface UiHymnResponse extends Omit<Hymn, 'hymnSearch' | 'createdAt' | 'id'> {
  language: Array<string>
}