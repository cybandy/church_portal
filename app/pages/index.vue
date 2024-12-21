<script lang="ts" setup>
import type { UiHymnResponse } from '~/types';

// api - custom $fetch
// const { $api } = useNuxtApp()

// search query
const q = ref('')

const hymn_ind = ref(0)
// const hymn_hymn = ref([] as UiHymnResponse[][])
const hymnals = ref([] as UiHymnResponse[])

const limit = ref(30)
const offset = ref(0)
const count = ref(0)
const loading = ref(false) // track loading hymns

const queryParams = computed(() => {
  return {
    limit: limit.value,
    offset: offset.value * limit.value
  }
})

// list function
const listHymnFunc = async (update = false) => {
  hymn_ind.value = 0
  loading.value = true
  const { hymns, count: _count } = await $fetch('/api/hymn/list', {
    query: {
      ...queryParams.value
    }
  })

  if (hymns) {
    if (update) {
      hymnals.value = hymns as any
    }
    else {
      hymnals.value.push(...hymns as any)
    }
    count.value = Number(_count)
  }
  loading.value = false
}

watch(q, async () => {
  if (!q.value) {
    offset.value = 0
    count.value = 0
    await listHymnFunc(true)
  }
})

const loadMore = computed(() => {
  return !loading.value && queryParams.value.offset < count.value
})

// scrolling
const scrollDown = async () => {
  if (!q.value) {
    offset.value++
    await listHymnFunc()
  }
}

await listHymnFunc()

// seo
defineOgImageComponent('Nuxt', {
  title: 'PraisePortal',
  description: 'Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name. Psalm 100:4'
})
</script>

<template>
  <UContainer class="flex items-center justify-center pt-[30px] h-[calc(100vh-66px)] md:h-[calc(100vh-80px)] overflow-y-hidden">
    <HymnListing
      v-model:q="q"
      v-model:hymnals="hymnals"
      :count="count"
      :load-more="loadMore"
      @scroll="scrollDown"
    />
  </UContainer>
</template>

<style scoped></style>