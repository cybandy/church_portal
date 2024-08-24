<script lang="ts" setup>

const audioPlayer = ref<HTMLAudioElement>()
const { playing, currentTime, duration, volume, muted, waiting, ended } = useMediaControls(audioPlayer, {
  src: "https://www.hymnalaccompanist.com/mp3/3.mp3"
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
  <div>
    <UContainer>
      <div>
        good news
      </div>
    </UContainer>
  </div>
</template>

<style scoped></style>