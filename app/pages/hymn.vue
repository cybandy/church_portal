<script lang="ts" setup>
import type { Hymn } from '~~/server/database/types';
import type { UiHymnResponse } from '~/types';

// api - custom $fetch
const { $api } = useNuxtApp()

// search query
const q = ref('')

const hymnals = ref([] as UiHymnResponse[])

// search function
const searchFunc = async () => {

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

await searchFunc()
</script>

<template>
  <UContainer class="flex items-center justify-center pt-[60px]">
    <div class="min-w-full sm:min-w-[500px] md:min-w-[650px] max-w-full sm:max-w-[550px] md:max-w-[650px]" >
      <UCard>
        <template #header>
          <div>

          </div>
          <UInput v-model="q" color="gray" placeholder="Search..." trailing-icon="i-heroicons-magnifying-glass" :ui="{icon:{trailing: {pointer:''}}}">

            <template #trailing>
              <UButton
              color="gray"
              variant="ghost"
              icon="ic:round-subdirectory-arrow-left"
              :padded="false"
              />
            </template>
          </UInput>
        </template>

        <div>
          
          <div 
          v-for="hymn of hymnals"
          :key="hymn.number as string"
          class="flex items-center p-2">
            <span class="">
              {{  }}
            </span>
            <p>

            </p>
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>

<style scoped>

</style>