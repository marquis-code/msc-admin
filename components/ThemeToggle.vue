<template>
  <button
    @click="toggleTheme"
    class="relative p-2 rounded-full transition-el hover:bg-primary/20 focus:outline-none"
    :title="
      colorMode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
    "
  >
    <transition name="theme-toggle" mode="out-in">
      <Icon
        v-if="colorMode === 'light'"
        icon="solar:moon-line-duotone"
        class="w-4 h-4 text-primary dark:text-gray-300"
        key="moon"
      />
      <Icon v-else icon="mynaui:sun" class="w-4 h-4 text-primary" key="sun" />
    </transition>
  </button>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useTheme } from "@/composables/useTheme";
const { colorMode, toggleTheme } = useTheme();
</script>

<style scoped>
.theme-toggle-enter-active,
.theme-toggle-leave-active {
  transition: all 0.3s ease;
}

.theme-toggle-enter-from {
  opacity: 0;
  transform: rotate(180deg) scale(0.8);
}

.theme-toggle-leave-to {
  opacity: 0;
  transform: rotate(-180deg) scale(0.8);
}
</style>
