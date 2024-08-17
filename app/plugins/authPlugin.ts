export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:beforeMount', () => {
    useAsyncData(async () => {
      const userStore = useUserStore()
      await userStore.getUser()

    })
  })
})
