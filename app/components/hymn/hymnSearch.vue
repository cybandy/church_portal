<script setup lang='js'>
const q = ref('')
const isOpen = ref(false)
const { search, result } = useAlgoliaSearch('hymns')
const hymns = ref([])
watch(q, async () => {
  if (q.value !== '') {
    await search({ query: q.value })
    hymns.value = result.value.hits
    
  }
})

watch(isOpen, () => {
  if (!isOpen.value) {
    q.value = ''
    hymns.value = []
  }
})

function clear() {
  q.value = ''
  hymns.value = []
  
}
</script>

<template>
  <div class="flex">
    <UIcon @click="() => isOpen = true" name="i-heroicons-magnifying-glass" class="w-6 h-6 cursor-pointer" />
    <UModal v-model="isOpen" :ui="{container:'items-start sm:items-start'}">
      <UCard :ui="{ base: 'min-w-fit' }">
        <template #header>
          <UInput v-model="q" size="md" icon="i-heroicons-magnifying-glass-20-solid" color="white"
            placeholder="Search..." autocomplete="off" :ui="{ icon: { trailing: { pointer: '' } } }">
            <template #trailing>
              <UButton v-if="q !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid" :padded="false"
                @click="clear" />
              <UButton v-else color="gray" variant="ghost" icon="ic:round-subdirectory-arrow-left" :padded="false" />
            </template>
          </UInput>
        </template>

       

        <div class="min-w-full sm:min-w-[500px] grid gap-5">
          <HymnCard v-for="hymn of hymns" :hymn="hymn" :key="hymn.number" />
      
        </div>
      
      </UCard>
    </UModal>
  </div>
</template>