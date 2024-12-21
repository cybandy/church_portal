<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
  },
  label: {
    type: String,
    default: 'password',
  },
  placeholder: {
    type: String,
    default: '********',
  },
  autocomplete: {
    type: String,
    default: 'current-password',
  },
});
const pass = ref('');
const emit = defineEmits(['update:modelValue']);

function updateModelValue() {
  emit('update:modelValue', pass.value);
}

const passwordType = ref('password');
const isPassword = ref(true);
const togglePassword = () => {
  if (isPassword.value) {
    passwordType.value = 'text';
  }
  else {
    passwordType.value = 'password';
  }
  isPassword.value = !isPassword.value;
};
</script>

<template>
  <UFormGroup
    v-bind="$attrs"
    class="space-y-2"
    :label="label"
    name="password"
  >
    <UInput
      v-model="pass"
      :type="passwordType"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      icon="i-ph-lock"
      :ui="{ icon: { trailing: { pointer: '' } } }"
      @keyup="updateModelValue"
    >
      <template #trailing>
        <span
          class="cursor-pointer"
          @click="togglePassword"
        >
          <UIcon
            v-if="passwordType == 'password'"
            name="i-ph-eye"
          />
          <UIcon
            v-else
            name="i-ph-eye-slash"
          />
        </span>
      </template>
    </UInput>
  </UFormGroup>
</template>

<style scoped></style>