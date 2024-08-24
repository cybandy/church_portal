<script setup lang='ts'>
useHead({
    title: 'Profile'
})
definePageMeta({
    layout: 'canvas'
})
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
    <div>
        <UContainer>
            <TemplateHeaderMobileType2 />
        </UContainer>

        <UContainer>
            <div class="flex items-center justify-center py-8 md:py-12">
                <UAvatar size="sm" :src="user.avatar_url || ''" :alt="`${user.first_name} ${user.last_name}`" :ui="{
                    size: {
                        sm: 'w-40 h-40 md:w-52 md:h-52'
                    }
                }" />
            </div>

            <div class="pt-14 pb-6 space-y-5">
                <div class="grid grid-cols-2 gap-4 md:gap-5 items-center">
                    <div class="space-y-4">
                        <p class="font-medium text-gray-500 dark:text-gray-300">
                            First Name:
                        </p>
                        <p class="font-medium text-gray-950 dark:text-gray-50">
                            {{ user.first_name }}
                        </p>
                    </div>
                    <div class="space-y-4">
                        <p class="font-medium text-gray-500 dark:text-gray-300">
                            Last Name:
                        </p>
                        <p class="font-medium text-gray-950 dark:text-gray-50">
                            {{ user.last_name }}
                        </p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 md:gap-5 items-center">
                    <div class="space-y-4">
                        <p class="font-medium text-gray-500 dark:text-gray-300">
                            Email:
                        </p>
                        <p class="font-medium text-gray-950 dark:text-gray-50">
                            {{ user.email }}
                        </p>
                    </div>
                    <div class="space-y-4">
                        <p class="font-medium text-gray-500 dark:text-gray-300">
                            Tel:
                        </p>
                        <p class="font-medium text-gray-950 dark:text-gray-50">
                            
                        </p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 md:gap-5 items-center">
                    <div class="space-y-4">
                        <p class="font-medium text-gray-500 dark:text-gray-300">
                            Address
                        </p>
                        <p class="font-medium text-gray-950 dark:text-gray-50">
                            {{ user.address }}
                        </p>
                    </div>
                </div>
            </div>
        </UContainer>

    </div>
</template>