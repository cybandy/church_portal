<script setup lang='ts'>
import { useI18nLink } from '#imports';

const { t } = useI18n()

// const links = computed(() => [
//   {
//     label: t('home'),
//     to: useI18nLink('/')
//   },
//   {
//     label: t('hymn'),
//     to: useI18nLink('/hymn')
//   },
//   {
//     label: t('events')
//   },
//   {
//     label: t('gallery')
//   },
// ])
const colorMode = useColorMode()
const { locale } = useI18n()
const logosName = computed(() => {
  if (colorMode.value === 'light') {
    if (locale.value === 'en') return 'qb-logo:st-black-en'
    if (locale.value === 'fr') return 'qb-logo:st-black-fr'
    if (locale.value === 'de') return 'qb-logo:st-black-de'
    if (locale.value === 'it') return 'qb-logo:st-black-it'
    return 'qb-logo:st-black-en'
  }
  else {
    if (locale.value === 'en') return 'qb-logo:st-white-en'
    if (locale.value === 'fr') return 'qb-logo:st-white-fr'
    if (locale.value === 'de') return 'qb-logo:st-white-de'
    if (locale.value === 'it') return 'qb-logo:st-white-it'
    return 'qb-logo:st-white-en'
  }
})
</script>

<template>
  <div class="flex items-center justify-between py-4">
    <ULink :to="useI18nLink('/')">
      <UIcon
        :name="logosName"
        class="w-[190px] h-[42px]"
      />
    </ULink>
    <!-- <UHorizontalNavigation :links="links" :ui="{wrapper:'justify-center'}" /> -->
    <div class="flex items-center gap-2">
      <MiscLanguageSwitcher />
      <MiscDarkMode />
      <MiscSearch />
      <!-- <ProfileHeaderMenu /> -->
    </div>
  </div>
</template>