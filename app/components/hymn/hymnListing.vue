<script lang="js" setup>
import { useI18nLink } from '#imports';
import { useInfiniteScroll } from '@vueuse/core';

const props = defineProps({
  q: String,
  hymnals: {
    type: Array,
    default: []
  },
  count: Number,
  loadMore: Boolean
})
const emits = defineEmits([
  'update:q', 'update:hymnals', 'search', 'scroll', 'update:count', 'update:loadMore'
])

// search query
const q = computed({
  get: () => props.q,
  set: (val) => emits('update:q', val)
})
const count = computed({
  get: () => props.count,
  set: (val) => emits('update:count', val)
})

const hymnals = computed({
  get: () => props.hymnals,
  set: (val) => emits('update:hymnals', val)
})

const loadMore = computed({
  get: () => props.loadMore,
  set: (val) => emits('update:loadMore', val)
})

// search function
const searchFunc = (data) => {

  if (q.value) {
    hymnals.value = data[0]
    count.value = data[1]
  }
  loadMore.value = false
  emits('search')
}



const el = ref()
const { reset } = useInfiniteScroll(
  el,
  () => {
    // console.log('scrolling...')
    // if (!q.value && hymnals.value.length)
    emits('scroll')
  },
  {
    distance: 20,
    interval: 1000,
    canLoadMore:()=> loadMore.value
  }
)
</script>

<template>
  <div class="min-w-full sm:min-w-[500px] md:min-w-[650px] max-w-full sm:max-w-[550px] md:max-w-[650px] h-full">
    <UCard class="h-full" :ui="{body:{base:'h-full overflow-y-hidden'}}">
      <template #header>
        <slot name="cyHeader">
          <HymnSearchInput v-model="q" @search="searchFunc" />
        </slot>
      </template>

        <div ref="el"id="scrollContainer" class="space-y-5 h-full overflow-y-scroll scroll-smooth no-scrollbar">
          <HymnCard v-if="hymnals.length" v-for="hymn of hymnals" :hymn="hymn" :key="hymn.number" />
      </div>
    </UCard>
  </div>
</template>

<!-- <style scoped>
#scrollContainer{
  scrollbar-width: thin;
}
</style> -->