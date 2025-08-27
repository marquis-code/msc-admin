<template>
  <header
    class="shadow py-4 fixed z-[999] w-screen bg-white dark:bg-dark transition-colors duration-300"
  >
    <div class="w-11/12 mx-auto flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center space-x-1">
        <img
          src="/assets/img/msc-logo-transparent.png"
          alt=""
          class="size-[30px]"
        />
        <h3 class="font-bold text-primary text-2xl">MSC</h3>
        <span class="text-xs font-serif italic ml-1 text-primary mt-2"
          >faster, better, cheaper.</span
        >
      </NuxtLink>

      <!-- Desktop Nav -->
      <nav class="hidden mid:block">
        <ul class="flex items-center space-x-7">
          <li v-for="route in routesList" :key="route.path">
            <NuxtLink
              :to="route.path"
              class="text-primary dark:text-primary text-[17px] font-medium hover:text-primary/60 transition-colors duration-200"
            >
              {{ route.title }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Theme Toggle and Mobile Menu Container -->
      <div class="flex items-center space-x-3">
        <!-- Theme Toggle - Desktop -->
        <div class="hidden mid:block">
          <ThemeToggle />
        </div>

        <!-- Mobile Hamburger -->
        <button
          @click="toggleMenu"
          class="mid:hidden text-primary transition-all duration-300 flex items-center justify-center p-2 rounded-lg focus:outline-none hover:text-white hover:bg-primary-light dark:hover:bg-primary/20"
        >
          <Icon icon="solar:hamburger-menu-linear" width="20" height="20" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[9999] bg-black/40 mid:hidden"
        @click="toggleMenu"
      >
        <div
          class="absolute top-0 right-0 w-3/4 max-w-xs h-full bg-white dark:bg-dark shadow-lg p-6 transition-el"
          @click.stop
        >
          <button
            @click="toggleMenu"
            class="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-primary transition-el"
          >
            ✕
          </button>

          <!-- Mobile Theme Toggle -->
          <div class="absolute top-4 left-4">
            <ThemeToggle />
          </div>

          <ul class="mt-16 space-y-6">
            <li v-for="route in routesList" :key="route.path">
              <NuxtLink
                :to="route.path"
                @click="toggleMenu"
                class="block text-gray-700 hover:dark:text-primary dark:text-gray-300 font-medium hover:text-primary transition-el"
              >
                {{ route.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { routesList } from "@/composables/useRoutes"

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style>
/* Slide-in transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to {
  transform: translateX(0%);
  opacity: 1;
}

.slide-leave-from {
  transform: translateX(0%);
  opacity: 1;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
