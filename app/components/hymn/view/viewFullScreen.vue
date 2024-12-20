<script setup lang='ts'>
import type { UiHymnPage } from '~/types';
import { useScreenOrientation, useEventListener, useSwipe } from '@vueuse/core'

const props = defineProps({
  hymns: {
    type: Array<UiHymnPage>,
    default: []
  },
  isFullScreen: Boolean
})
const is_full_screen = computed(() => props.isFullScreen)
function languageLabel(ind: number) {
  switch (props.hymns[ind]?.language) {
    case 'eng':
      return 'english'
    default:
      return props.hymns[ind]?.language
  }
}

function refrainLabel(ind: number) {
  switch (props.hymns[ind]?.language) {
    case 'eng':
      return 'Refrain'
    case 'twi':
      return 'Nnyesoɔ'
    default:
      return ''
  }
}

function textSize() {
  switch (props.hymns.length) {
    case 1:
      return 'text-2xl sm:text-3xl lg:text-4xl xl:text-4xl'
    case 2:
      return 'text-2xl sm:text-3xl md:text-lg lg:text-2xl xl:text-5xl 2xl:text-6xl'
    default:
      return ''
  }
}

const num_stanzas = computed(() => Math.max(...props.hymns.map(x => x.stanzas.length)))

const curr_stanza = ref(0)

function outOfStanza(diff: number) {
  const nu_stanza = curr_stanza.value + diff
  if (nu_stanza < 0 || nu_stanza >= num_stanzas.value) return true
  else return false
}

function next() {
  if (!outOfStanza(1)) {
    curr_stanza.value++
  }
}
function prev() {
  if (!outOfStanza(-1)) {
    curr_stanza.value--
  }
}

onKeyStroke('ArrowLeft', (e) => {
  e.preventDefault()
  if(!is_full_screen.value) return
  prev()
})

onKeyStroke('ArrowRight', (e) => {
  e.preventDefault()
  if (!is_full_screen.value) return
  console.log('before',curr_stanza.value)
  next()
  console.log('after',curr_stanza.value)
})

// swipe
const containerEl = ref(null)
const { direction:swipeDirection } = useSwipe(containerEl)

watch(swipeDirection, () => {
  if (swipeDirection.value == 'left') next()
  if (swipeDirection.value == 'right') prev()
})

const {} = useScreenOrientation()
</script>

<template>
  <UContainer ref="containerEl" :ui="{ constrained: 'max-w-full' }">
    <h1 class="text-xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold w-full text-center py-5 md:py-10">
      {{ hymns[0]?.number }} - {{ hymns[0]?.title }}
    </h1>
    <div class="grid gap-10 w-full h-full">
      <template v-for="j of Array.from(Array(num_stanzas).keys())" :key="j">
        <div v-if="j === curr_stanza">

          <div class="grid gap-8 xl:gap-10" :class="[hymns.length == 2 && 'md:grid-cols-2 md:gap-3']">

            <div v-for="(hymn, i) of hymns" :key="i">
              <div v-if="hymn.stanzas[j]" class="text-gray-800 dark:text-gray-200 text-pretty" :class="[textSize()]">
                <p v-if="hymn.stanzas[j].is_refrain" class="text-primary font-semibold leading-tight">
                  {{ refrainLabel(i) }}
                </p>
                <p v-else class="font-bold text-lg text-black dark:text-white">{{ hymn.stanzas[j].number }}</p>
                <div class="space-y-1 leading-tight ">
                  <p v-for="(line, k) of hymn.stanzas[j].verse.split('\n')" class="first-letter:uppercase">{{ line }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

    </div>
  </UContainer>
</template>