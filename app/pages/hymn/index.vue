<script lang="ts" setup>
import type { UiHymnResponse } from '~/types';
import { chunk } from 'es-toolkit';

// api - custom $fetch
const { $api } = useNuxtApp()

// search query
const q = ref('')

const hymn_ind = ref(0)
// const hymn_hymn = ref([] as UiHymnResponse[][])
const hymnals = ref([] as UiHymnResponse[])

const limit = ref(30)
const offset = ref(0)
const count = ref(0)

const queryParams = computed(() => {
  return {
    limit: limit.value,
  offset: offset.value * limit.value
  }
})

// search function
const searchFunc = async () => {
  if (!q.value || q.value == '') {
    await listHymnFunc()
    return
  }
  const { hymns } = await $fetch('/api/hymn/search', {
    method: 'GET',
    query: {
      q: q.value,
      ...queryParams.value
    }
  })
  hymn_ind.value = 0
  if (hymns) {
    hymnals.value.push(...hymns as any)
  }

}

// list function
const listHymnFunc = async () => {
  hymn_ind.value = 0
  const { hymns, count: _count } = await $fetch('/api/hymn/list', {
    query: {
      ...queryParams.value
    }
  })
  if (hymns) {
    hymnals.value.push(...hymns as any)
    count.value = _count
  }
}

const loadMore = computed(() => {
  return queryParams.value.offset < count.value
})


// scrolling
const scrollDown = () => {
  offset.value++
}

await listHymnFunc()

watch(hymnals, async () => {
  console.log(loadMore.value)
})

await useAsyncData('list_search', async () => { 
  await searchFunc()
}, {watch:[q,queryParams,], immediate:false})


//ui
const button_ui = {font:'first-letter:capitalize'}
</script>

<template>
  <UContainer class="flex items-center justify-center pt-[60px] h-full">
    <HymnListing @scroll="scrollDown" v-model:q="q" v-model:hymnals="hymnals" @search="searchFunc" :count="count" :load-more="loadMore" />
  </UContainer>
</template>

<style scoped></style>