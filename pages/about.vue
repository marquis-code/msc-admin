<template>
  <div>
    <section
      class="relative py-16 overflow-hidden"
      :style="{
        background: `url(${AboutImage}) no-repeat center center/cover`,
      }"
    >
      <div
        class="absolute inset-0 z-10 top-0 left-0 bg-black/40 size-full"
      ></div>
      <div class="relative z-10 container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center text-white">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            About <span class="text-primary">MSC</span>
          </h1>
          <p class="text-lg md:text-xl leading-relaxed">
            We're revolutionizing Africa's pharmaceutical supply chain through
            innovative digital solutions that connect suppliers, distributors,
            and pharmacies in one seamless ecosystem.
          </p>
        </div>
      </div>
    </section>

    <section
      class="py-14 gap-6 grid sm:grid-cols-2 grid-cols-1 w-10/12 mx-auto"
    >
      <div v-for="(value, i) in cardValues" :key="i">
        <div
          :style="{ animationDelay: `${i * 150}ms` }"
          class="mx-auto w-full text-center mb-4 animate-slide-up"
        >
          <div
            class="bg-primary-light rounded-full text-primary p-3 w-max mx-auto"
          >
            <Icon :icon="value.icon" width="32" height="32" />
          </div>
          <h1 class="font-semibold text-2xl mt-3">{{ value.title }}</h1>
        </div>
        <div
          class="rounded-lg w-full h-48 shadow-lg"
          :style="{
            background: `url(${value.image}) no-repeat center center/cover`,
          }"
        ></div>
        <div
          v-html="value.subTitle"
          class="p-4 text-center text-muted-foreground"
        ></div>
      </div>
    </section>

    <section class="py-16 bg-muted/50">
      <div class="w-10/12 mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Values
          </h2>
          <p class="text-muted-foreground">
            The principles that guide everything we do
          </p>
        </div>

        <div class="md:grid-cols-4 sm:grid-cols-2 grid-cols-1 grid gap-6">
          <div v-for="value in ourValues" class="text-center">
            <div
              class="bg-primary-light rounded-full text-primary p-3 w-max mx-auto"
            >
              <Icon :icon="value.icon" width="32" height="32" />
            </div>
            <h2 class="py-4 font-semibold text-xl">{{ value.title }}</h2>
            <p class="text-muted-foreground">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import AboutImage from "@/assets/img/about-hero-image.jpeg";
import MissionImage from "@/assets/img/hero-image-2.jpeg";
import { Icon } from "@iconify/vue";

// Page meta
definePageMeta({
  title: "About MSC - Medical Supply Chain | Our Story & Mission",
});

const cardValues = ref([
  {
    icon: "iconoir:heart",
    title: "Our Story",
    image: MissionImage,
    subTitle: `
      <div>
        <p>Founded with a vision to democratize access to quality pharmaceutical products across Africa, MSC was born from the recognition that healthcare supply chains needed revolutionary change.</p>
        <p class="mt-4">We started as a small team of healthcare and technology professionals who witnessed firsthand the challenges pharmacies faced in sourcing reliable, quality medicines.</p>
      </div>
    `,
  },
  {
    icon: "mynaui:star",
    title: "Our Mission",
    image: MissionImage,
    subTitle: `
      <div>
        <p>To transform pharmaceutical distribution across Africa by providing a transparent, efficient, and secure digital marketplace that ensures quality medicines reach every pharmacy and patient who needs them.</p>
      </div>
    `,
  },
  {
    icon: "bitcoin-icons:lightning-outline",
    title: "Our Purpose",
    image: MissionImage,
    subTitle: `
      <div>
        <p>To bridge the gap between pharmaceutical suppliers and healthcare providers, ensuring that quality medicines are accessible, affordable, and delivered with transparency and trust at every step of the supply chain.</p>
      </div>
    `,
  },
  {
    icon: "streamline-plump:web",
    title: "Our vision",
    image: MissionImage,
    subTitle: `
      <div>
        <p>To become Africa's leading pharmaceutical supply chain platform, enabling universal access to quality healthcare through technology-driven solutions that connect every stakeholder in the healthcare ecosystem.</p>
      </div>
    `,
  },
]);

const ourValues = ref([
  {
    icon: "mdi:shield-outline",
    title: "Trust",
    description: "Building confidence through transparency and reliability",
  },
  {
    icon: "lucide:users",
    title: "Collaboration",
    description: "Connecting stakeholders for mutual success",
  },
  {
    icon: "lucide:award",
    title: "Quality",
    description: "Ensuring the highest standards in everything we deliver",
  },
  {
    icon: "streamline-plump:web",
    title: "Innovation",
    description: "Pioneering solutions for healthcare challenges",
  },
]);
</script>
