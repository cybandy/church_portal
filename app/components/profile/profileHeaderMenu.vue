<script setup lang='ts'>
import { useI18nLink } from '#imports';

const { user, isLoggedIn } = storeToRefs(useUserStore())
const items = computed(() => [
  [{
    label: user.value.email,
    slot: 'account',
    disabled: true
  }],
  [...userProfileMenuItems]
])
</script>

<template>
  <div class="flex">
    <UDropdown :items="items">
      <div>
        <UAvatar
          v-if="isLoggedIn"
          size="sm"
          :src="user.avatar_url || ''"
          :alt="`${user.first_name} ${user.last_name}`"
        />
        <ULink
          v-else
          :to="useI18nLink('/auth')"
        ><UIcon
          name="i-heroicons-user-circle"
          class="w-6 h-6"
        /></ULink>
      </div>

      <template #account="{ item }">
        <div class="text-left">
          <p>
            Signed in as
          </p>
          <p class="truncate font-medium text-gray-900 dark:text-white">
            {{ item.label }}
          </p>
        </div>
      </template>
    </UDropdown>
  </div>
</template>