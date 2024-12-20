<script lang="js" setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const NuxtImg = resolveComponent('NuxtImg')

const items = computed(() => {
  return locales.value.map(x => {
    return {
      // to: switchLocalePath(x.code),
      avatar: {
        src: `https://flagcdn.com/${x.name}.svg`,
        alt: x.code,
        size: '3xs',
        as: NuxtImg
      },
      click: () => {
        navigateTo(switchLocalePath(x.code))
      }
    }
  })
})
const activeFlag = computed(() => (locales.value.filter((x => x.code == locale.value))[0]?.name))


</script>

<template>
  <div>
    <UDropdown :items="[items]" :popper="{placement:'bottom-start'}">
      <UButton color="gray" variant="ghost" >
        <UAvatar :as="NuxtImg" :src="`https://flagcdn.com/${activeFlag}.svg`" :alt="locale" size="3xs" />
      </UButton>
    </UDropdown>
  </div>
</template>

<style scoped>

</style>