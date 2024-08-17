<script setup lang='ts'>
import { useI18nLink } from '#imports';
const { t } = useI18n()


const links = computed(()=>[
  {
    label: t('home'),
    to:useI18nLink('/')
  },
  {
    label: t('hymn'),
    to: useI18nLink('/hymn')
  },
  {
    label: t('events')
  },
  {
    label: t('gallery')
  },
])
const colorMode = useColorMode()
const { locale } = useI18n()
const logosName = computed(() => {
  if (colorMode.value === 'light') {
    if (locale.value === 'en') return 'qb-logo:st-black-en'
    if (locale.value === 'fr') return 'qb-logo:st-black-fr'
    if (locale.value === 'de') return 'qb-logo:st-black-de'
    if(locale.value === 'it') return 'qb-logo:st-black-it'
   return 'qb-logo:st-black-en'
  } else {
    if (locale.value === 'en') return 'qb-logo:st-white-en'
    if (locale.value === 'fr') return 'qb-logo:st-white-fr'
    if (locale.value === 'de') return 'qb-logo:st-white-de'
    if (locale.value === 'it') return 'qb-logo:st-white-it'
    return 'qb-logo:st-white-en'
  }
  
})
const { user, isLoggedIn } = storeToRefs(useUserStore())
</script>

<template>
  <div class="flex items-center justify-between py-4">
    <ClientOnly>
      <ULink :to="useI18nLink('/')">
        <UIcon :name="logosName" class="w-[190px] h-[42px]" />
      </ULink>
      <template #fallback>
        <span class="w-[190px] h-[42px]"></span>
      </template>
    </ClientOnly>
    <UHorizontalNavigation :links="links" :ui="{wrapper:'justify-center'}" />
    <div class="flex items-center gap-2">
      <MiscLanguageSwitcher />
      <MiscDarkMode />
      <UIcon name="i-heroicons-bell" class="w-6 h-6" />
      <div>
        <UAvatar v-if="isLoggedIn" size="sm" :src="user.avatar_url || ''" :alt="`${user.first_name} ${user.last_name}`" />
        <ULink v-else :to="useI18nLink('/auth')" ><UIcon name="i-heroicons-user-circle" class="w-6 h-6" /></ULink>
      </div>
      
    </div>
  </div>
</template>