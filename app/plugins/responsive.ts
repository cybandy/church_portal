export default defineNuxtPlugin((nuxtApp) => {
  const isMobile = computed(() => {
    if (import.meta.server) {
      return useDevice().isMobileOrTablet
    }
    else {
      const { width } = useWindowSize()
      return width.value < 640
    }
  })

  return {
    provide: {
      isMobile
    }
  }
})
