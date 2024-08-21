<script lang="ts" setup>
const props = defineProps({
  url: {
    type: String,
    required: true
  },
  label: String
})
const url = computed(() => props.url)

const audioPlayer = ref<HTMLAudioElement>()
const { playing, currentTime, duration, volume, muted, waiting, ended } = useMediaControls(audioPlayer, {
  src: url.value
})

function playPauseAudio() {
  playing.value = !playing.value
}
function mutedAudio() {
  muted.value = !muted.value
}
function formatDuration(seconds: number) {
  return new Date(1000 * seconds).toISOString().slice(14, 19)
}
</script>

<template>
  <div class="flex w-fit">
    <UPopover>
    <UIcon name="i-heroicons-musical-note" class="w-6 h-6 cursor-pointer" :popper="{ placement: 'top-end' }" />

    <template #panel>
      <div class="p-4 bg-gray-200 dark:bg-gray-800 min-w-64 max-w-80 rounded-xl ring-1 ring-gray-100 dark:ring-gray-800 ring-inset space-y-3">
          <div class="space-y-1">
            <UProgress size="md" :value="currentTime" :max="duration" />
            <div class="flex items-center justify-end">
              <span class="text-xs/6 text-gray-600 dark:text-gray-300">
                {{ waiting ? '-- / --' : `${formatDuration(currentTime)} / ${formatDuration(duration)}` }}
              </span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
            <UButton size="xs" color="white" @click="playPauseAudio" icon="i-heroicons-play-20-solid" />
            <UButton size="xs" color="white" @click="playPauseAudio" icon="i-heroicons-pause-20-solid" />
          </div>
          <UButton size="xs" color="white" @click="mutedAudio" :icon="! muted ? 'i-heroicons-speaker-wave-20-solid' : 'i-heroicons-speaker-x-mark-20-solid'" />
          </div>
        </div>
    </template>
  </UPopover>
  <audio ref="audioPlayer" />
  </div>
</template>

<style scoped></style>