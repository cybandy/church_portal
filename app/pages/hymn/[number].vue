<script lang="ts" setup>

const route = useRoute()
const number = route.params.number as string

const { data, error, pending } = await useFetch('/api/hymn/retrieve', {
  method: 'get',
  query: {
    number
  }
})
const hymnStore = useHymnStore()
const { selected_languages, languages } = storeToRefs(hymnStore)
const all_languages = computed(() => {
  const availHymnLanguage = data.value?.data.map(x => x.language as string)
  const sel_langs = availHymnLanguage?.filter(x => languages.value.includes(x as any)) as string[]
  return [sel_langs?.map(x=>{return {label:x}})]
})

const mp3_url = computed(() => {
  return data.value?.data[0]?.mp3
})

const fullScreenEl = ref<HTMLElement | null>(null)
const { isFullscreen, enter, exit, toggle } = useFullscreen(fullScreenEl)

const isMobile = useNuxtApp().$isMobile

watch(isMobile, () => {
  if (selected_languages.value.length > 0) {
    if (isMobile.value) {
      selected_languages.value = [selected_languages.value[0] as string]
    }
  }
})

const {isOutside} = useMouseInElement(fullScreenEl)


// seo
useHead({
  title: `Hymn #${number}`
})
</script>

<template>
  <div>
    <div v-if="!data?.data">
      no results
    </div>

    <div v-else>
      <UContainer>
        <div class="py-5 sm:py-7 md:py-8 lg:py-10 grid lg:grid-cols-3 gap-6 items-center ">
          <div class="hidden lg:block">

          </div>
          <div class="flex items-center text-center">
            <h1 class="text-xl md:text-2xl font-semibold w-full">
              {{ number }} - {{ data?.data[0]?.title }}
            </h1>
          </div>
          <div class="flex items-center justify-center lg:justify-end gap-3">
            <UDropdown :items="all_languages" :popper="{placement:'bottom-start'}" :ui="{item:{label:'first-letter:uppercase'}}">
              <UIcon name="i-heroicons-language" class="header-icons cursor-pointer" />
            </UDropdown>
            <!-- <HymnSearch /> -->
            <MusicPlayer v-if="typeof mp3_url == 'string'" :url="mp3_url" />
            <UIcon @click="toggle" dynamic name="material-symbols:fullscreen" class="header-icons cursor-pointer" />
          </div>
        </div>
      </UContainer>

      <UContainer>
        <div ref="fullScreenEl" class="relative">
          <UButton v-show="isFullscreen && !isOutside" @click="toggle" icon="i-heroicons-x-mark-20-solid" color="gray" class="absolute top-1 right-3" />
          <HymnNumberView  :hymns="(data.data as any)" :is-full-screen="isFullscreen" />
        </div>
        

      </UContainer>
    </div>
  </div>
</template>

<style scoped></style>