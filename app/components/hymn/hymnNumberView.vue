<script setup lang='ts'>
import type { UiHymnPage } from '~/types';
import { groupBy, chunk } from 'es-toolkit';
import { useScreenOrientation } from '@vueuse/core'

// const {
//   isSupported,
//   orientation,
//   angle,
//   lockOrientation,
//   unlockOrientation,
// } = useScreenOrientation()

const props = defineProps({
  hymns: {
    type: Array<UiHymnPage>,
    default: []
  },
  isFullScreen: Boolean
})

const is_full_screen = computed(() => props.isFullScreen)

</script>

<template>
  <div class="h-full w-full">
    <HymnViewFullScreen v-if="is_full_screen" :hymns="hymns" :is-full-screen="is_full_screen" />
    <template v-else>
      <HymnViewPage :hymns="hymns" />
    </template>

    
  </div>
</template>