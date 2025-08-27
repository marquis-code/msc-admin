<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";

import AppInput from "@/components/ui/Input.vue";

const faqData = [
  {
    category: "Products",
    questions: [
      {
        question:
          "How do I verify the authenticity of pharmaceutical products?",
        answer:
          "All products on MSC are verified through our comprehensive authentication system. Each product comes with QR codes and batch tracking that allows you to trace its origin from manufacturer to delivery.",
      },
      {
        question: "What types of pharmaceutical products are available?",
        answer:
          "MSC offers a comprehensive range including prescription medications, over-the-counter drugs, medical supplies, and healthcare equipment through our verified distributor network.",
      },
      {
        question: "How are product prices determined?",
        answer:
          "Pricing is set by our verified distributors based on market rates, volume discounts, and your partnership tier. Registered partners get access to competitive bulk pricing.",
      },
    ],
  },
  {
    category: "Ordering",
    questions: [
      {
        question: "What is the minimum order quantity?",
        answer:
          "Minimum order quantities vary by product and distributor. Most distributors offer flexible MOQs to accommodate different pharmacy sizes and needs.",
      },
      {
        question: "How do I place an order on MSC?",
        answer:
          "Once registered as a partner, you can browse products, add them to your cart, and place orders directly through our platform. Orders are processed in real-time with automatic inventory updates.",
      },
      {
        question: "Can I schedule recurring orders?",
        answer:
          "Yes, our intelligent restocking feature allows you to set up automated reorders based on your inventory levels and usage patterns.",
      },
    ],
  },
  {
    category: "Payment",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept bank transfers, corporate credit cards, and trade credit arrangements. Payment terms vary by distributor and partnership agreement.",
      },
      {
        question: "How does the payment process work?",
        answer:
          "Payment is processed securely through our platform. You can pay directly to distributors or use our escrow service for added security in transactions.",
      },
    ],
  },
  {
    category: "Delivery",
    questions: [
      {
        question: "How long does delivery take?",
        answer:
          "Delivery times depend on your location and the distributor. Most orders are delivered within 2-5 business days with real-time tracking available.",
      },
      {
        question: "Do you offer temperature-controlled delivery?",
        answer:
          "Yes, our logistics partners provide cold chain delivery for temperature-sensitive pharmaceuticals with continuous monitoring throughout transport.",
      },
    ],
  },
  {
    category: "Partnerships",
    questions: [
      {
        question: "How do I become a verified partner?",
        answer:
          "Submit your application through our partnership portal with required documentation including business license, pharmaceutical permits, and compliance certificates.",
      },
      {
        question: "What are the benefits of being a verified partner?",
        answer:
          "Verified partners get access to exclusive pricing, priority support, advanced analytics, and integration with our ERP systems.",
      },
    ],
  },
];

const searchTerm = ref("");
const openIndexes = ref<Record<number, number | null>>({});

const filteredFAQs = computed(() =>
  faqData
    .map((category, idx) => ({
      ...category,
      catIdx: idx,
      questions: category.questions.filter(
        (item) =>
          item.question
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.value.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0)
);

const toggle = (catIdx: number, qIdx: number) => {
  // If same one clicked, close it
  if (openIndexes.value[catIdx] === qIdx) {
    openIndexes.value[catIdx] = null;
  } else {
    openIndexes.value[catIdx] = qIdx;
  }
};

const isOpen = (catIdx: number, qIdx: number) =>
  openIndexes.value[catIdx] === qIdx;
</script>

<template>
  <section
    class="py-16"
    style="
      background: linear-gradient(
        to bottom,
        hsl(var(--background)),
        hsl(var(--professional-gray) / 0.05)
      );
    "
  >
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
        >
          <Icon icon="mdi:help-circle" class="w-4 h-4 mr-2" />
          Frequently Asked Questions
        </div>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Have <span class="text-primary">Questions?</span> We Have Answers
        </h2>
        <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions about MSC's pharmaceutical supply
          chain platform.
        </p>
      </div>

      <!-- Search -->
      <div class="max-w-md mx-auto mb-8">
        <AppInput
          v-model="searchTerm"
          placeholder="Type your question here..."
          startIcon="mdi:magnify"
        />
      </div>

      <!-- FAQ Categories -->
      <div class="max-w-4xl mx-auto">
        <template v-if="filteredFAQs.length > 0">
          <div
            v-for="(category, catIdx) in filteredFAQs"
            :key="catIdx"
            class="mb-8"
          >
            <h3
              class="text-xl font-semibold text-foreground mb-4 flex items-center"
            >
              <div class="w-2 h-6 bg-primary rounded-full mr-3"></div>
              {{ category.category }}
            </h3>

            <div class="space-y-3">
              <div
                v-for="(item, qIdx) in category.questions"
                :key="qIdx"
                class="border border-gray-50 dark:border-dark-gray rounded-lg overflow-hidden transition-colors duration-300 hover:!border-primary"
              >
                <!-- Question button -->
                <button
                  @click="toggle(catIdx, qIdx)"
                  class="w-full flex justify-between items-center px-4 py-3 text-left transition-colors"
                >
                  <span class="font-medium">{{ item.question }}</span>
                  <Icon
                    icon="mdi:chevron-down"
                    class="w-5 h-5 transform transition-transform duration-300"
                    :class="{ 'rotate-180': isOpen(catIdx, qIdx) }"
                  />
                </button>

                <!-- Answer with auto height transition -->
                <transition
                  @enter="(el) => {
                                    const element = el as HTMLElement
                                    element.style.height = '0px'
                                    element.style.overflow = 'hidden'
                                    void element.offsetHeight // force reflow
                                    element.style.height = element.scrollHeight + 'px'
                                }"
                  @after-enter="(el) => {
                                    const element = el as HTMLElement
                                    element.style.height = 'auto'
                                    element.style.overflow = ''
                                }"
                  @leave="(el) => {
                                    const element = el as HTMLElement
                                    element.style.height = element.scrollHeight + 'px'
                                    element.style.overflow = 'hidden'
                                    void element.offsetHeight // force reflow
                                    element.style.height = '0px'
                                }"
                  @after-leave="(el) => {
                                    const element = el as HTMLElement
                                    element.style.overflow = ''
                                }"
                >
                  <div
                    v-show="isOpen(catIdx, qIdx)"
                    class="px-4 pb-4 text-muted-foreground leading-relaxed overflow-hidden transition-[height] duration-300 ease-in-out"
                  >
                    {{ item.answer }}
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </template>

        <!-- No Matches -->
        <div v-else class="text-center py-12">
          <Icon
            icon="mdi:help-circle-outline"
            class="h-16 w-16 text-muted-foreground mx-auto mb-4"
          />
          <h3 class="text-lg font-semibold text-foreground mb-2">
            No matching questions found
          </h3>
          <p class="text-muted-foreground">
            Try adjusting your search terms or browse all categories
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
