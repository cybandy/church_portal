export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    onRequest({ options, }) {
      const { userToken } = storeToRefs(useUserStore())
      if (userToken.value) {
        const headers = options.headers ||= {}
        if (Array.isArray(headers)) {
          headers.push(
            ['Authorization', `Bearer ${userToken.value}`]
          )
        }
        else if (headers instanceof Headers) {
          headers.set(`Authorization`, `Bearer ${userToken.value}`)
        }
        else {
          headers.Authorization = `Bearer ${userToken.value}`
        }
      }
    },
    async onRequestError({ response }) {
      if (response?.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/auth'))
      }
    }
  })

  return {
    provide: {
      api
    }
  }
})