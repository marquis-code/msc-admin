<script setup lang="ts">
import Hero1 from "@/assets/img/hero-image-1.jpeg";
import Hero2 from "@/assets/img/hero-image-2.jpeg";
import Hero3 from "@/assets/img/hero-image-3.jpeg";

import { Icon } from "@iconify/vue";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Page meta
definePageMeta({
  title: "MSC - Medical Supply Chain | Pharmaceutical Distribution Platform",
});

const slides = [
  {
    id: 1,
    title: "Delivered safe, Delivered Fast",
    description: "Reliable delivery straight to your doorstep, hassle free",
    image: Hero1,
  },
  {
    id: 2,
    title: "Affordable & Quick",
    description: "We ensure fast delivery at affordable rates",
    image: Hero2,
  },
  {
    id: 3,
    title: "Trusted by Thousands",
    description: "Your packages, delivered securely and on time",
    image: Hero3,
  },
];

// Feature items
const features = [
  {
    icon: "mdi:check-circle", // ✅ Simple process
    title: "Simple, transparent buying process",
    description: "Streamlined ordering with clear pricing and no hidden fees.",
  },
  {
    icon: "mdi:shield-check", // 🛡️ Verified suppliers
    title: "Verified suppliers for guaranteed quality",
    description:
      "All suppliers are verified and products meet regulatory standards.",
  },
  {
    icon: "mdi:truck-delivery-outline", // 🚚 Delivery
    title: "Nationwide delivery with tracking",
    description: "Real-time tracking and reliable delivery across the country.",
  },
  {
    icon: "mdi:chart-bar", // 📊 Pricing & tracking
    title: "Affordable bulk pricing & expiry tracking",
    description:
      "Competitive bulk rates with full expiry-date transparency and batch tracking.",
  },
];
</script>

<template>
  <div>
    <Swiper
      :modules="[Navigation, Pagination, Autoplay]"
      :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 5000 }"
      pagination
      class="w-full h-[480px] relative"
    >
      <SwiperSlide
        v-for="(slide, i) in slides"
        :key="slide.id"
        class="relative w-full h-full"
      >
        <!-- Background Image -->
        <div
          class="absolute inset-0 bg-cover bg-center"
          :style="{ backgroundImage: `url(${slide.image})` }"
        />

        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/40" />

        <!-- Content -->
        <div
          class="relative z-10 h-full flex flex-col justify-center items-start px-8 md:px-16 text-white"
        >
          <h2
            class="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white drop-shadow-lg"
          >
            {{ slide.title }}
          </h2>
          <p class="mt-4 text-lg md:text-xl text-gray-200 max-w-xl">
            {{ slide.description }}
          </p>

          <!-- 🔹 Integrated AppButton -->
          <UiButton
            class="mt-6 gap-2 transform hover:scale-105 transition-transform rounded-full px-5"
            rounded
          >
            Learn More
            <Icon icon="lets-icons:arrow-right-light" width="24" height="24" />
          </UiButton>
        </div>
      </SwiperSlide>
      <!-- 🔹 Custom Navigation Buttons -->
      <UiButton
        rounded
        class="custom-prev !p-2 absolute top-1/2 -translate-y-1/2 left-4 z-50 bg-white/20 border-white/30 text-white hover:bg-primary/80 hover:border-primary/80 transition-el hover:scale-110"
      >
        <Icon icon="mingcute:arrow-left-fill" />
      </UiButton>
      <UiButton
        rounded
        class="custom-next !p-2 absolute top-1/2 -translate-y-1/2 right-4 z-50 bg-white/20 border-white/30 text-white hover:bg-primary/80 hover:border-primary/80 transition-el hover:scale-110"
      >
        <Icon icon="mingcute:arrow-right-fill" />
      </UiButton>
    </Swiper>

    <section id="why" class="container px-6 mx-auto py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why MSC?</h2>
        <p
          className="text-xl dark:text-primary-light text-gray-500 max-w-3xl mx-auto"
        >
          Four key reasons why MSC is the right choice for your pharmaceutical
          needs.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="border-0 rounded-xl p-6 bg-card transition-el shadow-sm card-futuristic hover-glow group animate-fade-slide"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- Icon -->
          <div
            class="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300"
          >
            <Icon
              :icon="feature.icon"
              class="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          <!-- Title -->
          <h3
            class="text-xl font-semibold group-hover:text-primary transition-el animate-slide-up"
          >
            {{ feature.title }}
          </h3>

          <!-- Description -->
          <p class="mt-3 text-base text-muted-foreground leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-6">
      <LandingProductCatalogue />
    </section>

    <section>
      <LandingBuyingProcess />
    </section>

    <section>
      <LandingFAQ />
    </section>

    <section>
      <LandingNewsletter />
    </section>
  </div>
</template>

<style scoped>
:global(.swiper-pagination-bullet) {
  @apply w-3 h-3 bg-primary opacity-40; /* bigger size + primary color */
}

:global(.swiper-pagination-bullet-active) {
  @apply bg-primary opacity-100 scale-105; /* highlight active one */
}
</style>
