<script setup lang="ts">
import { Icon } from "@iconify/vue";

// Page meta
definePageMeta({
  title: "Coming Soon - MSC Medical Supply Chain | Launching Soon",
});

const features = [
  {
    icon: "mdi:calendar-blank-outline",
    title: "Launch Date",
    text: "We'll announce our official launch date soon",
  },
  {
    icon: "mdi:bell-outline",
    title: "Get Notified",
    text: "Be the first to know when we go live",
  },
  {
    icon: "mdi:sparkles-outline",
    title: "New Features",
    text: "Enhanced marketplace with better user experience",
  },
];
</script>

<template>
  <main
    class="flex flex-col items-center justify-center w-10/12 mx-auto pt-7 pb-12 bg-white"
  >
    <!-- Top icon -->
    <div
      class="mb-6 flex items-center justify-center rounded-full p-5 bg-primary/10 animate-pulse"
    >
      <Icon
        icon="ph:sparkle-bold"
        class="text-primary text-5xl animate-pulse"
      />
    </div>

    <!-- Heading -->
    <h1
      class="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-800 text-center"
    >
      Something Amazing is <br />
      <span class="text-primary">Coming Soon</span>
    </h1>

    <!-- Subtext -->
    <p class="mt-4 text-gray-500 text-center max-w-2xl text-lg">
      We’re working hard to bring you the best pharmaceutical marketplace
      experience. Stay tuned for our official launch with exciting new features.
    </p>

    <!-- Features Grid -->
    <section class="mt-10 grid w-3/5 gap-6 sm:grid-cols-3 mb-12">
      <div
        v-for="(f, i) in features"
        :key="i"
        class="p-6 border border-gray-50 rounded-2xl text-center bg-white"
      >
        <div
          class="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10"
        >
          <Icon :icon="f.icon" class="text-primary text-xl" />
        </div>
        <h3 class="font-semibold text-gray-800">{{ f.title }}</h3>
        <p class="mt-2 text-gray-500 text-sm">{{ f.text }}</p>
      </div>
    </section>

    <!-- Back Button -->
    <NuxtLink to="/">
      <UiButton rounded variant="outlined" class="px-8 py-3">
        <Icon icon="mdi:arrow-left" class="mr-2" />
        Back to Home
      </UiButton>
    </NuxtLink>
  </main>
</template>
