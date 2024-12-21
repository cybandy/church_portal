<script setup lang="ts">
const { t } = useI18n()
const items = [{
  slot: 'login',
  label: t('login')
}, {
  slot: 'register',
  label: t('register')
}]

const loginForm = reactive({ email: '', password: '' })
const RegistrationForm = reactive({ first_name: '', last_name: '', email: '', password: '' })

const userStore = useUserStore()

async function loginFunc() {
  await userStore.login(loginForm.email, loginForm.password)
}

async function registerFunc() {
  await userStore.register(RegistrationForm.first_name, RegistrationForm.last_name, RegistrationForm.email, RegistrationForm.password)
}

const card_ui = {
  body: {
    base: 'space-y-5'
  }
}

// const route = useRoute()
// const router = useRouter()
// const localRoute = useLocaleRoute()
// const setI18nParams = useSetI18nParams()

const { tab } = storeToRefs(useUserStore())
</script>

<template>
  <UContainer class="grid place-content-center pt-[60px]">
    <div class="min-w-full sm:min-w-[500px] md:min-w-[550px] max-w-full sm:max-w-[550px]">
      <UTabs
        v-model="tab"
        :items="items"
        class="w-full"
      >
        <template #login="{ item }">
          <UCard
            :ui="card_ui"
            @submit.prevent="loginFunc"
          >
            <template #header>
              <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white capitalize">
                {{ item.label }}
              </p>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400 first-letter:capitalize">
                {{ $t('login_desc') }}
              </p>
            </template>

            <UFormGroup
              :label="$t('email')"
              name="email"
              class="mb-3"
            >
              <UInput
                v-model="loginForm.email"
                placeholder="john.doe@example.com"
                autocomplete="email"
                required
              />
            </UFormGroup>
            <FormsInputPassword
              v-model="loginForm.password"
              :label="$t('password')"
              required
            />
            <!-- <UFormGroup :label="$t('password')" name="password">
              <UInput v-model="loginForm.password" type="password" placeholder="********" autocomplete="current-password" required />
            </UFormGroup> -->

            <template #footer>
              <UButton
                type="submit"
                color="primary"
              >
                <span class="capitalize">{{ $t('login') }}</span>
              </UButton>
            </template>
          </UCard>
        </template>

        <template #register="{ item }">
          <UCard
            :ui="card_ui"
            @submit.prevent="registerFunc"
          >
            <template #header>
              <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white capitalize">
                {{ item.label }}
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400 first-letter:capitalize">
                {{ t('registration_desc') }}
              </p>
            </template>

            <div class="grid grid-cols-2 gap-5">
              <UFormGroup
                :label="$t('first_name')"
                name="first_name"
                required
                class="mb-3"
              >
                <UInput
                  v-model="RegistrationForm.first_name"
                  required
                />
              </UFormGroup>
              <UFormGroup
                :label="$t('last_name')"
                name="last_name"
                required
              >
                <UInput
                  v-model="RegistrationForm.last_name"
                  required
                />
              </UFormGroup>
            </div>

            <UFormGroup
              :label="$t('email')"
              name="email"
              required
            >
              <UInput
                v-model="RegistrationForm.email"
                autocomplete="email"
                required
              />
            </UFormGroup>

            <!-- <UFormGroup :label="$t('password')" name="password" required>
              <UInput v-model="RegistrationForm.password" autocomplete="current-password" type="password" required />
            </UFormGroup> -->

            <FormsInputPassword
              v-model="RegistrationForm.password"
              :label="$t('password')"
              required
            />

            <template #footer>
              <UButton
                type="submit"
                color="primary"
              >
                <span class="capitalize">{{ $t('register') }}</span>
              </UButton>
            </template>
          </UCard>
        </template>
      </UTabs>
    </div>
  </UContainer>
</template>
