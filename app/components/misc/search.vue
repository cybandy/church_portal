<script setup lang='js'>
const q = ref('')
const isOpen = ref(false)
const { search, result } = useAlgoliaSearch('hymns')
const hymns = ref([])
watch(q, async () => {
  if (q !== '') {
    await search({ query: q.value })
    hymns.value = result.value.hits
  }else {
    hymns.value = []
  }
})

watch(isOpen, () => {
  if (!isOpen.value) {
    q.value = ''
    hymns.value = []
  }
})
</script>

<template>
  <div class="flex">
    <UIcon @click="() => isOpen = true" name="i-heroicons-magnifying-glass" class="w-6 h-6 cursor-pointer" />
    <UModal v-model="isOpen">
      <UCard :ui="{ base: 'min-w-fit' }">
        <template #header>
          <UInput v-model="q" size="md" icon="i-heroicons-magnifying-glass-20-solid" color="white"
            placeholder="Search..." autocomplete="off" :ui="{ icon: { trailing: { pointer: '' } } }">
            <template #trailing>
              <UButton v-if="q !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
                @click="() => q = ''" />
              <UButton v-else color="gray" variant="ghost" icon="ic:round-subdirectory-arrow-left" :padded="false" />
            </template>
          </UInput>
        </template>

       

        <div class="min-w-full sm:min-w-[500px] md:min-w-[650px] max-w-full sm:max-w-[550px] md:max-w-[650px] grid gap-5">
          <div v-if="hymns.length" @click="() => { navigateTo(useI18nLink(`/hymn/${hymn.number}`)); isOpen=false}" v-for="hymn of hymns" :key="(hymn.number)" class="ring-1 ring-gray-200 dark:ring-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 sm:p-4 rounded-lg hover:cursor-pointer">

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
    </UModal>
  </div>
</template>