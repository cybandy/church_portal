<script setup lang="ts">
import { useI18nLink } from '#imports';
import type { UiHymnResponse } from '~/types';
const isOpen = ref(false)

// search query
const q = ref('')

const hymnals = ref([] as UiHymnResponse[])

// search function
const searchFunc = async () => {
  if (!q.value || q.value == '') {
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

watch(q, async () => {
  await searchFunc()
})
</script>

<template>
  <div>
    <UIcon class="w-6 h-6 cursor-pointer" name="i-heroicons-magnifying-glass" @click="isOpen = true" />

    <UModal v-model="isOpen">
      <HymnListing v-model:q="q" v-model:hymnals="hymnals" @search="searchFunc" />
  
    </UModal>
  </div>
</template>

