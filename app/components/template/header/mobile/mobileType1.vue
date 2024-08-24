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
</script>

<template>
  <div class="flex items-center justify-between py-4">
    <NuxtLinkLocale to="/">
      <UIcon :name="favicon" class="w-[33.38px] h-[30px]" />
    </NuxtLinkLocale>
    <div class="flex items-center gap-2">
      <MiscDarkMode />
      <UIcon name="i-heroicons-bell" class="w-6 h-6 cursor-pointer" />
      <div>
       <ProfileHeaderMenu />
      </div>
    </div>
  </div>
</template>