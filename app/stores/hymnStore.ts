import { defineStore } from 'pinia'
import { hymnLanguagesEnum } from '~~/server/database/schema'

export const useHymnStore = defineStore({
  id: 'hymnStore',
  state: () => ({
    selected_languages: [] as string[],
    
  }),
  getters: {
    languages: (store) => hymnLanguagesEnum.enumValues
  },
  actions: {

  }
})
