<script setup lang="ts">
import DeliveryImage from "@/assets/img/hero-image-1.jpeg";
import { Icon } from "@iconify/vue";

// Page meta
definePageMeta({
  title: "Delivery Services - MSC Medical Supply Chain | Safe & Fast Delivery",
});

const features = [
  {
    icon: "mdi:snowflake",
    title: "Temperature-Controlled Transport",
    description:
      "Our specialized cold-chain delivery system maintains the integrity of temperature-sensitive medications from warehouse to your doorstep, ensuring maximum efficacy.",
  },
  {
    icon: "mdi:truck-fast-outline",
    title: "Same-Day Delivery",
    description:
      "For urgent medical needs, our same-day delivery service operates across major cities, because we understand that health can’t wait.",
  },
  {
    icon: "mdi:package-variant-closed",
    title: "Secure Packaging",
    description:
      "Every package is sealed with tamper-evident materials and tracked throughout the journey. Your medicines arrive exactly as they left our verified facilities.",
  },
  {
    icon: "mdi:map-marker-check",
    title: "Real-Time Tracking",
    description:
      "Track your order from dispatch to delivery with real-time updates via SMS and email. You’ll know exactly when your medicines will arrive.",
  },
];

const deliverySteps = [
  {
    step: 1,
    title: "Order Verification",
    description: "Your prescription is verified by licensed pharmacists",
    icon: "mdi:clipboard-check-outline",
  },
  {
    step: 2,
    title: "Careful Packaging",
    description: "Medicines are packaged with temperature control and security",
    icon: "mdi:package-variant",
  },
  {
    step: 3,
    title: "Tracked Dispatch",
    description: "Your package enters our monitored delivery network",
    icon: "mdi:truck-delivery-outline",
  },
  {
    step: 4,
    title: "Safe Delivery",
    description: "Delivered to your door with strict compliance",
    icon: "mdi:home-outline",
  },
];
</script>

<template>
  <div>
    <section
      className="relative py-20 overflow-hidden"
      :style="{
        background: `url(${DeliveryImage}) no-repeat center center/cover`,
      }"
    >
      <div
        class="absolute inset-0 z-10 top-0 left-0 bg-black/40 size-full"
      ></div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Delivered Safe, <br />
            <span className="text-primary">Delivered fast</span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed">
            Your health is our priority. That's why we've built Africa's most
            reliable pharmaceutical delivery network, ensuring your medicines
            reach you safely and on time, every time.
          </p>
        </div>
      </div>
    </section>

    <div class="w-3/5 mx-auto py-10 space-y-8">
      <!-- Back Button -->
      <!-- <NuxtLink
        to="/"
        class="text-sm text-gray-600 hover:text-primary flex items-center gap-2"
      >
        <Icon icon="mdi:arrow-left" class="text-lg" /> Back to Home
      </NuxtLink> -->

      <NuxtLink to="/">
        <UiButton variant="outlined" class="text-sm px-6 py-3">
          <Icon icon="mdi:arrow-left" class="mr-2" />
          Back to Home
        </UiButton>
      </NuxtLink>

      <!-- Intro -->
      <p class="text-gray-500 leading-relaxed text-lg">
        In the pharmaceutical industry, delivery isn’t just about speed—it’s
        about trust, safety, and reliability. Every medicine that reaches your
        doorstep carries with it the responsibility of maintaining health and
        saving lives. That’s why MSC has revolutionized pharmaceutical delivery
        across Africa.
      </p>

      <!-- Features -->
      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="(feature, i) in features"
          :key="i"
          class="p-5 border rounded-xl shadow-sm hover:shadow-md transition bg-white"
        >
          <div class="flex items-center gap-3 mb-3">
            <Icon :icon="feature.icon" class="text-primary text-2xl" />
            <h3 class="font-semibold text-lg">{{ feature.title }}</h3>
          </div>
          <p class="text-gray-500">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Image -->
      <div>
        <img
          src="/assets/img/hero-image-2.jpeg"
          alt="Delivery Truck"
          class="rounded-xl shadow-md w-full object-cover"
        />
      </div>

      <!-- Delivery Process -->
      <section>
        <h2 class="text-center text-2xl font-bold mb-8">
          Our Delivery Process
        </h2>
        <div class="grid md:grid-cols-4 gap-6 text-center">
          <div
            v-for="(step, i) in deliverySteps"
            :key="i"
            class="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition"
          >
            <div
              class="flex justify-center items-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4"
            >
              <Icon :icon="step.icon" class="text-primary text-2xl" />
            </div>
            <h3 class="font-semibold">{{ step.step }}. {{ step.title }}</h3>
            <p class="text-gray-600 text-sm mt-2">{{ step.description }}</p>
          </div>
        </div>
      </section>

      <!-- Coverage -->
      <section class="bg-gray-50 p-8 rounded-xl text-center">
        <h3 class="font-semibold text-lg mb-3">Delivery Coverage</h3>
        <p class="text-gray-600 mb-5">
          We currently serve major cities across Nigeria, Ghana, Kenya, and
          South Africa, with plans to expand to 15 countries by 2025.
        </p>
        <button
          class="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition"
        >
          Check Coverage in Your Area
        </button>
      </section>
    </div>
  </div>
</template>
