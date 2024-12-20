<script lang="ts" setup>
import { upperFirst } from 'es-toolkit';

const route = useRoute()
const number = route.params.number as string
const { t } = useI18n()
const { data } = await useFetch('/api/hymn/retrieve', {
  method: 'get',
  query: {
    number
  }
})
const hymnStore = useHymnStore()
const { selected_languages } = storeToRefs(hymnStore)

const mp3_url = computed(() => {
  return data.value?.data[0]?.mp3
})

const fullScreenEl = ref<HTMLElement | null>(null)
const { isFullscreen, toggle } = useFullscreen(fullScreenEl)

const isMobile = useNuxtApp().$isMobile

watch(isMobile, () => {
  if (selected_languages.value.length > 0) {
    if (isMobile.value) {
      selected_languages.value = [selected_languages.value[0] as string]
    }
  }
})

const { isOutside } = useMouseInElement(fullScreenEl)

// seo
useHead({
  title: upperFirst(`${t('hymn')} #${number}`)
})
</script>

<template>
  <div>
    <div v-if="!data?.data">
      <div class="w-full min-h-[400px] grid place-content-center">
        <p>Hymn {{ number }} was not found</p>
      </div>
    </div>

    <div v-else>
      <UContainer>
        <div class="py-5 sm:py-7 md:py-8 lg:py-10 flex gap-6 items-center ">
          <div class="flex items-center text-center flex-grow">
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-semibold w-full">
              {{ number }} - {{ data?.data[0]?.title }}
            </h1>
          </div>
          <div class="flex items-center justify-center lg:justify-end gap-3">
            <!-- <UDropdown :items="all_languages" :popper="{placement:'bottom-start'}" :ui="{item:{label:'first-letter:uppercase'}}">
              <UIcon name="i-heroicons-language" class="header-icons cursor-pointer" />
            </UDropdown> -->
            <!-- <HymnSearch /> -->
            <UTooltip :text="$t('music_player')">
              <MusicPlayerPopover
                v-if="typeof mp3_url == 'string'"
                :url="mp3_url"
              />
            </UTooltip>
            <UTooltip :text="$t('fullscreen')">
              <UIcon
                dynamic
                name="material-symbols:fullscreen"
                class="header-icons cursor-pointer"
                @click="toggle"
              />
            </UTooltip>
          </div>
        </div>
      </UContainer>

      <UContainer>
        <div
          ref="fullScreenEl"
          class="relative"
        >
          <UButton
            v-show="isFullscreen && !isOutside"
            icon="i-heroicons-x-mark-20-solid"
            color="gray"
            class="absolute top-1 right-3"
            @click="toggle"
          />
          <HymnNumberView
            :hymns="(data.data as any)"
            :is-full-screen="isFullscreen"
          />
        </div>
      </UContainer>
    </div>
  </div>
</template>

<style scoped></style>