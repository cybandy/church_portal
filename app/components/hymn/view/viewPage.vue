<script setup lang='ts'>
import type { UiHymnPage } from '~/types';
import { groupBy, chunk, maxBy } from 'es-toolkit';
import { useScreenOrientation } from '@vueuse/core'

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
      return 'text-2xl sm:text-3xl md:text-lg lg:text-2xl xl:text-3xl'
    default:
      return ''
  }
}

const num_stanzas = computed(() => Math.max(...props.hymns.map(x => x.stanzas.length)))
</script>

<template>
  <div class="h-full w-full">
    <!-- for desktop -->
    <div class="hidden md:grid gap-10">
      <div v-for="j of Array.from(Array(num_stanzas).keys())" :key="j">


        <div class="grid gap-8 xl:gap-10" :class="[hymns.length == 2 && 'md:grid-cols-2 md:gap-3']">

          <div v-for="(hymn, i) of hymns" :key="i">

            <div v-if="j == 0">
              <p class="text-gray-500 dark:text-gray-400 text-xl capitalize pb-5 hidden md:block">{{ languageLabel(i) }}
              </p>
            </div>

            <div v-if="hymn.stanzas[j]" class="text-gray-800 dark:text-gray-200" :class="[textSize()]">
              <p v-if="hymn.stanzas[j].is_refrain" class="text-primary font-semibold leading-loose">
                {{ refrainLabel(i) }}
              </p>
              <p v-else class="font-bold leading-loose text-black dark:text-white">{{ hymn.stanzas[j].number }}</p>
              <div class="space-y-1 leading-loose">
                <p v-for="(line, k) of hymn.stanzas[j].verse.split('\n')" class="first-letter:uppercase">{{ line }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- for mobile -->
    <div class="md:hidden">
      <div v-for="(hymn, i) of hymns" :key="i">
        <div class="py-5">
          <UDivider :label="languageLabel(i)" orientation="horizontal" class="md:hidden"
            :ui="{ label: 'capitalize' }" />
        </div>

        <div class="grid gap-10">
          <div v-for="(stanza, j) of hymn.stanzas" class="w-full" :class="textSize()" :key="j">
            <div class="text-gray-800 dark:text-gray-200 leading-loose">
              <p v-if="stanza.is_refrain" class="text-primary font-semibold">
                {{ refrainLabel(i) }}
              </p>
              <div class="space-y-1">
                <p v-for="(line,k) of stanza.verse.split('\n')" class="first-letter:uppercase">
                {{ line }}
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>