<template>
  <Modal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="title"
    size="sm"
  >
    <div class="text-center">
      <div class="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
        <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      
      <p class="text-gray-600 mb-6">{{ message }}</p>
      
      <div class="flex gap-3 justify-center">
        <Button
          variant="secondary"
          @click="$emit('update:modelValue', false)"
          :disabled="loading"
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          @click="$emit('confirm')"
          :loading="loading"
        >
          {{ confirmText }}
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  loading?: boolean;
}

const {
  modelValue,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  loading = false
} = defineProps<Props>();

defineEmits<{
  'update:modelValue': [value: boolean];
  confirm: [];
}>();
</script>