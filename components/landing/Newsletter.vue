<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

// optional: you can use props or emit for form handling
const email = ref("");
</script>

<template>
  <section class="relative py-20 rounded-3xl mb-14 mx-10 overflow-hidden">
    <!-- style="background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--healthcare-blue)), hsl(var(--accent)))" -->
    <!-- Gradient background -->
    <div class="absolute inset-0 bg-primary"></div>
    <div class="absolute inset-0 bg-black/20"></div>

    <div class="relative z-10 container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center text-white">
        <!-- Icon circle -->
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6"
          style="animation: pulse-glow 2s ease-in-out infinite"
        >
          <Icon icon="mdi:email-outline" class="w-8 h-8" />
        </div>

        <!-- Heading -->
        <h2
          class="text-3xl md:text-4xl font-bold mb-4"
          style="animation: slide-up 0.6s ease-out"
        >
          Stay Updated with MSC
        </h2>

        <!-- Subtitle -->
        <p
          class="text-xl text-white/90 mb-8"
          style="animation: fade-slide 0.8s ease-out"
        >
          Get the latest updates on pharmaceutical innovations, market insights,
          and platform features delivered to your inbox.
        </p>

        <!-- Form -->
        <form class="flex items-center gap-3 w-full max-w-md mx-auto">
          <!-- Input Field -->
          <div class="flex-1 relative">
            <input
              required
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-2.5 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20 rounded-lg border-2 border-white focus:outline-none focus:border-white transition-el"
            />
          </div>

          <!-- Subscribe Button -->
          <button
            class="bg-white text-sm group dark:bg-white text-teal-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 shadow-sm"
          >
            Subscribe
            <Icon
              icon="mynaui:send"
              class="w-5 h-5 group-hover:translate-x-1 transition-el"
            />
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
