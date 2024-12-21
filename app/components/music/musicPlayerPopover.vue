<script lang="ts" setup>
const props = defineProps({
  url: {
    type: String,
    required: true
  },
  label: String,
  icon: {
    type: String,
    default: 'i-heroicons-musical-note'
  }
})

const url = computed(() => props.url)

const audioPlayer = ref<HTMLAudioElement>()
const { playing, currentTime, duration, volume, muted, waiting, ended } = useMediaControls(audioPlayer, {
  src: url.value
})

function playPauseAudio() {
  if (ended.value) {
    currentTime.value = 0
    playing.value = true
    return
  }
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
      <UIcon
        :name="icon"
        class="header-icons cursor-pointer"
        :popper="{ placement: 'top-end' }"
      />

      <template #panel>
        <div
          class="p-4 bg-gray-200 dark:bg-gray-800 min-w-64 max-w-80 rounded-xl ring-1 ring-gray-100 dark:ring-gray-800 ring-inset space-y-3"
        >
          <div class="space-y-1">
            <MusicScrubber
              v-model="currentTime"
              size="md"
              :max="duration"
            />
            <div class="flex items-center justify-end">
              <span class="text-xs/6 text-gray-600 dark:text-gray-300">
                {{ waiting ? '-- / --' : `${formatDuration(currentTime)} / ${formatDuration(duration)}` }}
              </span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UButton
                size="xs"
                color="white"
                :icon="!playing ? 'i-heroicons-play-20-solid' : 'i-heroicons-pause-20-solid'"
                @click="playPauseAudio"
              />
              <!-- <UButton size="xs" color="white" @click="playPauseAudio" icon="" /> -->
            </div>
            <div class="flex items-center gap-1">
              <UButton
                size="xs"
                color="white"
                :icon="!muted ? 'i-heroicons-speaker-wave-20-solid' : 'i-heroicons-speaker-x-mark-20-solid'"
                @click="mutedAudio"
              />
              <MusicScrubber
                v-model="volume"
                size="xs"
                :max="1"
                class="w-20"
              />
            </div>
          </div>
        </div>
      </template>
    </UPopover>
    <audio ref="audioPlayer" />
  </div>
</template>

<style scoped></style>