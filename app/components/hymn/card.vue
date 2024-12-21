<script setup lang='ts'>
import type { PropType } from 'vue'
import type { UiHymnResponse } from '~/types';
import { useI18nLink } from '#imports';

defineProps({
  hymn: {
    type: Object as PropType<UiHymnResponse>,
    required: true
  }
})
const emits = defineEmits(['changeRoute'])

const { t: translate } = useI18n()
</script>

<template>
  <div class="ring-1 ring-gray-200 dark:ring-gray-800 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800 p-2 sm:p-4 rounded-lg">
    <div class="grid grid-cols-[54px_minmax(0,1fr)] grid-rows-[32px_minmax] gap-y-2 gap-x-1">
      <div class="flex items-center">
        <UButton
          variant="ghost"
          color="gray"
          :label="hymn.number"
        />
      </div>
      <div>
        <ULink
          :to="useI18nLink(`/hymn/${hymn.number}`)"
          @click="emits('changeRoute')"
        >
          {{ hymn.title }}
        </ULink>
      </div>
      <div class="col-start-2 flex flex-wrap items-center gap-5">
        <UButton
          class="hidden xxs:inline-flex"
          variant="ghost"
          color="gray"
          size="xs"
          icon="i-heroicons-play"
        >
          <span class="first-letter:capitalize">
            {{ translate('hymn') }} {{ hymn.number }}
          </span>
        </UButton>

        <UButton
          v-if="hymn.author"
          class="order-last md:order-none"
          color="gray"
          size="xs"
          variant="ghost"
          :label="hymn.author"
        >
          <span class="first-letter:capitalize mr-1">
            {{ translate('author') }}
          </span>
          <span>
            {{ hymn.author }}
          </span>
        </UButton>

        <UButton
          class="hidden xs:inline-flex"
          color="gray"
          size="xs"
          variant="ghost"
          :label="hymn.language.join(', ')"
          icon="i-heroicons-language"
        />
      </div>
    </div>
  </div>
</template>