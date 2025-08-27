<template>
  <footer class="bg-[#202C3C] dark:bg-white dark:text-dark-gray py-10">
    <div class="md:w-10/12 w-11/12 mx-auto">
      <div
        class="grid mid:grid-cols-[40%_20%_20%_20%] sm:grid-cols-2 mid:gap-4 gap-12 dark:text-dark-gray text-white"
      >
        <!-- MSC -->
        <div>
          <div class="flex items-center space-x-1">
            <!-- <h2 class="text-sm bg-primary rounded-md py-1.5 text-white px-0.5 font-semibold">MSC</h2> -->
            <img
              src="/assets/img/msc-logo-transparent.png"
              alt=""
              class="size-[30px]"
            />
            <h1 class="font-semibold text-lg">Medicare Supply Chain</h1>
          </div>
          <p class="my-4 text-white/80 dark:text-light-gray mid:w-10/12">
            Revolutionizing pharmaceutical distribution in Africa through
            technology, transparency, and trusted partnerships.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h1 class="font-semibold text-lg mb-4">Quick Links</h1>
          <ul
            class="flex flex-col space-y-3 text-white/80 dark:text-light-gray"
          >
            <li v-for="(route, i) in routesList.slice(1)" :key="i">
              <NuxtLink :to="route.path" class="hover:text-primary/60">{{
                i == 2 ? "Services" : i == 4 ? "Contact" : route.title
              }}</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <!-- <div>
                    <h1 class="font-semibold text-lg mb-4">Services</h1>
                    <p v-for="service in services" class="text-white/80 mb-3">
                        {{ service }}
                    </p>
                </div> -->

        <!-- Contact Info -->
        <div>
          <h1 class="font-semibold text-lg mb-4">Contact Info</h1>
          <div
            v-for="contact in contactInfo"
            class="text-white/80 dark:text-light-gray mb-4 flex items-center space-x-3"
          >
            <Icon :icon="contact.icon" class="size-[18px] text-primary" />
            <h4>{{ contact.text }}</h4>
          </div>
        </div>

        <!-- Follow Us -->
        <div>
          <h1 class="font-semibold text-lg mb-4">Follow Us</h1>
          <ul class="flex items-center space-x-4">
            <li v-for="social in socialLinks">
              <NuxtLink
                :to="social.path"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-primary dark:text-light-gray text-white/60"
              >
                <Icon :icon="social.icon" class="size-[22px]" />
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="py-4 mt-5 mb-5 border-t-[0.5px] text-sm border-[#424f60] flex md:flex-row flex-col items-center justify-between md:space-y-0 space-y-4"
      >
        <p class="text-white/70 dark:text-light-gray">
          © 2024 Medicare Supply Chain. All rights reserved.
        </p>
        <div
          class="flex items-center space-x-4 text-white/60 dark:text-light-gray"
        >
          <NuxtLink to="#" class="hover:text-primary">Privacy Policy</NuxtLink>
          <NuxtLink to="#" class="hover:text-primary"
            >Terms of Service</NuxtLink
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { routesList } from "@/composables/useRoutes"
const socialLinks = ref([
  {
    path: "https://google.com",
    icon: "mynaui:brand-facebook",
  },
  {
    path: "https://google.com",
    icon: "si:twitter-line",
  },
  {
    path: "https://google.com",
    icon: "lucide:linkedin",
  },
  {
    path: "https://google.com",
    icon: "iconoir:instagram",
  },
]);

const services = ref([
  "Pharmaceutical Distribution",
  "Inventory Management",
  "Supply Chain Analytics",
  "Compliance Tracking",
  "Partner Network",
]);

const contactInfo = ref([
  {
    icon: "solar:phone-outline",
    text: "+234 123 456 7890",
  },
  {
    icon: "oui:email",
    text: "info@msc-platform.com",
  },
  {
    icon: "basil:location-outline",
    text: "Lagos, Nigeria",
  },
]);
</script>
