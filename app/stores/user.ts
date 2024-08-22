import { defineStore } from 'pinia'
import type { Member } from '~~/server/database/types'

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => ({
    user: {} as Member,
    userToken: '',
    tab: 0
  }),
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: true
    }),
    paths: ['userToken', 'tab']
  },
  getters: {
    isLoggedIn: (state) => state.user.id ? true : false
  },
  actions: {
    async login(email: string, password: string) {
      const d = await $fetch('/api/auth/login', {
        body: {
          email, password
        },
        method: 'POST'
      })
      if (!d) return
      this.userToken = d
      await this.getUser()
      navigateTo(useI18nLink('/'))
    },

    async register(first_name: string, last_name: string, email: string, password: string) {
      try {
        const d = await $fetch('/api/auth/register', {
          body: {
            first_name, last_name, email, password
          },
          method: 'POST',
          onResponseError({ response }) {

            useToast().add({
              color: 'red',
              timeout: 6000,
              description: response._data.message
            })
          }
        })
        if (d) {
          this.userToken = d
          await this.getUser()
          navigateTo(useI18nLink('/'))
        }
      } catch (error: any) {
      }

    },

    async getUser() {
      if (this.userToken.length == 0) return
      const { $api } = useNuxtApp()
      const d = await $api('/api/user')
      if (d) {
        this.user = d as any
      }
    }
  },

})
