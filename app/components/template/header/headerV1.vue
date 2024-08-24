<script setup lang='ts'>
const { $isMobile } = useNuxtApp()
const device = useDevice()
const header_el = ref()
const { width, height } = useElementSize(header_el)
</script>

<template>
  <div ref="header_el">
    <!-- <ClientOnly> -->
      <div v-if="device.isMobile">
      <TemplateHeaderMobileType1 />
    </div>
    <div v-else>
      <TemplateHeaderDesktopType1 />
    </div>

    <!-- <template #fallback>
      <div class="h-[80px]">

      </div>
    </template>
    </ClientOnly> -->

  </div>
</template>