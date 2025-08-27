<template>
  <div>
    <section
      className="relative py-16 overflow-hidden"
      :style="{
        background: `url(${ProductsImage}) no-repeat center center/cover`,
      }"
    >
      <div
        class="absolute inset-0 z-10 top-0 left-0 bg-black/40 size-full"
      ></div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-primary">Products</span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed">
            Discover our comprehensive range of verified pharmaceutical
            products, sourced from trusted manufacturers and suppliers across
            Africa.
          </p>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="py-16 container mx-auto">
      <!-- Search Bar -->
      <div class="max-w-md mx-auto mb-8">
        <div class="relative">
          <UiInput
            startIcon="lucide:search"
            placeholder="Search products..."
            v-model="searchTerm"
            class="bg-background border-input text-foreground placeholder:text-muted-foreground"
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
          class="rounded-full dark:text-white dark:border-0 py-2.5 hover:scale-105 text-sm transition-transform duration-200"
          @click="selectedCategory = category"
        >
          {{ category }}
        </UiButton>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="group animate-slide-up hover:shadow-xl transition-all duration-300 border dark:border-0 border-border/50 hover:border-primary/30 overflow-hidden rounded-xl bg-white"
        >
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
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-primary-light/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>

          <div class="p-4 dark:bg-dark-gray">
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
      </div>
    </section>

    <!-- Contact Section for More Products -->
    <section class="py-16 bg-gradient-to-br dark:bg-[#344765] bg-primary-light">
      <div class="container mx-auto px-4 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          For More Best-Selling Medicines
        </h3>
        <p class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Looking for specific medications or bulk orders? Our team is ready to
          help you find exactly what you need.
        </p>
        <UiButton
          size="lg"
          class="hover:scale-105 py-3 px-6 transition-el mx-auto"
          as-child
        >
          <NuxtLink to="/contact"> Contact Us </NuxtLink>
        </UiButton>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import ProductsImage from "@/assets/img/products-hero-image.jpeg";

// Page meta
definePageMeta({
  title:
    "Pharmaceutical Products - MSC Medical Supply Chain | Quality Medicines",
});

const categories = [
  "All",
  "Pain Relief",
  "Antimalarial",
  "Gastroenterology",
  "Corticosteroids",
  "Antibiotics",
  "Supplements",
  "Diabetes",
  "Allergy",
  "Cardiovascular",
];

const selectedCategory = ref("All");
const searchTerm = ref("");

const allProds = useProducts();

const filteredProducts = computed(() => {
  return allProds.filter((product) => {
    const matchesCategory =
      selectedCategory.value === "All" ||
      product.category === selectedCategory.value;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});
</script>

<style></style>
