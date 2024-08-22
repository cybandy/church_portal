<script lang="ts" setup>
const userStore = useUserStore()
const { isLoggedIn } = storeToRefs(userStore)
async function logout() {
  
}
if (isLoggedIn.value) {
  
}
</script>

<template>
  <div>
    
  </div>
</template>

<style scoped>

</style>