<script setup lang='ts'>
import type { UiHymnPage } from '~/types';
import { groupBy } from 'es-toolkit';

const props = defineProps({
  hymns: {
    type: Array<UiHymnPage>,
    default: []
  },
  isFullScreen: Boolean
})

const is_full_screen = computed(() => props.isFullScreen)

const stanzaNumber = ref(0)
const totalStanzas = computed(() => {
  const n = props.hymns.map(x => x.stanzas.length)
  return Math.max(...n) - 1
})

const stanzas = computed(() => {
  const _st = Object.values(
    groupBy(props.hymns.flatMap(x => x.stanzas), (x) => x.number)
  )
  return _st
})

function prev() {
  if (stanzaNumber.value === 0) {
    return
  }
  stanzaNumber.value --
}
function next() {
  if (stanzaNumber.value === totalStanzas.value) {
    return
  }
  stanzaNumber.value++
}

onKeyStroke('ArrowLeft', (e) => {
  e.preventDefault()
  prev()
})

onKeyStroke('ArrowRight', (e) => {
  e.preventDefault()
  next()
})

const mouseEl = ref()
// const { x, y } = useMouse({ target: mouseEl })
// const old_x = ref(0)
// const old_y = ref(0)

const isMouseMoving = ref(true)


</script>

<template>
  <div class="h-full">
    <template v-if="is_full_screen">
      <div ref="mouseEl" class="w-full h-full bg-white dark:bg-gray-950">
        <h1 class="text-xl md:text-3xl lg:text-4xl font-semibold w-full text-center pt-10">
              {{ hymns[0]?.number }} - {{ hymns[0]?.title }}
            </h1>
        <template v-for="(_stanza, ind) of stanzas" :key="ind">
          <UContainer v-if="ind == stanzaNumber" class="relative w-screen h-screen flex items-center">
            <div class="w-full h-full grid gap-5" :class="[hymns.length == 2 && 'grid-cols-2']">
              <div v-for="(stanza, j) of _stanza" :key="j" class="w-full flex flex-col items-center justify-start pt-14 text-base sm:text-lg md:text-xl lg:text-3xl text-pretty">
                <div class="w-fit space-y-1">
                  <span class="font-bold text-black dark:text-white inline-block w-full">{{ stanza.number + 1 }}</span>
                <div :class="[stanza.is_refrain && 'italic']" class="text-gray-800 dark:text-gray-200 leading-loose space-y-1">
                  <p v-for="line of stanza.verse.split('\n')" 
                  class="text-start font-bold"
                  :class="[
                    ['nnyeso', 'refrain'].includes(line.toLocaleLowerCase()) ? 'font-semibold text-primary' : ''
                  ]">
                    {{ line }}
                  </p>
                </div>
                </div>
              </div>
            </div>

            <!--arrows-->
            <UButton v-show="isMouseMoving" class="absolute top-[50%] left-0" color="gray" icon="i-heroicons-chevron-left-20-solid" @click="prev" />
            <UButton v-show="isMouseMoving" class="absolute top-[50%] right-0" color="gray" icon="i-heroicons-chevron-right-20-solid" @click="next" />
          </UContainer>
        </template>

      </div>
    </template>
    <template v-else>
      <div class="grid gap-5" :class="[hymns.length == 2 && 'md:grid-cols-2']">
        <div v-for="(hymn, i) of hymns" class="flex flex-col justify-start items-center" :key="i">
          <div class="w-fit grid gap-8 md:gap-10">
            <div v-for="(stanza, j) of hymn.stanzas" :key="j" class="w-full space-y-1 text-sm sm:text-base">
              <span class="font-bold text-black dark:text-white">{{ stanza.number + 1 }}</span>
              <div :class="[stanza.is_refrain && 'italic']" class="text-gray-800 dark:text-gray-200 leading-loose">
                <p v-for="line of stanza.verse.split('\n')" 
                :class="[
                  ['nnyeso', 'refrain'].includes(line.toLocaleLowerCase()) ? 'font-semibold text-primary' : ''
                ]">
                  {{ line }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>