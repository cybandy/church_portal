<script setup lang='js'>
const presentation = ref()
const enterFullscreen = () => {
  if (presentation.value.requestFullscreen) {
    presentation.value.requestFullscreen()
  } else if (presentation.value.mozRequestFullScreen) { /* Firefox */
    presentation.value.mozRequestFullScreen()
  } else if (presentation.value.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    presentation.value.webkitRequestFullscreen()
  } else if (presentation.value.msRequestFullscreen) { /* IE/Edge */
    presentation.value.msRequestFullscreen()
  }
}

const exitFullscreen = () => {
  if (defaultDocument.exitFullscreen) {
    defaultDocument.exitFullscreen()
  } else if (defaultDocument.mozCancelFullScreen) { /* Firefox */
    defaultDocument.mozCancelFullScreen()
  } else if (defaultDocument.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    defaultDocument.webkitExitFullscreen()
  } else if (defaultDocument.msExitFullscreen) { /* IE/Edge */
    defaultDocument.msExitFullscreen()
  }
}

// Listen for keyboard events
const handleKeydown = (e) => {
  if (e.key === 'f') {
    enterFullscreen()
  } else if (e.key === 'Escape') {
    exitFullscreen()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div>
<div ref="presentation" class="presentation-container">
      <!-- Your presentation content here -->
      <h1>Presentation Mode</h1>
      <p>This is full-screen content!</p>
    </div>
    <div class="controls">
      <button @click="enterFullscreen">Go Fullscreen</button>
      <button @click="exitFullscreen">Exit Fullscreen</button>
    </div>
  </div>
</template>