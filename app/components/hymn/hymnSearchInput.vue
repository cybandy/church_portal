<script setup lang='ts'>
import { sortBy } from 'es-toolkit';
import type { UiHymnResponse } from '~/types';

const { search, result } = useAlgoliaSearch('hymns')

const props = defineProps({
  modelValue: String,
  res: {
    type: Array<UiHymnResponse>,
    default: []
  },
  count: Number
})

const emits = defineEmits(['update:modelValue', 'search'])
const q = computed({
  get:()=>props.modelValue,
  set:(val)=>emits('update:modelValue', val)
})

watch(q, async () => {
  if (q.value) {
    await search({ query: q.value })
    // modelValue.value = result.value.hits as any
    const _d = result.value.hits.map((x: any) => {
      return {
        number: x.number,
        title: x.title,
        language: x.language,
        author: x.author,
        mp3:x.mp3
      }
    })
    emits('search',[sortBy(_d,['number']),result.value.nbHits])
  } else {
    emits('search')
  }
})

function clear() {
  q.value = ''
}
</script>

<template>
  <div class="">
    <UInput v-model="q" size="md" icon="i-heroicons-magnifying-glass-20-solid" color="white" placeholder="Search..."
      autocomplete="off" :ui="{ icon: { trailing: { pointer: '' } } }">
      <template #trailing>
        <UButton v-if="q !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
          @click="clear" />
        <UButton v-else color="gray" variant="ghost" icon="ic:round-subdirectory-arrow-left" :padded="false" />
      </template>
    </UInput>

  </div>
</template>