<script setup lang='ts'>

const { t, locale } = useI18n()
const colorMode = useColorMode()
const favicon = computed(() => {
  if (colorMode.value === 'light') {
   return 'qb-logo:min-black'
  } else {
    return 'qb-logo:min-white'
  }
  
})
const { user, isLoggedIn } = storeToRefs(useUserStore())
</script>

<template>
  <div class="flex items-center justify-between py-4">
    <NuxtLinkLocale to="/">
      <UIcon :name="favicon" class="w-[33.38px] h-[30px]" />
    </NuxtLinkLocale>
    <div class="flex items-center gap-2">
      <UIcon name="i-heroicons-bell" class="w-6 h-6 cursor-pointer" />
      <div>
        <div>
        <UAvatar v-if="isLoggedIn" size="sm" :src="user.avatar_url || ''" :alt="`${user.first_name} ${user.last_name}`" />
        <NuxtLinkLocale v-else to="/auth" ><UIcon name="i-heroicons-user-circle" class="w-6 h-6" /></NuxtLinkLocale>
      </div>
      </div>
    </div>
  </div>
</template>