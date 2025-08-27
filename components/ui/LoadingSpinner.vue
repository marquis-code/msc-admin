<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <div
      class="animate-spin rounded-full border-t-2 border-primary"
      :class="spinnerClass"
    ></div>
    <span v-if="text" class="ml-2 text-gray-600">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  containerClass?: string;
}

const { size = 'md', text, containerClass } = defineProps<Props>();

const spinnerClass = computed(() => {
  switch (size) {
    case 'sm': return 'w-4 h-4';
    case 'lg': return 'w-8 h-8';
    default: return 'w-6 h-6';
  }
});
</script>

<style scoped>
.border-primary {
  border-top-color: #00b8AE;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
}
</style>