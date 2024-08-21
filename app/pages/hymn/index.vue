<script lang="ts" setup>
import type { UiHymnResponse } from '~/types';
import { useI18nLink } from '#imports';

// api - custom $fetch
const { $api } = useNuxtApp()

// search query
const q = ref('')

const hymnals = ref([] as UiHymnResponse[])

// search function
const searchFunc = async () => {
  if (!q.value || q.value == '') {
    await listHymnFunc()
    return
  }
  const { hymns } = await $fetch('/api/hymn/search', {
    method: 'GET',
    query: {
      q: q.value
    }
  })
  if (hymns) {
    hymnals.value = hymns as any
  }

}

// list function
const listHymnFunc = async () => {
  const { hymns } = await $fetch('/api/hymn/list')
  if (hymns) {
    hymnals.value = hymns as any
  }
}

await listHymnFunc()

watch(q, async () => {
  await searchFunc()
})


//ui
const button_ui = {font:'first-letter:capitalize'}
</script>

<template>
  <UContainer class="flex items-center justify-center pt-[60px]">
    <HymnListing v-model:q="q" v-model:hymnals="hymnals" @search="searchFunc" />
  </UContainer>
</template>

<style scoped></style>