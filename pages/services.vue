<template>
  <section
    class="relative py-16 bg-gray-900 flex items-center justify-center overflow-hidden"
  >
    <div class="absolute inset-0 bg-black/50 z-10"></div>
    <div class="absolute inset-0">
      <img
        src="@/assets/img/services/hero.jpeg"
        alt="Business professionals shaking hands"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        Our <span class="text-primary">Services</span>
      </h1>
      <p
        class="text-lg md:text-xl text-white leading-relaxed max-w-3xl mx-auto"
      >
        Comprehensive pharmaceutical supply chain solutions designed to
        streamline your operations and ensure compliance.
      </p>
    </div>
  </section>
  <section class="py-20 w-11/12 mx-auto md:py-32">
    <div class="">
      <!-- Services Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto">
        <div
          v-for="(service, index) in services"
          :key="index"
          :class="
            clsx(
              'group bg-white rounded-md dark:bg-card shadow-sm hover:shadow-lg overflow-hidden',
              'hover:-translate-y-2 transition-all duration-500 cursor-pointer animate-fade-in-up'
            )
          "
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <!-- Image Container -->
          <div class="relative h-64 overflow-hidden">
            <img
              :src="service.image"
              :alt="service.title"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <!-- Overlay -->
            <div
              :class="
                clsx(
                  'absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70',
                  'group-hover:opacity-50 transition-opacity duration-300'
                )
              "
            />

            <!-- Icon -->
            <div
              :class="
                clsx(
                  'absolute bottom-4 left-4 w-10 h-10 bg-primary/20 backdrop-blur-sm rounded-md flex items-center',
                  'justify-center group-hover:scale-110 transition-transform duration-300'
                )
              "
            >
              <Icon :icon="service.icon" class="w-5 h-5 text-white" />
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3
              class="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-300"
            >
              {{ service.title }}
            </h3>
            <p
              class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm"
            >
              {{ service.description }}
            </p>

            <!-- Learn More Button -->
            <button
              :class="
                clsx(
                  'w-full rounded-md text-center inline-flex items-center justify-center border align-center px-4 py-2 gap-2 text-gray-700',
                  'dark:text-gray-200 font-semibold group-hover:text-primary transition-all duration-300 group-hover:gap-3'
                )
              "
            >
              Learn More
              <Icon
                icon="mdi:arrow-right"
                class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          <!-- Hover Effect Border -->
          <div
            class="absolute inset-0 rounded-md shadow-lg transition-all duration-300 pointer-events-none"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Page meta
definePageMeta({
  title:
    "Healthcare Services - MSC Medical Supply Chain | Supply Chain Solutions",
});

import InventoryImg from "@/assets/img/services/inventory.jpeg";
import LogisticsImg from "@/assets/img/services/logistics.jpeg";
import PharmaceuticalSourcingImg from "@/assets/img/services/pharmaceutical-sourcing.jpeg";
import ProcurementImg from "@/assets/img/services/procurement.jpeg";
import clsx from "clsx";

import { Icon } from "@iconify/vue";
import { ref } from "vue";

const services = ref([
  {
    title: "Pharmaceutical Sourcing",
    description:
      "Connect directly with verified manufacturers and suppliers for authentic pharmaceutical products at competitive prices.",
    icon: "mdi:package",
    image: PharmaceuticalSourcingImg,
  },
  {
    title: "Distribution & Logistics",
    description:
      "Reliable nationwide distribution network with temperature-controlled storage and real-time tracking capabilities.",
    icon: "mdi:truck",
    image: LogisticsImg,
  },
  {
    title: "Procurement Solutions",
    description:
      "Streamlined procurement processes with bulk ordering, automated restocking, and compliance management systems.",
    icon: "mdi:clipboard-list",
    image: ProcurementImg,
  },
  {
    title: "Inventory Management",
    description:
      "Advanced inventory tracking and management systems to optimize stock levels and reduce waste.",
    icon: "mdi:bar-chart",
    image: InventoryImg,
  },
]);
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

.group:hover .group-hover\:gap-3 {
  gap: 0.75rem;
}

/* Custom shadow effects */
.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Smooth backdrop blur */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>
