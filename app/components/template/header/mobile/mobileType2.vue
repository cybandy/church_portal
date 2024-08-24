<script setup lang='ts'>
import { useI18nLink } from '#imports';
const { user } = storeToRefs(useUserStore())
const back = computed(() => useRouter().options.history.state.back as string)

const profileMenuItems = [
  [
    {
    label: 'Edit Profile',
    click: ()=>{}
  },
  {
    label: 'Sign Out',
    click: () => { },
    to: useI18nLink('/auth/logout')
    },
  ]
]
</script>

<template>
  <div>
    <div class="py-4 flex items-center justify-between">
      <UButton color="gray" :to="useI18nLink(back)" icon="i-heroicons-arrow-left-20-solid" />
      <h1 class="text-base md:text-lg font-medium">
        {{ user.first_name }} {{ user.last_name }}
      </h1>
      <UDropdown :items="profileMenuItems" >
        <UButton color="gray" icon="i-heroicons-ellipsis-vertical-20-solid" />
      </UDropdown>
    </div>
  </div>
</template>