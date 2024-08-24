<script lang="ts" setup>
const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)
async function logout() {
  await useNuxtApp().$api('/api/auth/logout')
  userStore.$reset()
  navigateTo(useI18nLink('/'))
}
if (isLoggedIn.value) {
  await logout()
} else {
  navigateTo(useI18nLink('/auth'))
}
</script>

<template>
  <div>
    
  </div>
</template>

<style scoped>

</style>