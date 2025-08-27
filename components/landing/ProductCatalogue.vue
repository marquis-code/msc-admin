<script setup lang="ts">
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";

const categories = [
  "All",
  "Pain Relief",
  "Antimalarial",
  "Gastroenterology",
  "Corticosteroids",
];

const selectedCategory = ref("All");
const searchTerm = ref("");

const filteredProducts = computed(() => {
  return useProducts()
    .slice(0, 6)
    .filter((product) => {
      const matchesCategory =
        selectedCategory.value === "All" ||
        product.category === selectedCategory.value;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.value.toLowerCase());
      return matchesCategory && matchesSearch;
    });
});
</script>

<template>
  <section
    class="py-16 w-11/12 mx-auto"
    style="
      background: linear-gradient(
        to bottom,
        hsl(var(--background)),
        hsl(var(--professional-gray) / 0.05)
      );
    "
  >
    <div class="container mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4"
          style="
            background-color: hsl(var(--healthcare-blue) / 0.1);
            color: hsl(var(--healthcare-blue));
          "
        >
          <Icon icon="mdi:package-variant-closed" class="w-4 h-4 mr-2" />
          Product Catalogue
        </div>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Quality
          <span style="color: hsl(var(--healthcare-blue))">Pharmaceutical</span>
          Products
        </h2>
        <p
          class="text-xl dark:text-light-gray text-muted-foreground max-w-3xl mx-auto"
        >
          Browse our comprehensive range of verified pharmaceutical products
          available through our trusted distributor network.
        </p>
      </div>

      <!-- Search -->
      <div class="max-w-md mx-auto mb-8">
        <div class="relative">
          <!-- <Icon
            icon="mdi:magnify"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
          /> -->
          <UiInput
            startIcon="mdi-magnify"
            placeholder="Looking for something specific? Type a drug name..."
            v-model="searchTerm"
          />
        </div>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-2 mb-8">
        <UiButton
          v-for="category in categories"
          :key="category"
          rounded
          :variant="category === selectedCategory ? 'primary' : 'outlined'"
          size="sm"
          class="rounded-full hover:scale-105 transition-transform duration-200 text-sm"
          @click="selectedCategory = category"
        >
          {{ category }}
        </UiButton>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <template v-if="filteredProducts.length > 0">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="group animate-slide-up dark:bg-dark-gray dark:border-transparent rounded-2xl border border-gray-50 hover:!border-primary/30 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
          >
            <!-- Image -->
            <div
              class="aspect-square relative overflow-hidden group-hover:opacity-90 transition-all duration-500"
              style="
                background: linear-gradient(
                  135deg,
                  hsl(var(--professional-gray) / 0.05),
                  hsl(var(--professional-gray) / 0.1)
                );
              "
            >
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <!-- <div
                class="absolute inset-0 bg-gradient-to-t from-primary-light/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              /> -->
            </div>

            <!-- Content -->
            <div class="p-4 space-y-2 dark:bg-dark-gray h-full">
              <h3
                class="font-semibold text-lg leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2"
              >
                {{ product.name }}
              </h3>
              <p
                class="text-sm text-muted-foreground leading-relaxed line-clamp-2"
              >
                {{ product.description }}
              </p>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="col-span-full text-center py-16">
            <div
              class="rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6"
              style="background-color: hsl(var(--professional-gray) / 0.2)"
            >
              <Icon
                icon="mdi:package-variant"
                class="h-12 w-12 text-muted-foreground"
              />
            </div>
            <h3 class="text-xl font-semibold text-foreground mb-2">
              No products found
            </h3>
            <p class="text-muted-foreground">
              Try adjusting your search or category filter
            </p>
          </div>
        </template>
      </div>

      <!-- View All Button -->
      <div class="text-center mx-auto w-max">
        <UiButton
          size="lg"
          class="hover:scale-105 transition-el w-max text-sm py-3 px-7"
          asChild
        >
          <NuxtLink to="/products" class="flex items-center">
            View All Products
            <Icon icon="mdi:package-variant-closed" class="ml-2 h-5 w-5" />
          </NuxtLink>
        </UiButton>
      </div>
    </div>
  </section>
</template>
