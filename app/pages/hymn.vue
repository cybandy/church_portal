<script lang="ts" setup>
const q = ref('')
const { $api } = useNuxtApp()
const d = ref({})
const { data, pending, error, refresh} = await useAsyncData(async () => {
  const dd =  $api('/api/hymn/search', {
    method: 'GET',
    query: {
      q: q.value
    },
    
  })
  return dd
}, { watch: [q], pick: ['hymns'], immediate: false })

const { hymns } = await $api('/api/hymn/list')
if (hymns) {
  d.value = hymns
}
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
          
          <div class="flex items-center">
            <span class="">

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