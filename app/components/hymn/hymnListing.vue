<script lang="ts" setup>
import type { UiHymnResponse } from '~/types';
import { useI18nLink } from '#imports';

const props = defineProps({
  q: String,
  hymnals: {
    type: Array<UiHymnResponse>,
    default:[]
  },
  count: Number,
  loadMore:Boolean
})
const emits = defineEmits([
  'update:q', 'update:hymnals', 'search', 'scroll', 'update:count'
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
  set:(val)=>emits('update:hymnals',val)
})

const loadMore = computed(()=>props.loadMore)

// search function
const searchFunc = async () => {
  if (!q.value || q.value == '') {
    return
  }
  emits('search')

}

watch(q, async () => {
  await searchFunc()
})

const scrollContainer = ref<HTMLElement | null>(null)
const {  } = useInfiniteScroll(
  scrollContainer,
  () => {
    // console.log('scrolling...')
    emits('scroll')
  },
  {
    distance: 10,
    // canLoadMore:
    canLoadMore(el) {
      const _hymn = hymnals.value.flatMap(x => Object.values(x))
      return loadMore.value
    },
  }
)
</script>

<template>
    <div class="min-w-full sm:min-w-[500px] md:min-w-[650px] max-w-full sm:max-w-[550px] md:max-w-[650px] h-full">
      <UCard class="h-full" :ui="{body:{base:'h-full'}}">
        <template #header>
          <div>

          </div>
          <UInput v-model="q" color="gray" placeholder="Search..."
            trailing-icon="i-heroicons-magnifying-glass" :ui="{ icon: { trailing: { pointer: '' } } }">

            <template #trailing>
              <UButton @click="searchFunc" color="gray" variant="ghost" icon="ic:round-subdirectory-arrow-left"
                :padded="false" />
            </template>
          </UInput>
        </template>

        <div ref="scrollContainer" class="space-y-5 h-full overflow-y-scroll no-scrollbar">

          <div v-for="hymn of hymnals" :key="(hymn.number as string)" class="ring-1 ring-gray-200 dark:ring-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 sm:p-4 rounded-lg">

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
                  <UButton variant="ghost" color="gray" icon="i-heroicons-play" >
                    <span class="first-letter:capitalize">
                      {{ $t('hymn') }} {{ hymn.number }}
                    </span>
                  </UButton>
                </UButtonGroup>

                <UButtonGroup size="xs" orientation="horizontal" class="order-last md:order-none">
                  <UButton class="hidden md:inline-block" color="gray" variant="ghost" >
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

<style scoped></style>