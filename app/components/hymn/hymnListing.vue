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

        <div ref="el"id="scrollContainer" class="space-y-5 h-full overflow-y-scroll scroll-smooth">

        <div v-for="hymn of hymnals" :key="(hymn.number)"
          class="ring-1 ring-gray-200 dark:ring-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 sm:p-4 rounded-lg">

          <div class="grid grid-cols-[54px_minmax(0,1fr)] grid-rows-[32px_minmax] gap-y-2 gap-x-1">
            <div class="flex items-center">
              <UButton variant="ghost" color="gray" :label="hymn.number" />
            </div>
            <div>
              <ULink :to="useI18nLink(`/hymn/${hymn.number}`)">
                {{ hymn.title }}
              </ULink>
            </div>
            <div class="col-start-2 flex flex-wrap items-center gap-5">
              <UButtonGroup size="xs" orientation="horizontal">
                <UButton variant="ghost" color="gray" icon="i-heroicons-play">
                  <span class="first-letter:capitalize">
                    {{ $t('hymn') }} {{ hymn.number }}
                  </span>
                </UButton>
              </UButtonGroup>

              <UButtonGroup size="xs" orientation="horizontal" class="order-last md:order-none">
                <UButton class="hidden md:inline-block" color="gray" variant="ghost">
                  <span class="first-letter:capitalize">
                    {{ $t('author') }}
                  </span>
                </UButton>
                <UButton v-if="hymn.author" color="gray" variant="ghost" :label="hymn.author" />
              </UButtonGroup>

              <UButtonGroup size="xs" orientation="horizontal">
                <UButton color="gray" variant="ghost" :label="hymn.language.join(', ')" icon="i-heroicons-language" />
              </UButtonGroup>

            </div>

          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<style scoped>
#scrollContainer{
  scrollbar-width: thin;
}
</style>