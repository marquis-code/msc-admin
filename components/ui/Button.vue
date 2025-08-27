<template>
  <button
    :disabled="disabled || loading"
    :class="buttonClass"
    class="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    @click="$emit('click', $event)"
  >
    <LoadingSpinner
      v-if="loading"
      size="sm"
      class="mr-2"
    />
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}

const { variant = 'primary', size = 'md', disabled = false, loading = false } = defineProps<Props>();

defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClass = computed(() => {
  let baseClass = '';
  
  // Size classes
  switch (size) {
    case 'sm':
      baseClass += 'px-3 py-1.5 text-xs ';
      break;
    case 'lg':
      baseClass += 'px-6 py-3 text-base ';
      break;
    default:
      baseClass += 'px-4 py-2 text-sm ';
  }
  
  // Variant classes
  switch (variant) {
    case 'primary':
      baseClass += 'bg-primary text-white hover:bg-primary/90 ';
      break;
    case 'secondary':
      baseClass += 'bg-gray-200 text-gray-800 hover:bg-gray-300 ';
      break;
    case 'danger':
      baseClass += 'bg-red-600 text-white hover:bg-red-700 ';
      break;
    case 'success':
      baseClass += 'bg-green-600 text-white hover:bg-green-700 ';
      break;
  }
  
  return baseClass;
});
</script>

<style scoped>
.bg-primary {
  background-color: #00b8AE;
}
.hover\\:bg-primary\\/90:hover {
  background-color: rgba(0, 184, 174, 0.9);
}
.focus\\:ring-primary:focus {
  ring-color: #00b8AE;
}
</style>