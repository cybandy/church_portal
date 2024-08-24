<script lang="ts" setup>
import type { UiHymnResponse } from '~/types';
import { chunk } from 'es-toolkit';

// api - custom $fetch
const { $api } = useNuxtApp()

// search query
const q = ref('')

const hymn_ind = ref(0)
const hymn_hymn = ref([] as UiHymnResponse[][])
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
  hymn_ind.value = 0
  if (hymns) {
    hymn_hymn.value = chunk(hymns, 10) as any
    hymnals.value = hymn_hymn.value[0] as any
  }

}

// list function
const listHymnFunc = async () => {
  hymn_ind.value = 0
  const { hymns } = await $fetch('/api/hymn/list')
  if (hymns) {
    hymn_hymn.value = chunk(hymns, 10) as any
    hymnals.value = hymn_hymn.value[0] as any
  }
}

// scrolling
const scrollDown = () => {
  if(hymn_ind.value == hymn_hymn.value.length) return
  hymn_ind.value++
  hymnals.value.push(...hymn_hymn.value[hymn_ind.value] as any)
}

await listHymnFunc()

watch(q, async () => {
  await searchFunc()
})


//ui
const button_ui = {font:'first-letter:capitalize'}
</script>

<template>
  <UContainer class="flex items-center justify-center pt-[60px] h-full">
    <HymnListing @scroll="scrollDown" v-model:q="q" v-model:hymnals="hymnals" @search="searchFunc" />
  </UContainer>
</template>

<style scoped></style>