<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

interface Props {
    modelValue?: string
    placeholder?: string
    startIcon?: string
    endIcon?: string
    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: '',
    startIcon: '',
    endIcon: '',
    class: ''
})

const emit = defineEmits(['update:modelValue'])

const isFocused = ref(false)
</script>

<template>
  <div
    class="relative flex items-center px-4 py-1.5 rounded-lg border transition-all duration-200 
           focus-within:ring-2 focus-within:ring-primary focus-within:border-primary 
           dark:border dark:border-dark-gray"
    :class="props.class"
  >
    <!-- Start Icon (inside input) -->
    <Icon
      v-if="props.startIcon"
      :icon="props.startIcon"
      class="absolute left-3 h-5 w-5 text-gray-400 pointer-events-none"
    />

    <!-- Input -->
    <input
      type="text"
      :placeholder="props.placeholder"
      class="w-full pl-9 pr-9 dark:text-white border-none focus:outline-none focus:ring-0 
             bg-transparent text-gray-700 placeholder-gray-400"
      :value="props.modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <!-- End Icon (inside input, right side) -->
    <Icon
      v-if="props.endIcon"
      :icon="props.endIcon"
      class="absolute right-3 text-gray-400 hover:text-gray-600 transition"
    />
  </div>
</template>
