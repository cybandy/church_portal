<script setup lang='ts'>
const { $isMobile } = useNuxtApp()
const device = useDevice()
const header_el = ref()
const { width, height } = useElementSize(header_el)
</script>

<template>
  <div ref="header_el">
      <div v-if="$isMobile">
      <TemplateHeaderMobileType1 />
    </div>
    <div v-else>
      <TemplateHeaderDesktopType1 />
    </div>


  </div>
</template>