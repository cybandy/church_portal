<script setup lang='ts'>
const { $isMobile } = useNuxtApp()
</script>

<template>
  <div>
    <div v-if="$isMobile">
      <TemplateHeaderMobileType1 />
    </div>
    <div v-else-if="!$isMobile">
      <TemplateHeaderDesktopType1 />
    </div>

  </div>
</template>